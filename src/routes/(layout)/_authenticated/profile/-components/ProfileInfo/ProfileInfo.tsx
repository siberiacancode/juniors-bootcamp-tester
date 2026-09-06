import { Avatar, AvatarFallback, Button, Typography } from '@siberiacancode/uikit';

import { appOverlaysStore } from '@/app/components/overlays';
import { MascotFrontIcon } from '@/components/icons';
import { IntlText } from '@/utils/lib/intl';

import { useProfileInfo } from './hooks';

export const ProfileInfo = () => {
  const { state } = useProfileInfo();

  return (
    <section className='mx-auto flex w-full max-w-[328px] flex-col gap-4 lg:mx-0 lg:max-w-[374px]'>
      <div className='flex w-full flex-col items-center gap-4 lg:flex-row'>
        <Avatar className='size-[86px] bg-secondary'>
          <AvatarFallback className='bg-secondary text-[32px]/[40px] font-medium text-foreground'>
            {/* 🐛 bug */}
            {/* Safari does not show profile fallback avatar content */}
            {/* <span className='supports-[-webkit-hyphens:none]:hidden'> */}
            <span className='flex size-full items-center justify-center'>
              {!state.displayName ? (
                <MascotFrontIcon className='size-full' />
              ) : (
                (state.displayName || state.user.email || 'A').trim().charAt(0).toUpperCase()
              )}
            </span>
          </AvatarFallback>
        </Avatar>
        <div className='flex w-full min-w-0 flex-col items-center text-center lg:w-[272px] lg:items-start lg:text-left'>
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
      <div className='flex w-full flex-col items-start gap-2.5 lg:items-center lg:gap-4'>
        <Button
          className='w-full'
          size='lg'
          type='button'
          variant='secondary'
          onClick={() => appOverlaysStore.get().open('editProfile')}
        >
          <IntlText path='button.editProfile' />
        </Button>
        <Button
          className='w-full'
          size='lg'
          type='button'
          onClick={() => appOverlaysStore.get().open('logout')}
        >
          <IntlText path='button.logout' />
        </Button>
      </div>
    </section>
  );
};
