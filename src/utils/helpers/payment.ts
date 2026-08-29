import { TransactionPayMethod } from '@/generated/api';

type PaymentServiceMethod =
  | typeof TransactionPayMethod.NEW_CARD
  | typeof TransactionPayMethod.QR
  | typeof TransactionPayMethod.SAVED_CARD;

export interface GetPaymentServiceUrlParams {
  backUrl?: string;
  cardId?: string;
  panmask?: string;
  transactionId: string;
  type: PaymentServiceMethod;
}

export const getPaymentServiceUrl = ({
  backUrl,
  cardId,
  panmask,
  transactionId,
  type
}: GetPaymentServiceUrlParams) => {
  const paymentUrl = new URL(import.meta.env.VITE_PAYMENT_URL);
  const paymentServiceType = type === TransactionPayMethod.QR ? type : 'card';

  paymentUrl.searchParams.set('transactionId', transactionId);
  paymentUrl.searchParams.set('type', paymentServiceType);
  if (backUrl) paymentUrl.searchParams.set('backUrl', backUrl);
  if (cardId) paymentUrl.searchParams.set('cardId', cardId);
  if (panmask) paymentUrl.searchParams.set('panmask', panmask);

  return paymentUrl.toString();
};

export const getPaymentBackUrl = (orderId: string) =>
  new URL(
    `${import.meta.env.BASE_URL}payment?orderId=${orderId}`,
    window.location.origin
  ).toString();
