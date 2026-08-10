'use client';

import { useEffect, useRef } from 'react';
import TransitionLink from '@/components/TransitionLink';
import { magnetic } from '@/animations/interactions';

/**
 * Shared top chrome for every showcase page: morphing back button +
 * breadcrumb + a per-page scroll progress bar.
 */
export default function ShowcaseChrome({
  index,
  title,
  accent,
}: {
  index: string;
  title: string;
  accent: string;
}) {
  const backRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => magnetic(backRef.current, 0.35), []);

  return (
    <div className="showcase-chrome" style={{ '--accent': accent } as React.CSSProperties}>
      <TransitionLink
        href="/#services"
        transitionLabel="Home"
        className="showcase-back"
        ref={backRef as never}
        data-cursor="button"
      >
        <span className="showcase-back__arrow" aria-hidden="true">←</span>
        <span>Back</span>
      </TransitionLink>
      <nav className="showcase-crumbs" aria-label="Breadcrumb">
        <TransitionLink href="/" transitionLabel="Home">Sachin</TransitionLink>
        <span aria-hidden="true">/</span>
        <TransitionLink href="/#services" transitionLabel="Work">Work</TransitionLink>
        <span aria-hidden="true">/</span>
        <strong>
          <em>{index}</em> {title}
        </strong>
      </nav>
    </div>
  );
}
