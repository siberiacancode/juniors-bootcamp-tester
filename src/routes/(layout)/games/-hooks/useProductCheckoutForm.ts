import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const productCheckoutFormSchema = z.object({
  bindJbPay: z.boolean(),
  email: z.string().email('Введите корректную почту'),
  inviteLink: z.string(),
  paymentMethod: z.enum(['card', 'jb-pay']),
  payWithoutBinding: z.boolean(),
  phone: z.string().min(8, 'Поле обязательно для заполнения')
});

export type ProductCheckoutFormValues = z.infer<typeof productCheckoutFormSchema>;

const productCheckoutDefaultValues = {
  bindJbPay: false,
  email: '',
  inviteLink: '',
  paymentMethod: 'jb-pay',
  payWithoutBinding: true,
  phone: ''
} satisfies ProductCheckoutFormValues;

export const useProductCheckoutForm = () => {
  const form = useForm<ProductCheckoutFormValues>({
    defaultValues: productCheckoutDefaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(productCheckoutFormSchema),
    shouldUnregister: true
  });

  const handleSubmit = form.handleSubmit(() => undefined);

  return {
    form,
    handleSubmit
  };
};
