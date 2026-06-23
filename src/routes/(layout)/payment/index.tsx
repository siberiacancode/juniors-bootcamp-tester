import type { ApicraftFetchesResponse } from '@siberiacancode/apicraft';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMask } from '@siberiacancode/reactuse';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router';
import { CheckIcon, CirclePlusIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import type { CreateGameOrderDto, GameOrder, SessionResponse } from '@/generated/api';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  OrderCard,
  OrderCardBadge,
  OrderCardBadges,
  OrderCardContent,
  OrderCardField,
  OrderCardFieldLabel,
  OrderCardFieldValue,
  OrderCardHeader,
  OrderCardSubtitle,
  OrderCardThumbnail,
  OrderCardTitle
} from '@/components/ui/order-card';
import { Typography } from '@/components/ui/typography';
import { getUsersSessionQueryKey, usePostGamesOrderMutation } from '@/generated/api';
import { DELIVERY_TYPES, REGIONS } from '@/helpers/constants';
import { formatMoney, getGameImageSrc } from '@/helpers/utils';
import { IntlText } from '@/lib/intl';

const paymentSearchSchema = z.object({
  amount: z.coerce.number().positive(),
  deliveryType: z.enum(DELIVERY_TYPES),
  edition: z.coerce.string().min(1),
  email: z.coerce.string().pipe(z.email()),
  gameSlug: z.coerce.string().min(1),
  inviteLink: z.coerce.string().optional(),
  phone: z.coerce.string().min(1),
  region: z.enum(REGIONS)
});

const paymentFormSchema = z.object({
  cardCvv: z.string().min(1, 'error.validation.required'),
  cardExpiry: z.string().min(1, 'error.validation.required'),
  cardNumber: z.string().min(1, 'error.validation.required')
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export const Route = createFileRoute('/(layout)/payment/')({
  beforeLoad: ({ location }) => {
    const paymentSearchResult = paymentSearchSchema.safeParse(location.search);
    if (!paymentSearchResult.success) {
      throw redirect({
        to: '/'
      });
    }
  },
  component: PaymentPage,
  validateSearch: paymentSearchSchema
});

function PaymentPage() {
  const router = useRouter();
  const search = Route.useSearch();
  const queryClient = useQueryClient();

  const postGamesOrderMutation = usePostGamesOrderMutation();
  const [order, setOrder] = useState<GameOrder>();
  const sessionResponse = queryClient.getQueryData<ApicraftFetchesResponse<SessionResponse>>([
    getUsersSessionQueryKey
  ]);
  const user = sessionResponse?.data.user;

  const paymentForm = useForm<PaymentFormValues>({
    defaultValues: {
      cardCvv: '',
      cardExpiry: '',
      cardNumber: ''
    },
    mode: 'onChange',
    resolver: zodResolver(paymentFormSchema)
  });

  const cardNumberMask = useMask('9999 9999', {
    showMask: 'never',
    onChangeRaw: (rawValue) => paymentForm.setValue('cardNumber', rawValue)
  });
  const cardExpiryMask = useMask('99/99', {
    showMask: 'never',
    onChangeRaw: (rawValue) => paymentForm.setValue('cardExpiry', rawValue)
  });
  const cardCvvMask = useMask('9999', {
    showMask: 'never',
    onChangeRaw: (rawValue) => paymentForm.setValue('cardCvv', rawValue)
  });

  const onPay = paymentForm.handleSubmit(async (values) => {
    const paymentRequest = {
      body: {
        debitCard: values.cardNumber,
        deliveryType: search.deliveryType,
        edition: search.edition,
        gameSlug: search.gameSlug,
        person: {
          email: search.email,
          phone: search.phone,
          ...(search.inviteLink && { inviteLink: search.inviteLink })
        },
        region: search.region
      } satisfies CreateGameOrderDto
    };

    const postGamesOrderResponse = await postGamesOrderMutation.mutateAsync(paymentRequest);

    if (postGamesOrderResponse.data.success) {
      setOrder(postGamesOrderResponse.data.order);

      router.history._ignoreSubscribers = true;
      try {
        window.history.replaceState(window.history.state, '', window.location.pathname);
      } finally {
        router.history._ignoreSubscribers = false;
      }
    }
  });

  if (!order) {
    return (
      <div className='fixed inset-0 z-100 overflow-y-auto bg-white'>
        <section className='mx-auto flex w-full flex-col gap-6 px-4 pt-14 pb-28 sm:max-w-104.5 sm:px-0 sm:pb-10'>
          <Typography as='h1' className='text-[24px]/8 tracking-normal' variant='title-md'>
            <IntlText path='page.pay.title' />
          </Typography>

          <form className='flex w-full flex-col items-start gap-6' onSubmit={onPay}>
            <div className='flex w-full flex-col items-start gap-4 rounded-24 bg-secondary p-6 sm:bg-transparent sm:p-0'>
              <div className='flex w-full flex-col'>
                <Typography as='p' className='text-foreground/50' variant='caption'>
                  <IntlText path='page.payment.serviceLabel' />
                </Typography>
                <div className='flex items-center gap-1'>
                  <span className='text-[22px]/[22px]'>🎮</span>
                  <Typography as='span' className='font-extrabold uppercase' variant='caption'>
                    GAMES
                  </Typography>
                </div>
              </div>

              <div className='flex w-full flex-col'>
                <Typography as='p' className='text-foreground/50' variant='caption'>
                  <IntlText path='page.payment.amountLabel' />
                </Typography>
                <Typography as='p' variant='body-lg'>
                  {formatMoney(search.amount)}
                </Typography>
              </div>

              {/* <div className='flex w-full flex-col'>
                <Typography as='p' className='text-foreground/50' variant='caption'>
                  <IntlText path='page.payment.orderNumberLabel' />
                </Typography>
                <Typography as='p' variant='body-sm'>
                  {search.orderNumber}
                </Typography>
              </div> */}
            </div>

            <div className='flex w-full flex-col gap-4'>
              <Typography as='h2' className='font-normal' variant='body-md'>
                <IntlText path='page.payment.savedCardsTitle' />
              </Typography>
              <button
                className='flex h-[71px] w-[130px] flex-col items-center rounded-12 bg-secondary p-2'
                type='button'
              >
                <span className='flex size-8 items-center justify-center rounded-full'>
                  <CirclePlusIcon className='size-5' strokeWidth={1.5} />
                </span>
                <Typography as='span' variant='caption'>
                  <IntlText path='button.newCard' />
                </Typography>
              </button>
            </div>

            <div className='flex w-full flex-col items-center gap-4 rounded-24 bg-secondary p-6'>
              <Controller
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className='text-[14px]/5.5 font-medium text-foreground'
                      htmlFor={field.name}
                    >
                      <IntlText path='field.cardNumber.label' />
                    </FieldLabel>
                    <Input
                      {...cardNumberMask.register({
                        onBlur: field.onBlur
                      })}
                      aria-invalid={fieldState.invalid}
                      className='h-10 bg-background text-[20px]/6 placeholder:text-input'
                      id={field.name}
                      inputMode='numeric'
                      name={field.name}
                      placeholder='0000 0000'
                    />
                    {fieldState.error?.message && (
                      <FieldError>
                        <IntlText path={fieldState.error.message as MessagePath} />
                      </FieldError>
                    )}
                  </Field>
                )}
                control={paymentForm.control}
                name='cardNumber'
              />

              <div className='grid w-full grid-cols-2 gap-6'>
                <Controller
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className='text-[14px]/5.5 font-medium text-foreground'
                        htmlFor={field.name}
                      >
                        <IntlText path='field.cardExpiry.label' />
                      </FieldLabel>
                      <Input
                        {...cardExpiryMask.register({
                          onBlur: field.onBlur
                        })}
                        aria-invalid={fieldState.invalid}
                        className='h-10 bg-background text-[20px]/6 placeholder:text-input'
                        id={field.name}
                        inputMode='numeric'
                        name={field.name}
                        placeholder='00/00'
                      />
                      {fieldState.error?.message && (
                        <FieldError>
                          <IntlText path={fieldState.error.message as MessagePath} />
                        </FieldError>
                      )}
                    </Field>
                  )}
                  control={paymentForm.control}
                  name='cardExpiry'
                />

                <Controller
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className='text-[14px]/5.5 font-medium text-foreground'
                        htmlFor={field.name}
                      >
                        <IntlText path='field.cardPin.label' />
                      </FieldLabel>
                      <Input
                        {...cardCvvMask.register({
                          onBlur: field.onBlur
                        })}
                        aria-invalid={fieldState.invalid}
                        className='h-10 bg-background text-[20px]/6 placeholder:text-input'
                        id={field.name}
                        inputMode='numeric'
                        name={field.name}
                        placeholder='0000'
                      />
                      {fieldState.error?.message && (
                        <FieldError>
                          <IntlText path={fieldState.error.message as MessagePath} />
                        </FieldError>
                      )}
                    </Field>
                  )}
                  control={paymentForm.control}
                  name='cardCvv'
                />
              </div>
            </div>

            <Button
              className='w-full'
              disabled={postGamesOrderMutation.isPending}
              size='lg'
              type='submit'
            >
              {postGamesOrderMutation.isPending && <Loader2Icon className='animate-spin' />}
              <IntlText
                path='page.payment.payAmount'
                values={{ amount: formatMoney(search.amount) }}
              />
            </Button>

            <Typography as='p' className='text-foreground/50' variant='caption'>
              <IntlText path='page.payment.disclaimer' />
            </Typography>
          </form>
        </section>
      </div>
    );
  }

  return (
    <section className='flex w-full flex-col gap-6 px-0 pt-6 pb-28 sm:max-w-162 sm:pt-14 sm:pb-10'>
      <Typography as='h1' className='text-[24px]/8 tracking-normal' variant='title-md'>
        <IntlText path='page.payment.title' />
      </Typography>

      <OrderCard>
        <div className='flex min-h-8 w-full items-center gap-4'>
          <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white'>
            <CheckIcon className='size-5' strokeWidth={3} />
          </span>
          <Typography as='p' className='min-w-0 flex-1' variant='body-lg'>
            <IntlText path='card.order.success' />
          </Typography>
        </div>

        {order.gameKey && (
          <div className='flex w-full flex-col'>
            <Typography as='p' className='w-full font-normal' variant='body-md'>
              <IntlText path='card.order.steamKeyLabel' />
            </Typography>
            <Typography as='p' className='w-full' variant='title-md'>
              {order.gameKey}
            </Typography>
          </div>
        )}

        <div className='flex w-full flex-col items-start gap-2'>
          <OrderCardHeader>
            <OrderCardThumbnail
              alt={order.gameSnapshot.name}
              src={getGameImageSrc(order.gameSnapshot.image)}
            />
            <OrderCardTitle>{order.gameSnapshot.name}</OrderCardTitle>
            <OrderCardSubtitle>{order.gameSnapshot.edition}</OrderCardSubtitle>
          </OrderCardHeader>

          <OrderCardBadges>
            <OrderCardBadge>
              <IntlText path='card.order.region' />
              <IntlText path={`region.${order.gameSnapshot.region}`} />
            </OrderCardBadge>
            <OrderCardBadge>
              <IntlText path={`deliveryType.${order.gameSnapshot.deliveryType}`} />
            </OrderCardBadge>
          </OrderCardBadges>
        </div>

        <OrderCardContent>
          <OrderCardField>
            <OrderCardFieldLabel>
              <IntlText path='card.order.emailLabel' />
            </OrderCardFieldLabel>
            <OrderCardFieldValue>{order.person.email}</OrderCardFieldValue>
          </OrderCardField>

          <OrderCardField>
            <OrderCardFieldLabel>
              <IntlText path='card.order.paymentMethodLabel' />
            </OrderCardFieldLabel>
            <OrderCardFieldValue>
              <IntlText path='card.order.paymentMethod' />
            </OrderCardFieldValue>
          </OrderCardField>

          <OrderCardField>
            <OrderCardFieldLabel>
              <IntlText path='card.order.amountLabel' />
            </OrderCardFieldLabel>
            <OrderCardFieldValue>{formatMoney(order.gameSnapshot.price)}</OrderCardFieldValue>
          </OrderCardField>
        </OrderCardContent>
      </OrderCard>

      {user && (
        <Button asChild className='w-full' size='lg'>
          <Link to='/'>
            <IntlText path='button.backToGamesCatalog' />
          </Link>
        </Button>
      )}
    </section>
  );
}
