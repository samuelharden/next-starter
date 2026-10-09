import Link from 'next/link';
import { ArrowUpRightIcon, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type LeistungAccent = 'brand' | 'ink';

export type LeistungSurface =
  | 'white'
  | 'mist'
  | 'cloud'
  | 'stone'
  | 'slate'
  | 'ash';

const surfaceClassName: Record<LeistungSurface, string> = {
  white: 'bg-white',
  mist: 'bg-neutral-50',
  cloud: 'bg-[#fafafa]',
  stone: 'bg-stone-50',
  slate: 'bg-zinc-50',
  ash: 'bg-neutral-100',
};

const airySurfaceClassName: Record<LeistungSurface, string> = {
  white: 'bg-white',
  mist: 'bg-neutral-50',
  cloud: 'bg-[#fafafa]',
  stone: 'bg-stone-50',
  slate: 'bg-zinc-50',
  ash: 'bg-neutral-100',
};

const tileShellClassName =
  'group/tile relative flex h-full min-h-52 flex-col gap-0 overflow-hidden rounded-[1.75rem] text-neutral-950 shadow-none ring-1 ring-black/[0.06] md:min-h-62 md:rounded-[2rem]';

type LeistungCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent?: LeistungAccent;
  surface?: LeistungSurface;
  airy?: boolean;
  href?: string;
  showArrow?: boolean;
  className?: string;
  children?: ReactNode;
};

export function LeistungCard({
  title,
  description,
  icon: Icon,
  accent = 'brand',
  surface = 'cloud',
  airy = false,
  href,
  showArrow = true,
  className,
  children,
}: LeistungCardProps) {
  const isInk = accent === 'ink';
  const iconWrap = isInk ? 'bg-ink/8 text-ink' : 'bg-brand/10 text-brand';
  const accentDot = isInk ? 'bg-ink' : 'bg-brand';
  const categoryLabel = isInk ? 'Kit' : 'Feature';
  const surfaceClasses = airy
    ? airySurfaceClassName[surface]
    : surfaceClassName[surface];

  return (
    <Card
      className={cn(
        tileShellClassName,
        '[--card-spacing:--spacing(7)] md:[--card-spacing:--spacing(8)]',
        surfaceClasses,
        className
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute top-5 right-5 z-10 flex size-10 items-center justify-center rounded-full md:top-6 md:right-6',
          iconWrap
        )}
      >
        <Icon
          className="size-4.5 stroke-[1.5]"
          aria-hidden
        />
      </div>

      <CardHeader className="relative z-10 flex flex-1 flex-col justify-start gap-5 pr-16">
        <div className="flex items-center gap-2">
          <span
            className={cn('size-1.5 rounded-full', accentDot)}
            aria-hidden
          />
          <span className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
            {categoryLabel}
          </span>
        </div>

        <div className="space-y-2.5">
          {href ? (
            <CardTitle className="font-variable text-lg font-bold tracking-tight text-neutral-950 uppercase md:text-xl">
              <Link
                href={href}
                className="group/link inline-flex max-w-full items-start gap-1.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2"
                aria-label={`${title} anfragen`}
              >
                <span className="min-w-0">{title}</span>
                {showArrow ? (
                  <ArrowUpRightIcon
                    className="mt-1 size-3.5 shrink-0 stroke-2 text-neutral-400 md:mt-1.5 md:size-4"
                    aria-hidden
                  />
                ) : null}
              </Link>
            </CardTitle>
          ) : (
            <CardTitle className="font-variable text-lg font-bold tracking-tight text-neutral-950 uppercase md:text-xl">
              {title}
            </CardTitle>
          )}
          <CardDescription className="max-w-xs text-[13px] leading-relaxed text-neutral-500">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      {children ? (
        <CardFooter className="relative z-10 border-0 bg-transparent pt-0">
          {children}
        </CardFooter>
      ) : null}
    </Card>
  );
}
