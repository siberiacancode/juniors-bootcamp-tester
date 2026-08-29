import { preconditions, statuses } from '../0 Configuration';

export const purchaseHistoryDetails: TestCase[] = [
  {
    name: 'История покупок. Подробности покупки. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      preconditions.historyDetailsPage
    ],
    steps: [
      {
        action: 'Проверить соответствие страницы "Подробности покупки" дизайну',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003802-6140&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Подробности покупки. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      preconditions.historyDetailsPage
    ],
    steps: [
      {
        action: 'Проверить соответствие страницы "Подробности покупки" дизайну',
        expected: [
          'Страница соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003314-8048&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Подробности покупки. Лоадер. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action:
          'Замедлить ответ GET /games/orders/{orderId} и проверить соответствие лоадера страницы "Подробности покупки" дизайну',
        expected: [
          'Лоадер страницы соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40011809-9067&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Подробности покупки. Лоадер. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.mobile],
    steps: [
      {
        action:
          'Замедлить ответ GET /games/orders/{orderId} и проверить соответствие лоадера страницы "Подробности покупки" дизайну',
        expected: [
          'Лоадер страницы соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-2687&t=zlvki7NFGBOA4d1I-0'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Подробности покупки. Данные. С ключом активации',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.historyDetailsPage],
    steps: [
      {
        action: 'Открыть подробности покупки с заполненным gameKey',
        expected: [
          'Обложка игры отображается из gameImage',
          'alt обложки игры соответствует gameName',
          'Название игры соответствует gameName',
          'Издание игры соответствует edition',
          'Регион соответствует локализованному значению region',
          'Способ получения соответствует локализованному значению deliveryType',
          'Ключ активации соответствует gameKey',
          'Почта получателя соответствует person.email',
          'Сумма соответствует price в денежном формате'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Подробности покупки. Данные. Без ключа активации',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.historyDetailsPage],
    steps: [
      {
        action: 'Открыть подробности покупки без gameKey',
        expected: [
          'Обложка игры отображается из gameImage',
          'alt обложки игры соответствует gameName',
          'Название игры соответствует gameName',
          'Издание игры соответствует edition',
          'Регион соответствует локализованному значению region',
          'Способ получения соответствует локализованному значению deliveryType',
          'Лейбл "Ваш Steam-ключ для активации" скрыт',
          'Ключ активации скрыт',
          'Почта получателя соответствует person.email',
          'Сумма соответствует price в денежном формате'
        ]
      }
    ]
  },
  {
    name: 'История покупок. Подробности покупки. Кнопка назад',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.historyDetailsPage],
    steps: [
      {
        action: 'Кликнуть на кнопку назад',
        expected: ['Открылась страница https://juniorsbootcamp.ru/tester/history']
      }
    ]
  },
  {
    name: 'История покупок. Подробности покупки. Несуществующий заказ',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action:
          'Открыть страницу https://juniorsbootcamp.ru/tester/history/{orderId} для несуществующего заказа',
        expected: ['Открылась страница https://juniorsbootcamp.ru/tester/history']
      }
    ]
  }
];
