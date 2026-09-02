import { preconditions, statuses } from '../0 Configuration';
import { systemPreconditions } from './preconditions';

export const logoutConfirmation: TestCase[] = [
  {
    name: 'Системное. Подтверждение выхода. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      systemPreconditions.logoutConfirmationOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-29339&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    name: 'Системное. Подтверждение выхода. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      systemPreconditions.logoutConfirmationOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003802-3453&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    name: 'Системное. Подтверждение выхода. Отмена',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, systemPreconditions.logoutConfirmationOpened],
    steps: [
      {
        action: 'Нажать кнопку "Отмена"',
        expected: ['Подтверждение выхода закрылось']
      }
    ]
  },
  {
    name: 'Системное. Подтверждение выхода. Кнопка закрытия',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      systemPreconditions.logoutConfirmationOpened
    ],
    steps: [
      {
        action: 'Нажать кнопку закрытия',
        expected: ['Подтверждение выхода закрылось']
      }
    ]
  },
  {
    name: 'Системное. Подтверждение выхода. Выйти. Лоадер',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, systemPreconditions.logoutConfirmationOpened],
    steps: [
      {
        action: 'Замедлить ответ POST /auth/sign-out и нажать кнопку "Выйти"',
        expected: [
          'Во время запроса кнопки "Отмена" и "Выйти" отображаются в состоянии disabled',
          'В кнопке "Выйти" отображается индикатор загрузки'
        ]
      }
    ]
  },
  {
    name: 'Системное. Подтверждение выхода. Выйти. Успех',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, systemPreconditions.logoutConfirmationOpened],
    steps: [
      {
        action: 'Нажать кнопку "Выйти"',
        expected: [
          'Отправлен запрос POST /auth/sign-out',
          'Открылась страница https://juniorsbootcamp.ru/tester/'
        ]
      }
    ]
  },
  {
    name: 'Системное. Подтверждение выхода. Выйти. Ошибка',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, systemPreconditions.logoutConfirmationOpened],
    steps: [
      {
        action:
          'Подменить ответ POST /auth/sign-out на HTTP 200 с success: false и нажать кнопку "Выйти"',
        expected: ['Подтверждение выхода открыто']
      }
    ]
  }
];
