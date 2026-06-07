import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, redirect } from '@tanstack/react-router';
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

import type { OtpFormScheme } from './-constants';

import { AuthShell } from './-components/AuthShell/AuthShell';
import { Countdown } from './-components/Countdown/Countdown';
import { loginCodeSearchSchema, otpFormScheme, resolveLoginRedirect } from './-constants';

export const Route = createFileRoute('/login/code')({
  component: RouteComponent,
  validateSearch: loginCodeSearchSchema,
  beforeLoad: ({ search }) => {
    if (!search.phone) {
      throw redirect({
        to: '/login',
        search: {
          redirect: search.redirect
        }
      });
    }
  }
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const user = useUser();

  const authOtpMutation = usePostAuthOtpMutation();
  const usersSigninMutation = usePostUsersSigninMutation();

  const otpForm = useForm<OtpFormScheme>({
    mode: 'onBlur',
    defaultValues: {
      otp: ''
    },
    resolver: zodResolver(otpFormScheme)
  });

  const onSubmit = otpForm.handleSubmit(async ({ otp }) => {
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
      to: '/login',
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

  const isSubmitting = otpForm.formState.isSubmitting;
  const isRetrying = authOtpMutation.isPending;
  const isLoading = isSubmitting || isRetrying;

  return (
    <AuthShell>
      <form className='flex flex-col gap-4 sm:gap-4' onSubmit={onSubmit}>
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
          {isSubmitting && <Loader2Icon className='animate-spin' />}
          Войти
        </Button>
        <Countdown
          key={search.retryAttempt}
          loading={isRetrying}
          retryDelay={search.retryDelay ?? 0}
          onRetry={onRetry}
        />
      </form>
    </AuthShell>
  );
}
