import { Button, Field, FieldError, FieldLabel, Input, Typography } from '@siberiacancode/uikit';
import { CheckIcon, CreditCardIcon, Loader2Icon, PlusCircleIcon, QrCodeIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { MascotFrontIcon } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  OrderCard,
  OrderCardBadge,
  OrderCardBadges,
  OrderCardHeader,
  OrderCardSubtitle,
  OrderCardThumbnail,
  OrderCardTitle
} from '@/components/ui/order-card';
import { TransactionPayMethod } from '@/generated/api';
import { formatDiscountPercent, formatMoney } from '@/utils/helpers';
import { getAsset } from '@/utils/helpers/assets';
import { intl, IntlText } from '@/utils/lib';
import { cn } from '@/utils/lib/utils';

import type { GamePageFeatures, GamePageForm, GamePageFunctions, GamePageState } from '../types';

import { DELIVERY_TYPE_VIEW } from '../../-constants';
import { GameCheckoutSkeleton } from './GameCheckoutSkeleton';

interface GameCheckoutProps {
  control: GamePageForm['control'];
  errors: GamePageForm['formState']['errors'];
  game: GamePageState['game'];
  isInviteLinkAvailable: GamePageState['isInviteLinkAvailable'];
  isPaymentStarting: GamePageState['isPaymentStarting'];
  isReady: GamePageState['isSelectionReady'];
  onPaymentMethodChange: GamePageFunctions['onPaymentMethodChange'];
  onSavedCardChange: GamePageFunctions['onSavedCardChange'];
  onSubmit: GamePageFunctions['onSubmit'];
  phoneMask: GamePageFeatures['phoneMask'];
  savedCards: GamePageState['savedCards'];
  selectedDeliveryType: GamePageState['selectedDeliveryType'];
  selectedPaymentMethod: GamePageState['selectedPaymentMethod'];
  selectedPriceVariant: GamePageState['selectedPriceVariant'];
  selectedRegion: GamePageState['selectedRegion'];
  selectedSavedCard: GamePageState['selectedSavedCard'];
}

const PaymentCheck = ({ checked }: { checked: boolean }) => (
  <span
    className={cn(
      'flex size-5 shrink-0 items-center justify-center rounded-full bg-background',
      checked && 'border-primary bg-primary text-primary-fg'
    )}
  >
    {checked && <CheckIcon className='size-4' />}
  </span>
);

export const GameCheckout = ({
  control,
  errors,
  game,
  isInviteLinkAvailable,
  isPaymentStarting,
  isReady,
  phoneMask,
  savedCards,
  selectedDeliveryType,
  selectedPaymentMethod,
  selectedPriceVariant,
  selectedRegion,
  selectedSavedCard,
  onPaymentMethodChange,
  onSavedCardChange,
  onSubmit
}: GameCheckoutProps) => {
  const isCardPaymentSelected = selectedPaymentMethod !== TransactionPayMethod.QR;
  const oldPrice = isReady ? selectedPriceVariant.oldPrice : undefined;
  const hasPriceDiscount = !!oldPrice && oldPrice !== selectedPriceVariant.price;

  return (
    <section className='mt-6 rounded-24 border-none bg-secondary p-6 [grid-area:checkout] lg:mt-0'>
      {isReady ? (
        <OrderCard asChild className='gap-4 rounded-none bg-transparent p-0'>
          <form onSubmit={onSubmit}>
            <div className='flex w-full flex-col gap-2'>
              <OrderCardHeader>
                <OrderCardThumbnail alt={game.name} src={getAsset(game.image)} />
                <OrderCardTitle>{game.name}</OrderCardTitle>
                <OrderCardSubtitle>{selectedPriceVariant.edition}</OrderCardSubtitle>
              </OrderCardHeader>

              <OrderCardBadges>
                <OrderCardBadge>
                  <IntlText path='card.order.region' />{' '}
                  <IntlText path={`region.${selectedRegion}`} />
                </OrderCardBadge>
                <OrderCardBadge>
                  <IntlText path={DELIVERY_TYPE_VIEW[selectedDeliveryType].titlePath} />
                </OrderCardBadge>
              </OrderCardBadges>
            </div>

            <div className='flex w-full flex-col gap-4'>
              {isInviteLinkAvailable && (
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
                      {fieldState.error?.message && (
                        <FieldError>
                          <IntlText path={fieldState.error.message as MessagePath} />
                        </FieldError>
                      )}
                    </Field>
                  )}
                  control={control}
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
                control={control}
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
                      {...phoneMask.register({
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
                control={control}
                name='phone'
              />
            </div>

            <div className='flex w-full flex-col gap-3'>
              <Typography as='p' variant='body-md'>
                <IntlText path='page.gameProduct.paymentMethodTitle' />
              </Typography>
              <div className='grid grid-cols-2 gap-2'>
                <Card
                  asChild
                  className={cn(
                    'min-h-20 overflow-hidden border-0 bg-background p-4 text-left transition',
                    selectedPaymentMethod === TransactionPayMethod.QR && 'ring-2 ring-primary'
                  )}
                >
                  <button
                    type='button'
                    onClick={() => onPaymentMethodChange(TransactionPayMethod.QR)}
                  >
                    <span className='flex w-full items-start gap-2'>
                      <span className='flex flex-1 flex-col gap-1'>
                        <span className='flex size-10 items-center justify-center rounded-full bg-primary text-primary-fg'>
                          <QrCodeIcon className='size-5' />
                        </span>
                        <Typography as='span' variant='body-sm'>
                          <IntlText path={`paymentMethod.${TransactionPayMethod.QR}`} />
                        </Typography>
                      </span>
                      <PaymentCheck checked={selectedPaymentMethod === TransactionPayMethod.QR} />
                    </span>
                  </button>
                </Card>

                <Card
                  asChild
                  className={cn(
                    'relative min-h-20 overflow-hidden border-0 bg-background p-4 text-left transition',
                    isCardPaymentSelected && 'ring-2 ring-primary'
                  )}
                >
                  <button
                    type='button'
                    onClick={() => onPaymentMethodChange(TransactionPayMethod.NEW_CARD)}
                  >
                    <MascotFrontIcon className='pointer-events-none absolute right-8 -bottom-7 size-22' />
                    <span className='relative flex w-full items-start gap-2'>
                      <span className='flex flex-1 flex-col gap-1'>
                        <span className='flex size-10 items-center justify-center rounded-full bg-primary text-primary-fg'>
                          <CreditCardIcon className='size-5' />
                        </span>
                        <Typography as='span' variant='body-sm'>
                          <IntlText path={`paymentMethod.${TransactionPayMethod.NEW_CARD}`} />
                        </Typography>
                      </span>
                      <PaymentCheck checked={isCardPaymentSelected} />
                    </span>
                  </button>
                </Card>
              </div>
            </div>

            {isCardPaymentSelected && (
              <div className='flex w-full flex-col gap-3'>
                <Typography as='p' variant='body-md'>
                  <IntlText path='page.gameProduct.cardSelectionTitle' />
                </Typography>
                <div className='grid grid-cols-2 gap-2'>
                  <Card
                    asChild
                    className={cn(
                      'min-h-20 border-ring bg-background p-4 text-left transition',
                      selectedPaymentMethod === TransactionPayMethod.NEW_CARD &&
                        'border-primary ring-2 ring-primary'
                    )}
                  >
                    <button type='button' onClick={() => onSavedCardChange()}>
                      <span className='flex h-full flex-col items-center justify-center gap-2'>
                        <PlusCircleIcon className='size-6' />
                        <Typography as='span' variant='body-sm'>
                          <IntlText path='button.newCard' />
                        </Typography>
                      </span>
                    </button>
                  </Card>
                  {savedCards.map((card) => (
                    <Card
                      asChild
                      key={card.id}
                      className={cn(
                        'min-h-20 border-ring bg-background p-4 text-left transition',
                        selectedSavedCard?.id === card.id && 'border-primary ring-2 ring-primary'
                      )}
                    >
                      <button type='button' onClick={() => onSavedCardChange(card.id)}>
                        <span className='flex h-full items-start gap-2'>
                          <CreditCardIcon className='size-6 shrink-0' />
                          <span className='flex min-w-0 flex-1 flex-col'>
                            <Typography as='span' className='truncate' variant='body-sm'>
                              {card.title}
                            </Typography>
                            <Typography as='span' className='text-muted-fg' variant='caption'>
                              {card.panmask}
                            </Typography>
                          </span>
                          <PaymentCheck checked={selectedSavedCard?.id === card.id} />
                        </span>
                      </button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className='w-full rounded-16 bg-background p-3'>
              <div className='flex items-center justify-between gap-4'>
                <Typography as='p' variant='body-sm'>
                  <IntlText path='page.gameProduct.totalLabel' />
                </Typography>
                <div className='flex min-w-0 flex-wrap items-center justify-end gap-x-2 gap-y-1'>
                  <Typography as='span' variant='body-lg'>
                    {formatMoney(selectedPriceVariant.price)}
                  </Typography>
                  {hasPriceDiscount && (
                    <Badge className='px-2 py-1 text-[12px]/4 font-bold' variant='accent'>
                      {formatDiscountPercent(selectedPriceVariant.price, oldPrice)}
                    </Badge>
                  )}
                  {hasPriceDiscount && (
                    <Typography as='span' className='text-muted-fg line-through' variant='caption'>
                      {formatMoney(oldPrice)}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
            {errors.root?.message && (
              <Typography as='p' className='text-danger' variant='caption'>
                {errors.root.message}
              </Typography>
            )}
            <Button className='h-13 w-full' disabled={isPaymentStarting} type='submit'>
              {isPaymentStarting && <Loader2Icon className='animate-spin' />}
              <IntlText path='button.pay' />
            </Button>
          </form>
        </OrderCard>
      ) : (
        <GameCheckoutSkeleton />
      )}
    </section>
  );
};
