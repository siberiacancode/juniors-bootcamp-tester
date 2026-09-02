import { preconditions, statuses } from '../0 Configuration';
import { profilePreconditions } from './preconditions';

export const profileEditing: TestCase[] = [
  {
    name: 'Профиль. Редактирование данных. Редактировать профиль',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, profilePreconditions.profilePageOpened],
    steps: [
      {
        action: 'Нажать кнопку "Редактировать профиль"',
        expected: ['Открылась панель "Редактирование данных"']
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.editProfileOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-29180&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.editProfileOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40004970-2093&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Исходные значения',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, profilePreconditions.editProfileOpened],
    steps: [
      {
        action: 'Сопоставить исходные значения полей с ответом GET /users/profile',
        expected: [
          'Поля "Фамилия", "Имя", "Отчество" и "Email" соответствуют значениям lastname, firstname, middlename и email из ответа GET /users/profile',
          'Поля, которым в ответе соответствуют пустые значения, отображаются пустыми',
          'Поле "Телефон" содержит цифры из phone и отображается по маске "+X XXX XXX XX XX"'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Телефон. Disabled',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, profilePreconditions.editProfileOpened],
    steps: [
      {
        action: 'Проверить состояние поля "Телефон"',
        expected: ['Поле "Телефон" отображается в состоянии disabled']
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Обновить данные. Исходное состояние',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, profilePreconditions.editProfileOpened],
    steps: [
      {
        action: 'Проверить состояние кнопки "Обновить данные"',
        expected: ['Кнопка "Обновить данные" отображается в состоянии disabled']
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Обновить данные. Изменение формы',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, profilePreconditions.editProfileOpened],
    steps: [
      {
        action: 'Изменить значение любого доступного для редактирования поля',
        expected: ['Кнопка "Обновить данные" отображается в состоянии enabled']
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Email. Валидация',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, profilePreconditions.editProfileOpened],
    steps: [
      {
        action: 'Ввести некорректный email и нажать кнопку "Обновить данные"',
        expected: [
          'Поле "Email" отображается в состоянии invalid',
          'Под полем отображается ошибка "Введите корректную почту"',
          'Запрос PATCH /users/profile не отправлен'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Обновить данные. Лоадер',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, profilePreconditions.editProfileOpened],
    steps: [
      {
        action:
          'Замедлить ответ PATCH /users/profile, изменить данные на валидные и нажать кнопку "Обновить данные"',
        expected: [
          'Во время запроса поля формы отображаются в состоянии disabled',
          'В кнопке "Обновить данные" отображается индикатор загрузки'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Обновить данные. Успех',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, profilePreconditions.editProfileOpened],
    steps: [
      {
        action: 'Изменить данные на валидные и нажать кнопку "Обновить данные"',
        expected: [
          'Отправлен запрос PATCH /users/profile с актуальными значениями email, firstname, middlename и lastname',
          'После успешного ответа повторно отправлен запрос GET /users/profile',
          'Панель "Редактирование данных" закрылась',
          'В карточке пользователя отображаются обновлённые данные'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Кнопка закрытия. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.editProfileOpened
    ],
    steps: [
      {
        action: 'Изменить значение поля и нажать кнопку закрытия',
        expected: [
          'Панель "Редактирование данных" закрылась',
          'Запрос PATCH /users/profile не отправлен',
          'Данные профиля не изменились'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Отмена. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.editProfileOpened
    ],
    steps: [
      {
        action: 'Изменить значение поля и нажать кнопку "Отмена"',
        expected: [
          'Панель "Редактирование данных" закрылась',
          'Запрос PATCH /users/profile не отправлен',
          'Данные профиля не изменились'
        ]
      }
    ]
  }
];
