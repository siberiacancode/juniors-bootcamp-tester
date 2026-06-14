import { LogoutConfirmation } from '@modules/LogoutConfirmation/LogoutConfirmation';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { HistoryIcon, LogInIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { LOCAL_STORAGE_KEYS } from '@/constants';
import { getUsersSessionQueryKey, useGetUsersSessionQuery } from '@/generated/api';

export const Header = () => {
  const navigate = useNavigate();
  const usersSessionQuery = useGetUsersSessionQuery();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const queryClient = useQueryClient();

  const user = usersSessionQuery.data?.data.user;

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
          <Button onClick={() => setIsLogoutOpen(true)}>
            Выйти
            <LogOutIcon />
          </Button>
        )}
        {!user && (
          <Link to='/login'>
            <Button>
              Войти
              <LogInIcon />
            </Button>
          </Link>
        )}
      </div>
      <LogoutConfirmation open={isLogoutOpen} onConfirm={onLogout} onOpenChange={setIsLogoutOpen} />
    </header>
  );
};
