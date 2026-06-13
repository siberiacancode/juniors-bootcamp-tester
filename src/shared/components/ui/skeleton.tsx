import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils';

const Skeleton = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('rounded-md animate-pulse bg-secondary', className)}
    data-slot='skeleton'
    {...props}
  />
);

export { Skeleton };
