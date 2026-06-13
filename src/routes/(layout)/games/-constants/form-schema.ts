import z from 'zod';

export const productCheckoutFormSchema = z.object({
  bindJbPay: z.boolean(),
  email: z.string().email('Введите корректную почту'),
  inviteLink: z.string(),
  paymentMethod: z.enum(['card', 'jb-pay']),
  payWithoutBinding: z.boolean(),
  phone: z.string().min(11, 'Поле обязательно для заполнения')
});

export type ProductCheckoutFormValues = z.infer<typeof productCheckoutFormSchema>;
