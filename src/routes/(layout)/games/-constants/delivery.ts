import type { ComponentType, SVGProps } from 'react';

import { Gamepad2Icon, GiftIcon, KeyRoundIcon } from 'lucide-react';

import type { DeliveryType } from '@/generated/api';

import { PlayStationIcon } from '@/components/icons/PlayStationIcon';
import { XboxLogoIcon } from '@/components/icons/XboxLogoIcon';

export const deliveryIcons: Record<DeliveryType, ComponentType<SVGProps<SVGSVGElement>>> = {
  epic_key: KeyRoundIcon,
  nintendo_key: Gamepad2Icon,
  playstation_key: PlayStationIcon,
  steam_gift: GiftIcon,
  steam_key: KeyRoundIcon,
  xbox_key: XboxLogoIcon
};
