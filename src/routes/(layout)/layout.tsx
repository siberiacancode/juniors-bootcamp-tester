import type { PropsWithChildren } from 'react';

import { Footer, Header, MobileNav } from './-components/layout';

export const Layout = ({ children }: PropsWithChildren) => (
  <div className='mx-auto flex min-h-dvh w-full max-w-7xl flex-col p-4 px-4 pt-6 sm:py-16'>
    <Header />
    <div className='flex flex-1 flex-col'>{children}</div>
    <Footer />
    <MobileNav />
  </div>
);
