import { preconditions, statuses } from '../0 Configuration';
import { storePreconditions } from './preconditions';

export const catalogViews: TestCase[] = [
  {
    name: 'Магазин игр. Переключатель каталога. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.desktop, storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Проверить соответствие внутреннего оформления переключателя каталога дизайну: размеры, скругления, отступы, типографику, порядок пунктов "Весь каталог", "Новинки", "Популярные" и оформление выбранного пункта',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-6472&t=vXcbvhyxbU46NDAk-0'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Переключатель каталога. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile, storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Проверить соответствие внутреннего оформления переключателя каталога дизайну: размеры, скругления, отступы, типографику, порядок пунктов "Весь каталог", "Новинки", "Популярные" и оформление выбранного пункта',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003080-17213&t=vXcbvhyxbU46NDAk-0'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Переключатель каталога. Горизонтальная прокрутка. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile, storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Установить ширину экрана, при которой пункт "Популярные" находится за видимой областью переключателя, и прокрутить переключатель по горизонтали до этого пункта',
        expected: ['Пункт "Популярные" доступен для нажатия в видимой области переключателя']
      }
    ]
  },
  {
    name: 'Магазин игр. Переключатель каталога. Выбор по умолчанию',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Проверить выбранный пункт переключателя и параметры GET /games/info при открытии страницы',
        expected: [
          'В переключателе выбран только пункт "Весь каталог"',
          'В запросе GET /games/info отсутствует параметр view'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Переключатель каталога. Новинки',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action: 'Нажать "Новинки"',
        expected: [
          'В переключателе выбран только пункт "Новинки"',
          'В URL установлен параметр view=new',
          'Отправлен GET /games/info с view = new'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Переключатель каталога. Популярные',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action: 'Нажать "Популярные"',
        expected: [
          'В переключателе выбран только пункт "Популярные"',
          'В URL установлен параметр view=popular',
          'Отправлен GET /games/info с view = popular'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Переключатель каталога. Весь каталог',
    status: statuses.actual,
    steps: [
      {
        action:
          'Открыть страницу "/?view=new", дождаться загрузки каталога и нажать "Весь каталог"',
        expected: [
          'В переключателе выбран только пункт "Весь каталог"',
          'В URL отсутствует параметр view',
          'Отправлен GET /games/info без параметра view'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Переключатель каталога. Выбор из URL',
    status: statuses.actual,
    steps: [
      {
        action: 'Открыть страницу "/?view=new" напрямую через адресную строку',
        expected: [
          'В переключателе выбран только пункт "Новинки"',
          'Отправлен GET /games/info с view = new'
        ]
      },
      {
        action: 'Открыть страницу "/?view=popular" напрямую через адресную строку',
        expected: [
          'В переключателе выбран только пункт "Популярные"',
          'Отправлен GET /games/info с view = popular'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Переключатель каталога. Некорректный параметр view',
    status: statuses.actual,
    steps: [
      {
        action: 'Открыть страницу "/?view=unknown" напрямую через адресную строку',
        expected: [
          'В переключателе выбран только пункт "Весь каталог"',
          'Отправлен GET /games/info без параметра view'
        ]
      }
    ]
  },
  {
    name: 'Магазин игр. Переключатель каталога. Сохранение жанров и фильтров',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action: 'Выбрать жанры и фильтры, дождаться загрузки каталога и нажать "Новинки"',
        expected: [
          'Ранее выбранные жанры и фильтры остаются выбранными в интерфейсе фильтров',
          'В URL сохранены значения genre и filter, установленные до переключения; view = new',
          'Отправлен GET /games/info с view = new и значениями genre и filter, соответствующими выбору до переключения'
        ]
      }
    ]
  }
];
