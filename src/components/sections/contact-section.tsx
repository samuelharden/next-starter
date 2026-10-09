import { CtaLink } from '@/components/ui/cta-link';

export default function ContactSection() {
  return (
    <section
      id="kontakt"
      className="flex flex-col rounded-t-xl bg-brand pb-10 selection:bg-white selection:text-brand sm:mx-6 lg:mx-10"
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <header className="px-5 pt-10 md:px-6 md:pt-12 lg:px-10 lg:pt-14">
          <h2 className="font-variable text-4xl font-black text-brand-foreground uppercase">
            Kontakt
          </h2>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-brand-foreground/90 sm:text-base sm:leading-7">
            Demo-CTA. Verbinden Sie diese Sektion mit Ihrer Anfrage oder einem
            mailto. Ersetzen Sie den Text.
          </p>
          <CtaLink className="mt-6 bg-white text-ink">
            Anfrage starten
          </CtaLink>
        </header>
      </div>
    </section>
  );
}
