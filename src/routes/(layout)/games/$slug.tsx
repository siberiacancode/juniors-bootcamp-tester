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
        <GameScreenshots screenshots={state.game.screenshots} />
        <GameMeta items={state.metaItems} />
        <GameRequirements sections={state.requirementSections} />
        <GameSelection
          deliveryTypes={state.game.deliveryTypes}
          editions={state.editions}
          isLoading={state.isSelectionLoading}
          isReady={state.isSelectionReady}
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
          isReady={state.isSelectionReady}
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
  validateSearch: gameProductSearchSchema,
  component: GameProductPage,
  pendingComponent: GameLoading
});
