import { preconditions, statuses } from '../0 Configuration';

export const header: TestCase[] = [
  {
    name: 'Лэйаут. Хэдер. Дизайн. Неавторизован. Десктоп',
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
    name: 'Лэйаут. Хэдер. Дизайн. Авторизован. Десктоп',
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
    name: 'Лэйаут. Хэдер. Дизайн. Мобилка',
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
  },
  {
    name: 'Лэйаут. Хэдер. Games',
    status: statuses.actual,
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница /']
      }
    ]
  },
  {
    name: 'Лэйаут. Хэдер. Войти. Неавторизован. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница /login']
      }
    ]
  },
  {
    name: 'Лэйаут. Хэдер. История. Авторизован',
    status: statuses.needRework,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница /history']
      }
    ]
  },
  {
    name: 'Лэйаут. Хэдер. История. Неавторизован',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: [
          'Запросилась и открылась страница /login с queryParam “redirect” === полной ссылке, на которой был совершен клик на кнопку'
        ]
      }
    ]
  },
  {
    name: 'Лэйаут. Хэдер. История. Авторизован',
    status: statuses.needRework,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница /history']
      }
    ]
  },
  {
    name: 'Лэйаут. Хэдер. Профиль. Неавторизован',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: [
          'Запросилась и открылась страница /login с queryParam “redirect” === полной ссылке, на которой был совершен клик на кнопку'
        ]
      }
    ]
  }
];
