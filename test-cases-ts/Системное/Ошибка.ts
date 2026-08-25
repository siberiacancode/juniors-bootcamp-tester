import { statuses } from '../0 Configuration';

export const errorState: TestCase[] = [
  {
    name: 'Системное. Ошибка. Дизайн',
    status: statuses.needRework,
    steps: [
      {
        action:
          'Для существующей игры подменить ответ GET /games/info/{slug} на HTTP 500 и открыть страницу "/tester/games/{slug}"',
        expected: ['Страница системной ошибки соответствует дизайну <ДОБАВИТЬ_ССЫЛКУ_НА_ДИЗАЙН>']
      }
    ]
  },
  {
    name: 'Системное. Ошибка. Переход на главную',
    status: statuses.actual,
    steps: [
      {
        action:
          'Для существующей игры подменить ответ GET /games/info/{slug} на HTTP 500, открыть страницу "/tester/games/{slug}" и нажать кнопку "Перейти на главную"',
        expected: ['Открыта главная страница "/tester/"']
      }
    ]
  }
];
