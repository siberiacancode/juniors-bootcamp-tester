import { preconditions, statuses } from '../0 Configuration';

const purchaseHistoryListPreconditions: Record<string, string[]> = {
  historyPage: ['Открыта страница "История покупок"'],
  userWithSeveralPurchases: ['Пользователь с несколькими покупками'],
  userWithEmptyPurchaseHistory: ['Пользователь с пустой историей покупок'],
  slowMode: ['Замедлить ответ GET /games/orders']
};

export const purchaseHistoryList: TestCase[] = [
  {
    name: 'История покупок. Список покупок. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      purchaseHistoryListPreconditions.historyPage,
      purchaseHistoryListPreconditions.userWithSeveralPurchases
    ],
    steps: [
      {
        action: 'Проверить соответствие страницы дизайну',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003802-5867&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      purchaseHistoryListPreconditions.historyPage,
      purchaseHistoryListPreconditions.userWithSeveralPurchases
    ],
    steps: [
      {
        action: 'Проверить соответствие страницы дизайну',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003305-7627&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Лоадер. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      purchaseHistoryListPreconditions.slowMode
    ],
    steps: [
      {
        action: 'Открыть страницу "Список покупок" и проверить соответствие страницы дизайну',
        expected: [
          'Лоадер страницы соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-5641&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Лоадер. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      purchaseHistoryListPreconditions.slowMode
    ],
    steps: [
      {
        action: 'Открыть страницу "Список покупок" и проверить соответствие страницы дизайну',
        expected: [
          'Лоадер страницы соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-2732&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Пустой список. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      purchaseHistoryListPreconditions.historyPage,
      purchaseHistoryListPreconditions.userWithEmptyPurchaseHistory
    ],
    steps: [
      {
        action: 'Проверить соответствие страницы дизайну',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003802-5766&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Пустой список. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      purchaseHistoryListPreconditions.historyPage,
      purchaseHistoryListPreconditions.userWithEmptyPurchaseHistory
    ],
    steps: [
      {
        action: 'Проверить соответствие страницы дизайну',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003305-7507&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Пустой список. Вернуться в каталог игр',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      purchaseHistoryListPreconditions.historyPage,
      purchaseHistoryListPreconditions.userWithEmptyPurchaseHistory
    ],
    steps: [
      {
        action: 'Кликнуть на кнопку "Вернуться в каталог игр"',
        expected: ['Открылась страница /']
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Данные',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      purchaseHistoryListPreconditions.historyPage,
      preconditions.userWithAtLeastOnePurchase
    ],
    steps: [
      {
        action: 'Сопоставить покупки на странице с элементами массива из ответа GET /games/orders',
        expected: [
          'Количество и порядок карточек покупок соответствует количеству элементов в orders',
          'Обложка игры отображается из gameImage',
          'alt обложки игры соответствует gameName',
          'Название игры соответствует gameName',
          'Издание игры соответствует edition',
          'Регион соответствует локализованному значению region',
          'Способ получения соответствует локализованному значению deliveryType',
          'Почта получателя соответствует person.email'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Карточка покупки. Кнопка "Перейти на заказ"',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      purchaseHistoryListPreconditions.historyPage,
      preconditions.userWithAtLeastOnePurchase
    ],
    steps: [
      {
        action: 'Кликнуть на кнопку "Перейти на заказ" в карточке покупки',
        expected: ['Открылась страница /history/{orderId}']
      }
    ]
  }
];
