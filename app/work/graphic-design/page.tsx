import type { Metadata } from 'next';
import GraphicShowcase from '@/components/showcase/GraphicShowcase';

export const metadata: Metadata = {
  title: 'Graphic Design — Sachin',
  description: 'An exhibition of brand visuals, posters and print artwork.',
};

export default function Page() {
  return <GraphicShowcase />;
}
