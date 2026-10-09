import Link from 'next/link';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';

type LegalPageLayoutProps = {
  title: string;
  children: ReactNode;
  /** Wider content column for form-heavy pages. */
  wide?: boolean;
};

export function LegalPageLayout({
  title,
  children,
  wide = false,
}: LegalPageLayoutProps) {
  return (
    <main className="flex w-full min-w-0 flex-1 flex-col bg-paper">
      <div
        className={cn(
          'mx-auto w-full flex-1 px-4 py-10 pb-16',
          wide ? 'max-w-4xl' : 'max-w-3xl',
        )}
      >
        <Link
          href="/"
          className="text-sm text-ink/50 transition-colors hover:text-ink/80"
        >
          ← Zur Startseite
        </Link>

        <h1 className="font-variable mt-8 text-3xl font-black text-ink uppercase sm:text-4xl">
          {title}
        </h1>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink/80 sm:text-base sm:leading-7">
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}
