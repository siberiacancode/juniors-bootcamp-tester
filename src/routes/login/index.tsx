import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { ChevronLeftIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { usePostAuthOtpMutation, usePostUsersSigninMutation } from '@/generated/api';

import { Countdown } from './-components/Countdown/Countdown';
import {
  loginSearchSchema,
  otpFormScheme,
  phoneFormScheme,
  resolveLoginRedirect
} from './-constants';

interface AuthFormValues {
  otp: string;
  phone: string;
}

const LENGTH = {
  PHONE: 11
} as const;

const RouteComponent = () => {
  const search = useSearch({
    from: '/login/'
  });
  const navigate = useNavigate();

  const [stage, setStage] = useState<'otp' | 'phone'>('phone');
  const [submittedPhones, setSubmittedPhones] = useState<Record<string, number>>({});

  const authOtpMutation = usePostAuthOtpMutation();
  const usersSigninMutation = usePostUsersSigninMutation();

  const authForm = useForm<AuthFormValues>({
    mode: 'onBlur',
    defaultValues: {
      phone: '',
      otp: ''
    },
    resolver: zodResolver(stage === 'phone' ? phoneFormScheme : otpFormScheme) as never
  });

  const phone =
    useWatch({
      control: authForm.control,
      name: 'phone'
    }) ?? '';

  const sendOtp = async (nextPhone: string) => {
    const response = await authOtpMutation.mutateAsync({
      body: { phone: nextPhone }
    });

    setSubmittedPhones((currentPhones) => ({
      ...currentPhones,
      [nextPhone]: Date.now() + response.data.retryDelay
    }));
  };

  const onSubmit = authForm.handleSubmit(async (values) => {
    if (stage === 'phone') {
      await sendOtp(values.phone);
      setStage('otp');
      return;
    }

    const response = await usersSigninMutation.mutateAsync({
      body: {
        code: +values.otp,
        phone
      }
    });

    if (!response.data.success) {
      return authForm.setError('otp', { message: response.data.reason });
    }

    await navigate({ to: resolveLoginRedirect(search.redirect) });
  });

  const onBack = () => {
    authForm.resetField('otp');
    authForm.clearErrors('otp');
    setStage('phone');
  };

  const onRetry = async () => {
    await sendOtp(phone);
    authForm.resetField('otp');
    authForm.clearErrors('otp');
  };

  const isCodeStep = stage === 'otp';
  const isSubmitting = authForm.formState.isSubmitting;
  const isRetrying = authOtpMutation.isPending && isCodeStep;
  const isOtpSubmitting = usersSigninMutation.isPending;
  const isLoading = isSubmitting || isRetrying || isOtpSubmitting;

  return (
    <main className='min-h-dvh px-4 pt-10 sm:grid sm:place-items-center sm:px-6 sm:py-12'>
      <div className='flex w-full flex-col sm:max-w-76 sm:gap-10'>
        <div className='hidden text-center text-[16px]/6 font-extrabold tracking-wide sm:block'>
          🎮 GAMES
        </div>
        <form
          className={`flex flex-col ${isCodeStep ? 'gap-4 sm:gap-4' : 'gap-10 sm:gap-6'}`}
          onSubmit={onSubmit}
        >
          <div className='flex flex-col gap-7 sm:gap-5'>
            <div className='flex flex-col gap-8 sm:gap-5'>
              {isCodeStep ? (
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
              ) : (
                <Typography as='h1' className='font-extrabold sm:text-center' variant='title-md'>
                  Авторизация
                </Typography>
              )}
              <Typography as='p' variant='body-sm'>
                {isCodeStep ? (
                  <>
                    На указанный вами номер был
                    <br /> отправлен проверочный код
                  </>
                ) : (
                  <>
                    Введите номер телефона для входа
                    <br /> в свой профиль
                  </>
                )}
              </Typography>
            </div>
            <fieldset disabled={isLoading}>
              {!isCodeStep && (
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
                        onChange={(event) => {
                          const nextPhone = event.target.value.replace('+', '').replace(/ /g, '');

                          onChange(nextPhone);

                          if (nextPhone.length < LENGTH.PHONE || !submittedPhones[nextPhone]) {
                            setStage('phone');
                          }
                        }}
                      >
                        <PatternFormat format='+7 ### ### ## ##' />
                      </Input>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                  control={authForm.control}
                  name='phone'
                />
              )}

              {isCodeStep && (
                <Controller
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className='sr-only' htmlFor={field.name}>
                        Проверочный код
                      </FieldLabel>
                      <Input
                        asChild
                        className='h-11 px-4 text-[18px] sm:h-13 sm:text-[24px]'
                        id={field.name}
                        placeholder='Проверочный код'
                      >
                        <PatternFormat
                          key='otp'
                          format='######'
                          getInputRef={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          onValueChange={({ value }) => field.onChange(value)}
                        />
                      </Input>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                  control={authForm.control}
                  name='otp'
                />
              )}
            </fieldset>
          </div>
          <Button className='w-full' disabled={isLoading} size='lg' type='submit'>
            {isLoading && <Loader2Icon className='animate-spin' />}
            {isCodeStep ? 'Войти' : 'Продолжить'}
          </Button>
          {isCodeStep && submittedPhones[phone] && (
            <Countdown loading={isRetrying} retryAt={submittedPhones[phone]} onRetry={onRetry} />
          )}
        </form>
      </div>
    </main>
  );
};

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
  validateSearch: loginSearchSchema
});
