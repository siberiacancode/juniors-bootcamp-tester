import { preconditions, statuses } from '../0 Configuration';

export const logoutConfirmation: TestCase[] = [
  {
    name: 'Системное. Подтверждение выхода. Дизайн. Десктоп',
    status: statuses.needRework,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и нажать кнопку "Выйти"',
        expected: [
          'Попап подтверждения выхода соответствует дизайну <ДОБАВИТЬ_ССЫЛКУ_НА_ДИЗАЙН_ДЕСКТОП>'
        ]
      }
    ]
  },
  {
    name: 'Системное. Подтверждение выхода. Дизайн. Мобилка',
    status: statuses.needRework,
    preconditions: [preconditions.authorizedUser, preconditions.mobile],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и нажать кнопку "Выйти"',
        expected: [
          'Попап подтверждения выхода соответствует дизайну <ДОБАВИТЬ_ССЫЛКУ_НА_ДИЗАЙН_МОБИЛКА>'
        ]
      }
    ]
  }
];
