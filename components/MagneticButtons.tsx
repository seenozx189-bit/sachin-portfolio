'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { magnetic } from '@/animations/interactions';

const SELECTOR = [
  '.pill-button',
  '.outline-button',
  '.header-cta',
  '.form-button',
  '.fx-cta__btn',
  '.talk-banner > a',
  '[data-magnetic]',
].join(',');

/**
 * Applies the shared magnetic effect to primary buttons across every page,
 * re-scanning after each route change. Skips touch / reduced-motion.
 */
export default function MagneticButtons() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    // Wait for the incoming route to paint before binding.
    const id = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
      const cleanups = els.map((el) => magnetic(el, 0.32));
      (window as unknown as { __magCleanups?: Array<() => void> }).__magCleanups = cleanups;
    });

    return () => {
      cancelAnimationFrame(id);
      const store = window as unknown as { __magCleanups?: Array<() => void> };
      store.__magCleanups?.forEach((fn) => fn());
      store.__magCleanups = undefined;
    };
  }, [pathname]);

  return null;
}
