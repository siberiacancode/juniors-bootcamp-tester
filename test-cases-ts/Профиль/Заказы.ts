import { preconditions, statuses } from '../0 Configuration';
import { profilePreconditions } from './preconditions';

export const profileOrders: TestCase[] = [
  {
    name: 'Профиль. Заказы. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSeveralOrders,
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
    name: 'Профиль. Заказы. Список карточек',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSeveralOrders,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Проверить список карточек заказов',
        expected: [
          'Количество карточек заказов соответствует количеству элементов в массиве orders из ответа GET /games/orders',
          'Порядок карточек заказов соответствует порядку элементов в массиве orders'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Заказы. Карточка заказа. Данные',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSeveralOrders,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Сопоставить данные карточки заказа с элементом orders из ответа GET /games/orders',
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
    name: 'Профиль. Заказы. Карточка заказа. Подробнее',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSeveralOrders,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Нажать кнопку "Подробнее" на карточке заказа',
        expected: [
          'Открылась страница "/tester/history/{orderId}", где orderId равен _id выбранного заказа'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Заказы. Пустой список. Вернуться в каталог игр',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithoutOrders,
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
