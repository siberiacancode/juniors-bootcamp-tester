import { preconditions, statuses } from '../0 Configuration';
import { profilePreconditions } from './preconditions';

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
          'Query-параметр redirect равен полному URL запрошенной страницы профиля'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация о профиле. Email не заполнен',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithoutEmail,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Проверить контактные данные пользователя',
        expected: ['Email скрыт']
      }
    ]
  }
];
