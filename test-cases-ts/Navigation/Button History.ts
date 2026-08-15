import { preconditions, statuses } from '../0 Configuration';

export const buttonHistory: TestCase[] = [
  {
    name: 'Навигация. Кнопка "История". Авторизован',
    status: statuses.needRework,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action: 'Проверить ссылку в кнопке',
        expected: ['Ссылка href="/tester/history”']
      },
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница']
      }
    ]
  },
  {
    name: 'Навигация. Кнопка "История". Неавторизован',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser],
    steps: [
      {
        action: 'Проверить ссылку в кнопке',
        expected: ['Ссылка href="/tester/history”']
      },
      {
        action: 'Кликнуть на кнопку',
        expected: [
          'Запросилась и открылась страница https://juniorsbootcamp.ru/tester/login с queryParam “redirect” === полной ссылке, на которой был совершен клик на кнопку'
        ]
      }
    ]
  }
];
