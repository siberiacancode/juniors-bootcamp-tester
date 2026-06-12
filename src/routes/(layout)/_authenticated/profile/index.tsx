import { useMediaQuery } from '@siberiacancode/reactuse';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { PatternFormat } from 'react-number-format';

import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography';
import { useUser } from '@/shared/contexts/user';

import { LogoutConfirmation, OrderHistory } from '../../-components';
import { EditProfile } from './-components';
import { ProfileSkeleton } from './-components/ProfileSkeleton/ProfileSkeleton';

export const Route = createFileRoute('/(layout)/_authenticated/profile/')({
  component: RouteComponent
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const user = useUser();

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [isEditing, setIsEditing] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const currentUser = user.value;

  if (!currentUser) {
    return <ProfileSkeleton />;
  }

  const displayName = [currentUser.lastname, currentUser.firstname, currentUser.middlename]
    .filter(Boolean)
    .join(' ');
  const avatarFallback = (displayName || currentUser.email || 'G').trim().charAt(0).toUpperCase();

  const onLogout = () => {
    navigate({
      to: '/'
    });
    user.remove();
  };

  if (isEditing && !isDesktop) {
    return (
      <EditProfile
        user={currentUser}
        onCancel={() => setIsEditing(false)}
        onSuccess={() => setIsEditing(false)}
      />
    );
  }

  return (
    <main className='mx-auto flex w-full flex-col gap-10 lg:grid lg:grid-cols-[minmax(22rem,24rem)_minmax(0,1fr)] lg:gap-16'>
      <div className='sm:hidden'>
        <Typography as='h1' className='text-[24px]/[32px]' variant='heading-md'>
          Профиль
        </Typography>
      </div>
      <section className='flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center gap-4 sm:flex-row'>
          <Avatar className='bg-secondary' size='xl'>
            <AvatarFallback className='bg-secondary text-[32px]/[40px] font-medium text-foreground'>
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-center text-center sm:items-start sm:text-left'>
            <Typography as='p' className='text-[24px]/[32px]' variant='body-lg'>
              {displayName || currentUser.phone}
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
                as='p'
                className='mt-4 text-[14px]/5.5 font-medium sm:mt-0'
                variant='caption'
              >
                <PatternFormat format='+7 ### ### ## ##' value={currentUser.phone.slice(1)} />
              </Typography>
            )}
          </div>
        </div>
        <div className='flex w-full flex-col gap-2.5 p-4 sm:p-0'>
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
        </div>
      </section>
      <section className='flex flex-col gap-4'>
        <Typography
          as='p'
          className='block text-[18px]/6.5 font-normal tracking-normal text-foreground sm:hidden sm:text-[18px]/6.5'
          variant='body-sm'
        >
          История покупок
        </Typography>
        <OrderHistory />
      </section>
      <LogoutConfirmation open={isLogoutOpen} onConfirm={onLogout} onOpenChange={setIsLogoutOpen} />
      {isEditing && (
        <EditProfile
          user={currentUser}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
        />
      )}
    </main>
  );
}
