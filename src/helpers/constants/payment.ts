export const PAYMENT_METHOD = 'JB Карта';

export type PaymentMethod = 'card' | 'jb-pay';

export const PAYMENT_METHODS = ['card', 'jb-pay'] as const satisfies readonly PaymentMethod[];

export const paymentMethods: {
  label: string;
  value: PaymentMethod;
}[] = [
  {
    label: 'JB Pay',
    value: 'jb-pay'
  },
  {
    label: 'Картой',
    value: 'card'
  }
] as const;
