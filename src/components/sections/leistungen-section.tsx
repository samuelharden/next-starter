import {
  FileTextIcon,
  FormInputIcon,
  LayoutTemplateIcon,
  RocketIcon,
  SearchIcon,
  SparklesIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { CtaLink } from '@/components/ui/cta-link';
import {
  LeistungCard,
  type LeistungAccent,
  type LeistungSurface,
} from '@/components/ui/leistung-card';
import { cn } from '@/lib/utils';

type LeistungTile = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: LeistungAccent;
  surface: LeistungSurface;
  className?: string;
  showArrow?: boolean;
  airy?: boolean;
  cta?: {
    label: string;
    href: string;
  };
};

const leistungenTiles: LeistungTile[] = [
  {
    title: 'Hero',
    description:
      'Volle Hero-Sektion mit Marke, Headline und CTA. Text und Logo ersetzen.',
    icon: SparklesIcon,
    accent: 'brand',
    surface: 'mist',
    airy: true,
    className: 'md:col-span-2',
    cta: {
      label: 'Anfrage starten',
      href: '/anfrage',
    },
  },
  {
    title: 'Sections',
    description:
      'Feature-Grid, Über-uns und Kontakt. Eine Sektion, ein Job.',
    icon: LayoutTemplateIcon,
    accent: 'brand',
    surface: 'white',
    className: 'md:col-span-1',
  },
  {
    title: 'Forms',
    description:
      'Formisch + Valibot + Resend. Brauchen Sie das nicht? README sagt, was Sie löschen.',
    icon: FormInputIcon,
    accent: 'ink',
    surface: 'cloud',
    showArrow: false,
    className: 'md:col-span-1',
  },
  {
    title: 'SEO',
    description:
      'Metadata, Open Graph, JSON-LD, Sitemap und robots. Zentral in seo.ts.',
    icon: SearchIcon,
    accent: 'brand',
    surface: 'mist',
    showArrow: false,
    className: 'md:col-span-2',
    airy: true,
  },
  {
    title: 'Legal',
    description:
      'Impressum und Datenschutz als AT/DE-Shells. Inhalte aus company.ts.',
    icon: FileTextIcon,
    accent: 'ink',
    surface: 'white',
    className: 'md:col-span-2',
  },
  {
    title: 'Deploy',
    description:
      'Vercel-ready: Security Headers, Apex-Redirect, Analytics Hooks.',
    icon: RocketIcon,
    accent: 'ink',
    surface: 'ash',
    className: 'md:col-span-1',
    airy: true,
  },
];

const leistungenTags = [
  'App Router',
  'shadcn/ui',
  'Resend',
  'JSON-LD',
  'Yarn Classic',
  'Tailwind 4',
] as const;

export function LeistungenSection() {
  return (
    <section
      id="leistungen"
      className="relative mb-12 min-h-lvh overflow-visible bg-paper selection:bg-ink selection:text-paper sm:mx-6 sm:rounded-xl lg:mx-10"
    >
      <div className="relative z-10">
        <div className="relative mx-auto w-full max-w-7xl px-5 pt-12 md:px-6 md:pt-14 lg:px-10 lg:pt-16">
          <span
            className="font-variable pointer-events-none absolute top-12 right-5 hidden text-[clamp(6rem,18vw,14rem)] leading-none font-black text-ink/5 select-none md:block lg:right-10"
            aria-hidden="true"
          >
            02
          </span>

          <header className="relative grid gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-end md:gap-12 lg:gap-20">
            <div>
              <Badge
                variant="outline"
                className="mb-6 h-7 gap-2 rounded-sm border-ink/10 bg-white/90 px-3.5 text-[11px] font-semibold tracking-widest text-ink/70 uppercase"
              >
                <span
                  className="size-1.5 rounded-full bg-brand"
                  aria-hidden
                />
                Features
              </Badge>
              <h2 className="font-variable text-3xl leading-[1.08] font-bold tracking-tight text-ink uppercase md:text-4xl lg:text-5xl lg:leading-[1.02]">
                Was dieses Kit
                <br className="hidden sm:block" />
                mitbringt.
              </h2>
            </div>

            <div className="max-w-md md:justify-self-end md:pb-1 lg:pt-16">
              <p className="text-[15px] leading-[1.7] font-medium text-ink/55 sm:text-base sm:leading-7">
                Feature-orientierte Demo-Tiles. Tauschen Sie Titel und Text.
                Die Karten bleiben.
              </p>
            </div>
          </header>
        </div>

        <div className="mx-auto mt-14 w-full max-w-7xl min-w-0 px-5 pb-14 md:mt-16 md:px-6 md:pb-16 lg:mt-20 lg:px-10 lg:pb-20">
          <ul className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {leistungenTiles.map((tile) => (
              <li
                key={tile.title}
                className={cn('min-w-0', tile.className)}
              >
                <LeistungCard
                  title={tile.title}
                  description={tile.description}
                  icon={tile.icon}
                  accent={tile.accent}
                  surface={tile.surface}
                  href={tile.cta ? undefined : '/anfrage'}
                  showArrow={tile.showArrow}
                  airy={tile.airy}
                  className="h-full"
                >
                  {tile.cta ? (
                    <CtaLink
                      href={tile.cta.href}
                      className="bg-brand text-brand-foreground"
                    >
                      {tile.cta.label}
                    </CtaLink>
                  ) : null}
                </LeistungCard>
              </li>
            ))}
          </ul>

          <ul className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-2.5 md:mt-16 md:gap-3">
            {leistungenTags.map((tag) => (
              <li key={tag}>
                <Badge
                  variant="outline"
                  className="h-8 rounded-full border-ink/10 bg-white/80 px-4 text-[12px] font-medium text-ink/50 sm:text-[13px]"
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-3 pt-12 md:mt-16 md:gap-4 md:pt-14">
            <CtaLink href="/anfrage" className="bg-brand text-brand-foreground">
              Anfrage starten
            </CtaLink>
            <CtaLink
              href="/#kontakt"
              className="bg-white text-ink ring-1 ring-ink/10"
            >
              Kontakt
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
