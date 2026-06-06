import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { HistoryIcon, LogInIcon, LogOutIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { IconButton } from '@/shared/components/ui/icon-button';
import { useUser } from '@/shared/contexts/user';

export const Route = createFileRoute('/(layout)')({
  component: RouteComponent
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const user = useUser();

  const onLogout = () => {
    navigate({
      to: '/'
    });
    user.remove();
  };

  return (
    <div className='mx-auto min-h-dvh w-full max-w-7xl px-6 py-16'>
      <header className='mb-12 flex h-16 items-center justify-between rounded-full border border-border-hard px-3'>
        <Link className='text-[16px]/6 font-extrabold tracking-wide' to='/'>
          🎮 GAMES
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
            <Button variant='secondary' onClick={onLogout}>
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

      <Outlet />
    </div>
  );
}
