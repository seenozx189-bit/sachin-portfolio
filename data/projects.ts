export type Project = {
  id: string;
  category: string;
  title: string;
  client: string;
  year: string;
  tools: string;
  image: string;
  overview: string;
  challenge: string;
  approach: string;
  outcome: string;
  process: string[];
  next: string;
  nextTitle: string;
};

export const projects: Record<string, Project> = {
  'tees-merch-designs': {
    id: 'tees-merch-designs',
    category: 'Graphic Design · Merch',
    title: 'Tee’s Merch Designs',
    client: 'Independent / Freelance',
    year: '2024',
    tools: 'Adobe Illustrator, Adobe Photoshop, Figma',
    image: '/images/tees-replacement.webp',
    overview: 'A collection of merchandise graphics — typographic tees, print placements and mockup presentations — designed for small apparel drops and personal brand merch.',
    challenge: 'Create apparel graphics that read instantly from a distance, survive real print constraints, and still feel collectible rather than generic.',
    approach: 'Started from typographic experiments and distressed textures, then locked a visual direction with a tight palette and a repeatable layout system across the drop.',
    outcome: 'A cohesive merch line with print-ready files and presentation mockups that made the drop easy to market on social media.',
    process: ['Concept', 'Visual Direction', 'Design', 'Final Output'],
    next: 'job-portal-web-design',
    nextTitle: 'Job Portal Web Design'
  },
  'job-portal-web-design': {
    id: 'job-portal-web-design',
    category: 'UI/UX Design',
    title: 'Job Portal Web Design',
    client: 'Concept / Case Study',
    year: '2024',
    tools: 'Figma, Adobe Photoshop',
    image: '/images/work-jobportal.jpg',
    overview: 'An end-to-end UI/UX project covering research, wireframes, prototypes and final interface design for a responsive job portal on desktop and mobile.',
    challenge: 'Job seekers abandon portals when search feels heavy and applications take too many steps. The interface needed to make discovery effortless and applying obvious.',
    approach: 'Mapped user flows, wireframed the search and application journey, prototyped interactions in Figma, then built a clean component-driven UI with a strong hierarchy.',
    outcome: 'A responsive design system with reusable job cards, filters and dashboard screens — validated through clickable prototypes.',
    process: ['Research', 'Wireframe', 'Prototype', 'UI Design', 'Final Experience'],
    next: 'nonames-teaser',
    nextTitle: 'NoNames — Teaser & Reels'
  },
  'nonames-teaser': {
    id: 'nonames-teaser',
    category: 'Video Editing · Motion',
    title: 'NoNames — Teaser & Reels',
    client: 'NoNames — Dating App',
    year: '2024',
    tools: 'Adobe Premiere Pro, CapCut, Adobe Photoshop, BandLab',
    image: '/images/work-nonames.jpg',
    overview: 'Creative visual content and teaser/reel production for the NoNames dating app, spanning graphic assets and edited short-form video.',
    challenge: 'Communicate an emotional product in under fifteen seconds while standing out in a fast, muted-by-default social feed.',
    approach: 'Built a rhythm-first edit: beat-matched cuts, kinetic type overlays, moody colour grading, and captions designed for sound-off viewing.',
    outcome: 'A set of teasers and reels used across launch campaigns with a consistent visual signature.',
    process: ['Concept', 'Editing', 'Motion', 'Final Video'],
    next: 'chokkha-foods-ugc',
    nextTitle: 'Chokkha Foods — UGC Content'
  },
  'chokkha-foods-ugc': {
    id: 'chokkha-foods-ugc',
    category: 'Video Editing · Social',
    title: 'Chokkha Foods — UGC Content',
    client: 'Chokkha Foods',
    year: '2025',
    tools: 'Adobe Premiere Pro, Filmora Wondershare, CapCut, Adobe Photoshop',
    image: '/images/work-chokkha.jpg',
    overview: 'Ongoing graphic design and video editing work: social media content, product creatives, brand visuals and UGC-style edits built for retention.',
    challenge: 'Keep a food brand’s feed appetising and consistent while shipping a high volume of content every week.',
    approach: 'Created a repeatable template system for creatives and a UGC edit formula — hook, product moment, payoff — so quality stays high at speed.',
    outcome: 'A recognisable brand look across posts and reels, with faster turnaround on every new campaign.',
    process: ['Concept', 'Editing', 'Motion', 'Final Video'],
    next: 'tees-merch-designs',
    nextTitle: 'Tee’s Merch Designs'
  }
};
