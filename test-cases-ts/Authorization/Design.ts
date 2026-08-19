import { preconditions, statuses } from '../0 Configuration';

export const design: TestCase[] = [
  {
    name: 'Авторизация. Дизайн. Десктоп',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPage, preconditions.desktop],
    status: statuses.actual,
    steps: [
      {
        action: 'Проверить соответствие страницы “Авторизация” дизайну',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-7589&t=ePGuPhBMrDYUahWS-0'
        ]
      }
    ]
  },
  {
    name: 'Авторизация. Дизайн. Мобилка',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPage, preconditions.mobile],
    status: statuses.actual,
    steps: [
      {
        action: 'Проверить соответствие страницы “Авторизация” дизайну',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003305-7067&t=ePGuPhBMrDYUahWS-0'
        ]
      }
    ]
  }
];
