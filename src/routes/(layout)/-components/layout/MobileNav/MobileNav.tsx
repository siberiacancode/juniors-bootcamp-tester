import { Link } from '@tanstack/react-router';

import { IntlText } from '@/utils/lib/intl';

import { NAV_ITEMS } from '../../../-constants';

export const MobileNav = () => (
  <nav className='fixed inset-x-4 bottom-4 z-50 sm:hidden'>
    <div className='relative grid grid-cols-3 items-center gap-1 rounded-full bg-background p-1 shadow-elevated'>
      {NAV_ITEMS.map(({ icon: Icon, title, to }) => (
        <Link
          key={to}
          activeProps={{
            className: 'font-bold text-accent-secondary'
          }}
          inactiveProps={{
            className: 'font-medium text-muted-fg'
          }}
          activeOptions={{ exact: true }}
          className='relative z-10 flex flex-col items-center justify-center gap-0.5 rounded-full py-2 text-[12px]/4 tracking-wide transition-colors duration-300 ease-out'
          to={to}
        >
          {({ isActive }) => (
            <>
              <Icon strokeWidth={isActive ? 2 : 1.5} />
              <span>
                <IntlText path={title} />
              </span>
            </>
          )}
        </Link>
      ))}
    </div>
  </nav>
);
