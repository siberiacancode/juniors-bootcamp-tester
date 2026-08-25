import { preconditions, statuses } from '../0 Configuration';

export const profileEditing: TestCase[] = [
  {
    name: 'Профиль. Редактирование данных. Дизайн. Десктоп',
    status: statuses.needRework,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Нажать кнопку "Редактировать профиль"',
        expected: [
          'Панель "Редактирование данных" соответствует дизайну <ДОБАВИТЬ_ССЫЛКУ_НА_ДИЗАЙН_РЕДАКТИРОВАНИЯ_ПРОФИЛЯ_ДЕСКТОП>'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Дизайн. Мобилка',
    status: statuses.needRework,
    preconditions: [preconditions.authorizedUser, preconditions.mobile],
    steps: [
      {
        action: 'Нажать кнопку "Редактировать профиль"',
        expected: [
          'Панель "Редактирование данных" соответствует дизайну <ДОБАВИТЬ_ССЫЛКУ_НА_ДИЗАЙН_РЕДАКТИРОВАНИЯ_ПРОФИЛЯ_МОБИЛКА>'
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
        action: 'Открыть панель "Редактирование данных" и проверить значения полей',
        expected: [
          'Поля "Фамилия", "Имя", "Отчество" и "Email" заполнены соответствующими значениями объекта user из ответа GET /users/profile',
          'Пустые значения профиля отображаются как пустые поля',
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
        action: 'Изменить значение любого доступного для редактирования поля',
        expected: ['Кнопка "Обновить данные" стала доступна']
      }
    ]
  },
  {
    name: 'Профиль. Редактирование данных. Email. Валидация',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
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
    name: 'Профиль. Редактирование данных. Обновление. Успех',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action: 'Изменить данные профиля на валидные и нажать кнопку "Обновить данные"',
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
        action: 'Изменить значение поля и нажать кнопку закрытия с иконкой XIcon',
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
