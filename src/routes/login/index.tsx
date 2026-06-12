import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronLeftIcon, Loader2Icon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { usePostAuthOtpMutation, usePostUsersSigninMutation } from '@/shared/api/generated';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { IconButton } from '@/shared/components/ui/icon-button';
import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';
import { useUser } from '@/shared/contexts/user';

import type { OtpFormScheme, PhoneFormScheme } from './-constants';

import { Countdown } from './-components/Countdown/Countdown';
import {
  loginCodeSearchSchema,
  otpFormScheme,
  phoneFormScheme,
  resolveLoginRedirect
} from './-constants';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
  validateSearch: loginCodeSearchSchema
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const user = useUser();

  const authOtpMutation = usePostAuthOtpMutation();
  const usersSigninMutation = usePostUsersSigninMutation();

  const phoneForm = useForm<PhoneFormScheme>({
    mode: 'onBlur',
    defaultValues: {
      phone: ''
    },
    resolver: zodResolver(phoneFormScheme)
  });

  const otpForm = useForm<OtpFormScheme>({
    mode: 'onBlur',
    defaultValues: {
      otp: ''
    },
    resolver: zodResolver(otpFormScheme)
  });

  const onPhoneSubmit = phoneForm.handleSubmit(async ({ phone }) => {
    const response = await authOtpMutation.mutateAsync({
      body: { phone }
    });

    await navigate({
      search: {
        phone,
        redirect: resolveLoginRedirect(search.redirect),
        retryAttempt: 0,
        retryDelay: response.data.retryDelay
      }
    });
  });

  const onOtpSubmit = otpForm.handleSubmit(async ({ otp }) => {
    const response = await usersSigninMutation.mutateAsync({
      body: {
        code: +otp,
        phone: search.phone!
      }
    });

    if (!response.data.success) {
      return otpForm.setError('otp', { message: response.data.reason });
    }

    user.set(response.data.user, response.data.token);

    await navigate({ to: resolveLoginRedirect(search.redirect) });
  });

  const onBack = () =>
    navigate({
      search: {
        redirect: search.redirect
      }
    });

  const onRetry = async () => {
    const response = await authOtpMutation.mutateAsync({
      body: { phone: search.phone! }
    });

    await navigate({
      search: {
        ...search,
        retryAttempt: (search.retryAttempt ?? 0) + 1,
        retryDelay: response.data.retryDelay
      }
    });
  };

  const isCodeStep = Boolean(search.phone);
  const isPhoneSubmitting = phoneForm.formState.isSubmitting;
  const isOtpSubmitting = otpForm.formState.isSubmitting;
  const isRetrying = authOtpMutation.isPending && isCodeStep;
  const isLoading = isCodeStep ? isOtpSubmitting || isRetrying : isPhoneSubmitting;

  return (
    <main className='min-h-dvh px-4 pt-10 sm:grid sm:place-items-center sm:px-6 sm:py-12'>
      <div className='flex w-full flex-col sm:max-w-76 sm:gap-10'>
        <div className='hidden text-center text-[16px]/6 font-extrabold tracking-wide sm:block'>
          🎮 GAMES
        </div>
        {isCodeStep ? (
          <form className='flex flex-col gap-4 sm:gap-4' onSubmit={onOtpSubmit}>
            <div className='flex flex-col gap-7 sm:gap-5'>
              <div className='flex flex-col gap-8 sm:gap-5'>
                <div className='relative flex items-center'>
                  <IconButton
                    rounded
                    aria-label='Вернуться к вводу телефона'
                    className='absolute left-0 size-10 -translate-x-2 sm:size-8 sm:-translate-x-1/2'
                    disabled={isLoading}
                    size='sm'
                    type='button'
                    variant='ghost'
                    onClick={onBack}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <Typography
                    as='h1'
                    className='pl-14 font-extrabold sm:w-full sm:pl-0 sm:text-center sm:font-bold'
                    variant='title-md'
                  >
                    Проверочный код
                  </Typography>
                </div>
                <Typography as='p' variant='body-sm'>
                  На указанный вами номер был
                  <br /> отправлен проверочный код
                </Typography>
              </div>
              <fieldset disabled={isLoading}>
                <Controller
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className='sr-only' htmlFor={field.name}>
                        Проверочный код
                      </FieldLabel>
                      <Input
                        {...field}
                        asChild
                        className='h-11 px-4 text-[18px] sm:h-13 sm:text-[24px]'
                        id={field.name}
                        placeholder='Проверочный код'
                      >
                        <PatternFormat format='######' />
                      </Input>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                  control={otpForm.control}
                  name='otp'
                />
              </fieldset>
            </div>
            <Button className='w-full' disabled={isLoading} size='lg' type='submit'>
              {isOtpSubmitting && <Loader2Icon className='animate-spin' />}
              Войти
            </Button>
            <Countdown
              key={search.retryAttempt}
              loading={isRetrying}
              retryDelay={search.retryDelay ?? 0}
              onRetry={onRetry}
            />
          </form>
        ) : (
          <form className='flex flex-col gap-10 sm:gap-6' onSubmit={onPhoneSubmit}>
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
              {isPhoneSubmitting && <Loader2Icon className='animate-spin' />}
              Продолжить
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}
