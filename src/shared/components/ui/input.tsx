import type { ComponentProps } from 'react';

import { Slot } from 'radix-ui';

import { cn } from '@/shared/utils';

const Input = ({
  className,
  asChild = false,
  type,
  height,
  ...props
}: ComponentProps<'input'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot.Root : 'input';

  return (
    <Comp
      className={cn(
        `h-11 w-full min-w-0 rounded-full border border-input bg-transparent px-4 py-2 text-[20px]/[24px] leading-none transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-fg placeholder:text-input disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`,
        `focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50`,
        `aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40`,
        className
      )}
      data-slot='input'
      type={type}
      {...props}
    />
  );
};

export { Input };
