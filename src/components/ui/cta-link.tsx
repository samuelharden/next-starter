import { ANFRAGE_HREF } from '@/lib/contact';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type CtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

const baseClassName =
  'inline-flex items-center cursor-pointer justify-center rounded-full px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 max-w-fit shadow-sm';

export function CtaLink({
  className,
  children,
  href = ANFRAGE_HREF,
  ...props
}: CtaLinkProps) {
  return (
    <a
      className={className ? `${baseClassName} ${className}` : baseClassName}
      href={href}
      {...props}
    >
      {children}
    </a>
  );
}
