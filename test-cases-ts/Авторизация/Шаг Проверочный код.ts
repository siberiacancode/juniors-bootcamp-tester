import { preconditions, statuses } from '../0 Configuration';

export const otpStep: TestCase[] = [
  {
    name: 'Авторизация. Проверочный код. Дизайн. Десктоп',
    preconditions: [
      preconditions.unauthorizedUser,
      preconditions.loginPageOtpStep,
      preconditions.desktop
    ],
    status: statuses.actual,
    steps: [
      {
        action: 'Проверить соответствие шага "Проверочный код" дизайну',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-7605&t=Vnj0EdA8aPfbkmq9-0'
        ]
      }
    ]
  },
  {
    name: 'Авторизация. Проверочный код. Дизайн. Мобилка',
    preconditions: [
      preconditions.unauthorizedUser,
      preconditions.loginPageOtpStep,
      preconditions.mobile
    ],
    status: statuses.actual,
    steps: [
      {
        action: 'Проверить соответствие страницы "Проверочный код" дизайну',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003305-7125&t=Vnj0EdA8aPfbkmq9-0'
        ]
      }
    ]
  },
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
      },
      {
        action: 'Ввести не все символы ОТП кода и нажать кнопку “Войти”',
        expected: [
          'Под инпутом отобразилась ошибка “Заполните поле полностью”',
          'Текст в инпуте стал красным'
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
    name: 'Авторизация. Проверочный код. Назад',
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
          'Во время ожидания запроса /api/tester/auth/sign-in кнопки "Войти" и "Отправить код повторно" находятся в состоянии loading',
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
          'Кнопка отображается в состоянии disabled'
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
          'Кнопка без состояния disabled'
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
          'Во время ожидания запроса /api/tester/otps/otp кнопки "Войти" и "Отправить код повторно" находятся в состоянии loading',
          'Текст кнопки таймера соответствует "Отправить код повторно через X сек", где X соответствует полученному параметру retryDelay из запроса /api/tester/otps/otp, переведенному в секунды'
        ]
      }
    ]
  },
  {
    name: 'Авторизация. Проверочный код. Войти. Redirect в ссылке',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPageOtpStep],
    status: statuses.actual,
    steps: [
      {
        action:
          'Авторизоваться по ссылке с параметром redirect, равным какой-то из страниц системы,например https%3A%2F%2Fjuniorsbootcamp.ru%2Ftester%2Fhistory',
        expected: ['После авторизации открылась страница из параметра redirect']
      }
    ]
  },
  {
    name: 'Авторизация. Проверочный код. Назад. Сброс OTP',
    preconditions: [preconditions.unauthorizedUser, preconditions.loginPageOtpStep],
    status: statuses.actual,
    steps: [
      {
        action:
          'Ввести символы в поле "Проверочный код", нажать кнопку "Назад" и снова "Продолжить"',
        expected: ['Поле "Проверочный код" пустое']
      }
    ]
  }
];
