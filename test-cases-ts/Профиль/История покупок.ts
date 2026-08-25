import { preconditions, statuses } from '../0 Configuration';

export const profileOrderHistory: TestCase[] = [
  {
    name: 'Профиль. История покупок. Отображение заказов',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithOrders],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и проверить список покупок',
        expected: [
          'Список покупок соответствует массиву orders из ответа GET /games/orders',
          'На каждой карточке отображаются gameName и edition',
          'Обложка имеет src="/api{gameImage}" и alt, равный gameName',
          'Регион соответствует локализованному значению region',
          'Способ получения соответствует локализованному значению deliveryType',
          'Почта соответствует значению person.email',
          'Способ оплаты отображается как "Платёжный сервис"',
          'Отображается кнопка "Подробнее"'
        ]
      }
    ]
  },
  {
    name: 'Профиль. История покупок. Переход к заказу',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithOrders],
    steps: [
      {
        action: 'Нажать кнопку "Подробнее" на карточке покупки',
        expected: [
          'Открылась страница "/tester/history/{_id}", где _id соответствует выбранному заказу'
        ]
      }
    ]
  },
  {
    name: 'Профиль. История покупок. Пустое состояние',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.profileWithoutOrders],
    steps: [
      {
        action: 'Открыть страницу "/tester/profile" и проверить блок истории покупок',
        expected: [
          'Отображается иконка InboxIcon',
          'Отображается заголовок "Здесь пока пусто"',
          'Отображается описание "Соверши любую покупку, чтобы она отобразилась тут"',
          'Отображается кнопка "Вернуться в каталог игр"'
        ]
      },
      {
        action: 'Нажать кнопку "Вернуться в каталог игр"',
        expected: ['Открылась страница "/tester/"']
      }
    ]
  }
];
