import { createTestCases, preconditions, statuses } from '../(utils)';
import { CASE_IDS } from './case-ids';

const notFoundPreconditions = {
  opened: ['Открыть несуществующий адрес внутри приложения, например "/non-existent-page"']
};

export default createTestCases([
  {
    id: CASE_IDS.NOT_FOUND_DESIGN,
    name: 'Системное. 404. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.desktop, notFoundPreconditions.opened],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013130-10108&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.NOT_FOUND_DESIGN,
    name: 'Системное. 404. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile, notFoundPreconditions.opened],
    steps: [
      {
        action: 'Проверить соответствие дизайну',
        expected: [
          'Соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40013139-10627&t=Sres4KwsHE5HeO6q-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.NOT_FOUND_HOME,
    name: 'Системное. 404. Перейти на главную',
    status: statuses.actual,
    preconditions: [notFoundPreconditions.opened],
    steps: [
      {
        action: 'Нажать кнопку "Перейти на главную"',
        expected: ['Открыта главная страница "/"']
      }
    ]
  }
]);
