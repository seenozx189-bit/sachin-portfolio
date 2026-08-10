import './globals.css';
import './showcase.css';
import './social.css';
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Anton, IBM_Plex_Mono } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import ScrollEffects from '@/components/ScrollEffects';
import SmoothScroll from '@/components/SmoothScroll';
import PageTransition from '@/components/PageTransition';
import Loader from '@/components/Loader';
import MagneticButtons from '@/components/MagneticButtons';
import EasterEggs from '@/components/EasterEggs';

const SITE_URL = 'https://sachin-portfolio.vercel.app';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-space',
});

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-anton',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex',
});



export const viewport: Viewport = {
  themeColor: '#090a0b',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sachin — UI/UX Designer, Graphic Designer & Video Editor',
    template: '%s',
  },
  description:
    'A multidisciplinary creative portfolio for UI/UX design, graphic design, branding and video editing.',
  keywords: ['UI/UX design', 'graphic design', 'video editing', 'branding', 'creative portfolio', 'product design'],
  authors: [{ name: 'Sachin' }],
  creator: 'Sachin',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    type: 'website',
    siteName: 'Sachin — Creative Portfolio',
    title: 'Sachin — UI/UX Designer, Graphic Designer & Video Editor',
    description:
      'A multidisciplinary creative portfolio for UI/UX design, graphic design, branding and video editing.',
    url: SITE_URL,
    images: [{ url: '/images/sachin-portrait.jpg', width: 1200, height: 630, alt: 'Sachin — Creative Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sachin — UI/UX Designer, Graphic Designer & Video Editor',
    description: 'Multidisciplinary creative portfolio — UI/UX, graphic design and video editing.',
    images: ['/images/sachin-portrait.jpg'],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sachin',
  jobTitle: 'UI/UX Designer, Graphic Designer & Video Editor',
  url: SITE_URL,
  email: 'seenozx189@gmail.com',
  knowsAbout: ['UI/UX Design', 'Graphic Design', 'Video Editing', 'Branding', 'Prototyping'],
  sameAs: ['https://www.behance.net/seenozx079'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${anton.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Loader />
        <SmoothScroll>
          <PageTransition>
            <Navigation />
            <span className="scroll-progress" aria-hidden="true"></span>
            <CustomCursor />
            <ScrollEffects />
            <MagneticButtons />
            <EasterEggs />
            <div id="main-content">{children}</div>
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
