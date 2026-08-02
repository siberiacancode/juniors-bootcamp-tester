import { MascotWaveLargeIcon } from '@/components/icons';
import { Typography } from '@/components/ui/typography';
import { IntlText } from '@/lib';
import { cn } from '@/lib/utils';

interface CatalogSaleBannerProps {
  className?: string;
}

export const CatalogSaleBanner = ({ className }: CatalogSaleBannerProps) => (
  <div
    className={cn(
      'relative h-53.5 w-full overflow-hidden rounded-24 bg-[#7c3aed14] px-6 py-4',
      className
    )}
  >
    <Typography as='p' variant='title-md'>
      <IntlText path='page.catalog.saleBanner.title' />
    </Typography>
    <Typography as='p' variant='caption'>
      <IntlText path='page.catalog.saleBanner.subtitle' />
    </Typography>

    <div className='mt-7 inline-flex min-h-6 items-center justify-center rounded-full bg-accent-secondary px-4.5 py-3 text-[20px]/7 font-bold tracking-wide text-accent-secondary-fg'>
      <IntlText path='page.catalog.saleBanner.discount' />
    </div>

    <MascotWaveLargeIcon className='absolute top-15 right-2' />
  </div>
);
