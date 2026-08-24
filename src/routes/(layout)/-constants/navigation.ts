import { Gamepad2Icon, HistoryIcon, UserIcon } from 'lucide-react';

export const NAV_ITEMS = [
  {
    icon: Gamepad2Icon,
    title: 'navigation.catalog',
    to: '/'
  },
  {
    icon: HistoryIcon,
    title: 'navigation.orders',
    to: '/history'
  },
  {
    icon: UserIcon,
    title: 'navigation.profile',
    to: '/profile'
  }
] as const;
