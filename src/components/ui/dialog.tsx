import type { ComponentProps } from 'react';

import { IconButton, Typography } from '@siberiacancode/uikit';
import { XIcon } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { cn } from '@/utils/lib/utils';

const Dialog = ({ ...props }: ComponentProps<typeof DialogPrimitive.Root>) => (
  <DialogPrimitive.Root data-slot='dialog' {...props} />
);

const DialogTrigger = ({ ...props }: ComponentProps<typeof DialogPrimitive.Trigger>) => (
  <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />
);

const DialogClose = ({ ...props }: ComponentProps<typeof DialogPrimitive.Close>) => (
  <DialogPrimitive.Close data-slot='dialog-close' {...props} />
);

const DialogPortal = ({ ...props }: ComponentProps<typeof DialogPrimitive.Portal>) => (
  <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />
);

const DialogOverlay = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-40 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
      className
    )}
    data-slot='dialog-overlay'
    {...props}
  />
);

const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        'fixed top-1/2 left-1/2 z-40 flex max-w-lg min-w-md -translate-1/2 flex-col gap-4 rounded-24 bg-background px-4 py-6 shadow-elevated duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        className
      )}
      data-slot='dialog-content'
      {...props}
    >
      {showCloseButton && (
        <div className='flex justify-end gap-10 px-8'>
          <IconButton asChild variant='ghost'>
            <DialogPrimitive.Close>
              <XIcon className='size-6' />
              <span className='sr-only'>Close</span>
            </DialogPrimitive.Close>
          </IconButton>
        </div>
      )}
      <div className='flex flex-col justify-center gap-4 px-8'>{children}</div>
    </DialogPrimitive.Content>
  </DialogPortal>
);

const DialogHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('flex flex-col items-center gap-4', className)}
    data-slot='dialog-header'
    {...props}
  />
);

const DialogFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
    data-slot='dialog-footer'
    {...props}
  />
);

const DialogTitle = ({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title asChild data-slot='dialog-title' {...props}>
    <Typography as='p' className={cn('text-center', className)} variant='title-md'>
      {children}
    </Typography>
  </DialogPrimitive.Title>
);

const DialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    className={cn('text-[14px]/5.5 font-medium tracking-wide text-muted-fg', className)}
    data-slot='dialog-description'
    {...props}
  />
);

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
};
