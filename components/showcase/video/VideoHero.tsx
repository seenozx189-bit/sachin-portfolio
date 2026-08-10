'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { splitReveal } from '@/animations/text';
import { pointerGradient } from '@/animations/parallax';
import LazyVideo from './LazyVideo';

export default function VideoHero({
  subtitle,
  intro,
  heroReel,
  poster,
}: {
  subtitle: string;
  intro: string;
  heroReel: string;
  poster: string;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cleanupTitle = splitReveal(titleRef.current, {
        type: 'chars',
        stagger: 0.03,
        duration: 1.1,
        scrollTrigger: false,
        delay: 0.35,
      });
      const cleanupGlow = pointerGradient(rootRef.current);

      gsap.timeline({ delay: 0.2 })
        .from('.vh-reel', { scale: 1.18, opacity: 0, duration: 1.6, ease: 'power3.out' }, 0)
        .from('.vh-eyebrow > *', { yPercent: 120, opacity: 0, duration: 0.9, ease: 'power4.out' }, 0.4)
        .from('.vh-intro, .vh-scroll', { opacity: 0, y: 24, stagger: 0.15, duration: 0.8 }, 0.9);

      // Parallax the reel as the hero leaves.
      gsap.to('.vh-reel', {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.vh-inner', {
        yPercent: -8,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      // Scroll indicator bob.
      gsap.to('.vh-scroll__line', { scaleY: 0.3, transformOrigin: 'top', repeat: -1, yoyo: true, duration: 1.1, ease: 'power1.inOut' });

      return () => {
        cleanupTitle();
        cleanupGlow();
      };
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="vh" style={{ '--mx': '50%', '--my': '40%' } as React.CSSProperties}>
      <div className="vh-reel" aria-hidden="true">
        <LazyVideo src={heroReel} poster={poster} alt="" mode="always" priority sizes="100vw" />
      </div>
      <div className="vh-scrim" aria-hidden="true" />
      <div className="vh-noise" aria-hidden="true" />
      <div className="vh-glow" aria-hidden="true" />

      <div className="vh-inner">
        <p className="vh-eyebrow"><span>(03) — {subtitle}</span></p>
        <h1 ref={titleRef} className="vh-title">Video Editing</h1>
        <p className="vh-intro">{intro}</p>
      </div>

      <div className="vh-scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="vh-scroll__line" />
      </div>
    </section>
  );
}
