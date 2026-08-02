import { createFileRoute, Link } from '@tanstack/react-router';
import { CheckIcon, ChevronLeftIcon, Loader2Icon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import z from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Typography } from '@/components/ui/typography';
import {
  getGamesInfoBySlugQueryOptions,
  getGamesPriceVariantsQueryOptions,
  getGamesRegionsQueryOptions
} from '@/generated/api';
import { DELIVERY_TYPES, PAYMENT_METHODS, REGIONS } from '@/helpers/constants';
import { formatMoney } from '@/helpers/utils';
import { getAsset } from '@/helpers/utils/assets';
import { intl, IntlText } from '@/lib';
import { cn } from '@/lib/utils';

import { DELIVERY_TYPE_VIEW } from './-constants';
import { getRequirementRows, getRequirementSections, productMetaItems } from './-helpers';
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
        <section className='flex flex-col gap-3 [grid-area:overview] lg:gap-4'>
          <div className='flex flex-col gap-2'>
            <div className='aspect-460/215 w-full overflow-hidden rounded-24 bg-secondary'>
              <img
                alt={state.game.name}
                className='block size-full object-cover object-center'
                src={getAsset(state.game.image)}
              />
            </div>
            <Typography as='h1' className='hidden lg:block' variant='title-lg'>
              {state.game.name}
            </Typography>
            <div className='flex max-w-full scrollbar-none gap-2 overflow-x-auto lg:flex-wrap lg:overflow-visible'>
              {state.game.genres.map((genre) => (
                <Badge key={genre} className='px-4 py-2 text-[12px]/4 font-bold tracking-wide'>
                  <IntlText path={`genre.${genre}`} />
                </Badge>
              ))}
            </div>
          </div>
          <Typography as='p' className='mb-6 tracking-normal sm:mb-0' variant='body-sm'>
            {state.game.description}
          </Typography>
        </section>

        <section className='mb-6 flex min-w-0 flex-col gap-3 [grid-area:screenshots] sm:mb-0'>
          <Typography variant={state.isDesktop ? 'title-md' : 'body-md'}>
            <IntlText path='page.gameProduct.screenshots' />
          </Typography>
          <Carousel
            opts={{
              align: 'start',
              dragFree: true
            }}
            className='max-w-full min-w-0 pb-10'
          >
            <CarouselContent className='-ml-2'>
              {state.game.screenshots.map((screenshot) => (
                <CarouselItem key={screenshot} className='basis-auto pl-2'>
                  <div className='aspect-68/39 w-[min(82vw,24rem)] overflow-hidden rounded-24 bg-secondary sm:w-68'>
                    <img
                      alt={intl.formatMessage(
                        {
                          id: 'page.gameProduct.screenshotAlt'
                        },
                        {
                          name: screenshot
                        }
                      )}
                      className='block size-full object-cover'
                      src={getAsset(screenshot)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className='top-auto bottom-0 left-0 hidden size-8 translate-y-0 rounded-full sm:block'
              variant='ghost'
            />
            <CarouselNext
              className='top-auto right-0 bottom-0 hidden size-8 translate-y-0 rounded-full sm:block'
              variant='ghost'
            />
          </Carousel>
        </section>

        <section className='mb-6 flex h-fit flex-col gap-2 border-none p-0 [grid-area:meta] sm:mb-0 sm:rounded-24 sm:bg-secondary sm:p-6'>
          {productMetaItems(state.game).map((item) => (
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
          <Typography variant={state.isDesktop ? 'title-md' : 'body-md'}>
            <IntlText path='page.gameProduct.systemRequirements' />
          </Typography>
          {state.isDesktop ? (
            <div className='grid gap-4 lg:grid-cols-2'>
              {getRequirementSections(state.game).map((section) => (
                <div key={section.key} className='flex flex-col gap-2'>
                  <Typography as='h3' className='font-medium' variant='title-md'>
                    <IntlText path={section.titlePath} />
                  </Typography>
                  {getRequirementRows(section.requirements).map(
                    (row) =>
                      row.value && (
                        <div key={row.labelPath} className='flex flex-col'>
                          <Typography as='span' className='text-muted-fg' variant='caption'>
                            <IntlText path={row.labelPath as MessagePath} />:
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
                {getRequirementSections(state.game).map((section) => (
                  <TabsTrigger key={section.key} value={section.key}>
                    <IntlText path={section.titlePath} />
                  </TabsTrigger>
                ))}
              </TabsList>
              {getRequirementSections(state.game).map((section) => (
                <TabsContent key={section.key} value={section.key}>
                  <div className='flex flex-col gap-2'>
                    {getRequirementRows(section.requirements).map(
                      (row) =>
                        row.value && (
                          <div key={row.labelPath} className='flex flex-col'>
                            <Typography as='span' className='text-muted-fg' variant='caption'>
                              <IntlText path={row.labelPath as MessagePath} />:
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

        <>
          <section className={cn('flex flex-col gap-6 [grid-area:selection] lg:gap-4')}>
            <div className='flex flex-col gap-3'>
              <Typography variant={state.isDesktop ? 'title-md' : 'body-md'}>
                <IntlText path='page.gameProduct.deliveryTypeTitle' />
              </Typography>
              <div className={cn('flex flex-col gap-2', state.isSelectionLoading && 'opacity-100')}>
                {state.game.deliveryTypes.map((deliveryType) => {
                  const option = DELIVERY_TYPE_VIEW[deliveryType];
                  const Icon = option.Icon;

                  return (
                    <Button
                      key={deliveryType}
                      className='h-auto w-full justify-start rounded-24! bg-secondary p-4 text-left whitespace-normal hover:bg-secondary-hover/40 disabled:opacity-70'
                      disabled={state.isSelectionLoading}
                      size='lg'
                      type='button'
                      variant='secondary'
                      onClick={() => functions.onDeliveryTypeChange(deliveryType)}
                    >
                      <Icon className='size-8' />
                      <span className='flex flex-1 flex-col'>
                        <Typography variant='body-sm'>
                          <IntlText path={option.titlePath} />
                        </Typography>
                        <Typography className='text-muted-fg' variant='caption'>
                          <IntlText path={option.subtitlePath} />
                        </Typography>
                      </span>
                      <span
                        className={cn(
                          'flex size-5 shrink-0 items-center justify-center rounded-full bg-background',
                          state.selectedDeliveryType === deliveryType &&
                            'border-primary bg-primary text-primary-fg'
                        )}
                      >
                        {state.selectedDeliveryType === deliveryType && (
                          <CheckIcon className='size-4' />
                        )}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <Typography variant={state.isDesktop ? 'title-md' : 'body-md'}>
                <IntlText
                  path='page.gameProduct.regionTitle'
                  values={{ platform: DELIVERY_TYPE_VIEW[state.selectedDeliveryType].platform }}
                />
              </Typography>
              <div
                className={cn('flex flex-wrap gap-2', state.isSelectionLoading && 'opacity-100')}
              >
                {state.regions.map((region) => (
                  <Button
                    key={region}
                    className={cn(
                      'bg-secondary text-foreground hover:bg-secondary-hover/50 disabled:opacity-70',
                      state.selectedRegion === region &&
                        'bg-primary text-primary-fg hover:bg-primary/90'
                    )}
                    disabled={state.isSelectionLoading}
                    size='md'
                    type='button'
                    variant='secondary'
                    onClick={() => functions.onRegionChange(region)}
                  >
                    <IntlText path={`region.${region}`} />
                  </Button>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <Typography variant={state.isDesktop ? 'title-md' : 'body-md'}>
                <IntlText path='page.gameProduct.editionTitle' />
              </Typography>
              <div className={cn('flex flex-col gap-2', state.isSelectionLoading && 'opacity-100')}>
                {state.editions.map((edition) => (
                  <Button
                    key={edition}
                    className='h-auto w-full justify-start rounded-16 bg-transparent px-0 py-1 text-left hover:bg-transparent disabled:opacity-70'
                    disabled={state.isSelectionLoading}
                    type='button'
                    variant='ghost'
                    onClick={() => functions.onEditionChange(edition)}
                  >
                    <span
                      className={cn(
                        'flex size-5 items-center justify-center rounded-full bg-background',
                        state.selectedPriceVariant.edition === edition &&
                          'bg-primary text-primary-fg'
                      )}
                    >
                      {state.selectedPriceVariant.edition === edition && (
                        <CheckIcon className='size-4' />
                      )}
                    </span>
                    <Typography as='span' variant='caption'>
                      {edition}
                    </Typography>
                  </Button>
                ))}
              </div>
            </div>
          </section>

          <section className='mt-6 rounded-24 border-none bg-secondary p-6 [grid-area:checkout] lg:mt-0'>
            <form className='flex flex-col gap-4' onSubmit={functions.onSubmit}>
              <div className='flex gap-3'>
                <div className='aspect-square size-14 overflow-hidden rounded-8'>
                  <img
                    alt={state.game.name}
                    className='size-full object-cover'
                    src={getAsset(state.game.image)}
                  />
                </div>
                <div className='flex-1'>
                  <Typography as='p' className='truncate' variant='body-md'>
                    {state.game.name}
                  </Typography>
                  <Typography as='p' className='truncate text-muted-fg' variant='caption'>
                    {state.selectedPriceVariant.edition}
                  </Typography>
                </div>
              </div>
              <div className='flex flex-wrap gap-2 px-1'>
                <Badge className='bg-secondary px-4 py-2 text-[12px]/4'>
                  <IntlText path='card.order.region' />{' '}
                  <IntlText path={`region.${state.selectedRegion}`} />
                </Badge>
                <Badge className='bg-secondary px-4 py-2 text-[12px]/4'>
                  <IntlText path={DELIVERY_TYPE_VIEW[state.selectedDeliveryType].titlePath} />
                </Badge>
              </div>
              <div className='flex flex-col gap-4'>
                {state.isInviteLinkAvailable && (
                  <Controller
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          placeholder={intl.formatMessage({
                            id: 'field.product.inviteLink.placeholder'
                          })}
                          className='bg-background'
                          id={field.name}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                    control={form.control}
                    name='inviteLink'
                  />
                )}
                <Controller
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className='text-[14px]/[22px] font-medium text-foreground'
                        htmlFor={field.name}
                      >
                        <IntlText path='field.product.email.label' />
                      </FieldLabel>
                      <Input
                        {...field}
                        className='bg-background'
                        id={field.name}
                        placeholder={intl.formatMessage({ id: 'field.product.email.placeholder' })}
                        type='email'
                      />
                      {fieldState.error?.message && (
                        <FieldError>
                          <IntlText path={fieldState.error.message as MessagePath} />
                        </FieldError>
                      )}
                    </Field>
                  )}
                  control={form.control}
                  name='email'
                />
                <Controller
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className='text-[14px]/[22px] font-medium text-foreground'
                        htmlFor={field.name}
                      >
                        <IntlText path='field.product.phone.label' />
                      </FieldLabel>
                      <Input
                        {...features.phoneMask.register({
                          onBlur: field.onBlur
                        })}
                        className='bg-background'
                        id={field.name}
                        name={field.name}
                        placeholder='+7'
                      />
                      {fieldState.error?.message && (
                        <FieldError>
                          <IntlText path={fieldState.error.message as MessagePath} />
                        </FieldError>
                      )}
                    </Field>
                  )}
                  control={form.control}
                  name='phone'
                />
              </div>

              <div className='flex flex-col gap-3'>
                <Typography as='p' variant='body-md'>
                  <IntlText path='page.gameProduct.paymentMethodTitle' />
                </Typography>
                <Controller
                  render={({ field }) => (
                    <div className='grid grid-cols-2 gap-2'>
                      {PAYMENT_METHODS.map((method) => (
                        <button
                          key={method}
                          className='relative flex min-h-20 items-start gap-2 overflow-hidden rounded-16 bg-background p-4 text-left transition'
                          type='button'
                          onClick={() => field.onChange(method)}
                        >
                          <span className='flex flex-1 flex-col gap-1'>
                            <span className='w-fit rounded-full bg-primary px-3 py-0.5 font-pixelify-sans text-[20px]/5 font-bold tracking-wide text-primary-fg'>
                              {method === 'qr' ? 'QR' : 'card'}
                            </span>
                            <Typography as='p' variant='body-sm'>
                              <IntlText path={`paymentMethod.${method}` as MessagePath} />
                            </Typography>
                          </span>
                          <span
                            className={cn(
                              'flex size-5 shrink-0 items-center justify-center rounded-full bg-background',
                              field.value === method && 'border-primary bg-primary text-primary-fg'
                            )}
                          >
                            {field.value === method && <CheckIcon className='size-4' />}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  control={form.control}
                  name='paymentMethod'
                />
              </div>

              <div className='rounded-16 bg-background p-3'>
                <div className='flex items-center justify-between gap-4'>
                  <Typography as='p' variant='body-sm'>
                    <IntlText path='page.gameProduct.totalLabel' />
                  </Typography>
                  <Typography as='span' variant='body-lg'>
                    {formatMoney(state.selectedPriceVariant.price)}
                  </Typography>
                </div>
              </div>
              {form.formState.errors.root?.message && (
                <Typography as='p' className='text-destructive' variant='caption'>
                  {form.formState.errors.root.message}
                </Typography>
              )}
              <Button className='h-13 w-full' disabled={state.isPaymentStarting} type='submit'>
                {state.isPaymentStarting && <Loader2Icon className='animate-spin' />}
                <IntlText path='button.pay' />
              </Button>
            </form>
          </section>
        </>
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

    if (!deliveryType) return;

    const getGamesRegionsResponse = await context.queryClient.ensureQueryData(
      getGamesRegionsQueryOptions({
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

    if (!region) return;

    await context.queryClient.ensureQueryData(
      getGamesPriceVariantsQueryOptions({
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
