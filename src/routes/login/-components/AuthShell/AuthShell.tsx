import type { ReactNode } from 'react';

import { cn } from '@/shared/utils';

interface AuthShellProps {
  children: ReactNode;
  className?: string;
}

export const AuthShell = ({ children, className }: AuthShellProps) => (
  <main className='min-h-dvh px-4 pt-10 sm:grid sm:place-items-center sm:px-6 sm:py-12'>
    <div className={cn('flex w-full flex-col sm:max-w-76 sm:gap-10', className)}>
      <div className='hidden text-center text-[16px]/6 font-extrabold tracking-wide sm:block'>
        🎮 GAMES
      </div>
      {children}
    </div>
  </main>
);
