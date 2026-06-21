import type { ReactNode } from 'react';

import { useMediaQuery } from '@siberiacancode/reactuse';

import { cn } from '@/lib/utils';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from './drawer';

export interface ModalProps {
  children?: ReactNode;
  className?: string;
  description?: ReactNode;
  icon?: ReactNode;
  title?: ReactNode;
  onOpenChange: (value: boolean) => void;
}

export const Modal = ({
  icon,
  onOpenChange,
  title,
  description,
  children,
  className
}: ModalProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <Drawer open onOpenChange={onOpenChange}>
        <DrawerContent className={className}>
          <div className='overflow-y-auto'>
            {(title || description) && (
              <DrawerHeader>
                {icon && <div className='p-3'>{icon}</div>}
                {title && <DrawerTitle className='px-2 py-3'>{title}</DrawerTitle>}
                {description && <DrawerDescription>{description}</DrawerDescription>}
              </DrawerHeader>
            )}
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className={cn('w-lg', className)}>
        {(title || description) && (
          <DialogHeader>
            {icon && <div className='p-3'>{icon}</div>}
            {title && <DialogTitle className='px-2 py-3'>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};
