import { zodResolver } from '@hookform/resolvers/zod';
import { useDidUpdate } from '@siberiacancode/reactuse';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import z from 'zod';

import { usePostAuthOtpMutation, usePostUsersSigninMutation } from '@/shared/api/generated';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';
import { LOCAL_STORAGE_KEYS } from '@/shared/constants';
import { useUser } from '@/shared/contexts/user';

import type { OtpFormScheme, PhoneFormScheme } from './-constants';

import { Countdown } from './-components/Countdown';
import { LENGTH, otpFormScheme, phoneFormScheme } from './-constants';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional().catch('')
  }),
  beforeLoad: ({ context, search }) => {
    if (context.user.isLoggedIn) {
      throw redirect({ to: search.redirect ?? '/' });
    }
  }
});

function RouteComponent() {
  const [stage, setStage] = useState<'otp' | 'phone'>('phone');
  const [submittedPhones, setSubmittedPhones] = useState<{
    [key: string]: number;
  }>({});

  const authForm = useForm<OtpFormScheme | PhoneFormScheme>({
    mode: 'onBlur',
    defaultValues: {
      phone: '',
      otp: ''
    },
    resolver: zodResolver(stage === 'phone' ? phoneFormScheme : otpFormScheme)
  });

  const phone = authForm.watch('phone');

  useDidUpdate(() => {
    if (phone.length < LENGTH.PHONE || !submittedPhones[phone]) setStage('phone');
    if (submittedPhones[phone] > Date.now()) setStage('otp');
  }, [phone]);

  const authOtpMutation = usePostAuthOtpMutation();
  const usersSigninMutation = usePostUsersSigninMutation();

  const { setUser } = useUser();

  const sendOtp = async (phone: string) => {
    const postAuthOptMutationResponse = await authOtpMutation.mutateAsync({
      body: { phone }
    });

    setSubmittedPhones({
      ...submittedPhones,
      [phone]: Date.now() + postAuthOptMutationResponse.data.retryDelay
    });
  };

  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const onSubmit = authForm.handleSubmit(async (values) => {
    if (stage === 'phone' && 'phone' in values) {
      await sendOtp(values.phone);
      setStage('otp');
      return;
    }

    if (stage === 'otp' && 'otp' in values) {
      const response = await usersSigninMutation.mutateAsync({
        body: {
          code: +values.otp,
          phone
        }
      });

      if (!response.data.success) {
        return authForm.setError('otp', { message: response.data.reason });
      }

      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, response.data.token);
      setUser(response.data.user);

      await navigate({ to: search.redirect ?? '/' });
    }
  });

  const isLoading = authForm.formState.isSubmitting;

  const onRetry = () => sendOtp(phone);

  return (
    <main className='grid h-screen place-items-center'>
      <div className='flex flex-col gap-12'>
        <div className='text-center text-[16px]/6 font-extrabold tracking-wide'>🎮 GAMES</div>
        <form className='flex flex-col gap-6' onSubmit={onSubmit}>
          <fieldset className='flex flex-col gap-4' disabled={isLoading}>
            <div>
              <Typography as='h1' className='text-center' variant='title-md'>
                Авторизация
              </Typography>
            </div>

            <Typography as='p' variant='body-sm'>
              Введите {stage === 'phone' ? 'номер телефона' : 'проверочный код'} для входа
              <br /> в свой профиль
            </Typography>

            <Controller
              render={({ field: { onChange, value, ...restField }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={restField.name}>Телефон</FieldLabel>
                  <Input
                    {...restField}
                    asChild
                    id={restField.name}
                    placeholder='Телефон'
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
              control={authForm.control}
              name='phone'
            />

            {stage === 'otp' && (
              <Controller
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Проверочный код</FieldLabel>
                    <Input {...field} asChild id={field.name} placeholder='Введите код'>
                      <PatternFormat format='#######' />
                    </Input>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
                control={authForm.control}
                name='otp'
              />
            )}
          </fieldset>

          <div className='flex flex-col gap-4'>
            <Button className='w-full' disabled={isLoading} size='lg' type='submit'>
              {isLoading && <Loader2Icon className='animate-spin' />}
              {stage === 'otp' ? 'Войти' : 'Продолжить'}
            </Button>

            {stage === 'otp' && submittedPhones[phone] && (
              <Countdown endTime={submittedPhones[phone]} loading={isLoading} onRetry={onRetry} />
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
