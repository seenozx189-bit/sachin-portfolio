'use client';

import { useMemo, useState } from 'react';
import ShowcaseChrome from './ShowcaseChrome';
import VideoHero from './video/VideoHero';
import FeaturedReel from './video/FeaturedReel';
import CategoryFilter from './video/CategoryFilter';
import HorizontalReels from './video/HorizontalReels';
import VideoTimeline from './video/VideoTimeline';
import FullscreenPlayer from './video/FullscreenPlayer';
import { useJsonContent } from '@/hooks/useJsonContent';
import { VIDEO_CATEGORIES, type VideosData, type VideoProject } from './video/types';

const ACCENT = '#38a1ff';

type Opened = { project: VideoProject; el: HTMLElement };

export default function VideoShowcase() {
  const state = useJsonContent<VideosData>('/content/videos.json');
  const [category, setCategory] = useState<string>('All');
  const [opened, setOpened] = useState<Opened | null>(null);

  const projects = state.status === 'ready' ? state.data.projects : [];

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length };
    VIDEO_CATEGORIES.forEach((cat) => {
      if (cat !== 'All') c[cat] = projects.filter((p) => p.category === cat).length;
    });
    return c;
  }, [projects]);

  const filtered = category === 'All' ? projects : projects.filter((p) => p.category === category);
  const featured = projects.find((p) => p.featured) ?? projects[0];

  return (
    <main className="showcase showcase--video" style={{ '--accent': ACCENT } as React.CSSProperties}>
      <ShowcaseChrome index="03" title="Video Editing" accent={ACCENT} />

      {state.status === 'loading' && (
        <div className="gfx-loading" role="status"><span>Loading the reel…</span></div>
      )}
      {state.status === 'error' && (
        <div className="gfx-loading" role="alert"><span>Couldn’t load the reel. Please refresh.</span></div>
      )}

      {state.status === 'ready' && (
        <>
          <VideoHero
            subtitle={state.data.meta.subtitle}
            intro={state.data.meta.intro}
            heroReel={state.data.meta.heroReel}
            poster={featured?.cover ?? '/images/work-nonames.jpg'}
          />

          {featured && (
            <FeaturedReel
              project={featured}
              onOpen={(el) => setOpened({ project: featured, el })}
            />
          )}

          <CategoryFilter active={category} counts={counts} onChange={setCategory} />

          {filtered.length > 0 ? (
            <HorizontalReels
              key={category}
              projects={filtered}
              onOpen={(project, el) => setOpened({ project, el })}
            />
          ) : (
            <div className="hr-empty"><span>No edits in this category yet.</span></div>
          )}

          <VideoTimeline projects={projects} />

          <div className="vx-outro">
            <p>Let’s cut something great.</p>
            <span>Reels, teasers, launch films — one message away.</span>
          </div>
        </>
      )}

      {opened && (
        <FullscreenPlayer
          list={projects}
          startId={opened.project.id}
          sourceEl={opened.el}
          onClose={() => setOpened(null)}
        />
      )}
    </main>
  );
}
