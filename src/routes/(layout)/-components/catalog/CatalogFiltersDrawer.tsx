import { SlidersHorizontalIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { IconButton } from '@/components/ui/icon-button';

import type { CatalogFilters as CatalogFiltersValue } from '../../-helpers/catalog';

import { CatalogFilters } from './CatalogFilters';

interface CatalogFiltersDrawerProps {
  open: boolean;
  value: CatalogFiltersValue;
  onApply: () => void;
  onChange: (value: Partial<CatalogFiltersValue>) => void;
  onOpenChange: (open: boolean) => void;
  onReset: () => void;
}

export const CatalogFiltersDrawer = ({
  onApply,
  onChange,
  onOpenChange,
  onReset,
  open,
  value
}: CatalogFiltersDrawerProps) => (
  <Drawer open={open} onOpenChange={onOpenChange}>
    <DrawerTrigger asChild>
      <IconButton
        rounded
        aria-label='Открыть фильтры'
        className='size-15 rounded-full bg-secondary text-foreground hover:bg-secondary-hover lg:hidden'
        size='lg'
        variant='secondary'
      >
        <SlidersHorizontalIcon className='size-7' />
      </IconButton>
    </DrawerTrigger>
    <DrawerContent className='max-h-[86dvh] rounded-t-20 px-0' showHandle={false}>
      <DrawerHeader className='flex flex-row items-center justify-between px-9 pt-11 pb-5'>
        <DrawerTitle className='text-[32px]/10 font-extrabold tracking-normal'>Фильтры</DrawerTitle>
        <DrawerClose asChild>
          <IconButton
            rounded
            aria-label='Закрыть фильтры'
            className='size-11 text-foreground'
            variant='ghost'
          >
            <XIcon className='size-8' />
          </IconButton>
        </DrawerClose>
      </DrawerHeader>

      <div className='min-h-0 flex-1 overflow-y-auto px-9 pb-4'>
        <CatalogFilters value={value} variant='mobile' onChange={onChange} onReset={onReset} />
      </div>

      <DrawerFooter className='gap-3 px-9 pt-0 pb-8'>
        <Button
          className='h-18 text-[18px]/6.5 font-medium'
          size='lg'
          variant='secondary'
          onClick={onReset}
        >
          Сбросить фильтры
        </Button>
        <Button className='h-18 text-[20px]/7 font-medium' size='lg' onClick={onApply}>
          Найти
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
