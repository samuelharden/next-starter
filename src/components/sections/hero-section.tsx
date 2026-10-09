import { CtaLink } from '@/components/ui/cta-link';
import { HeroBrandLogo } from '@/components/sections/hero-brand-logo';

export function HeroSection() {
  return (
    <section
      id="start"
      className="relative flex h-[calc(100svh-var(--site-nav-height))] flex-col overflow-hidden px-4 pb-6 md:px-6 lg:px-10"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-paper"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 90% 70% at 28% 38%, color-mix(in oklab, var(--brand) 18%, transparent), transparent 68%)',
            'radial-gradient(ellipse 75% 55% at 78% 68%, color-mix(in oklab, var(--brand) 12%, transparent), transparent 62%)',
            'radial-gradient(ellipse 50% 40% at 55% 45%, color-mix(in oklab, var(--ink) 6%, transparent), transparent 70%)',
          ].join(', '),
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-center py-8 sm:py-12 lg:py-16">
        <header className="relative w-full">
          <HeroBrandLogo />
          <h1 className="font-variable max-w-5xl text-3xl leading-tight font-black text-ink uppercase sm:text-4xl sm:leading-15 md:text-5xl md:leading-[1.05] lg:text-6xl lg:leading-[0.95] lg:tracking-tight xl:text-7xl">
            Marketing site. <br className="hidden lg:inline" />
            Ready to rebrand. <br className="hidden lg:inline" />
            Ship your next project faster.
          </h1>

          <div
            className="mt-10 h-px w-24 bg-brand/70 lg:mt-14"
            aria-hidden="true"
          />

          <div className="mt-10 max-w-md lg:mt-14">
            <p className="max-w-prose text-sm leading-relaxed text-ink/65 sm:text-base sm:leading-7">
              Feature sections, SEO shells and an optional Anfrage form. Swap
              the brand and ship.
            </p>
            <CtaLink className="mt-6 bg-brand text-brand-foreground md:mt-8">
              Anfrage starten
            </CtaLink>
          </div>
        </header>
      </div>
    </section>
  );
}
