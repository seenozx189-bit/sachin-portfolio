'use client';

import { VIDEO_CATEGORIES } from './types';

export default function CategoryFilter({
  active,
  counts,
  onChange,
}: {
  active: string;
  counts: Record<string, number>;
  onChange: (c: string) => void;
}) {
  return (
    <div className="vf">
      <span className="vf-label">Filter</span>
      <div className="vf-pills" role="tablist" aria-label="Video categories">
        {VIDEO_CATEGORIES.filter((c) => c === 'All' || counts[c]).map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={active === c}
            className={`vf-pill ${active === c ? 'is-active' : ''}`}
            onClick={() => onChange(c)}
            data-cursor="button"
          >
            {c}
            <em>{c === 'All' ? counts.All : counts[c]}</em>
          </button>
        ))}
      </div>
    </div>
  );
}
