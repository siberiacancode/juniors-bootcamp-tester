import { preconditions, statuses } from '../0 Configuration';

export const profileData: TestCase[] = [
  {
    name: 'Профиль. Личные данные. Отображение',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Проверить данные в блоке Личных данных',
        expected: [
          'Данные соответствуют ответу GET /profile:',
          'email соответствует значению email',
          'phone соответствует значению phone',
          'firstname соответствует значению firstname',
          'lastname соответствует значению lastname',
          'middlename соответствует значению middlename'
        ]
      }
    ]
  },
  {
    name: 'Профиль. История заказов. Отображение',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Проверить данные в блоке Заказов',
        expected: [
          'Список заказов соответствует ответу GET /orders',
          'gameName — название игры',
          'edition — издание игры',
          'gameImage — сокращенная ссылка на обложку',
          'region — регион активации',
          'deliveryType — тип доставки',
          'person.email — почта получателя'
        ]
      }
    ]
  }
];
