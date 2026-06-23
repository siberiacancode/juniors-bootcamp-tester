import z from 'zod';

import { PAYMENT_METHODS } from '@/helpers/constants';

export const gameCheckoutFormSchema = z.object({
  email: z.email('error.validation.email'),
  inviteLink: z.string(),
  paymentMethod: z.enum(PAYMENT_METHODS),
  phone: z.string().min(11, 'field.login.phone.required')
});

export type GameCheckoutFormValues = z.infer<typeof gameCheckoutFormSchema>;
