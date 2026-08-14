'use client';

import { useEffect, useState } from 'react';
import type { GraphicsData } from '@/components/showcase/graphic/types';

type State =
  | { status: 'loading'; data: null; error: null }
  | { status: 'ready'; data: GraphicsData; error: null }
  | { status: 'error'; data: null; error: string };

// Module-level cache — a remount (e.g. navigating away and back) reuses the
// already-fetched/parsed JSON instead of doing it again.
let cached: GraphicsData | null = null;

/** Loads the exhibition content dynamically from /content/graphics.json. */
export function useGraphics(): State {
  const [state, setState] = useState<State>(
    cached ? { status: 'ready', data: cached, error: null } : { status: 'loading', data: null, error: null }
  );

  useEffect(() => {
    if (cached) return;
    let alive = true;
    fetch('/content/graphics.json', { cache: 'force-cache' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<GraphicsData>;
      })
      .then((data) => {
        cached = data;
        if (alive) setState({ status: 'ready', data, error: null });
      })
      .catch((e) => {
        if (alive) setState({ status: 'error', data: null, error: String(e) });
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
