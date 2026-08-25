import { TransactionPayMethod } from '@/generated/api';

const PAYMENT_URL = import.meta.env.VITE_PAYMENT_URL || 'http://localhost:3000/tasks/api/payment';

type PaymentServiceMethod =
  | typeof TransactionPayMethod.NEW_CARD
  | typeof TransactionPayMethod.QR
  | typeof TransactionPayMethod.SAVED_CARD;

export const getPaymentServiceUrl = ({
  backUrl,
  cardId,
  panmask,
  transactionId,
  type
}: {
  backUrl?: string;
  cardId?: string;
  panmask?: string;
  transactionId: string;
  type: PaymentServiceMethod;
}) => {
  const paymentUrl = new URL(PAYMENT_URL);
  const paymentServiceType = type === TransactionPayMethod.QR ? type : 'card';

  paymentUrl.searchParams.set('transactionId', transactionId);
  paymentUrl.searchParams.set('type', paymentServiceType);
  if (backUrl) paymentUrl.searchParams.set('backUrl', backUrl);
  if (cardId) paymentUrl.searchParams.set('cardId', cardId);
  if (panmask) paymentUrl.searchParams.set('panmask', panmask);

  return paymentUrl.toString();
};

export const getPaymentBackUrl = (orderId: string) => {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

  return new URL(`${basePath}/payment?orderId=${orderId}`, window.location.origin).toString();
};
