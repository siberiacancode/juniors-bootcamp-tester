import { Button, Typography } from '@siberiacancode/uikit';
import { Link } from '@tanstack/react-router';

import { MascotSadIcon } from '@/components/icons';
import { IntlText } from '@/utils/lib/intl';

export const ErrorState = () => (
  <section className='mx-auto flex min-h-[292px] w-full max-w-[328px] flex-col items-center gap-6 pb-14 text-center sm:max-w-207 sm:flex-1 sm:justify-center sm:py-16'>
    <MascotSadIcon className='h-24 w-[92px] sm:size-37' />

    <div className='flex w-full flex-col items-center gap-2'>
      <Typography as='h1' className='w-full sm:text-[48px]/12' variant='title-md'>
        <IntlText path='page.error.title' />
      </Typography>
      <Typography as='p' className='w-full sm:text-[16px]/6' variant='body-sm'>
        <IntlText path='page.error.description' />
      </Typography>
    </div>

    <Button asChild className='w-full sm:max-w-88' size='lg'>
      <Link to='/'>
        <IntlText path='button.goToMain' />
      </Link>
    </Button>
  </section>
);
