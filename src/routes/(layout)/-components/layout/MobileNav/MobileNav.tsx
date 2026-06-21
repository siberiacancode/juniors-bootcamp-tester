import { Link, useLocation } from '@tanstack/react-router';

import { cn } from '@/lib/utils';

import { navItems } from './constants';

export const MobileNav = () => {
  const pathname = useLocation({
    select: (location) => location.pathname
  });

  const activeNavIndex = navItems.findIndex((item) =>
    item.to === '/' ? pathname === '/' : pathname === item.to || pathname.startsWith(`${item.to}/`)
  );

  return (
    <nav className='fixed inset-x-4 bottom-4 z-50 sm:hidden'>
      <div className='relative grid h-18 grid-cols-3 items-center gap-1 rounded-full border border-foreground bg-background p-1 shadow-elevated'>
        {activeNavIndex >= 0 && (
          <div
            style={{
              transform: `translateX(calc(${activeNavIndex * 100}% + ${activeNavIndex * 0.25}rem))`
            }}
            className='pointer-events-none absolute inset-y-1 left-1 w-[calc((100%-1rem)/3)] rounded-full bg-[#7c3aed] transition-transform duration-300 ease-out'
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
              to={item.to}
            >
              <Icon />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
