import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import TransitionLink from '@/components/TransitionLink';
import SocialHero from '@/components/social/SocialHero';

export default function Home() {
  return (
    <main>
      <section id="home" className="hero section-shell section-anchor" aria-labelledby="hero-title">
        <div className="hero-topline" data-reveal="fade">
          <span>PORTFOLIO — 2025 EDITION</span>
          <span>BASED IN INDIA · AVAILABLE FOR WORK</span>
        </div>
        <h1 id="hero-title" className="hero-name" data-reveal="clip">SACHIN</h1>
        <div className="hero-rule" data-reveal="scale"></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-role" data-reveal="up" style={{ '--delay': '80ms' } as React.CSSProperties}>
              UI/UX DESIGNER · GRAPHIC DESIGNER · VIDEO EDITOR
            </p>
            <p className="hero-intro" data-reveal="up" style={{ '--delay': '150ms' } as React.CSSProperties}>
              I’m Sachin, a multidisciplinary creative designer specializing in UI/UX design, graphic design, and video editing. I create visually engaging digital experiences, brand identities, and creative content that combine design, storytelling, and visual impact.
            </p>
            <div className="hero-actions" data-reveal="up" style={{ '--delay': '220ms' } as React.CSSProperties}>
              <Link className="pill-button" href="/#work">
                View my work <span aria-hidden="true">↘</span>
              </Link>
              <Link className="text-link" href="/#contact">
                <span>Let’s work together</span><span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="lime-marquee" aria-label="Experience design create edit">
        <div className="marquee-track">
          <span>EXPERIENCE</span><span>DESIGN</span><span>CREATE</span><span>EDIT</span>
          <span>EXPERIENCE</span><span>DESIGN</span><span>CREATE</span><span>EDIT</span>
          <span>EXPERIENCE</span><span>DESIGN</span><span>CREATE</span><span>EDIT</span>
        </div>
      </div>

      <section id="about" className="about section-shell section-border section-anchor">
        <div className="section-label" data-reveal="fade">
          <span>(01) — ABOUT</span><span>MULTIDISCIPLINARY</span>
        </div>
        <h2 className="section-title about-title" data-reveal="clip">
          I DON’T JUST DESIGN <span>VISUALS</span>
        </h2>
        <div className="about-grid">
          <div className="about-content">
            <p className="about-lead" data-reveal="up">
              I create experiences, identities, and stories. My work sits at the intersection of interface design, brand visuals, and motion — bringing structure to ideas and emotion to pixels.
            </p>
            <div className="about-columns">
              <div data-reveal="up" style={{ '--delay': '90ms' } as React.CSSProperties}>
                <span className="eyebrow">Education</span>
                <p>Diploma in Computer Science Engineering — Guru Teg Bahadur Institute of Technology.</p>
              </div>
              <div data-reveal="up" style={{ '--delay': '160ms' } as React.CSSProperties}>
                <span className="eyebrow">Philosophy</span>
                <p>Design with intent, craft with obsession. Every frame, grid and cut should earn its place and serve the story being told.</p>
              </div>
              <div data-reveal="up" style={{ '--delay': '230ms' } as React.CSSProperties}>
                <span className="eyebrow">Direct Contact</span>
                <p className="about-contact-detail">
                  <span>Email: <a href="mailto:seenozx189@gmail.com">seenozx189@gmail.com</a></span><br />
                  <span>Phone: <a href="tel:7505995365">+91 7505995365</a></span>
                </p>
              </div>
            </div>
            <div className="focus-area" data-reveal="up" style={{ '--delay': '220ms' } as React.CSSProperties}>
              <span className="eyebrow">Expertise</span>
              <div className="expertise-inline">
                <span>UI/UX Design</span><span>Graphic Design</span><span>Video Editing</span>
                <span>Front-End Web Development</span><span>Branding</span><span>Digital Creative Work</span>
              </div>
            </div>
          </div>
        </div>
        <div className="capability-grid">
          <TransitionLink href="/work/uiux" transitionLabel="UI/UX Design" className="capability" data-reveal="up" data-cursor="button" data-cursor-label="OPEN" style={{ '--delay': '0ms' } as React.CSSProperties}>
            <span>01</span><strong>UI/UX Design →</strong>
          </TransitionLink>
          <TransitionLink href="/work/graphic-design" transitionLabel="Graphic Design" className="capability" data-reveal="up" data-cursor="button" data-cursor-label="OPEN" style={{ '--delay': '75ms' } as React.CSSProperties}>
            <span>02</span><strong>Graphic Design →</strong>
          </TransitionLink>
          <TransitionLink href="/work/video-editing" transitionLabel="Video Editing" className="capability" data-reveal="up" data-cursor="button" data-cursor-label="OPEN" style={{ '--delay': '150ms' } as React.CSSProperties}>
            <span>03</span><strong>Video Editing →</strong>
          </TransitionLink>
          <TransitionLink href="/work/freelance" transitionLabel="Freelance Work" className="capability" data-reveal="up" data-cursor="button" data-cursor-label="OPEN" style={{ '--delay': '225ms' } as React.CSSProperties}>
            <span>04</span><strong>Freelance Creative Work →</strong>
          </TransitionLink>
        </div>
      </section>

      <SocialHero />

      <section id="experience" className="journey section-shell section-border section-anchor">
        <div className="section-label" data-reveal="fade">
          <span>(02) — EXPERIENCE</span><span>CAREER JOURNEY</span>
        </div>
        <h2 className="section-title" data-reveal="clip">THE <span>JOURNEY</span></h2>
        <div className="timeline">
          <article className="timeline-row" data-reveal="row">
            <span className="timeline-index">01</span>
            <h3>Front-end web development</h3>
            <strong className="timeline-organisation">Udemy</strong>
            <p>Completed front-end web development learning and training through Udemy, adding code fluency to a design-led workflow.</p>
            <span className="timeline-period">2024</span>
          </article>
          <article className="timeline-row" data-reveal="row" style={{ '--delay': '65ms' } as React.CSSProperties}>
            <span className="timeline-index">02</span>
            <h3><a href="https://www.behance.net/seenozx079" target="_blank" rel="noopener noreferrer" className="timeline-title-link">UI/UX designer ↗</a></h3>
            <strong className="timeline-organisation">Intuch Group Quality Service</strong>
            <p>Focused on digital interfaces and user experiences: wireframes, prototypes, and visual design across products. <a href="https://www.behance.net/seenozx079" target="_blank" rel="noopener noreferrer" className="inline-work-link">View Behance ↗</a></p>
            <span className="timeline-period">—</span>
          </article>
          <article className="timeline-row" data-reveal="row" style={{ '--delay': '130ms' } as React.CSSProperties}>
            <span className="timeline-index">03</span>
            <h3>Graphic designer &amp; video editor</h3>
            <strong className="timeline-organisation">Chokkha Foods &amp; NoNames</strong>
            <p>Creating brand visuals, social media content, product creatives and teaser/reel video content. View <a href="https://drive.google.com/file/d/10srS0EIxnKd-d3qkvcK3rLpTUscZm-Gv/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-work-link">Graphics on Drive ↗</a> or <a href="https://www.behance.net/seenozx079" target="_blank" rel="noopener noreferrer" className="inline-work-link">Videos on Behance ↗</a></p>
            <span className="timeline-period">Present</span>
          </article>
          <article className="timeline-row" data-reveal="row" style={{ '--delay': '195ms' } as React.CSSProperties}>
            <span className="timeline-index">04</span>
            <h3>Freelance creative work</h3>
            <strong className="timeline-organisation">Independent</strong>
            <p>Projects across design, branding, graphics, social media content and video editing for clients and personal ventures. <a href="https://www.behance.net/seenozx079" target="_blank" rel="noopener noreferrer" className="inline-work-link">Behance ↗</a> · <a href="https://drive.google.com/file/d/10srS0EIxnKd-d3qkvcK3rLpTUscZm-Gv/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-work-link">Drive ↗</a></p>
            <span className="timeline-period">Ongoing</span>
          </article>
        </div>
      </section>

      <section id="skills" className="skills section-shell section-border section-anchor">
        <div className="section-label" data-reveal="fade">
          <span>(03) — SKILLS</span><span>CRAFT STACK</span>
        </div>
        <h2 className="section-title" data-reveal="clip">WHAT I <span>DO BEST</span></h2>
        <div className="expertise-grid">
          <div className="expertise-column" data-reveal="up">
            <h3>Design</h3>
            <div className="chip-row">
              <span className="chip">UI/UX Design</span><span className="chip">Graphic Design</span><span className="chip">Branding</span><span className="chip">Wireframing</span><span className="chip">Prototyping</span>
            </div>
          </div>
          <div className="expertise-column" data-reveal="up" style={{ '--delay': '100ms' } as React.CSSProperties}>
            <h3>Creative &amp; visual</h3>
            <div className="chip-row">
              <span className="chip">Video Editing</span><span className="chip">Visual Storytelling</span><span className="chip">Social Media Creative</span><span className="chip">Brand Visuals</span>
            </div>
          </div>
          <div className="expertise-column" data-reveal="up" style={{ '--delay': '200ms' } as React.CSSProperties}>
            <h3>Tools</h3>
            <div className="chip-row">
              <span className="chip">Figma</span><span className="chip">Adobe Photoshop</span><span className="chip">Adobe Illustrator</span><span className="chip">Adobe Premiere Pro</span><span className="chip">Filmora Wondershare</span><span className="chip">CapCut</span><span className="chip">BandLab</span>
            </div>
          </div>
        </div>
        <div className="mini-marquee" aria-hidden="true">
          <div>
            <span>LAYOUT<i>✦</i></span><span>MOTION<i>✦</i></span><span>BRANDING<i>✦</i></span><span>STORYTELLING<i>✦</i></span>
            <span>INTERFACE<i>✦</i></span><span>COLOUR<i>✦</i></span><span>RHYTHM<i>✦</i></span><span>TYPOGRAPHY<i>✦</i></span>
            <span>LAYOUT<i>✦</i></span><span>MOTION<i>✦</i></span><span>BRANDING<i>✦</i></span><span>STORYTELLING<i>✦</i></span>
            <span>INTERFACE<i>✦</i></span><span>COLOUR<i>✦</i></span><span>RHYTHM<i>✦</i></span><span>TYPOGRAPHY<i>✦</i></span>
          </div>
        </div>
      </section>

      <section id="services" className="services section-shell section-border section-anchor">
        <div className="section-label" data-reveal="fade">
          <span>(04) — SERVICES</span><span>THREE DISCIPLINES</span>
        </div>
        <h2 className="section-title" data-reveal="clip">HOW I CAN <span>HELP</span></h2>
        <div className="service-list">
          <article className="service-row" data-reveal="row">
            <span className="service-number">01</span>
            <h3><TransitionLink href="/work/uiux" transitionLabel="UI/UX Design">UI/UX design →</TransitionLink></h3>
            <p>Design intuitive, modern, and visually engaging digital experiences for websites and applications.</p>
            <ul><li>User Interface Design</li><li>User Experience Design</li><li>Wireframing</li><li>Prototyping</li><li>Responsive Web Design</li><li>Mobile App Design</li></ul>
            <TransitionLink href="/work/uiux" transitionLabel="UI/UX Design" aria-label="Open UI/UX design showcase" data-cursor="button">→</TransitionLink>
          </article>
          <article className="service-row" data-reveal="row" style={{ '--delay': '90ms' } as React.CSSProperties}>
            <span className="service-number">02</span>
            <h3><TransitionLink href="/work/graphic-design" transitionLabel="Graphic Design">Graphic design →</TransitionLink></h3>
            <p>Create impactful visual communication and brand-focused creative designs.</p>
            <ul><li>Social Media Designs</li><li>Marketing Creatives</li><li>Branding</li><li>Visual Identity</li><li>Promotional Graphics</li><li>Digital Content Design</li></ul>
            <TransitionLink href="/work/graphic-design" transitionLabel="Graphic Design" aria-label="Open Graphic design showcase" data-cursor="button">→</TransitionLink>
          </article>
          <article className="service-row" data-reveal="row" style={{ '--delay': '180ms' } as React.CSSProperties}>
            <span className="service-number">03</span>
            <h3><TransitionLink href="/work/video-editing" transitionLabel="Video Editing">Video editing →</TransitionLink></h3>
            <p>Create engaging video content designed for social media, brands, campaigns, and digital storytelling.</p>
            <ul><li>Reels</li><li>Teaser Videos</li><li>Promotional Videos</li><li>Social Media Videos</li><li>UGC Content Editing</li><li>Creative Video Editing</li></ul>
            <TransitionLink href="/work/video-editing" transitionLabel="Video Editing" aria-label="Open Video editing showcase" data-cursor="button">→</TransitionLink>
          </article>
        </div>
      </section>

      <section id="work" className="work section-shell section-border section-anchor">
        <div className="section-label" data-reveal="fade">
          <span>(05) — SELECTED WORK</span><span>4 PROJECTS</span>
        </div>
        <h2 className="section-title" data-reveal="clip">SELECTED <span>WORK</span></h2>
        <div className="project-grid">
          <article className="project-card project-wide" data-reveal="project" data-cursor-label="VIEW">
            <Link href="/project/tees-merch-designs">
              <div className="project-image-wrap">
                <img src="/images/tees-replacement.webp" alt="Tee’s Merch Designs cover visual" className="project-image" loading="lazy" />
                <span className="project-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="project-meta">
                <div>
                  <h3>Tee’s Merch Designs</h3>
                  <p>Streetwear-inspired merchandise and T-shirt graphics built around bold type and print-ready artwork.</p>
                </div>
                <span>Graphic Design · Merch</span>
              </div>
            </Link>
          </article>
          <article className="project-card" data-reveal="project" style={{ '--delay': '90ms' } as React.CSSProperties} data-cursor-label="VIEW">
            <Link href="/project/job-portal-web-design">
              <div className="project-image-wrap">
                <img src="/images/work-jobportal.jpg" alt="Job Portal Web Design cover visual" className="project-image" loading="lazy" />
                <span className="project-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="project-meta">
                <div>
                  <h3>Job Portal Web Design</h3>
                  <p>A modern job portal experience — search, filtering and application flows designed for clarity and speed.</p>
                </div>
                <span>UI/UX Design</span>
              </div>
            </Link>
          </article>
          <article className="project-card" data-reveal="project" style={{ '--delay': '150ms' } as React.CSSProperties} data-cursor-label="VIEW">
            <Link href="/project/nonames-teaser">
              <div className="project-image-wrap">
                <img src="/images/work-nonames.jpg" alt="NoNames — Teaser and Reels cover visual" className="project-image" loading="lazy" />
                <span className="project-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="project-meta">
                <div>
                  <h3>NoNames — Teaser &amp; Reels</h3>
                  <p>Teaser films and social reels crafted for a dating app launch, with cinematic pacing and punchy typography.</p>
                </div>
                <span>Video Editing · Motion</span>
              </div>
            </Link>
          </article>
          <article className="project-card project-wide" data-reveal="project" data-cursor-label="VIEW">
            <Link href="/project/chokkha-foods-ugc">
              <div className="project-image-wrap">
                <img src="/images/work-chokkha.jpg" alt="Chokkha Foods — UGC Content cover visual" className="project-image" loading="lazy" />
                <span className="project-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="project-meta">
                <div>
                  <h3>Chokkha Foods — UGC Content</h3>
                  <p>Brand visuals, product creatives and UGC-style video content for an always-on social calendar.</p>
                </div>
                <span>Video Editing · Social</span>
              </div>
            </Link>
          </article>
        </div>
        <div className="freelance-box" data-reveal="up">
          <h3>MORE CREATIVE WORK</h3>
          <p>Explore full project portfolios and visual design archives across my disciplines.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.2rem' }}>
            <a className="pill-button" href="https://www.behance.net/seenozx079" target="_blank" rel="noopener noreferrer">UI/UX &amp; Video Editing on Behance <span aria-hidden="true">↗</span></a>
            <a className="outline-button" href="https://drive.google.com/file/d/10srS0EIxnKd-d3qkvcK3rLpTUscZm-Gv/view?usp=sharing" target="_blank" rel="noopener noreferrer">Graphic Design on Google Drive <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section id="process" className="process section-shell section-border section-anchor">
        <div className="section-label" data-reveal="fade">
          <span>(06) — PROCESS</span><span>FIVE STEPS</span>
        </div>
        <h2 className="section-title process-title" data-reveal="clip">HOW IT <span>WORKS</span></h2>
        <div className="process-grid">
          <article data-reveal="up"><span>01</span><h3>Discover</h3><p>Understand the goal, audience, and requirements.</p></article>
          <article data-reveal="up" style={{ '--delay': '70ms' } as React.CSSProperties}><span>02</span><h3>Explore</h3><p>Develop ideas, references, moodboards, and visual directions.</p></article>
          <article data-reveal="up" style={{ '--delay': '140ms' } as React.CSSProperties}><span>03</span><h3>Design</h3><p>Create visual concepts, interfaces, graphics, or video direction.</p></article>
          <article data-reveal="up" style={{ '--delay': '210ms' } as React.CSSProperties}><span>04</span><h3>Refine</h3><p>Iterate, improve, and polish every detail.</p></article>
          <article data-reveal="up" style={{ '--delay': '280ms' } as React.CSSProperties}><span>05</span><h3>Deliver</h3><p>Deliver a final creative solution that is visually strong and purpose-driven.</p></article>
        </div>
      </section>

      <section id="arsenal" className="arsenal section-shell section-border section-anchor">
        <div className="section-label" data-reveal="fade">
          <span>(07) — CREATIVE ARSENAL</span><span>7 TOOLS</span>
        </div>
        <h2 className="section-title" data-reveal="clip">THE <span>ARSENAL</span></h2>
        <div className="tool-grid">
          <div className="tool-card" data-reveal="up" style={{ '--delay': '0ms' } as React.CSSProperties}><span>01</span><strong>Figma</strong></div>
          <div className="tool-card" data-reveal="up" style={{ '--delay': '55ms' } as React.CSSProperties}><span>02</span><strong>Adobe Photoshop</strong></div>
          <div className="tool-card" data-reveal="up" style={{ '--delay': '110ms' } as React.CSSProperties}><span>03</span><strong>Adobe Illustrator</strong></div>
          <div className="tool-card" data-reveal="up" style={{ '--delay': '165ms' } as React.CSSProperties}><span>04</span><strong>Adobe Premiere Pro</strong></div>
          <div className="tool-card" data-reveal="up" style={{ '--delay': '220ms' } as React.CSSProperties}><span>05</span><strong>Filmora Wondershare</strong></div>
          <div className="tool-card" data-reveal="up" style={{ '--delay': '275ms' } as React.CSSProperties}><span>06</span><strong>CapCut</strong></div>
          <div className="tool-card" data-reveal="up" style={{ '--delay': '330ms' } as React.CSSProperties}><span>07</span><strong>BandLab</strong></div>
        </div>
        <div className="tool-ticker" aria-hidden="true">
          <div>
            <span>Figma<i>✦</i></span><span>Adobe Photoshop<i>✦</i></span><span>Adobe Illustrator<i>✦</i></span><span>Adobe Premiere Pro<i>✦</i></span><span>Filmora Wondershare<i>✦</i></span><span>CapCut<i>✦</i></span><span>BandLab<i>✦</i></span>
            <span>Figma<i>✦</i></span><span>Adobe Photoshop<i>✦</i></span><span>Adobe Illustrator<i>✦</i></span><span>Adobe Premiere Pro<i>✦</i></span><span>Filmora Wondershare<i>✦</i></span><span>CapCut<i>✦</i></span><span>BandLab<i>✦</i></span>
          </div>
        </div>
      </section>

      <section id="contact" className="contact section-shell section-border section-anchor">
        <div className="section-label" data-reveal="fade">
          <span>(08) — CONTACT</span><span>OPEN FOR PROJECTS</span>
        </div>
        <h2 className="contact-title" data-reveal="clip">HAVE A PROJECT IN MIND?<br/><span>LET’S CREATE SOMETHING GREAT.</span></h2>
        <div className="contact-grid">
          <div className="contact-copy" data-reveal="left">
            <p>Whether you need a fresh digital experience, compelling visuals, or engaging video content, let’s work together and bring your ideas to life.</p>
            <div className="contact-detail"><span>Phone</span><strong><a href="tel:7505995365">+91 7505995365</a></strong></div>
            <div className="contact-detail"><span>Email</span><strong><a href="mailto:seenozx189@gmail.com">seenozx189@gmail.com</a></strong></div>
            <div className="contact-detail">
              <span>Elsewhere</span>
              <div className="social-links">
                <a href="https://www.behance.net/seenozx079" target="_blank" rel="noopener noreferrer">Behance</a>
                <a href="https://drive.google.com/file/d/10srS0EIxnKd-d3qkvcK3rLpTUscZm-Gv/view?usp=sharing" target="_blank" rel="noopener noreferrer">Google Drive</a>
                <a href="#">LinkedIn</a>
              </div>
            </div>
          </div>
          <div data-reveal="right">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="talk-banner section-shell section-border">
        <a href="#contact" data-reveal="scale">LET’S TALK</a>
      </section>
      <footer className="footer section-shell section-border">
        <h2 data-reveal="clip">LET’S MAKE SOMETHING<br/><span>MEMORABLE.</span></h2>
        <div className="footer-grid">
          <div>
            <strong className="footer-name">SACHIN</strong>
            <p>UI/UX Designer · Graphic Designer · Video Editor</p>
          </div>
          <div>
            <span className="eyebrow">Navigate</span>
            <a href="#work">Portfolio</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <span className="eyebrow">Social</span>
            <a href="https://www.behance.net/seenozx079" target="_blank" rel="noopener noreferrer">Behance</a>
            <a href="https://drive.google.com/file/d/10srS0EIxnKd-d3qkvcK3rLpTUscZm-Gv/view?usp=sharing" target="_blank" rel="noopener noreferrer">Google Drive</a>
            <a href="#">LinkedIn</a>
          </div>
          <div className="footer-top">
            <a className="outline-button" href="#home">Back to top <span aria-hidden="true">↑</span></a>
          </div>
        </div>
        <p className="copyright">© 2026 Sachin. All rights reserved.</p>
      </footer>
    </main>
  );
}
