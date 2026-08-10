'use client';

import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Vertical parallax. `speed` > 0 moves slower (depth), < 0 moves faster.
 * Reads `data-parallax` (px range) from each node if no speed is passed.
 */
export function parallax(
  nodes: Element[] | NodeListOf<Element>,
  scrub: number | boolean = true
) {
  const triggers: ScrollTrigger[] = [];
  Array.from(nodes).forEach((node) => {
    const range = Number((node as HTMLElement).dataset.parallax ?? 80);
    const tween = gsap.fromTo(
      node,
      { yPercent: -range / 10 },
      {
        yPercent: range / 10,
        ease: 'none',
        scrollTrigger: {
          trigger: node,
          start: 'top bottom',
          end: 'bottom top',
          scrub,
        },
      }
    );
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });
  return () => triggers.forEach((t) => t.kill());
}

/**
 * Clip-path / mask image reveal with a slight scale settle.
 */
export function maskReveal(el: Element | null, { start = 'top 82%' } = {}) {
  if (!el) return () => {};
  const img = el.querySelector('img, video') ?? el;
  const tl = gsap.timeline({
    scrollTrigger: { trigger: el, start, once: true },
  });
  tl.fromTo(
    el,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'power4.out' }
  ).from(
    img,
    { scale: 1.35, duration: 1.4, ease: 'power3.out' },
    0
  );
  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}

/**
 * Mouse-following gradient/glow. Writes CSS vars --mx / --my (0-100%).
 */
export function pointerGradient(el: HTMLElement | null) {
  if (!el) return () => {};
  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    gsap.to(el, { '--mx': `${x}%`, '--my': `${y}%`, duration: 0.6, ease: 'power2.out' });
  };
  el.addEventListener('pointermove', onMove);
  return () => el.removeEventListener('pointermove', onMove);
}
