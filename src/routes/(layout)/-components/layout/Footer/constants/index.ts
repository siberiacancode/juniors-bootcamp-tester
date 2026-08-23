import { GameView } from '@/generated/api';

export const FOOTER_DOCS = {
  PRIVACY_POLICY: '/privacy-policy.html',
  USER_AGREEMENT: '/user-agreement.html'
};

export const FOOTER_PRODUCTS = [
  {
    href: `${import.meta.env.BASE_URL}/`,
    label: 'navigation.catalog'
  },
  {
    href: `${import.meta.env.BASE_URL}/?view=${GameView.NEW}`,
    label: 'navigation.new'
  },
  {
    href: `${import.meta.env.BASE_URL}/?view=${GameView.POPULAR}`,
    label: 'navigation.popular'
  }
] as const;

export const FOOTER_CONTACTS = [
  {
    href: `${import.meta.env.BASE_URL}/information#support`,
    label: 'navigation.support'
  },
  {
    href: `${import.meta.env.BASE_URL}/information#email`,
    label: 'navigation.email'
  },
  {
    href: `${import.meta.env.BASE_URL}/information#advertising`,
    label: 'navigation.advertising'
  },
  {
    href: `${import.meta.env.BASE_URL}/information#contacts`,
    label: 'navigation.contacts'
  }
] as const;
