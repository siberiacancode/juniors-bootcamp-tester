import { preconditions, statuses } from '../0 Configuration';

const errorStatePreconditions = {
  opened: [
    'Для существующей игры подменить ответ GET /games/info/{slug} на HTTP 500',
    'Открыть страницу "/games/{slug}"'
  ]
};

export const errorState: TestCase[] = [
  {
    name: 'Системное. Ошибка. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.desktop, errorStatePreconditions.opened],
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
    preconditions: [preconditions.mobile, errorStatePreconditions.opened],
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
    name: 'Системное. Ошибка. Перейти на главную',
    status: statuses.actual,
    preconditions: [errorStatePreconditions.opened],
    steps: [
      {
        action: 'Нажать кнопку "Перейти на главную"',
        expected: ['Открыта главная страница "/"']
      }
    ]
  }
];
