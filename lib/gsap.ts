'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Register GSAP plugins once, on the client only.
if (typeof window !== 'undefined' && !(gsap as unknown as { _sachinRegistered?: boolean })._sachinRegistered) {
  gsap.registerPlugin(ScrollTrigger, Flip);
  (gsap as unknown as { _sachinRegistered?: boolean })._sachinRegistered = true;

  // Global defaults for a premium, weighty feel.
  gsap.defaults({ ease: 'power3.out', duration: 1 });
}

export { gsap, ScrollTrigger, Flip };

// Shared easing tokens so every page shares the same motion language.
export const EASE = {
  out: 'power3.out',
  inOut: 'power3.inOut',
  expo: 'expo.out',
  cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;
