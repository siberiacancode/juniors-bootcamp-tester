import { preconditions, statuses } from '../0 Configuration';
import { profilePreconditions } from './preconditions';

export const profileSavedCards: TestCase[] = [
  {
    name: 'Профиль. Сохранённые карты. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.savedCardsTabOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-28779&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Вкладки. Есть карты',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Проверить вкладки профиля',
        expected: [
          'Отображаются вкладки "Заказы" и "Карты"',
          'По умолчанию активна вкладка "Заказы"'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Вкладки. Нет карт',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithoutSavedCards,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Проверить вкладки профиля',
        expected: ['Вкладки "Заказы" и "Карты" скрыты', 'Отображается блок заказов']
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Вкладка "Карты"',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.profilePageOpened
    ],
    steps: [
      {
        action: 'Выбрать вкладку "Карты"',
        expected: [
          'Вкладка "Карты" отображается активной',
          'Отображается блок сохранённых карт',
          'Блок заказов скрыт'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Список карт',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.savedCardsTabOpened
    ],
    steps: [
      {
        action: 'Сопоставить список сохранённых карт с ответом GET /cards/cards',
        expected: [
          'Количество сохранённых карт соответствует количеству элементов в массиве cards',
          'Порядок сохранённых карт соответствует порядку элементов в массиве cards'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Карта. Данные',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.savedCardsTabOpened
    ],
    steps: [
      {
        action:
          'Сопоставить сохранённые карты с элементами массива cards из ответа GET /cards/cards',
        expected: [
          'Маскированный номер каждой карты соответствует значению panMasked',
          'Атрибут aria-label каждой карты соответствует значению panMasked'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Карта. Удалить карту',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.savedCardsTabOpened
    ],
    steps: [
      {
        action: 'Нажать кнопку "Удалить карту" у выбранной карты',
        expected: ['Открылось подтверждение удаления выбранной сохранённой карты']
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Удаление. Отмена',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.savedCardsTabOpened,
      profilePreconditions.deletePaymentCardConfirmationOpened
    ],
    steps: [
      {
        action: 'Нажать кнопку "Отмена"',
        expected: [
          'Подтверждение удаления закрылось',
          'Запрос DELETE /cards/cards/{id} не отправлен',
          'Выбранная карта осталась в списке сохранённых карт'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Удаление. Удалить. Лоадер',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.savedCardsTabOpened,
      profilePreconditions.deletePaymentCardConfirmationOpened
    ],
    steps: [
      {
        action: 'Замедлить ответ DELETE /cards/cards/{id} и нажать кнопку "Удалить"',
        expected: [
          'Во время запроса кнопки "Отмена" и "Удалить" отображаются в состоянии disabled',
          'В кнопке "Удалить" отображается индикатор загрузки'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Удаление. Удалить. Успех',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.savedCardsTabOpened,
      profilePreconditions.deletePaymentCardConfirmationOpened
    ],
    steps: [
      {
        action: 'Нажать кнопку "Удалить"',
        expected: [
          'Отправлен запрос DELETE /cards/cards/{id}, где id соответствует выбранной карте',
          'После успешного ответа повторно отправлен запрос GET /cards/cards',
          'Подтверждение удаления закрылось',
          'Удалённая карта не отображается в списке сохранённых карт'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Удаление последней карты',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.userWithOneSavedCard,
      profilePreconditions.savedCardsTabOpened,
      profilePreconditions.deletePaymentCardConfirmationOpened
    ],
    steps: [
      {
        action: 'Нажать кнопку "Удалить"',
        expected: [
          'Удалённая карта не отображается',
          'Вкладки "Заказы" и "Карты" скрыты',
          'Отображается блок заказов'
        ]
      }
    ]
  }
];
