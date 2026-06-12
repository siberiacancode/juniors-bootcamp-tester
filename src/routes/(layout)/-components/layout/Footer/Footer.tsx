import { Link } from '@tanstack/react-router';

import { GithubIcon } from '@/shared/components/icons/GithubIcon';
import { Typography } from '@/shared/components/ui/typography';

import { FooterLinkGroup } from './components/FooterLinkGroup';
import { FOOTER_CONTACTS, FOOTER_PRODUCTS, FOOTER_REPOSITORY_URL } from './constants';

export const Footer = () => (
  <footer className='my-20 flex flex-col gap-10 rounded-24 bg-secondary p-6 sm:mt-10 sm:mb-0 sm:justify-between sm:px-10 sm:py-6'>
    <div className='flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-10'>
      <div className='flex flex-col lg:order-0'>
        <Link to='/'>
          <div className='flex flex-col'>
            <Typography
              as='span'
              className='text-[16px]/6 font-extrabold tracking-wide'
              variant='body-sm'
            >
              <span className='text-[22px]'>🎮</span>GAMES
            </Typography>
            <Typography
              as='span'
              className='text-[16px]/6 font-medium text-foreground/80'
              variant='body-sm'
            >
              магазин игр
            </Typography>
          </div>
        </Link>
      </div>
      <FooterLinkGroup className='order-3 lg:order-0' items={FOOTER_PRODUCTS} title='Игры' />
      <FooterLinkGroup
        className='order-4 lg:order-0'
        items={FOOTER_CONTACTS}
        title='Связаться с нами'
      />
      <div className='order-2 lg:order-0'>
        <a
          className='inline-flex items-center gap-2 text-[14px]/[22px] font-medium text-foreground transition-opacity hover:opacity-70'
          href={FOOTER_REPOSITORY_URL}
          rel='noopener noreferrer'
          target='_blank'
        >
          <span>Ссылка на GitHub</span>
          <GithubIcon className='size-6' />
        </a>
      </div>
    </div>
    <div className='flex flex-col gap-4 sm:flex-row sm:justify-between'>
      <Typography
        as='a'
        className='text-[14px]/[22px] text-foreground/40 transition-opacity hover:opacity-80'
        href='#'
        variant='body-sm'
      >
        Политика конфиденциальности
      </Typography>
      <Typography
        as='a'
        className='text-[14px]/[22px] text-foreground/40 transition-opacity hover:opacity-60'
        href='#'
        variant='body-sm'
      >
        Пользовательское соглашение
      </Typography>
    </div>
  </footer>
);
