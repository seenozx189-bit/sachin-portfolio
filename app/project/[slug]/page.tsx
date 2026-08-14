import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  
  if (!project) {
    return {
      title: 'Project Not Found — Sachin',
    };
  }

  return {
    title: `${project.title} — Sachin`,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects[slug];
  
  if (!project) {
    notFound();
  }

  return (
    <main id="top">
      <article className="case-study section-shell">
        <div className="case-topline" data-reveal="fade">
          <Link href="/#work">← Back to work</Link>
          <span id="project-category">{project.category}</span>
        </div>
        <h1 className="case-title" id="project-title" data-reveal="clip">{project.title}</h1>
        <div className="case-meta" data-reveal="up">
          <div><span>Client</span><strong id="project-client">{project.client}</strong></div>
          <div><span>Year</span><strong id="project-year">{project.year}</strong></div>
          <div><span>Tools</span><strong id="project-tools">{project.tools}</strong></div>
        </div>
        <div className="case-cover" data-reveal="image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img id="project-cover" src={project.image} alt={`${project.title} cover visual`} fetchPriority="high" />
        </div>
        <div className="case-copy-grid">
          <section data-reveal="up">
            <span>01 — Overview</span><h2>Overview</h2>
            <p id="project-overview">{project.overview}</p>
          </section>
          <section data-reveal="up">
            <span>02 — Challenge</span><h2>The challenge</h2>
            <p id="project-challenge">{project.challenge}</p>
          </section>
          <section data-reveal="up">
            <span>03 — Approach</span><h2>Creative approach</h2>
            <p id="project-approach">{project.approach}</p>
          </section>
          <section data-reveal="up">
            <span>04 — Outcome</span><h2>Outcome</h2>
            <p id="project-outcome">{project.outcome}</p>
          </section>
        </div>
        <section className="case-process" data-reveal="up">
          <span className="eyebrow">Process</span>
          <div id="project-process">
            {project.process.map((step, i) => (
              <article key={i}>
                <span>0{i + 1}</span><strong>{step}</strong>
              </article>
            ))}
          </div>
        </section>
        <div className="case-gallery">
          {(project.gallery && project.gallery.length ? project.gallery : [project.image, project.image]).map((src, i) => (
            <div
              key={src + i}
              data-reveal="project"
              className={project.galleryFit === 'contain' ? 'case-gallery__tile--contain' : undefined}
              style={{ '--delay': `${i * 90}ms` } as React.CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img id={`gallery-${i + 1}`} src={src} alt={`${project.title} gallery visual ${i + 1}`} />
            </div>
          ))}
        </div>
        <Link className="next-project" id="next-project" href={`/project/${project.next}`} data-reveal="up">
          <span>Next project</span><strong id="next-title">{project.nextTitle}</strong><i aria-hidden="true">↗</i>
        </Link>
        <div className="case-external-cta" data-reveal="up" style={{ marginTop: '3rem', padding: '2.5rem', textAlign: 'center', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <p style={{ color: 'var(--muted)', margin: '0 0 1.2rem', fontSize: '0.9rem' }}>Explore more work across UI/UX, Graphic Design, and Video Editing:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a className="pill-button" href="https://www.behance.net/seenozx079" target="_blank" rel="noopener noreferrer">UI/UX &amp; Video Editing on Behance ↗</a>
            <a className="outline-button" href="https://drive.google.com/file/d/10srS0EIxnKd-d3qkvcK3rLpTUscZm-Gv/view?usp=sharing" target="_blank" rel="noopener noreferrer">Graphic Design on Google Drive ↗</a>
          </div>
        </div>
      </article>
      <footer className="footer section-shell section-border case-footer">
        <h2 data-reveal="clip">LET’S MAKE SOMETHING <span>MEMORABLE.</span></h2>
        <div className="footer-grid">
          <div>
            <strong className="footer-name">SACHIN</strong>
            <p>UI/UX Designer · Graphic Designer · Video Editor</p>
          </div>
          <div>
            <span className="eyebrow">Navigate</span>
            <Link href="/#work">Portfolio</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
          </div>
          <div>
            <span className="eyebrow">Social</span>
            <a href="https://www.behance.net/seenozx079" target="_blank" rel="noopener noreferrer">Behance</a>
            <a href="https://drive.google.com/file/d/10srS0EIxnKd-d3qkvcK3rLpTUscZm-Gv/view?usp=sharing" target="_blank" rel="noopener noreferrer">Google Drive</a>
            <a href="#">LinkedIn</a>
          </div>
          <div className="footer-top">
            <a className="outline-button" href="#top">Back to top <span>↑</span></a>
          </div>
        </div>
        <p className="copyright">© 2026 Sachin. All rights reserved.</p>
      </footer>
    </main>
  );
}
