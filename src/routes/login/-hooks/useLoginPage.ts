import { zodResolver } from '@hookform/resolvers/zod';
import { useMask } from '@siberiacancode/reactuse';
import { useQueryClient } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  getUsersProfileQueryOptions,
  usePostAuthSignInMutation,
  usePostOtpsOtpMutation
} from '@/generated/api';
import { LOCAL_STORAGE_KEYS } from '@/helpers/constants';

import type { LoginFormValues } from '../-constants';

import { otpFormScheme, phoneFormScheme } from '../-constants';

const loginRoute = getRouteApi('/login/');

export const useLoginPage = () => {
  const search = loginRoute.useSearch();
  const navigate = loginRoute.useNavigate();

  const queryClient = useQueryClient();
  const postOtpsOtpMutation = usePostOtpsOtpMutation();
  const postAuthSignInMutation = usePostAuthSignInMutation();

  const [stage, setStage] = useState<'otp' | 'phone'>('phone');
  const [submittedPhones, setSubmittedPhones] = useState<Record<string, number>>({});

  const loginForm = useForm<LoginFormValues>({
    mode: 'onChange',
    defaultValues: {
      phone: '',
      otp: ''
    },
    resolver: zodResolver(stage === 'phone' ? phoneFormScheme : otpFormScheme)
  });
  const phone = loginForm.watch('phone');

  const sendOtp = async (phone: string) => {
    const loginOtpResponse = await postOtpsOtpMutation.mutateAsync({
      body: { phone }
    });

    setSubmittedPhones((currentPhones) => ({
      ...currentPhones,
      [phone]: Date.now() + loginOtpResponse.data.retryDelay
    }));
  };

  const onSubmit = loginForm.handleSubmit(async (values) => {
    if (stage === 'phone') {
      await sendOtp(values.phone);
      setStage('otp');
      return;
    }

    const authSignInResponse = await postAuthSignInMutation.mutateAsync({
      body: {
        code: +values.otp,
        phone: values.phone
      }
    });

    if (!authSignInResponse.data.success) {
      return loginForm.setError('otp', { message: authSignInResponse.data.reason });
    }
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, authSignInResponse.data.token);

    await queryClient.ensureQueryData(
      getUsersProfileQueryOptions({
        params: {
          gcTime: Infinity
        }
      })
    );
    await navigate({ to: search.redirect ?? '/', replace: true });
  });

  const phoneMask = useMask('+7 999 999 99 99', {
    showMask: 'never',
    onChangeRaw: (rawValue) => loginForm.setValue('phone', `7${rawValue}`)
  });

  // 🐛 bug
  // allow entering OTP longer than 6 digits
  const otpMask = useMask('999999999', {
    showMask: 'never',
    onChangeRaw: (rawValue) => loginForm.setValue('otp', rawValue)
  });

  const onBack = () => {
    loginForm.resetField('otp');
    loginForm.clearErrors('otp');
    otpMask.reset();
    setStage('phone');
  };

  const onRetry = async () => {
    await sendOtp(phone);
    loginForm.resetField('otp');
    loginForm.clearErrors('otp');
  };

  const submittedPhone = submittedPhones[phone];
  const isCodeStep = stage === 'otp';
  const isRetrying = postOtpsOtpMutation.isPending && isCodeStep;
  const isLoading =
    loginForm.formState.isSubmitting || isRetrying || postAuthSignInMutation.isPending;

  return {
    state: { isCodeStep, isLoading, isRetrying, submittedPhone },
    functions: { onSubmit, onBack, onRetry },
    features: {
      phoneMask,
      otpMask
    },
    form: loginForm
  };
};
