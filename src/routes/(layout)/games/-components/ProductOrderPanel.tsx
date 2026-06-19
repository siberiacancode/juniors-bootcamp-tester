import { CheckIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';

import type { DetailedGame } from '@/generated/api';

import { MascotWaveIcon } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { paymentMethods, REGION_LABELS } from '@/helpers/constants';
import { formatMoney, getGameImageSrc } from '@/helpers/utils';
import { intl, IntlText } from '@/lib';
import { cn } from '@/lib/utils';

import { DELIVERY_TYPE_VIEW } from '../-constants';
import { useProductOrder } from '../-hooks';

export const ProductOrderPanel = ({ game }: { game: DetailedGame }) => {
  const { state, features, functions, form } = useProductOrder(game);

  return (
    <>
      <section className={cn('flex flex-col gap-6 [grid-area:selection] lg:gap-4')}>
        <div className='flex flex-col gap-3'>
          <Typography variant={state.isDesktop ? 'title-md' : 'body-md'}>
            <IntlText path='page.gameProduct.deliveryTypeTitle' />
          </Typography>
          <div className={cn('flex flex-col gap-2', state.isRouteLoading && 'opacity-100')}>
            {game.deliveryTypes.map((deliveryType) => {
              const option = DELIVERY_TYPE_VIEW[deliveryType];
              const Icon = option.Icon;

              return (
                <Button
                  key={deliveryType}
                  className='h-auto w-full justify-start rounded-24! bg-secondary p-4 text-left whitespace-normal hover:bg-secondary-hover/40 disabled:opacity-70'
                  disabled={state.isRouteLoading}
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
          <div className={cn('flex flex-wrap gap-2', state.isRouteLoading && 'opacity-100')}>
            {state.regions.map((region) => (
              <Button
                key={region}
                className={cn(
                  'bg-secondary text-foreground hover:bg-secondary-hover/50 disabled:opacity-70',
                  state.selectedRegion === region &&
                    'bg-primary text-primary-fg hover:bg-primary/90'
                )}
                disabled={state.isRouteLoading}
                size='md'
                type='button'
                variant='secondary'
                onClick={() => functions.onRegionChange(region)}
              >
                {REGION_LABELS[region]}
              </Button>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <Typography variant={state.isDesktop ? 'title-md' : 'body-md'}>
            <IntlText path='page.gameProduct.editionTitle' />
          </Typography>
          <div className={cn('flex flex-col gap-2', state.isRouteLoading && 'opacity-100')}>
            {state.editions.map((edition) => (
              <Button
                key={edition}
                className='h-auto w-full justify-start rounded-16 bg-transparent px-0 py-1 text-left hover:bg-transparent disabled:opacity-70'
                disabled={state.isRouteLoading}
                type='button'
                variant='ghost'
                onClick={() => functions.onEditionChange(edition)}
              >
                <span
                  className={cn(
                    'flex size-5 items-center justify-center rounded-full bg-background',
                    state.selectedEdition === edition && 'bg-primary text-primary-fg'
                  )}
                >
                  {state.selectedEdition === edition && <CheckIcon className='size-4' />}
                </span>
                <Typography as='span' variant='caption'>
                  {edition}
                </Typography>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className='mt-6 border-none bg-secondary p-6 [grid-area:checkout] lg:mt-0'>
        <form className='flex flex-col gap-4' onSubmit={functions.onSubmit}>
          <div className='flex gap-3'>
            <div className='aspect-square size-14 overflow-hidden rounded-8'>
              <img
                alt={game.name}
                className='size-full object-cover'
                src={getGameImageSrc(game.image)}
              />
            </div>
            <div className='flex-1'>
              <Typography as='p' className='truncate' variant='body-md'>
                {game.name}
              </Typography>
              <Typography as='p' className='truncate text-muted-fg' variant='caption'>
                {state.selectedEdition}
              </Typography>
            </div>
          </div>
          <div className='flex flex-wrap gap-2 px-1'>
            <Badge className='bg-secondary px-4 py-2 text-[12px]/4'>
              <IntlText
                path='card.order.region'
                values={{ region: REGION_LABELS[state.selectedRegion] }}
              />
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
                      className='bg-background placeholder:text-muted-fg'
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
                    className='bg-background placeholder:text-muted-fg'
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
                  {paymentMethods.map((method) => (
                    <button
                      key={method.value}
                      className='relative flex min-h-20 items-start gap-2 overflow-hidden rounded-16 bg-background p-4 text-left transition'
                      type='button'
                      onClick={() => field.onChange(method.value)}
                    >
                      <span className='flex flex-1 flex-col gap-1'>
                        <span className='w-fit rounded-full bg-primary px-3 py-0.5 font-pixelify-sans text-[20px]/5 font-bold tracking-wide text-primary-fg'>
                          jb
                        </span>
                        <Typography as='p' variant='body-sm'>
                          <IntlText path={`paymentMethod.${method.value}` as MessagePath} />
                        </Typography>
                      </span>
                      {method.value === 'jb-pay' && (
                        <MascotWaveIcon className='pointer-events-none absolute -bottom-px left-26 size-15 -translate-x-1/2' />
                      )}
                      <span
                        className={cn(
                          'flex size-5 shrink-0 items-center justify-center rounded-full bg-background',
                          field.value === method.value &&
                            'border-primary bg-primary text-primary-fg'
                        )}
                      >
                        {field.value === method.value && <CheckIcon className='size-4' />}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              control={form.control}
              name='paymentMethod'
            />
          </div>

          <div className='flex flex-col gap-2 rounded-16 bg-background p-3'>
            <Controller
              render={({ field }) => (
                <label className='flex items-center gap-2 text-[16px]/6 font-medium'>
                  <Checkbox
                    checked={field.value}
                    className='rounded-full'
                    onCheckedChange={(value) => field.onChange(value === true)}
                  />
                  <span>
                    <IntlText path='button.product.bindJbPay' />
                  </span>
                </label>
              )}
              control={form.control}
              name='bindJbPay'
            />
            <Controller
              render={({ field }) => (
                <label className='flex items-center gap-2 text-[16px]/6 font-medium'>
                  <Checkbox
                    checked={field.value}
                    className='rounded-full'
                    onCheckedChange={(value) => field.onChange(value === true)}
                  />
                  <span>
                    <IntlText path='button.product.payWithoutBinding' />
                  </span>
                </label>
              )}
              control={form.control}
              name='payWithoutBinding'
            />
          </div>

          <div className='rounded-16 bg-background p-3'>
            <div className='flex items-center justify-between gap-4'>
              <Typography as='p' variant='body-sm'>
                <IntlText path='page.gameProduct.totalLabel' />
              </Typography>
              {/*TODO: Replace with API price*/}
              <Typography as='span' variant='body-lg'>
                {formatMoney(4680)}
              </Typography>
            </div>
          </div>
          <Button className='h-13 w-full' disabled={state.isCreatingOrder} type='submit'>
            <IntlText path='button.product.pay' />
          </Button>
        </form>
      </section>
    </>
  );
};
