import { preconditions, statuses } from '../0 Configuration';

export const buttonLogin: TestCase[] = [
  {
    name: 'Навигация. Кнопка "Войти". Неавторизован. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Проверить ссылку в кнопке',
        expected: ['Ссылка href="/tester/login"']
      },
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница https://juniorsbootcamp.ru/tester/login']
      }
    ]
  }
];
