import { GameView } from '@/generated/api';

export const FOOTER_PRODUCTS = [
  {
    href: '/',
    label: 'navigation.catalog'
  },
  {
    href: `/?view=${GameView.NEW}`,
    label: 'navigation.new'
  },
  {
    href: `/?view=${GameView.POPULAR}`,
    label: 'navigation.popular'
  }
] as const;

export const FOOTER_CONTACTS = [
  {
    href: '/information#support',
    label: 'navigation.support'
  },
  {
    href: '/information#email',
    label: 'navigation.email'
  },
  {
    href: '/information#advertising',
    label: 'navigation.advertising'
  },
  {
    href: '/information#contacts',
    label: 'navigation.contacts'
  }
] as const;

export const FOOTER_REPOSITORY_URL = 'https://github.com/siberiacancode/juniors-bootcamp-tester';
