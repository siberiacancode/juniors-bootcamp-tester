import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cva } from 'class-variance-authority';
import { Avatar as AvatarPrimitive } from 'radix-ui';

import { cn } from '@/utils/lib/utils';

const avatarVariants = cva(
  'group/avatar relative flex shrink-0 overflow-hidden rounded-full select-none',
  {
    variants: {
      size: {
        xl: 'size-22',
        lg: 'size-12',
        md: 'size-10',
        sm: 'size-8'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

interface AvatarProps
  extends ComponentProps<typeof AvatarPrimitive.Root>, VariantProps<typeof avatarVariants> {}

const Avatar = ({ className, size = 'md', ...props }: AvatarProps) => (
  <AvatarPrimitive.Root
    className={cn(avatarVariants({ size }), className)}
    data-size={size}
    data-slot='avatar'
    {...props}
  />
);

const AvatarImage = ({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Image>) => (
  <AvatarPrimitive.Image
    className={cn('aspect-square size-full', className)}
    data-slot='avatar-image'
    {...props}
  />
);

const AvatarFallback = ({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) => (
  <AvatarPrimitive.Fallback
    className={cn(
      'flex size-full items-center justify-center rounded-full bg-muted text-[16px] text-muted-fg group-data-[size=sm]/avatar:text-[12px]',
      className
    )}
    data-slot='avatar-fallback'
    {...props}
  />
);

export { Avatar, AvatarFallback, AvatarImage, avatarVariants };
