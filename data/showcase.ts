// Central data for the four discipline showcase pages.
// Images reuse the existing /public/images assets; swap freely later.

export type Discipline = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  intro: string;
  accent: string;
};

export const disciplines: Record<string, Discipline> = {
  uiux: {
    slug: 'uiux',
    index: '01',
    title: 'UI/UX Design',
    tagline: 'Interfaces with intent',
    intro:
      'Research-driven product design — flows, systems and interfaces built to feel effortless.',
    accent: '#c8ff18',
  },
  'graphic-design': {
    slug: 'graphic-design',
    index: '02',
    title: 'Graphic Design',
    tagline: 'An exhibition of visuals',
    intro:
      'Brand visuals, posters and print — composition, colour and type as an art form.',
    accent: '#ff5c38',
  },
  'video-editing': {
    slug: 'video-editing',
    index: '03',
    title: 'Video Editing',
    tagline: 'Stories in motion',
    intro:
      'Cinematic edits, reels and teasers — rhythm, grade and cut engineered for the feed.',
    accent: '#38a1ff',
  },
  freelance: {
    slug: 'freelance',
    index: '04',
    title: 'Freelance Work',
    tagline: 'The client journey',
    intro:
      'A story of collaboration — process, partnership and outcomes across disciplines.',
    accent: '#c8ff18',
  },
};

/* ---------------------------------- UI/UX --------------------------------- */

export type CaseStudy = {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  summary: string;
  problem: string;
  research: string;
  wireframes: string;
  ui: string;
  prototype: string;
  outcome: string;
  tags: string[];
};

export const uiuxProjects: CaseStudy[] = [
  {
    id: 'job-portal',
    title: 'Job Portal',
    category: 'Product Design · Web App',
    year: '2024',
    image: '/images/work-jobportal.jpg',
    summary:
      'An end-to-end job platform where discovery feels effortless and applying takes seconds.',
    problem:
      'Seekers abandon portals when search feels heavy and applications take too many steps. The flow had to make discovery effortless and applying obvious.',
    research:
      'Interviews and journey mapping surfaced three friction points: noisy filters, unclear job cards, and multi-page application forms that killed momentum.',
    wireframes:
      'Low-fidelity flows for search, filtering and a single-screen application, tested as clickable skeletons before any pixels were pushed.',
    ui:
      'A component-driven interface: reusable job cards, sticky filters, a candidate dashboard and a strong type hierarchy for instant scanning.',
    prototype:
      'A high-fidelity Figma prototype with micro-interactions on filters, saves and the apply flow, validated in moderated sessions.',
    outcome:
      'A responsive design system with a task-completion lift in testing and a reusable library that scales across future screens.',
    tags: ['Figma', 'Design System', 'Prototyping', 'Responsive'],
  },
  {
    id: 'merch-commerce',
    title: 'Merch Commerce',
    category: 'E-commerce · Concept',
    year: '2024',
    image: '/images/work-tees.jpg',
    summary:
      'A streetwear drop experience built around bold type, fast browsing and frictionless checkout.',
    problem:
      'Limited drops need urgency without chaos. Users must browse, pick a size and check out before hype fatigue sets in.',
    research:
      'Studied drop culture and cart-abandon patterns; the winning pattern was a countdown-led hero plus a two-tap size + checkout path.',
    wireframes:
      'Grid explorations for the product wall, a quick-add drawer and a single-column checkout optimised for mobile thumbs.',
    ui:
      'High-contrast type, generous imagery and a persistent cart with live stock — the interface gets out of the way of the product.',
    prototype:
      'Prototyped the add-to-cart drawer and checkout with spring transitions to make speed feel tactile.',
    outcome:
      'A cohesive commerce concept with a print-ready design language that maps cleanly to a real storefront build.',
    tags: ['UX', 'E-commerce', 'Motion', 'Mobile-first'],
  },
  {
    id: 'brand-dashboard',
    title: 'Content Studio',
    category: 'SaaS · Dashboard',
    year: '2025',
    image: '/images/work-chokkha.jpg',
    summary:
      'A content operations dashboard that turns a chaotic social calendar into a calm, glanceable system.',
    problem:
      'A high-volume food brand shipped content weekly but had no single view of what was live, drafted or overdue.',
    research:
      'Shadowed the content team to map their real workflow; the core need was status-at-a-glance and fast handoffs.',
    wireframes:
      'A kanban calendar, an asset library and an approval flow sketched around the team’s existing rituals.',
    ui:
      'A dark, data-dense interface with colour-coded states, inline previews and keyboard-first navigation.',
    prototype:
      'Interactive board with drag-and-drop scheduling and an approval side-panel that slides in on demand.',
    outcome:
      'A recognisable operations tool that made weekly turnaround faster and status obvious to the whole team.',
    tags: ['Dashboard', 'Design System', 'Data', 'Workflow'],
  },
];

/* ------------------------------- Graphic art ------------------------------ */

export type Artwork = {
  id: string;
  title: string;
  medium: string;
  year: string;
  image: string;
  note: string;
};

export const artworks: Artwork[] = [
  { id: 'g1', title: 'Tee’s Drop', medium: 'Apparel Graphics', year: '2024', image: '/images/work-tees.jpg', note: 'Typographic streetwear artwork built for print.' },
  { id: 'g2', title: 'NoNames', medium: 'Campaign Key Art', year: '2024', image: '/images/work-nonames.jpg', note: 'Moody key visuals for a dating-app launch.' },
  { id: 'g3', title: 'Chokkha', medium: 'Product Creative', year: '2025', image: '/images/work-chokkha.jpg', note: 'Appetite-first social creatives and packaging cues.' },
  { id: 'g4', title: 'Job Portal', medium: 'UI Poster', year: '2024', image: '/images/work-jobportal.jpg', note: 'Interface fragments recomposed as poster art.' },
  { id: 'g5', title: 'Portrait Study', medium: 'Editorial', year: '2025', image: '/images/sachin-portrait.jpg', note: 'High-contrast editorial grade and grain.' },
  { id: 'g6', title: 'Tee’s II', medium: 'Apparel Graphics', year: '2024', image: '/images/work-tees.jpg', note: 'Second colourway in the merch system.' },
];

/* --------------------------------- Videos --------------------------------- */

export type VideoItem = {
  id: string;
  title: string;
  genre: string;
  duration: string;
  year: string;
  thumbnail: string;
  client: string;
  blurb: string;
};

export const videos: VideoItem[] = [
  { id: 'v1', title: 'NoNames Teaser', genre: 'Teaser', duration: '0:18', year: '2024', thumbnail: '/images/work-nonames.jpg', client: 'NoNames', blurb: 'Beat-matched launch teaser with kinetic type and a moody grade.' },
  { id: 'v2', title: 'Chokkha UGC', genre: 'UGC', duration: '0:30', year: '2025', thumbnail: '/images/work-chokkha.jpg', client: 'Chokkha Foods', blurb: 'Hook → product moment → payoff formula, engineered for retention.' },
  { id: 'v3', title: 'Merch Promo', genre: 'Promo', duration: '0:22', year: '2024', thumbnail: '/images/work-tees.jpg', client: 'Independent', blurb: 'Drop promo cut for a fast, sound-off feed.' },
  { id: 'v4', title: 'Portal Reel', genre: 'Product', duration: '0:26', year: '2024', thumbnail: '/images/work-jobportal.jpg', client: 'Concept', blurb: 'Screen-record edit turned into a snappy product reel.' },
];

export const videoGenres = ['All', 'Teaser', 'UGC', 'Promo', 'Product'] as const;

/* -------------------------------- Freelance ------------------------------- */

export type TimelineStop = {
  year: string;
  title: string;
  org: string;
  copy: string;
};

export const freelanceTimeline: TimelineStop[] = [
  { year: '2023', title: 'First Commissions', org: 'Independent', copy: 'Started taking on merch graphics and social creatives for small brands and personal ventures.' },
  { year: '2024', title: 'UI/UX Design', org: 'Intuch Group', copy: 'Moved into product work — wireframes, prototypes and visual design across digital products.' },
  { year: '2024', title: 'Motion & Reels', org: 'NoNames', copy: 'Teaser films and social reels crafted for a dating-app launch with a consistent visual signature.' },
  { year: '2025', title: 'Brand Partner', org: 'Chokkha Foods', copy: 'Ongoing design + video partnership — a repeatable system that keeps a food brand’s feed sharp at speed.' },
];

export type Testimonial = { quote: string; name: string; role: string };

export const testimonials: Testimonial[] = [
  { quote: 'Sachin turned a chaotic content calendar into something we could actually run. Fast, sharp, reliable.', name: 'Chokkha Foods', role: 'Brand Team' },
  { quote: 'The launch reels captured the feeling of the product in under fifteen seconds. Exactly what we needed.', name: 'NoNames', role: 'Founders' },
];

export const freelanceStats = [
  { value: 40, suffix: '+', label: 'Projects delivered' },
  { value: 12, suffix: '', label: 'Happy clients' },
  { value: 3, suffix: '', label: 'Core disciplines' },
  { value: 2, suffix: 'yr', label: 'Freelancing' },
];

export const freelanceProcess = [
  { step: '01', title: 'Discover', copy: 'Understand the goal, audience and constraints.' },
  { step: '02', title: 'Explore', copy: 'References, moodboards and visual directions.' },
  { step: '03', title: 'Design', copy: 'Interfaces, graphics or video direction.' },
  { step: '04', title: 'Refine', copy: 'Iterate, polish and pressure-test every detail.' },
  { step: '05', title: 'Deliver', copy: 'Ship a purpose-driven, visually strong result.' },
];
