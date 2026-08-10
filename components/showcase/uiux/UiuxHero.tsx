'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { splitReveal } from '@/animations/text';
import { pointerGradient } from '@/animations/parallax';
import DeviceMockup from './DeviceMockup';
import type { UiuxProject } from './types';

export default function UiuxHero({
  subtitle,
  intro,
  floaters,
}: {
  subtitle: string;
  intro: string;
  floaters: UiuxProject[];
}) {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cleanupTitle = splitReveal(titleRef.current, { type: 'chars', stagger: 0.03, duration: 1.1, scrollTrigger: false, delay: 0.3 });
      const cleanupGlow = pointerGradient(rootRef.current);

      gsap.from('.uxh-eyebrow > *, .uxh-intro', { yPercent: 40, opacity: 0, duration: 0.9, stagger: 0.12, delay: 0.5, ease: 'power4.out' });
      gsap.from('.uxh-floater', { opacity: 0, scale: 0.7, y: 60, rotationZ: 0, duration: 1.2, stagger: 0.15, delay: 0.4, ease: 'power3.out' });

      // Depth parallax: floaters drift at different rates; pointer tilts them.
      gsap.utils.toArray<HTMLElement>('.uxh-floater').forEach((f, i) => {
        gsap.to(f, {
          yPercent: (i % 2 ? -1 : 1) * (14 + i * 5),
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });

      const xq = gsap.utils.toArray<HTMLElement>('.uxh-floater').map((f) => ({
        x: gsap.quickTo(f, 'x', { duration: 1.2, ease: 'power2.out' }),
        y: gsap.quickTo(f, 'y', { duration: 1.2, ease: 'power2.out' }),
      }));
      const onMove = (e: PointerEvent) => {
        const dx = e.clientX / window.innerWidth - 0.5;
        const dy = e.clientY / window.innerHeight - 0.5;
        xq.forEach((q, i) => { q.x(dx * (30 + i * 18)); q.y(dy * (24 + i * 14)); });
      };
      window.addEventListener('pointermove', onMove, { passive: true });

      // Pinned hero content that lifts + fades on exit.
      gsap.to('.uxh-inner', {
        yPercent: -10, opacity: 0.15, ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true, pin: '.uxh-inner', pinSpacing: false },
      });

      return () => {
        window.removeEventListener('pointermove', onMove);
        cleanupTitle();
        cleanupGlow();
      };
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="uxh" style={{ '--mx': '50%', '--my': '40%' } as React.CSSProperties}>
      <div className="uxh-grad" aria-hidden="true" />
      <div className="uxh-noise" aria-hidden="true" />
      <div className="uxh-glow" aria-hidden="true" />

      <div className="uxh-floaters" aria-hidden="true">
        {floaters.slice(0, 3).map((p, i) => (
          <div key={p.id} className={`uxh-floater uxh-floater--${i}`}>
            <DeviceMockup kind={p.device} src={p.cover} alt="" sizes="30vw" />
          </div>
        ))}
      </div>

      <div className="uxh-inner">
        <p className="uxh-eyebrow"><span>(01) — {subtitle}</span></p>
        <h1 ref={titleRef} className="uxh-title">UI/UX Design</h1>
        <p className="uxh-intro">{intro}</p>
        <span className="uxh-scroll">Scroll to explore the work ↓</span>
      </div>
    </section>
  );
}
