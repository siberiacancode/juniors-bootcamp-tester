import type { Theme } from '@siberiacancode/uikit/theme';

import { ThemeSwitcher, ThemeSwitcherItem, Typography } from '@siberiacancode/uikit';
import { useTheme } from '@siberiacancode/uikit/theme';
import { Link } from '@tanstack/react-router';

import { GithubIcon } from '@/components/icons';
import { LINKS } from '@/utils/constants';
import { IntlText } from '@/utils/lib/intl';

import { FOOTER_CONTACTS, FOOTER_DOCS, FOOTER_PRODUCTS } from './constants';

export const Footer = () => {
  const theme = useTheme();

  return (
    <footer className='my-20 flex flex-col gap-6 rounded-24 bg-secondary p-6 sm:mt-20 sm:mb-0 sm:gap-10 sm:px-10 sm:py-6'>
      <div className='flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-10'>
        <div className='flex flex-col gap-4 lg:order-0 lg:flex-1'>
          <Link to='/'>
            <div className='flex flex-col'>
              <Typography as='span' className='font-extrabold' variant='body-sm'>
                <span className='text-[22px]'>🎮</span>GAMES
              </Typography>
              <Typography as='span' variant='body-sm'>
                <IntlText path='navigation.gameStore' />
              </Typography>
            </div>
          </Link>
          <div className='lg:hidden'>
            <a
              className='inline-flex items-center gap-2 text-[14px]/[22px] font-medium text-foreground transition-opacity hover:opacity-70'
              href={LINKS.REPOSITORY_LINK}
              rel='noopener noreferrer'
              target='_blank'
            >
              <span>
                <IntlText path='link.github' />
              </span>
              <GithubIcon className='size-6' />
            </a>
          </div>
        </div>
        <div className='order-3 flex flex-col gap-6 lg:order-0 lg:flex-1'>
          <Typography as='p' variant='body-md'>
            <IntlText path='navigation.games' />
          </Typography>
          <ul className='flex flex-col gap-4'>
            {FOOTER_PRODUCTS.map((item) => (
              <li key={item.label}>
                <a className='text-[14px]/[22px] font-medium hover:opacity-70' href={item.href}>
                  <IntlText path={item.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='order-4 flex flex-col gap-6 lg:order-0 lg:flex-1'>
          <Typography as='p' variant='body-md'>
            <IntlText path='navigation.contactUs' />
          </Typography>
          <ul className='flex flex-col gap-4'>
            {FOOTER_CONTACTS.map((item) => (
              <li key={item.label}>
                <a className='text-[14px]/[22px] font-medium hover:opacity-70' href={item.href}>
                  <IntlText path={item.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='order-2 hidden lg:order-0 lg:flex lg:flex-1 lg:items-start lg:justify-end'>
          <a
            className='inline-flex items-center gap-2 self-start text-[14px]/[22px] font-medium text-foreground transition-opacity hover:opacity-70'
            href={LINKS.REPOSITORY_LINK}
            rel='noopener noreferrer'
            target='_blank'
          >
            <span>
              <IntlText path='link.github' />
            </span>
            <GithubIcon className='size-6' />
          </a>
        </div>
      </div>
      <div className='flex flex-col gap-4 sm:flex-row sm:justify-between'>
        <div className='flex flex-col gap-4 sm:flex-row sm:gap-24'>
          <Typography
            as='a'
            className='text-foreground/40 transition-opacity hover:opacity-80'
            href={FOOTER_DOCS.PRIVACY_POLICY}
            variant='caption'
          >
            <IntlText path='navigation.privacyPolicy' />
          </Typography>
          <Typography
            as='a'
            className='text-foreground/40 transition-opacity hover:opacity-80'
            href={FOOTER_DOCS.USER_AGREEMENT}
            variant='caption'
          >
            <IntlText path='navigation.userAgreement' />
          </Typography>
        </div>
        <ThemeSwitcher
          className='self-start sm:self-auto'
          value={theme.value}
          onValueChange={(value) => theme.set(value as Theme)}
        >
          <ThemeSwitcherItem value='light' />
          <ThemeSwitcherItem value='system' />
          <ThemeSwitcherItem value='dark' />
        </ThemeSwitcher>
      </div>
    </footer>
  );
};
