export type PaymentMethod = 'card' | 'jb-pay';

export const paymentMethods = [
  {
    label: 'JB Pay',
    value: 'jb-pay'
  },
  {
    label: 'Картой',
    value: 'card'
  }
] as const satisfies Array<{
  label: string;
  value: PaymentMethod;
}>;
