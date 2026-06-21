import { useDisclosure } from '@siberiacancode/reactuse';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { HistoryIcon, LogInIcon, LogOutIcon, UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { getUsersSessionQueryKey, useGetUsersSessionQuery } from '@/generated/api';
import { LOCAL_STORAGE_KEYS } from '@/helpers/constants';
import { IntlText } from '@/lib/intl';
import { LogoutConfirmation } from '@/routes/-components';

export const Header = () => {
  const navigate = useNavigate();
  const confirm = useDisclosure();

  const queryClient = useQueryClient();

  const usersSessionResponse = useGetUsersSessionQuery({
    params: { enabled: false }
  });
  const user = usersSessionResponse.data?.data.user;

  const onLogout = () => {
    navigate({
      to: '/'
    });
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    queryClient.removeQueries({
      queryKey: [getUsersSessionQueryKey]
    });
  };

  return (
    <header className='hidden h-16 items-center justify-between px-3 sm:flex'>
      <Link className='text-[16px]/6 font-extrabold tracking-wide' to='/'>
        <span className='text-[22px]'>🎮</span> GAMES
      </Link>
      <div className='flex items-center gap-6'>
        <div className='flex gap-4'>
          <IconButton asChild rounded size='sm' variant='secondary'>
            <Link to='/history'>
              <HistoryIcon />
            </Link>
          </IconButton>
          <IconButton asChild rounded size='sm' variant='secondary'>
            <Link to='/profile'>
              <UserIcon />
            </Link>
          </IconButton>
        </div>
        {user && (
          <Button onClick={confirm.open}>
            <IntlText path='button.logout.confirm' />
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
      {confirm.opened && <LogoutConfirmation onConfirm={onLogout} onOpenChange={confirm.toggle} />}
    </header>
  );
};
