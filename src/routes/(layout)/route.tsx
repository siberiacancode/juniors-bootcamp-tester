import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import { HistoryIcon, LogInIcon, LogOutIcon, UserIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { IconButton } from '@/shared/components/ui/icon-button';
import { useUser } from '@/shared/contexts/user';
import { cn } from '@/shared/utils';

import { navItems } from './-constants';

export const Route = createFileRoute('/(layout)')({
  component: RouteComponent
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const pathname = useLocation({
    select: (location) => location.pathname
  });
  const user = useUser();

  const activeNavIndex = navItems.findIndex((item) => item.to === pathname);

  const onLogout = () => {
    navigate({
      to: '/'
    });
    user.remove();
  };

  return (
    <div className='mx-auto min-h-dvh w-full max-w-7xl px-4 pt-10 pb-32 sm:px-6 sm:py-16'>
      <header className='mb-12 hidden h-16 items-center justify-between rounded-full border border-border-hard px-3 shadow-elevated sm:flex'>
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
      <Outlet />
      <nav className='fixed inset-x-4 bottom-4 z-50 sm:hidden'>
        <div className='relative grid h-18 grid-cols-3 items-center gap-1 rounded-full border border-foreground bg-background p-1 shadow-elevated'>
          {activeNavIndex >= 0 && (
            <div
              style={{
                transform: `translateX(calc(${activeNavIndex * 100}% + ${activeNavIndex * 0.25}rem))`
              }}
              className='pointer-events-none absolute inset-y-1 left-1 w-[calc((100%-1rem)/3)] rounded-full bg-[#7c3aed] transition-transform duration-200 ease-out'
            />
          )}
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                activeProps={{
                  className: 'text-white [&_svg]:stroke-white'
                }}
                className={cn(
                  'relative z-10 flex h-full flex-col items-center justify-center gap-1 rounded-full text-[14px]/4.5 font-bold tracking-normal text-foreground transition-colors duration-300 ease-out',
                  '[&_svg]:size-7'
                )}
                activeOptions={{ exact: item.to === '/' }}
                to={item.to}
              >
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
