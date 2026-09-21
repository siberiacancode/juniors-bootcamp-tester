import { Button, Field, FieldError, FieldLabel, Input, Typography } from '@siberiacancode/uikit';
import { Loader2Icon } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { TESTIDS } from '@/generated/tests/index.gen';
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
      <DrawerContent
        className={cn('p-4 sm:max-w-120 sm:p-6')}
        data-testid={TESTIDS.STATIC.EDIT_PROFILE_DRAWER}
        showHandle={false}
      >
        <div className='min-h-0 flex-1 overflow-y-auto'>
          <DrawerHeader className='mb-6 flex-row px-0 py-3 sm:mb-0'>
            <DrawerTitle asChild>
              <Typography as='h2' variant='title-md'>
                <IntlText path='page.profile.edit.title' />
              </Typography>
            </DrawerTitle>
          </DrawerHeader>
          <form className='flex flex-col gap-12 sm:gap-4' onSubmit={functions.onSubmit}>
            <fieldset className='flex flex-col gap-4 p-1' disabled={state.isSubmitting}>
              <Controller
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    data-testid={TESTIDS.CHANGEABLE.FIELD.LASTNAME}
                  >
                    <FieldLabel htmlFor={field.name}>
                      <IntlText path='field.profile.lastname.label' />
                    </FieldLabel>
                    <Input
                      {...field}
                      data-testid={`${TESTIDS.CHANGEABLE.FIELD.LASTNAME}-input`}
                      id={field.name}
                      placeholder={intl.formatMessage({ id: 'field.profile.lastname.placeholder' })}
                    />
                    {fieldState.error?.message && (
                      <FieldError data-testid={`${TESTIDS.CHANGEABLE.FIELD.LASTNAME}-error`}>
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
                  <Field
                    data-invalid={fieldState.invalid}
                    data-testid={TESTIDS.CHANGEABLE.FIELD.FIRSTNAME}
                  >
                    <FieldLabel htmlFor={field.name}>
                      <IntlText path='field.profile.firstname.label' />
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder={intl.formatMessage({
                        id: 'field.profile.firstname.placeholder'
                      })}
                      data-testid={`${TESTIDS.CHANGEABLE.FIELD.FIRSTNAME}-input`}
                      id={field.name}
                    />
                    {fieldState.error?.message && (
                      <FieldError data-testid={`${TESTIDS.CHANGEABLE.FIELD.FIRSTNAME}-error`}>
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
                  <Field
                    data-invalid={fieldState.invalid}
                    data-testid={TESTIDS.CHANGEABLE.FIELD.MIDDLENAME}
                  >
                    <FieldLabel htmlFor={field.name}>
                      <IntlText path='field.profile.middlename.label' />
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder={intl.formatMessage({
                        id: 'field.profile.middlename.placeholder'
                      })}
                      data-testid={`${TESTIDS.CHANGEABLE.FIELD.MIDDLENAME}-input`}
                      id={field.name}
                    />
                    {fieldState.error?.message && (
                      <FieldError data-testid={`${TESTIDS.CHANGEABLE.FIELD.MIDDLENAME}-error`}>
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
              <Field data-testid={TESTIDS.CHANGEABLE.FIELD.PHONE}>
                <FieldLabel htmlFor='phone'>
                  <IntlText path='field.profile.phone.label' />
                </FieldLabel>
                <Input
                  disabled
                  data-testid={`${TESTIDS.CHANGEABLE.FIELD.PHONE}-input`}
                  id='phone'
                  value={features.phoneMask.watch().displayValue}
                />
              </Field>
              <Controller
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    data-testid={TESTIDS.CHANGEABLE.FIELD.EMAIL}
                  >
                    <FieldLabel htmlFor={field.name}>
                      <IntlText path='field.profile.email.label' />
                    </FieldLabel>
                    <Input
                      {...field}
                      data-testid={`${TESTIDS.CHANGEABLE.FIELD.EMAIL}-input`}
                      id={field.name}
                      placeholder={intl.formatMessage({ id: 'field.profile.email.placeholder' })}
                    />
                    {fieldState.error?.message && (
                      <FieldError data-testid={`${TESTIDS.CHANGEABLE.FIELD.EMAIL}-error`}>
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
              <Button
                data-testid={TESTIDS.CLICKABLE.BUTTON.UPDATE_DATA}
                disabled={!state.isDirty || state.isSubmitting}
                size='lg'
                type='submit'
                variant='secondary'
              >
                {state.isSubmitting && (
                  <Loader2Icon
                    className='animate-spin'
                    data-testid={TESTIDS.STATIC.LOADER.UPDATE_DATA}
                  />
                )}
                <IntlText path='button.updateData' />
              </Button>
              <Button
                data-testid={TESTIDS.CLICKABLE.BUTTON.CANCEL}
                size='lg'
                type='button'
                onClick={functions.onClose}
              >
                <IntlText path='button.cancel' />
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
