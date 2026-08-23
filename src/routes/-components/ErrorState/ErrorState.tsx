import { Button, Typography } from '@siberiacancode/uikit';
import { Link } from '@tanstack/react-router';

import { MascotSadIcon } from '@/components/icons';
import { IntlText } from '@/utils/lib/intl';

export const ErrorState = () => (
  <section className='mx-auto flex min-h-[292px] w-full max-w-[328px] flex-col items-center gap-6 pb-14 text-center'>
    <MascotSadIcon className='h-24 w-[92px]' />

    <div className='flex w-full flex-col items-center gap-2'>
      <Typography as='h1' className='w-full' variant='title-md'>
        <IntlText path='page.error.title' />
      </Typography>
      <Typography as='p' className='w-full' variant='body-sm'>
        <IntlText path='page.error.description' />
      </Typography>
    </div>

    <Button asChild className='w-full' size='lg'>
      <Link to='/'>
        <IntlText path='button.goToMain' />
      </Link>
    </Button>
  </section>
);
