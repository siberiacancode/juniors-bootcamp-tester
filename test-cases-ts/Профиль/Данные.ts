import { preconditions, statuses } from '../0 Configuration';
import { profilePreconditions } from './preconditions';

export const profileData: TestCase[] = [
  {
    name: 'Профиль. Данные пользователя',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.profilePageOpened,
      profilePreconditions.userWithFullName,
      profilePreconditions.userWithEmail
    ],
    steps: [
      {
        action:
          'Сопоставить данные в карточке пользователя с объектом user из ответа GET /users/profile',
        expected: [
          'ФИО соответствует значениям lastname, firstname и middlename, объединённым через пробел',
          'Email соответствует значению email',
          'Номер телефона содержит цифры из значения phone и отображается по маске "+X XXX XXX XX XX"',
          'В аватаре отображается первая буква значения lastname в верхнем регистре'
        ]
      }
    ]
  }
];
