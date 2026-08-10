'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollEffects() {
  const pathname = usePathname();

  // Re-run on every route change: the layout (and therefore this component)
  // persists across client navigations, so the freshly-mounted page's
  // [data-reveal] nodes must be re-observed and revealed — otherwise they stay
  // hidden by `.motion-ready [data-reveal] { opacity: 0 }` and the page looks
  // blank after navigating back. Every listener/observer is torn down first so
  // nothing accumulates across navigations.
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector('.site-header');

    const revealNodes = Array.from(document.querySelectorAll('[data-reveal]')) as HTMLElement[];
    const parallaxNodes = Array.from(document.querySelectorAll('[data-parallax]')) as HTMLElement[];

    const show = (node: Element) => node.classList.add('is-visible');

    const revealVisible = () => {
      const vh = window.innerHeight;
      revealNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top < vh * 0.94 && rect.bottom > 0) show(node);
      });
    };

    revealVisible();
    root.classList.add('motion-ready');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    revealNodes.forEach((node) => {
      if (!node.classList.contains('is-visible')) revealObserver.observe(node);
    });

    let frame = 0;
    function updateMotion() {
      frame = 0;
      const vh = window.innerHeight;
      const range = Math.max(1, document.documentElement.scrollHeight - vh);
      root.style.setProperty('--page-progress', String(window.scrollY / range));
      header?.classList.toggle('is-scrolled', window.scrollY > 16);

      parallaxNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > vh + 80) return;
        const centre = rect.top + rect.height / 2;
        const offset = (centre - vh / 2) / vh;
        const speed = Number(node.dataset.parallax || 20);
        node.style.setProperty('--parallax-y', `${offset * speed}px`);
      });
      revealVisible();
    }

    function requestUpdate() {
      if (!frame) frame = requestAnimationFrame(updateMotion);
    }

    updateMotion();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('pageshow', revealVisible);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('pageshow', revealVisible);
      if (frame) cancelAnimationFrame(frame);
      revealObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
