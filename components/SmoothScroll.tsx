'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger } from '@/lib/gsap';

type LenisContextValue = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export const useLenis = () => useContext(LenisContext).lenis;

/**
 * Global smooth-scroll provider.
 * - Drives Lenis from the GSAP ticker (single rAF loop, no double-driving).
 * - Keeps ScrollTrigger in sync on every Lenis scroll event.
 * - Respects prefers-reduced-motion (Lenis is skipped entirely).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.1,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Update ScrollTrigger whenever Lenis scrolls.
    instance.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker for a single, synced rAF loop.
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // On route change: reset scroll to top and refresh triggers after paint.
  useEffect(() => {
    const l = lenisRef.current;
    if (l) l.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>;
}
