import { Button, Typography } from '@siberiacancode/uikit';
import { Link } from '@tanstack/react-router';

import { MascotDizzyIcon } from '@/components/icons';
import { IntlText } from '@/utils/lib/intl';

export const NotFound = () => (
  <section className='mx-auto flex min-h-[420px] w-full max-w-[328px] flex-col items-center gap-6 pb-14 text-center'>
    <div className='flex h-24 w-full items-center justify-center gap-2'>
      <span className='flex h-24 w-[58px] items-center text-[96px]/[96px] font-extrabold text-foreground'>
        4
      </span>
      <MascotDizzyIcon className='h-24 w-[92px]' />
      <span className='flex h-24 w-[58px] items-center text-[96px]/[96px] font-extrabold text-foreground'>
        4
      </span>
    </div>

    <div className='flex w-full flex-col items-center gap-2'>
      <Typography as='h1' className='w-full' variant='title-md'>
        <IntlText path='page.notFound.title' />
      </Typography>
      <Typography as='p' className='w-full' variant='body-sm'>
        <IntlText path='page.notFound.description' />
      </Typography>
    </div>

    <Button asChild className='w-full' size='lg'>
      <Link to='/'>
        <IntlText path='button.goToMain' />
      </Link>
    </Button>
  </section>
);
