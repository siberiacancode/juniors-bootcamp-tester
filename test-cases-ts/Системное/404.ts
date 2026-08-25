import { statuses } from '../0 Configuration';

export const notFound: TestCase[] = [
  {
    name: 'Системное. 404. Дизайн',
    status: statuses.needRework,
    steps: [
      {
        action:
          'Открыть несуществующий адрес внутри приложения, например "/tester/non-existent-page"',
        expected: ['Страница 404 соответствует дизайну <ДОБАВИТЬ_ССЫЛКУ_НА_ДИЗАЙН>']
      }
    ]
  },
  {
    name: 'Системное. 404. Переход на главную',
    status: statuses.actual,
    steps: [
      {
        action:
          'Открыть несуществующий адрес внутри приложения, например "/tester/non-existent-page", и нажать кнопку "Перейти на главную"',
        expected: ['Открыта главная страница "/tester/"']
      }
    ]
  }
];
