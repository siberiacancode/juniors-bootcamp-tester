import { Link } from '@tanstack/react-router';
import { InboxIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography';

export const OrderHistoryEmptyState = () => (
  <div className='flex flex-col items-center justify-center gap-4 rounded-24 bg-secondary p-6'>
    <InboxIcon className='size-13 sm:size-10' strokeWidth={1.5} />
    <div className='text-center'>
      <Typography
        as='h3'
        className='text-[24px]/8 font-medium text-foreground sm:text-[24px]/8'
        variant='body-lg'
      >
        Здесь пока пусто
      </Typography>
      <Typography
        as='p'
        className='max-w-70 text-[16px]/6 font-medium text-foreground sm:text-[16px]/6'
        variant='body-md'
      >
        Соверши любую покупку, чтобы она отобразилась тут
      </Typography>
    </div>
    <Button asChild className='w-full' size='lg'>
      <Link to='/'>Перейти в каталог игр</Link>
    </Button>
  </div>
);
