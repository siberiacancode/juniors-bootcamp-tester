import { Link } from '@tanstack/react-router';

import { MascotDizzyIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { IntlText } from '@/lib/intl';

export const NotFound = () => (
  <section className='mx-auto flex w-full max-w-164 flex-1 flex-col items-center justify-center gap-6 py-16 text-center'>
    <div className='flex items-center justify-center gap-4'>
      <span className='text-[120px]/[120px] font-extrabold text-foreground sm:text-[164px]/[164px]'>
        4
      </span>
      <MascotDizzyIcon className='size-24 sm:size-37' />
      <span className='text-[120px]/[120px] font-extrabold text-foreground sm:text-[164px]/[164px]'>
        4
      </span>
    </div>

    <div className='flex flex-col items-center gap-2'>
      <Typography as='h1' className='text-[24px]/8 sm:text-[32px]/10' variant='title-lg'>
        <IntlText path='page.notFound.title' />
      </Typography>
      <Typography as='p' className='text-foreground' variant='body-md'>
        <IntlText path='page.notFound.description' />
      </Typography>
    </div>

    <Button asChild className='w-full max-w-88' size='lg'>
      <Link to='/'>
        <IntlText path='button.goToMain' />
      </Link>
    </Button>
  </section>
);
