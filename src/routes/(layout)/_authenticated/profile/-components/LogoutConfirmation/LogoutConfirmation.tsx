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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle
} from '@/shared/components/ui/sheet';

interface LogoutConfirmationProps {
  open: boolean;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

export const LogoutConfirmation = ({ open, onConfirm, onOpenChange }: LogoutConfirmationProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

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
            <Button className='w-full' size='lg' type='button' onClick={onConfirm}>
              Выйти
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className='items-center gap-8 px-4 pt-12 pb-7 text-center'
        showCloseButton={false}
        side='bottom'
      >
        <div
          aria-hidden
          className='flex size-20 items-center justify-center rounded-full bg-foreground text-[52px]/[52px] font-medium text-background'
        >
          ?
        </div>
        <div className='flex flex-col gap-3'>
          <SheetTitle className='flex flex-col text-[30px]/9 font-bold tracking-normal text-foreground'>
            <span>Вы уверены, что хотите</span>
            <span>выйти из профиля?</span>
          </SheetTitle>
          <SheetDescription className='sr-only'>
            Подтвердите выход из профиля или отмените действие
          </SheetDescription>
        </div>
        <div className='flex w-full flex-col gap-4'>
          <SheetClose asChild>
            <Button className='w-full' size='lg' type='button' variant='secondary'>
              Отменить
            </Button>
          </SheetClose>
          <Button className='w-full' size='lg' type='button' onClick={onConfirm}>
            Выйти
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
