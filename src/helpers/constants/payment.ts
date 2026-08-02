export const PAYMENT_METHODS = [
  'card',
  'qr'
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
