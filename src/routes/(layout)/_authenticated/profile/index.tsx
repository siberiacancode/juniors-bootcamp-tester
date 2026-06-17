import { createFileRoute } from '@tanstack/react-router';

import { MascotFrontIcon } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { getUsersSessionQueryOptions } from '@/generated/api';
import { IntlText } from '@/lib/intl';
import { LogoutConfirmation, OrderHistory } from '@/routes/-components';

import { EditProfile, ProfileSkeleton } from './-components';
import { useProfilePage } from './-hooks';

const ProfilePage = () => {
  const { state, features, functions } = useProfilePage();

  return (
    <section className='mx-auto flex flex-col gap-10 sm:mt-12 lg:grid lg:grid-cols-[minmax(20rem,25rem)_minmax(0,1fr)] lg:gap-16'>
      <div className='py-3 sm:hidden sm:py-0'>
        <Typography as='h1' variant='title-md'>
          <IntlText path='page.profile.title' />
        </Typography>
      </div>
      <section className='flex flex-col gap-4'>
        <div className='flex flex-col items-center gap-4 lg:flex-row'>
          <Avatar className='bg-secondary' size='xl'>
            <AvatarFallback className='bg-secondary text-[32px]/[40px] font-medium text-foreground'>
              {!state.displayName ? (
                <MascotFrontIcon />
              ) : (
                (state.displayName || state.user.email || 'A').trim().charAt(0).toUpperCase()
              )}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-center text-center sm:items-start sm:text-left'>
            <Typography as='p' variant='body-lg'>
              {state.displayName || <IntlText path='page.profile.fallbackName' />}
            </Typography>
            <Typography as='p' className='text-foreground/50' variant='caption'>
              {state.user.email || features.phoneMask.watch().displayValue}
            </Typography>
            {state.user.email && (
              <Typography as='p' variant='caption'>
                {features.phoneMask.watch().displayValue}
              </Typography>
            )}
          </div>
        </div>
        <div className='flex w-full flex-col items-center gap-2.5 p-4 sm:p-0'>
          <Button
            className='w-full'
            size='lg'
            type='button'
            variant='secondary'
            onClick={features.editDialog.open}
          >
            <IntlText path='button.profile.edit' />
          </Button>
          <Button className='w-full' size='lg' type='button' onClick={features.confirmDialog.open}>
            <IntlText path='button.logout.confirm' />
          </Button>
        </div>
      </section>
      <section className='flex flex-col gap-4'>
        <Typography as='p' className='block sm:hidden' variant='body-md'>
          <IntlText path='page.history.title' />
        </Typography>
        <OrderHistory />
      </section>
      {features.confirmDialog.opened && (
        <LogoutConfirmation
          onConfirm={functions.onLogout}
          onOpenChange={features.confirmDialog.toggle}
        />
      )}
      {features.editDialog.opened && (
        <EditProfile onCancel={features.editDialog.close} onSuccess={features.editDialog.close} />
      )}
    </section>
  );
};

export const Route = createFileRoute('/(layout)/_authenticated/profile/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(getUsersSessionQueryOptions()),
  pendingComponent: ProfileSkeleton,
  component: ProfilePage
});
