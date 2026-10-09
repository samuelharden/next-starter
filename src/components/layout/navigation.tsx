'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/#start', label: 'Start' },
  { href: '/#leistungen', label: 'Features' },
  { href: '/#ueber-uns', label: 'Über uns' },
  { href: '/#kontakt', label: 'Kontakt' },
] as const;

const navLinkClassName =
  'rounded-full px-4 py-1.5 text-sm text-ink/55 transition-colors hover:bg-ink/5 hover:text-ink';

const mobileNavLinkClassName =
  'w-full max-w-xs rounded-full border border-ink/10 bg-white/80 px-6 py-3 text-center text-base text-ink/70 transition-colors hover:bg-white hover:text-ink';

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-[var(--site-nav-height)] w-full items-center gap-3 border-b border-ink/5 bg-paper/85 px-4 backdrop-blur-md">
        <a
          href="/#start"
          className="relative z-50 shrink-0"
          onClick={closeMenu}
        >
          <img
            src="/media/img/logo-mark.svg"
            alt="Starter"
            className="h-8 w-auto"
          />
        </a>

        <nav
          aria-label="Hauptnavigation"
          className="hidden min-w-0 lg:absolute lg:left-1/2 lg:block lg:-translate-x-1/2"
        >
          <ul className="flex items-center gap-0.5 rounded-full border border-ink/8 bg-white/70 px-1.5 py-1 backdrop-blur-md">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={navLinkClassName}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-50 ml-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white/70 backdrop-blur-md transition-colors hover:bg-white lg:hidden"
          >
            <span
              className="relative block h-3.5 w-5"
              aria-hidden
            >
              <span
                className={`absolute left-0 h-px w-5 origin-center bg-ink transition-all duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 h-px w-5 -translate-y-1/2 bg-ink transition-all duration-300 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-px w-5 origin-center bg-ink transition-all duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>

          <Button
            asChild
            className="hidden h-auto cursor-pointer rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground shadow-sm hover:bg-brand/90 lg:inline-flex sm:px-5 sm:py-2.5"
          >
            <Link href="/anfrage">Anfrage</Link>
          </Button>
        </div>
      </header>

      <div
        aria-hidden
        className="h-[var(--site-nav-height)] shrink-0"
      />

      <div
        inert={!open ? true : undefined}
        className={`fixed inset-0 z-40 bg-paper/95 transition-opacity duration-300 ease-out lg:hidden ${
          open
            ? 'opacity-100 backdrop-blur-xs'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          type="button"
          aria-label="Menü schließen"
          className="absolute inset-0"
          onClick={closeMenu}
          tabIndex={open ? 0 : -1}
        />

        <nav
          id="mobile-nav"
          aria-label="Mobile Navigation"
          className="relative flex h-full flex-col items-center justify-center gap-2 px-6"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              tabIndex={open ? undefined : -1}
              className={mobileNavLinkClassName}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
