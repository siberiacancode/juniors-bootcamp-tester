import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'Магазин игр — SSR пример',
  description: 'Учебный пример SSR-каталога на Next.js'
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang='ru'>
    <body>{children}</body>
  </html>
);

export default RootLayout;
