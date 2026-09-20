import { preconditions, statuses } from '../0 Configuration';

const catalogPreconditions: Record<string, string[]> = {
  pageOpened: ['Открыта страница "/" с непустым каталогом игр'],
  paginatedPageOpened: ['Открыта первая страница каталога "/" с более чем 12 играми'],
  slowMode: ['Замедлить ответ GET /games/info'],
  emptyList: ['Для открываемого каталога GET /games/info возвращает success = true и games = []']
};

export const catalog: TestCase[] = [
  {
    name: 'Магазин игр. Каталог игр. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.desktop, catalogPreconditions.paginatedPageOpened],
    steps: [
      {
        action: 'Проверить соответствие сетки, карточек игр и кнопки "Показать ещё" дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-6513&t=vXcbvhyxbU46NDAk-0'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile, catalogPreconditions.paginatedPageOpened],
    steps: [
      {
        action: 'Проверить соответствие сетки, карточек игр и кнопки "Показать ещё" дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003080-17185&t=vXcbvhyxbU46NDAk-0'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Лоадер. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.desktop, catalogPreconditions.slowMode],
    steps: [
      {
        action:
          'Открыть страницу "/" и проверить соответствие лоадера каталога дизайну до получения ответа GET /games/info',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-6685&t=vXcbvhyxbU46NDAk-0'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Лоадер. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile, catalogPreconditions.slowMode],
    steps: [
      {
        action:
          'Открыть страницу "/" и проверить соответствие лоадера каталога дизайну до получения ответа GET /games/info',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005050-2306&t=vXcbvhyxbU46NDAk-0'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Пустой список. Дизайн. Десктоп',
    status: statuses.needRework,
    preconditions: [preconditions.desktop, catalogPreconditions.emptyList],
    steps: [
      {
        action:
          'Открыть страницу "/" и проверить оформление состояния "Ничего не найдено" после получения ответа GET /games/info',
        expected: ['Соответствует дизайну (макет отсутствует, требуется добавить ссылку)']
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Пустой список. Дизайн. Мобилка',
    status: statuses.needRework,
    preconditions: [preconditions.mobile, catalogPreconditions.emptyList],
    steps: [
      {
        action:
          'Открыть страницу "/" и проверить оформление состояния "Ничего не найдено" после получения ответа GET /games/info',
        expected: ['Соответствует дизайну (макет отсутствует, требуется добавить ссылку)']
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Данные',
    status: statuses.actual,
    preconditions: [catalogPreconditions.pageOpened],
    steps: [
      {
        action:
          'Сопоставить карточки игр с массивом games из ответа GET /games/info для первой страницы',
        expected: [
          'Количество и порядок карточек соответствуют массиву games',
          'Название игры соответствует name',
          'src обложки равен "/api{image}"',
          'alt обложки соответствует name',
          'Цена соответствует priceVariant.price, отформатирована в рублях с разделением разрядов и округлением до целого числа'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Цена. Без скидки',
    status: statuses.actual,
    steps: [
      {
        action:
          'Открыть страницу "/" с платной игрой, у которой в ответе GET /games/info отсутствует priceVariant.oldPrice, и проверить её карточку',
        expected: ['Старая цена и бейдж скидки отсутствуют в карточке игры']
      },
      {
        action:
          'Открыть страницу "/" с платной игрой, у которой priceVariant.oldPrice равна priceVariant.price, и проверить её карточку',
        expected: ['Старая цена и бейдж скидки отсутствуют в карточке игры']
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Цена. Данные. Со скидкой',
    status: statuses.actual,
    steps: [
      {
        action:
          'Открыть страницу "/" с игрой, у которой в ответе GET /games/info priceVariant.price > 0 и priceVariant.price < priceVariant.oldPrice, и проверить её карточку',
        expected: [
          'Текущая цена соответствует priceVariant.price и отформатирована в рублях',
          'Старая цена соответствует priceVariant.oldPrice и отформатирована в рублях',
          'Бейдж скидки содержит процент, рассчитанный по формуле (priceVariant.oldPrice - priceVariant.price) / priceVariant.oldPrice * 100, округлённый до целого числа, со знаком "-" перед значением и "%" после него'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Цена. Данные. Бесплатно',
    status: statuses.actual,
    steps: [
      {
        action:
          'Открыть страницу "/" с игрой, у которой в ответе GET /games/info priceVariant.price = 0 и отсутствует priceVariant.oldPrice, и проверить её карточку',
        expected: ['Цена отображается как "0 ₽"', 'Отображается бейдж "Бесплатно"']
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Цена. Данные. Скидка 100%',
    status: statuses.needRework,
    steps: [
      {
        action:
          'Открыть страницу "/" с игрой, у которой в ответе GET /games/info priceVariant.price = 0 и priceVariant.oldPrice > 0, и проверить её карточку',
        // Требуется уточнить содержимое бейджа: "Бесплатно", "-100%" или оба значения.
        expected: [
          'Текущая цена отображается как "0 ₽"',
          'Старая цена соответствует priceVariant.oldPrice и отформатирована в рублях',
          'Отображается скидка "-100%"'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Карточка игры. Переход',
    status: statuses.actual,
    preconditions: [catalogPreconditions.pageOpened],
    steps: [
      {
        action: 'Нажать на карточку игры',
        expected: [
          'Открылась страница "/games/{slug}", где slug равен полю slug выбранной игры из массива games в ответе GET /games/info'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Показать ещё',
    status: statuses.actual,
    steps: [
      {
        action:
          'Открыть страницу "/", выбрать жанр, фильтр и вид каталога, для которых доступно более 12 игр, дождаться загрузки первой страницы и нажать "Показать ещё"',
        expected: [
          'Отправлен GET /games/info с page = 2 и limit = 12; параметры genre, filter и view соответствуют выбранным значениям',
          'Карточки из games второй страницы добавлены после карточек первой страницы в порядке ответа',
          'Общее количество карточек равно сумме количества элементов games в ответах первой и второй страниц'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Показать ещё. Последняя страница',
    status: statuses.actual,
    steps: [
      {
        action:
          'Открыть страницу "/" с каталогом из двух страниц, нажать "Показать ещё" и дождаться ответа GET /games/info с meta.page = meta.totalPages = 2',
        expected: ['Кнопка "Показать ещё" отсутствует после загрузки последней страницы']
      }
    ]
  },
  {
    name: 'Магазин игр. Каталог игр. Показать ещё. Единственная страница',
    status: statuses.actual,
    steps: [
      {
        action:
          'Открыть страницу "/" с непустым каталогом из одной страницы и дождаться ответа GET /games/info с meta.page = meta.totalPages = 1',
        expected: ['Кнопка "Показать ещё" отсутствует после загрузки первой страницы']
      }
    ]
  }
];
