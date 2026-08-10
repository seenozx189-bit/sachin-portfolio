'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Ambient exhibition backdrop: soft radial gradients, two slow blurred accent
 * circles that drift with the pointer, and a very subtle animated grain.
 * Fixed + pointer-events:none so it never interferes with interaction.
 */
export default function BackgroundFX() {
  const rootRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // Endless gentle drift.
      gsap.to(aRef.current, { xPercent: 12, yPercent: 18, duration: 14, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to(bRef.current, { xPercent: -14, yPercent: -10, duration: 18, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, rootRef);

    // Pointer-follow parallax on the blobs — desktop/fine-pointer only.
    if (!matchMedia('(pointer: fine)').matches) {
      return () => ctx.revert();
    }

    const xA = gsap.quickTo(aRef.current, 'x', { duration: 1.4, ease: 'power2.out' });
    const yA = gsap.quickTo(aRef.current, 'y', { duration: 1.4, ease: 'power2.out' });
    const xB = gsap.quickTo(bRef.current, 'x', { duration: 2, ease: 'power2.out' });
    const yB = gsap.quickTo(bRef.current, 'y', { duration: 2, ease: 'power2.out' });
    const onMove = (e: PointerEvent) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 120;
      const dy = (e.clientY / window.innerHeight - 0.5) * 120;
      xA(dx); yA(dy); xB(-dx * 0.6); yB(-dy * 0.6);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="gfx-bg" aria-hidden="true">
      <div className="gfx-bg__grad" />
      <div ref={aRef} className="gfx-bg__blob gfx-bg__blob--a" />
      <div ref={bRef} className="gfx-bg__blob gfx-bg__blob--b" />
      <div className="gfx-bg__grain" />
    </div>
  );
}
