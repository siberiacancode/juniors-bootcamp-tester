import { useMediaQuery } from '@siberiacancode/reactuse';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle
} from '@/shared/components/ui/drawer';

interface LogoutConfirmationProps {
  open: boolean;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

export const LogoutConfirmation = ({ open, onConfirm, onOpenChange }: LogoutConfirmationProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const handleConfirm = () => {
    onOpenChange(false);
    onConfirm();
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className='max-w-110 items-center gap-8 px-8 py-10 text-center'
          showCloseButton={false}
        >
          <div
            aria-hidden
            className='flex size-28 items-center justify-center rounded-full bg-foreground text-[72px]/[72px] font-medium text-background'
          >
            ?
          </div>
          <div className='flex flex-col gap-3'>
            <DialogTitle className='flex flex-col text-[32px]/10 font-bold tracking-normal text-foreground'>
              <span>Вы уверены, что хотите</span>
              <span>выйти из профиля?</span>
            </DialogTitle>
            <DialogDescription className='sr-only'>
              Подтвердите выход из профиля или отмените действие
            </DialogDescription>
          </div>
          <div className='flex w-full flex-col gap-4'>
            <DialogClose asChild>
              <Button className='w-full' size='lg' type='button' variant='secondary'>
                Отменить
              </Button>
            </DialogClose>
            <Button className='w-full' size='lg' type='button' onClick={handleConfirm}>
              Выйти
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer direction='bottom' open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className='items-center gap-8 px-4 pt-12 pb-7 text-center'
        showCloseButton={false}
      >
        <div
          aria-hidden
          className='flex size-20 items-center justify-center rounded-full bg-foreground text-[52px]/[52px] font-medium text-background'
        >
          ?
        </div>
        <div className='flex flex-col gap-3'>
          <DrawerTitle className='flex flex-col text-[30px]/9 font-bold tracking-normal text-foreground'>
            <span>Вы уверены, что хотите</span>
            <span>выйти из профиля?</span>
          </DrawerTitle>
          <DrawerDescription className='sr-only'>
            Подтвердите выход из профиля или отмените действие
          </DrawerDescription>
        </div>
        <div className='flex w-full flex-col gap-4'>
          <DrawerClose asChild>
            <Button className='w-full' size='lg' type='button' variant='secondary'>
              Отменить
            </Button>
          </DrawerClose>
          <Button className='w-full' size='lg' type='button' onClick={handleConfirm}>
            Выйти
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
