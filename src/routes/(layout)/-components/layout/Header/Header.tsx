import { Link, useNavigate } from '@tanstack/react-router';
import { HistoryIcon, LogInIcon, LogOutIcon, UserIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { IconButton } from '@/shared/components/ui/icon-button';
import { useUser } from '@/shared/contexts/user';

export const Header = () => {
  const navigate = useNavigate();

  const user = useUser();

  const onLogout = () => {
    navigate({
      to: '/'
    });
    user.remove();
  };

  return (
    <header className='mb-12 hidden h-16 items-center justify-between px-3 sm:flex'>
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
        {user.isLoggedIn && (
          <Button onClick={onLogout}>
            Выйти
            <LogOutIcon />
          </Button>
        )}
        {!user.isLoggedIn && (
          <Link to='/login'>
            <Button>
              Войти
              <LogInIcon />
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};
