import { CheckIcon } from 'lucide-react';

import { cn } from '@/shared/utils';

export const SelectionMark = ({ active, size = 'md' }: { active: boolean; size?: 'md' | 'sm' }) => (
  <span
    className={cn(
      'flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-ring bg-background',
      size === 'md' ? 'size-5' : 'size-4',
      active && 'border-primary bg-primary text-primary-fg'
    )}
  >
    {active ? <CheckIcon className={size === 'md' ? 'size-4' : 'size-3'} /> : null}
  </span>
);
