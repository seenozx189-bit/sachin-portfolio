import type { Metadata } from 'next';
import VideoShowcase from '@/components/showcase/VideoShowcase';

export const metadata: Metadata = {
  title: 'Video Editing — Sachin',
  description: 'Cinematic edits, reels and teasers engineered for the feed.',
};

export default function Page() {
  return <VideoShowcase />;
}
