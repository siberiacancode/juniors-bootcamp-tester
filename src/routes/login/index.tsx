import type { ApicraftFetchesResponse } from '@siberiacancode/apicraft';

import { createFileRoute, redirect } from '@tanstack/react-router';
import { ChevronLeftIcon, Loader2Icon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { z } from 'zod';

import type { SessionResponse } from '@/generated/api';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { getUsersSessionQueryKey } from '@/generated/api';
import { queryClient } from '@/lib';
import { intl, IntlText } from '@/lib/intl';
import { cn } from '@/lib/utils';

import { Countdown } from './-components';
import { useLoginPage } from './-hooks';

const LoginPage = () => {
  const { state, features, form, functions } = useLoginPage();

  return (
    <section className='min-h-dvh px-4 sm:grid sm:place-items-center sm:px-6 sm:py-12'>
      <div className='flex w-full flex-col sm:max-w-85 sm:gap-12'>
        <div className='hidden text-center text-[16px]/6 font-extrabold sm:block'>🎮 GAMES</div>
        <form className='flex flex-col gap-6 sm:gap-4' onSubmit={functions.onSubmit}>
          <div className='flex flex-col gap-6 sm:gap-5'>
            <div className='flex flex-col gap-6 sm:gap-5'>
              {state.isCodeStep ? (
                <div className='flex items-center gap-6 py-3 sm:py-0'>
                  <IconButton
                    rounded
                    className='size-6'
                    disabled={state.isLoading}
                    size='sm'
                    type='button'
                    variant='ghost'
                    onClick={functions.onBack}
                  >
                    <ChevronLeftIcon className='size-6' />
                  </IconButton>
                  <Typography as='h1' variant='title-md'>
                    <IntlText path='page.login.otp.title' />
                  </Typography>
                </div>
              ) : (
                <div className='py-3 sm:py-0'>
                  <Typography as='h1' className='sm:text-center' variant='title-md'>
                    <IntlText path='page.login.phone.title' />
                  </Typography>
                </div>
              )}
              <Typography as='p' className='tracking-normal' variant='body-sm'>
                {state.isCodeStep ? (
                  <IntlText path='page.login.otp.description' />
                ) : (
                  <IntlText path='page.login.phone.description' />
                )}
              </Typography>
            </div>
            <fieldset className='pb-2' disabled={state.isLoading}>
              {!state.isCodeStep && (
                <Controller
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className='sr-only' htmlFor={field.name}>
                        <IntlText path='field.login.phone.label' />
                      </FieldLabel>
                      <Input
                        autoComplete='off'
                        {...features.phoneMask.register({
                          onBlur: field.onBlur
                        })}
                        id={field.name}
                        name={field.name}
                        placeholder='+7'
                      />
                      {fieldState.error?.message && (
                        <FieldError>
                          <IntlText path={fieldState.error.message as MessagePath} />
                        </FieldError>
                      )}
                    </Field>
                  )}
                  control={form.control}
                  name='phone'
                />
              )}

              {state.isCodeStep && (
                <Controller
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className='sr-only' htmlFor={field.name}>
                        <IntlText path='field.login.otp.label' />
                      </FieldLabel>
                      <Input
                        {...features.otpMask.register({
                          onBlur: field.onBlur
                        })}
                        id={field.name}
                        name={field.name}
                        placeholder={intl.formatMessage({ id: 'field.login.otp.placeholder' })}
                      />
                      {fieldState.error?.message && (
                        <FieldError>
                          <IntlText path={fieldState.error.message as MessagePath} />
                        </FieldError>
                      )}
                    </Field>
                  )}
                  control={form.control}
                  name='otp'
                />
              )}
            </fieldset>
          </div>
          <div className={cn('flex flex-col gap-2.5 py-4 sm:py-0', state.isCodeStep && 'pb-0')}>
            <Button disabled={state.isLoading} size='lg' type='submit'>
              {state.isLoading && <Loader2Icon className='animate-spin' />}
              <IntlText path={state.isCodeStep ? 'button.login' : 'button.submitPhone'} />
            </Button>
            {state.isCodeStep && state.submittedPhone && (
              <Countdown
                loading={state.isRetrying}
                retryAt={state.submittedPhone}
                onRetry={functions.onRetry}
              />
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch('')
});

export const Route = createFileRoute('/login/')({
  component: LoginPage,
  validateSearch: loginSearchSchema,
  beforeLoad: () => {
    const usersSessionResponse = queryClient.getQueryData<ApicraftFetchesResponse<SessionResponse>>(
      [getUsersSessionQueryKey]
    );
    const user = usersSessionResponse?.data.user;

    if (user) {
      throw redirect({
        to: '/'
      });
    }
  }
});
