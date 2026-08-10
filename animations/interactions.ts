'use client';

import { gsap } from '@/lib/gsap';

/**
 * Magnetic button/element. Pulls toward the cursor and springs back.
 */
export function magnetic(el: HTMLElement | null, strength = 0.4) {
  if (!el) return () => {};
  const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });

  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    xTo(relX * strength);
    yTo(relY * strength);
  };
  const onLeave = () => {
    xTo(0);
    yTo(0);
  };

  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerleave', onLeave);
  return () => {
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerleave', onLeave);
  };
}

type TiltOptions = {
  max?: number; // max rotation in degrees
  lift?: number; // px translateY on hover
  rotateZ?: number; // deg z-rotation on hover
  scale?: number;
};

/**
 * 3D hover tilt for cards/posters/artwork. Reads pointer position, applies
 * rotX/rotY, and optionally lifts + z-rotates + scales on enter.
 */
export function tilt(el: HTMLElement | null, opts: number | TiltOptions = {}) {
  if (!el) return () => {};
  const { max = 10, lift = 0, rotateZ = 0, scale = 1.03 } =
    typeof opts === 'number' ? { max: opts } : opts;

  const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });
  const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });

  // Cache the rect on enter so pointermove never forces a layout reflow.
  let rect: DOMRect | null = null;
  const onMove = (e: PointerEvent) => {
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotY(px * max * 2);
    rotX(-py * max * 2);
  };
  const onEnter = () => {
    rect = el.getBoundingClientRect();
    gsap.to(el, { scale, z: 60, y: -lift, rotationZ: rotateZ, duration: 0.5, ease: 'power3.out' });
  };
  const onLeave = () => {
    rotX(0);
    rotY(0);
    gsap.to(el, { scale: 1, z: 0, y: 0, rotationZ: 0, duration: 0.6, ease: 'power3.out' });
  };

  el.style.transformStyle = 'preserve-3d';
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerenter', onEnter);
  el.addEventListener('pointerleave', onLeave);
  return () => {
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerenter', onEnter);
    el.removeEventListener('pointerleave', onLeave);
  };
}
