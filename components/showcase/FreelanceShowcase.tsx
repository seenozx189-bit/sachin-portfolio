'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { splitReveal } from '@/animations/text';
import { magnetic } from '@/animations/interactions';
import ShowcaseChrome from './ShowcaseChrome';
import TransitionLink from '@/components/TransitionLink';
import {
  disciplines,
  freelanceTimeline,
  testimonials,
  freelanceStats,
  freelanceProcess,
} from '@/data/showcase';

const meta = disciplines.freelance;

export default function FreelanceShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cleanups: Array<() => void> = [];
      cleanups.push(splitReveal(titleRef.current, { type: 'chars', stagger: 0.025, scrollTrigger: false, delay: 0.2, duration: 1 }));
      cleanups.push(magnetic(ctaRef.current, 0.4));

      gsap.from('.fx-hero__intro, .fx-hero__eyebrow', { opacity: 0, y: 30, stagger: 0.12, delay: 0.4, duration: 0.9 });

      // Timeline draw + stops.
      gsap.from('.fx-line__fill', {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: { trigger: '.fx-timeline', start: 'top 60%', end: 'bottom 80%', scrub: true },
      });
      gsap.utils.toArray<HTMLElement>('.fx-stop').forEach((stop, i) => {
        gsap.from(stop, {
          opacity: 0,
          x: i % 2 ? 60 : -60,
          duration: 0.9,
          scrollTrigger: { trigger: stop, start: 'top 82%', once: true },
        });
      });

      // Animated counters.
      gsap.utils.toArray<HTMLElement>('.fx-stat__value').forEach((el) => {
        const end = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.firstChild!.textContent = String(Math.round(obj.v));
          },
        });
      });

      // Marquee (seamless via GSAP).
      const marquee = document.querySelector('.fx-marquee__track');
      if (marquee) {
        gsap.to(marquee, { xPercent: -50, repeat: -1, duration: 18, ease: 'none' });
      }

      gsap.from('.fx-testimonial', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        scrollTrigger: { trigger: '.fx-testimonials', start: 'top 75%', once: true },
      });

      return () => cleanups.forEach((fn) => fn());
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="showcase showcase--freelance" style={{ '--accent': meta.accent } as React.CSSProperties}>
      <ShowcaseChrome index={meta.index} title={meta.title} accent={meta.accent} />

      <section className="fx-hero">
        <p className="fx-hero__eyebrow">({meta.index}) — {meta.tagline}</p>
        <h1 ref={titleRef} className="fx-hero__title">Freelance<br />Creative Work</h1>
        <p className="fx-hero__intro">{meta.intro}</p>
      </section>

      {/* Stats */}
      <section className="fx-stats">
        {freelanceStats.map((s) => (
          <div key={s.label} className="fx-stat">
            <span className="fx-stat__value" data-value={s.value}>
              <span>0</span>{s.suffix}
            </span>
            <span className="fx-stat__label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Marquee */}
      <div className="fx-marquee" aria-hidden="true">
        <div className="fx-marquee__track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              DESIGN <i>✦</i> BRANDING <i>✦</i> MOTION <i>✦</i> STORYTELLING <i>✦</i> UI/UX <i>✦</i> VIDEO <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      {/* Journey timeline */}
      <section className="fx-timeline">
        <h2 className="fx-section-title">The client journey</h2>
        <div className="fx-line" aria-hidden="true"><span className="fx-line__fill" /></div>
        <div className="fx-stops">
          {freelanceTimeline.map((stop, i) => (
            <article key={stop.year + stop.title} className={`fx-stop ${i % 2 ? 'fx-stop--right' : ''}`}>
              <span className="fx-stop__year">{stop.year}</span>
              <h3>{stop.title}</h3>
              <strong>{stop.org}</strong>
              <p>{stop.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="fx-process">
        <h2 className="fx-section-title">How it works</h2>
        <div className="fx-process__grid">
          {freelanceProcess.map((p) => (
            <article key={p.step}>
              <span>{p.step}</span>
              <h3>{p.title}</h3>
              <p>{p.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="fx-testimonials">
        {testimonials.map((t) => (
          <blockquote key={t.name} className="fx-testimonial">
            <p>“{t.quote}”</p>
            <footer><strong>{t.name}</strong> — {t.role}</footer>
          </blockquote>
        ))}
      </section>

      {/* CTA */}
      <section className="fx-cta">
        <h2>Have a project in mind?</h2>
        <TransitionLink ref={ctaRef as never} href="/#contact" transitionLabel="Contact" className="fx-cta__btn" data-cursor="button">
          Let’s work together <span aria-hidden="true">↗</span>
        </TransitionLink>
      </section>
    </main>
  );
}
