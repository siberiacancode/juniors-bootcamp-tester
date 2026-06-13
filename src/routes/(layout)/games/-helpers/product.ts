import type { ComponentType, SVGProps } from 'react';

import { Gamepad2Icon, GiftIcon, KeyRoundIcon } from 'lucide-react';

import type { DeliveryType, SystemRequirements } from '@/shared/api/generated';

import { PlayStationIcon } from '@/shared/components/icons/PlayStationIcon';
import { XboxLogoIcon } from '@/shared/components/icons/XboxLogoIcon';

type DeliveryIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const getRequirementRows = (requirements: SystemRequirements) => [
  {
    label: 'ОС:',
    value: requirements.oc
  },
  {
    label: 'Процессор',
    value: requirements.processor
  },
  {
    label: 'Оперативная память',
    value: requirements.memory
  },
  {
    label: 'Видеокарта',
    value: requirements.graphics
  },
  {
    label: 'Место на диске:',
    value: requirements.storage
  },
  {
    label: 'Дополнительно:',
    value:
      '*1080p основное разрешение / 720p разрешение прорисовки, низкие настройки графики, 30 кадров в секунду, требуется SSD'
  }
];

export const deliveryIcons: Record<DeliveryType, DeliveryIconComponent> = {
  epic_key: KeyRoundIcon,
  nintendo_key: Gamepad2Icon,
  playstation_key: PlayStationIcon,
  steam_gift: GiftIcon,
  steam_key: KeyRoundIcon,
  xbox_key: XboxLogoIcon
};
