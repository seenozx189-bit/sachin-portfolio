export type GraphicProject = {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  cover: string;
  images: string[];
  tags: string[];
  software: string[];
  featured: boolean;
  /** Optional true aspect ratio, e.g. "4 / 5". Falls back to the layout slot. */
  ratio?: string;
};

export type GraphicsData = {
  meta: { title: string; subtitle: string; intro: string };
  projects: GraphicProject[];
};

/** Deterministic editorial layout descriptor, cycled by index. */
export type LayoutSlot = {
  size: 'lg' | 'md' | 'sm';
  align: 'start' | 'center' | 'end';
  rotate: number;
  overlap: boolean;
  ratio: string;
};

// Handcrafted rhythm — some large, some offset, some overlapping/rotated.
export const LAYOUT_PATTERN: LayoutSlot[] = [
  { size: 'lg', align: 'start', rotate: -2, overlap: false, ratio: '4 / 5' },
  { size: 'sm', align: 'end', rotate: 3, overlap: true, ratio: '1 / 1' },
  { size: 'md', align: 'center', rotate: -1, overlap: false, ratio: '3 / 4' },
  { size: 'sm', align: 'start', rotate: 2, overlap: true, ratio: '4 / 5' },
  { size: 'lg', align: 'end', rotate: -3, overlap: false, ratio: '16 / 11' },
  { size: 'md', align: 'start', rotate: 1, overlap: false, ratio: '1 / 1' },
];

export const slotFor = (index: number): LayoutSlot =>
  LAYOUT_PATTERN[index % LAYOUT_PATTERN.length];
