import { preconditions, statuses } from '../(utils)';

export const purchaseHistoryList: TestCase[] = [
  {
    name: 'История покупок. Список покупок. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop, preconditions.historyPage],
    steps: [
      {
        action:
          'Открыть Историю покупок за пользователя с несколькими покупками и проверить соответствие страницы дизайну',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003802-5867&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.mobile, preconditions.historyPage],
    steps: [
      {
        action:
          'Открыть Историю покупок за пользователя с несколькими покупками и проверить соответствие страницы дизайну',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003305-7627&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Лоадер. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action:
          'Замедлить ответ GET /games/orders и проверить соответствие лоадера страницы "История покупок" дизайну',
        expected: [
          'Лоадер страницы соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-5641&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Лоадер. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.mobile],
    steps: [
      {
        action:
          'Замедлить ответ GET /games/orders и проверить соответствие лоадера страницы "История покупок" дизайну',
        expected: [
          'Лоадер страницы соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-2732&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Пустой список. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop, preconditions.historyPage],
    steps: [
      {
        action:
          'Открыть Историю покупок за пользователя с пустым списком покупок и проверить соответствие пустого состояния дизайну',
        expected: [
          'Пустое состояние соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003802-5766&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Пустой список. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.mobile, preconditions.historyPage],
    steps: [
      {
        action:
          'Открыть Историю покупок за пользователя с пустым списком покупок и проверить соответствие пустого состояния дизайну',
        expected: [
          'Пустое состояние соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003305-7507&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Пустой список. Кнопка "Вернуться в каталог игр"',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.historyPage],
    steps: [
      {
        action:
          'Открыть Историю покупок за пользователя с пустым списком покупок и кликнуть на кнопку "Вернуться в каталог игр"',
        expected: ['Открылась страница https://juniorsbootcamp.ru/tester/']
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Список карточек',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.historyPage],
    steps: [
      {
        action: 'Открыть Историю покупок за пользователя с несколькими покупками',
        expected: [
          'Количество карточек покупок соответствует количеству элементов в orders',
          'Порядок карточек покупок соответствует порядку элементов в orders'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Карточка покупки. Данные',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.historyPage],
    steps: [
      {
        action: 'Проверить данные в карточке покупки',
        expected: [
          'Обложка игры отображается из gameImage',
          'alt обложки игры соответствует gameName',
          'Название игры соответствует gameName',
          'Издание игры соответствует edition',
          'Регион соответствует локализованному значению region',
          'Способ получения соответствует локализованному значению deliveryType',
          'Почта получателя соответствует person.email'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Список покупок. Карточка покупки. Кнопка "Перейти на заказ"',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.historyPage],
    steps: [
      {
        action: 'Кликнуть на кнопку "Перейти на заказ" в карточке покупки',
        expected: ['Открылась страница https://juniorsbootcamp.ru/tester/history/{orderId}']
      }
    ]
  }
];
