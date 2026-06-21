export const PAYMENT_METHODS = [
  // 'jb-pay',
  'card'
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
