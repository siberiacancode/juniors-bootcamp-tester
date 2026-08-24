import type { ComponentProps } from 'react';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

import { cn } from '@/utils/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = ({ ...props }: ComponentProps<typeof TooltipPrimitive.Root>) => (
  <TooltipPrimitive.Root data-slot='tooltip' {...props} />
);

const TooltipTrigger = ({ ...props }: ComponentProps<typeof TooltipPrimitive.Trigger>) => (
  <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />
);

const TooltipContent = ({
  className,
  sideOffset = 8,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      className={cn(
        'z-50 overflow-hidden rounded-8 bg-foreground px-3 py-1.5 text-[12px]/4 font-medium text-background shadow-md duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-[state=instant-open]:animate-in data-[state=instant-open]:fade-in-0 data-[state=instant-open]:zoom-in-95',
        className
      )}
      data-slot='tooltip-content'
      sideOffset={sideOffset}
      {...props}
    />
  </TooltipPrimitive.Portal>
);

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
