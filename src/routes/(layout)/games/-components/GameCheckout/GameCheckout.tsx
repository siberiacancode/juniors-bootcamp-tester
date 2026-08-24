import { useDraggable } from '@siberiacancode/reactuse';
import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
  NewPaymentCard,
  SavedPaymentCard,
  Typography
} from '@siberiacancode/uikit';
import { CheckIcon, CircleXIcon, Loader2Icon, XIcon } from 'lucide-react';
import { useRef } from 'react';
import { Controller } from 'react-hook-form';

import { MascotPeekIcon } from '@/components/icons';
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

interface JbPayLogoProps {
  className?: string;
}

export const JbPayLogo = ({ className }: JbPayLogoProps) => (
  <span
    className={cn(
      'flex h-6 w-fit items-center justify-center self-start rounded-full bg-primary px-2.5',
      'font-pixelify-sans text-[20px]/7 font-bold tracking-wider text-primary-fg lowercase',
      className
    )}
  >
    jB
  </span>
);
interface GameCheckoutProps {
  control: GamePageForm['control'];
  errors: GamePageForm['formState']['errors'];
  game: GamePageState['game'];
  isAuthorized: GamePageState['isAuthorized'];
  isFree: GamePageState['isFree'];
  isInviteLinkAvailable: GamePageState['isInviteLinkAvailable'];
  isPaymentStarting: GamePageState['isPaymentStarting'];
  isPending: GamePageState['isSelectionPending'];
  onDismissError: GamePageFunctions['onDismissError'];
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

const PaymentCheck = ({ checked, className }: { checked: boolean; className?: string }) => (
  <span
    className={cn(
      'flex size-5 shrink-0 items-center justify-center rounded-full bg-background',
      checked && 'border-primary bg-primary text-primary-fg',
      className
    )}
  >
    {checked && <CheckIcon className='size-4' />}
  </span>
);

const PaymentRadio = ({ checked }: { checked: boolean }) => (
  <span
    className={cn(
      'flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ring bg-background transition',
      checked && 'border-primary bg-primary text-primary-fg'
    )}
  >
    {checked && <CheckIcon className='size-3.5' strokeWidth={3} />}
  </span>
);

export const GameCheckout = ({
  control,
  errors,
  game,
  isAuthorized,
  isFree,
  isInviteLinkAvailable,
  isPaymentStarting,
  isPending,
  phoneMask,
  savedCards,
  selectedDeliveryType,
  selectedPaymentMethod,
  selectedPriceVariant,
  selectedRegion,
  selectedSavedCard,
  onDismissError,
  onPaymentMethodChange,
  onSavedCardChange,
  onSubmit
}: GameCheckoutProps) => {
  const isCardPaymentSelected = selectedPaymentMethod !== TransactionPayMethod.QR;
  const oldPrice = selectedPriceVariant.oldPrice;
  const hasPriceDiscount = !isFree && !!oldPrice && oldPrice !== selectedPriceVariant.price;
  const dragStartScrollLeftRef = useRef(0);
  const shouldIgnoreCardClickRef = useRef(false);
  const paymentCardsScroll = useDraggable<HTMLDivElement>({
    axis: 'x',
    onStart: ({ event }) => {
      if (event.button !== 0) return false;

      dragStartScrollLeftRef.current = paymentCardsScroll.ref.current?.scrollLeft ?? 0;
      shouldIgnoreCardClickRef.current = false;
    },
    onMove: ({ delta }) => {
      const scrollContainer = paymentCardsScroll.ref.current;
      if (!scrollContainer) return;

      scrollContainer.scrollLeft = dragStartScrollLeftRef.current - delta.x;
      shouldIgnoreCardClickRef.current = Math.abs(delta.x) > 5;
    }
  });
  const paymentCardCursorClassName = paymentCardsScroll.dragging
    ? 'cursor-grabbing'
    : 'cursor-grab';
  const handlePaymentCardClick = (callback: () => void) => {
    if (shouldIgnoreCardClickRef.current) {
      shouldIgnoreCardClickRef.current = false;
      return;
    }

    callback();
  };

  return (
    <section
      className={cn(
        'mt-6 rounded-24 border-none bg-secondary p-6 transition-opacity [grid-area:checkout] lg:mt-0',
        isPending && 'opacity-60'
      )}
      aria-busy={isPending}
      inert={isPending}
    >
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
                <IntlText path='card.order.region' /> <IntlText path={`region.${selectedRegion}`} />
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
                    disabled={isAuthorized}
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

          {!isFree && (
            <>
              <div className='flex w-full flex-col gap-3'>
                <Typography as='p' variant='body-md'>
                  <IntlText path='page.gameProduct.paymentMethodTitle' />
                </Typography>

                <div className='grid grid-cols-2 gap-2'>
                  <Card
                    asChild
                    className='min-h-20 justify-center overflow-hidden rounded-16 border-0 bg-background p-4 text-left transition'
                  >
                    <button
                      type='button'
                      onClick={() => onPaymentMethodChange(TransactionPayMethod.QR)}
                    >
                      <span className='flex w-full items-start gap-2'>
                        <span className='relative flex min-w-0 flex-1 flex-col gap-2'>
                          <JbPayLogo />

                          <Typography as='span' className='relative z-10' variant='body-sm'>
                            <IntlText path='paymentMethod.jbPay' />
                          </Typography>

                          <MascotPeekIcon className='pointer-events-none absolute -top-0.5 left-[46px] z-0 h-auto w-[92px]' />
                        </span>

                        <PaymentRadio checked={selectedPaymentMethod === TransactionPayMethod.QR} />
                      </span>
                    </button>
                  </Card>

                  <Card
                    asChild
                    className='min-h-20 justify-center overflow-hidden rounded-16 border-0 bg-background p-4 text-left transition'
                  >
                    <button
                      type='button'
                      onClick={() => onPaymentMethodChange(TransactionPayMethod.NEW_CARD)}
                    >
                      <span className='flex w-full items-start gap-2'>
                        <span className='flex min-w-0 flex-1 flex-col gap-2'>
                          <JbPayLogo />

                          <Typography as='span' variant='body-sm'>
                            <IntlText path='paymentMethod.byCard' />
                          </Typography>
                        </span>

                        <PaymentRadio checked={isCardPaymentSelected} />
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

                  <div
                    ref={paymentCardsScroll.ref}
                    className={cn(
                      'no-scroll flex w-full gap-3.5 overflow-x-auto select-none',
                      paymentCardCursorClassName
                    )}
                  >
                    <NewPaymentCard
                      className={cn('shrink-0', paymentCardCursorClassName)}
                      selected={selectedPaymentMethod === TransactionPayMethod.NEW_CARD}
                      onClick={() => handlePaymentCardClick(() => onSavedCardChange())}
                    >
                      <IntlText path='button.newCard' />
                    </NewPaymentCard>

                    {savedCards.map((card) => (
                      <SavedPaymentCard
                        key={card.id}
                        selected={
                          selectedPaymentMethod === TransactionPayMethod.SAVED_CARD &&
                          selectedSavedCard?.id === card.id
                        }
                        className={cn('shrink-0', paymentCardCursorClassName)}
                        panSuffix={card.panSuffix}
                        onClick={() => handlePaymentCardClick(() => onSavedCardChange(card.id))}
                      />
                    ))}
                  </div>

                  {!isAuthorized && (
                    <Card className='min-h-12 flex-row items-center gap-2 rounded-16 border-0 bg-background p-3'>
                      <PaymentCheck checked />

                      <Typography as='p' variant='body-sm'>
                        <IntlText path='page.gameProduct.payWithoutBinding' />
                      </Typography>
                    </Card>
                  )}
                </div>
              )}
            </>
          )}

          <div className='w-full rounded-16 bg-background p-3'>
            <div className='flex items-center justify-between gap-4'>
              <Typography as='p' variant='body-sm'>
                <IntlText path='page.gameProduct.totalLabel' />
              </Typography>
              {isFree ? (
                <Typography as='span' variant='body-lg'>
                  <IntlText path='page.gameProduct.free' />
                </Typography>
              ) : (
                <div className='flex min-w-0 items-center justify-end gap-2'>
                  <Typography as='span' className='shrink-0' variant='body-lg'>
                    {formatMoney(selectedPriceVariant.price)}
                  </Typography>
                  {hasPriceDiscount && (
                    <Badge className='shrink-0 px-2 py-1 text-[12px]/4 font-bold' variant='accent'>
                      {formatDiscountPercent(selectedPriceVariant.price, oldPrice)}
                    </Badge>
                  )}
                  {hasPriceDiscount && (
                    <Typography
                      as='span'
                      className='shrink-0 text-muted-fg line-through'
                      variant='caption'
                    >
                      {formatMoney(oldPrice)}
                    </Typography>
                  )}
                </div>
              )}
            </div>
          </div>
          {errors.root?.message && (
            <div
              className='flex w-full items-center gap-2 rounded-16 bg-background p-3 text-danger'
              role='alert'
            >
              <CircleXIcon className='size-5 shrink-0' />
              <Typography as='p' className='min-w-0 flex-1' variant='caption'>
                {errors.root.message}
              </Typography>
              <button
                aria-label={intl.formatMessage({ id: 'button.dismiss' })}
                className='shrink-0 text-muted-fg transition-colors hover:text-foreground'
                type='button'
                onClick={onDismissError}
              >
                <XIcon className='size-4' />
              </button>
            </div>
          )}
          <Button className='h-13 w-full' disabled={isPaymentStarting} type='submit'>
            {isPaymentStarting && <Loader2Icon className='animate-spin' />}
            <IntlText path={isFree ? 'button.getGame' : 'button.pay'} />
          </Button>
        </form>
      </OrderCard>
    </section>
  );
};
