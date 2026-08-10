'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Minimal, premium custom cursor.
 *
 *  - A tiny solid dot that tracks the pointer almost instantly.
 *  - A thin ring that trails with a slight delay.
 *  - Interactive states are driven by a `data-cursor` attribute on hovered
 *    elements ("image" | "video" | "button" | "drag") plus an optional
 *    `data-cursor-label` (only "CLOSE" is surfaced as text).
 *
 * Movement uses gsap.quickTo (no React state on mousemove, no extra rAF loop).
 * Disabled on touch/coarse pointers and under prefers-reduced-motion (the
 * native cursor is left intact there).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(pointer: fine)').matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!fine || reduced || !dot || !ring || !label) return;

    document.documentElement.classList.add('has-custom-cursor');

    // Dot ~instant, ring trails slightly. Single interpolation per element.
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.09, ease: 'power3' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.09, ease: 'power3' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

    let visible = false;
    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3, ease: 'power2.out' });
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    let current = '';
    const apply = (key: string, text: string) => {
      if (key === current) return;
      current = key;
      const labelled = Boolean(text);

      label.textContent = text;
      gsap.to(ring, {
        scale: labelled ? 1.95 : key === 'button' ? 0.62 : 1,
        borderColor: labelled ? 'var(--lime)' : 'color-mix(in srgb, var(--lime) 55%, transparent)',
        backgroundColor: labelled ? 'var(--lime)' : 'transparent',
        duration: 0.34,
        ease: 'power3.out',
      });
      gsap.to(label, { opacity: labelled ? 1 : 0, duration: 0.22, ease: 'power2.out' });
      gsap.to(dot, { opacity: labelled ? 0 : 1, duration: 0.2, ease: 'power2.out' });
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        '[data-cursor],[data-cursor-label],a,button,input,textarea,select'
      );
      if (!target) return apply('default', '');

      const kind = target.getAttribute('data-cursor');
      const rawLabel = (target.getAttribute('data-cursor-label') || '').toUpperCase();
      const tag = target.tagName.toLowerCase();
      const state = kind || (tag === 'a' || tag === 'button' ? 'button' : 'default');

      let text = '';
      if (state === 'image') text = 'VIEW';
      else if (state === 'video') {
        const host = target.closest<HTMLElement>('[data-cursor="video"]');
        const vid = host?.querySelector('video') as HTMLVideoElement | null;
        const playing = !!vid && !vid.paused && !vid.ended && vid.readyState > 2;
        text = playing ? 'PAUSE' : 'PLAY';
      } else if (state === 'drag') text = 'DRAG';
      else if (rawLabel === 'CLOSE') text = 'CLOSE';

      // Key includes text so PLAY↔PAUSE re-applies.
      apply(`${state}:${text}`, text);
    };

    const onLeaveWindow = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };
    const onDown = () => gsap.to(dot, { scale: 0.5, duration: 0.15, ease: 'power2.out' });
    const onUp = () => gsap.to(dot, { scale: 1, duration: 0.2, ease: 'power2.out' });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeaveWindow);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('mouseleave', onLeaveWindow);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      gsap.killTweensOf([dot, ring, label]);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <span ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <span ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </span>
    </>
  );
}
