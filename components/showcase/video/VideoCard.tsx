'use client';

import { useEffect, useRef, useState } from 'react';
import { tilt } from '@/animations/interactions';
import LazyVideo from './LazyVideo';
import type { RailSlot, VideoProject } from './types';

export default function VideoCard({
  project,
  slot,
  index,
  onOpen,
}: {
  project: VideoProject;
  slot: RailSlot;
  index: number;
  onOpen: (project: VideoProject, el: HTMLElement) => void;
}) {
  const innerRef = useRef<HTMLButtonElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => tilt(innerRef.current, { max: 5, lift: 10, scale: 1.03 }), []);

  return (
    <figure
      className="vc"
      style={{ '--offset': `${slot.offset}vh` } as React.CSSProperties}
    >
      <button
        ref={innerRef}
        type="button"
        className={`vc-inner ${hover ? 'is-hover' : ''}`}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        onClick={() => mediaRef.current && onOpen(project, mediaRef.current)}
        data-cursor="video"
        data-cursor-label="PLAY"
        aria-label={`Play ${project.title}`}
      >
        <div ref={mediaRef} className="vc-media">
          <LazyVideo
            src={project.preview}
            poster={project.cover}
            alt={project.title}
            mode="hover"
            active={hover}
            sizes="(max-width: 760px) 90vw, 46vw"
            priority={index < 2}
          />
          <span className="vc-dur">{project.duration}</span>
          <span className="vc-progress" aria-hidden="true"><span /></span>
          <span className="vc-glow" aria-hidden="true" />
        </div>
        <figcaption className="vc-cap">
          <h3 className="vc-title">{project.title}</h3>
          <span className="vc-cat">{project.category}</span>
        </figcaption>
      </button>
    </figure>
  );
}
