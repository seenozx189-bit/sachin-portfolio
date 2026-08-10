'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type PlayMode = 'hover' | 'inview' | 'always';

/**
 * Poster image + lazily-loaded <video>. The video source is only attached
 * once the element is near the viewport (IntersectionObserver). Playback:
 *  - 'hover'  : plays while `active` is true and it's near the viewport
 *  - 'inview' : plays whenever it's on screen, pauses when it leaves
 *  - 'always' : plays as soon as it's near (ambient hero reel)
 * Pauses whenever off-screen for performance. Falls back to the poster if the
 * source is missing or errors.
 */
export default function LazyVideo({
  src,
  poster,
  alt,
  mode = 'inview',
  active = false,
  className = '',
  sizes = '100vw',
  priority = false,
  rootMargin = '400px',
}: {
  src?: string;
  poster: string;
  alt: string;
  mode?: PlayMode;
  active?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rootMargin?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(!src);

  // Near-viewport (lazy attach) + on-screen (play/pause) observers.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const nearObs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setNear(true),
      { rootMargin }
    );
    const screenObs = new IntersectionObserver(
      ([e]) => setOnScreen(e.isIntersecting),
      { threshold: 0.25 }
    );
    nearObs.observe(el);
    screenObs.observe(el);
    return () => {
      nearObs.disconnect();
      screenObs.disconnect();
    };
  }, [rootMargin]);

  // Drive play/pause from mode + state.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || failed) return;
    const shouldPlay =
      onScreen && (mode === 'always' || mode === 'inview' || (mode === 'hover' && active));
    if (shouldPlay) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [onScreen, active, mode, failed, near]);

  const showVideo = near && src && !failed;

  return (
    <div ref={wrapRef} className={`lazyvid ${className}`}>
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`lazyvid__poster ${ready ? 'is-hidden' : ''}`}
      />
      {showVideo && (
        <video
          ref={videoRef}
          className={`lazyvid__video ${ready ? 'is-ready' : ''}`}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
