import type { ComponentType } from 'react';

import { GiftIcon, KeyRoundIcon } from 'lucide-react';

import { PlayStationIcon, XboxLogoIcon } from '@/components/icons';
import { GameDeliveryType } from '@/generated/api';

interface DeliveryTypeOption {
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  platform: string;
  subtitlePath: MessagePath;
  titlePath: MessagePath;
}

export const DELIVERY_TYPE_VIEW: Record<GameDeliveryType, DeliveryTypeOption> = {
  [GameDeliveryType.STEAM_KEY]: {
    titlePath: 'page.gameProduct.delivery.steam_key.title',
    subtitlePath: 'page.gameProduct.delivery.keySubtitle',
    Icon: KeyRoundIcon,
    platform: 'Steam'
  },
  [GameDeliveryType.STEAM_GIFT]: {
    titlePath: 'page.gameProduct.delivery.steam_gift.title',
    subtitlePath: 'page.gameProduct.delivery.codeSubtitle',
    Icon: GiftIcon,
    platform: 'Steam'
  },
  [GameDeliveryType.XBOX_KEY]: {
    titlePath: 'page.gameProduct.delivery.xbox_key.title',
    subtitlePath: 'page.gameProduct.delivery.keySubtitle',
    Icon: XboxLogoIcon,
    platform: 'Xbox'
  },
  [GameDeliveryType.PLAYSTATION_KEY]: {
    titlePath: 'page.gameProduct.delivery.playstation_key.title',
    subtitlePath: 'page.gameProduct.delivery.keySubtitle',
    Icon: PlayStationIcon,
    platform: 'PlayStation'
  },
  [GameDeliveryType.EPIC_KEY]: {
    titlePath: 'page.gameProduct.delivery.epic_key.title',
    subtitlePath: 'page.gameProduct.delivery.keySubtitle',
    Icon: KeyRoundIcon,
    platform: 'Epic Games'
  },
  [GameDeliveryType.NINTENDO_KEY]: {
    titlePath: 'page.gameProduct.delivery.nintendo_key.title',
    subtitlePath: 'page.gameProduct.delivery.keySubtitle',
    Icon: KeyRoundIcon,
    platform: 'Nintendo'
  }
};
