export const preconditions: Record<Precondition, string[]> = {
  authorizedUser: [
    'Открыть страницу "Авторизация"',
    'Ввести валидный номер телефона и нажать "Продолжить"',
    'Ввести валидный проверочный код и нажать "Войти"'
  ],
  unauthorizedUser: ['Пользователь неавторизован'],
  userWithAtLeastOnePurchase: ['Пользователь с минимум одной покупкой'],
  desktop: ['Установить десктопную ширину экрана'],
  mobile: ['Включить адаптивный мобильный режим']
} as const;
