import { cn } from '@/lib/utils';

type HeroBrandLogoProps = {
  className?: string;
};

export function HeroBrandLogo({ className }: HeroBrandLogoProps) {
  return (
    <img
      src="/media/img/logo-wordmark.svg"
      alt="Starter"
      className={cn(
        'mb-6 h-auto max-w-2/3 lg:mb-8 lg:block xl:max-w-3xl',
        className
      )}
    />
  );
}
