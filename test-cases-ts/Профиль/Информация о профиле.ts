import { preconditions, statuses } from '../0 Configuration';

export const profileInfo: TestCase[] = [
  {
    name: 'Профиль. Информация о профиле. Доступ. Неавторизован',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile"',
        expected: [
          'Открылась страница "/tester/login"',
          'Query-параметр redirect соответствует полной ссылке запрошенной страницы профиля'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация о профиле. Email не заполнен',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithoutEmail],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и проверить контактные данные пользователя',
        expected: ['Email скрыт']
      }
    ]
  }
];
