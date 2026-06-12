import type { ComponentProps } from 'react';

import { cva } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/shared/utils';

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    data-slot='drawer'
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);

const DrawerTrigger = ({ ...props }: ComponentProps<typeof DrawerPrimitive.Trigger>) => (
  <DrawerPrimitive.Trigger data-slot='drawer-trigger' {...props} />
);

const DrawerPortal = ({ ...props }: ComponentProps<typeof DrawerPrimitive.Portal>) => (
  <DrawerPrimitive.Portal data-slot='drawer-portal' {...props} />
);

const DrawerClose = ({ ...props }: ComponentProps<typeof DrawerPrimitive.Close>) => (
  <DrawerPrimitive.Close data-slot='drawer-close' {...props} />
);

const DrawerOverlay = ({ className, ...props }: ComponentProps<typeof DrawerPrimitive.Overlay>) => (
  <DrawerPrimitive.Overlay
    className={cn('fixed inset-0 z-60 bg-black/50', className)}
    data-slot='drawer-overlay'
    {...props}
  />
);

const drawerContentVariants = cva(
  'fixed z-60 flex flex-col bg-background p-6 outline-none data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[85dvh] data-[vaul-drawer-direction=bottom]:rounded-t-[28px] data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=right]:inset-y-4 data-[vaul-drawer-direction=right]:right-4 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-24 data-[vaul-drawer-direction=right]:border-none data-[vaul-drawer-direction=right]:after:hidden data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:rounded-b-[28px]'
);

const DrawerContent = ({
  className,
  children,
  showHandle = true,
  showCloseButton = false,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Content> & {
  showCloseButton?: boolean;
  showHandle?: boolean;
}) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      className={cn(drawerContentVariants(), className)}
      data-slot='drawer-content'
      {...props}
    >
      {showHandle && (
        <div className='mt-3 flex justify-center'>
          <div className='h-1.5 w-12 rounded-full bg-border-hard' />
        </div>
      )}
      {children}
      {showCloseButton && (
        <DrawerPrimitive.Close className='absolute top-5 right-5 rounded-full p-2 text-foreground/70 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'>
          <XIcon className='size-5' />
          <span className='sr-only'>Close</span>
        </DrawerPrimitive.Close>
      )}
    </DrawerPrimitive.Content>
  </DrawerPortal>
);

const DrawerHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('grid gap-1.5 p-6 pb-0 text-left', className)}
    data-slot='drawer-header'
    {...props}
  />
);

const DrawerFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('mt-auto flex flex-col gap-3 p-6 pt-2', className)}
    data-slot='drawer-footer'
    {...props}
  />
);

const DrawerTitle = ({ className, ...props }: ComponentProps<typeof DrawerPrimitive.Title>) => (
  <DrawerPrimitive.Title
    className={cn('text-[20px]/7 font-semibold text-foreground', className)}
    data-slot='drawer-title'
    {...props}
  />
);

const DrawerDescription = ({
  className,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Description>) => (
  <DrawerPrimitive.Description
    className={cn('text-[14px]/5 text-muted-fg', className)}
    data-slot='drawer-description'
    {...props}
  />
);

type DrawerRootProps = ComponentProps<typeof DrawerPrimitive.Root> & {
  nested?: boolean;
};

const DrawerRoot = ({ nested, ...props }: DrawerRootProps) => (
  <Drawer data-nested={nested} {...props} />
);

export {
  DrawerRoot as Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger
};
