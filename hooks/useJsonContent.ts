'use client';

import { useEffect, useState } from 'react';

export type ContentState<T> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'ready'; data: T; error: null }
  | { status: 'error'; data: null; error: string };

// In-memory cache, keyed by path — a page navigated away from and back to
// (or remounted by the route transition) reuses the already-parsed JSON
// instead of re-fetching it every time.
const cache = new Map<string, unknown>();

/** Generic loader for a static JSON content file under /public. */
export function useJsonContent<T>(path: string): ContentState<T> {
  const cached = cache.get(path) as T | undefined;
  const [state, setState] = useState<ContentState<T>>(
    cached ? { status: 'ready', data: cached, error: null } : { status: 'loading', data: null, error: null }
  );

  useEffect(() => {
    if (cache.has(path)) return;
    let alive = true;
    fetch(path)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<T>;
      })
      .then((data) => {
        cache.set(path, data);
        if (alive) setState({ status: 'ready', data, error: null });
      })
      .catch((e) => alive && setState({ status: 'error', data: null, error: String(e) }));
    return () => {
      alive = false;
    };
  }, [path]);

  return state;
}
