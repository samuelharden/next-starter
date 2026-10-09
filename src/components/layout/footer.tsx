import Link from 'next/link';
import type { HTMLAttributes } from 'react';
import { COMPANY } from '@/lib/company';

const footerLinkClassName =
  'text-xs text-ink/45 transition-colors hover:text-ink/75';
type FooterProps = HTMLAttributes<HTMLElement>;
export function Footer({ className, ...props }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer
      id="site-footer"
      data-slot="site-footer"
      className={
        className
          ? `shrink-0 border-t border-ink/8 bg-paper/90 px-4 py-3 backdrop-blur-md ${className}`
          : 'shrink-0 border-t border-ink/8 bg-paper/90 px-4 py-3 backdrop-blur-md'
      }
      {...props}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-xs text-ink/40">
          © {year} {COMPANY.name}
        </p>
        <nav
          aria-label="Rechtliches"
          className="flex items-center gap-4"
        >
          <Link
            href="/impressum"
            className={footerLinkClassName}
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className={footerLinkClassName}
          >
            Datenschutz
          </Link>
        </nav>
        <Link
          href="/anfrage"
          className="text-xs text-ink/70 transition-colors hover:text-ink"
        >
          Anfrage →
        </Link>
      </div>
    </footer>
  );
}
