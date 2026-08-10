'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * First-visit preloader. Counts a progress line to 100 while the window
 * loads, then wipes away to reveal the site. Runs once per session.
 */
export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('sachin-loaded')) {
      setMounted(false);
      return;
    }

    document.body.classList.add('is-loading');
    const progress = { value: 0 };
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tl = gsap.timeline();
    tl.from(markRef.current, { yPercent: 120, opacity: 0, duration: 0.7, ease: 'power4.out' });
    tl.to(
      progress,
      {
        value: 100,
        duration: reduced ? 0.4 : 1.9,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(progress.value);
          if (countRef.current) countRef.current.textContent = String(v).padStart(3, '0');
          if (barRef.current) barRef.current.style.transform = `scaleX(${progress.value / 100})`;
        },
      },
      0.2
    );
    tl.to(rootRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      onComplete: () => {
        document.body.classList.remove('is-loading');
        sessionStorage.setItem('sachin-loaded', '1');
        setMounted(false);
      },
    });

    return () => {
      tl.kill();
      document.body.classList.remove('is-loading');
    };
  }, []);

  if (!mounted) return null;

  return (
    <div ref={rootRef} className="loader" aria-hidden="true">
      <div className="loader__noise" />
      <div className="loader__inner">
        <span className="loader__mark-wrap">
          <span ref={markRef} className="loader__mark">SACHIN</span>
        </span>
        <div className="loader__meta">
          <span className="loader__label">Loading experience</span>
          <span ref={countRef} className="loader__count">000</span>
        </div>
        <div className="loader__line">
          <span ref={barRef} className="loader__bar" />
        </div>
      </div>
    </div>
  );
}
