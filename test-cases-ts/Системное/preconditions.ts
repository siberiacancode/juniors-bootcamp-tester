type SystemPrecondition = 'errorStateOpened' | 'logoutConfirmationOpened' | 'notFoundOpened';

export const systemPreconditions: Record<SystemPrecondition, string[]> = {
  errorStateOpened: [
    'Для существующей игры подменить ответ GET /games/info/{slug} на HTTP 500',
    'Открыть страницу "/tester/games/{slug}"'
  ],
  logoutConfirmationOpened: ['Открыто подтверждение выхода'],
  notFoundOpened: [
    'Открыть несуществующий адрес внутри приложения, например "/tester/non-existent-page"'
  ]
} as const;
