import type { PaymentMethod } from '@/helpers/constants';

const PAYMENT_URL = import.meta.env.VITE_PAYMENT_URL || 'http://localhost:3000/tasks/api/payment';

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
  type: PaymentMethod;
}) => {
  const paymentUrl = new URL(PAYMENT_URL);

  paymentUrl.searchParams.set('transactionId', transactionId);
  paymentUrl.searchParams.set('type', type);
  if (backUrl) paymentUrl.searchParams.set('backUrl', backUrl);
  if (cardId) paymentUrl.searchParams.set('cardId', cardId);
  if (panmask) paymentUrl.searchParams.set('panmask', panmask);

  return paymentUrl.toString();
};

export const getPaymentBackUrl = (orderId: string) => {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

  return new URL(`${basePath}/payment?orderId=${orderId}`, window.location.origin).toString();
};
