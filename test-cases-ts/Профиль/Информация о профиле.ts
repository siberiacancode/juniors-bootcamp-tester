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
    name: 'Профиль. Информация о профиле. ФИО заполнено',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithFullName],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и проверить карточку пользователя',
        expected: [
          'Отображается ФИО пользователя в формате "Фамилия Имя Отчество"',
          'В аватаре отображается первая буква фамилии в верхнем регистре'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация о профиле. ФИО не заполнено',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithoutFullName],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и проверить карточку пользователя',
        expected: [
          'Вместо ФИО отображается текст "Лучший покупатель"',
          'В аватаре отображается маскот MascotFrontIcon'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация о профиле. Email заполнен',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithEmail],
    steps: [
      {
        action: 'Проверить контактные данные в карточке пользователя',
        expected: [
          'Отображается email пользователя',
          'Под email отображается номер телефона пользователя по маске'
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
        action: 'Проверить контактные данные в карточке пользователя',
        expected: ['Email не отображается', 'Отображается номер телефона пользователя по маске']
      }
    ]
  },
  {
    name: 'Профиль. Информация о профиле. Действия',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action: 'Проверить кнопки в карточке пользователя',
        expected: ['Отображается кнопка "Редактировать профиль"', 'Отображается кнопка "Выйти"']
      }
    ]
  }
];
