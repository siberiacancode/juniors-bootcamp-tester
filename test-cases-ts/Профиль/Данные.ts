import { preconditions, statuses } from '../0 Configuration';

export const profileDesign: TestCase[] = [
  {
    name: 'Профиль. Данные',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, preconditions.desktop],
    steps: [
      {
        action: 'Проверить данные на странице в блоке Личных данных',
        expected: [
          'Данные на странице в блоке Личных данных соответствуют данным из запроса GET /profile, где:',
          'email - email',
          'phone - номер телефона',
          'firstname - Имя пользователя',
          'lastname - Фамилия пользователя',
          'middlename - Отчество пользователя'
        ]
      },
      {
        action: 'Проверить данные на странице в блоке Заказов',
        expected: [
          'Данные на странице в блоке Заказов соответствуют данным из запроса GET /orders, где:',
          'gameName - название игры',
          'edition - издание игры',
          'gameImage - сокращенная ссылка на обложку игры',
          'region - регион активации',
          'deliveryType - тип доставки',
          'person.email - почта, куда отправили детали покупки',
          'Способ оплаты?'
        ]
      }
    ]
  }
];
