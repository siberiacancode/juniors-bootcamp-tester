import { Button, Typography } from '@siberiacancode/uikit';

import { MascotFrontIcon } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogoutConfirmation } from '@/routes/-components';
import { IntlText } from '@/utils/lib/intl';

import { EditProfileDrawer } from '../EditProfileDrawer/EditProfileDrawer';
import { useProfileInfo } from './hooks';

export const ProfileInfo = () => {
  const { state, features, functions } = useProfileInfo();

  return (
    <section className='flex w-full max-w-[374px] flex-col gap-4'>
      <div className='flex w-full flex-row items-center gap-4'>
        <Avatar className='size-[86px] bg-secondary' size='xl'>
          <AvatarFallback className='bg-secondary text-[32px]/[40px] font-medium text-foreground'>
            {/* 🐛 bug */}
            {/* Safari does not show profile fallback avatar content */}
            {/* <span className='supports-[-webkit-hyphens:none]:hidden'> */}
            <span>
              {!state.displayName ? (
                <MascotFrontIcon />
              ) : (
                (state.displayName || state.user.email || 'A').trim().charAt(0).toUpperCase()
              )}
            </span>
          </AvatarFallback>
        </Avatar>
        <div className='flex w-full min-w-0 flex-col items-start text-left lg:w-[272px]'>
          <Typography as='p' className='w-full truncate' variant='body-lg'>
            {state.displayName || <IntlText path='page.profile.fallbackName' />}
          </Typography>
          {state.user.email && (
            <Typography as='p' className='w-full truncate text-foreground/50' variant='caption'>
              {state.user.email}
            </Typography>
          )}
          {state.phone && (
            <Typography as='p' className='w-full truncate' variant='caption'>
              {state.phone}
            </Typography>
          )}
        </div>
      </div>
      <div className='flex w-full flex-col items-center gap-4'>
        <Button
          className='w-full'
          size='lg'
          type='button'
          variant='secondary'
          onClick={features.editDialog.open}
        >
          <IntlText path='button.editProfile' />
        </Button>
        <Button className='w-full' size='lg' type='button' onClick={features.confirmDialog.open}>
          <IntlText path='button.logout' />
        </Button>
      </div>

      {features.confirmDialog.opened && (
        <LogoutConfirmation
          onConfirm={functions.onLogout}
          onOpenChange={features.confirmDialog.close}
        />
      )}
      {features.editDialog.opened && <EditProfileDrawer onClose={features.editDialog.close} />}
    </section>
  );
};
