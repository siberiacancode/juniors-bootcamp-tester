import z from 'zod';

import { TransactionPayMethod } from '@/generated/api';

export const gameCheckoutFormSchema = z.object({
  email: z.email('error.validation.email'),
  inviteLink: z.string(),
  paymentMethod: z.enum([
    TransactionPayMethod.NEW_CARD,
    TransactionPayMethod.SAVED_CARD,
    TransactionPayMethod.QR
  ]),
  savedCardId: z.string().optional(),
  phone: z.string().min(11, 'field.login.phone.required')
});

export type GameCheckoutFormValues = z.infer<typeof gameCheckoutFormSchema>;
