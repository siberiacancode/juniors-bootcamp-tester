---
name: generate-test-cases
description: Generate, revise, review, or reorganize TypeScript test cases under test-cases-ts using this project's UI, source code, and test-case conventions.
---

# Generate Test Cases

## Project Evidence

Before asking the user, inspect the nearest confirmed project sources:

- existing cases in `test-cases-ts`;
- `test-cases-ts/0 Configuration/types.d.ts`;
- `test-cases-ts/0 Configuration/statuses.ts`;
- `test-cases-ts/0 Configuration/preconditions.ts`;
- relevant `src` code: routes, components, labels, validation, API calls, redirects, permissions, links, and UI states.

Use only behavior confirmed by the project or the user. Ask before writing cases when requirements, labels, routes, design links, expected behavior, API behavior, validation messages, or user states are missing or ambiguous.

For design cases, use a user-provided or previously confirmed design link. If none is available, ask for it.

## Workflow

1. Inspect the closest existing cases and relevant source code.
2. Choose the target folder by interface structure: root page or reusable major system block.
3. Choose the target file by the main semantic element, for example `Шаг Телефон`, `Шаг Проверочный код`, `Хэдер`, or `Футер`.
4. Write atomic cases: one element, scenario, or functionality per case.
5. Reuse precise existing preconditions. If a new precondition is required, update both `types.d.ts` and `preconditions.ts`.
6. Use existing statuses only, unless the user explicitly confirms a new status.
7. Preserve unrelated cases and configuration. Change existing cases only when requested or confirmed by the user.

## Case Rules

- Test cases live under `test-cases-ts` and conform to `TestCase`.
- Each file exports one `TestCase[]` array.
- Keep setup in `preconditions`; keep steps focused on the checked behavior.
- Prefer narrow checks over broad end-to-end flows.
- Do not duplicate reusable setup or shared block checks across page files.
- Put reusable system block checks in the reusable block folder.
- Use project base path `/tester` for routes and links.

## API Request Paths

- Write request paths relative to the API client's configured `baseURL`. Strip the `baseURL` from request checks: use `POST /auth/sign-in`, not `POST /api/tester/auth/sign-in` when the client `baseURL` is `/api/tester`.
- Apply this only to API request and response references. Preserve the project base path `/tester` in browser routes, redirects, and links.
- Confirm the current `baseURL` in the API instance before normalizing existing or new cases; do not infer it from a deployed URL.

## Modals and Popups

- Treat a modal, drawer, or popup used by multiple features as a reusable system block. Put its shared design cases in `test-cases-ts/Системное/<Название блока>.ts`; keep a feature-specific window in that feature's folder.
- Keep feature-specific behavior in the feature workflow file: opening, cancellation, confirmation, requests, redirects, storage changes, and other side effects.
- When a confirmed design covers the window's composition, use one design step with one expected result linking to that design. Do not reproduce the design as a line-by-line list of visible elements unless an element has independent functional or accessibility behavior to verify.
- Create separate desktop and mobile design cases when the window changes presentation or component type between viewports, such as `Dialog` on desktop and `Drawer` on mobile.
- Never invent a missing design link. Ask for it by default; if the user explicitly requests a placeholder, use an obvious placeholder and `statuses.needRework` until the link is supplied.

## System State Screens

- Cover the static composition of reusable system state screens, such as 404, root error, or maintenance, with one design case instead of a line-by-line display case for their illustration, title, description, and controls.
- Keep independently testable behavior in separate functional cases, including navigation, retry, requests, redirects, and other side effects.
- Split system screen design cases by viewport only when desktop and mobile have materially different designs or layouts.

## Writing Style

- Match interface text exactly for pages, blocks, buttons, inputs, errors, links, sections, and steps.
- Use common frontend/QA terminology when the interface has no explicit element name.
- Follow the existing dot-separated hierarchy style for test names.
- Write for testers who understand IT and frontend terminology.
- Phrase states as positive checks: disabled, readonly, hidden, active, selected, focused, loading, invalid.
- State exact expected results for transitions, requests, toasts, validation, selected filters, and UI states.
- If a click check proves link behavior, do not also check the link attribute unless it adds value.
- Design cases belong in the relevant page/block file by default and contain one step with one expected result.
- Prefer one file per user-facing page block or workflow; do not split files by internal React components.
- Keep child elements, validation, loading, empty, error, selected, disabled, and similar states in the file of the block or form they belong to.
- Put child pages/screens inside the parent feature folder when they are reached only through that feature, such as order details inside purchase history.
- Create a separate file for a child element only when it is a major reusable block or has enough independent scenarios to justify its own file.

## Output

When producing cases, provide project-compatible TypeScript:

- import `preconditions` and `statuses` from the correct relative `0 Configuration` path;
- use `statuses.actual` or another confirmed existing status;
- use values from `preconditions`;
- write `steps` as `{ action, expected }`;
- make `expected` an array of concrete expected results.

When proposing changes in chat, include the target folder/file, changed preconditions or statuses if any, and the TypeScript content.

When editing files directly, run `yarn types` and `yarn lint` when feasible.
