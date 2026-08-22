import type { ComponentProps } from 'react';

import { Command as CommandPrimitive } from 'cmdk';
import { SearchIcon } from 'lucide-react';

import { cn } from '@/utils/lib/utils';

const Command = ({ className, ...props }: ComponentProps<typeof CommandPrimitive>) => (
  <CommandPrimitive
    className={cn(
      'flex size-full flex-col overflow-hidden rounded-24 bg-background text-foreground',
      className
    )}
    data-slot='command'
    {...props}
  />
);

const CommandInput = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Input>) => (
  <div
    className='flex items-center border-b border-border-hard px-4'
    data-slot='command-input-wrapper'
  >
    <SearchIcon className='mr-2 size-4 shrink-0 text-muted-fg' />
    <CommandPrimitive.Input
      className={cn(
        'flex h-11 w-full rounded-full bg-transparent py-3 text-[16px]/6 outline-none placeholder:text-input disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      data-slot='command-input'
      {...props}
    />
  </div>
);

const CommandList = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List
    className={cn('max-h-72 overflow-x-hidden overflow-y-auto', className)}
    data-slot='command-list'
    {...props}
  />
);

const CommandEmpty = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty
    className={cn('text-sm py-6 text-center text-muted-fg', className)}
    data-slot='command-empty'
    {...props}
  />
);

const CommandGroup = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group
    className={cn(
      '[&_[cmdk-group-heading]]:text-xs overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-fg',
      className
    )}
    data-slot='command-group'
    {...props}
  />
);

const CommandSeparator = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Separator>) => (
  <CommandPrimitive.Separator
    className={cn('-mx-1 h-px bg-border-hard', className)}
    data-slot='command-separator'
    {...props}
  />
);

const CommandItem = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>) => (
  <CommandPrimitive.Item
    className={cn(
      'relative flex cursor-default items-center gap-2 rounded-16 p-2 text-[14px]/5 outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-secondary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      className
    )}
    data-slot='command-item'
    {...props}
  />
);

const CommandShortcut = ({ className, ...props }: ComponentProps<'span'>) => (
  <span
    className={cn('text-xs ml-auto tracking-wide text-muted-fg', className)}
    data-slot='command-shortcut'
    {...props}
  />
);

export {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
};
