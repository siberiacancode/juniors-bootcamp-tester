import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from '@siberiacancode/reactuse';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2Icon, XIcon } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import type { User } from '@/shared/api/generated';

import { getUsersSessionQueryKey, usePatchUsersProfileMutation } from '@/shared/api/generated';
import { Button } from '@/shared/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/shared/components/ui/drawer';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { IconButton } from '@/shared/components/ui/icon-button';
import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';
import { useUser } from '@/shared/contexts/user';

import type { ProfileFormScheme } from '../../-constants';

import { profileFormScheme } from '../../-constants';

interface EditProfileProps {
  user: User;
  onCancel: () => void;
  onSuccess?: () => void;
}

export const EditProfile = ({ user, onCancel, onSuccess }: EditProfileProps) => {
  const userContext = useUser();
  const queryClient = useQueryClient();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const usersProfileMutation = usePatchUsersProfileMutation();

  const profileDefaultValues = useMemo(
    () => ({
      email: user.email ?? '',
      firstname: user.firstname ?? '',
      middlename: user.middlename ?? '',
      lastname: user.lastname ?? ''
    }),
    [user.email, user.firstname, user.lastname, user.middlename]
  );

  const profileForm = useForm<ProfileFormScheme>({
    mode: 'onSubmit',
    defaultValues: profileDefaultValues,
    resolver: zodResolver(profileFormScheme)
  });
  const { isDirty, isSubmitting } = profileForm.formState;

  useEffect(() => {
    profileForm.reset(profileDefaultValues);
  }, [profileDefaultValues, profileForm]);

  const onSubmit = profileForm.handleSubmit(async (values) => {
    const response = await usersProfileMutation.mutateAsync({
      body: {
        phone: user.phone,
        profile: values
      }
    });
    const updatedUser = response.data.user;

    profileForm.reset(values);
    userContext.set(updatedUser);
    await queryClient.invalidateQueries({
      queryKey: [getUsersSessionQueryKey]
    });
    onSuccess?.();
  });

  const onCancelEditing = () => {
    profileForm.reset(profileDefaultValues);
    onCancel();
  };

  const form = (
    <form className='flex w-full flex-col gap-4 lg:max-w-xl' onSubmit={onSubmit}>
      <fieldset className='flex flex-col gap-4 p-1' disabled={isSubmitting}>
        <Controller
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Фамилия</FieldLabel>
              <Input {...field} id={field.name} placeholder='Фамилия' />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
          control={profileForm.control}
          name='lastname'
        />
        <Controller
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Имя</FieldLabel>
              <Input {...field} id={field.name} placeholder='Имя' />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
          control={profileForm.control}
          name='firstname'
        />
        <Controller
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Отчество</FieldLabel>
              <Input {...field} id={field.name} placeholder='Отчество' />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
          control={profileForm.control}
          name='middlename'
        />
        <Field>
          <FieldLabel htmlFor='phone'>Телефон</FieldLabel>
          <Input asChild disabled id='phone' value={user.phone}>
            <PatternFormat format='+7 ### ### ## ##' />
          </Input>
        </Field>
        <Controller
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input {...field} id={field.name} placeholder='Email' />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
          control={profileForm.control}
          name='email'
        />
      </fieldset>

      <div className='flex flex-col gap-2.5 py-4 lg:pt-5'>
        <Button disabled={!isDirty} size='lg' type='submit' variant='secondary'>
          {isSubmitting && <Loader2Icon className='animate-spin' />}
          Обновить данные
        </Button>
        {!isDesktop && (
          <Button size='lg' type='button' onClick={onCancelEditing}>
            Отмена
          </Button>
        )}
      </div>
    </form>
  );

  if (isDesktop) {
    return (
      <Drawer
        open
        direction='right'
        shouldScaleBackground={false}
        onOpenChange={(open) => {
          if (!open) {
            onCancelEditing();
          }
        }}
      >
        <DrawerContent className='max-w-120' showHandle={false}>
          <DrawerHeader className='flex flex-row items-center justify-between gap-6 px-0 py-3'>
            <div>
              <DrawerTitle className='text-[24px]/[32px] font-extrabold tracking-normal text-foreground'>
                Редактирование данных
              </DrawerTitle>
              <DrawerDescription className='sr-only'>
                Измените данные профиля и сохраните форму
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <IconButton
                rounded
                aria-label='Закрыть редактирование профиля'
                className='size-11 text-foreground'
                type='button'
                variant='ghost'
              >
                <XIcon className='size-8' />
              </IconButton>
            </DrawerClose>
          </DrawerHeader>
          <div className='min-h-0 flex-1 overflow-y-auto'>{form}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <main className='flex flex-col items-center gap-4'>
      <div className='pb-4 sm:hidden'>
        <Typography as='h1' variant='title-md'>
          Редактирование данных
        </Typography>
      </div>
      {form}
    </main>
  );
};
