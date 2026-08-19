import { preconditions, statuses } from '../0 Configuration';

export const stepPhone: TestCase[] = [
  {
    name: 'Авторизация. Проверочный код. Валидация',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPageOtpStep],
    status: statuses.actual,
    steps: [
      {
        action: 'Нажать кнопку “Войти”',
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
      }
    ]
  },
  {
    name: 'Авторизация. Проверочный код. Назад (телефон)',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPageOtpStep],
    status: statuses.actual,
    steps: [
      {
        action: 'Нажать кнопку "Назад" у тайтла "Провепрочный код"',
        expected: [
          'Открылся шаг "Авторизация"',
          'Поле "Телефон" заполнено ранее введенным значением'
        ]
      }
    ]
  },
  {
    name: 'Авторизация. Телефон. Назад',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPageOtpStep],
    status: statuses.actual,
    steps: [
      {
        action: 'Нажать кнопку "Назад" (стрелка влево в шапке)',
        expected: ['Запросилась и открылась страница https://juniorsbootcamp.ru/tester/']
      }
    ]
  },
  {
    name: 'Авторизация. Проверочный код. Войти. Успех',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPageOtpStep],
    status: statuses.actual,
    steps: [
      {
        action:
          'Ввести отп код для введенного телефона из источника https://juniorsbootcamp.ru/api/otps и нажать кнопку "Войти"',
        expected: [
          'Отправлен запрос /api/tester/auth/sign-in с параметрами: phone === указанному в поле “Телефон” на шаге ввода номера телефона; code === указанному в поле "Проверочный код"',
          'Открылась главная страница /tester/',
          'Отправлен запрос /api/tester/users/profile с параметрами, равными полученному из ответа на запрос /api/tester/auth/sign-in'
        ]
      }
    ]
  },
  {
    name: 'Авторизация. Проверочный код. Войти. Неправльный отп код',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPageOtpStep],
    status: statuses.actual,
    steps: [
      {
        action: 'Ввести 111111 в поле "Проверочный код" и нажать кнопку "Войти"',
        expected: [
          'Отправлен запрос /api/tester/auth/sign-in с параметрами: phone === указанному в поле “Телефон” на шаге ввода номера телефона; code === указанному в поле "Проверочный код"',
          'Под полем "Проверочный код" появилась валидационная ошибка "Неправильный отп код"'
        ]
      }
    ]
  },
  {
    name: 'Авторизация. Проверочный код. Войти. Таймер',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPageOtpStep],
    status: statuses.actual,
    steps: [
      {
        action: 'Проверить текст в кнопке таймера под кнопкой "Войти"',
        expected: [
          'Текст соответствует "Отправить код повторно через X сек", где X соответствует полученному параметру retryDelay из запроса /api/tester/otps/otp, переведенному в секунды',
          'Кнопка некликабельна'
        ]
      },
      {
        action: 'Подождать несколько секунд',
        expected: ['Счетчик времени в кнопке таймера убывает посекундно']
      },
      {
        action: 'Подождать окончания таймера',
        expected: [
          'Текст в кнопке таймера заменился на "Отправить код повторно"',
          'Кнопка кликабельна'
        ]
      }
    ]
  },
  {
    name: 'Авторизация. Проверочный код. Войти. Отправить код повторно',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPageOtpStep],
    status: statuses.actual,
    steps: [
      {
        action: 'Подождать окончания таймера и нажать кнопку "Отправить код повторно"',
        expected: [
          'Отправлен запрос /api/tester/otps/otp с параметром phone === указанному в поле “Телефон” на шаге ввода телефона',
          'Текст кнопки таймера соответствует "Отправить код повторно через X сек", где X соответствует полученному параметру retryDelay из запроса /api/tester/otps/otp, переведенному в секунды'
        ]
      }
    ]
  }
];
