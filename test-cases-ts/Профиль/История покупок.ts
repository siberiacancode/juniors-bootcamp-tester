import { preconditions, statuses } from '../0 Configuration';
import { profilePreconditions } from './preconditions';

export const profileOrderHistory: TestCase[] = [
  {
    name: 'Профиль. История покупок. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSeveralPurchases,
      preconditions.desktop,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003784-1576&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. История покупок. Список карточек',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSeveralPurchases,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Проверить список карточек покупок',
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
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSeveralPurchases,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action:
          'Сопоставить данные карточки покупки с элементом orders из ответа GET /games/orders',
        expected: [
          'src обложки равен "/api{gameImage}"',
          'alt обложки соответствует gameName',
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
    name: 'Профиль. История покупок. Карточка покупки. Подробнее',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSeveralPurchases,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Нажать кнопку "Подробнее" на карточке покупки',
        expected: [
          'Открылась страница "/tester/history/{orderId}", где orderId равен _id выбранной покупки'
        ]
      }
    ]
  },
  {
    name: 'Профиль. История покупок. Пустой список. Вернуться в каталог игр',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithoutPurchases,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Нажать кнопку "Вернуться в каталог игр" в блоке пустого списка',
        expected: ['Открылась страница "/tester/"']
      }
    ]
  }
];
