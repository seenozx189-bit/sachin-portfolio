'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import type { DeviceKind } from './types';

type Props = {
  kind: DeviceKind;
  src: string;
  alt: string;
  scrollable?: boolean; // inner scroll (prototype)
  priority?: boolean;
  className?: string;
  sizes?: string;
};

/**
 * CSS device frame (desktop / tablet / phone) wrapping an image.
 * `scrollable` renders a tall, inner-scrollable screen for the prototype.
 */
const DeviceMockup = forwardRef<HTMLDivElement, Props>(function DeviceMockup(
  { kind, src, alt, scrollable = false, priority = false, className = '', sizes = '50vw' },
  ref
) {
  return (
    <div ref={ref} className={`device device--${kind} ${className}`}>
      <div className="device__bezel">
        {kind === 'phone' && <span className="device__notch" aria-hidden="true" />}
        {kind === 'desktop' && <span className="device__bar" aria-hidden="true"><i /><i /><i /></span>}
        <div className={`device__screen ${scrollable ? 'is-scrollable' : ''}`}>
          {scrollable ? (
            <div className="device__scroll">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} loading="lazy" decoding="async" />
            </div>
          ) : (
            <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="device__img" />
          )}
        </div>
      </div>
      {kind === 'desktop' && <span className="device__stand" aria-hidden="true" />}
    </div>
  );
});

export default DeviceMockup;
