import { preconditions, statuses } from '../0 Configuration';

export const stepPhone: TestCase[] = [
  {
    name: 'Авторизация. Телефон. Дизайн. Десктоп',
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
    name: 'Авторизация. Телефон. Дизайн. Мобилка',
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
  },
  {
    name: 'Авторизация. Телефон. Валидация',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPage],
    status: statuses.actual,
    steps: [
      {
        action: 'Нажать кнопку “Продолжить”',
        expected: [
          'Под инпутом отобразилась ошибка “Заполните поле полностью”',
          'Текст в инпуте стал красным'
        ]
      },
      {
        action: 'Ввести любые символы, отличные от цифр',
        expected: [
          'Вводятся только цифры',
          'текст ошибки из предшествующего действия пропал, текст в инпуте стал черным'
        ]
      },
      {
        action: 'Ввести неполный номер и нажать кнопку “Продолжить”',
        expected: [
          'Под инпутом отобразилась ошибка “Заполните поле полностью”',
          'Текст в инпуте стал красным'
        ]
      }
    ]
  },
  {
    name: 'Авторизация. Телефон. Маска',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPage],
    status: statuses.actual,
    steps: [
      {
        action: 'Ввести в поле "Телефон" значение 9998887766',
        expected: ['Содержимое поле отображено в соответствии с маской: +7 999 888 77 66']
      }
    ]
  },
  {
    name: 'Авторизация. Телефон. Продолжить. Успех',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPage],
    status: statuses.actual,
    steps: [
      {
        action: 'Ввести валидный номер телефона в поле “Телефон” и нажать кнопку “Продолжить”',
        expected: [
          'Отправлен запрос /api/tester/otps/otp с параметром phone === указанному в поле “Телефон”',
          'Во время ожидания запроса /api/tester/otps/otp кнопка "Продолжить" находится в состоянии loading',
          'Осуществлен переход на шаг “Проверочный код”'
        ]
      }
    ]
  },
  {
    name: 'Авторизация. Телефон. Продолжить. Ошибка (какая и как воспроизвести?)',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPage],
    status: statuses.needRework,
    steps: [
      {
        action: 'Ввести (какой?) номер телефона в поле “Телефон” и нажать кнопку “Продолжить”',
        expected: [
          'Отправлен запрос /api/tester/otps/otp с параметром phone === указанному в поле “Телефон”',
          'Полученная ошибка отображена с тосте'
        ]
      }
    ]
  },
  {
    name: 'Авторизация. Телефон. Назад',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPage],
    status: statuses.actual,
    steps: [
      {
        action: 'Нажать кнопку "Назад" (стрелка влево в шапке)',
        expected: ['Запросилась и открылась страница https://juniorsbootcamp.ru/tester/']
      }
    ]
  }
];
