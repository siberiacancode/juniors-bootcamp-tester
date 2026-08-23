import { zodResolver } from '@hookform/resolvers/zod';
import { useMask, useMediaQuery } from '@siberiacancode/reactuse';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';

import {
  getUsersProfileQueryKey,
  useGetUsersProfileQuery,
  usePatchUsersProfileMutation
} from '@/generated/api';

import { appOverlaysStore } from '../../../store';

export const profileFormScheme = z.object({
  lastname: z.string(),
  firstname: z.string(),
  middlename: z.string(),
  // 🐛 bug
  // email field does not validate format in profile editing
  // email: z.string()
  email: z.email('error.validation.email')
});

export type ProfileFormScheme = z.infer<typeof profileFormScheme>;

export const useEditProfileDrawer = () => {
  const queryClient = useQueryClient();

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const patchUsersProfileMutation = usePatchUsersProfileMutation();
  const getUsersProfileQuery = useGetUsersProfileQuery();
  const user = getUsersProfileQuery.data!.data.user;

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
