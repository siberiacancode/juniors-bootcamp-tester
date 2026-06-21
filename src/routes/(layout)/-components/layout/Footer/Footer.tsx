import { Link } from '@tanstack/react-router';

import { GithubIcon } from '@/components/icons';
import { Typography } from '@/components/ui/typography';

import { FOOTER_CONTACTS, FOOTER_PRODUCTS, FOOTER_REPOSITORY_URL } from './constants';

export const Footer = () => (
  <footer className='my-20 flex flex-col gap-10 rounded-24 bg-secondary p-6 sm:mt-20 sm:mb-0 sm:justify-between sm:px-10 sm:py-6'>
    <div className='flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-10'>
      <div className='flex flex-col lg:order-0'>
        <Link to='/'>
          <div className='flex flex-col'>
            <Typography as='span' className='font-extrabold' variant='body-sm'>
              <span className='text-[22px]'>🎮</span>GAMES
            </Typography>
            <Typography as='span' variant='body-sm'>
              магазин игр
            </Typography>
          </div>
        </Link>
      </div>
      <div className='order-3 flex flex-col gap-6 lg:order-0'>
        <Typography as='p' variant='body-md'>
          Игры
        </Typography>
        <ul className='flex flex-col gap-4'>
          {FOOTER_PRODUCTS.map((item) => (
            <li key={item.label}>
              <Link className='text-[14px]/[22px] font-medium hover:opacity-70' to={item.to}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='order-4 flex flex-col gap-6 lg:order-0'>
        <Typography as='p' variant='body-md'>
          Связаться с нами
        </Typography>
        <ul className='flex flex-col gap-4'>
          {FOOTER_CONTACTS.map((item) => (
            <li key={item.label}>
              <Link className='text-[14px]/[22px] font-medium hover:opacity-70' to={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
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
        className='text-foreground/40 transition-opacity hover:opacity-80'
        href='#'
        variant='caption'
      >
        Политика конфиденциальности
      </Typography>
      <Typography
        as='a'
        className='text-foreground/40 transition-opacity hover:opacity-80'
        href='#'
        variant='caption'
      >
        Пользовательское соглашение
      </Typography>
    </div>
  </footer>
);
