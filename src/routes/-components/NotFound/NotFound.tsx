import { Button, Typography } from '@siberiacancode/uikit';
import { Link } from '@tanstack/react-router';

import { MascotDizzyIcon } from '@/components/icons';
import { IntlText } from '@/utils/lib/intl';

export const NotFound = () => (
  <section className='mx-auto flex min-h-[420px] w-full max-w-[328px] flex-col items-center gap-6 pb-14 text-center sm:max-w-164 sm:flex-1 sm:justify-center sm:py-16'>
    <div className='flex h-24 w-full items-center justify-center gap-2 sm:h-auto sm:gap-4'>
      <span className='flex h-24 w-[58px] items-center text-[96px]/[96px] font-extrabold text-foreground sm:block sm:size-auto sm:text-[164px]/[164px]'>
        4
      </span>
      <MascotDizzyIcon className='h-24 w-[92px] sm:size-37' />
      <span className='flex h-24 w-[58px] items-center text-[96px]/[96px] font-extrabold text-foreground sm:block sm:size-auto sm:text-[164px]/[164px]'>
        4
      </span>
    </div>

    <div className='flex w-full flex-col items-center gap-2'>
      <Typography as='h1' className='w-full sm:text-[32px]/10' variant='title-md'>
        <IntlText path='page.notFound.title' />
      </Typography>
      <Typography as='p' className='w-full sm:text-[16px]/6' variant='body-sm'>
        <IntlText path='page.notFound.description' />
      </Typography>
    </div>

    <Button asChild className='w-full sm:max-w-88' size='lg'>
      <Link to='/'>
        <IntlText path='button.goToMain' />
      </Link>
    </Button>
  </section>
);
