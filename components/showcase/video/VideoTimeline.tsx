'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { splitReveal } from '@/animations/text';
import type { VideoProject } from './types';

type YearGroup = { year: string; items: VideoProject[] };

export default function VideoTimeline({ projects }: { projects: VideoProject[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const groups: YearGroup[] = Object.values(
    projects.reduce((acc: Record<string, YearGroup>, p) => {
      (acc[p.year] ??= { year: p.year, items: [] }).items.push(p);
      return acc;
    }, {})
  ).sort((a, b) => Number(b.year) - Number(a.year));

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cleanup = splitReveal(titleRef.current, { type: 'chars', stagger: 0.02, duration: 0.9 });
      gsap.utils.toArray<HTMLElement>('.vt-year').forEach((row) => {
        gsap.from(row.querySelector('.vt-year__num'), {
          xPercent: -12,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: { trigger: row, start: 'top 80%', once: true },
        });
        gsap.from(row.querySelectorAll('.vt-item'), {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.7,
          scrollTrigger: { trigger: row, start: 'top 78%', once: true },
        });
      });
      return () => cleanup();
    }, rootRef);
    return () => ctx.revert();
  }, [projects.length]);

  return (
    <section ref={rootRef} className="vt">
      <h2 ref={titleRef} className="vt-title">Timeline of edits</h2>
      <div className="vt-rows">
        {groups.map((g) => (
          <div key={g.year} className="vt-year">
            <span className="vt-year__num">{g.year}</span>
            <div className="vt-items">
              {g.items.map((p) => (
                <article key={p.id} className="vt-item">
                  <strong>{p.title}</strong>
                  <span>{p.category} · {p.duration}</span>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
