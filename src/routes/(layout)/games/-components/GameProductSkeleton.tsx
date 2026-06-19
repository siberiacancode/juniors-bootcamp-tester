import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/lib';
import { cn } from '@/lib/utils';

export const GameProductSkeleton = () => {
  const regionPills = ['w-24', 'w-24', 'w-28', 'w-20', 'w-24', 'w-28', 'w-26', 'w-22'];
  const metaRows = [
    { labelPath: 'page.gameProduct.meta.releaseDate', width: 'w-24' },
    { labelPath: 'page.gameProduct.meta.developer', width: 'w-48' },
    { labelPath: 'page.gameProduct.meta.publisher', width: 'w-44' },
    { labelPath: 'page.gameProduct.meta.steamId', width: 'w-18' }
  ];
  const requirementRows = [
    { labelPath: 'page.gameProduct.requirement.os', width: 'w-3/4' },
    { labelPath: 'page.gameProduct.requirement.processor', width: 'w-2/3' },
    { labelPath: 'page.gameProduct.requirement.memory', width: 'w-18' },
    { labelPath: 'page.gameProduct.requirement.graphics', width: 'w-5/6' },
    { labelPath: 'page.gameProduct.requirement.directx', width: 'w-18' },
    { labelPath: 'page.gameProduct.requirement.network', width: 'w-11/12' },
    { labelPath: 'page.gameProduct.requirement.storage', width: 'w-16' }
  ];
  const additionalRequirementLines = ['w-11/12', 'w-5/6', 'w-3/4', 'w-2/3'];

  return (
    <section className='mt-2 flex flex-col gap-2 sm:pb-2'>
      <div className='flex h-14 items-center gap-4'>
        <Skeleton className='size-6 bg-transparent' />
        <Skeleton className='h-6 w-40 rounded-24 bg-muted-fg/30' />
      </div>

      <div
        className={cn(
          'sm:grid sm:gap-6',
          '[grid-template-areas:"overview"_"screenshots"_"meta"_"requirements"_"selection"_"checkout"]',
          'lg:grid-cols-[minmax(0,1fr)_minmax(0,418px)_minmax(0,372px)]',
          'lg:gap-6',
          'lg:[grid-template-areas:"overview_selection_checkout"_"meta_selection_checkout"_"screenshots_screenshots_screenshots"_"requirements_requirements_requirements"]'
        )}
      >
        <section className='flex flex-col gap-3 [grid-area:overview] lg:gap-4'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='aspect-460/215 w-full rounded-24' />
            <Skeleton className='hidden h-6 w-3/4 rounded-24 bg-muted-fg/30 lg:block' />

            <div className='flex max-w-full scrollbar-none gap-2 overflow-x-auto lg:flex-wrap lg:overflow-visible'>
              <Skeleton className='h-8 w-24 shrink-0 rounded-full bg-background ring-1 ring-ring' />
              <Skeleton className='h-8 w-28 shrink-0 rounded-full bg-background ring-1 ring-ring' />
              <Skeleton className='h-8 w-24 shrink-0 rounded-full bg-background ring-1 ring-ring' />
              <Skeleton className='h-8 w-20 shrink-0 rounded-full bg-background ring-1 ring-ring' />
            </div>
          </div>

          <div className='mb-6 flex flex-col gap-2 sm:mb-0'>
            <Skeleton className='h-4 w-full rounded-24 bg-secondary' />
            <Skeleton className='h-4 w-11/12 rounded-24 bg-secondary' />
            <Skeleton className='h-4 w-4/5 rounded-24 bg-secondary' />
            <Skeleton className='h-4 w-2/3 rounded-24 bg-secondary' />
          </div>
        </section>

        <section className='mb-6 flex flex-col gap-3 [grid-area:screenshots] sm:mb-0'>
          <h2 className='text-[16px]/6 font-medium tracking-wide lg:text-[24px]/8 lg:font-bold'>
            <IntlText path='page.gameProduct.screenshots' />
          </h2>

          <div className='flex max-w-full scrollbar-none gap-2 overflow-x-auto'>
            {[0, 1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className='h-44 w-80 shrink-0 rounded-24 lg:h-45 lg:w-68' />
            ))}
          </div>
        </section>

        <section className='mb-6 flex flex-col gap-2 [grid-area:meta] sm:mb-0 sm:rounded-24 sm:bg-secondary sm:p-6'>
          {metaRows.map((row) => (
            <div key={row.labelPath} className='flex flex-col'>
              <span className='text-[12px]/4 font-medium tracking-wide text-muted-fg'>
                <IntlText path={row.labelPath as MessagePath} />
              </span>
              <Skeleton
                className={cn('h-4 rounded-24 bg-secondary sm:bg-background/60', row.width)}
              />
            </div>
          ))}
        </section>

        <section className='mb-6 flex flex-col gap-3 [grid-area:requirements] sm:mb-0'>
          <h2 className='text-[16px]/6 font-medium tracking-wide lg:text-[24px]/8 lg:font-bold'>
            <IntlText path='page.gameProduct.systemRequirements' />
          </h2>

          <div className='flex w-fit rounded-full bg-secondary p-1 lg:hidden'>
            <span className='rounded-full bg-background px-4 py-2 text-[14px]/5 font-bold tracking-wide'>
              <IntlText path='page.gameProduct.minimumRequirements' />
            </span>
            <span className='rounded-full px-4 py-2 text-[14px]/5 font-bold tracking-wide'>
              <IntlText path='page.gameProduct.recommendedRequirements' />
            </span>
          </div>

          <div className='lg:grid lg:grid-cols-2 lg:gap-16'>
            <div className='flex flex-col gap-2'>
              <h3 className='hidden text-[24px]/8 font-medium tracking-wide lg:block'>
                <IntlText path='page.gameProduct.minimumRequirements' />
              </h3>

              <div className='flex flex-col gap-2'>
                {requirementRows.map((row) => (
                  <div key={row.labelPath} className='flex flex-col'>
                    <span className='text-[12px]/4 font-medium tracking-wide text-muted-fg'>
                      <IntlText path={row.labelPath as MessagePath} />:
                    </span>
                    <Skeleton className={cn('h-4 rounded-24 bg-secondary', row.width)} />
                  </div>
                ))}

                <div className='flex flex-col'>
                  <span className='text-[12px]/4 font-medium tracking-wide text-muted-fg'>
                    <IntlText path='page.gameProduct.additionalRequirements' />:
                  </span>
                  <div className='mt-1 flex flex-col gap-2'>
                    {additionalRequirementLines.map((width) => (
                      <Skeleton key={width} className={cn('h-4 rounded-24 bg-secondary', width)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className='hidden flex-col gap-2 lg:flex'>
              <h3 className='text-[24px]/8 font-medium tracking-wide'>
                <IntlText path='page.gameProduct.recommendedRequirements' />
              </h3>

              <div className='flex flex-col gap-2'>
                {requirementRows.map((row) => (
                  <div key={row.labelPath} className='flex flex-col'>
                    <span className='text-[12px]/4 font-medium tracking-wide text-muted-fg'>
                      <IntlText path={row.labelPath as MessagePath} />:
                    </span>
                    <Skeleton className={cn('h-4 rounded-24 bg-secondary', row.width)} />
                  </div>
                ))}

                <div className='flex flex-col'>
                  <span className='text-[12px]/4 font-medium tracking-wide text-muted-fg'>
                    <IntlText path='page.gameProduct.additionalRequirements' />:
                  </span>
                  <div className='mt-1 flex flex-col gap-2'>
                    {additionalRequirementLines.map((width) => (
                      <Skeleton key={width} className={cn('h-4 rounded-24 bg-secondary', width)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='flex flex-col gap-6 [grid-area:selection] lg:gap-4'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-[16px]/6 font-medium tracking-wide lg:text-[24px]/8 lg:font-bold'>
              <IntlText path='page.gameProduct.deliveryTypeTitle' />
            </h2>

            <div className='flex flex-col gap-2'>
              {[0, 1, 2, 3].map((card) => (
                <div
                  key={card}
                  className='flex w-full items-center gap-2 rounded-24 bg-secondary p-4'
                >
                  <div className='size-8 shrink-0 rounded-full border border-muted-fg' />
                  <div className='flex flex-1 flex-col gap-2'>
                    <Skeleton className='h-4 w-40 rounded-24 bg-muted-fg/30' />
                    <Skeleton className='h-3 w-20 rounded-24 bg-secondary' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <h2 className='text-[16px]/6 font-medium tracking-wide lg:text-[24px]/8 lg:font-bold'>
              <IntlText path='page.gameProduct.regionTitle' values={{ platform: 'Steam' }} />
            </h2>

            <div className='flex flex-wrap gap-2'>
              {regionPills.map((width, index) => (
                <Skeleton key={`${width}-${index}`} className={cn('h-10 rounded-full', width)} />
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <h2 className='text-[16px]/6 font-medium tracking-wide lg:text-[24px]/8 lg:font-bold'>
              <IntlText path='page.gameProduct.editionTitle' />
            </h2>

            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 flex-1 rounded-24 bg-secondary' />
              <Skeleton className='h-4 w-14 rounded-24 bg-secondary' />
            </div>
          </div>
        </section>

        <section className='mt-6 bg-secondary p-6 [grid-area:checkout] lg:mt-0'>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-3'>
              <Skeleton className='size-14 shrink-0 rounded-8 bg-muted-fg/30' />
              <div className='flex flex-1 flex-col gap-2 pt-1'>
                <Skeleton className='h-4 w-4/5 rounded-24 bg-muted-fg/30' />
                <Skeleton className='h-4 w-2/3 rounded-24 bg-secondary' />
              </div>
            </div>

            <Skeleton className='h-10 w-full rounded-full bg-background' />

            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <span className='text-[14px]/[22px] font-medium'>
                  <IntlText path='field.product.email.label' />
                </span>
                <Skeleton className='h-10 w-full rounded-full bg-background ring-1 ring-ring' />
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-[14px]/[22px] font-medium'>
                  <IntlText path='field.product.phone.label' />
                </span>
                <Skeleton className='h-10 w-full rounded-full bg-background ring-1 ring-ring' />
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <p className='text-[16px]/6 font-medium tracking-wide'>
                <IntlText path='page.gameProduct.paymentMethodTitle' />
              </p>
              <div className='grid grid-cols-2 gap-2'>
                {[0, 1].map((method) => (
                  <div
                    key={method}
                    className='flex min-h-20 flex-col gap-2 rounded-16 bg-background p-4'
                  >
                    <Skeleton className='h-5 w-12 rounded-24 bg-muted-fg/40' />
                    <Skeleton className='h-3 w-16 rounded-24 bg-secondary' />
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-2 rounded-16 bg-background p-3'>
              <Skeleton className='h-4 w-full rounded-24 bg-secondary' />
              <Skeleton className='h-4 w-4/5 rounded-24 bg-secondary' />
            </div>

            <div className='rounded-16 bg-background p-3'>
              <div className='flex items-center justify-between gap-4'>
                <span className='text-[14px]/[22px] font-medium'>
                  <IntlText path='page.gameProduct.totalLabel' />
                </span>
                <Skeleton className='h-4 w-24 rounded-24 bg-muted-fg/40' />
              </div>
            </div>

            <Skeleton className='h-13 w-full rounded-full bg-muted-fg/40' />
          </div>
        </section>
      </div>
    </section>
  );
};
