import Image from 'next/image';

export default function AboutSection() {
  return (
    <div className="relative z-10 bg-paper sm:mx-6 lg:mx-10">
      <section
        id="ueber-uns"
        className="flex min-h-lvh flex-col rounded-t-xl bg-ink selection:bg-brand selection:text-brand-foreground"
      >
        <div className="relative mx-auto w-full max-w-7xl pb-24">
          <header className="px-5 pt-10 md:px-6 md:pt-12 lg:px-10 lg:pt-14">
            <span
              className="font-variable pointer-events-none absolute top-10 right-5 hidden text-[clamp(6rem,18vw,14rem)] leading-none font-black text-white/[0.04] select-none md:block lg:right-10"
              aria-hidden="true"
            >
              03
            </span>
            <h2 className="font-variable w-fit border-b-4 border-brand pb-1 text-4xl font-black text-white uppercase md:text-5xl lg:text-6xl">
              Über uns
            </h2>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-white/80 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              Demo-Content mit absichtlich unsinnigen Platzhalter-Fotos. Ersetzen
              Sie Text und Bilder durch Ihr Team. Die Layoutstruktur bleibt.
            </p>
          </header>

          <div className="mt-6 px-5 md:px-6 lg:px-10">
            <div className="flex w-full flex-col gap-4 md:gap-8 lg:flex-row lg:justify-between lg:pb-[15em]">
              <div className="relative mb-12 block h-auto max-w-3/4 object-contain sm:max-w-2/3 md:max-w-1/2">
                <Image
                  src="/media/img/placeholders/cat.jpg"
                  alt="Platzhalter: Katze als Teammitglied"
                  width={800}
                  height={1200}
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 640px"
                  className="h-auto w-full"
                  priority
                />
                <span className="absolute bottom-[-2em] left-0 text-[1.5rem] text-white">
                  Chief Meow Officer
                </span>
              </div>
              <div className="relative block h-auto max-w-3/4 self-end object-contain sm:max-w-2/3 md:max-w-1/2 lg:translate-y-[15em]">
                <Image
                  src="/media/img/placeholders/monkey.jpg"
                  alt="Platzhalter: Affe als Teammitglied"
                  width={800}
                  height={1200}
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 640px"
                  className="h-auto w-full"
                />
                <span className="absolute bottom-[-1.5em] left-[10%] text-[1.5rem] text-white">
                  Banana Director
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
