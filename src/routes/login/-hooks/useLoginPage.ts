import { zodResolver } from '@hookform/resolvers/zod';
import { useMask } from '@siberiacancode/reactuse';
import { useQueryClient } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  getCardsCardsQueryOptions,
  getUsersProfileQueryOptions,
  usePostAuthSignInMutation,
  usePostOtpsOtpMutation
} from '@/generated/api';

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
    mode: 'onSubmit',
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

    if (!loginOtpResponse.data.success) {
      return false;
    }
    const { data } = loginOtpResponse;
    setSubmittedPhones((currentPhones) => ({
      ...currentPhones,
      [phone]: Date.now() + data.retryDelay
    }));

    return true;
  };

  const onSubmit = loginForm.handleSubmit(async (values) => {
    if (stage === 'phone') {
      const isOtpSent = await sendOtp(values.phone);

      if (!isOtpSent) return;

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

    const getUsersProfileResponse = await queryClient.fetchQuery(
      getUsersProfileQueryOptions({
        params: {
          gcTime: Infinity
        }
      })
    );

    if (getUsersProfileResponse.data.success && getUsersProfileResponse.data.user) {
      await queryClient.fetchQuery(
        getCardsCardsQueryOptions({
          params: {
            gcTime: Infinity
          }
        })
      );
    }

    const redirectPath = search.redirect
      ?.replace(window.location.origin, '')
      .replace(import.meta.env.BASE_URL.replace(/\/$/, ''), '');

    await navigate({
      to: redirectPath || '/',
      replace: true
    });
  });

  const phoneMask = useMask('+7 999 999 99 99', {
    showMask: 'never',
    sanitize: (rawValue) => {
      const digits = rawValue.replace(/\D/g, '');
      if (digits.length > 10) return digits.replace(/^[78]/, '');
      return digits;
    },
    onChangeRaw: (rawValue) => {
      loginForm.setValue('phone', `7${rawValue}`);
      loginForm.clearErrors('phone');
    }
  });

  // 🐛 bug
  // allow entering OTP longer than 6 digits
  const otpMask = useMask('999999', {
    showMask: 'never',
    onChangeRaw: (rawValue) => {
      loginForm.setValue('otp', rawValue);
      loginForm.clearErrors('otp');
    }
  });

  const onBack = () => {
    loginForm.resetField('otp');
    loginForm.clearErrors('otp');
    otpMask.reset();
    setStage('phone');
  };

  const onRetry = async () => {
    const isOtpSent = await sendOtp(phone);

    if (!isOtpSent) return;

    loginForm.resetField('otp');
    loginForm.clearErrors('otp');
    otpMask.reset();
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
