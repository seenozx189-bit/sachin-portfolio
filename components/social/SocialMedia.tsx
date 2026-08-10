'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import data from '@/content/socialMedia.json';
import SocialHero from './SocialHero';
import ShowcaseChrome from '@/components/showcase/ShowcaseChrome';

/**
 * Full Social Media Management experience (route /social-media). Begins with
 * the shared <SocialHero> and continues into the detailed sections. Standard
 * reveals reuse the existing [data-reveal] system; this adds only a few scoped
 * ScrollTriggers for the flourishes, all reverted on unmount.
 */
export default function SocialMedia() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      // Pipeline connector draws as you scroll through it.
      gsap.fromTo(
        '.sm-pipeline__line i',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: { trigger: '.sm-pipeline__list', start: 'top 75%', end: 'bottom 70%', scrub: true },
        }
      );

      // Continuous loop rotation (single tween, GPU transform).
      gsap.to('.sm-loop__spinner', { rotate: 360, duration: 22, ease: 'none', repeat: -1 });

      // Account cards reveal: first from left, second from right.
      const cards = gsap.utils.toArray<HTMLElement>('.sm-account-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: '.sm-accounts__grid',
              start: 'top 80%',
            },
          }
        );
      });

      // Account card hover — subtle image scale + card lift + accent reveal.
      cards.forEach((card) => {
        const img = card.querySelector('img');
        const overlay = card.querySelector('.sm-account-card__overlay');
        const btn = card.querySelector('.sm-account-card__btn');
        const arrow = card.querySelector('.sm-account-card__btn i');

        card.addEventListener('mouseenter', () => {
          gsap.to(img, { scale: 1.05, duration: 0.6, ease: 'power2.out' });
          gsap.to(card, { y: -6, duration: 0.4, ease: 'power2.out' });
          gsap.to(overlay, { opacity: 0.15, duration: 0.4 });
          gsap.to(btn, { color: '#c8ff18', duration: 0.3 });
          gsap.to(arrow, { x: 4, y: -2, duration: 0.3, ease: 'power2.out' });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' });
          gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
          gsap.to(overlay, { opacity: 0, duration: 0.4 });
          gsap.to(btn, { color: '', duration: 0.3 });
          gsap.to(arrow, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const loopAngle = 360 / data.loop.length;

  return (
    <>
      <ShowcaseChrome index="SM" title="Social Media" accent="#c8ff18" />

      {/* 01 — HERO (shared, identical to the homepage) */}
      <SocialHero full />

      <section ref={rootRef} className="sm section-shell section-anchor">
      {/* 02 — PIPELINE */}
      <div id="sm-pipeline" className="sm-pipeline">
        <div className="section-label" data-reveal="fade"><span>(01) — PIPELINE</span><span>ONE CONNECTED SYSTEM</span></div>
        <h3 className="sm-h" data-reveal="clip">THE SOCIAL <span>PIPELINE</span></h3>
        <div className="sm-pipeline__list">
          <span className="sm-pipeline__line" aria-hidden="true"><i /></span>
          {data.pipeline.map((p) => (
            <article key={p.num} className="sm-pipeline__row" data-reveal="up">
              <span className="sm-pipeline__num">{p.num}</span>
              <strong>{p.title}</strong>
              <em>{p.note}</em>
            </article>
          ))}
        </div>
      </div>

      {/* 03 — WHY SOCIAL */}
      <div className="sm-why">
        <div className="section-label" data-reveal="fade"><span>(02) — WHY IT MATTERS</span><span>FIVE REASONS</span></div>
        <h3 className="sm-huge" data-reveal="clip">WHY <span>SOCIAL?</span></h3>
        <p className="sm-why__intro" data-reveal="up">{data.why.intro}</p>
        <div className="sm-grid sm-grid--5">
          {data.why.blocks.map((b) => (
            <article key={b.num} className="sm-block" data-reveal="up">
              <span className="sm-block__num">{b.num}</span>
              <h4>{b.title}</h4>
              <p>{b.copy}</p>
            </article>
          ))}
        </div>
      </div>

      {/* 04 — CONTENT ENGINE */}
      <div className="sm-engine">
        <div className="section-label" data-reveal="fade"><span>(03) — CONTENT ENGINE</span><span>A REPEATABLE PROCESS</span></div>
        <h3 className="sm-h" data-reveal="clip">CONTENT IS <span>NOT RANDOM.</span></h3>
        <p className="sm-engine__intro" data-reveal="up">{data.engine.intro}</p>
        <div className="sm-engine__flow">
          {data.engine.steps.map((s, i) => (
            <span key={s} className="sm-engine__step" data-reveal="up" style={{ '--delay': `${i * 45}ms` } as React.CSSProperties}>
              {s}
              {i < data.engine.steps.length - 1 && <i aria-hidden="true">→</i>}
            </span>
          ))}
        </div>
      </div>

      {/* 05 — CONTENT PILLARS */}
      <div className="sm-pillars">
        <div className="section-label" data-reveal="fade"><span>(04) — CONTENT PILLARS</span><span>WHAT WE POST & WHY</span></div>
        <h3 className="sm-h" data-reveal="clip">THE <span>PILLARS</span></h3>
        <div className="sm-grid sm-grid--3">
          {data.pillars.map((p) => (
            <article key={p.num} className="sm-pillar" data-reveal="up">
              <span className="sm-block__num">{p.num}</span>
              <h4>{p.name}</h4>
              <p>{p.copy}</p>
            </article>
          ))}
        </div>
      </div>

      {/* 05b — THE ACCOUNTS */}
      <div className="sm-accounts">
        <div className="sm-accounts__intro">
          <h3 className="sm-huge sm-accounts__statement" data-reveal="clip">
            THE THEORY IS EASY.<br />
            <span>SHOW ME THE ACCOUNTS.</span>
          </h3>
          <div className="section-label sm-accounts__label" data-reveal="fade">
            <span>(02) — ACCOUNTS</span><span>PROOF OF WORK</span>
          </div>
        </div>

        <div className="sm-accounts__grid">
          {data.accounts.map((account, i) => (
            <a
              key={account.handle}
              href={account.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`sm-account-card sm-account-card--${i}`}
              data-cursor="image"
              data-cursor-label="VIEW"
            >
              <div className="sm-account-card__visual">
                <img
                  src={account.image}
                  alt={`${account.handle} Instagram profile`}
                  loading="lazy"
                />
                <div className="sm-account-card__overlay" aria-hidden="true" />
              </div>
              <div className="sm-account-card__info">
                <span className="sm-account-card__handle">{account.handle}</span>
                <p className="sm-account-card__desc">{account.description}</p>
                <span className="sm-account-card__btn">
                  VIEW PROFILE <i aria-hidden="true">↗</i>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 06 — FORMATS */}
      <div className="sm-formats">
        <div className="section-label" data-reveal="fade"><span>(05) — FORMATS</span><span>PRODUCTION BOARD</span></div>
        <h3 className="sm-h" data-reveal="clip">FORMATS I <span>MANAGE</span></h3>
        <div className="sm-board">
          {data.formats.map((f, i) => (
            <span key={f} className="sm-chip-lg" data-reveal="up" style={{ '--delay': `${i * 40}ms` } as React.CSSProperties}>{f}</span>
          ))}
        </div>
      </div>

      {/* 07 — TEST / LEARN / LOOP */}
      <div className="sm-loop">
        <div className="sm-loop__copy">
          <div className="section-label" data-reveal="fade"><span>(07) — TEST & LEARN</span><span>NOTHING IS ASSUMED</span></div>
          <h3 className="sm-huge" data-reveal="clip">DON'T BELIEVE<br />THE STRATEGY.<br /><span>TEST IT.</span></h3>
          <p data-reveal="up">Every idea is a hypothesis until the audience votes. The system runs on evidence, not opinion.</p>
        </div>
        <div className="sm-loop__ring" data-reveal="scale">
          <span className="sm-loop__spinner" aria-hidden="true" />
          {data.loop.map((l, i) => (
            <span key={l} className="sm-loop__node" style={{ transform: `rotate(${i * loopAngle}deg) translateY(-120px) rotate(${-i * loopAngle}deg)` }}>{l}</span>
          ))}
        </div>
      </div>

      {/* 09 — ANALYTICS */}
      <div className="sm-metrics">
        <div className="section-label" data-reveal="fade"><span>(08) — ANALYTICS</span><span>WHAT GETS MEASURED</span></div>
        <h3 className="sm-h" data-reveal="clip">MEASURED, <span>NOT GUESSED.</span></h3>
        <div className="sm-grid sm-grid--3 sm-metrics__grid">
          {data.metrics.map((m, i) => (
            <article key={m} className="sm-metric" data-reveal="up">
              <span className="sm-metric__bar" style={{ '--w': `${45 + ((i * 37) % 55)}%` } as React.CSSProperties} aria-hidden="true" />
              <strong>{m}</strong>
            </article>
          ))}
        </div>
        <p className="sm-metrics__note" data-reveal="fade">Illustrative categories — not client results.</p>
      </div>

      {/* 10 — TOOLS */}
      <div className="sm-tools">
        <div className="section-label" data-reveal="fade"><span>(09) — TOOLS & PLATFORMS</span><span>THE WORKFLOW</span></div>
        <h3 className="sm-h" data-reveal="clip">THE <span>STACK</span></h3>
        <div className="sm-board">
          {data.tools.map((t, i) => (
            <span key={t} className="sm-chip" data-reveal="up" style={{ '--delay': `${i * 35}ms` } as React.CSSProperties}>{t}</span>
          ))}
        </div>
      </div>

      {/* 11 — WHAT I ACTUALLY DO */}
      <div className="sm-services">
        <div className="section-label" data-reveal="fade"><span>(10) — THE SERVICE</span><span>END TO END</span></div>
        <h3 className="sm-h" data-reveal="clip">WHAT I <span>ACTUALLY DO</span></h3>
        <div className="sm-services__list">
          {data.services.map((s, i) => (
            <article key={s.title} className="sm-service" data-reveal="row">
              <span className="sm-service__idx">{String(i + 1).padStart(2, '0')}</span>
              <h4>{s.title}</h4>
              <p>{s.copy}</p>
            </article>
          ))}
        </div>
      </div>

      {/* 12 — POSITIONING */}
      <div className="sm-position">
        <div className="section-label" data-reveal="fade"><span>(11) — POSITIONING</span><span>THE DIFFERENTIATOR</span></div>
        <div className="sm-position__grid">
          <h3 className="sm-huge" data-reveal="clip">
            {data.positioning.lines.map((l, i) => (
              <span key={i}>{l}<br /></span>
            ))}
          </h3>
          <div className="sm-position__aside">
            <p data-reveal="up">{data.positioning.copy}</p>
            <div className="sm-position__traits" data-reveal="up">
              {data.positioning.traits.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* 13 — CTA */}
      <div className="sm-cta">
        <h3 className="sm-cta__title" data-reveal="clip">
          {data.cta.lines.map((l, i) => (
            <span key={i}>{l}<br /></span>
          ))}
        </h3>
        <Link className="pill-button sm-cta__btn" href="/#contact" data-reveal="scale" data-cursor="button">
          {data.cta.button} <span aria-hidden="true">↗</span>
        </Link>
      </div>
      </section>
    </>
  );
}
