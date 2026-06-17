import { useMediaQuery } from '@siberiacancode/reactuse';
import { Loader2Icon, XIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { intl, IntlText } from '@/lib/intl';
import { cn } from '@/lib/utils';

import { useEditProfile } from '../../-hooks';

interface EditProfileProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

export const EditProfile = ({ onCancel, onSuccess }: EditProfileProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { state, features, form, functions } = useEditProfile(onCancel, onSuccess);

  return (
    <Drawer
      open
      direction={isDesktop ? 'right' : 'bottom'}
      shouldScaleBackground={false}
      onOpenChange={(open) => {
        if (!open) {
          functions.onCancelEditing();
        }
      }}
    >
      <DrawerContent
        className={cn(
          'p-6 sm:max-w-120',
          !isDesktop &&
            'data-[vaul-drawer-direction=right]:inset-0 data-[vaul-drawer-direction=right]:h-dvh data-[vaul-drawer-direction=right]:w-screen data-[vaul-drawer-direction=right]:max-w-none data-[vaul-drawer-direction=right]:transform-none! data-[vaul-drawer-direction=right]:rounded-none data-[vaul-drawer-direction=right]:transition-none!'
        )}
        showHandle={false}
      >
        <DrawerHeader className='mb-6 flex flex-row justify-between px-0 py-3 sm:mb-0'>
          <DrawerTitle asChild>
            <Typography as='h2' variant='title-md'>
              <IntlText path='page.profile.edit.title' />
            </Typography>
          </DrawerTitle>
          {isDesktop && (
            <DrawerClose asChild>
              <IconButton className='size-10' type='button' variant='ghost'>
                <XIcon className='size-6' />
              </IconButton>
            </DrawerClose>
          )}
        </DrawerHeader>
        <form className='flex flex-col gap-4' onSubmit={functions.onSubmit}>
          <fieldset className='flex flex-col gap-4 p-1' disabled={state.isSubmitting}>
            <Controller
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    <IntlText path='field.profile.lastname.label' />
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder={intl.formatMessage({ id: 'field.profile.lastname.placeholder' })}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
              control={form.control}
              name='lastname'
            />
            <Controller
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    <IntlText path='field.profile.firstname.label' />
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder={intl.formatMessage({ id: 'field.profile.firstname.placeholder' })}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
              control={form.control}
              name='firstname'
            />
            <Controller
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    <IntlText path='field.profile.middlename.label' />
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder={intl.formatMessage({ id: 'field.profile.middlename.placeholder' })}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
              control={form.control}
              name='middlename'
            />
            <Field>
              <FieldLabel htmlFor='phone'>
                <IntlText path='field.profile.phone.label' />
              </FieldLabel>
              <Input disabled id='phone' value={features.phoneMask.watch().displayValue} />
            </Field>
            <Controller
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    <IntlText path='field.profile.email.label' />
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder={intl.formatMessage({ id: 'field.profile.email.placeholder' })}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
              control={form.control}
              name='email'
            />
          </fieldset>
          <div className='flex flex-col gap-2.5 py-4 lg:pt-5'>
            <Button disabled={!state.isDirty} size='lg' type='submit' variant='secondary'>
              {state.isSubmitting && <Loader2Icon className='animate-spin' />}
              <IntlText path='button.profile.update' />
            </Button>
            {!isDesktop && (
              <Button size='lg' type='button' onClick={functions.onCancelEditing}>
                <IntlText path='button.profile.cancel' />
              </Button>
            )}
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
