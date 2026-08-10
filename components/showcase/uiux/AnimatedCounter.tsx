'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

/**
 * Counts from 0 to `value` when it scrolls into view. `scroller` lets it work
 * inside a custom scroll container (the case-study reader).
 */
export default function AnimatedCounter({
  value,
  suffix = '',
  duration = 1.8,
  scroller,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  scroller?: Element | null;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: value,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true, scroller: scroller ?? undefined },
        onUpdate: () => {
          if (el.firstChild) el.firstChild.textContent = String(Math.round(obj.v));
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [value, scroller]);

  return (
    <span ref={ref} className="uxc">
      <span>0</span>{suffix}
    </span>
  );
}
