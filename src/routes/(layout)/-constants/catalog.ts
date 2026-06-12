import type { FilteredGame, GameFilter, GameGenre, GameView, PriceVariant } from '@/shared/api/generated';

export type CatalogView = 'all' | GameView;

export const CATALOG_GENRES = [
  'action',
  'adventure',
  'rpg',
  'strategy',
  'shooter',
  'simulation',
  'survival',
  'sports',
  'racing',
  'indie',
  'horror'
] as const satisfies GameGenre[];

export const CATALOG_FILTERS = ['discount', 'dlc'] as const satisfies GameFilter[];

export const CATALOG_VIEWS = [
  {
    label: 'Весь каталог',
    value: 'all'
  },
  {
    label: 'Новинки',
    value: 'new'
  },
  {
    label: 'Популярные',
    value: 'popular'
  }
] as const satisfies Array<{
  label: string;
  value: CatalogView;
}>;

export const CATALOG_GENRE_LABELS: Record<GameGenre, string> = {
  action: 'Экшены',
  adventure: 'Приключенческие игры',
  rpg: 'Ролевые игры',
  strategy: 'Стратегии',
  shooter: 'Шутеры',
  simulation: 'Симуляторы',
  survival: 'Выживание',
  sports: 'Спортивные игры',
  racing: 'Гонки',
  indie: 'Инди',
  horror: 'Хорроры'
};

const steamHeader = (appId: number): string =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`;

const priceVariant = (price: number, oldPrice?: number): PriceVariant => ({
  deliveryType: 'steam_key',
  edition: 'Standard Edition',
  oldPrice,
  price,
  region: 'ru'
});

export const CATALOG_POPULAR_SLUGS = [
  'diablo-iv',
  'elden-ring',
  'red-dead-redemption-2',
  'half-life-alyx',
  'dark-souls-iii',
  'the-elder-scrolls-v-skyrim'
] as const;

export const catalogGames = [
  {
    genres: ['action', 'rpg'],
    image: steamHeader(2344520),
    name: 'Diablo® IV',
    priceVariant: priceVariant(3634, 3907),
    releaseDate: 2023,
    slug: 'diablo-iv',
    type: 'game'
  },
  {
    genres: ['action', 'adventure', 'rpg'],
    image: steamHeader(1297900),
    name: 'Gothic 1 Remake',
    priceVariant: priceVariant(2959),
    releaseDate: 2025,
    slug: 'gothic-1-remake',
    type: 'game'
  },
  {
    genres: ['action', 'adventure', 'survival'],
    image: steamHeader(1259420),
    name: 'Days Gone',
    priceVariant: priceVariant(1849, 2499),
    releaseDate: 2021,
    slug: 'days-gone',
    type: 'game'
  },
  {
    genres: ['action', 'rpg'],
    image: steamHeader(1245620),
    name: 'ELDEN RING',
    priceVariant: priceVariant(3999),
    releaseDate: 2022,
    slug: 'elden-ring',
    type: 'game'
  },
  {
    genres: ['action', 'adventure', 'indie'],
    image: steamHeader(1313140),
    name: 'Cult of the Lamb',
    priceVariant: priceVariant(1499, 1999),
    releaseDate: 2022,
    slug: 'cult-of-the-lamb',
    type: 'game'
  },
  {
    genres: ['adventure', 'rpg'],
    image: steamHeader(72850),
    name: 'The Elder Scrolls V: Skyrim',
    priceVariant: priceVariant(2499),
    releaseDate: 2011,
    slug: 'the-elder-scrolls-v-skyrim',
    type: 'game'
  },
  {
    genres: ['racing', 'sports'],
    image: steamHeader(1551360),
    name: 'Forza Horizon 6',
    priceVariant: priceVariant(5299),
    releaseDate: 2026,
    slug: 'forza-horizon-6',
    type: 'game'
  },
  {
    genres: ['action', 'adventure', 'horror'],
    image: steamHeader(1196590),
    name: 'Resident Evil Requiem',
    priceVariant: priceVariant(4299, 4999),
    releaseDate: 2026,
    slug: 'resident-evil-requiem',
    type: 'game'
  },
  {
    genres: ['action', 'shooter'],
    image: steamHeader(1808500),
    name: 'ARC Raiders',
    priceVariant: priceVariant(3199),
    releaseDate: 2025,
    slug: 'arc-raiders',
    type: 'game'
  },
  {
    genres: ['action', 'shooter'],
    image: steamHeader(12140),
    name: 'Max Payne',
    priceVariant: priceVariant(599, 999),
    releaseDate: 2001,
    slug: 'max-payne',
    type: 'game'
  },
  {
    genres: ['action', 'adventure'],
    image: steamHeader(1174180),
    name: 'Red Dead Redemption 2',
    priceVariant: priceVariant(2599, 3999),
    releaseDate: 2019,
    slug: 'red-dead-redemption-2',
    type: 'game'
  },
  {
    genres: ['action', 'adventure', 'shooter'],
    image: steamHeader(546560),
    name: 'Half-Life: Alyx',
    priceVariant: priceVariant(2299),
    releaseDate: 2020,
    slug: 'half-life-alyx',
    type: 'game'
  },
  {
    genres: ['action', 'rpg', 'shooter'],
    image: steamHeader(3156770),
    name: 'Witchfire',
    priceVariant: priceVariant(1699, 2299),
    releaseDate: 2024,
    slug: 'witchfire',
    type: 'game'
  },
  {
    genres: ['action', 'rpg'],
    image: steamHeader(374320),
    name: 'DARK SOULS III',
    priceVariant: priceVariant(3499),
    releaseDate: 2016,
    slug: 'dark-souls-iii',
    type: 'dlc'
  },
  {
    genres: ['action', 'shooter'],
    image: steamHeader(3017860),
    name: 'DOOM: The Dark Ages',
    priceVariant: priceVariant(5999),
    releaseDate: 2025,
    slug: 'doom-the-dark-ages',
    type: 'game'
  }
] satisfies FilteredGame[];
