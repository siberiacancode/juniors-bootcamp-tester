import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@siberiacancode/uikit';
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';

import { cn } from '@/utils/lib/utils';

const Combobox = ComboboxPrimitive.Root;

const ComboboxValue = ({ ...props }: ComboboxPrimitive.Value.Props) => (
  <ComboboxPrimitive.Value data-slot='combobox-value' {...props} />
);

const ComboboxTrigger = ({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) => (
  <ComboboxPrimitive.Trigger
    className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
    data-slot='combobox-trigger'
    {...props}
  >
    {children}
    <ChevronDownIcon className='pointer-events-none size-4 text-muted-fg' />
  </ComboboxPrimitive.Trigger>
);

const ComboboxClear = ({ className, ...props }: ComboboxPrimitive.Clear.Props) => (
  <ComboboxPrimitive.Clear
    className={cn(className)}
    data-slot='combobox-clear'
    {...props}
    render={
      <InputGroupButton>
        <XIcon className='pointer-events-none' />
      </InputGroupButton>
    }
  />
);

const ComboboxInput = ({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  inputGroupRef,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
  inputGroupRef?: React.Ref<HTMLLabelElement>;
}) => (
  <InputGroup ref={inputGroupRef} className={cn('w-auto', className)}>
    {children}
    <ComboboxPrimitive.Input render={<InputGroupInput disabled={disabled} />} {...props} />
    <InputGroupAddon align='inline-end'>
      {showTrigger && (
        <InputGroupButton
          asChild
          className='group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent'
          data-slot='input-group-button'
          disabled={disabled}
        >
          <ComboboxTrigger />
        </InputGroupButton>
      )}
      {showClear && <ComboboxClear disabled={disabled} />}
    </InputGroupAddon>
  </InputGroup>
);

const ComboboxContent = ({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'anchor' | 'side' | 'sideOffset'
  > & {
    positionerClassName?: string;
  }) => (
  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      anchor={anchor}
      className='isolate z-80'
      side={side}
      sideOffset={sideOffset}
    >
      <ComboboxPrimitive.Popup
        className={cn(
          'group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-16 bg-secondary text-foreground duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className
        )}
        data-slot='combobox-content'
        {...props}
      />
    </ComboboxPrimitive.Positioner>
  </ComboboxPrimitive.Portal>
);

const ComboboxList = ({
  className,
  showScrollbar = false,
  ...props
}: ComboboxPrimitive.List.Props & {
  showScrollbar?: boolean;
}) => (
  <ComboboxPrimitive.List
    className={cn(
      !showScrollbar && 'no-scrollbar',
      'max-h-[min(calc(--spacing(72)-(--spacing(9))),calc(var(--available-height)-(--spacing(9))))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0',
      className
    )}
    data-slot='combobox-list'
    {...props}
  />
);

const ComboboxItem = ({ className, children, ...props }: ComboboxPrimitive.Item.Props) => (
  <ComboboxPrimitive.Item
    className={cn(
      "relative flex w-full cursor-default items-center gap-2 rounded-20 py-3 pr-8 pl-1.5 text-[14px]/5.5 outline-hidden select-none data-highlighted:bg-secondary-hover data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    data-slot='combobox-item'
    {...props}
  >
    {children}
    <ComboboxPrimitive.ItemIndicator
      render={
        <span className='pointer-events-none absolute right-2 flex size-4 items-center justify-center'>
          <CheckIcon className='pointer-events-none' />
        </span>
      }
    />
  </ComboboxPrimitive.Item>
);

const ComboboxGroup = ({ className, ...props }: ComboboxPrimitive.Group.Props) => (
  <ComboboxPrimitive.Group className={cn(className)} data-slot='combobox-group' {...props} />
);

const ComboboxLabel = ({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) => (
  <ComboboxPrimitive.GroupLabel
    className={cn('px-2 py-1.5 text-[14px]/5.5 text-muted-fg', className)}
    data-slot='combobox-label'
    {...props}
  />
);

const ComboboxCollection = ({ ...props }: ComboboxPrimitive.Collection.Props) => (
  <ComboboxPrimitive.Collection data-slot='combobox-collection' {...props} />
);

const ComboboxEmpty = ({ className, ...props }: ComboboxPrimitive.Empty.Props) => (
  <ComboboxPrimitive.Empty
    className={cn(
      'flex w-full justify-center py-2 text-center text-[14px]/5.5 text-muted-fg',
      className
    )}
    data-slot='combobox-empty'
    {...props}
  />
);

const ComboboxStatus = ({ className, ...props }: ComboboxPrimitive.Status.Props) => (
  <ComboboxPrimitive.Status
    className={cn('flex w-full justify-center py-2 text-center text-[14px]/5.5', className)}
    data-slot='combobox-status'
    {...props}
  />
);

const ComboboxSeparator = ({ className, ...props }: ComboboxPrimitive.Separator.Props) => (
  <ComboboxPrimitive.Separator
    className={cn('my-1 h-px bg-border-hard', className)}
    data-slot='combobox-separator'
    {...props}
  />
);

export {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue
};
