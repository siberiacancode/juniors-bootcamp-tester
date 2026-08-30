import { preconditions, statuses } from '../0 Configuration';

export const profileSavedCards: TestCase[] = [
  {
    name: 'Профиль. Сохранённые карты. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.profileWithOrders,
      preconditions.profileWithSavedCards,
      preconditions.desktop
    ],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и выбрать вкладку "Карты"',
        expected: [
          'Блок сохранённых карт соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-28779&t=C3LWJeVCld438rNs-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Вкладки. Есть карты',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithSavedCards],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile"',
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
    preconditions: [preconditions.authorizedUser, preconditions.profileWithoutSavedCards],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile"',
        expected: ['Вкладки "Заказы" и "Карты" скрыты', 'Отображается блок заказов']
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Переключение на вкладку "Карты"',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithSavedCards],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и выбрать вкладку "Карты"',
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
    preconditions: [preconditions.authorizedUser, preconditions.profileWithSavedCards],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и выбрать вкладку "Карты"',
        expected: [
          'Количество сохранённых карт соответствует количеству элементов в массиве cards из ответа GET /cards/cards',
          'Порядок сохранённых карт соответствует порядку элементов в массиве cards'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Карта. Данные',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithSavedCards],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и выбрать вкладку "Карты"',
        expected: [
          'Маскированный номер каждой карты соответствует значению panMasked из массива cards'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Удаление. Отмена',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithSavedCards],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile", выбрать вкладку "Карты", нажать кнопку "Удалить карту" у выбранной карты и нажать кнопку "Отмена" в подтверждении удаления',
        expected: [
          'Подтверждение удаления закрылось',
          'Запрос DELETE /cards/cards/{id} не отправлен',
          'Выбранная карта осталась в списке сохранённых карт'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Удаление. Подтверждение',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithSavedCards],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile", выбрать вкладку "Карты", нажать кнопку "Удалить карту" у выбранной карты и один раз нажать кнопку "Удалить" в подтверждении удаления',
        expected: [
          'Отправлен один запрос DELETE /cards/cards/{id}, где id соответствует выбранной карте',
          'Во время запроса кнопки "Отмена" и "Удалить" отображаются в состоянии disabled',
          'В кнопке "Удалить" отображается индикатор загрузки',
          'После успешного ответа повторно запрошены данные GET /cards/cards',
          'Подтверждение удаления закрылось',
          'Удалённая карта не отображается в списке сохранённых карт'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Удаление последней карты',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithSavedCards],
    steps: [
      {
        action:
          'Открыть страницу "/tester/profile" за пользователя с одной сохранённой картой, выбрать вкладку "Карты", удалить карту и подтвердить удаление',
        expected: [
          'Удалённая карта скрыта',
          'Вкладки "Заказы" и "Карты" скрыты',
          'Отображается блок заказов'
        ]
      }
    ]
  }
];
