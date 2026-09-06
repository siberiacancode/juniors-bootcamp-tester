import { preconditions, statuses } from '../0 Configuration';
import { profilePreconditions } from './preconditions';

const cardDeleteConfirmationPreconditions: Record<string, string[]> = {
  opened: ['Открыт попап "Подтверждение удаления карты"'],
  userWithOnlyOneSavedCard: ['Пользователь с одной сохраненных карт']
};

export const cardDeleteConfirmation: TestCase[] = [
  {
    name: 'Профиль. Карты. Подтверждение удаления карты. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.cardsOpened,
      cardDeleteConfirmationPreconditions.opened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-12031&t=uO8ocxt4ibI98G8q-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Карты. Подтверждение удаления карты. Дизайн. Мобилка',
    status: statuses.needRework,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.cardsOpened,
      cardDeleteConfirmationPreconditions.opened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: ['Соответствует дизайну (сейчас нет дизайна для этого)']
      }
    ]
  },
  {
    name: 'Профиль. Карты. Подтверждение удаления карты. Отмена',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.cardsOpened,
      cardDeleteConfirmationPreconditions.opened
    ],
    steps: [
      {
        action: 'Нажать кнопку "Отмена"',
        expected: ['Попап подтверждения удаления карты закрылся']
      }
    ]
  },
  {
    name: 'Профиль. Карты. Подтверждение удаления карты. Кнопка закрытия. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.cardsOpened,
      cardDeleteConfirmationPreconditions.opened
    ],
    steps: [
      {
        action: 'Нажать кнопку закрытия',
        expected: ['Попап подтверждения удаления карты закрылся']
      }
    ]
  },
  {
    name: 'Профиль. Карты. Подтверждение удаления карты. Удалить. Лоадер',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.cardsOpened,
      cardDeleteConfirmationPreconditions.opened
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
    name: 'Профиль. Карты. Подтверждение удаления карты. Удалить. Успех',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.cardsOpened,
      cardDeleteConfirmationPreconditions.opened
    ],
    steps: [
      {
        action: 'Нажать кнопку "Удалить"',
        expected: [
          'Отправлен запрос DELETE /cards/cards/{id}, где id соответствует _id удаляемой карты из запроса GET /cards/cards',
          'Попап подтверждения удаления карты закрылся',
          'Открыта страница /profile в разделе Карты',
          'Отправлен запрос GET /cards/cards',
          'Список карт на странице соответствует полученному из запроса GET /cards/cards'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Карты. Подтверждение удаления карты. Удалить. Ошибка',
    status: statuses.needRework,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.cardsOpened,
      cardDeleteConfirmationPreconditions.opened
    ],
    steps: [
      {
        action: 'Подменить ответ DELETE /cards/cards/{id} на HTTP 500 и нажать кнопку "Удалить"',
        expected: ['Подтверждение выхода открыто', 'Отобразился тост с ошибкой из запроса']
      }
    ]
  },
  {
    name: 'Профиль. Карты. Подтверждение удаления карты. Удалить. Последняя карта',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      cardDeleteConfirmationPreconditions.userWithOnlyOneSavedCard,
      profilePreconditions.cardsOpened,
      cardDeleteConfirmationPreconditions.opened
    ],
    steps: [
      {
        action: 'Нажать кнопку "Удалить"',
        expected: [
          'Попап подтверждения удаления карты закрылся',
          'Открыта страница /profile в разделе Заказы',
          'Блок вкладок "Заказы" и "Карты" отсутствует на странице'
        ]
      }
    ]
  }
];
