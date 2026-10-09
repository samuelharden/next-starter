import React from 'react';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/layout/navigation';
import { OrganizationJsonLd } from '@/components/seo/json-ld';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cn } from '@/lib/utils';
import { homeDescription, homeTitle, SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: homeDescription,
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    locale: 'de_AT',
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: homeDescription,
  },
  alternates: {
    canonical: '/',
  },
};

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const unboundedVariable = localFont({
  src: './../../public/fonts/unbounded-variable-wght.woff2',
  variable: '--font-variable',
  weight: '200 900',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de-AT"
      className={cn(inter.variable, unboundedVariable.variable, 'font-sans')}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-lvh w-full min-w-0 flex-col"
        suppressHydrationWarning
      >
        <OrganizationJsonLd />
        <Navigation />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
