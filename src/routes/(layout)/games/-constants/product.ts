import type {
  DeliveryType,
  DetailedGame,
  GameGenre,
  PriceVariant,
  Region
} from '@/shared/api/generated';

export type ProductGame = DetailedGame & {
  priceVariants: PriceVariant[];
};

export interface ProductRegionOption {
  label: string;
  value: Region;
}

export interface ProductDeliveryOption {
  description: string;
  label: string;
  value: DeliveryType;
}

export const PRODUCT_GENRE_LABELS: Record<GameGenre, string> = {
  action: 'Экшены',
  adventure: 'Приключенческие игры',
  horror: 'Хорроры',
  indie: 'Инди',
  racing: 'Гонки',
  rpg: 'Ролевые игры',
  shooter: 'Шутеры',
  simulation: 'Симуляторы',
  sports: 'Спортивные игры',
  strategy: 'Стратегии',
  survival: 'Выживание'
};

export const PRODUCT_DELIVERY_OPTIONS = [
  {
    description: 'Код',
    label: 'Steam ключ',
    value: 'steam_key'
  },
  {
    description: 'Код',
    label: 'Steam Gift',
    value: 'steam_gift'
  },
  {
    description: 'Код',
    label: 'Xbox One/Series',
    value: 'xbox_key'
  },
  {
    description: 'Код',
    label: 'PlayStation',
    value: 'playstation_key'
  }
] as const satisfies ProductDeliveryOption[];

export const PRODUCT_REGION_OPTIONS = [
  {
    label: 'Россия',
    value: 'ru'
  },
  {
    label: 'Турция',
    value: 'tr'
  },
  {
    label: 'Казахстан',
    value: 'kz'
  },
  {
    label: 'Азия',
    value: 'asia'
  },
  {
    label: 'Европа',
    value: 'europe'
  },
  {
    label: 'Беларусь',
    value: 'by'
  },
  {
    label: 'Польша',
    value: 'pl'
  },
  {
    label: 'Украина',
    value: 'ua'
  },
  {
    label: 'Мир',
    value: 'all_world'
  }
] as const satisfies ProductRegionOption[];

const diabloScreenshot = (hash: string): string =>
  `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2344520/${hash}/ss_${hash}.600x338.jpg?t=1780334052`;

export const productGames = [
  {
    deliveryTypes: ['steam_key', 'steam_gift', 'xbox_key', 'playstation_key'],
    description:
      'Вступите в бой за Санктуарий в знаменитой экшн-RPG Diablo® IV. Погрузитесь в получившую признание игроков сюжетную кампанию и исследуйте новый сезонный контент.',
    developer: 'Blizzard Entertainment, Inc.',
    externalId: '2344520',
    genres: ['action', 'adventure', 'rpg', 'strategy'],
    image:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2344520/80f21a42e378b93e8fbb68ee43103be8ab84891b/header.jpg?t=1780334052',
    minimumSystemRequirements: {
      graphics: 'NVIDIA® GeForce® GTX 660 или Intel® Arc™ A380 или AMD Radeon™ R9 280',
      memory: '8 GB ОЗУ',
      oc: '64-разрядная Windows® 10, версия 1909 или более новая',
      processor: 'Intel® Core™ i5-2500K или AMD™ FX-8350',
      storage: '90 GB'
    },
    name: 'Diablo® IV',
    priceVariants: [
      {
        deliveryType: 'steam_gift',
        edition: 'Diablo® IV: Age of Hatred Collection',
        oldPrice: 5200,
        price: 4680,
        region: 'ru'
      },
      {
        deliveryType: 'steam_gift',
        edition: 'Standard Edition',
        oldPrice: 3990,
        price: 3590,
        region: 'ru'
      },
      {
        deliveryType: 'steam_gift',
        edition: 'Ultimate Edition',
        oldPrice: 6990,
        price: 6290,
        region: 'ru'
      },
      {
        deliveryType: 'steam_key',
        edition: 'Standard Edition',
        oldPrice: 3907,
        price: 3634,
        region: 'ru'
      },
      {
        deliveryType: 'steam_gift',
        edition: 'Standard Edition',
        price: 4290,
        region: 'tr'
      },
      {
        deliveryType: 'steam_gift',
        edition: 'Ultimate Edition',
        oldPrice: 6990,
        price: 6290,
        region: 'kz'
      },
      {
        deliveryType: 'xbox_key',
        edition: 'Standard Edition',
        price: 4590,
        region: 'ru'
      },
      {
        deliveryType: 'playstation_key',
        edition: 'Standard Edition',
        price: 4890,
        region: 'ru'
      }
    ],
    publisher: 'Blizzard Entertainment, Inc.',
    recommendedSystemRequirements: {
      graphics: 'NVIDIA® GeForce® GTX 970 или Intel® Arc™ A750 или AMD Radeon™ RX 470',
      memory: '16 GB ОЗУ',
      oc: '64-разрядная Windows® 10, версия 1909 или более новая',
      processor: 'Intel® Core™ i5-4670K или AMD™ R3-1300X',
      storage: '90 GB SSD'
    },
    releaseDate: new Date('2023-10-17T00:00:00.000Z').getTime(),
    screenshots: [
      diabloScreenshot('8512b560be0ddef49cb0da366b7d2ddf5df18cab'),
      diabloScreenshot('24952fc1c8779c9a7a555c01489c76f9814f70a7'),
      diabloScreenshot('7eda1d661ffde2750d56517e1a46406f340675e5'),
      diabloScreenshot('38d64c37bf2e84bbec5138cf114529eada712ebc'),
      diabloScreenshot('11d4a9be127719b22681d823b83b0c6b4798bf1f')
    ],
    slug: 'diablo-iv',
    type: 'game'
  }
] satisfies ProductGame[];
