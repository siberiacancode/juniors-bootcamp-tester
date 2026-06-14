type PaymentMethod = 'card' | 'jb-pay';

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
