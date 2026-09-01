import { Button, IconButton } from '@siberiacancode/uikit';
import { Link } from '@tanstack/react-router';
import { HistoryIcon, LogInIcon, LogOutIcon, UserIcon } from 'lucide-react';

import type { GetProfileResponse } from '@/generated/api';

import { appOverlaysStore } from '@/app/components/overlays';
import { LogoIcon } from '@/components/icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useGetUsersProfileQuery } from '@/generated/api';
import { IntlText } from '@/utils/lib/intl';

export const Header = () => {
  const usersProfileResponse = useGetUsersProfileQuery({
    params: { enabled: false }
  });
  const usersProfileData = usersProfileResponse.data?.data as GetProfileResponse;
  const user = usersProfileData?.user;

  return (
    <header className='hidden h-16 items-center justify-between px-3 sm:flex'>
      <Link
        className='inline-flex items-center gap-1 text-[16px]/6 font-extrabold tracking-wide'
        to='/'
      >
        <LogoIcon aria-hidden='true' className='h-[19px] w-6 shrink-0' />
        GAMES
      </Link>
      <TooltipProvider delayDuration={300}>
        <div className='flex items-center gap-6'>
          <div className='flex gap-4'>
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton asChild shape='round' size='sm' variant='secondary'>
                  <Link to='/history'>
                    <HistoryIcon />
                  </Link>
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>
                <IntlText path='navigation.orders' />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton asChild shape='round' size='sm' variant='secondary'>
                  <Link to='/profile'>
                    <UserIcon />
                  </Link>
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>
                <IntlText path='navigation.profile' />
              </TooltipContent>
            </Tooltip>
          </div>
          {user && (
            <Button onClick={() => appOverlaysStore.get().open('logout')}>
              <IntlText path='button.logout' />
              <LogOutIcon />
            </Button>
          )}
          {!user && (
            <Button asChild>
              <Link to='/login'>
                <IntlText path='button.login' />
                <LogInIcon />
              </Link>
            </Button>
          )}
        </div>
      </TooltipProvider>
    </header>
  );
};
