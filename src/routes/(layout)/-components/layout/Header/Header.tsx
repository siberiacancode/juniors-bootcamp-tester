import { useDisclosure } from '@siberiacancode/reactuse';
import { Button, IconButton } from '@siberiacancode/uikit';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { HistoryIcon, LogInIcon, LogOutIcon, UserIcon } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  getUsersProfileQueryKey,
  useGetUsersProfileQuery,
  usePostAuthSignOutMutation
} from '@/generated/api';
import { LogoutConfirmation } from '@/routes/-components';
import { IntlText } from '@/utils/lib/intl';

export const Header = () => {
  const navigate = useNavigate();
  const confirm = useDisclosure();

  const queryClient = useQueryClient();
  const postAuthSignOutMutation = usePostAuthSignOutMutation();

  const usersProfileResponse = useGetUsersProfileQuery({
    params: { enabled: false }
  });
  const user = usersProfileResponse.data?.data.user;

  const onLogout = async () => {
    const authSignOutResponse = await postAuthSignOutMutation.mutateAsync();

    if (!authSignOutResponse.data.success) return;

    navigate({
      to: '/'
    });
    queryClient.removeQueries({
      queryKey: [getUsersProfileQueryKey]
    });
  };

  return (
    <header className='hidden h-16 items-center justify-between px-3 sm:flex'>
      <Link className='text-[16px]/6 font-extrabold tracking-wide' to='/'>
        <span className='text-[22px]'>🎮</span> GAMES
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
            <Button disabled={postAuthSignOutMutation.isPending} onClick={confirm.open}>
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
      {confirm.opened && <LogoutConfirmation onConfirm={onLogout} onOpenChange={confirm.toggle} />}
    </header>
  );
};
