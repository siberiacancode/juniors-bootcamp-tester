import { preconditions, statuses } from '../0 Configuration';
import { profilePreconditions } from './preconditions';

const profilePagePreconditions: Record<string, string[]> = {
  slowMode: [
    'Замедлить ответы на запросы GET /users/profile, GET /cards/cards и GET /games/orders'
  ],
  userWithoutCards: ['Пользователь без сохранённых карт']
};

export const profilePage: TestCase[] = [
  {
    name: 'Профиль. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.pageOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003330-7130&t=uO8ocxt4ibI98G8q-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.pageOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003305-6961&t=uO8ocxt4ibI98G8q-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Лоадер. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.pageOpened,
      profilePagePreconditions.slowMode
    ],
    steps: [
      {
        action: 'Обновить страницу и проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-5262&t=uO8ocxt4ibI98G8q-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Лоадер. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.pageOpened,
      profilePagePreconditions.slowMode
    ],
    steps: [
      {
        action: 'Обновить страницу и проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-2813&t=uO8ocxt4ibI98G8q-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Вкладки. Нет сохранённых карт',
    status: statuses.needRework,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profilePagePreconditions.userWithoutCards
    ],
    steps: [
      {
        action: 'Проверить вкладки профиля',
        expected: [
          'Блок вкладок "Заказы" и "Карты" отсутствует на странице',
          'Отображается раздел "Заказы"'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Вкладки. Дефолтная вкладка',
    status: statuses.needRework,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards
    ],
    steps: [
      {
        action: 'Проверить вкладки профиля',
        expected: [
          'Блок вкладок "Заказы" и "Карты" отображается',
          'По-умолчанию выбрана вкладка "Заказы"'
        ]
      }
    ]
  }
];
