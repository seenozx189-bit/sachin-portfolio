'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import TransitionLink from '@/components/TransitionLink';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const navLinks = Array.from(document.querySelectorAll('.desktop-nav [data-section]')) as HTMLElement[];
    const sectionNodes = navLinks.map(link => document.getElementById(link.dataset.section || '')).filter(Boolean) as HTMLElement[];
    
    if (sectionNodes.length) {
      const activeObserver = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setActiveSection(visible.target.id);
      }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, .08, .2, .5] });
      
      sectionNodes.forEach(section => activeObserver.observe(section));
      return () => sectionNodes.forEach(section => activeObserver.unobserve(section));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Sliding underline indicator that follows the active (and hovered) link.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const indicator = nav.querySelector<HTMLElement>('.nav-indicator');
    if (!indicator) return;

    const place = (link: HTMLElement | null) => {
      if (!link) {
        indicator.classList.remove('is-shown');
        return;
      }
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.transform = `translateX(${link.offsetLeft}px)`;
      indicator.classList.add('is-shown');
    };
    const activeLink = () => nav.querySelector<HTMLElement>('a.is-active');
    const toActive = () => place(activeLink());

    toActive();
    const onOver = (e: Event) => {
      const link = (e.target as HTMLElement).closest<HTMLElement>('a[data-section]');
      if (link) place(link);
    };
    nav.addEventListener('pointerover', onOver);
    nav.addEventListener('pointerleave', toActive);
    window.addEventListener('resize', toActive);
    return () => {
      nav.removeEventListener('pointerover', onOver);
      nav.removeEventListener('pointerleave', toActive);
      window.removeEventListener('resize', toActive);
    };
  }, [activeSection]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-header`} id="site-header">
      <Link className="brand" href="/#home" aria-label="Go to the top" onClick={closeMenu} data-magnetic>
        <span className="brand-mark" aria-hidden="true"></span><strong>SACHIN</strong>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation" ref={navRef}>
        <span className="nav-indicator" aria-hidden="true" />
        <Link href="/#home" data-section="home" className={activeSection === 'home' ? 'is-active' : ''}>Home</Link>
        <Link href="/#about" data-section="about" className={activeSection === 'about' ? 'is-active' : ''}>About</Link>
        <TransitionLink href="/social-media" transitionLabel="Social Media">Social</TransitionLink>
        <Link href="/#experience" data-section="experience" className={activeSection === 'experience' ? 'is-active' : ''}>Experience</Link>
        <Link href="/#services" data-section="services" className={activeSection === 'services' ? 'is-active' : ''}>Services</Link>
        <Link href="/#work" data-section="work" className={activeSection === 'work' ? 'is-active' : ''}>Work</Link>
        <Link href="/#contact" data-section="contact" className={activeSection === 'contact' ? 'is-active' : ''}>Contact</Link>
      </nav>
      <Link className="pill-button header-cta" href="/#contact">Let’s talk <span aria-hidden="true">↘</span></Link>
      <button 
        type="button" 
        className="menu-toggle" 
        aria-expanded={isOpen} 
        aria-controls="mobile-navigation" 
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={toggleMenu}
      >
        <span>{isOpen ? 'CLOSE' : 'MENU'}</span>
      </button>
      <div id="mobile-navigation" className={`mobile-menu ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
        <div className="mobile-menu-inner">
          <Link href="/#home" style={{ '--menu-index': 0 } as React.CSSProperties} onClick={closeMenu}><span>01</span>Home</Link>
          <Link href="/#about" style={{ '--menu-index': 1 } as React.CSSProperties} onClick={closeMenu}><span>02</span>About</Link>
          <TransitionLink href="/social-media" transitionLabel="Social Media" style={{ '--menu-index': 2 } as React.CSSProperties} onClick={closeMenu}><span>03</span>Social</TransitionLink>
          <Link href="/#experience" style={{ '--menu-index': 3 } as React.CSSProperties} onClick={closeMenu}><span>04</span>Experience</Link>
          <Link href="/#services" style={{ '--menu-index': 4 } as React.CSSProperties} onClick={closeMenu}><span>05</span>Services</Link>
          <Link href="/#work" style={{ '--menu-index': 5 } as React.CSSProperties} onClick={closeMenu}><span>06</span>Work</Link>
          <Link href="/#contact" style={{ '--menu-index': 6 } as React.CSSProperties} onClick={closeMenu}><span>07</span>Contact</Link>
          <Link className="pill-button mobile-talk" href="/#contact" onClick={closeMenu}>Start a project <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </header>
  );
}
