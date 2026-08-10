'use client';

import Link from 'next/link';
import { useTransition } from './PageTransition';

type Props = React.ComponentProps<typeof Link> & {
  transitionLabel?: string;
};

/**
 * Drop-in replacement for next/link that plays the cinematic overlay
 * before navigating. External and hash links fall through to normal Link.
 */
export default function TransitionLink({ href, transitionLabel, onClick, ...rest }: Props) {
  const { navigate } = useTransition();
  const hrefStr = typeof href === 'string' ? href : '';
  const isInternal = hrefStr.startsWith('/') && !hrefStr.startsWith('/#');

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (isInternal && !e.defaultPrevented && !e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          navigate(hrefStr, transitionLabel);
        }
      }}
      {...rest}
    />
  );
}
