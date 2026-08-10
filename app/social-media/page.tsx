import type { Metadata } from 'next';
import SocialMedia from '@/components/social/SocialMedia';

export const metadata: Metadata = {
  title: 'Social Media Management — Sachin',
  description:
    'Strategy, creative direction, content production and performance optimization — social media managed as one connected system.',
};

export default function Page() {
  return (
    <main className="social-page">
      <SocialMedia />
    </main>
  );
}
