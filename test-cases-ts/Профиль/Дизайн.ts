import { preconditions, statuses } from '../0 Configuration';
import { profilePreconditions } from './preconditions';

export const profileDesign: TestCase[] = [
  {
    name: 'Профиль. Дизайн. ФИО не заполнено. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithoutFullName,
      preconditions.desktop,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003330-7130&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Дизайн. ФИО заполнено. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithFullName,
      preconditions.desktop,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003784-1775&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Дизайн. ФИО не заполнено. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithoutFullName,
      preconditions.mobile,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003305-6961&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Дизайн. ФИО заполнено. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithFullName,
      preconditions.mobile,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003330-6906&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  }
];
