'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import LazyVideo from './LazyVideo';
import type { VideoProject } from './types';

export default function FeaturedReel({
  project,
  onOpen,
}: {
  project: VideoProject;
  onOpen: (el: HTMLElement) => void;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=120%',
          pin: '.fr-pin',
          scrub: 1,
        },
      });
      tl.fromTo('.fr-stage', { scale: 0.82, clipPath: 'inset(12% 12% 12% 12% round 8px)' }, { scale: 1, clipPath: 'inset(0% 0% 0% 0% round 8px)', ease: 'power2.out' }, 0)
        .fromTo('.fr-progress__bar', { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
        .from('.fr-copy__title', { yPercent: 120, opacity: 0, ease: 'power3.out' }, 0.1)
        .from('.fr-copy__desc', { opacity: 0, y: 20, ease: 'power2.out' }, 0.25)
        .fromTo('.fr-pin', { '--fr-hue': 0 }, { '--fr-hue': 40, ease: 'none' } as gsap.TweenVars, 0);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="fr">
      <div className="fr-pin">
        <div className="fr-head">
          <span className="fr-eyebrow">Featured</span>
          <span className="fr-meta">{project.category} · {project.duration} · {project.year}</span>
        </div>

        <button
          ref={stageRef as never}
          type="button"
          className="fr-stage"
          onClick={() => stageRef.current && onOpen(stageRef.current)}
          data-cursor="video"
          data-cursor-label="PLAY"
          aria-label={`Play ${project.title}`}
        >
          <LazyVideo src={project.preview} poster={project.cover} alt={project.title} mode="inview" sizes="90vw" />
          <span className="fr-play" aria-hidden="true">▶</span>
        </button>

        <div className="fr-copy">
          <h2 className="fr-copy__title">{project.title}</h2>
          <p className="fr-copy__desc">{project.description}</p>
        </div>

        <div className="fr-progress" aria-hidden="true">
          <span className="fr-progress__bar" />
        </div>
      </div>
    </section>
  );
}
