import { Gamepad2Icon, HistoryIcon, UserIcon } from 'lucide-react';

export * from './purchaseHistory';

export const navItems = [
  {
    icon: Gamepad2Icon,
    label: 'Каталог',
    to: '/'
  },
  {
    icon: HistoryIcon,
    label: 'История',
    to: '/history'
  },
  {
    icon: UserIcon,
    label: 'Профиль',
    to: '/profile'
  }
] as const;
