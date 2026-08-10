'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TransitionLink from '@/components/TransitionLink';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import data from '@/content/socialMedia.json';

const hero = data.hero;

/**
 * Shared Social Media hero — identical on the homepage (compact) and at the
 * top of /social-media (full-height, `full` prop). One scoped gsap.context
 * drives all reveals and is reverted on unmount. No new Lenis/cursor/transition
 * systems; "View my system" uses the existing page-transition on the homepage.
 */
export default function SocialHero({ full = false }: { full?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
      });
      tl.from('.sh-video', { opacity: 0, scale: 1.06, duration: 1.4, ease: 'power3.out' }, 0)
        .from('.sh-eyebrow', { yPercent: 120, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.1)
        .from('.sh-title .sh-line > span', { yPercent: 110, duration: 0.9, ease: 'power4.out', stagger: 0.1 }, 0.2)
        .from('.sh-visual', { clipPath: 'inset(0% 0% 0% 100%)', duration: 1.1, ease: 'power4.inOut' }, 0.35)
        .from('.sh-desc', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.6)
        .from('.sh-pipe span', { opacity: 0, y: 14, duration: 0.5, stagger: 0.04, ease: 'power2.out' }, 0.7)
        .from('.sh-actions > *', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.85)
        .from('.sh-cap', { opacity: 0, duration: 0.6 }, 0.75);
    }, rootRef);
    return () => {
      ctx.revert();
      // Pause the hero video when leaving (the element itself is removed on
      // unmount, which releases it). Avoid removing src — React reuses the
      // element under StrictMode and would not restore it.
      videoRef.current?.pause();
    };
  }, []);

  // Guarantee muted autoplay (browsers require muted before play()).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener('canplay', tryPlay, { once: true });
    return () => v.removeEventListener('canplay', tryPlay);
  }, []);

  const Primary = full
    ? (p: { className: string; children: React.ReactNode }) => (
        <a href="#sm-pipeline" className={p.className} data-cursor="button">{p.children}</a>
      )
    : (p: { className: string; children: React.ReactNode }) => (
        <TransitionLink href="/social-media" transitionLabel="Social Media" className={p.className} data-cursor="button">{p.children}</TransitionLink>
      );

  return (
    <section ref={rootRef} id="social" className={`sh section-shell section-border section-anchor ${full ? 'sh--full' : ''}`}>
      {full && hero.video && (
        <div className="sh-video" aria-hidden="true">
          <video
            ref={videoRef}
            src={hero.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="sh-video__scrim" />
        </div>
      )}
      <div className="sh-grid-lines" aria-hidden="true" />
      <div className="sh-grain" aria-hidden="true" />

      <p className="sh-eyebrow">{hero.eyebrow}</p>

      <div className="sh-main">
        <div className="sh-left">
          <h1 className="sh-title">
            {hero.headline.map((l, i) => (
              <span key={i} className={`sh-line sh-line--${l.style}`}><span>{l.text}</span></span>
            ))}
          </h1>
        </div>

        {!full && (
          <figure className="sh-visual">
            <span className="sh-visual__label">{hero.imageLabel}</span>
            <div className="sh-visual__frame" style={hero.image ? { aspectRatio: hero.imageRatio } : undefined}>
              {hero.image ? (
                <Image src={hero.image} alt="Social media creative collage" fill sizes="(max-width: 900px) 90vw, 34vw" className="sh-visual__img" />
              ) : (
                <div className="sh-visual__fallback" aria-hidden="true">
                  <span className="sh-visual__mark">SOCIAL</span>
                  <span className="sh-visual__shard sh-visual__shard--1" />
                  <span className="sh-visual__shard sh-visual__shard--2" />
                  <span className="sh-visual__shard sh-visual__shard--3" />
                </div>
              )}
            </div>
            <figcaption className="sh-cap">{hero.imageCaption}</figcaption>
          </figure>
        )}

        <div className="sh-foot">
          <p className="sh-desc">{hero.description}</p>
          <p className="sh-pipe">
            {hero.pipeline.map((p, i) => (
              <span key={p}>{p}{i < hero.pipeline.length - 1 && <i aria-hidden="true"> → </i>}</span>
            ))}
          </p>
          <div className="sh-actions">
            <Primary className="pill-button sh-btn">{hero.primaryCta} <span aria-hidden="true">↘</span></Primary>
            <Link className="outline-button sh-btn" href="/#contact" data-cursor="button">{hero.secondaryCta} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
