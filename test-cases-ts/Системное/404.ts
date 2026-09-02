import { preconditions, statuses } from '../0 Configuration';
import { systemPreconditions } from './preconditions';

export const notFound: TestCase[] = [
  {
    name: 'Системное. 404. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.desktop, systemPreconditions.notFoundOpened],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013130-10108&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    name: 'Системное. 404. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile, systemPreconditions.notFoundOpened],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-10627&t=Sres4KwsHE5HeO6q-0'
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
    preconditions: [systemPreconditions.notFoundOpened],
    steps: [
      {
        action: 'Нажать кнопку "Перейти на главную"',
        expected: ['Открыта главная страница "/tester/"']
      }
    ]
  }
];
