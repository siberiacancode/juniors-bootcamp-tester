import { createFileRoute, redirect } from '@tanstack/react-router';
import { ChevronLeftIcon, Loader2Icon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { getUsersSessionQueryOptions } from '@/generated/api';
import { intl, IntlText } from '@/lib/intl';
import { cn } from '@/lib/utils';

import { Countdown } from './-components';
import { useLoginForm } from './-hooks';

export const Route = createFileRoute('/login/')({
  component: LoginPage,
  validateSearch: z.object({
    redirect: z.string().optional().catch('')
  }),
  beforeLoad: async ({ context: { queryClient }, search }) => {
    const user = (await queryClient.ensureQueryData(getUsersSessionQueryOptions())).data.user;

    if (user) {
      throw redirect({ to: search.redirect ?? '/', replace: true });
    }
  }
});

function LoginPage() {
  const { mask, control, action, isLoading, isRetrying, isCodeStep, otpRetryAtByPhone } =
    useLoginForm();

  return (
    <section className='min-h-dvh px-4 sm:grid sm:place-items-center sm:px-6 sm:py-12'>
      <div className='flex w-full flex-col sm:max-w-70 sm:gap-12'>
        <div className='hidden text-center text-[16px]/6 font-extrabold sm:block'>🎮 GAMES</div>
        <form className='flex flex-col gap-6 sm:gap-4' onSubmit={action.onSubmit}>
          <div className='flex flex-col gap-6 sm:gap-5'>
            <div className='flex flex-col gap-6 sm:gap-5'>
              {isCodeStep ? (
                <div className='flex items-center gap-6 py-3 sm:py-0'>
                  <IconButton
                    rounded
                    className='size-6'
                    disabled={isLoading}
                    size='sm'
                    type='button'
                    variant='ghost'
                    onClick={action.onBack}
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
                {isCodeStep ? (
                  <IntlText path='page.login.otp.description' />
                ) : (
                  <IntlText path='page.login.phone.description' />
                )}
              </Typography>
            </div>
            <fieldset className='pb-2' disabled={isLoading}>
              {!isCodeStep && (
                <Controller
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className='sr-only' htmlFor={field.name}>
                        <IntlText path='field.login.phone.label' />
                      </FieldLabel>
                      <Input
                        {...mask.phone.register({
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
                  control={control}
                  name='phone'
                />
              )}

              {isCodeStep && (
                <Controller
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className='sr-only' htmlFor={field.name}>
                        <IntlText path='field.login.otp.label' />
                      </FieldLabel>
                      <Input
                        {...mask.otp.register({
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
                  control={control}
                  name='otp'
                />
              )}
            </fieldset>
          </div>
          <div className={cn('flex flex-col gap-2.5 py-4 sm:py-0', isCodeStep && 'pb-0')}>
            <Button disabled={isLoading} size='lg' type='submit'>
              {isLoading && <Loader2Icon className='animate-spin' />}
              <IntlText path={isCodeStep ? 'button.login' : 'button.submitPhone'} />
            </Button>
            {isCodeStep && otpRetryAtByPhone && (
              <Countdown
                loading={isRetrying}
                retryAt={otpRetryAtByPhone}
                onRetry={action.onRetry}
              />
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
