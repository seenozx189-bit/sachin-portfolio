import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

const SITE_URL = 'https://sachin-portfolio.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['', '/work/uiux', '/work/graphic-design', '/work/video-editing', '/work/freelance'].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    })
  );

  const projectRoutes = Object.keys(projects).map((slug) => ({
    url: `${SITE_URL}/project/${slug}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
