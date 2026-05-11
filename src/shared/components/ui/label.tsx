import { Label as LabelPrimitive } from 'radix-ui';

import { cn } from '@/shared/utils';

const Label = ({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) => (
  <LabelPrimitive.Root
    className={cn(
      'flex items-center gap-2 text-[14px]/5.5 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      className
    )}
    data-slot='label'
    {...props}
  />
);

export { Label };
