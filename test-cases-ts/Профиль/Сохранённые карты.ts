import { preconditions, statuses } from '../0 Configuration';

export const profileSavedCards: TestCase[] = [
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
        expected: ['Вкладки "Заказы" и "Карты" не отображаются', 'Отображается блок заказов']
      }
    ]
  },
  {
    name: 'Профиль. Сохранённые карты. Отображение',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithSavedCards],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и выбрать вкладку "Карты"',
        expected: [
          'Вкладка "Карты" отображается активной',
          'Список сохранённых карт соответствует массиву cards из ответа GET /cards/cards',
          'Для каждой карты отображается маскированный номер из значения panMasked',
          'Для каждой карты отображается кнопка "Удалить карту"'
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
          'Отправлен запрос DELETE /cards/cards/{id}, где id соответствует выбранной карте',
          'Во время запроса кнопки "Отмена" и "Удалить" отображаются в состоянии disabled',
          'В кнопке "Удалить" отображается индикатор загрузки',
          'После успешного ответа повторно запрошены данные GET /cards/cards',
          'Подтверждение удаления закрылось',
          'Удалённая карта не отображается в списке сохранённых карт'
        ]
      }
    ]
  }
];
