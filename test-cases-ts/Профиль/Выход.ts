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
          'Токен авторизации сохранён в localStorage',
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
          'Модальное окно закрылось',
          'Токен авторизации удалён из localStorage',
          'Кэш данных профиля очищен',
          'Открылась страница "/tester/"',
          'Пользователь неавторизован'
        ]
      }
    ]
  }
];
