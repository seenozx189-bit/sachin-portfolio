export type Metric = { value: number; suffix?: string; label: string };
export type Persona = { name: string; role: string; bio: string; goals: string[]; frustrations: string[] };
export type FlowStep = { label: string; note?: string };
export type Feedback = { quote: string; name: string; role: string };
export type DeviceKind = 'desktop' | 'tablet' | 'phone';

export type UiuxProject = {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  role: string;
  duration: string;
  device: DeviceKind;
  tools: string[];
  cover: string;
  hero: string;
  overview: string;
  problem: string;
  research: string;
  researchStats: Metric[];
  personas: Persona[];
  userFlow: FlowStep[];
  wireframes: string[];
  designs: string[];
  prototype: string;
  prototypeUrl?: string;
  results: Metric[];
  feedback?: Feedback;
  gallery: string[];
  tags: string[];
  featured: boolean;
};

export type UiuxData = {
  meta: { title: string; subtitle: string; intro: string };
  projects: UiuxProject[];
};

// Editorial arrangement for the device explorer, cycled by index.
export type ExplorerSlot = { align: 'start' | 'center' | 'end'; rotate: number; scale: number };
export const EXPLORER_PATTERN: ExplorerSlot[] = [
  { align: 'start', rotate: -4, scale: 1 },
  { align: 'end', rotate: 5, scale: 0.9 },
  { align: 'center', rotate: -2, scale: 0.96 },
  { align: 'start', rotate: 3, scale: 0.92 },
];
export const explorerSlot = (i: number): ExplorerSlot => EXPLORER_PATTERN[i % EXPLORER_PATTERN.length];
