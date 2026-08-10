'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

/**
 * Cinematic divider between artwork groups: a pinned oversized word that
 * scrubs horizontally and dims as the next group scrolls up underneath.
 */
export default function SectionDivider({ label, hint }: { label: string; hint: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // Single lightweight scrub: the oversized word drifts + softens as it
      // passes. No pin — pinning here created one pinned ScrollTrigger per
      // divider (the main scroll-jank source) for zero layout benefit.
      gsap.fromTo(
        '.gfx-divider__word',
        { xPercent: 0, opacity: 0.4 },
        {
          xPercent: -16,
          opacity: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="gfx-divider" aria-hidden="true">
      <div className="gfx-divider__inner">
        <span className="gfx-divider__hint">{hint}</span>
        <span className="gfx-divider__word">{label}</span>
      </div>
    </div>
  );
}
