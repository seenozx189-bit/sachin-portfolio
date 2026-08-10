'use client';

import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Pins a section and scrolls its inner track horizontally as the user
 * scrolls vertically. `track` should be wider than the viewport.
 */
export function horizontalScroll(
  section: HTMLElement | null,
  track: HTMLElement | null,
  { endPad = 1 } = {}
) {
  if (!section || !track) return () => {};

  const getDistance = () => track.scrollWidth - window.innerWidth;

  const tween = gsap.to(track, {
    x: () => -getDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${getDistance() * endPad}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}
