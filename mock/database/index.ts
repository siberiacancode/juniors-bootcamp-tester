import type { GameOrder, GamePriceVariant, Transaction, User } from '@/generated/api';

import {
  createCardFake,
  createGameDetailedFake,
  createGameOrderFake,
  createGamePriceVariantFake,
  createUserFake,
  GameDeliveryType,
  GameGenre,
  GameOrderStatus,
  GameRegion,
  GameType,
  TransactionOrderType,
  TransactionStatus
} from '@/generated/api';

import { PLACEHOLDER_IMAGE } from '../constants';
import { faker } from '../faker';

const generateGameKey = () =>
  [
    faker.string.alphanumeric(5).toUpperCase(),
    faker.string.alphanumeric(5).toUpperCase(),
    faker.string.alphanumeric(5).toUpperCase()
  ].join('-');

let cards = Array.from({ length: 5 }, () =>
  createCardFake({
    panMasked: faker.string.numeric(4)
  })
);

const users: Record<string, User> = Object.fromEntries(
  Array.from({ length: 77 }, (_, index) => {
    const phone = String(77777777770 + index + 1);

    return [
      phone,
      createUserFake({
        _id: `user-${phone}`,
        phone
      })
    ];
  })
);

const GAME_GENRES = Object.values(GameGenre);
const GAME_REGIONS = Object.values(GameRegion);
const GAME_DELIVERY_TYPES = Object.values(GameDeliveryType);
const GAME_EDITIONS = ['Standard Edition', 'Deluxe Edition', 'Ultimate Edition'];
const GAME_TITLES = [
  'Нельзя купить',
  'Cyberpunk 2077',
  'The Witcher 3: Wild Hunt',
  'Dota 2',
  'Elden Ring: Shadow of the Erdtree',
  'Stardew Valley',
  'Resident Evil 4 Remake',
  'Forza Horizon 5',
  'Minecraft',
  'Counter-Strike 2',
  "Baldur's Gate 3",
  'Hades II',
  'Starfield',
  'Hollow Knight',
  'DOOM Eternal',
  'Animal Crossing: New Horizons',
  'Sid Meier’s Civilization VI',
  'Gran Turismo 7',
  'Terraria',
  'Sea of Thieves'
];
const GAME_STUDIOS = [
  'Demo Studio',
  'CD PROJEKT RED',
  'Valve',
  'FromSoftware',
  'ConcernedApe',
  'CAPCOM',
  'Playground Games',
  'Mojang Studios',
  'Larian Studios',
  'Supergiant Games'
];
const BASE_REQUIREMENTS = {
  minimum: {
    oc: 'Windows 10 64-bit',
    processor: 'Intel Core i5-4460',
    memory: '8 GB RAM',
    graphics: 'NVIDIA GeForce GTX 760',
    storage: '50 GB'
  },
  recommended: {
    oc: 'Windows 11 64-bit',
    processor: 'Intel Core i7-8700',
    memory: '16 GB RAM',
    graphics: 'NVIDIA GeForce RTX 2060',
    storage: '70 GB SSD'
  }
} as const;

const createGamePriceVariantFaker = (index: number): GamePriceVariant => {
  const price = faker.number.int({ min: 499, max: 5999 });
  const hasDiscount = index % 3 === 0;

  const variant = createGamePriceVariantFake({
    region: GAME_REGIONS[index % GAME_REGIONS.length],
    price,
    oldPrice: hasDiscount ? price + faker.number.int({ min: 500, max: 2000 }) : undefined,
    deliveryType: GAME_DELIVERY_TYPES[index % GAME_DELIVERY_TYPES.length],
    edition: GAME_EDITIONS[index % GAME_EDITIONS.length]
  });

  if (!hasDiscount) delete variant.oldPrice;

  return variant;
};

const games = Array.from({ length: 20 }, (_, index: number) => {
  const priceVariants = [
    createGamePriceVariantFaker(index),
    createGamePriceVariantFaker(index + 1)
  ];
  const name = GAME_TITLES[index];
  const studio = GAME_STUDIOS[index % GAME_STUDIOS.length];
  const slug = faker.helpers.slugify(name).toLowerCase();
  const releaseDate = faker.date.between({
    from: new Date('2015-01-01'),
    to: new Date('2026-01-01')
  });

  return {
    detailed: createGameDetailedFake({
      slug,
      name,
      releaseDate: releaseDate.getTime(),
      type: index % 5 === 0 ? GameType.DLC : GameType.GAME,
      genres: [
        GAME_GENRES[index % GAME_GENRES.length],
        GAME_GENRES[(index + 3) % GAME_GENRES.length]
      ],
      image: PLACEHOLDER_IMAGE,
      deliveryTypes: [...new Set(priceVariants.map((variant) => variant.deliveryType))],
      developer: studio,
      publisher: studio,
      externalId: String(100000 + index),
      minimumSystemRequirements: BASE_REQUIREMENTS.minimum,
      recommendedSystemRequirements: BASE_REQUIREMENTS.recommended,
      screenshots: Array.from({ length: 4 }).fill(PLACEHOLDER_IMAGE) as string[]
    }),
    priceVariants
  };
});

let orders = Array.from({ length: 5 }, () => {
  const game = faker.helpers.arrayElement(games);
  const variant = faker.helpers.arrayElement(game.priceVariants);
  const createdAt = faker.date.recent({ days: 30 }).toISOString();

  return createGameOrderFake({
    createdAt,
    updatedAt: createdAt,
    gameSlug: game.detailed.slug,
    gameName: game.detailed.name,
    gameImage: PLACEHOLDER_IMAGE,
    region: variant.region,
    price: variant.price,
    deliveryType: variant.deliveryType,
    edition: variant.edition,
    status: GameOrderStatus.PAID,
    gameKey: generateGameKey()
  });
});

const transactions: Record<string, Transaction> = {};
const AUTH_TOKEN_COOKIE = 'token';

export const db = {
  tokenName: AUTH_TOKEN_COOKIE,

  getUser(phone: string) {
    return users[phone];
  },

  createAuthToken(phone: string) {
    return phone;
  },

  getUserByToken(token?: unknown) {
    if (typeof token !== 'string') return undefined;
    return db.getUser(token);
  },

  updateProfile(phone: string, patch: Partial<User>) {
    const user = users[phone];
    if (!user) return undefined;

    users[phone] = {
      ...user,
      firstname: patch.firstname ?? user.firstname,
      middlename: patch.middlename ?? user.middlename,
      lastname: patch.lastname ?? user.lastname,
      email: patch.email ?? user.email,
      city: patch.city ?? user.city
    };

    return users[phone];
  },

  getCards() {
    return cards;
  },

  deleteCard(cardId: string) {
    cards = cards.filter((card) => card._id !== cardId);
  },

  getGames() {
    return games;
  },

  getGame(slug: string) {
    return games.find((game) => game.detailed.slug === slug);
  },

  getCheapestGameVariant: (variants: GamePriceVariant[]) =>
    variants.reduce((cheapest, current) => (current.price < cheapest.price ? current : cheapest)),

  getOrders() {
    return orders;
  },

  getOrder(orderId: string) {
    return orders.find((order) => order._id === orderId);
  },

  getPaidOrder(orderId: string) {
    const order = db.getOrder(orderId);
    return order?.status === GameOrderStatus.PAID ? order : undefined;
  },

  createOrderWithTransaction(order: GameOrder) {
    const now = Date.now();
    const transaction: Transaction = {
      _id: faker.string.uuid(),
      phone: order.person.phone,
      orderId: order._id,
      orderType: TransactionOrderType.GAME,
      amount: order.price,
      currency: 'RUB',
      status: TransactionStatus.PENDING,
      expiresAt: new Date(now + 10 * 60 * 1000).toISOString(),
      createdAt: new Date(now).toISOString(),
      paidAt: null,
      accessToken: null
    };

    order.transactionId = transaction._id;
    orders = [order, ...orders];
    transactions[transaction._id] = transaction;

    return { order, transaction };
  },

  getTransaction(transactionId: string) {
    return transactions[transactionId];
  },

  hasOrderByPaidToken(token: string) {
    const transaction = Object.values(transactions).find(
      (item) => item.accessToken === token && item.orderId
    );
    if (!transaction?.orderId) return false;

    return Boolean(db.getPaidOrder(transaction.orderId));
  },

  getOrderByPaidToken(token: string) {
    const transaction = Object.values(transactions).find(
      (item) => item.accessToken === token && item.orderId
    );
    if (!transaction?.orderId) return undefined;

    const order = db.getPaidOrder(transaction.orderId);
    if (!order) return undefined;

    transaction.accessToken = null;
    return order;
  },

  completePaymentByTransaction(transactionId: string) {
    const transaction = db.getTransaction(transactionId);
    if (!transaction?.orderId) return undefined;

    const order = db.getOrder(transaction.orderId);
    if (!order) return undefined;

    const now = new Date().toISOString();
    const wasPaid = order.status === GameOrderStatus.PAID;

    order.status = GameOrderStatus.PAID;
    order.updatedAt = now;
    order.gameKey ??= generateGameKey();

    transaction.status = TransactionStatus.PAID;
    transaction.paidAt ??= now;
    if (!wasPaid) transaction.accessToken = faker.string.uuid();

    return {
      order,
      token: transaction.accessToken ?? ''
    };
  }
};
