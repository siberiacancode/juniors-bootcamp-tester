import { preconditions, statuses } from '../0 Configuration';

export const profileLogout: TestCase[] = [
  {
    name: 'Профиль. Выход. Отмена',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action: 'Открыть подтверждение выхода и нажать кнопку "Отмена"',
        expected: [
          'Модальное окно закрылось',
          'Открыта страница "/tester/profile"',
          'Запрос POST /auth/sign-out не отправлен',
          'Пользователь остаётся авторизован'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Выход. Подтверждение',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action: 'Открыть подтверждение выхода и один раз нажать кнопку "Выйти"',
        expected: [
          'Отправлен запрос POST /auth/sign-out',
          'Во время запроса кнопки "Отмена" и "Выйти" отображаются в состоянии disabled',
          'В кнопке "Выйти" отображается индикатор загрузки',
          'После успешного ответа модальное окно закрылось',
          'Кэш данных профиля и сохранённых карт сброшен',
          'Открылась страница "/tester/"',
          'Пользователь неавторизован'
        ]
      }
    ]
  }
];
