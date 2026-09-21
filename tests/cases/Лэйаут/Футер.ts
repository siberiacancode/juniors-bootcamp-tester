import { preconditions, statuses } from '../0 Configuration';

export const footer: TestCase[] = [
  {
    name: 'Лэйаут. Футер. Дизайн. Десктоп',
    status: statuses.actual,
    preconditions: [preconditions.desktop],
    steps: [
      {
        action: 'Проверить состав блока "Футер"',
        expected: [
          'Блок соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40012017-22118&t=Vnj0EdA8aPfbkmq9-0'
        ]
      }
    ]
  },
  {
    name: 'Лэйаут. Футер. Дизайн. Мобилка',
    status: statuses.actual,
    preconditions: [preconditions.mobile],
    steps: [
      {
        action: 'Проверить расположение элементов блока "Футер"',
        expected: [
          'Блок соответствует дизайну https://www.figma.com/design/dTtlKirZNUvr9POVt2lcRA/Juniors-Bootcamp-UI-kit?node-id=40012017-22082&t=Vnj0EdA8aPfbkmq9-0'
        ]
      }
    ]
  },
  {
    name: 'Лэйаут. Футер. Логотип',
    status: statuses.actual,
    preconditions: [],
    steps: [
      {
        action: 'Кликнуть на логотип "GAMES"',
        expected: ['Запросилась и открылась страница /']
      }
    ]
  },
  {
    name: 'Лэйаут. Футер. Весь каталог',
    status: statuses.actual,
    preconditions: [],
    steps: [
      {
        action: 'Кликнуть на ссылку "Весь каталог"',
        expected: ['Запросилась и открылась страница /']
      }
    ]
  },
  {
    name: 'Лэйаут. Футер. Новинки',
    status: statuses.actual,
    preconditions: [],
    steps: [
      {
        action: 'Кликнуть на ссылку "Новинки"',
        expected: [
          'Запросилась и открылась страница /?view=new',
          'В каталоге выбран фильтр отображения "Новинки"'
        ]
      }
    ]
  },
  {
    name: 'Лэйаут. Футер. Популярные',
    status: statuses.actual,
    preconditions: [],
    steps: [
      {
        action: 'Кликнуть на ссылку "Популярные"',
        expected: [
          'Запросилась и открылась страница /?view=popular',
          'В каталоге выбран фильтр отображения "Популярные"'
        ]
      }
    ]
  },
  {
    name: 'Лэйаут. Футер. Контактные ссылки',
    status: statuses.actual,
    preconditions: [],
    steps: [
      {
        action: 'Проверить ссылки в секции "Связаться с нами"',
        expected: [
          'Ссылка "Поддержка клиентов" указывает на страницу "/profile"',
          'Ссылка "Написать нам на почту" указывает на страницу "/profile"',
          'Ссылка "По вопросам рекламы" указывает на страницу "/profile"',
          'Ссылка "Контакты" указывает на страницу "/profile"'
        ]
      }
    ]
  },
  {
    name: 'Лэйаут. Футер. Контактные ссылки. Неавторизован',
    status: statuses.actual,
    preconditions: [preconditions.unauthorizedUser],
    steps: [
      {
        action: 'Кликнуть на любую ссылку в секции "Связаться с нами"',
        expected: [
          'Запросилась и открылась страница /login с queryParam “redirect” === полной ссылке, на которой был совершен клик'
        ]
      }
    ]
  },
  {
    name: 'Лэйаут. Футер. Ссылка на GitHub',
    status: statuses.actual,
    preconditions: [],
    steps: [
      {
        action: 'Кликнуть на ссылку "Ссылка на GitHub"',
        expected: [
          'В новой вкладке открылась https://github.com/siberiacancode/juniors-bootcamp-tester'
        ]
      }
    ]
  },
  {
    name: 'Лэйаут. Футер. Юридические ссылки',
    status: statuses.actual,
    preconditions: [],
    steps: [
      {
        action: 'Проверить ссылку "Политика конфиденциальности"',
        expected: ['Ссылка href="#"']
      },
      {
        action: 'Проверить ссылку "Пользовательское соглашение"',
        expected: ['Ссылка href="#"']
      }
    ]
  }
];
