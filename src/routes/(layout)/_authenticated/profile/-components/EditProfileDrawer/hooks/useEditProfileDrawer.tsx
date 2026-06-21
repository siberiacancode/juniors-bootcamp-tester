import type { ComponentProps } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMask, useMediaQuery } from '@siberiacancode/reactuse';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';

import type { Drawer } from '@/components/ui/drawer';

import {
  getUsersSessionQueryKey,
  useGetUsersSessionQuery,
  usePatchUsersProfileMutation
} from '@/generated/api';

export const profileFormScheme = z.object({
  lastname: z.string(),
  firstname: z.string(),
  middlename: z.string(),
  email: z.email('error.validation.email')
});

export type ProfileFormScheme = z.infer<typeof profileFormScheme>;

type UseEditProfileDrawerParams = ComponentProps<typeof Drawer>;

export const useEditProfileDrawer = ({ onClose }: UseEditProfileDrawerParams) => {
  const queryClient = useQueryClient();

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const patchUsersProfileMutation = usePatchUsersProfileMutation();
  const getUsersSessionSuspenseQuery = useGetUsersSessionQuery();
  const user = getUsersSessionSuspenseQuery.data!.data.user;

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
      body: {
        phone: user.phone,
        profile: values
      }
    });

    await queryClient.invalidateQueries({
      queryKey: [getUsersSessionQueryKey]
    });

    onClose?.();
  });

  const phoneMask = useMask('+9 999 999 99 99', {
    showMask: 'never',
    initialValue: user.phone
  });

  return {
    state: {
      isDesktop,
      isSubmitting: editProfileForm.formState.isSubmitting,
      isDirty: editProfileForm.formState.isDirty
    },
    functions: {
      onSubmit
    },
    features: {
      phoneMask
    },
    form: editProfileForm
  };
};
