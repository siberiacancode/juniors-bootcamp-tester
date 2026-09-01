import { Typography } from '@siberiacancode/uikit';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ChevronLeftIcon } from 'lucide-react';
import z from 'zod';

import {
  GameDeliveryType,
  GameRegion,
  getGamesInfoBySlugQueryOptions,
  getGamesPriceVariantsQueryOptions,
  getGamesRegionsQueryOptions
} from '@/generated/api';
import { IntlText } from '@/utils/lib';
import { cn } from '@/utils/lib/utils';

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
          {state.isDesktop ? <IntlText path='button.backToCatalog' /> : state.game.name}
        </Typography>
      </Link>

      <div
        className={cn(
          'sm:grid sm:gap-6',
          '[grid-template-areas:"overview"_"screenshots"_"meta"_"requirements"_"selection"_"checkout"]',
          'lg:grid-cols-[minmax(0,1fr)_minmax(0,418px)_minmax(0,372px)]',
          'lg:[grid-template-areas:"details_selection_checkout"_"screenshots_screenshots_screenshots"_"requirements_requirements_requirements"]'
        )}
      >
        <div className='contents lg:flex lg:flex-col lg:gap-4 lg:[grid-area:details]'>
          <GameOverview game={state.game} />
          <GameMeta items={state.metaItems} />
        </div>
        <GameScreenshots screenshots={state.game.screenshots} />
        <GameRequirements sections={state.requirementSections} />
        <GameSelection
          deliveryTypes={state.game.deliveryTypes}
          editions={state.editions}
          isPending={state.isSelectionPending}
          regions={state.regions}
          selectedDeliveryType={state.selectedDeliveryType}
          selectedEdition={state.selectedPriceVariant.edition}
          selectedRegion={state.selectedRegion}
          onDeliveryTypeChange={functions.onDeliveryTypeChange}
          onEditionChange={functions.onEditionChange}
          onRegionChange={functions.onRegionChange}
        />
        <GameCheckout
          control={form.control}
          errors={form.formState.errors}
          game={state.game}
          isAuthorized={state.isAuthorized}
          isFree={state.isFree}
          isInviteLinkAvailable={state.isInviteLinkAvailable}
          isPaymentStarting={state.isPaymentStarting}
          isPending={state.isSelectionPending}
          phoneMask={features.phoneMask}
          savedCards={state.savedCards}
          selectedDeliveryType={state.selectedDeliveryType}
          selectedPaymentMethod={state.selectedPaymentMethod}
          selectedPriceVariant={state.selectedPriceVariant}
          selectedRegion={state.selectedRegion}
          selectedSavedCard={state.selectedSavedCard}
          onDismissError={functions.onDismissError}
          onPaymentMethodChange={functions.onPaymentMethodChange}
          onSavedCardChange={functions.onSavedCardChange}
          onSubmit={functions.onSubmit}
        />
      </div>
    </section>
  );
};

const gameProductSearchSchema = z.object({
  deliveryType: z.enum(GameDeliveryType).optional().catch(undefined),
  region: z.enum(GameRegion).optional().catch(undefined),
  edition: z.string().optional().catch(undefined)
});

export const Route = createFileRoute('/(layout)/games/$slug')({
  loader: async ({ context, location, params }) => {
    const search = gameProductSearchSchema.parse(location.search);
    const getGameInfoBySlugResponse = await context.queryClient.fetchQuery(
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

    if (getGameInfoBySlugResponse.status === 404 || !getGameInfoBySlugResponse.data.success) {
      throw notFound();
    }

    const game = getGameInfoBySlugResponse.data.game;
    const [defaultDeliveryType] = game.deliveryTypes;
    const deliveryType =
      search.deliveryType && game.deliveryTypes.includes(search.deliveryType)
        ? search.deliveryType
        : defaultDeliveryType;

    if (!deliveryType) throw notFound();

    const getGamesRegionsResponse = await context.queryClient.fetchQuery(
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

    if (!getGamesRegionsResponse.data.success) throw notFound();

    const regions = getGamesRegionsResponse.data.regions;
    const [defaultRegion] = regions;
    const region = search.region && regions.includes(search.region) ? search.region : defaultRegion;

    if (!region) throw notFound();

    await context.queryClient.fetchQuery(
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
  validateSearch: gameProductSearchSchema,
  component: GameProductPage,
  pendingComponent: GameLoading
});
