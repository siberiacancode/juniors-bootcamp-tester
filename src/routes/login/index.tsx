import type { ApicraftFetchesResponse } from '@siberiacancode/apicraft';

import { Button, IconButton, Input, Typography } from '@siberiacancode/uikit';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { ChevronLeftIcon, Loader2Icon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { z } from 'zod';

import type { GetProfileResponse } from '@/generated/api';

import { LogoIcon } from '@/components/icons';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { getUsersProfileQueryKey } from '@/generated/api';
import { TESTIDS } from '@/generated/tests/ids.gen';
import { LINKS } from '@/utils/constants';
import { queryClient } from '@/utils/lib';
import { intl, IntlText } from '@/utils/lib/intl';
import { cn } from '@/utils/lib/utils';

import { Countdown } from './-components';
import { useLoginPage } from './-hooks';

export const LoginPage = () => {
  const { state, features, form, functions } = useLoginPage();

  return (
    <section
      className='min-h-dvh px-4 sm:grid sm:place-items-center sm:px-6 sm:py-12'
      data-testid={TESTIDS.STATIC.PAGE.LOGIN.SELF_ID}
    >
      <div className='flex w-full flex-col sm:max-w-85 sm:gap-12'>
        <div className='relative mt-3 flex h-6 items-center justify-center sm:mt-0'>
          <IconButton
            aria-label='Вернуться на главную'
            asChild={!state.isCodeStep}
            className='absolute left-0 size-6'
            data-testid={TESTIDS.CLICKABLE.BUTTON.BACK}
            size='sm'
            variant='ghost'
            {...(state.isCodeStep && {
              disabled: state.isLoading,
              type: 'button',
              onClick: functions.onBack
            })}
          >
            {!state.isCodeStep ? (
              <Link to='/'>
                <ChevronLeftIcon className='size-6' />
              </Link>
            ) : (
              <ChevronLeftIcon className='size-6' />
            )}
          </IconButton>

          <Link
            className='inline-flex items-center gap-1 text-center text-[16px]/6 font-extrabold tracking-wide'
            data-testid={TESTIDS.CLICKABLE.LINK.HOME}
            to='/'
          >
            <LogoIcon aria-hidden='true' className='h-[19px] w-6 shrink-0' />
            GAMES
          </Link>
        </div>
        <form className='flex flex-col gap-6 sm:gap-4' onSubmit={functions.onSubmit}>
          <div className='flex flex-col gap-6 sm:gap-5'>
            <div className='flex flex-col gap-6 sm:gap-5'>
              {state.isCodeStep ? (
                <div className='flex items-center gap-6 py-3 sm:py-0'>
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
                    <Field
                      data-invalid={fieldState.invalid}
                      data-testid={`${TESTIDS.CHANGEABLE.INPUT.PHONE}-field`}
                    >
                      <FieldLabel className='sr-only' htmlFor={field.name}>
                        <IntlText path='field.login.phone.label' />
                      </FieldLabel>
                      <Input
                        autoComplete='off'
                        {...features.phoneMask.register({
                          onBlur: field.onBlur
                        })}
                        data-testid={TESTIDS.CHANGEABLE.INPUT.PHONE}
                        id={field.name}
                        name={field.name}
                        placeholder='+7'
                      />
                      {fieldState.error?.message && (
                        <FieldError data-testid={`${TESTIDS.CHANGEABLE.INPUT.PHONE}-error`}>
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
                    <Field
                      data-invalid={fieldState.invalid}
                      data-testid={`${TESTIDS.CHANGEABLE.INPUT.OTP}-field`}
                    >
                      <FieldLabel className='sr-only' htmlFor={field.name}>
                        <IntlText path='field.login.otp.label' />
                      </FieldLabel>
                      <Input
                        {...features.otpMask.register({
                          onBlur: field.onBlur,
                          onChange: () => form.clearErrors('otp')
                        })}
                        data-testid={TESTIDS.CHANGEABLE.INPUT.OTP}
                        id={field.name}
                        name={field.name}
                        placeholder={intl.formatMessage({ id: 'field.login.otp.placeholder' })}
                      />
                      {fieldState.error?.message && (
                        <FieldError data-testid={`${TESTIDS.CHANGEABLE.INPUT.OTP}-error`}>
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
          <div
            className={cn('flex flex-col gap-2.5 py-4 sm:py-0', state.isCodeStep && 'gap-4 pb-0')}
          >
            <Button
              data-testid={TESTIDS.CLICKABLE.BUTTON.SUBMIT}
              disabled={state.isLoading}
              size='lg'
              type='submit'
            >
              {state.isLoading && <Loader2Icon className='animate-spin' />}
              <IntlText path={state.isCodeStep ? 'button.login' : 'button.submitPhone'} />
            </Button>
            {state.isCodeStep && state.submittedPhone && (
              <Countdown
                loading={state.isLoading}
                retryAt={state.submittedPhone}
                onRetry={functions.onRetry}
              />
            )}
            {state.isCodeStep && (
              <Typography
                as='p'
                className='w-full text-left tracking-[0.005em] text-[#969696]'
                variant='caption'
              >
                <IntlText
                  values={{
                    otpCodesLink: (chunks) => (
                      <a
                        className='underline decoration-[5%] underline-offset-[16%]'
                        data-testid={TESTIDS.CLICKABLE.LINK.OTP_CODES}
                        href={LINKS.OTP_CODES}
                        rel='noreferrer'
                        target='_blank'
                      >
                        {chunks}
                      </a>
                    )
                  }}
                  path='page.login.otp.legal'
                />
              </Typography>
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
    const usersProfileResponse = queryClient.getQueryData<
      ApicraftFetchesResponse<GetProfileResponse>
    >([getUsersProfileQueryKey]);

    if (usersProfileResponse?.data.success && usersProfileResponse.data.user) {
      throw redirect({
        to: '/'
      });
    }
  }
});
