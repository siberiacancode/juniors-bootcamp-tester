import { Button, Typography } from '@siberiacancode/uikit';
import { Link } from '@tanstack/react-router';
import { InboxIcon } from 'lucide-react';

import { IntlText } from '@/utils/lib/intl';

export const HistoryEmptyState = () => (
  <section className='flex h-63 w-full flex-col items-center gap-4 rounded-24 bg-secondary p-6'>
    <InboxIcon className='size-10 shrink-0' strokeWidth={2} />

    <div className='flex w-full max-w-70 flex-col items-start text-center'>
      <Typography as='h2' className='w-full' variant='body-lg'>
        <IntlText path='page.history.empty.title' />
      </Typography>
      <Typography as='p' className='w-full' variant='body-sm'>
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
