import { expect, it } from 'vitest';

import { TransactionPayMethod } from '@/generated/api';

import { getPaymentBackUrl, getPaymentServiceUrl } from './payment';

it('Should build payment service url for qr payment', () => {
  const paymentUrl = new URL(
    getPaymentServiceUrl({
      transactionId: 'transaction-1',
      type: TransactionPayMethod.QR
    })
  );

  expect(paymentUrl.pathname).toBe('/tasks/api/payment');
  expect(paymentUrl.searchParams.get('transactionId')).toBe('transaction-1');
  expect(paymentUrl.searchParams.get('type')).toBe(TransactionPayMethod.QR);
});

it('Should build payment service url for card payment with optional params', () => {
  const paymentUrl = new URL(
    getPaymentServiceUrl({
      backUrl: 'https://example.com/payment?orderId=order-1',
      cardId: 'card-1',
      panmask: '2200 **** **** 1234',
      transactionId: 'transaction-2',
      type: TransactionPayMethod.SAVED_CARD
    })
  );

  expect(paymentUrl.searchParams.get('transactionId')).toBe('transaction-2');
  expect(paymentUrl.searchParams.get('type')).toBe('card');
  expect(paymentUrl.searchParams.get('backUrl')).toBe(
    'https://example.com/payment?orderId=order-1'
  );
  expect(paymentUrl.searchParams.get('cardId')).toBe('card-1');
  expect(paymentUrl.searchParams.get('panmask')).toBe('2200 **** **** 1234');
});

it('Should build payment service url for new card payment', () => {
  const paymentUrl = new URL(
    getPaymentServiceUrl({
      transactionId: 'transaction-3',
      type: TransactionPayMethod.NEW_CARD
    })
  );

  expect(paymentUrl.searchParams.get('type')).toBe('card');
  expect(paymentUrl.searchParams.has('cardId')).toBe(false);
  expect(paymentUrl.searchParams.has('panmask')).toBe(false);
});

it('Should build payment back url from current origin and base url', () => {
  const paymentBackUrl = new URL(getPaymentBackUrl('order-1'));

  expect(paymentBackUrl.origin).toBe(window.location.origin);
  expect(paymentBackUrl.pathname).toBe('/payment');
  expect(paymentBackUrl.searchParams.get('orderId')).toBe('order-1');
});
