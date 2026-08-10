'use client';

import { useEffect, useState } from 'react';

export type ContentState<T> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'ready'; data: T; error: null }
  | { status: 'error'; data: null; error: string };

/** Generic loader for a static JSON content file under /public. */
export function useJsonContent<T>(path: string): ContentState<T> {
  const [state, setState] = useState<ContentState<T>>({ status: 'loading', data: null, error: null });

  useEffect(() => {
    let alive = true;
    fetch(path, { cache: 'force-cache' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<T>;
      })
      .then((data) => alive && setState({ status: 'ready', data, error: null }))
      .catch((e) => alive && setState({ status: 'error', data: null, error: String(e) }));
    return () => {
      alive = false;
    };
  }, [path]);

  return state;
}
