'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useLenis } from '@/components/SmoothScroll';
import type { GraphicProject } from './types';

export default function FullscreenViewer({
  project,
  sourceEl,
  onClose,
}: {
  project: GraphicProject;
  sourceEl: HTMLElement;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const closingRef = useRef(false);
  const firstRender = useRef(true);
  const lenis = useLenis();

  const total = project.images.length;
  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + total) % total);
  }, [total]);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const stage = stageRef.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const finish = () => onClose();
    if (!stage || reduced) return finish();

    // FLIP back to the (possibly re-scrolled) source position.
    const s = sourceEl.getBoundingClientRect();
    const t = stage.getBoundingClientRect();
    gsap.to(detailsRef.current, { x: 80, opacity: 0, duration: 0.4, ease: 'power2.in' });
    gsap.to('.gfx-viewer__chrome', { opacity: 0, duration: 0.3 });
    gsap.to(rootRef.current, { '--backdrop': 0, duration: 0.6, ease: 'power2.inOut' } as gsap.TweenVars);
    gsap.to(stage, {
      x: s.left - t.left,
      y: s.top - t.top,
      scaleX: s.width / t.width,
      scaleY: s.height / t.height,
      duration: 0.65,
      ease: 'power4.inOut',
      onComplete: finish,
    });
  }, [onClose, sourceEl]);

  // Open: FLIP expand from source + reveal details/chrome.
  useIsomorphicLayoutEffect(() => {
    const stage = stageRef.current;
    const root = rootRef.current;
    if (!stage || !root) return;

    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(root, { '--backdrop': 1 });
        return;
      }
      const s = sourceEl.getBoundingClientRect();
      const t = stage.getBoundingClientRect();
      gsap.set(stage, {
        transformOrigin: 'top left',
        x: s.left - t.left,
        y: s.top - t.top,
        scaleX: s.width / t.width,
        scaleY: s.height / t.height,
      });
      const tl = gsap.timeline();
      tl.to(root, { '--backdrop': 1, duration: 0.7, ease: 'power2.out' } as gsap.TweenVars, 0)
        .to(stage, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.85, ease: 'power4.inOut' }, 0)
        .from(detailsRef.current, { x: 90, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.35)
        .from('.gfx-viewer__detail > *', { y: 26, opacity: 0, stagger: 0.06, duration: 0.5 }, 0.5)
        .from('.gfx-viewer__chrome', { opacity: 0, duration: 0.4 }, 0.4);
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
      lenis?.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Crossfade when switching images (skip the first paint — FLIP owns that).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    gsap.fromTo(
      '.gfx-viewer__img-live',
      { opacity: 0.2, scale: 1.06 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, [index]);

  // Keyboard nav.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close, go]);

  // Swipe / drag nav on the stage.
  const dragX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => { dragX.current = e.clientX; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current == null) return;
    const dx = e.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
  };

  return (
    <div ref={rootRef} className="gfx-viewer" role="dialog" aria-modal="true" aria-label={`${project.title} viewer`}>
      <div className="gfx-viewer__backdrop" onClick={close} data-cursor="button" data-cursor-label="CLOSE" />

      <div className="gfx-viewer__layout">
        {/* Left — large image */}
        <div className="gfx-viewer__stage-wrap">
          <div
            ref={stageRef}
            className="gfx-viewer__stage"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            data-cursor="drag"
            data-cursor-label={total > 1 ? 'DRAG' : ''}
          >
            <Image
              key={project.images[index]}
              src={project.images[index]}
              alt={`${project.title} — image ${index + 1}`}
              fill
              sizes="65vw"
              className="gfx-viewer__img-live"
              priority
            />
          </div>
          {total > 1 && (
            <div className="gfx-viewer__nav gfx-viewer__chrome">
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" data-cursor="button">←</button>
              <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
              <button type="button" onClick={() => go(1)} aria-label="Next image" data-cursor="button">→</button>
            </div>
          )}
        </div>

        {/* Right — details */}
        <aside ref={detailsRef} className="gfx-viewer__detail">
          <span className="gfx-viewer__cat">{project.category} · {project.year}</span>
          <h2 className="gfx-viewer__title">{project.title}</h2>
          <p className="gfx-viewer__desc">{project.description}</p>

          <dl className="gfx-viewer__facts">
            <div><dt>Client</dt><dd>{project.client}</dd></div>
            <div><dt>Year</dt><dd>{project.year}</dd></div>
            <div><dt>Software</dt><dd>{project.software.join(', ')}</dd></div>
          </dl>

          <div className="gfx-viewer__tags">
            {project.tags.map((t) => <span key={t}>{t}</span>)}
          </div>

          {total > 1 && (
            <div className="gfx-viewer__thumbs">
              {project.images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  className={`gfx-viewer__thumb ${i === index ? 'is-active' : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  data-cursor="button"
                >
                  <Image src={src} alt="" fill sizes="90px" />
                </button>
              ))}
            </div>
          )}
        </aside>
      </div>

      <button type="button" className="gfx-viewer__close gfx-viewer__chrome" onClick={close} aria-label="Close viewer" data-cursor="button" data-cursor-label="CLOSE">
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
}
