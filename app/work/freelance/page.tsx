import type { Metadata } from 'next';
import FreelanceShowcase from '@/components/showcase/FreelanceShowcase';

export const metadata: Metadata = {
  title: 'Freelance Creative Work — Sachin',
  description: 'A story of collaboration — process, partnership and outcomes.',
};

export default function Page() {
  return <FreelanceShowcase />;
}
