import { preconditions, statuses } from '../0 Configuration';

export const profileDesign: TestCase[] = [
  {
    name: 'Профиль. Дизайн. ФИО не заполнено. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.profileWithoutFullName,
      preconditions.desktop
    ],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile"',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003330-7130&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Дизайн. ФИО заполнено. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.profileWithFullName,
      preconditions.desktop
    ],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile"',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003784-1775&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Дизайн. ФИО не заполнено. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.profileWithoutFullName,
      preconditions.mobile
    ],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile"',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003305-6961&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Дизайн. ФИО заполнено. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.profileWithFullName,
      preconditions.mobile
    ],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile"',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003330-6906&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  }
];
