import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { ProductCheckoutFormValues } from '../-constants';

import { productCheckoutFormSchema } from '../-constants';

const productCheckoutDefaultValues: ProductCheckoutFormValues = {
  bindJbPay: false,
  email: '',
  inviteLink: '',
  paymentMethod: 'jb-pay',
  payWithoutBinding: true,
  phone: ''
};

export const useProductCheckoutForm = () => {
  const form = useForm<ProductCheckoutFormValues>({
    defaultValues: productCheckoutDefaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(productCheckoutFormSchema),
    shouldUnregister: true
  });

  // TODO: Подключить api
  const handleSubmit = form.handleSubmit((data) => console.log(data));

  return {
    form,
    handleSubmit
  };
};
