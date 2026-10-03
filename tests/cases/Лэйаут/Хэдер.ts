import { createTestCases, preconditions, statuses } from '../(utils)';
import { CASE_IDS } from './case-ids';

export default createTestCases([
  {
    id: CASE_IDS.HEADER_DESIGN_UNAUTHORIZED,
    name: 'Лэйаут. Хэдер. Дизайн. Неавторизован. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Проверить соответствие блока “Навигация” дизайну',
        expected: [
          'Блок соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005051-6460&t=ePGuPhBMrDYUahWS-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.HEADER_DESIGN_AUTHORIZED,
    name: 'Лэйаут. Хэдер. Дизайн. Авторизован. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Проверить соответствие блока “Навигация” дизайну',
        expected: [
          'Блок соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40003330-7216&t=ytybvzHI5LjD5aaJ-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.HEADER_DESIGN_MOBILE,
    name: 'Лэйаут. Хэдер. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile],
    steps: [
      {
        action: 'Проверить соответствие блока “Навигация” дизайну',
        expected: [
          'Блок соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40005955-4561&t=ePGuPhBMrDYUahWS-0'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.HEADER_GAMES,
    name: 'Лэйаут. Хэдер. Games',
    status: statuses.actual,
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница /']
      }
    ]
  },
  {
    id: CASE_IDS.HEADER_LOGIN,
    name: 'Лэйаут. Хэдер. Войти. Неавторизован. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница /login']
      }
    ]
  },
  {
    id: CASE_IDS.HEADER_HISTORY_AUTHORIZED,
    name: 'Лэйаут. Хэдер. История. Авторизован',
    status: statuses.needRework,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница /history']
      }
    ]
  },
  {
    id: CASE_IDS.HEADER_HISTORY_UNAUTHORIZED,
    name: 'Лэйаут. Хэдер. История. Неавторизован',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: [
          'Запросилась и открылась страница /login с queryParam “redirect” === полной ссылке, на которой был совершен клик на кнопку'
        ]
      }
    ]
  },
  {
    id: CASE_IDS.HEADER_HISTORY_AUTHORIZED,
    name: 'Лэйаут. Хэдер. История. Авторизован',
    status: statuses.needRework,
    preconditions: [preconditions.authorizedUser],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: ['Запросилась и открылась страница /history']
      }
    ]
  },
  {
    id: CASE_IDS.HEADER_PROFILE_UNAUTHORIZED,
    name: 'Лэйаут. Хэдер. Профиль. Неавторизован',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser],
    steps: [
      {
        action: 'Кликнуть на кнопку',
        expected: [
          'Запросилась и открылась страница /login с queryParam “redirect” === полной ссылке, на которой был совершен клик на кнопку'
        ]
      }
    ]
  }
]);
