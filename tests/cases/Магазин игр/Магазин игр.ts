import { createTestCases, preconditions, statuses } from '../(utils)';
import { CASE_IDS } from './case-ids';
import { storePreconditions } from './preconditions';

export default createTestCases([
  {
    id: CASE_IDS.PAGE_DESIGN,
    name: 'Магазин игр. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.desktop, storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Проверить соответствие общей компоновки страницы дизайну: взаимное расположение поиска, переключателя каталога, боковой колонки с фильтрами и баннером распродажи, каталога игр, ширины колонок, выравнивание и расстояния между блоками',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-6459&t=eIkCdZFIU6HjwQdZ-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.PAGE_DESIGN,
    name: 'Магазин игр. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile, storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Проверить соответствие общей компоновки страницы дизайну: порядок заголовка, поиска, переключателя каталога, каталога игр и баннера распродажи, расположение кнопки фильтров, ширину контента и расстояния между блоками',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003080-17185&t=eIkCdZFIU6HjwQdZ-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.BANNER_DESIGN,
    name: 'Магазин игр. Баннер распродажи. Дизайн',
    status: statuses.actual,
    preconditions: [storePreconditions.pageOpened],
    steps: [
      {
        action:
          'Проверить соответствие внутреннего оформления баннера распродажи дизайну: фон, скругления, внутренние отступы, типографику, тексты "Распродажа игр" и "Только до 10 июля", бейдж "-50%" и маскот',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-6507&t=eIkCdZFIU6HjwQdZ-0'
        ]
      }
    ]
  }
]);
