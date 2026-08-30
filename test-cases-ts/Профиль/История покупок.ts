import { preconditions, statuses } from '../0 Configuration';

export const profileOrderHistory: TestCase[] = [
  {
    name: 'Профиль. История покупок. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.profileWithOrders,
      preconditions.desktop
    ],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile"',
        expected: [
          'Блок истории покупок соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003784-1576&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. История покупок. Список карточек',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithOrders],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и проверить список покупок',
        expected: [
          'Количество карточек покупок соответствует количеству элементов в массиве orders из ответа GET /games/orders',
          'Порядок карточек покупок соответствует порядку элементов в массиве orders'
        ]
      }
    ]
  },
  {
    name: 'Профиль. История покупок. Карточка покупки. Данные',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithOrders],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и проверить данные карточки покупки',
        expected: [
          'Обложка имеет src="/api{gameImage}" и alt, равный gameName',
          'Название игры соответствует значению gameName',
          'Издание игры соответствует значению edition',
          'Регион соответствует локализованному значению region',
          'Способ получения соответствует локализованному значению deliveryType',
          'Почта соответствует значению person.email'
        ]
      }
    ]
  },
  {
    name: 'Профиль. История покупок. Переход к заказу',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithOrders],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile" и нажать кнопку "Подробнее" на карточке покупки',
        expected: [
          'Открылась страница "/tester/history/{_id}", где _id соответствует выбранному заказу'
        ]
      }
    ]
  },
  {
    name: 'Профиль. История покупок. Пустой список. Переход в каталог',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithoutOrders],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile" и нажать кнопку "Вернуться в каталог игр" в блоке пустого списка',
        expected: ['Открылась страница "/tester/"']
      }
    ]
  }
];
