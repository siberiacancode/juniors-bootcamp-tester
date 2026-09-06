import { preconditions, statuses } from '../0 Configuration';
import { profilePreconditions } from './preconditions';

const ordersPreconditions: Record<string, string[]> = {
  userWithoutOrders: ['Профиль без заказов'],
  slowMode: ['Замедлить запрос GET /games/orders']
};

export const orders: TestCase[] = [
  {
    name: 'Профиль. Заказы. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.pageOpened,
      preconditions.userWithAtLeastOnePurchase
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003784-1677&t=FKnJbDsTAMkeWSbx-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Заказы. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.pageOpened,
      preconditions.userWithAtLeastOnePurchase
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013247-54764&t=FKnJbDsTAMkeWSbx-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Заказы. Лоадер. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.pageOpened,
      preconditions.userWithAtLeastOnePurchase,
      ordersPreconditions.slowMode
    ],
    steps: [
      {
        action: 'Обновить страницу и проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-5358&t=FKnJbDsTAMkeWSbx-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Заказы. Лоадер. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.pageOpened,
      preconditions.userWithAtLeastOnePurchase,
      ordersPreconditions.slowMode
    ],
    steps: [
      {
        action: 'Обновить страницу и проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-2848&t=FKnJbDsTAMkeWSbx-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Заказы. Пустой список. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.pageOpened,
      ordersPreconditions.userWithoutOrders
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-28956&t=FKnJbDsTAMkeWSbx-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Заказы. Пустой список. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.pageOpened,
      ordersPreconditions.userWithoutOrders
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003330-7059&t=FKnJbDsTAMkeWSbx-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Заказы. Данные',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      preconditions.userWithAtLeastOnePurchase
    ],
    steps: [
      {
        action: 'Сопоставить данные заказов с элементами orders из ответа GET /games/orders',
        expected: [
          'Количество и порядок карточек заказов соответствует массиву orders из ответа GET /games/orders',
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
    name: 'Профиль. Заказы. Подробнее',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      preconditions.userWithAtLeastOnePurchase
    ],
    steps: [
      {
        action: 'Нажать кнопку "Подробнее" на карточке заказа',
        expected: [
          'Открылась страница "/history/{orderId}", где orderId равен _id выбранного заказа'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Заказы. Пустой список. Вернуться в каталог игр',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      ordersPreconditions.userWithoutOrders
    ],
    steps: [
      {
        action: 'Нажать кнопку "Вернуться в каталог игр"',
        expected: ['Открылась страница "/"']
      }
    ]
  }
];
