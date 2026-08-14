'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useLenis } from '@/components/SmoothScroll';
import { splitReveal } from '@/animations/text';
import { tilt } from '@/animations/interactions';
import AnimatedCounter from './AnimatedCounter';
import DeviceMockup from './DeviceMockup';
import type { UiuxProject } from './types';

export default function CaseStudyReader({
  list,
  startId,
  sourceEl,
  onClose,
}: {
  list: UiuxProject[];
  startId: string;
  sourceEl: HTMLElement;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const closingRef = useRef(false);
  const lenis = useLenis();

  const [index, setIndex] = useState(() => Math.max(0, list.findIndex((p) => p.id === startId)));
  const [activeSection, setActiveSection] = useState('overview');
  const project = list[index];

  const sections = useMemo(() => {
    const s: Array<{ id: string; label: string }> = [
      { id: 'overview', label: 'Overview' },
      { id: 'problem', label: 'Problem' },
    ];
    if (project.research) s.push({ id: 'research', label: 'Research' });
    if (project.personas?.length) s.push({ id: 'personas', label: 'Personas' });
    if (project.userFlow?.length) s.push({ id: 'flow', label: 'User Flow' });
    if (project.wireframes?.length) s.push({ id: 'wireframes', label: 'Wireframes' });
    if (project.designs?.length) s.push({ id: 'ui', label: 'UI' });
    if (project.prototype) s.push({ id: 'prototype', label: 'Prototype' });
    if (project.results?.length) s.push({ id: 'results', label: 'Results' });
    if (project.gallery?.length) s.push({ id: 'gallery', label: 'Gallery' });
    return s;
  }, [project]);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + list.length) % list.length);
  }, [list.length]);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const hero = heroRef.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hero || reduced) return onClose();
    const s = sourceEl.getBoundingClientRect();
    const t = hero.getBoundingClientRect();
    gsap.to('.csr-chrome', { opacity: 0, duration: 0.3 });
    gsap.to(rootRef.current, { '--csr-bg': 0, duration: 0.5 } as gsap.TweenVars);
    gsap.to(hero, {
      x: s.left - t.left, y: s.top - t.top,
      scaleX: s.width / t.width, scaleY: s.height / t.height,
      duration: 0.65, ease: 'power4.inOut', onComplete: onClose,
    });
  }, [onClose, sourceEl]);

  // Open FLIP (runs once).
  useIsomorphicLayoutEffect(() => {
    const hero = heroRef.current;
    const root = rootRef.current;
    if (!hero || !root) return;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) { gsap.set(root, { '--csr-bg': 1 }); return; }
      const s = sourceEl.getBoundingClientRect();
      const t = hero.getBoundingClientRect();
      gsap.set(hero, {
        transformOrigin: 'top left',
        x: s.left - t.left, y: s.top - t.top,
        scaleX: s.width / t.width, scaleY: s.height / t.height,
      });
      gsap.timeline()
        .to(root, { '--csr-bg': 1, duration: 0.6, ease: 'power2.out' } as gsap.TweenVars, 0)
        .to(hero, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.9, ease: 'power4.inOut' }, 0)
        .from('.csr-hero__meta > *', { y: 30, opacity: 0, stagger: 0.06, duration: 0.6 }, 0.5)
        .from('.csr-chrome', { opacity: 0, duration: 0.4 }, 0.4);
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
      lenis?.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Per-project scroll animations (re-run when switching project).
  useIsomorphicLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({ top: 0 });
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const st = (extra: object = {}) => ({ scroller, once: true, ...extra });

      // Split reveals on section titles.
      const cleanups: Array<() => void> = [];
      gsap.utils.toArray<HTMLElement>('.csr-title').forEach((el) => {
        cleanups.push(splitReveal(el, { type: 'words', stagger: 0.05, duration: 0.9, start: 'top 88%', scrollTrigger: !reduced, scroller }));
      });

      if (reduced) return () => cleanups.forEach((f) => f());

      // Generic body reveal.
      gsap.utils.toArray<HTMLElement>('.csr-reveal').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 44, duration: 0.9, ease: 'power3.out', scrollTrigger: st({ trigger: el, start: 'top 86%' }) });
      });

      // Research cards stagger.
      gsap.from('.csr-rcard', { opacity: 0, y: 40, stagger: 0.1, duration: 0.7, scrollTrigger: st({ trigger: '.csr-research', start: 'top 70%' }) });

      // Persona cards.
      gsap.from('.csr-persona', { opacity: 0, y: 50, rotationY: 8, stagger: 0.15, duration: 0.8, scrollTrigger: st({ trigger: '.csr-personas', start: 'top 75%' }) });

      // User flow: nodes pop + line draws on scrub.
      if (document.querySelector('.csr-flow__line')) {
        gsap.fromTo('.csr-flow__line', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', ease: 'none', scrollTrigger: st({ once: false, trigger: '.csr-flow', start: 'top 80%', end: 'bottom 60%', scrub: true }) });
        gsap.from('.csr-flow__node', { opacity: 0, scale: 0.4, stagger: 0.12, duration: 0.5, scrollTrigger: st({ trigger: '.csr-flow', start: 'top 72%' }) });
      }

      // Wireframes spread apart on scrub.
      gsap.utils.toArray<HTMLElement>('.csr-wire').forEach((w, i, arr) => {
        const spread = (i - (arr.length - 1) / 2);
        gsap.fromTo(w,
          { xPercent: spread * 10, yPercent: 6, rotationZ: spread * 2, scale: 0.94 },
          { xPercent: spread * 78, yPercent: 0, rotationZ: spread * 1, scale: 1, ease: 'power2.out',
            scrollTrigger: st({ once: false, trigger: '.csr-wireframes', start: 'top 80%', end: 'bottom 70%', scrub: true }) });
      });

      // Hi-fi designs: mask reveal + parallax.
      gsap.utils.toArray<HTMLElement>('.csr-ui-shot').forEach((shot) => {
        const img = shot.querySelector('img, .device');
        gsap.fromTo(shot, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.out', scrollTrigger: st({ trigger: shot, start: 'top 82%' }) });
        if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: st({ once: false, trigger: shot, start: 'top bottom', end: 'bottom top', scrub: true }) });
      });

      // Results metrics.
      gsap.from('.csr-metric', { opacity: 0, y: 40, stagger: 0.1, duration: 0.7, scrollTrigger: st({ trigger: '.csr-results', start: 'top 75%' }) });

      // Gallery stagger mask.
      gsap.utils.toArray<HTMLElement>('.csr-gitem').forEach((g, i) => {
        gsap.fromTo(g, { clipPath: 'inset(0% 0% 100% 0%)', y: 40 }, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 0.9, ease: 'power4.out', scrollTrigger: st({ trigger: g, start: 'top 88%' }), delay: (i % 2) * 0.08 });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cleanups.forEach((f) => f());
    }, scrollerRef);

    return () => ctx.revert();
  }, [project.id]);

  // Persona / device tilt (pointer).
  useEffect(() => {
    const cleanups = Array.from(document.querySelectorAll<HTMLElement>('.csr-persona')).map((el) => tilt(el, { max: 8 }));
    return () => cleanups.forEach((f) => f());
  }, [project.id]);

  // Progress bar + active-section indicator.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      const p = scroller.scrollTop / Math.max(1, scroller.scrollHeight - scroller.clientHeight);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActiveSection(vis.target.id);
      },
      { root: scroller, rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.6] }
    );
    scroller.querySelectorAll('[data-section]').forEach((el) => obs.observe(el));
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      obs.disconnect();
    };
  }, [project.id]);

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

  const jump = (id: string) => {
    const el = scrollerRef.current?.querySelector<HTMLElement>(`#csr-${id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={rootRef} className="csr" role="dialog" aria-modal="true" aria-label={`${project.title} case study`}>
      <span ref={barRef} className="csr-progress" aria-hidden="true" />

      {/* Chrome */}
      <div className="csr-chrome csr-topbar">
        <button type="button" className="csr-back" onClick={close} data-cursor="button"><span aria-hidden="true">←</span> Close</button>
        <nav className="csr-sectionnav" aria-label="Sections">
          {sections.map((s) => (
            <button key={s.id} type="button" className={activeSection === s.id ? 'is-active' : ''} onClick={() => jump(s.id)} data-cursor="button">
              {s.label}
            </button>
          ))}
        </nav>
        <div className="csr-switch">
          <button type="button" onClick={() => go(-1)} aria-label="Previous project" data-cursor="button">←</button>
          <span>{String(index + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => go(1)} aria-label="Next project" data-cursor="button">→</button>
        </div>
      </div>

      <div ref={scrollerRef} className="csr-scroller" key={project.id}>
        {/* HERO */}
        <header id="csr-overview" data-section="overview" className="csr-hero">
          <div className="csr-hero__meta">
            <span className="csr-hero__eyebrow">{project.client} · {project.year}</span>
            <h1 className="csr-hero__title">{project.title}</h1>
            <p className="csr-hero__sub">{project.subtitle}</p>
            <dl className="csr-hero__facts">
              <div><dt>Role</dt><dd>{project.role}</dd></div>
              <div><dt>Duration</dt><dd>{project.duration}</dd></div>
              <div><dt>Tools</dt><dd>{project.tools.join(', ')}</dd></div>
            </dl>
          </div>
          <div ref={heroRef} className="csr-hero__media">
            <Image src={project.hero} alt={project.title} fill sizes="90vw" priority className="csr-hero__img" />
          </div>
        </header>

        {/* OVERVIEW */}
        <section className="csr-section csr-overview">
          <span className="csr-kicker">01 — Overview</span>
          <p className="csr-lead csr-reveal">{project.overview}</p>
        </section>

        {/* PROBLEM */}
        <section id="csr-problem" data-section="problem" className="csr-section csr-problem">
          <span className="csr-kicker">02 — Problem</span>
          <h2 className="csr-title csr-statement">{project.problem}</h2>
        </section>

        {/* RESEARCH */}
        {project.research && (
          <section id="csr-research" data-section="research" className="csr-section csr-research">
            <div className="csr-research__sticky">
              <span className="csr-kicker">03 — Research</span>
              <h2 className="csr-title">Understanding the people</h2>
            </div>
            <div className="csr-research__body">
              <p className="csr-reveal">{project.research}</p>
              <div className="csr-rgrid">
                {project.researchStats?.map((m) => (
                  <div key={m.label} className="csr-rcard">
                    <strong><AnimatedCounter value={m.value} suffix={m.suffix} scroller={scrollerRef.current} /></strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PERSONAS */}
        {project.personas?.length > 0 && (
          <section id="csr-personas" data-section="personas" className="csr-section csr-personas">
            <span className="csr-kicker">04 — Personas</span>
            <h2 className="csr-title">Who we design for</h2>
            <div className="csr-persona-grid">
              {project.personas.map((p) => (
                <article key={p.name} className="csr-persona">
                  <div className="csr-persona__head">
                    <span className="csr-persona__avatar" aria-hidden="true">{p.name.charAt(0)}</span>
                    <div><strong>{p.name}</strong><span>{p.role}</span></div>
                  </div>
                  <p>{p.bio}</p>
                  <div className="csr-persona__detail">
                    <div><span>Goals</span><ul>{p.goals.map((g) => <li key={g}>{g}</li>)}</ul></div>
                    <div><span>Frustrations</span><ul>{p.frustrations.map((f) => <li key={f}>{f}</li>)}</ul></div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* USER FLOW */}
        {project.userFlow?.length > 0 && (
          <section id="csr-flow" data-section="flow" className="csr-section csr-flow">
            <span className="csr-kicker">05 — User Flow</span>
            <h2 className="csr-title">The path to done</h2>
            <div className="csr-flow__diagram">
              <span className="csr-flow__line" aria-hidden="true" />
              {project.userFlow.map((f, i) => (
                <div key={f.label} className="csr-flow__node">
                  <span className="csr-flow__num">{i + 1}</span>
                  <strong>{f.label}</strong>
                  {f.note && <em>{f.note}</em>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* WIREFRAMES */}
        {project.wireframes?.length > 0 && (
          <section id="csr-wireframes" data-section="wireframes" className="csr-section csr-wireframes">
            <span className="csr-kicker">06 — Wireframes</span>
            <h2 className="csr-title">Structure before style</h2>
            <div className="csr-wire-stack">
              {project.wireframes.map((src, i) => (
                <figure key={src + i} className="csr-wire" style={{ zIndex: project.wireframes.length - i } as React.CSSProperties}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${project.title} wireframe ${i + 1}`} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* HIGH FIDELITY UI */}
        {project.designs?.length > 0 && (
          <section id="csr-ui" data-section="ui" className="csr-section csr-ui">
            <span className="csr-kicker">07 — High-Fidelity UI</span>
            <h2 className="csr-title">The interface, resolved</h2>
            <div className="csr-ui-list">
              {project.designs.map((src, i) => (
                <div key={src + i} className="csr-ui-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${project.title} UI ${i + 1}`} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROTOTYPE */}
        {project.prototype && (
          <section id="csr-prototype" data-section="prototype" className="csr-section csr-prototype">
            <span className="csr-kicker">08 — Prototype</span>
            <h2 className="csr-title">Try the flow</h2>
            <div className="csr-proto">
              <div className="csr-proto__device">
                <DeviceMockup kind="phone" src={project.prototype} alt={`${project.title} prototype`} scrollable />
                <span className="csr-proto__hotspot csr-proto__hotspot--1" aria-hidden="true" />
                <span className="csr-proto__hotspot csr-proto__hotspot--2" aria-hidden="true" />
              </div>
              <div className="csr-proto__copy csr-reveal">
                <p>Scroll inside the device to walk the core flow. Hotspots mark the key interactions the prototype validates.</p>
                {project.prototypeUrl ? (
                  <a className="csr-proto__btn" href={project.prototypeUrl} target="_blank" rel="noopener noreferrer" data-cursor="button" data-cursor-label="OPEN">Open live prototype ↗</a>
                ) : (
                  <span className="csr-proto__note">Interactive Figma prototype available on request.</span>
                )}
              </div>
            </div>
          </section>
        )}

        {/* RESULTS */}
        {project.results?.length > 0 && (
          <section id="csr-results" data-section="results" className="csr-section csr-results">
            <span className="csr-kicker">09 — Results</span>
            <h2 className="csr-title">What changed</h2>
            <div className="csr-metrics">
              {project.results.map((m) => (
                <div key={m.label} className="csr-metric">
                  <strong><AnimatedCounter value={m.value} suffix={m.suffix} scroller={scrollerRef.current} /></strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
            {project.feedback && (
              <blockquote className="csr-feedback csr-reveal">
                <p>“{project.feedback.quote}”</p>
                <footer><strong>{project.feedback.name}</strong> — {project.feedback.role}</footer>
              </blockquote>
            )}
          </section>
        )}

        {/* GALLERY */}
        {project.gallery?.length > 0 && (
          <section id="csr-gallery" data-section="gallery" className="csr-section csr-gallery">
            <span className="csr-kicker">10 — Final Gallery</span>
            <h2 className="csr-title">The finished work</h2>
            <div className="csr-ggrid">
              {project.gallery.map((src, i) => (
                <figure key={src + i} className="csr-gitem">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${project.title} gallery ${i + 1}`} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* NEXT PROJECT */}
        <button type="button" className="csr-next" onClick={() => go(1)} data-cursor="button" data-cursor-label="NEXT">
          <span>Next project</span>
          <strong>{list[(index + 1) % list.length].title}</strong>
          <em aria-hidden="true">↗</em>
        </button>
      </div>

      <button type="button" className="csr-chrome csr-close" onClick={close} aria-label="Close case study" data-cursor="button" data-cursor-label="CLOSE">
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
}
