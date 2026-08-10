'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';

type TransitionContextValue = {
  navigate: (href: string, label?: string) => void;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export const useTransition = () => useContext(TransitionContext);

/**
 * Cinematic route transition.
 *  leave  -> current page compresses, overlay expands from centre, title scales
 *            in, noise ramps, THEN we push the route.
 *  enter  -> once the new pathname mounts, the overlay wipes away and the page
 *            rises into place.
 *
 * Robustness: the overlay is ALWAYS reset to a clean hidden state on every
 * route change (however it was reached — our navigate(), a normal <Link>, or
 * browser back/forward), a stale timeline is always killed before a new one
 * starts, same-path pushes never cover the screen, and a failsafe timer clears
 * a stuck state. This makes it impossible for the overlay to be left covering
 * the viewport (the old "black screen" bug).
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef(false);
  const activeTlRef = useRef<gsap.core.Timeline | null>(null);
  const failsafeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [label, setLabel] = useState('');

  // Hard-reset the overlay + page to a clean, hidden, interaction-free state.
  const resetOverlay = useCallback(() => {
    const overlay = overlayRef.current;
    if (overlay) {
      gsap.set(overlay, {
        clipPath: 'inset(100% 0% 0% 0%)',
        visibility: 'hidden',
        pointerEvents: 'none',
        opacity: 1,
      });
    }
    if (labelRef.current) gsap.set(labelRef.current, { opacity: 0, clearProps: 'transform,filter,letterSpacing' });
    if (noiseRef.current) gsap.set(noiseRef.current, { opacity: 0.04 });
    const main = document.querySelector('main');
    if (main) gsap.set(main, { clearProps: 'transform,opacity,filter,borderRadius' });
  }, []);

  const navigate = useCallback(
    (href: string, nextLabel = '') => {
      if (pendingRef.current) return;
      const overlay = overlayRef.current;
      const targetPath = href.split(/[?#]/)[0];
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

      // No overlay for reduced-motion or same-path pushes (prevents a stuck
      // cover when the pathname never changes).
      if (!overlay || reduced || targetPath === pathname) {
        router.push(href);
        return;
      }

      pendingRef.current = true;
      setLabel(nextLabel);
      activeTlRef.current?.kill();

      const main = document.querySelector('main');
      const tl = gsap.timeline({ onComplete: () => router.push(href) });
      if (main) {
        tl.to(main, { scale: 0.94, opacity: 0.4, filter: 'blur(6px)', borderRadius: '28px', duration: 0.55, ease: 'power3.inOut' }, 0);
      }
      tl.set(overlay, { pointerEvents: 'auto', visibility: 'visible', opacity: 1 }, 0)
        .fromTo(overlay, { clipPath: 'inset(50% 0% 50% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power4.inOut' }, 0.12)
        .fromTo(labelRef.current, { scale: 0.55, opacity: 0, filter: 'blur(16px)', letterSpacing: '0.2em' }, { scale: 1, opacity: 1, filter: 'blur(0px)', letterSpacing: '0em', duration: 0.6, ease: 'power3.out' }, 0.22)
        .fromTo(noiseRef.current, { opacity: 0.04 }, { opacity: 0.24, duration: 0.55 }, 0.1);
      activeTlRef.current = tl;

      // Failsafe: if the route never actually changes, un-stick the overlay.
      if (failsafeRef.current) clearTimeout(failsafeRef.current);
      failsafeRef.current = setTimeout(() => {
        if (pendingRef.current) {
          pendingRef.current = false;
          activeTlRef.current?.kill();
          resetOverlay();
        }
      }, 2500);
    },
    [router, pathname, resetOverlay]
  );

  // Runs on EVERY route change, regardless of how it was triggered.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    activeTlRef.current?.kill();
    if (failsafeRef.current) clearTimeout(failsafeRef.current);

    // Arrived without our transition (normal link / back / forward): make sure
    // nothing is left covering the screen, then bail.
    if (!pendingRef.current) {
      resetOverlay();
      return;
    }

    const main = document.querySelector('main');
    if (main) gsap.set(main, { scale: 1, opacity: 1, filter: 'none', borderRadius: 0, y: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        pendingRef.current = false;
        resetOverlay();
      },
    });
    tl.to(labelRef.current, { opacity: 0, scale: 1.25, filter: 'blur(10px)', duration: 0.4, ease: 'power2.in' })
      .to(overlay, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.75, ease: 'power4.inOut' }, 0.1);
    if (main) {
      tl.fromTo(main, { y: 26, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.2);
    }
    activeTlRef.current = tl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Cleanup on unmount (defensive — layout normally never unmounts).
  useEffect(() => {
    return () => {
      activeTlRef.current?.kill();
      if (failsafeRef.current) clearTimeout(failsafeRef.current);
    };
  }, []);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div ref={overlayRef} className="page-transition" aria-hidden="true">
        <div ref={noiseRef} className="page-transition__noise" />
        <span ref={labelRef} className="page-transition__label">
          {label}
        </span>
      </div>
    </TransitionContext.Provider>
  );
}
