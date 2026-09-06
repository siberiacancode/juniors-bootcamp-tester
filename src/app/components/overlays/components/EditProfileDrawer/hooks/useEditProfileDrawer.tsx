import { zodResolver } from '@hookform/resolvers/zod';
import { useMask, useMediaQuery } from '@siberiacancode/reactuse';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import type { GetProfileResponse } from '@/generated/api';

import {
  getUsersProfileQueryKey,
  useGetUsersProfileQuery,
  usePatchUsersProfileMutation
} from '@/generated/api';
import { PROFILE_NAME_MAX_LENGTH } from '@/utils/constants';
import { intl } from '@/utils/lib/intl';

import { appOverlaysStore } from '../../../store';

export const profileFormScheme = z.object({
  lastname: z
    .string()
    .trim()
    .max(PROFILE_NAME_MAX_LENGTH, 'error.validation.maxLength')
    .regex(/^\p{L}*$/u, 'error.validation.symbols'),
  firstname: z
    .string()
    .trim()
    .max(PROFILE_NAME_MAX_LENGTH, 'error.validation.maxLength')
    .regex(/^\p{L}*$/u, 'error.validation.symbols'),
  middlename: z
    .string()
    .trim()
    .max(PROFILE_NAME_MAX_LENGTH, 'error.validation.maxLength')
    .regex(/^\p{L}*$/u, 'error.validation.symbols'),
  email: z.email('error.validation.email')
});

export type ProfileFormScheme = z.infer<typeof profileFormScheme>;

export const useEditProfileDrawer = () => {
  const queryClient = useQueryClient();

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const patchUsersProfileMutation = usePatchUsersProfileMutation();
  const getUsersProfileQuery = useGetUsersProfileQuery();
  const getUsersProfileData = getUsersProfileQuery.data!.data as GetProfileResponse;
  const user = getUsersProfileData.user;

  const editProfileForm = useForm<ProfileFormScheme>({
    mode: 'onSubmit',
    values: {
      email: user.email ?? '',
      firstname: user.firstname ?? '',
      middlename: user.middlename ?? '',
      lastname: user.lastname ?? ''
    },
    resolver: zodResolver(profileFormScheme)
  });

  const onSubmit = editProfileForm.handleSubmit(async (values) => {
    await patchUsersProfileMutation.mutateAsync({
      body: values
    });

    await queryClient.invalidateQueries({
      queryKey: [getUsersProfileQueryKey]
    });

    toast.success(intl.formatMessage({ id: 'toast.profile.update.success.title' }), {
      description: intl.formatMessage({ id: 'toast.profile.update.success.description' })
    });

    appOverlaysStore.get().close();
  });

  const phoneMask = useMask('+9 999 999 99 99', {
    showMask: 'never',
    initialValue: user.phone
  });

  const onClose = () => appOverlaysStore.get().close();

  return {
    state: {
      isDesktop,
      isSubmitting: editProfileForm.formState.isSubmitting,
      isDirty: editProfileForm.formState.isDirty
    },
    functions: {
      onSubmit,
      onClose
    },
    features: {
      phoneMask
    },
    form: editProfileForm
  };
};
