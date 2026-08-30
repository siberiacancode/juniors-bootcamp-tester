import { preconditions, statuses } from '../0 Configuration';

export const logoutConfirmation: TestCase[] = [
  {
    name: 'Системное. Подтверждение выхода. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и нажать кнопку "Выйти"',
        expected: [
          'Попап подтверждения выхода соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-29339&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    name: 'Системное. Подтверждение выхода. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.mobile],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и нажать кнопку "Выйти"',
        expected: [
          'Попап подтверждения выхода соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003802-3453&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    name: 'Системное. Подтверждение выхода. Отмена',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile", нажать кнопку "Выйти", затем нажать кнопку "Отмена" в подтверждении выхода',
        expected: [
          'Подтверждение выхода закрылось',
          'Открыта страница "/tester/profile"',
          'Запрос POST /auth/sign-out не отправлен',
          'Пользователь остаётся авторизован'
        ]
      }
    ]
  },
  {
    name: 'Системное. Подтверждение выхода. Подтверждение',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile", нажать кнопку "Выйти", затем один раз нажать кнопку "Выйти" в подтверждении выхода',
        expected: [
          'Отправлен один запрос POST /auth/sign-out',
          'Во время запроса кнопки "Отмена" и "Выйти" отображаются в состоянии disabled',
          'В кнопке "Выйти" отображается индикатор загрузки',
          'После успешного ответа подтверждение выхода закрылось',
          'Открылась страница "/tester/"',
          'Пользователь неавторизован'
        ]
      }
    ]
  },
  {
    name: 'Системное. Подтверждение выхода. Неуспешный ответ',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action:
          'Подменить ответ POST /auth/sign-out на HTTP 200 с success: false, открыть страницу "/tester/profile", нажать кнопку "Выйти" и подтвердить выход',
        expected: [
          'Отправлен один запрос POST /auth/sign-out',
          'После ответа подтверждение выхода осталось открытым',
          'Кнопки "Отмена" и "Выйти" доступны',
          'Индикатор загрузки скрыт',
          'Открыта страница "/tester/profile"',
          'Пользователь остаётся авторизован'
        ]
      }
    ]
  }
];
