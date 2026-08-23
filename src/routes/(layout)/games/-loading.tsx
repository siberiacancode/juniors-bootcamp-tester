import { useMediaQuery } from '@siberiacancode/reactuse';
import { Typography } from '@siberiacancode/uikit';
import { Link } from '@tanstack/react-router';
import { ChevronLeftIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/utils/lib/intl';
import { cn } from '@/utils/lib/utils';

import { GameCheckoutSkeleton, GameSelectionSkeleton } from './-components';

const META_WIDTHS = [160, 160, 160, 160];
const DESCRIPTION_WIDTHS = ['w-[328px]', 'w-[304px]', 'w-[267px]', 'w-[243px]'];
const REQUIREMENT_WIDTHS = [
  'w-[274px]',
  'w-[265px]',
  'w-[73px]',
  'w-[292px]',
  'w-20',
  'w-[311px]',
  'w-[46px]'
];
const ADDITIONAL_WIDTHS = ['w-[314px]', 'w-[287px]', 'w-[262px]', 'w-[234px]'];

const REQUIREMENT_LABELS = [
  'page.gameProduct.requirement.os',
  'page.gameProduct.requirement.processor',
  'page.gameProduct.requirement.memory',
  'page.gameProduct.requirement.graphics',
  'page.gameProduct.requirement.directx',
  'page.gameProduct.requirement.network',
  'page.gameProduct.requirement.storage'
] as const;

const GameDetailsSkeleton = () => (
  <div className='contents lg:flex lg:flex-col lg:gap-4 lg:[grid-area:details]'>
    <section className='flex flex-col gap-3 [grid-area:overview] lg:gap-4'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='aspect-418/192 w-full rounded-24' />
        <Skeleton className='hidden h-[18px] w-[306px] max-w-full rounded-24 bg-muted-fg/30 lg:block' />
        <div className='flex max-w-full gap-2 overflow-hidden lg:flex-wrap'>
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className='h-8 w-[102px] shrink-0 rounded-full bg-background' />
          ))}
        </div>
      </div>
      <div className='mb-6 flex min-h-[120px] flex-col justify-between sm:mb-0'>
        {DESCRIPTION_WIDTHS.map((width) => (
          <Skeleton
            key={width}
            className={cn('h-[18px] max-w-full rounded-24 bg-muted-fg/20', width)}
          />
        ))}
      </div>
    </section>

    <section className='mb-6 flex min-h-[231px] flex-col justify-between rounded-24 bg-secondary p-6 [grid-area:meta] sm:mb-0'>
      {META_WIDTHS.map((width, index) => (
        <Skeleton key={index} className='h-[18px] rounded-24 bg-muted-fg/20' style={{ width }} />
      ))}
    </section>
  </div>
);

const GameScreenshotsSkeleton = () => (
  <section className='mb-6 flex min-w-0 flex-col gap-3 [grid-area:screenshots] sm:mb-0'>
    <Typography className='md:text-[24px]/8 md:font-bold md:tracking-wide' variant='body-md'>
      <IntlText path='page.gameProduct.screenshots' />
    </Typography>
    <div className='flex max-w-full gap-2 overflow-hidden pb-10'>
      {Array.from({ length: 5 }, (_, index) => (
        <Skeleton
          key={index}
          className='h-[158px] w-[min(82vw,24rem)] shrink-0 rounded-24 sm:w-68'
        />
      ))}
    </div>
  </section>
);

const GameRequirementsSkeleton = () => (
  <section className='mb-6 flex flex-col gap-3 [grid-area:requirements] sm:mb-0'>
    <Typography className='md:text-[24px]/8 md:font-bold md:tracking-wide' variant='body-md'>
      <IntlText path='page.gameProduct.systemRequirements' />
    </Typography>
    <div className='grid gap-3 lg:grid-cols-2'>
      {Array.from({ length: 2 }, (_, section) => (
        <div key={section} className={cn('flex flex-col gap-2', section === 1 && 'hidden lg:flex')}>
          <Typography as='h3' className='pb-2 font-medium' variant='title-md'>
            <IntlText
              path={
                section === 0
                  ? 'page.gameProduct.minimumRequirements'
                  : 'page.gameProduct.recommendedRequirements'
              }
            />
          </Typography>

          {REQUIREMENT_LABELS.map((label, index) => (
            <div key={label} className='flex flex-col'>
              <Typography as='span' className='text-muted-fg' variant='caption'>
                <IntlText path={label as MessagePath} />:
              </Typography>
              <Skeleton
                className={cn(
                  'h-[18px] max-w-full rounded-24 bg-muted-fg/20',
                  REQUIREMENT_WIDTHS[index]
                )}
              />
            </div>
          ))}

          <div className='flex flex-col'>
            <Typography as='span' className='text-muted-fg' variant='caption'>
              <IntlText path='page.gameProduct.additionalRequirements' />:
            </Typography>
            <div className='flex flex-col gap-2'>
              {ADDITIONAL_WIDTHS.map((width) => (
                <Skeleton
                  key={width}
                  className={cn('h-[18px] max-w-full rounded-24 bg-muted-fg/20', width)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const GameLoading = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <section className='flex min-w-0 flex-col gap-2 sm:mt-2 sm:pb-2'>
      <Link className='flex h-14 items-center gap-4' to='/'>
        <ChevronLeftIcon className='size-6' />
        <Typography as='p' className='tracking-normal' variant={isDesktop ? 'body-lg' : 'title-md'}>
          <IntlText path='button.backToCatalog' />
        </Typography>
      </Link>

      <div
        className={cn(
          'min-w-0 sm:grid sm:gap-6',
          '[grid-template-areas:"overview"_"screenshots"_"meta"_"requirements"_"selection"_"checkout"]',
          'lg:grid-cols-[minmax(0,1fr)_minmax(0,418px)_minmax(0,372px)]',
          'lg:[grid-template-areas:"details_selection_checkout"_"screenshots_screenshots_screenshots"_"requirements_requirements_requirements"]'
        )}
      >
        <GameDetailsSkeleton />
        <GameScreenshotsSkeleton />
        <GameRequirementsSkeleton />
        <GameSelectionSkeleton />
        <GameCheckoutSkeleton />
      </div>
    </section>
  );
};
