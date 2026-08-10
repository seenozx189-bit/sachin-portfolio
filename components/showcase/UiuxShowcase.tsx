'use client';

import { useState } from 'react';
import ShowcaseChrome from './ShowcaseChrome';
import UiuxHero from './uiux/UiuxHero';
import ProjectExplorer, { type ExplorerOpen } from './uiux/ProjectExplorer';
import CaseStudyReader from './uiux/CaseStudyReader';
import { useJsonContent } from '@/hooks/useJsonContent';
import type { UiuxData } from './uiux/types';

const ACCENT = '#c8ff18';

export default function UiuxShowcase() {
  const state = useJsonContent<UiuxData>('/content/uiux.json');
  const [open, setOpen] = useState<ExplorerOpen | null>(null);

  return (
    <main className="showcase showcase--uiux" style={{ '--accent': ACCENT } as React.CSSProperties}>
      <ShowcaseChrome index="01" title="UI/UX Design" accent={ACCENT} />

      {state.status === 'loading' && (
        <div className="gfx-loading" role="status"><span>Loading case studies…</span></div>
      )}
      {state.status === 'error' && (
        <div className="gfx-loading" role="alert"><span>Couldn’t load the case studies. Please refresh.</span></div>
      )}

      {state.status === 'ready' && (
        <>
          <UiuxHero
            subtitle={state.data.meta.subtitle}
            intro={state.data.meta.intro}
            floaters={state.data.projects}
          />
          <ProjectExplorer projects={state.data.projects} onOpen={setOpen} />
          <div className="uxe-outro">
            <p>Design is a process, not a screen.</p>
            <span>Every project above started with a question, not a canvas.</span>
          </div>
        </>
      )}

      {open && (
        <CaseStudyReader
          list={state.status === 'ready' ? state.data.projects : []}
          startId={open.project.id}
          sourceEl={open.el}
          onClose={() => setOpen(null)}
        />
      )}
    </main>
  );
}
