import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import { XIcon } from 'lucide-react';
import { ToggleGroup as ChipGroupPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

import { chipVariants } from './chip';

const ChipGroup = ({ className, ...props }: ComponentProps<typeof ChipGroupPrimitive.Root>) => (
  <ChipGroupPrimitive.Root
    className={cn(
      'flex w-fit flex-row items-center gap-2 data-vertical:flex-col data-vertical:items-stretch',
      className
    )}
    data-slot='chip-group'
    {...props}
  />
);

export type ChipGroupItemProps = ComponentProps<typeof ChipGroupPrimitive.Item> &
  VariantProps<typeof chipVariants> & {
    icon?: false | ReactNode;
  };

const ChipGroupItem = ({
  className,
  variant,
  children,
  icon = <XIcon />,
  ...props
}: ChipGroupItemProps) => (
  <ChipGroupPrimitive.Item
    className={cn(
      chipVariants({ variant, className }),
      'group/chip-group-item',
      icon && 'data-[state=on]:px-4.5'
    )}
    data-slot='chip-group-item'
    {...props}
  >
    {children}
    {icon && <span className='hidden group-data-[state=on]/chip-group-item:block'>{icon}</span>}
  </ChipGroupPrimitive.Item>
);

export { ChipGroup, ChipGroupItem };
