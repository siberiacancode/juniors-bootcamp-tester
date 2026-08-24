import { preconditions, statuses } from '../0 Configuration';

export const profileData: TestCase[] = [
  {
    name: 'Профиль. Данные пользователя. Соответствие ответу API',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.profileWithFullName,
      preconditions.profileWithEmail
    ],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile" и сопоставить данные в карточке пользователя с объектом user из ответа GET /users/profile',
        expected: [
          'ФИО соответствует значениям lastname, firstname и middlename, объединённым через пробел',
          'Email соответствует значению email',
          'Номер телефона содержит цифры из значения phone и отображается по маске "+X XXX XXX XX XX"'
        ]
      }
    ]
  }
];
