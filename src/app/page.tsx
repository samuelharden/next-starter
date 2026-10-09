import type { Metadata } from 'next';
import { HomeIntro } from '@/components/layout/home-intro';
import { homeDescription, homeTitle, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    absolute: homeTitle,
  },
  description: homeDescription,
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: SITE_URL,
  },
  twitter: {
    title: homeTitle,
    description: homeDescription,
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <main className="w-full min-w-0 bg-paper">
      <HomeIntro />
    </main>
  );
}
