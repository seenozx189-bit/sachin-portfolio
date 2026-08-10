'use client';

import SplitType from 'split-type';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// Remembers each element's ORIGINAL markup before it was ever split, so a
// re-split (React re-mount, StrictMode double-invoke, missed revert) can always
// restore clean text first instead of nesting split spans → duplicated text.
const originalHTML = new WeakMap<Element, string>();

type SplitRevealOptions = {
  type?: 'chars' | 'words' | 'lines' | 'words,chars';
  stagger?: number;
  duration?: number;
  y?: string;
  scrollTrigger?: boolean;
  start?: string;
  delay?: number;
  scroller?: Element | null;
};

/**
 * Masked, character/word/line reveal using SplitType + GSAP.
 * Returns a cleanup function that reverts the split DOM.
 */
export function splitReveal(
  el: Element | null,
  {
    type = 'lines',
    stagger = 0.06,
    duration = 1,
    y = '110%',
    scrollTrigger = true,
    start = 'top 85%',
    delay = 0,
    scroller,
  }: SplitRevealOptions = {}
): () => void {
  if (!el) return () => {};

  // Idempotency guard: restore pristine markup before (re)splitting so split
  // spans can never accumulate/duplicate across mounts.
  if (originalHTML.has(el)) {
    el.innerHTML = originalHTML.get(el) as string;
  } else {
    originalHTML.set(el, el.innerHTML);
  }

  const split = new SplitType(el as HTMLElement, {
    types: type,
    tagName: 'span',
  });

  const targets =
    type === 'chars' || type === 'words,chars'
      ? split.chars
      : type === 'words'
      ? split.words
      : split.lines;

  const restore = () => {
    try {
      split.revert();
    } catch {
      /* noop */
    }
    if (originalHTML.has(el)) el.innerHTML = originalHTML.get(el) as string;
  };

  if (!targets || !targets.length) return restore;

  // Wrap each target in an overflow-hidden mask for the classic reveal.
  targets.forEach((node) => {
    const parent = node.parentElement;
    if (parent) parent.style.overflow = 'hidden';
    (node as HTMLElement).style.display = 'inline-block';
    (node as HTMLElement).style.willChange = 'transform';
  });

  const tween = gsap.from(targets, {
    yPercent: parseFloat(y),
    duration,
    delay,
    ease: 'power4.out',
    stagger,
    ...(scrollTrigger
      ? { scrollTrigger: { trigger: el as Element, start, once: true, scroller: scroller ?? undefined } }
      : {}),
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    restore();
  };
}

/**
 * Fade + rise reveal for blocks of elements (paragraphs, meta rows, cards).
 */
export function fadeUpBatch(
  targets: string | Element[] | NodeListOf<Element>,
  scope?: Element,
  { stagger = 0.08, y = 40, start = 'top 88%' } = {}
): ScrollTrigger | undefined {
  const nodes =
    typeof targets === 'string'
      ? (scope ?? document).querySelectorAll(targets)
      : targets;
  if (!nodes || !(nodes as ArrayLike<Element>).length) return;

  const tween = gsap.from(nodes as gsap.TweenTarget, {
    opacity: 0,
    y,
    duration: 0.9,
    ease: 'power3.out',
    stagger,
    scrollTrigger: {
      trigger: scope ?? (nodes as NodeListOf<Element>)[0],
      start,
      once: true,
    },
  });
  return tween.scrollTrigger;
}
