import { createTestCases, preconditions, statuses } from '../(utils)';
import { CASE_IDS } from './case-ids';

const purchaseHistoryDetailsPreconditions: Record<string, string[]> = {
  historyDetailsPage: ['Открыта страница "Подробности покупки"'],
  purchaseWithGameKey: ['Покупка с заполненным gameKey'],
  purchaseWithoutGameKey: ['Покупка без gameKey']
};

export default createTestCases([
  {
    id: CASE_IDS.DETAILS_DESIGN,
    name: 'История покупок. Подробности покупки. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      purchaseHistoryDetailsPreconditions.historyDetailsPage
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
    id: CASE_IDS.DETAILS_DESIGN,
    name: 'История покупок. Подробности покупки. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      purchaseHistoryDetailsPreconditions.historyDetailsPage
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
    id: CASE_IDS.DETAILS_LOADING,
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
    id: CASE_IDS.DETAILS_LOADING,
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
    id: CASE_IDS.DETAILS_DATA_WITH_KEY,
    name: 'История покупок. Подробности покупки. Данные. С ключом активации',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      purchaseHistoryDetailsPreconditions.historyDetailsPage,
      purchaseHistoryDetailsPreconditions.purchaseWithGameKey
    ],
    steps: [
      {
        action: 'Проверить данные покупки',
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
    id: CASE_IDS.DETAILS_DATA_WITHOUT_KEY,
    name: 'История покупок. Подробности покупки. Данные. Без ключа активации',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      purchaseHistoryDetailsPreconditions.historyDetailsPage,
      purchaseHistoryDetailsPreconditions.purchaseWithoutGameKey
    ],
    steps: [
      {
        action: 'Проверить данные покупки',
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
    id: CASE_IDS.DETAILS_BACK,
    name: 'История покупок. Подробности покупки. Кнопка назад',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      purchaseHistoryDetailsPreconditions.historyDetailsPage
    ],
    steps: [
      {
        action: 'Кликнуть на кнопку назад',
        expected: ['Открылась страница /history']
      }
    ]
  },
  {
    id: CASE_IDS.DETAILS_NOT_FOUND,
    name: 'История покупок. Подробности покупки. Несуществующий заказ',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action: 'Открыть страницу /history/{orderId} для несуществующего заказа',
        expected: ['Открылась страница /history']
      }
    ]
  }
]);
