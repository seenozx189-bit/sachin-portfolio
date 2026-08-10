'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTransition } from './PageTransition';

/**
 * Tasteful hidden interactions:
 *  - a styled console signature
 *  - a GitHub-style "g" chord to jump between showcases
 *      g then h / u / g / v / f  →  home / uiux / graphic / video / freelance
 * The chord is ignored while typing in a field.
 */
export default function EasterEggs() {
  const router = useRouter();
  const { navigate } = useTransition();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      '%c✦ Sachin — crafted with GSAP + Lenis. %cPsst: press “g” then h/u/g/v/f.',
      'color:#c8ff18;font-weight:700;font-size:13px;',
      'color:#92958f;font-size:12px;'
    );

    const routes: Record<string, [string, string]> = {
      h: ['/', 'Home'],
      u: ['/work/uiux', 'UI/UX Design'],
      g: ['/work/graphic-design', 'Graphic Design'],
      v: ['/work/video-editing', 'Video Editing'],
      f: ['/work/freelance', 'Freelance Work'],
    };

    let armed = false;
    let timer: ReturnType<typeof setTimeout>;
    const isTyping = () => {
      const el = document.activeElement as HTMLElement | null;
      return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
    };

    const onKey = (e: KeyboardEvent) => {
      if (isTyping() || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (!armed) {
        if (k === 'g') {
          armed = true;
          clearTimeout(timer);
          timer = setTimeout(() => (armed = false), 1200);
        }
        return;
      }
      armed = false;
      clearTimeout(timer);
      const target = routes[k];
      if (target) {
        e.preventDefault();
        navigate(target[0], target[1]);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(timer);
    };
  }, [router, navigate]);

  return null;
}
