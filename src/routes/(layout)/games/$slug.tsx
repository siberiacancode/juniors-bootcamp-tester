import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ChevronLeftIcon } from 'lucide-react';
import z from 'zod';

import { Typography } from '@/components/ui/typography';
import {
  getGamesInfoBySlugQueryOptions,
  getGamesPriceVariantsQueryOptions,
  getGamesRegionsQueryOptions
} from '@/generated/api';
import { DELIVERY_TYPES, REGIONS } from '@/helpers/constants';
import { IntlText } from '@/lib';
import { cn } from '@/lib/utils';

import {
  GameCheckout,
  GameMeta,
  GameOverview,
  GameRequirements,
  GameScreenshots,
  GameSelection
} from './-components';
import { useGamePage } from './-hooks';
import { GameLoading } from './-loading';

const GameProductPage = () => {
  const { state, features, functions, form } = useGamePage();

  return (
    <section className='flex flex-col gap-2 sm:mt-2 sm:pb-2'>
      <Link className='flex h-14 items-center gap-4' to='/'>
        <ChevronLeftIcon className='size-6' />
        <Typography
          as='p'
          className='tracking-normal'
          variant={state.isDesktop ? 'body-lg' : 'title-md'}
        >
          {state.isDesktop ? <IntlText path='page.gameProduct.backToCatalog' /> : state.game.name}
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
        <GameOverview game={state.game} />
        <GameScreenshots isDesktop={state.isDesktop} screenshots={state.game.screenshots} />
        <GameMeta items={state.metaItems} />
        <GameRequirements isDesktop={state.isDesktop} sections={state.requirementSections} />
        <GameSelection functions={functions} state={state} />
        <GameCheckout features={features} form={form} functions={functions} state={state} />
      </div>
    </section>
  );
};

const gameProductSearchSchema = z.object({
  deliveryType: z.enum(DELIVERY_TYPES).optional().catch(undefined),
  region: z.enum(REGIONS).optional().catch(undefined),
  edition: z.string().optional().catch(undefined)
});

export const Route = createFileRoute('/(layout)/games/$slug')({
  component: GameProductPage,
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps, params }) => {
    const getGameInfoBySlugResponse = await context.queryClient.ensureQueryData(
      getGamesInfoBySlugQueryOptions({
        params: {
          gcTime: Infinity,
          staleTime: 0
        },
        request: {
          path: {
            slug: params.slug
          }
        }
      })
    );

    const game = getGameInfoBySlugResponse.data.game;

    const [defaultDeliveryType] = game.deliveryTypes;
    const deliveryType =
      deps.deliveryType && game.deliveryTypes.includes(deps.deliveryType)
        ? deps.deliveryType
        : defaultDeliveryType;

    if (!deliveryType) return notFound();

    const getGamesRegionsResponse = await context.queryClient.ensureQueryData(
      getGamesRegionsQueryOptions({
        params: {
          gcTime: Infinity,
          staleTime: 0
        },
        request: {
          query: {
            slug: game.slug,
            deliveryType
          }
        }
      })
    );

    const regions = getGamesRegionsResponse.data.regions;
    const [defaultRegion] = regions;
    const region = deps.region && regions.includes(deps.region) ? deps.region : defaultRegion;

    if (!region) return notFound();

    await context.queryClient.ensureQueryData(
      getGamesPriceVariantsQueryOptions({
        params: {
          gcTime: Infinity,
          staleTime: 0
        },
        request: {
          query: {
            slug: game.slug,
            deliveryType,
            region
          }
        }
      })
    );
  },
  pendingComponent: GameLoading,
  validateSearch: gameProductSearchSchema
});
