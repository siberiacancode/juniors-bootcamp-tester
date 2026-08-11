import { CheckIcon, Loader2Icon } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { PAYMENT_METHODS } from '@/helpers/constants';
import { formatMoney } from '@/helpers/utils';
import { getAsset } from '@/helpers/utils/assets';
import { intl, IntlText } from '@/lib';
import { cn } from '@/lib/utils';

import type { GamePageFeatures, GamePageForm, GamePageFunctions, GamePageState } from '../types';

import { DELIVERY_TYPE_VIEW } from '../../-constants';
import { GameCheckoutSkeleton } from './GameCheckoutSkeleton';

interface GameCheckoutProps {
  features: GamePageFeatures;
  form: GamePageForm;
  functions: GamePageFunctions;
  state: GamePageState;
}

export const GameCheckout = ({ features, form, functions, state }: GameCheckoutProps) => (
  <section className='mt-6 rounded-24 border-none bg-secondary p-6 [grid-area:checkout] lg:mt-0'>
    {state.isSelectionReady ? (
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
    ) : (
      <GameCheckoutSkeleton />
    )}
  </section>
);
