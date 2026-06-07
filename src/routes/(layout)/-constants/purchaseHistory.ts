import type { GameOrder } from '@/shared/api/generated';

export type PurchaseHistoryItem = GameOrder & {
  paymentAmount: number;
  paymentMethod: string;
};

export const mockPurchaseHistory: PurchaseHistoryItem[] = [
  {
    _id: 'mock-diablo-iv-order',
    person: {
      phone: '79131234567',
      email: 'juniorsbootcamp@mail.ru'
    },
    gameSnapshot: {
      slug: 'diablo-iv',
      name: 'Diablo® IV',
      image:
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2344520/80f21a42e378b93e8fbb68ee43103be8ab84891b/header.jpg?t=1780334052',
      region: 'ru',
      price: 4999,
      deliveryType: 'steam_key',
      edition: 'Diablo® IV: Age of Hatred Collection'
    },
    gameKey: '2G73NTU91S',
    paymentAmount: 4680,
    paymentMethod: 'JB Pay'
  },
  {
    _id: 'mock-skyrim-order',
    person: {
      phone: '79131234567',
      email: 'juniorsbootcamp@mail.ru'
    },
    gameSnapshot: {
      slug: 'the-elder-scrolls-v-skyrim',
      name: 'The Elder Scrolls V: Skyrim',
      image:
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/72850/header.jpg?t=1721923139',
      region: 'ru',
      price: 2499,
      deliveryType: 'steam_key',
      edition: 'The Elder Scrolls V: Skyrim Special Edition Steam Россия+СНГ'
    },
    gameKey: '8J41KLM72Q',
    paymentAmount: 2499,
    paymentMethod: 'JB Pay'
  }
];

export const getMockPurchaseHistoryItem = (orderId: string) =>
  mockPurchaseHistory.find((order) => order._id === orderId);
