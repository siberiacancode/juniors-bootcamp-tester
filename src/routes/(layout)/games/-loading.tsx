import { useMediaQuery } from '@siberiacancode/reactuse';
import { Button, Typography } from '@siberiacancode/uikit';
import { Link } from '@tanstack/react-router';
import { ChevronLeftIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/utils/lib/intl';
import { cn } from '@/utils/lib/utils';

export const GameLoading = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const metaRows = [
    { label: 'page.gameProduct.meta.releaseDate', width: 'w-40' },
    { label: 'page.gameProduct.meta.developer', width: 'w-40' },
    { label: 'page.gameProduct.meta.publisher', width: 'w-40' },
    { label: 'page.gameProduct.meta.steamId', width: 'w-40' }
  ];

  const requirementRows = [
    { label: 'page.gameProduct.requirement.os', width: 'w-3/8' },
    { label: 'page.gameProduct.requirement.processor', width: 'w-1/3' },
    { label: 'page.gameProduct.requirement.memory', width: 'w-9' },
    { label: 'page.gameProduct.requirement.graphics', width: 'w-5/12' },
    { label: 'page.gameProduct.requirement.directx', width: 'w-9' },
    { label: 'page.gameProduct.requirement.network', width: 'w-11/24' },
    { label: 'page.gameProduct.requirement.storage', width: 'w-8' }
  ];

  return (
    <section className='flex min-w-0 flex-col gap-2 sm:mt-2 sm:pb-2'>
      <Link className='flex h-14 items-center gap-4' to='/'>
        <ChevronLeftIcon className='size-6' />
        <Typography as='p' className='tracking-normal' variant={isDesktop ? 'body-lg' : 'title-md'}>
          <IntlText path='page.gameProduct.backToCatalog' />
        </Typography>
      </Link>

      <div
        className={cn(
          'min-w-0 sm:grid sm:gap-6',
          '[grid-template-areas:"overview"_"screenshots"_"meta"_"requirements"_"selection"_"checkout"]',
          'lg:grid-cols-[minmax(0,1fr)_minmax(0,418px)_minmax(0,372px)]',
          'lg:gap-6',
          'lg:[grid-template-areas:"overview_selection_checkout"_"meta_selection_checkout"_"screenshots_screenshots_screenshots"_"requirements_requirements_requirements"]'
        )}
      >
        <section className='flex flex-col gap-3 [grid-area:overview] lg:gap-4'>
          <Skeleton className='aspect-460/215 w-full rounded-24' />
          <Skeleton className='hidden h-6 w-3/4 rounded-24 bg-muted-fg/30 lg:block' />
          <div className='flex max-w-full gap-2 overflow-hidden lg:flex-wrap'>
            {Array.from({ length: 4 }, (_, badge) => (
              <Skeleton key={badge} className='h-8 w-26 shrink-0 rounded-full bg-background' />
            ))}
          </div>
          <div className='mb-6 flex flex-col gap-4 sm:mb-0'>
            {['w-7/9', 'w-5/7', 'w-3/5', 'w-3/6'].map((width) => (
              <Skeleton key={width} className={cn('h-4 rounded-24 bg-muted-fg/20', width)} />
            ))}
          </div>
        </section>

        <section className='mb-6 flex min-w-0 flex-col gap-3 [grid-area:screenshots] sm:mb-0'>
          <Typography variant={isDesktop ? 'title-md' : 'body-md'}>
            <IntlText path='page.gameProduct.screenshots' />
          </Typography>
          <div className='flex max-w-full gap-2 overflow-hidden pb-10'>
            {Array.from({ length: 5 }, (_, screenshot) => (
              <Skeleton
                key={screenshot}
                className='aspect-68/39 w-[min(82vw,24rem)] shrink-0 rounded-24 lg:w-68'
              />
            ))}
          </div>
        </section>

        <section className='mb-6 flex h-fit flex-col gap-4 [grid-area:meta] sm:mb-0 sm:gap-10 sm:rounded-24 sm:bg-secondary sm:p-6'>
          {metaRows.map((row) => (
            <div key={row.label} className='flex flex-col'>
              <Typography as='span' className='text-muted-fg' variant='caption'>
                <IntlText path={row.label as MessagePath} />
              </Typography>
              <Skeleton
                className={cn('h-4 rounded-24 bg-secondary sm:bg-muted-fg/30', row.width)}
              />
            </div>
          ))}
        </section>

        <section className='mb-6 flex flex-col gap-3 [grid-area:requirements] sm:mb-0'>
          <Typography variant={isDesktop ? 'title-md' : 'body-md'}>
            <IntlText path='page.gameProduct.systemRequirements' />
          </Typography>
          <div className='grid gap-4 lg:grid-cols-2'>
            {Array.from({ length: 2 }, (_, section) => (
              <div
                key={section}
                className={cn('flex flex-col gap-2', section === 1 && 'hidden lg:flex')}
              >
                <Typography as='h3' className='font-medium' variant='title-md'>
                  <IntlText
                    path={
                      section === 0
                        ? 'page.gameProduct.minimumRequirements'
                        : 'page.gameProduct.recommendedRequirements'
                    }
                  />
                </Typography>

                {requirementRows.map((row) => (
                  <div key={row.label} className='flex flex-col gap-1'>
                    <Typography as='span' className='text-muted-fg' variant='caption'>
                      <IntlText path={row.label as MessagePath} />:
                    </Typography>
                    <Skeleton className={cn('h-4 rounded-24 bg-muted-fg/20', row.width)} />
                  </div>
                ))}

                <div className='flex flex-col gap-1'>
                  <Typography as='span' className='text-muted-fg' variant='caption'>
                    <IntlText path='page.gameProduct.additionalRequirements' />:
                  </Typography>
                  <div className='flex flex-col gap-2'>
                    {['w-11/24', 'w-5/12', 'w-3/8', 'w-1/3'].map((width) => (
                      <Skeleton
                        key={width}
                        className={cn('h-4 rounded-24 bg-muted-fg/20', width)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='flex flex-col gap-6 [grid-area:selection] lg:gap-4'>
          {Array.from({ length: 3 }, (_, group) => (
            <div key={group} className='flex flex-col gap-3'>
              <Skeleton className='h-6 w-48 rounded-24 bg-muted-fg/30' />
              <div className='flex flex-col gap-2'>
                {Array.from({ length: group === 0 ? 3 : 2 }, (_, item) => (
                  <Skeleton key={item} className='h-16 w-full rounded-24 bg-secondary' />
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className='mt-6 rounded-24 bg-secondary p-6 [grid-area:checkout] lg:mt-0'>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-3'>
              <Skeleton className='size-14 shrink-0 rounded-8 bg-muted-fg/30' />
              <div className='flex flex-1 flex-col gap-3'>
                <Skeleton className='h-4 w-4/5 rounded-24 bg-muted-fg/30' />
                <Skeleton className='h-3 w-2/3 rounded-24 bg-muted-fg/10' />
              </div>
            </div>

            {Array.from({ length: 3 }, (_, field) => (
              <Skeleton key={field} className='h-10 w-full rounded-full bg-background' />
            ))}

            <div className='grid grid-cols-2 gap-2'>
              {Array.from({ length: 2 }, (_, method) => (
                <Skeleton key={method} className='min-h-20 rounded-16 bg-background' />
              ))}
            </div>

            <Skeleton className='h-13 w-full rounded-full bg-primary/20' />

            <Button disabled className='w-full' size='lg' type='button'>
              <IntlText path='button.pay' />
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
};
