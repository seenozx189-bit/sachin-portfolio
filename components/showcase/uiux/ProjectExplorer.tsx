'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { tilt } from '@/animations/interactions';
import DeviceMockup from './DeviceMockup';
import { explorerSlot, type UiuxProject } from './types';

export type ExplorerOpen = { project: UiuxProject; el: HTMLElement };

export default function ProjectExplorer({
  projects,
  onOpen,
}: {
  projects: UiuxProject[];
  onOpen: (p: ExplorerOpen) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>('.uxe-row');
      if (reduced) {
        gsap.set(rows, { opacity: 1, clearProps: 'all' });
        return;
      }
      // Alternating horizontal reveal: even rows enter from the left,
      // odd rows from the right — subtle x shift + opacity, premium easing.
      rows.forEach((row, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          row,
          { opacity: 0, xPercent: fromLeft ? -8 : 8 },
          {
            opacity: 1,
            xPercent: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: row, start: 'top 84%', once: true },
          }
        );
      });
      // Depth parallax on the devices.
      gsap.utils.toArray<HTMLElement>('.uxe-device').forEach((d, i) => {
        gsap.to(d, {
          yPercent: (i % 2 ? -8 : 8),
          ease: 'none',
          scrollTrigger: { trigger: d, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [projects.length]);

  return (
    <section ref={rootRef} className="uxe">
      <div className="uxe-head">
        <span className="uxe-head__label">Selected case studies</span>
        <h2 className="uxe-head__title">The work</h2>
      </div>

      <div className="uxe-list">
        {projects.map((p, i) => {
          const slot = explorerSlot(i);
          return (
            <article
              key={p.id}
              className={`uxe-row uxe-row--${slot.align}`}
              style={{ '--rotate': `${slot.rotate}deg`, '--scale': slot.scale } as React.CSSProperties}
            >
              <ExplorerDevice project={p} index={i} onOpen={onOpen} />
              <div className="uxe-meta">
                <span className="uxe-meta__index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="uxe-meta__title">{p.title}</h3>
                <p className="uxe-meta__sub">{p.subtitle}</p>
                <div className="uxe-meta__tags">
                  {p.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
                </div>
                <span className="uxe-meta__cta">{p.role} · {p.year}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ExplorerDevice({ project, index, onOpen }: { project: UiuxProject; index: number; onOpen: (p: ExplorerOpen) => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  useEffect(() => tilt(btnRef.current, { max: 7, lift: 12, scale: 1.02 }), []);

  return (
    <button
      ref={btnRef}
      type="button"
      className="uxe-device"
      onClick={() => deviceRef.current && onOpen({ project, el: deviceRef.current })}
      data-cursor="image"
      data-cursor-label="OPEN"
      aria-label={`Open ${project.title} case study`}
    >
      <DeviceMockup ref={deviceRef} kind={project.device} src={project.cover} alt={project.title} priority={index === 0} sizes="55vw" />
    </button>
  );
}
