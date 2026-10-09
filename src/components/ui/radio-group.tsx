'use client';

import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

/**
 * Visually hidden radio item. Selection state is communicated by the
 * surrounding label (via `has-data-[state=checked]:*`), so no indicator is
 * rendered. Keyboard focus and screen reader semantics stay intact.
 */
function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn('sr-only', className)}
      {...props}
    />
  );
}

export { RadioGroup, RadioGroupItem };
