'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { tilt } from '@/animations/interactions';
import type { GraphicProject, LayoutSlot } from './types';

export type OpenPayload = {
  project: GraphicProject;
  imageEl: HTMLElement;
};

export default function ArtworkCard({
  project,
  slot,
  index,
  onOpen,
}: {
  project: GraphicProject;
  slot: LayoutSlot;
  index: number;
  onOpen: (p: OpenPayload) => void;
}) {
  const innerRef = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hover tilt only on fine pointers — pointless (and costly) on touch.
    if (!matchMedia('(pointer: fine)').matches) return;
    return tilt(innerRef.current, { max: 6, lift: 16, rotateZ: slot.rotate < 0 ? 1.5 : -1.5, scale: 1.02 });
  }, [slot.rotate]);

  return (
    <figure
      className={`gfx-card gfx-card--${slot.size} ${slot.overlap ? 'is-overlap' : ''}`}
      style={
        {
          '--rotate': `${slot.rotate}deg`,
          '--ratio': project.ratio ?? slot.ratio,
          alignSelf: slot.align === 'start' ? 'flex-start' : slot.align === 'end' ? 'flex-end' : 'center',
        } as React.CSSProperties
      }
    >
      <button
        ref={innerRef}
        type="button"
        className="gfx-card__inner"
        onClick={() => imgRef.current && onOpen({ project, imageEl: imgRef.current })}
        data-cursor="image"
        data-cursor-label="VIEW"
        aria-label={`Open ${project.title}`}
      >
        <div ref={imgRef} className="gfx-card__frame">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 760px) 90vw, 55vw"
            className="gfx-card__img"
            loading={index === 0 ? undefined : 'lazy'}
            priority={index === 0}
          />
          <span className="gfx-card__num">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <figcaption className="gfx-card__cap">
          <span className="gfx-card__title">{project.title}</span>
          <span className="gfx-card__cat">{project.category}</span>
          <span className="gfx-card__year">{project.year}</span>
        </figcaption>
      </button>
    </figure>
  );
}
