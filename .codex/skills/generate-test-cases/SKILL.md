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
2. Before proposing or writing new cases, compare the target coverage with existing `name`s, file ownership, and confirmed planned cases. Remove exact and semantic duplicates unless the user explicitly asks to keep overlap.
3. Choose the target folder by interface structure: root page or reusable major system block.
4. Choose the target file by the main semantic element, for example `Шаг Телефон`, `Шаг Проверочный код`, `Хэдер`, or `Футер`.
5. Write atomic cases: one element, scenario, or functionality per case.
6. Reuse precise existing preconditions. If a new precondition is required, update both `types.d.ts` and `preconditions.ts`.
7. Use existing statuses only, unless the user explicitly confirms a new status.
8. Preserve unrelated cases and configuration. Change existing cases only when requested or confirmed by the user.

## Case Rules

- Test cases live under `test-cases-ts` and conform to `TestCase`.
- Each file exports one `TestCase[]` array.
- Keep setup in `preconditions`; keep steps focused on the checked behavior.
- Add reusable preconditions only when several cases share the same preliminary setup, such as an opened page, authenticated state, viewport, or repeated navigation path.
- Do not add preconditions for one-off data states or mocks, such as empty list, missing order, with key, or without key. Put those setup details in the case action.
- Prefer narrow checks over broad end-to-end flows.
- Do not duplicate coverage already owned by another folder/file. Navigation checks belong to layout/navigation files; page files cover behavior inside the target page.
- Do not duplicate reusable setup or shared block checks across page files.
- Put reusable system block checks in the reusable block folder.
- Use project base path `/tester` for routes and links.
- If the user asks to revise a proposed list, do not edit existing files unless implementation is explicitly requested.
- Treat cases that check static layout, labels, icons, skeletons, empty-state copy, or other content without comparing it to request/API data as design cases.

## Writing Style

- Match interface text exactly for pages, blocks, buttons, inputs, errors, links, sections, and steps.
- Use common frontend/QA terminology when the interface has no explicit element name, such as icon-only buttons or unnamed containers.
- Follow the existing dot-separated hierarchy style for test names.
- Avoid redundant hierarchy segments in `name`. If the file or parent segment already identifies the only target element, do not repeat it.
- Write for testers who understand IT and frontend terminology.
- Phrase states as positive checks: disabled, readonly, hidden, active, selected, focused, loading, invalid.
- Use state names that match the checked UI state, for example `Пустой список` when the page state is specifically an empty list.
- State exact expected results for transitions, requests, toasts, validation, selected filters, and UI states.
- If a click check proves link behavior, do not also check the link attribute unless it adds value.
- Design cases belong in the relevant page/block file by default and contain one step with one expected result.
- Phrase actions as user or tester actions whenever possible: prefer "Открыть страницу за пользователя с пустым списком покупок" or "Открыть подробности покупки с заполненным gameKey" over "Подготовить ответ GET ...".
- If navigation is proven by the opened page, do not also check the request caused by that navigation unless the request itself is the feature under test.

## Coverage Shape

- Prefer one file per user-facing page block or workflow; do not split files by internal React components.
- Keep child elements, validation, loading, empty, error, selected, disabled, and similar states in the file of the block or form they belong to.
- Put child pages/screens inside the parent feature folder when they are reached only through that feature, such as order details inside purchase history.
- Create a separate file for a child element only when it is a major reusable block or has enough independent scenarios to justify its own file.
- Prefer one `Данные` case for a stable set of fields in one card, form, list item, or details page.
- Split `Данные` cases only when content is conditionally rendered and states are mutually exclusive.
- Keep list structure checks separate from item data checks.
- Keep empty-list content and empty-list actions separate when the action has navigation behavior.
- Do not create separate field-level cases for every displayed value unless the field has independent behavior, validation, formatting, visibility rules, or enough risk to justify a standalone case.
- Do not duplicate design coverage in functional or data cases. In data cases, check values derived from request/API data, such as image src, alt, title, edition, localized API enum values, email, key, price, item count, and item order; omit static labels, headings, fixed text, icons, skeletons, and empty-state copy.
- Keep loading and empty-state visual checks as design cases when they verify skeletons, icons, text, spacing, or composition. Keep separate functional cases only when the state has behavior, such as an empty-state button navigation.

## Output

When producing cases, provide project-compatible TypeScript:

- import `preconditions` and `statuses` from the correct relative `0 Configuration` path;
- use `statuses.actual` or another confirmed existing status;
- use values from `preconditions`;
- write `steps` as `{ action, expected }`;
- make `expected` an array of concrete expected results.

When proposing changes in chat, include the target folder/file, changed preconditions or statuses if any, and the TypeScript content.

When editing files directly, run `yarn types` and `yarn lint` when feasible.
