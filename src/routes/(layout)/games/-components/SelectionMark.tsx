import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const SelectionMark = ({ active }: { active: boolean }) => (
  <span
    className={cn(
      'flex size-5 shrink-0 items-center justify-center rounded-full bg-background',
      active && 'border-primary bg-primary text-primary-fg'
    )}
  >
    {active && <CheckIcon className='size-4' />}
  </span>
);
