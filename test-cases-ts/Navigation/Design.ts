import { preconditions, statuses } from '../0 Configuration';

export const design: TestCase[] = [
  {
    name: 'Навигация. Дизайн. Неавторизован. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Проверить соответствие блока “Навигация” дизайну',
        expected: [
          'Блок соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-6460&t=ePGuPhBMrDYUahWS-0'
        ]
      }
    ]
  },
  {
    name: 'Навигация. Дизайн. Авторизован. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Проверить соответствие блока “Навигация” дизайну',
        expected: [
          'Блок соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003330-7216&t=ytybvzHI5LjD5aaJ-0'
        ]
      }
    ]
  },
  {
    name: 'Навигация. Дизайн. Мобила',
    status: statuses.actual,
    preconditions: [preconditions.mobile],
    steps: [
      {
        action: 'Проверить соответствие блока “Навигация” дизайну',
        expected: [
          'Блок соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005955-4561&t=ePGuPhBMrDYUahWS-0'
        ]
      }
    ]
  }
];
