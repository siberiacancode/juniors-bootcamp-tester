import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { Loader2Icon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { usePostAuthOtpMutation } from '@/shared/api/generated';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';

import type { PhoneFormScheme } from './-constants';

import { AuthShell } from './-components/AuthShell/AuthShell';
import { phoneFormScheme, resolveLoginRedirect } from './-constants';

export const Route = createFileRoute('/login/')({
  component: RouteComponent
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const authOtpMutation = usePostAuthOtpMutation();

  const phoneForm = useForm<PhoneFormScheme>({
    mode: 'onBlur',
    defaultValues: {
      phone: ''
    },
    resolver: zodResolver(phoneFormScheme)
  });

  const onSubmit = phoneForm.handleSubmit(async ({ phone }) => {
    const response = await authOtpMutation.mutateAsync({
      body: { phone }
    });

    await navigate({
      to: '/login/code',
      search: {
        phone,
        redirect: resolveLoginRedirect(search.redirect),
        retryAttempt: 0,
        retryDelay: response.data.retryDelay
      }
    });
  });

  const isLoading = phoneForm.formState.isSubmitting;

  return (
    <AuthShell>
      <form className='flex flex-col gap-10 sm:gap-6' onSubmit={onSubmit}>
        <div className='flex flex-col gap-7 sm:gap-5'>
          <div className='flex flex-col gap-8 sm:gap-5'>
            <Typography as='h1' className='font-extrabold sm:text-center' variant='title-md'>
              Авторизация
            </Typography>
            <Typography as='p' variant='body-sm'>
              Введите номер телефона для входа
              <br /> в свой профиль
            </Typography>
          </div>
          <fieldset disabled={isLoading}>
            <Controller
              render={({ field: { onChange, value, ...restField }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className='sr-only' htmlFor={restField.name}>
                    Телефон
                  </FieldLabel>
                  <Input
                    {...restField}
                    asChild
                    className='h-11 px-4 text-[18px] sm:h-13 sm:text-[24px]'
                    id={restField.name}
                    placeholder='+7'
                    value={value.substring(1)}
                    onChange={(event) =>
                      onChange(event.target.value.replace('+', '').replace(/ /g, ''))
                    }
                  >
                    <PatternFormat format='+7 ### ### ## ##' />
                  </Input>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
              control={phoneForm.control}
              name='phone'
            />
          </fieldset>
        </div>
        <Button className='w-full' disabled={isLoading} size='lg' type='submit'>
          {isLoading && <Loader2Icon className='animate-spin' />}
          Продолжить
        </Button>
      </form>
    </AuthShell>
  );
}
