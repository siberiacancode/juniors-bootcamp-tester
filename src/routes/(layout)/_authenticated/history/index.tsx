import { OrderHistory } from '@modules/order';
import { createFileRoute } from '@tanstack/react-router';

import { Typography } from '@/shared/components/ui/typography';

export const Route = createFileRoute('/(layout)/_authenticated/history/')({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <main className='mx-auto flex w-full max-w-5xl flex-col gap-8 lg:gap-10'>
      <div className='pb-2 sm:hidden'>
        <Typography as='h1' className='text-[24px]/[32px]' variant='heading-md'>
          История покупок
        </Typography>
      </div>
      <OrderHistory />
    </main>
  );
}
