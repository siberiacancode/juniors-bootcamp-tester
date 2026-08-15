import { statuses } from '../0 Configuration';

export const buttonGames: TestCase[] = [
  {
    name: 'Навигация. Кнопка "Games"',
    status: statuses.actual,
    steps: [
      { action: 'Проверить ссылку в кнопке', expected: ['Ссылка href="/tester/”'] },
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница https://juniorsbootcamp.ru/tester/']
      }
    ]
  }
];
