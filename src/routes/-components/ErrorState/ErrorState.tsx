import { Button, Typography } from '@siberiacancode/uikit';
import { Link } from '@tanstack/react-router';

import { MascotSadIcon } from '@/components/icons';
import { IntlText } from '@/utils/lib/intl';

export const ErrorState = () => (
  <section className='mx-auto flex w-full max-w-207 flex-1 flex-col items-center justify-center gap-6 py-16 text-center'>
    <MascotSadIcon className='size-37' />

    <div className='flex flex-col items-center gap-2'>
      <Typography
        as='h1'
        className='text-[32px]/10 tracking-tight sm:text-[48px]/12'
        variant='title-lg'
      >
        <IntlText path='page.error.title' />
      </Typography>
      <Typography as='p' className='text-foreground' variant='body-md'>
        <IntlText path='page.error.description' />
      </Typography>
    </div>

    <Button asChild className='w-full max-w-88' size='lg'>
      <Link to='/'>
        <IntlText path='button.goToMain' />
      </Link>
    </Button>
  </section>
);
