import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { Loader2Icon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { usePatchUsersProfileMutation } from '@/shared/api/generated';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';
import { useUser } from '@/shared/contexts/user';

import type { ProfileFormScheme } from './-constants';

import { profileFormScheme } from './-constants';

export const Route = createFileRoute('/(layout)/_authenticated/profile')({
  component: RouteComponent
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const user = useUser();

  const usersProfileMutation = usePatchUsersProfileMutation();

  const profileForm = useForm<ProfileFormScheme>({
    mode: 'onSubmit',
    defaultValues: {
      email: user.value!.email ?? '',
      firstname: user.value!.firstname ?? '',
      lastname: user.value!.lastname ?? ''
    },
    resolver: zodResolver(profileFormScheme)
  });

  const onSubmit = profileForm.handleSubmit(async (values) => {
    await usersProfileMutation.mutateAsync({
      body: {
        phone: user.value!.phone,
        profile: values
      }
    });
    const updatedUser = { ...user.value!, ...values };
    user.set(updatedUser);
  });

  const onLogout = () => {
    if (Math.random() < 0.3) throw new Error('Something went wrong, something of undefined');

    navigate({
      to: '/'
    });

    user.remove();
  };

  const isLoading = profileForm.formState.isSubmitting;

  return (
    <main className='flex flex-col gap-6'>
      <Typography as='h1' variant='title-md'>
        Профиль
      </Typography>

      <form className='flex flex-col gap-6' onSubmit={onSubmit}>
        <fieldset className='flex gap-10' disabled={isLoading}>
          <div className='flex w-full max-w-85.5 flex-col gap-4'>
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
          </div>
          <div className='flex w-full max-w-85.5 flex-col gap-4'>
            <Field>
              <FieldLabel htmlFor='phone'>Номер телефона</FieldLabel>
              <Input asChild disabled id='phone' value={user.value!.phone}>
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
          </div>
        </fieldset>

        <div className='flex max-w-85.5 flex-col gap-4'>
          <Button disabled={!profileForm.formState.isDirty} size='lg' type='submit'>
            {isLoading && <Loader2Icon className='animate-spin' />}
            Обновить данные
          </Button>
          <Button size='lg' variant='secondary' onClick={onLogout}>
            Выйти
          </Button>
        </div>
      </form>
    </main>
  );
}
