import { preconditions, statuses } from '../0 Configuration';

export const profileEditing: TestCase[] = [
  {
    name: 'Профиль. Редактирование данных. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и нажать кнопку "Редактировать профиль"',
        expected: [
          'Панель "Редактирование данных" соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-29180&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.mobile],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и нажать кнопку "Редактировать профиль"',
        expected: [
          'Панель "Редактирование данных" соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40004970-2093&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Исходные значения',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile", нажать кнопку "Редактировать профиль" и проверить значения полей',
        expected: [
          'Поля "Фамилия", "Имя", "Отчество" и "Email" соответствуют значениям lastname, firstname, middlename и email из ответа GET /users/profile',
          'Поля, которым в ответе соответствуют пустые значения, отображаются пустыми',
          'Поле "Телефон" заполнено значением phone по маске',
          'Поле "Телефон" отображается в состоянии disabled',
          'Кнопка "Обновить данные" отображается в состоянии disabled'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Изменение формы',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile", нажать кнопку "Редактировать профиль" и изменить значение любого доступного для редактирования поля',
        expected: ['Кнопка "Обновить данные" отображается в состоянии enabled']
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Email. Валидация',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile", нажать кнопку "Редактировать профиль", ввести некорректный email и нажать кнопку "Обновить данные"',
        expected: [
          'Поле "Email" отображается в состоянии invalid',
          'Под полем отображается ошибка "Введите корректную почту"',
          'Запрос PATCH /users/profile не отправлен'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Обновление. Успех',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile", нажать кнопку "Редактировать профиль", изменить данные на валидные и нажать кнопку "Обновить данные"',
        expected: [
          'Отправлен запрос PATCH /users/profile',
          'Тело запроса содержит актуальные значения email, firstname, middlename и lastname',
          'Во время запроса поля формы отображаются в состоянии disabled',
          'В кнопке "Обновить данные" отображается индикатор загрузки',
          'После успешного ответа повторно запрошены данные GET /users/profile',
          'Панель "Редактирование данных" закрылась',
          'В карточке пользователя отображаются обновлённые данные'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Закрытие. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile", нажать кнопку "Редактировать профиль", изменить значение поля и нажать кнопку закрытия с иконкой крестика',
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
    preconditions: [preconditions.authorizedUser, preconditions.mobile],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile", нажать кнопку "Редактировать профиль", изменить значение поля и нажать кнопку "Отмена"',
        expected: [
          'Панель "Редактирование данных" закрылась',
          'Запрос PATCH /users/profile не отправлен',
          'Данные профиля не изменились'
        ]
      }
    ]
  }
];
