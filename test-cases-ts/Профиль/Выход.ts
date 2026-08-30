import { preconditions, statuses } from '../0 Configuration';

export const profileLogout: TestCase[] = [
  {
    name: 'Профиль. Выход. Открытие подтверждения',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и нажать кнопку "Выйти"',
        expected: ['Открылось подтверждение выхода']
      }
    ]
  }
];
