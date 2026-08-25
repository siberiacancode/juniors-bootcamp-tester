import { Typography } from '@siberiacancode/uikit';

import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/utils/lib';

const REGION_WIDTHS = [95, 96, 117, 82, 97, 111, 102, 105, 77];

export const GameSelectionSkeleton = () => (
  <section className='flex flex-col gap-4 [grid-area:selection]'>
    <div className='flex flex-col gap-3'>
      <Typography className='md:text-[24px]/8 md:font-bold md:tracking-wide' variant='body-md'>
        <IntlText path='page.gameProduct.deliveryTypeTitle' />
      </Typography>
      <div className='flex flex-col gap-2'>
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className='flex h-[78px] items-center gap-2 rounded-24 bg-secondary p-4'>
            <div className='size-8 shrink-0 rounded-full border border-ring' />
            <div className='flex flex-1 flex-col gap-2.5'>
              <Skeleton className='h-[18px] w-[157px] rounded-24 bg-muted-fg/30' />
              <Skeleton className='h-[11px] w-[74px] rounded-24 bg-muted-fg/15' />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className='flex flex-col gap-3'>
      <Typography className='md:text-[24px]/8 md:font-bold md:tracking-wide' variant='body-md'>
        <IntlText path='page.gameProduct.regionTitle' values={{ platform: 'Steam' }} />
      </Typography>
      <div className='flex flex-wrap gap-2'>
        {REGION_WIDTHS.map((width) => (
          <Skeleton
            key={width}
            className='h-10 shrink-0 rounded-full bg-secondary'
            style={{ width }}
          />
        ))}
      </div>
    </div>

    <div className='flex flex-col gap-3'>
      <Typography className='md:text-[24px]/8 md:font-bold md:tracking-wide' variant='body-md'>
        <IntlText path='page.gameProduct.editionTitle' />
      </Typography>
      <div className='flex items-center gap-2'>
        <Skeleton className='h-[18px] min-w-0 flex-1 rounded-24 bg-muted-fg/20' />
        <Skeleton className='h-[18px] w-[58px] shrink-0 rounded-24 bg-muted-fg/20' />
      </div>
    </div>
  </section>
);
