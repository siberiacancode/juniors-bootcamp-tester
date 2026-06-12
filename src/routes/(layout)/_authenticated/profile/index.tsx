import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { useGetUsersSessionQuery, usePatchUsersProfileMutation } from '@/shared/api/generated';
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';
import { useUser } from '@/shared/contexts/user';

import type { ProfileFormScheme } from './-constants';

import { OrderHistory } from '../../-components';
import { mockOrderHistory } from '../../-constants';
import { LogoutConfirmation } from './-components';
import { profileFormScheme } from './-constants';
import { formatPhone } from './-helpers';

export const Route = createFileRoute('/(layout)/_authenticated/profile/')({
  component: RouteComponent
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const user = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const userSessionQuery = useGetUsersSessionQuery({
    params: {
      enabled: user.isLoggedIn
    }
  });

  const usersProfileMutation = usePatchUsersProfileMutation();
  const sessionUser = userSessionQuery.data?.data.user;
  const currentUser = user.value!;
  const displayName = [currentUser.lastname, currentUser.firstname, currentUser.middlename]
    .filter(Boolean)
    .join(' ');
  const formattedPhone = formatPhone(currentUser.phone);
  const avatarFallback = (displayName || currentUser.email || 'G').trim().charAt(0).toUpperCase();

  const profileDefaultValues = useMemo(
    () => ({
      email: currentUser.email ?? '',
      firstname: currentUser.firstname ?? '',
      lastname: currentUser.lastname ?? ''
    }),
    [currentUser.email, currentUser.firstname, currentUser.lastname]
  );

  const profileForm = useForm<ProfileFormScheme>({
    mode: 'onSubmit',
    defaultValues: profileDefaultValues,
    resolver: zodResolver(profileFormScheme)
  });
  const { isDirty, isSubmitting } = profileForm.formState;

  useEffect(() => {
    if (!sessionUser) return;

    user.set(sessionUser);
  }, [sessionUser, user]);

  useEffect(() => {
    if (isEditing) return;

    profileForm.reset(profileDefaultValues);
  }, [isEditing, profileDefaultValues, profileForm]);

  const onSubmit = profileForm.handleSubmit(async (values) => {
    const response = await usersProfileMutation.mutateAsync({
      body: {
        phone: currentUser.phone,
        profile: values
      }
    });
    const updatedUser = response.data.user;

    profileForm.reset(values);
    user.set(updatedUser);
    setIsEditing(false);
  });

  const onCancelEditing = () => {
    profileForm.reset(profileDefaultValues);
    setIsEditing(false);
  };

  const onLogout = () => {
    navigate({
      to: '/'
    });
    user.remove();
  };

  if (isEditing) {
    return (
      <main className='flex flex-col items-center gap-4'>
        <div className='pb-4 sm:hidden'>
          <Typography as='h1' variant='title-md'>
            Профиль
          </Typography>
        </div>

        <form className='flex w-full flex-col gap-4 lg:max-w-xl' onSubmit={onSubmit}>
          <fieldset className='flex flex-col gap-4' disabled={isSubmitting}>
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
                  <FieldLabel htmlFor={field.name}>Фамилия</FieldLabel>
                  <Input {...field} id={field.name} placeholder='Фамилия' />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
              control={profileForm.control}
              name='lastname'
            />

            <Field>
              <FieldLabel htmlFor='phone'>Номер телефона</FieldLabel>
              <Input asChild disabled id='phone' value={currentUser.phone}>
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

          <div className='flex flex-col gap-2.5 py-4'>
            <Button disabled={!isDirty} size='lg' type='submit' variant='secondary'>
              {isSubmitting && <Loader2Icon className='animate-spin' />}
              Обновить данные
            </Button>
            <Button size='lg' onClick={onCancelEditing}>
              Отмена
            </Button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main className='mx-auto flex w-full max-w-5xl flex-col gap-10 lg:grid lg:grid-cols-[minmax(22rem,24rem)_minmax(0,1fr)] lg:gap-16'>
      <div className='pb-4 sm:hidden'>
        <Typography as='h1' className='text-[24px]/[32px]' variant='heading-md'>
          Профиль
        </Typography>
      </div>

      <section className='flex flex-col items-center gap-4'>
        <Avatar className='bg-secondary' size='xl'>
          <AvatarFallback className='bg-secondary text-[32px]/[24px] font-medium text-foreground sm:text-[96px]/[84px]'>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col items-center'>
          <Typography as='p' className='text-[24px]/[32px] sm:text-[24px]/[32px]' variant='body-lg'>
            {displayName || formattedPhone}
          </Typography>
          {currentUser.email && (
            <Typography
              as='p'
              className='text-[14px]/5.5 font-medium text-foreground/50'
              variant='caption'
            >
              {currentUser.email}
            </Typography>
          )}
          {displayName && (
            <Typography
              as='div'
              className='mt-4 text-[14px]/5.5 text-foreground sm:text-[24px]/8'
              variant='body-lg'
            >
              {formattedPhone}
            </Typography>
          )}
        </div>
        <Button
          className='w-full'
          size='lg'
          type='button'
          variant='secondary'
          onClick={() => setIsEditing(true)}
        >
          Редактировать профиль
        </Button>
        <Button className='w-full' size='lg' type='button' onClick={() => setIsLogoutOpen(true)}>
          Выйти
        </Button>
      </section>
      <section className='flex flex-col gap-4'>
        <Typography
          as='p'
          className='text-[18px]/6.5 font-normal tracking-normal text-foreground sm:text-[18px]/6.5'
          variant='body-sm'
        >
          История покупок
        </Typography>
        <OrderHistory orders={mockOrderHistory} />
      </section>
      <LogoutConfirmation open={isLogoutOpen} onConfirm={onLogout} onOpenChange={setIsLogoutOpen} />
    </main>
  );
}
