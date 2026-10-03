import { createTestCases, preconditions, statuses } from '../(utils)';
import { CASE_IDS } from './case-ids';
import { storePreconditions } from './preconditions';

export default createTestCases([
  {
    id: CASE_IDS.SEARCH_INPUT_EMPTY_DESIGN,
    name: 'Магазин игр. Поиск. Поле. Пустое. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.desktop, storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Проверить внутреннее оформление пустого поля поиска: размеры, скругления, отступы, иконку поиска и плейсхолдер "Название игры"',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-6471&t=YApm0Dd31afJmuka-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_INPUT_EMPTY_DESIGN,
    name: 'Магазин игр. Поиск. Поле. Пустое. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile, storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Проверить внутреннее оформление пустого поля поиска: размеры, скругления, отступы, иконку поиска и плейсхолдер "Название игры"',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003080-17211&t=YApm0Dd31afJmuka-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_INPUT_FILLED_DESIGN,
    name: 'Магазин игр. Поиск. Поле. Заполненное. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.desktop, storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Ввести название игры и проверить внутреннее оформление заполненного поля поиска: текст, отступы, иконку поиска и кнопку очистки',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40011807-7560&t=YApm0Dd31afJmuka-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_INPUT_FILLED_DESIGN,
    name: 'Магазин игр. Поиск. Поле. Заполненное. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile, storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Ввести название игры и проверить внутреннее оформление заполненного поля поиска: текст, отступы, иконку поиска и кнопку очистки',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40011807-6922&t=YApm0Dd31afJmuka-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_RESULTS_DESIGN,
    name: 'Магазин игр. Поиск. Выпадающий список. Результаты. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.desktop, storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Ввести запрос с несколькими найденными играми и проверить внутреннее оформление выпадающего списка: размеры, отступы, строки с обложками, названиями, способами получения, ценами и бейджами',
        expected: [
          'Соответствует дизайнуhttps://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40011807-7561&t=YApm0Dd31afJmuka-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_RESULTS_DESIGN,
    name: 'Магазин игр. Поиск. Выпадающий список. Результаты. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile, storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Ввести запрос с несколькими найденными играми и проверить внутреннее оформление выпадающего списка: размеры, отступы, строки с обложками, названиями, ценами и бейджами',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40011807-6929&t=YApm0Dd31afJmuka-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_LOADING_DESIGN,
    name: 'Магазин игр. Поиск. Выпадающий список. Лоадер. Дизайн',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Замедлить ответ GET /games/search, ввести название игры и проверить оформление выпадающего списка до получения ответа: индикатор загрузки и текст "Загрузка результатов"',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40011807-8410&t=YApm0Dd31afJmuka-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_EMPTY_DESIGN,
    name: 'Магазин игр. Поиск. Выпадающий список. Пустой список. Дизайн',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Ввести запрос, для которого GET /games/search возвращает success = true и games = [], и проверить оформление выпадающего списка: иконку, тексты "Ничего не нашлось" и "Попробуйте поменять запрос"',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40011807-8721&t=YApm0Dd31afJmuka-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_SUGGESTIONS,
    name: 'Магазин игр. Поиск. Предложения без запроса',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action: 'Открыть поиск с пустым запросом при непустом каталоге',
        expected: [
          'Количество и порядок предложенных игр соответствуют массиву games первой страницы ответа GET /games/info для текущих параметров каталога'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_QUERY,
    name: 'Магазин игр. Поиск. Поисковый запрос',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action: 'Ввести название игры без пауз между символами и остановиться',
        expected: [
          'Через 500 мс после окончания ввода отправлен GET /games/search с параметром search, равным введённому названию игры',
          'Запросы для промежуточных фрагментов названия отсутствуют'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_RESULTS_DATA,
    name: 'Магазин игр. Поиск. Результаты. Данные',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Ввести запрос, для которого GET /games/search возвращает несколько игр, и дождаться ответа',
        expected: [
          'Количество и порядок результатов соответствуют массиву games из ответа GET /games/search',
          'Название каждой игры соответствует полю name',
          'src обложки равен "/api{image}", alt обложки соответствует полю name',
          'Cпособ получения соответствует локализованному значению priceVariant.deliveryType',
          'Цена каждой игры соответствует priceVariant.price, отформатирована в рублях с префиксом "от"'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_PRICE_NO_DISCOUNT,
    name: 'Магазин игр. Поиск. Цена. Без скидки',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Ввести запрос с платной игрой, у которой в ответе GET /games/search отсутствует priceVariant.oldPrice, и проверить результат поиска',
        expected: ['Старая цена и бейдж скидки отсутствуют у игры']
      },
      {
        action:
          'Ввести запрос с платной игрой, у которой в ответе GET /games/search priceVariant.oldPrice равна priceVariant.price, и проверить результат поиска',
        expected: ['Старая цена и бейдж скидки отсутствуют у игры']
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_PRICE_DISCOUNT,
    name: 'Магазин игр. Поиск. Цена. Данные. Со скидкой',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Ввести запрос с игрой, у которой в ответе GET /games/search 0 < priceVariant.price < priceVariant.oldPrice, и проверить результат поиска',
        expected: [
          'Текущая цена соответствует priceVariant.price и отображается в рублях с префиксом "от"',
          'Старая цена соответствует priceVariant.oldPrice, отформатирована в рублях и зачёркнута',
          'Бейдж скидки содержит процент, рассчитанный по формуле (priceVariant.oldPrice - priceVariant.price) / priceVariant.oldPrice * 100, округлённый до целого числа, со знаком "-" перед значением и "%" после него'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_PRICE_FREE,
    name: 'Магазин игр. Поиск. Цена. Данные. Бесплатно',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Ввести запрос с игрой, у которой в ответе GET /games/search priceVariant.price = 0 и отсутствует priceVariant.oldPrice, и проверить результат поиска',
        expected: ['Цена отображается как "от 0 ₽"', 'Отображается бейдж "Бесплатно"']
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_PRICE_FULL_DISCOUNT,
    name: 'Магазин игр. Поиск. Цена. Данные. Скидка 100%',
    status: statuses.needRework,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Ввести запрос с игрой, у которой в ответе GET /games/search priceVariant.price = 0 и priceVariant.oldPrice > 0, и проверить результат поиска',
        // Требуется уточнить содержимое бейджа: "Бесплатно", "-100%" или оба значения.
        expected: [
          'Текущая цена отображается как "от 0 ₽"',
          'Старая цена соответствует priceVariant.oldPrice, отформатирована в рублях и зачёркнута',
          'Отображается скидка "-100%"'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_CHANGE_QUERY,
    name: 'Магазин игр. Поиск. Изменение запроса',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Получить результаты по одному запросу, изменить запрос и дождаться нового ответа GET /games/search',
        expected: [
          'Параметр search нового запроса соответствует изменённому тексту',
          'Выдача соответствует массиву games нового ответа GET /games/search'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_RESET,
    name: 'Магазин игр. Поиск. Сброс запроса',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action: 'Ввести запрос и нажать кнопку очистки поля поиска',
        expected: ['Поле поиска пустое', 'Выпадающий список закрыт']
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_REOPEN,
    name: 'Магазин игр. Поиск. Закрытие и повторное открытие',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action: 'Ввести запрос, дождаться результатов и нажать вне поиска',
        expected: ['Выпадающий список закрыт', 'Введённый запрос сохранён']
      },
      {
        action: 'Снова открыть поиск',
        expected: ['Показана выдача для сохранённого запроса']
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_GAME_DETAILS,
    name: 'Магазин игр. Поиск. Переход к игре',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action: 'Ввести запрос, дождаться результатов и выбрать найденную игру',
        expected: [
          'Открылась страница "/games/{slug}", где slug равен полю slug выбранной игры из массива games в ответе GET /games/search'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.SEARCH_ERROR,
    name: 'Магазин игр. Поиск. Ошибка запроса',
    status: statuses.needRework,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action: 'Ввести запрос, для которого GET /games/search завершается ошибкой',
        // Требуется уточнить отображение ошибки и возможность повторного поиска.
        expected: ['Требуется уточнить ожидаемое поведение поиска при ошибке GET /games/search']
      }
    ]
  }
]);
