'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { parallax } from '@/animations/parallax';
import ArtworkCard, { type OpenPayload } from './ArtworkCard';
import SectionDivider from './SectionDivider';
import { slotFor, type GraphicProject } from './types';

const GROUP_SIZE = 3;
const DIVIDERS = [
  { label: 'Selected', hint: '— the exhibition begins' },
  { label: 'Continued', hint: '— walk further in' },
  { label: 'Archive', hint: '— deeper into the work' },
  { label: 'Closing', hint: '— the final room' },
];

export default function EditorialGallery({
  projects,
  onOpen,
}: {
  projects: GraphicProject[];
  onOpen: (p: OpenPayload) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Parallax is a desktop-only flourish — skip on touch / coarse pointers
    // where it costs the most and adds the least.
    const enableParallax = !reduced && matchMedia('(pointer: fine)').matches && window.innerWidth > 900;

    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray<HTMLElement>('.gfx-card__frame');

      if (reduced) {
        gsap.set(frames, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });
        return;
      }

      // Choreographed, batched reveal — one observer, not one-per-card.
      gsap.set(frames, { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 });
      ScrollTrigger.batch(frames, {
        start: 'top 86%',
        onEnter: (batch) =>
          gsap.to(batch, {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.15,
            ease: 'power4.out',
            stagger: 0.14,
            overwrite: true,
          }),
      });
    }, rootRef);

    // Parallax creates one scrubbed ScrollTrigger PER image (up to ~25 on
    // this page) — each one reads layout to compute its start/end. Doing
    // that synchronously in the mount effect (before first paint) is what
    // caused the initialization stutter. Deferring it one frame lets the
    // gallery paint first; the effect itself is unchanged, just not on the
    // critical path anymore.
    let killParallax: (() => void) | undefined;
    const rafId = requestAnimationFrame(() => {
      if (enableParallax) {
        killParallax = parallax(gsap.utils.toArray('.gfx-card__img'), 1.2);
      }
      // Refresh after first paint so triggers (reveal + parallax) use
      // correct post-layout positions once the lazy images reserve space.
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      killParallax?.();
      ctx.revert();
    };
  }, [projects.length]);

  // Build an editorial flow with cinematic dividers between groups.
  const nodes: React.ReactNode[] = [];
  projects.forEach((project, i) => {
    if (i % GROUP_SIZE === 0) {
      const d = DIVIDERS[Math.floor(i / GROUP_SIZE) % DIVIDERS.length];
      nodes.push(<SectionDivider key={`div-${i}`} label={d.label} hint={d.hint} />);
    }
    nodes.push(
      <ArtworkCard key={project.id} project={project} slot={slotFor(i)} index={i} onOpen={onOpen} />
    );
  });

  return (
    <div ref={rootRef} className="gfx-gallery">
      {nodes}
    </div>
  );
}
