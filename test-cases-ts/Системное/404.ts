import { preconditions, statuses } from '../0 Configuration';

export const notFound: TestCase[] = [
  {
    name: 'Системное. 404. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.desktop],
    steps: [
      {
        action:
          'Открыть несуществующий адрес внутри приложения, например "/tester/non-existent-page"',
        expected: [
          'Страница 404 соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013130-10108&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    name: 'Системное. 404. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile],
    steps: [
      {
        action:
          'Открыть несуществующий адрес внутри приложения, например "/tester/non-existent-page"',
        expected: [
          'Страница 404 соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-10627&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    name: 'Системное. 404. Несуществующий маршрут',
    status: statuses.actual,
    steps: [
      {
        action:
          'Открыть несуществующий адрес внутри приложения, например "/tester/non-existent-page"',
        expected: [
          'Открыта страница 404',
          'В адресной строке сохранён запрошенный адрес "/tester/non-existent-page"'
        ]
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
