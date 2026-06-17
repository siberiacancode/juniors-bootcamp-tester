import { Link } from '@tanstack/react-router';
import { InboxIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { IntlText } from '@/lib/intl';

export const HistoryEmptyState = () => (
  <section className='flex h-[252px] w-full flex-col items-center gap-4 rounded-24 bg-secondary p-6'>
    <InboxIcon className='size-10 shrink-0' strokeWidth={2} />

    <div className='flex w-full max-w-70 flex-col items-start text-center'>
      <Typography as='h2' className='w-full text-[24px]/8 font-medium' variant='body-lg'>
        <IntlText path='page.history.empty.title' />
      </Typography>
      <Typography as='p' className='w-full text-[16px]/6 font-medium' variant='body-sm'>
        <IntlText path='page.history.empty.description' />
      </Typography>
    </div>

    <Button asChild className='w-full' size='lg'>
      <Link to='/'>
        <IntlText path='button.backToGamesCatalog' />
      </Link>
    </Button>
  </section>
);
