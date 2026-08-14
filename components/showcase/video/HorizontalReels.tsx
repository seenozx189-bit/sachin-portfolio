'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { horizontalScroll } from '@/animations/horizontalScroll';
import VideoCard from './VideoCard';
import { railSlot, type VideoProject } from './types';

export default function HorizontalReels({
  projects,
  onOpen,
}: {
  projects: VideoProject[];
  onOpen: (project: VideoProject, el: HTMLElement) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      // Entrance stagger — also drives the animated category switch (remount).
      gsap.from('.hr .vc', { opacity: 0, y: 50, rotationY: 8, stagger: 0.08, duration: 0.8, ease: 'power3.out' });

      // Mobile / reduced-motion: no pinned horizontal scroll (stacks via CSS).
      if (reduced || window.innerWidth < 760) return;
      const cleanup = horizontalScroll(sectionRef.current, trackRef.current);
      // Refresh once media/layout settles.
      const id = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        cancelAnimationFrame(id);
        cleanup();
      };
    }, sectionRef);
    return () => ctx.revert();
  }, [projects.length]);

  return (
    <section ref={sectionRef} className="hr">
      <div ref={trackRef} className="hr-track">
        <div className="hr-intro">
          <span>Selected</span>
          <strong>Edits</strong>
          <em>Drag your eyes across the reel →</em>
        </div>
        {projects.map((p, i) => (
          <VideoCard key={p.id} project={p} slot={railSlot(i)} onOpen={onOpen} />
        ))}
        <div className="hr-end"><span>Fin.</span></div>
      </div>
    </section>
  );
}
