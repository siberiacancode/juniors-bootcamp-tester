import { useMediaQuery } from '@siberiacancode/reactuse';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeftIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Typography } from '@/components/ui/typography';
import {
  getGamesEditionsSuspenseQueryOptions,
  getGamesInfoBySlugSuspenseQueryOptions,
  getGamesRegionsSuspenseQueryOptions
} from '@/generated/api';
import { getGameImageSrc } from '@/helpers/utils/games';
import { intl, IntlText } from '@/lib';
import { cn } from '@/lib/utils';

import { GameProductSkeleton, ProductOrderPanel } from './-components';
import { gameProductSearchSchema } from './-constants';
import { getRequirementRows, getRequirementSections, productMetaItems } from './-helpers';

const GameProductPage = () => {
  // eslint-disable-next-line ts/no-use-before-define
  const params = Route.useParams();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const getGameInfoBySlugQuery = useSuspenseQuery(
    getGamesInfoBySlugSuspenseQueryOptions({
      request: {
        path: {
          slug: params.slug
        }
      }
    })
  );
  const game = getGameInfoBySlugQuery.data.data.game;

  return (
    <section className='mt-2 flex flex-col gap-2 sm:pb-2'>
      <Link className='flex h-14 items-center gap-4' to='/'>
        <ChevronLeftIcon className='size-6' />
        <Typography as='p' className='tracking-normal' variant={isDesktop ? 'body-lg' : 'title-md'}>
          {isDesktop ? <IntlText path='page.gameProduct.backToCatalog' /> : game.name}
        </Typography>
      </Link>

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
            <div className='aspect-460/215 w-full overflow-hidden rounded-24 bg-secondary'>
              <img
                alt={game.name}
                className='block size-full object-cover object-center'
                src={getGameImageSrc(game.image)}
              />
            </div>
            <Typography as='h1' className='hidden lg:block' variant='title-lg'>
              {game.name}
            </Typography>
            <div className='flex max-w-full scrollbar-none gap-2 overflow-x-auto lg:flex-wrap lg:overflow-visible'>
              {game.genres.map((genre) => (
                <Badge key={genre} className='px-4 py-2 text-[12px]/4 font-bold tracking-wide'>
                  <IntlText path={`genre.${genre}`} />
                </Badge>
              ))}
            </div>
          </div>
          <Typography as='p' className='mb-6 tracking-normal sm:mb-0' variant='body-sm'>
            {game.description}
          </Typography>
        </section>

        <section className='mb-6 flex flex-col gap-3 [grid-area:screenshots] sm:mb-0'>
          <Typography variant={isDesktop ? 'title-md' : 'body-md'}>
            <IntlText path='page.gameProduct.screenshots' />
          </Typography>
          <Carousel
            opts={{
              align: 'start',
              dragFree: true
            }}
            className='pb-10'
          >
            <CarouselContent className='-ml-2'>
              {game.screenshots.map((screenshot) => (
                <CarouselItem key={screenshot} className='basis-auto pl-2'>
                  <div className='aspect-68/32 w-50 overflow-hidden rounded-24 bg-secondary sm:w-68'>
                    <img
                      alt={intl.formatMessage({
                        id: 'page.gameProduct.screenshotAlt'
                      })}
                      className='block size-full object-cover'
                      src={getGameImageSrc(screenshot)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className='top-auto bottom-0 left-0 size-8 translate-y-0 rounded-full'
              variant='ghost'
            />
            <CarouselNext
              className='top-auto right-0 bottom-0 size-8 translate-y-0 rounded-full'
              variant='ghost'
            />
          </Carousel>
        </section>

        <section className='mb-6 flex h-fit flex-col gap-2 border-none p-0 [grid-area:meta] sm:-mt-10 sm:mb-0 sm:rounded-24 sm:bg-secondary sm:p-6'>
          {productMetaItems(game).map((item) => (
            <div key={item.label} className='flex flex-col'>
              <Typography as='span' className='text-muted-fg' variant='caption'>
                {item.label}
              </Typography>
              <Typography as='span' variant='body-sm'>
                {item.value}
              </Typography>
            </div>
          ))}
        </section>

        <section className='mb-6 flex flex-col gap-3 [grid-area:requirements] sm:mb-0'>
          <Typography variant={isDesktop ? 'title-md' : 'body-md'}>
            <IntlText path='page.gameProduct.systemRequirements' />
          </Typography>
          {isDesktop ? (
            <div className='grid gap-4 lg:grid-cols-2'>
              {getRequirementSections(game).map((section) => (
                <div key={section.key} className='flex flex-col gap-2'>
                  <Typography as='h3' className='font-medium' variant='title-md'>
                    {section.title}
                  </Typography>
                  {getRequirementRows(section.requirements).map(
                    (row) =>
                      row.value && (
                        <div key={row.label} className='flex flex-col'>
                          <Typography as='span' className='text-muted-fg' variant='caption'>
                            {`${row.label}:`}
                          </Typography>
                          <Typography as='span' variant='body-sm'>
                            {row.value}
                          </Typography>
                        </div>
                      )
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Tabs defaultValue='minimum'>
              <TabsList className='w-full'>
                {getRequirementSections(game).map((section) => (
                  <TabsTrigger key={section.key} value={section.key}>
                    {section.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {getRequirementSections(game).map((section) => (
                <TabsContent key={section.key} value={section.key}>
                  <div className='flex flex-col gap-2'>
                    {getRequirementRows(section.requirements).map(
                      (row) =>
                        row.value && (
                          <div key={row.label} className='flex flex-col'>
                            <Typography as='span' className='text-muted-fg' variant='caption'>
                              {`${row.label}:`}
                            </Typography>
                            <Typography as='span' variant='body-sm'>
                              {row.value}
                            </Typography>
                          </div>
                        )
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </section>

        <ProductOrderPanel game={game} />
      </div>
    </section>
  );
};

export const Route = createFileRoute('/(layout)/games/$slug')({
  component: GameProductPage,
  pendingComponent: GameProductSkeleton,
  validateSearch: gameProductSearchSchema,
  loaderDeps: ({ search }) => ({
    deliveryType: search.deliveryType,
    region: search.region,
    edition: search.edition
  }),
  loader: {
    staleReloadMode: 'background',
    handler: async ({ context, deps, params }) => {
      const gameInfoResponse = await context.queryClient.ensureQueryData(
        getGamesInfoBySlugSuspenseQueryOptions({
          request: {
            path: { slug: params.slug }
          }
        })
      );
      const game = gameInfoResponse.data.game;
      const defaultDeliveryType = game.deliveryTypes[0];

      const selectedDeliveryType =
        deps.deliveryType && game.deliveryTypes.includes(deps.deliveryType)
          ? deps.deliveryType
          : defaultDeliveryType;

      const regionsResponse = await context.queryClient.ensureQueryData(
        getGamesRegionsSuspenseQueryOptions({
          request: {
            query: {
              slug: params.slug,
              deliveryType: selectedDeliveryType
            }
          }
        })
      );

      const regions = regionsResponse.data.regions;
      const defaultRegion = regions[0];

      const selectedRegion =
        deps.region && regions.includes(deps.region) ? deps.region : defaultRegion;

      const gamesEditionsResponse = await context.queryClient.ensureQueryData(
        getGamesEditionsSuspenseQueryOptions({
          request: {
            query: {
              slug: params.slug,
              deliveryType: selectedDeliveryType,
              region: selectedRegion
            }
          }
        })
      );

      const editions = gamesEditionsResponse.data.editions.flat();
      const defaultEdition = editions[0];

      const selectedEdition =
        deps.edition && editions.includes(deps.edition) ? deps.edition : defaultEdition;

      return {
        editions,
        selectedDeliveryType,
        selectedEdition,
        selectedRegion
      };
    }
  }
});
