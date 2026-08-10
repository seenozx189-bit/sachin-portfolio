export type VideoProject = {
  id: string;
  title: string;
  client: string;
  category: string;
  cover: string;
  preview: string;
  video: string;
  description: string;
  duration: string;
  year: string;
  software: string[];
  tags: string[];
  featured: boolean;
};

export type VideosData = {
  meta: { title: string; subtitle: string; intro: string; heroReel: string };
  projects: VideoProject[];
};

export const VIDEO_CATEGORIES = [
  'All',
  'Commercial',
  'Gaming',
  'YouTube',
  'Motion Graphics',
  'Reels',
  'Ads',
] as const;

// Editorial rail rhythm — varied widths/heights, cycled by index.
export type RailSlot = { w: number; ratio: string; offset: number };
export const RAIL_PATTERN: RailSlot[] = [
  { w: 46, ratio: '16 / 9', offset: 0 },
  { w: 30, ratio: '9 / 13', offset: 8 },
  { w: 38, ratio: '4 / 3', offset: -6 },
  { w: 52, ratio: '21 / 9', offset: 4 },
  { w: 32, ratio: '1 / 1', offset: -4 },
];
export const railSlot = (i: number): RailSlot => RAIL_PATTERN[i % RAIL_PATTERN.length];
