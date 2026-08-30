import { preconditions, statuses } from '../(utils)';

export const header: TestCase[] = [
  {
    name: 'Лэйаут.  Хэдер. Дизайн. Неавторизован. Десктоп',
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
    name: 'Лэйаут.  Хэдер. Дизайн. Авторизован. Десктоп',
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
    name: 'Лэйаут.  Хэдер. Дизайн. Мобила',
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
    name: 'Лэйаут.  Хэдер. Кнопка "Games"',
    status: statuses.actual,
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница https://juniorsbootcamp.ru/tester/']
      }
    ]
  },
  {
    name: 'Лэйаут.  Хэдер. Кнопка "Войти". Неавторизован. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница https://juniorsbootcamp.ru/tester/login']
      }
    ]
  },
  {
    name: 'Лэйаут.  Хэдер. Кнопка "История". Авторизован',
    status: statuses.needRework,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница https://juniorsbootcamp.ru/tester/history']
      }
    ]
  },
  {
    name: 'Лэйаут.  Хэдер. Кнопка "История". Неавторизован',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: [
          'Запросилась и открылась страница https://juniorsbootcamp.ru/tester/login с queryParam “redirect” === полной ссылке, на которой был совершен клик на кнопку'
        ]
      }
    ]
  },
  {
    name: 'Лэйаут.  Хэдер. Кнопка "История". Авторизован',
    status: statuses.needRework,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница https://juniorsbootcamp.ru/tester/history']
      }
    ]
  },
  {
    name: 'Лэйаут.  Хэдер. Кнопка "Профиль". Неавторизован',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: [
          'Запросилась и открылась страница https://juniorsbootcamp.ru/tester/login с queryParam “redirect” === полной ссылке, на которой был совершен клик на кнопку'
        ]
      }
    ]
  }
];
