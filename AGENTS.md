# Repository Guidelines

## Project Structure & Module Organization

This is a Vite React TypeScript app. Application code lives in `src`, with routes in `src/routes`, shared UI in `src/components`, app bootstrap in `src/app`, and utilities in `src/utils`. Generated API clients, fakers, routes, and test ids live in `generated` and should not be edited manually. Runtime text is in `static/ru.json`; browser assets are in `public`. Mock API handlers and seed data are in `mock`. Tests are split between colocated unit tests, Playwright tests in `tests/autotests`, helpers in `tests/utils`, and manual case catalogs in `tests/cases` and `test-cases-ts`.

## Build, Test, and Development Commands

- `pnpm dev` starts the Vite dev server.
- `pnpm dev-mock` starts the mock server and Vite in mock mode.
- `pnpm build` runs TypeScript build checks and creates the production bundle.
- `pnpm types` runs `tsc --noEmit`.
- `pnpm lint` runs ESLint with autofix.
- `pnpm unit-test` runs Vitest.
- `pnpm integration-test` runs the Playwright browser and component suites through the project test container.
- `pnpm generate-api` regenerates API artifacts from Apicraft configuration.

## Coding Style & Naming Conventions

Use TypeScript, React function components, and aliases `@/*` and `@/generated/*`. Follow the existing two-space formatting, single quotes, semicolons, and Tailwind class style enforced by `@siberiacancode/eslint`. Route files follow TanStack Router conventions in `src/routes`; helper folders commonly use `index.ts` barrels. Avoid hand-editing generated files and snapshots unless the related generator or test update requires it.

## Testing Guidelines

Vitest covers colocated unit tests such as `src/utils/helpers/money.test.ts`; name tests with `.test.ts` or `.test.tsx`. Playwright integration and component tests live under `tests/autotests`, with mocks beside scenarios when needed. Reuse `tests/utils` helpers and ids from `generated/tests/ids.gen.ts`. Manual cases should follow the shared `TestCase` shape and Russian naming style in `tests/cases` or `test-cases-ts`.

## Commit & Pull Request Guidelines

Recent commits use short messages with a branch or scope prefix, an emoji, and an imperative summary, for example `main 🧊 fix build` or `main 🐙 reworked profile cases`. Keep commits focused and include generated updates with the source change that requires them. Pull requests should describe the change, list verification commands, link issues, and attach screenshots or snapshots for UI changes.

## Security & Configuration Tips

Do not commit secrets. Use the mock phone cases documented in `README.md` for deterministic QA states. When API contracts, routes, or test ids change, regenerate artifacts and review the diff before committing.
