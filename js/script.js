
(() => {
  'use strict';
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  function setMenu(open) {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuButton.querySelector('span').textContent = open ? 'CLOSE' : 'MENU';
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    body.classList.toggle('menu-open', open);
  }
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  const navLinks = [...document.querySelectorAll('.desktop-nav [data-section]')];
  const sectionNodes = navLinks.map(link => document.getElementById(link.dataset.section)).filter(Boolean);
  if (sectionNodes.length) {
    const activeObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => link.classList.toggle('is-active', link.dataset.section === visible.target.id));
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, .08, .2, .5] });
    sectionNodes.forEach(section => activeObserver.observe(section));
  }

  const revealNodes = [...document.querySelectorAll('[data-reveal]')];
  const parallaxNodes = [...document.querySelectorAll('[data-parallax]')];
  const show = node => node.classList.add('is-visible');
  const revealVisible = () => {
    const vh = window.innerHeight;
    revealNodes.forEach(node => {
      const rect = node.getBoundingClientRect();
      if (rect.top < vh * .94 && rect.bottom > 0) show(node);
    });
  };
  revealVisible();
  root.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { show(entry.target); revealObserver.unobserve(entry.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: .05 });
  revealNodes.forEach(node => { if (!node.classList.contains('is-visible')) revealObserver.observe(node); });

  let frame = 0;
  function updateMotion() {
    frame = 0;
    const vh = window.innerHeight;
    const range = Math.max(1, document.documentElement.scrollHeight - vh);
    root.style.setProperty('--page-progress', String(window.scrollY / range));
    header?.classList.toggle('is-scrolled', window.scrollY > 16);
    parallaxNodes.forEach(node => {
      const rect = node.getBoundingClientRect();
      if (rect.bottom < -80 || rect.top > vh + 80) return;
      const centre = rect.top + rect.height / 2;
      const offset = (centre - vh / 2) / vh;
      const speed = Number(node.dataset.parallax || 20);
      node.style.setProperty('--parallax-y', `${offset * speed}px`);
    });
    revealVisible();
  }
  function requestUpdate() { if (!frame) frame = requestAnimationFrame(updateMotion); }
  updateMotion();
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);
  addEventListener('pageshow', revealVisible);

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (fine && !reduced && dot && ring) {
    let tx = innerWidth / 2, ty = innerHeight / 2, rx = tx, ry = ty;
    root.classList.add('has-custom-cursor');
    function renderCursor() {
      rx += (tx - rx) * .16; ry += (ty - ry) * .16;
      dot.style.transform = `translate3d(${tx}px,${ty}px,0)`;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      requestAnimationFrame(renderCursor);
    }
    addEventListener('pointermove', e => { tx=e.clientX; ty=e.clientY; dot.classList.add('is-active'); ring.classList.add('is-active'); }, { passive:true });
    document.addEventListener('pointerover', e => {
      const interactive = e.target.closest('a,button,input,textarea,select,[data-cursor]');
      ring.classList.toggle('is-hover', Boolean(interactive));
      const label = e.target.closest('[data-cursor-label]')?.dataset.cursorLabel || '';
      ring.dataset.label = label; ring.classList.toggle('has-label', Boolean(label));
    }, { passive:true });
    document.addEventListener('mouseleave', () => { dot.classList.remove('is-active'); ring.classList.remove('is-active'); });
    renderCursor();
  }

  const form = document.getElementById('contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const type = String(data.get('projectType') || 'Project').trim();
      const message = String(data.get('message') || '').trim();
      status.className = 'form-status';
      if (!name || !email || !message) {
        status.textContent = 'Please complete your name, email and message.';
        status.classList.add('is-error'); return;
      }
      status.textContent = 'Opening your email app…'; status.classList.add('is-success');
      const subject = encodeURIComponent(`${type} enquiry from ${name}`);
      const bodyText = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject type: ${type}\n\n${message}`);
      location.href = `mailto:seenozx189@gmail.com?subject=${subject}&body=${bodyText}`;
    });
  }
})();
