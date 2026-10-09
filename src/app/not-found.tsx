import { CtaLink } from '@/components/ui/cta-link';

export default function Home() {
  return (
    <section className="flex h-full flex-col items-center justify-center bg-paper px-4 py-12 text-center">
      <header className="max-w-2xl">
        <h1 className="font-variable text-4xl font-black text-ink uppercase">
          404
        </h1>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink/70 sm:text-base sm:leading-7">
          Die Seite, die Sie suchen, konnte nicht gefunden werden.
        </p>
        <CtaLink
          href="/"
          className="mt-6 bg-brand text-brand-foreground md:mt-8"
        >
          Zur Startseite
        </CtaLink>
      </header>
    </section>
  );
}
