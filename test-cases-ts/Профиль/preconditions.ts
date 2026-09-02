type ProfilePrecondition =
  | 'deletePaymentCardConfirmationOpened'
  | 'editProfileOpened'
  | 'profilePageOpened'
  | 'savedCardsTabOpened'
  | 'userWithEmail'
  | 'userWithFullName'
  | 'userWithOneSavedCard'
  | 'userWithoutEmail'
  | 'userWithoutFullName'
  | 'userWithoutOrders'
  | 'userWithoutSavedCards'
  | 'userWithSavedCards'
  | 'userWithSeveralOrders';

export const profilePreconditions: Record<ProfilePrecondition, string[]> = {
  deletePaymentCardConfirmationOpened: [
    'Открыто подтверждение удаления выбранной сохранённой карты'
  ],
  editProfileOpened: ['Открыта панель "Редактирование данных"'],
  profilePageOpened: ['Открыта страница "/tester/profile"'],
  savedCardsTabOpened: ['Открыта вкладка "Карты" на странице "/tester/profile"'],
  userWithEmail: ['Пользователь с заполненным email'],
  userWithFullName: ['Пользователь с заполненным ФИО'],
  userWithOneSavedCard: ['Пользователь с одной сохранённой картой'],
  userWithSavedCards: ['Пользователь с несколькими сохранёнными картами'],
  userWithSeveralOrders: ['Пользователь с несколькими заказами'],
  userWithoutEmail: ['Пользователь без заполненного email'],
  userWithoutFullName: ['Пользователь без заполненного ФИО'],
  userWithoutOrders: ['Пользователь без заказов'],
  userWithoutSavedCards: ['Пользователь без сохранённых карт']
} as const;
