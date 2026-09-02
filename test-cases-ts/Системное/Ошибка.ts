import { preconditions, statuses } from '../0 Configuration';
import { systemPreconditions } from './preconditions';

export const errorState: TestCase[] = [
  {
    name: 'Системное. Ошибка. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.desktop, systemPreconditions.errorStateOpened],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013130-10143&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    name: 'Системное. Ошибка. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile, systemPreconditions.errorStateOpened],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-10811&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    name: 'Системное. Ошибка. HTTP 500',
    status: statuses.actual,
    steps: [
      {
        action:
          'Для существующей игры подменить ответ GET /games/info/{slug} на HTTP 500 и открыть страницу "/tester/games/{slug}"',
        expected: [
          'Открыта страница системной ошибки',
          'В адресной строке сохранён адрес "/tester/games/{slug}"'
        ]
      }
    ]
  },
  {
    name: 'Системное. Ошибка. Переход на главную',
    status: statuses.actual,
    preconditions: [systemPreconditions.errorStateOpened],
    steps: [
      {
        action: 'Нажать кнопку "Перейти на главную"',
        expected: ['Открыта главная страница "/tester/"']
      }
    ]
  }
];
