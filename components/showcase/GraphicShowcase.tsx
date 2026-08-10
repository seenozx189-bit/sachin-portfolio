'use client';

import { useState } from 'react';
import ShowcaseChrome from './ShowcaseChrome';
import BackgroundFX from './graphic/BackgroundFX';
import GraphicHero from './graphic/GraphicHero';
import EditorialGallery from './graphic/EditorialGallery';
import FullscreenViewer from './graphic/FullscreenViewer';
import type { OpenPayload } from './graphic/ArtworkCard';
import { useGraphics } from '@/hooks/useGraphics';

const ACCENT = '#ff5c38';

export default function GraphicShowcase() {
  const state = useGraphics();
  const [open, setOpen] = useState<OpenPayload | null>(null);

  return (
    <main className="showcase showcase--graphic" style={{ '--accent': ACCENT } as React.CSSProperties}>
      <BackgroundFX />
      <ShowcaseChrome index="02" title="Graphic Design" accent={ACCENT} />

      {state.status === 'loading' && (
        <div className="gfx-loading" role="status">
          <span>Curating the exhibition…</span>
        </div>
      )}

      {state.status === 'error' && (
        <div className="gfx-loading" role="alert">
          <span>Couldn’t load the exhibition. Please refresh.</span>
        </div>
      )}

      {state.status === 'ready' && (
        <>
          <GraphicHero
            subtitle={state.data.meta.subtitle}
            intro={state.data.meta.intro}
            count={state.data.projects.length}
          />
          <EditorialGallery projects={state.data.projects} onOpen={setOpen} />
          <div className="gfx-outro">
            <p>End of exhibition</p>
            <span>Every piece is one conversation away from the next.</span>
          </div>
        </>
      )}

      {open && (
        <FullscreenViewer
          project={open.project}
          sourceEl={open.imageEl}
          onClose={() => setOpen(null)}
        />
      )}
    </main>
  );
}
