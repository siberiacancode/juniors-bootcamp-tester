import { preconditions, statuses } from '../../0 Configuration';
import { profilePreconditions } from '../preconditions';
import { profileInfoPreconditions } from './preconditions';

const profileEditingPreconditions: Record<string, string[]> = {
  opened: ['Открыт попап "Редактирование данных"']
};

export const profileEditing: TestCase[] = [
  {
    name: 'Профиль. Информация профиля. Редактирование данных. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.pageOpened,
      profileEditingPreconditions.opened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003784-1925&t=FKnJbDsTAMkeWSbx-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Редактирование данных. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.pageOpened,
      profileEditingPreconditions.opened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40004970-2158&t=FKnJbDsTAMkeWSbx-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Редактирование данных. Данные',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profileInfoPreconditions.fullFilledProfile,
      profileEditingPreconditions.opened
    ],
    steps: [
      {
        action: 'Сопоставить значения полей с ответом GET /users/profile',
        expected: [
          'Поля "Фамилия", "Имя", "Отчество" и "Email" соответствуют значениям lastname, firstname, middlename и email из ответа GET /users/profile',
          'Поле "Телефон" содержит цифры из phone и отображается по маске "+X XXX XXX XX XX"'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Редактирование данных. Пустой профиль. Данные',
    status: statuses.needRework,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profileInfoPreconditions.emptyProfile,
      profileEditingPreconditions.opened
    ],
    steps: [
      {
        action: 'Сопоставить исходные значения полей с ответом GET /users/profile',
        expected: [
          'Поля "Фамилия", "Имя", "Отчество" и "Email" не заполнены в соответствии со значениям lastname, firstname, middlename и email из ответа GET /users/profile'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Редактирование данных. Телефон',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profileEditingPreconditions.opened
    ],
    steps: [
      {
        action: 'Проверить состояние поля "Телефон"',
        expected: ['Поле "Телефон" отображается в состоянии disabled']
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Редактирование данных. Обновить данные',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profileEditingPreconditions.opened
    ],
    steps: [
      {
        action: 'Проверить состояние кнопки "Обновить данные"',
        expected: ['Кнопка "Обновить данные" отображается в состоянии disabled']
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Редактирование данных. Валидация',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profileInfoPreconditions.fullFilledProfile,
      profileEditingPreconditions.opened
    ],
    steps: [
      {
        action: 'Оставить все доступные к редактированию поля пустыми и нажать "Обновить данные"',
        expected: [
          'Поле "Email" отображается в состоянии invalid',
          'Под полем отображается ошибка "Введите корректную почту"'
        ]
      },
      {
        action: 'Ввести в поле "Фамилия", "Имя" или "Отчество" цифры либо спецсимволы',
        expected: [
          'Заполненное поле отображается в состоянии invalid',
          'Под заполненным полем отображается ошибка "Недопустимые символы"'
        ]
      },
      {
        action: 'Ввести в поле "Фамилия", "Имя" или "Отчество" невалидное значение',
        expected: [
          'Заполненное поле отображается в состоянии invalid',
          'Под заполненным полем отображается ошибка "Максимальная длина 50 символов"'
        ]
      },
      {
        action: 'Очистить поля "Фамилия", "Имя" и "Отчество" и ввести корректный email',
        expected: [
          'Поля "Фамилия", "Имя" и "Отчество" отображаются в обычном состоянии',
          'Поле "Email" отображается в обычном состоянии'
        ]
      },
      {
        action: 'Ввести некорректный email и нажать кнопку "Обновить данные"',
        expected: [
          'Поле "Email" отображается в состоянии invalid',
          'Под полем отображается ошибка "Введите корректную почту"'
        ]
      },
      {
        action: 'Ввести корректный email',
        expected: ['Поле "Email" отображается в обычном состоянии']
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Редактирование данных. Обновить данные. Лоадер',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profileEditingPreconditions.opened
    ],
    steps: [
      {
        action:
          'Замедлить ответ PATCH /users/profile, изменить данные формы на валидные и нажать кнопку "Обновить данные"',
        expected: [
          'Во время запроса поля и кнопки формы отображаются в состоянии disabled',
          'В кнопке "Обновить данные" отображается индикатор загрузки'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Редактирование данных. Обновить данные. Успех',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profileEditingPreconditions.opened
    ],
    steps: [
      {
        action:
          'Изменить значения во всех доступных для редактирования полях на валидные и нажать кнопку "Обновить данные"',
        expected: [
          'Отправлен запрос PATCH /users/profile с значениями email из поля Email, lastname из поля Фамилия, firstname из поля Имя, middlename из поля Отчество',
          'Отправлен запрос GET /users/profile',
          'Панель "Редактирование данных" закрылась',
          'В карточке пользователя отображаются данные ФИО и email из запроса GET /users/profile',
          'Отобразилась нотификация "Данные обновлены" с описанием "Профиль успешно сохранен"'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Редактирование данных. Обновить данные. Ошибка',
    status: statuses.needRework,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profileEditingPreconditions.opened
    ],
    steps: [
      {
        action:
          'Подменить ответ PATCH /users/profile на HTTP 500, изменить данные в форме на валидные и нажать кнопку "Обновить данные"',
        expected: [
          'Попап "Редактирование данных" открыт',
          'Отобразилась нотификация с ошибкой из запроса'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Редактирование данных. Кнопка закрытия. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.pageOpened,
      profileEditingPreconditions.opened
    ],
    steps: [
      {
        action: 'Нажать кнопку закрытия',
        expected: ['Попап "Редактирование данных" закрылся']
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Редактирование данных. Отмена. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.pageOpened,
      profileEditingPreconditions.opened
    ],
    steps: [
      {
        action: 'Нажать кнопку "Отмена"',
        expected: ['Попап "Редактирование данных" закрылся']
      }
    ]
  }
];
