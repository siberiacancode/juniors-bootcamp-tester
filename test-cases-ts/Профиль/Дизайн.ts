import { preconditions, statuses } from '../0 Configuration';

export const profileDesign: TestCase[] = [
  {
    name: 'Профиль. Дизайн. Без ФИО. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Проверить дизайн страницы',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003330-7130&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Дизайн. Есть ФИО. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Проверить дизайн страницы',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003784-1775&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  }
];
