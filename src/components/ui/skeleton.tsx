import type { ComponentProps } from 'react';

import { cn } from '@/utils/lib/utils';

const Skeleton = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('rounded-md animate-pulse bg-secondary', className)}
    data-slot='skeleton'
    {...props}
  />
);

export { Skeleton };
