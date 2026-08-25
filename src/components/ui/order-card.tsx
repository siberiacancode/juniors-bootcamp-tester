import type { ComponentProps } from 'react';

import { typographyVariants } from '@siberiacancode/uikit';
import { Slot } from 'radix-ui';

import { badgeVariants } from '@/components/ui/badge';
import { cn } from '@/utils/lib/utils';

const OrderCard = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'article'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot.Root : 'article';

  return (
    <Comp
      className={cn(
        'flex w-full flex-col items-start gap-4 rounded-24 bg-secondary p-6',
        className
      )}
      data-slot='order-card'
      {...props}
    />
  );
};

const OrderCardHeader = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'div'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      className={cn(
        'grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-x-2',
        '*:data-[slot=order-card-thumbnail]:row-span-2',
        className
      )}
      data-slot='order-card-header'
      {...props}
    />
  );
};

const OrderCardThumbnail = ({ className, ...props }: ComponentProps<'img'>) => (
  <img
    className={cn('block size-14 shrink-0 rounded-8 object-cover', className)}
    data-slot='order-card-thumbnail'
    {...props}
  />
);

const OrderCardTitle = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'h2'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot.Root : 'h2';

  return (
    <Comp
      className={cn(typographyVariants({ variant: 'body-md' }), 'min-w-0 font-normal', className)}
      data-slot='order-card-title'
      {...props}
    />
  );
};

const OrderCardSubtitle = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'p'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot.Root : 'p';

  return (
    <Comp
      className={cn(
        typographyVariants({ variant: 'caption' }),
        'min-w-0 text-foreground/50',
        className
      )}
      data-slot='order-card-subtitle'
      {...props}
    />
  );
};

const OrderCardContent = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'div'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      className={cn('flex w-full flex-col gap-4', className)}
      data-slot='order-card-content'
      {...props}
    />
  );
};

const OrderCardBadges = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'div'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      className={cn('flex min-h-8 w-full flex-wrap items-start gap-2', className)}
      data-slot='order-card-badges'
      {...props}
    />
  );
};

const OrderCardBadge = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'span'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      className={cn(badgeVariants({ variant: 'outline' }), 'h-8 min-h-6 px-4 py-2', className)}
      data-slot='order-card-badge'
      {...props}
    />
  );
};

const OrderCardField = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'div'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      className={cn('flex w-full flex-col items-start', className)}
      data-slot='order-card-field'
      {...props}
    />
  );
};

const OrderCardFieldLabel = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'p'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot.Root : 'p';

  return (
    <Comp
      className={cn(
        typographyVariants({ variant: 'caption' }),
        'w-full text-foreground/50',
        className
      )}
      data-slot='order-card-field-label'
      {...props}
    />
  );
};

const OrderCardFieldValue = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'p'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot.Root : 'p';

  return (
    <Comp
      className={cn(typographyVariants({ variant: 'body-sm' }), 'w-full', className)}
      data-slot='order-card-field-value'
      {...props}
    />
  );
};

export {
  OrderCard,
  OrderCardBadge,
  OrderCardBadges,
  OrderCardContent,
  OrderCardField,
  OrderCardFieldLabel,
  OrderCardFieldValue,
  OrderCardHeader,
  OrderCardSubtitle,
  OrderCardThumbnail,
  OrderCardTitle
};
