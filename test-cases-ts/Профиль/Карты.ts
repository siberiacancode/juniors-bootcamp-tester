import { preconditions, statuses } from '../0 Configuration';
import { profilePreconditions } from './preconditions';

const cardsTabPreconditions: Record<string, string[]> = {
  slowMode: ['Замедлить ответ на запрос GET /cards/cards']
};

export const cardsTab: TestCase[] = [
  {
    name: 'Профиль. Карты. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.cardsOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-28823&t=uO8ocxt4ibI98G8q-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Карты. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.cardsOpened
    ],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013222-6862&t=uO8ocxt4ibI98G8q-0'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Карты. Данные',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.cardsOpened
    ],
    steps: [
      {
        action:
          'Сопоставить карты на странице с элементами массива cards из ответа GET /cards/cards',
        expected: [
          'Количество и порядок сохранённых карт соответствует массиву cards',
          'Маскированный номер каждой карты соответствует значению panMasked',
          'Атрибут aria-label каждой карты соответствует значению panMasked'
        ]
      }
    ]
  },
  {
    name: 'Профиль. Карты. Удалить карту',
    status: statuses.actual,
    preconditions: [
      preconditions.authorizedUser,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.cardsOpened
    ],
    steps: [
      {
        action: 'Нажать кнопку "Удалить карту" у выбранной карты',
        expected: ['Открылся попап подтверждения удаления карты']
      }
    ]
  },
  {
    name: 'Профиль. Карты. Лоадер. Дизайн. Десктоп',
    status: statuses.needRework,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.desktop,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.cardsOpened,
      cardsTabPreconditions.slowMode
    ],
    steps: [
      {
        action: 'Удалить любую карту и проверить соответствие блока дизайну',
        expected: ['Соответствует дизайну ']
      }
    ]
  },
  {
    name: 'Профиль. Карты. Лоадер. Дизайн. Мобилка',
    status: statuses.needRework,
    preconditions: [
      preconditions.authorizedUser,
      preconditions.mobile,
      profilePreconditions.pageOpened,
      profilePreconditions.userWithSavedCards,
      profilePreconditions.cardsOpened,
      cardsTabPreconditions.slowMode
    ],
    steps: [
      {
        action: 'Удалить любую карту и проверить соответствие блока дизайну',
        expected: ['Соответствует дизайну ']
      }
    ]
  }
];
