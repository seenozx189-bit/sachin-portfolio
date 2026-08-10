'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { splitReveal } from '@/animations/text';
import { pointerGradient } from '@/animations/parallax';

export default function GraphicHero({
  subtitle,
  intro,
  count,
}: {
  subtitle: string;
  intro: string;
  count: number;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cleanupTitle = splitReveal(titleRef.current, {
        type: 'chars',
        stagger: 0.035,
        duration: 1.15,
        scrollTrigger: false,
        delay: 0.25,
      });
      const cleanupGlow = pointerGradient(rootRef.current);

      gsap.from('.gfx-hero__line > *', {
        opacity: 0,
        yPercent: 120,
        duration: 1,
        stagger: 0.12,
        delay: 0.5,
        ease: 'power4.out',
      });

      // Count up.
      const obj = { v: 0 };
      gsap.to(obj, {
        v: count,
        duration: 1.6,
        delay: 0.6,
        ease: 'power2.out',
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = String(Math.round(obj.v)).padStart(2, '0');
        },
      });

      // Hero drifts up + fades as you leave it.
      gsap.to('.gfx-hero__inner', {
        yPercent: -12,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      return () => {
        cleanupTitle();
        cleanupGlow();
      };
    }, rootRef);
    return () => ctx.revert();
  }, [count]);

  return (
    <section ref={rootRef} className="gfx-hero">
      <div className="gfx-hero__glow" aria-hidden="true" />
      <div className="gfx-hero__inner">
        <div className="gfx-hero__topline">
          <span className="gfx-hero__line"><span>(02) — {subtitle}</span></span>
          <span className="gfx-hero__line"><span>Exhibition · {new Date().getFullYear()}</span></span>
        </div>
        <h1 ref={titleRef} className="gfx-hero__title">Graphic<br />Design</h1>
        <div className="gfx-hero__foot">
          <p className="gfx-hero__intro gfx-hero__line"><span>{intro}</span></p>
          <div className="gfx-hero__count gfx-hero__line">
            <span><span ref={countRef} className="gfx-hero__count-num">00</span></span>
            <em>Works on show</em>
          </div>
        </div>
      </div>
      <span className="gfx-hero__scroll" aria-hidden="true">Scroll to enter ↓</span>
    </section>
  );
}
