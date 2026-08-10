import type { Metadata } from 'next';
import UiuxShowcase from '@/components/showcase/UiuxShowcase';

export const metadata: Metadata = {
  title: 'UI/UX Design — Sachin',
  description: 'Research-driven product design case studies: flows, systems and interfaces.',
};

export default function Page() {
  return <UiuxShowcase />;
}
