import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeftIcon, InboxIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { IconButton } from '@/shared/components/ui/icon-button';
import { Typography } from '@/shared/components/ui/typography';

import { PurchaseDetailsCard } from '../../-components';
import { getMockPurchaseHistoryItem } from '../../-constants';

export const Route = createFileRoute('/(layout)/_authenticated/history/$orderId')({
  component: RouteComponent
});

function RouteComponent() {
  const orderId = Route.useParams({
    select: (params) => params.orderId
  });

  const order = getMockPurchaseHistoryItem(orderId);

  if (!order) {
    return (
      <main className='mx-auto flex w-full max-w-3xl flex-col gap-8'>
        <div className='flex items-center gap-4 sm:hidden'>
          <IconButton asChild rounded size='sm' variant='ghost'>
            <Link to='/history'>
              <ChevronLeftIcon />
            </Link>
          </IconButton>
          <Typography as='h1' variant='title-md'>
            Подробности покупки
          </Typography>
        </div>

        <div className='hidden items-center gap-4 sm:flex'>
          <Button asChild size='md' variant='secondary'>
            <Link to='/history'>
              <ChevronLeftIcon />
              Назад
            </Link>
          </Button>
          <Typography as='h1' variant='title-lg'>
            Подробности покупки
          </Typography>
        </div>

        <section className='rounded-24 bg-secondary px-6 py-10 sm:px-10 sm:py-12'>
          <div className='mx-auto flex max-w-xl flex-col items-center gap-5 text-center sm:gap-6'>
            <div className='flex size-16 items-center justify-center rounded-full border border-foreground/10 bg-background sm:size-18'>
              <InboxIcon className='size-8 sm:size-9' strokeWidth={1.75} />
            </div>

            <div className='flex flex-col gap-2 sm:gap-3'>
              <Typography
                as='h2'
                className='text-[24px]/8 font-medium tracking-normal sm:text-[32px]/10'
                variant='body-lg'
              >
                Покупка не найдена
              </Typography>
              <Typography
                as='p'
                className='max-w-80 text-[16px]/6 font-medium tracking-normal text-foreground/70 sm:max-w-none sm:text-[18px]/6.5'
                variant='body-md'
              >
                Похоже, этой покупки больше нет в истории или ссылка устарела.
              </Typography>
            </div>

            <Button asChild className='mt-1 w-full sm:mt-2' size='lg'>
              <Link to='/history'>Вернуться к истории</Link>
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className='mx-auto flex w-full max-w-3xl flex-col gap-8'>
      <div className='flex items-center gap-4 sm:hidden'>
        <IconButton asChild rounded size='sm' variant='ghost'>
          <Link to='/history'>
            <ChevronLeftIcon />
          </Link>
        </IconButton>
        <Typography as='h1' variant='title-md'>
          Подробности покупки
        </Typography>
      </div>

      <div className='hidden items-center gap-4 sm:flex'>
        <Button asChild size='md' variant='secondary'>
          <Link to='/history'>
            <ChevronLeftIcon />
            Назад
          </Link>
        </Button>
        <Typography as='h1' variant='title-lg'>
          Подробности покупки
        </Typography>
      </div>

      <PurchaseDetailsCard order={order} />
    </main>
  );
}
