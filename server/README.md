# Next.js SSR example

Учебное приложение с одной SSR-страницей каталога и Route Handler.

## Запуск

Из корня репозитория:

```bash
pnpm server-dev-mock
```

Mock API запустится на `http://localhost:3010`, Next.js — на `http://localhost:3000`.
Для другого backend скопируйте `.env.example` в `.env.local` и измените `BACKEND_URL`.

## Что показывает пример

- `app/page.tsx` — async Server Component. Данные каталога загружаются через generated-функцию `getGamesInfo` до отправки HTML браузеру.
- `app/api/games/route.ts` — API route, который преобразует query-параметры и вызывает тот же generated-клиент.
- `app/api/games/route.test.ts` — серверный интеграционный тест на Vitest. Он вызывает `GET` как обычную функцию с настоящим `Request`, а `getGamesInfo` подменяет через `vi.spyOn` на границе внешнего API.

## Проверки

```bash
pnpm server-test
pnpm server-types
pnpm server-build
```
