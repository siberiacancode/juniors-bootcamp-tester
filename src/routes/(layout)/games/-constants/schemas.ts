import z from 'zod';

import { DELIVERY_TYPES, PAYMENT_METHODS, REGIONS } from '@/helpers/constants';
import { intl } from '@/lib';

export const productCheckoutFormSchema = z.object({
  bindJbPay: z.boolean(),
  email: z.string().email(intl.formatMessage({ id: 'error.validation.email' })),
  inviteLink: z.string(),
  paymentMethod: z.enum(PAYMENT_METHODS),
  payWithoutBinding: z.boolean(),
  phone: z.string().min(11, intl.formatMessage({ id: 'field.login.phone.required' }))
});

export type ProductCheckoutFormValues = z.infer<typeof productCheckoutFormSchema>;

export const gameProductSearchSchema = z.object({
  deliveryType: z.enum(DELIVERY_TYPES).optional().catch(undefined),
  region: z.enum(REGIONS).optional().catch(undefined),
  edition: z.string().optional().catch(undefined)
});
