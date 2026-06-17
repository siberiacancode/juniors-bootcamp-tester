import { zodResolver } from '@hookform/resolvers/zod';
import { useMask } from '@siberiacancode/reactuse';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import {
  getUsersSessionSuspenseQueryKey,
  useGetUsersSessionSuspenseQuery,
  usePatchUsersProfileMutation
} from '@/generated/api';

import type { ProfileFormScheme } from '../-constants';

import { profileFormScheme } from '../-constants';

export const useEditProfile = (onCancel: () => void, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const patchUsersProfileMutation = usePatchUsersProfileMutation();
  const getUsersSessionSuspenseQuery = useGetUsersSessionSuspenseQuery();
  const user = getUsersSessionSuspenseQuery.data.data.user;

  const profileForm = useForm<ProfileFormScheme>({
    mode: 'onSubmit',
    values: {
      email: user.email ?? '',
      firstname: user.firstname ?? '',
      middlename: user.middlename ?? '',
      lastname: user.lastname ?? ''
    },
    resolver: zodResolver(profileFormScheme)
  });

  const onSubmit = profileForm.handleSubmit(async (values) => {
    await patchUsersProfileMutation.mutateAsync({
      body: {
        phone: user.phone,
        profile: values
      }
    });

    await queryClient.invalidateQueries({
      queryKey: [getUsersSessionSuspenseQueryKey]
    });
    onSuccess?.();
  });

  const onCancelEditing = () => {
    profileForm.reset();
    onCancel();
  };

  const phoneMask = useMask('+9 999 999 99 99', {
    showMask: 'never',
    initialValue: user?.phone
  });

  return {
    functions: {
      onSubmit,
      onCancelEditing
    },
    features: {
      phoneMask
    },
    state: {
      isSubmitting: profileForm.formState.isSubmitting,
      isDirty: profileForm.formState.isDirty
    },
    form: profileForm
  };
};
