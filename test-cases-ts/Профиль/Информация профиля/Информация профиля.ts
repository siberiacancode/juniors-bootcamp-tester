import { preconditions, statuses } from '../../0 Configuration';
import { profilePreconditions } from '../preconditions';
import { profileInfoPreconditions } from './preconditions';

export const profileInfo: TestCase[] = [
  {
    name: 'Профиль. Информация профиля. Пустой профиль. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.pageOpened,
      profileInfoPreconditions.emptyProfile
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003330-7603&t=FKnJbDsTAMkeWSbx-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Пустой профиль. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.pageOpened,
      profileInfoPreconditions.emptyProfile
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003330-7084&t=FKnJbDsTAMkeWSbx-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.pageOpened,
      profileInfoPreconditions.fullFilledProfile
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-28977&t=FKnJbDsTAMkeWSbx-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.pageOpened,
      profileInfoPreconditions.fullFilledProfile
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003330-7085&t=FKnJbDsTAMkeWSbx-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Данные',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profileInfoPreconditions.fullFilledProfile
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
  },
  {
    name: 'Профиль. Информация профиля. Аватар',
    status: statuses.needRework,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profileInfoPreconditions.emptyProfile
    ],
    steps: [
      {
        action: 'Заполнить только lastname и профиля и проверить аватар',
        expected: ['В аватаре отображается первая буква значения lastname в верхнем регистре']
      },
      {
        action: 'Заполнить только firstname и профиля и проверить аватар',
        expected: ['В аватаре отображается первая буква значения firstname в верхнем регистре']
      },
      {
        action: 'Заполнить только middlename и профиля и проверить аватар',
        expected: ['В аватаре отображается первая буква значения middlename в верхнем регистре']
      },
      {
        action: 'Заполнить только firstname и middlename и профиля и проверить аватар',
        expected: ['В аватаре отображается первая буква значения firstname в верхнем регистре']
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Выйти',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, profilePreconditions.pageOpened],
    steps: [
      {
        action: 'Нажать кнопку "Выйти"',
        expected: ['Открылся попап "Подтверждение выхода"']
      }
    ]
  },
  {
    name: 'Профиль. Информация профиля. Редактировать профиль',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, profilePreconditions.pageOpened],
    steps: [
      {
        action: 'Нажать кнопку "Редактировать профиль"',
        expected: ['Открылся попап "Редактирование данных"']
      }
    ]
  }
];
