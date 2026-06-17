import { zodResolver } from '@hookform/resolvers/zod';
import { useMask } from '@siberiacancode/reactuse';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  getUsersSessionQueryKey,
  usePostAuthOtpMutation as usePostLoginOtpMutation,
  usePostUsersSigninMutation
} from '@/generated/api';
import { LOCAL_STORAGE_KEYS } from '@/helpers/constants';

import type { LoginFormValues } from '../-constants';

import { otpFormScheme, phoneFormScheme } from '../-constants';

export const useLoginPage = () => {
  const search = useSearch({
    from: '/login/'
  });
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const postLoginOtpMutation = usePostLoginOtpMutation();
  const postUsersSigninMutation = usePostUsersSigninMutation();

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
    const loginOtpResponse = await postLoginOtpMutation.mutateAsync({
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

    const usersSigninResponse = await postUsersSigninMutation.mutateAsync({
      body: {
        code: +values.otp,
        phone: values.phone
      }
    });

    if (!usersSigninResponse.data.success) {
      return loginForm.setError('otp', { message: usersSigninResponse.data.reason });
    }
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, usersSigninResponse.data.token);

    await queryClient.refetchQueries({ queryKey: [getUsersSessionQueryKey] });
    await navigate({ to: search.redirect ?? '/', replace: true });
  });

  const phoneMask = useMask('+7 999 999 99 99', {
    showMask: 'never',
    onChangeRaw: (rawValue) => loginForm.setValue('phone', rawValue),
    tokens: {
      '7': /7/
    }
  });

  const otpMask = useMask('999999', {
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
  const isRetrying = postLoginOtpMutation.isPending && isCodeStep;
  const isLoading =
    loginForm.formState.isSubmitting || isRetrying || postUsersSigninMutation.isPending;

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
