'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useLenis } from '@/components/SmoothScroll';
import type { VideoProject } from './types';

export default function FullscreenPlayer({
  list,
  startId,
  sourceEl,
  onClose,
}: {
  list: VideoProject[];
  startId: string;
  sourceEl: HTMLElement;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const lenis = useLenis();

  const [index, setIndex] = useState(() => Math.max(0, list.findIndex((p) => p.id === startId)));
  const project = list[index];
  const related = list.filter((p, i) => i !== index && (p.category === project.category || p.tags.some((t) => project.tags.includes(t)))).slice(0, 3);

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + list.length) % list.length), [list.length]);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const stage = stageRef.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!stage || reduced) return onClose();
    const s = sourceEl.getBoundingClientRect();
    const t = stage.getBoundingClientRect();
    gsap.to(detailRef.current, { x: 80, opacity: 0, duration: 0.4, ease: 'power2.in' });
    gsap.to('.vp-chrome', { opacity: 0, duration: 0.3 });
    gsap.to(rootRef.current, { '--vp-bd': 0, duration: 0.6, ease: 'power2.inOut' } as gsap.TweenVars);
    gsap.to(stage, {
      x: s.left - t.left,
      y: s.top - t.top,
      scaleX: s.width / t.width,
      scaleY: s.height / t.height,
      duration: 0.65,
      ease: 'power4.inOut',
      onComplete: onClose,
    });
  }, [onClose, sourceEl]);

  // Open FLIP.
  useIsomorphicLayoutEffect(() => {
    const stage = stageRef.current;
    const root = rootRef.current;
    if (!stage || !root) return;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(root, { '--vp-bd': 1 });
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
      gsap.timeline()
        .to(root, { '--vp-bd': 1, duration: 0.7, ease: 'power2.out' } as gsap.TweenVars, 0)
        .to(stage, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.85, ease: 'power4.inOut' }, 0)
        .from(detailRef.current, { x: 90, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.35)
        .from('.vp-detail > *', { y: 26, opacity: 0, stagger: 0.06, duration: 0.5 }, 0.5)
        .from('.vp-chrome', { opacity: 0, duration: 0.4 }, 0.4);
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
      lenis?.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close, go]);

  return (
    <div ref={rootRef} className="vp" role="dialog" aria-modal="true" aria-label={`${project.title} player`}>
      <div className="vp-backdrop" onClick={close} data-cursor="button" data-cursor-label="CLOSE" />

      <div className="vp-layout">
        <div className="vp-stage-wrap">
          <div ref={stageRef} className="vp-stage">
            {project.video ? (
              <video
                key={project.video + index}
                className="vp-video"
                src={project.video}
                poster={project.cover}
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <Image src={project.cover} alt={project.title} fill sizes="65vw" className="vp-video" />
            )}
          </div>
          <div className="vp-nav vp-chrome">
            <button type="button" onClick={() => go(-1)} aria-label="Previous video" data-cursor="button">← Prev</button>
            <span>{String(index + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => go(1)} aria-label="Next video" data-cursor="button">Next →</button>
          </div>
        </div>

        <aside ref={detailRef} className="vp-detail">
          <span className="vp-cat">{project.category} · {project.duration} · {project.year}</span>
          <h2 className="vp-title">{project.title}</h2>
          <p className="vp-desc">{project.description}</p>
          <dl className="vp-facts">
            <div><dt>Client</dt><dd>{project.client}</dd></div>
            <div><dt>Software</dt><dd>{project.software.join(', ')}</dd></div>
            <div><dt>Year</dt><dd>{project.year}</dd></div>
          </dl>
          <div className="vp-tags">
            {project.tags.map((t) => <span key={t}>{t}</span>)}
          </div>

          {related.length > 0 && (
            <div className="vp-related">
              <span className="vp-related__label">Related</span>
              <div className="vp-related__grid">
                {related.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className="vp-related__item"
                    onClick={() => setIndex(list.findIndex((p) => p.id === r.id))}
                    data-cursor="video"
                  >
                    <Image src={r.cover} alt={r.title} fill sizes="120px" />
                    <span>{r.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <button type="button" className="vp-close vp-chrome" onClick={close} aria-label="Close player" data-cursor="button" data-cursor-label="CLOSE">
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
}
