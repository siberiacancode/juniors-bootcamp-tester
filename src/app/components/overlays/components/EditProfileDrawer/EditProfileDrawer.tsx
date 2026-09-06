import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  IconButton,
  Input,
  Typography
} from '@siberiacancode/uikit';
import { Loader2Icon, XIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { PROFILE_NAME_MAX_LENGTH } from '@/utils/constants';
import { intl, IntlText } from '@/utils/lib/intl';
import { cn } from '@/utils/lib/utils';

import { useEditProfileDrawer } from './hooks';

export const EditProfileDrawer = () => {
  const { state, features, form, functions } = useEditProfileDrawer();

  return (
    <Drawer
      handleOnly
      open
      direction={state.isDesktop ? 'right' : 'bottom'}
      shouldScaleBackground={false}
      onOpenChange={functions.onClose}
    >
      <DrawerContent className={cn('p-4 sm:max-w-120 sm:p-6')} showHandle={false}>
        <DrawerHeader className='mb-6 flex flex-row justify-between px-0 py-3 sm:mb-0'>
          <DrawerTitle asChild>
            <Typography as='h2' variant='title-md'>
              <IntlText path='page.profile.edit.title' />
            </Typography>
          </DrawerTitle>
          {state.isDesktop && (
            <DrawerClose asChild onClick={functions.onClose}>
              <IconButton className='size-10' shape='round' type='button' variant='ghost'>
                <XIcon className='size-6' />
              </IconButton>
            </DrawerClose>
          )}
        </DrawerHeader>
        <form className='flex flex-col gap-12 sm:gap-4' onSubmit={functions.onSubmit}>
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
                  {fieldState.error?.message && (
                    <FieldError>
                      <IntlText
                        path={fieldState.error.message as MessagePath}
                        values={{ maxLength: PROFILE_NAME_MAX_LENGTH }}
                      />
                    </FieldError>
                  )}
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
                  {fieldState.error?.message && (
                    <FieldError>
                      <IntlText
                        path={fieldState.error.message as MessagePath}
                        values={{ maxLength: PROFILE_NAME_MAX_LENGTH }}
                      />
                    </FieldError>
                  )}
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
                  {fieldState.error?.message && (
                    <FieldError>
                      <IntlText
                        path={fieldState.error.message as MessagePath}
                        values={{ maxLength: PROFILE_NAME_MAX_LENGTH }}
                      />
                    </FieldError>
                  )}
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
                  {fieldState.error?.message && (
                    <FieldError>
                      <IntlText path={fieldState.error.message as MessagePath} />
                    </FieldError>
                  )}
                </Field>
              )}
              control={form.control}
              name='email'
            />
          </fieldset>
          <div className='flex flex-col gap-2.5 sm:py-4 sm:pt-5'>
            <Button disabled={!state.isDirty} size='lg' type='submit' variant='secondary'>
              {state.isSubmitting && <Loader2Icon className='animate-spin' />}
              <IntlText path='button.updateData' />
            </Button>
            {!state.isDesktop && (
              <Button size='lg' type='button' onClick={functions.onClose}>
                <IntlText path='button.cancel' />
              </Button>
            )}
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
