---
title: Case Content
---

## Case Content

Write atomic test cases with focused setup, user-oriented actions, and concrete observable expected results.

## Workflow

- Write atomic cases: one element, scenario, or functionality per case.
- Keep reusable setup in `preconditions`; put one-off setup in the case action according to `preconditions.md`. Keep steps focused on the checked behavior.
- Keep `expected` limited to the direct result of the current action. Do not add unchanged surrounding state, cleanup state, or adjacent behavior unless it is the core checked outcome.
- Avoid vague system outcomes such as "user is logged out" unless the exact observable effect is confirmed. Prefer concrete effects such as a request, redirect, storage/cookie change, cache reset, toast, or visible UI state.
- Prefer narrow checks over broad end-to-end flows.
- Treat cases that check static layout, labels, icons, skeletons, empty-state copy, or other content without comparing it to request/API data as design cases.
- Write for testers who understand IT and frontend terminology.
- Match interface text exactly for pages, blocks, buttons, inputs, errors, links, sections, and steps.
- Phrase states as positive checks: disabled, readonly, hidden, active, selected, focused, loading, invalid.
- Avoid negative `expected` phrasing such as "not sent", "not displayed", "hidden", or "unchanged" unless that absence is the primary state being tested. When absence is the requirement, state it directly, for example `Блок вкладок отсутствует на странице`. Do not replace this with a claim about the `hidden` attribute unless that mechanism is confirmed.
- State exact expected results for transitions, requests, toasts, validation, selected filters, and UI states.
- If a form scenario must send a request, make the action establish the required form changes and valid data so submission is possible. Use invalid values intentionally in validation scenarios.
- Do not add quantities such as "one request" unless request count or idempotency is the behavior under test.
- If a click check proves link behavior, do not also check the link attribute unless it adds value.
- Design cases contain one step with one expected result.
- In design case `expected`, avoid repeating the page, block, or modal name when it is already clear from `name` or `action`; prefer concise wording such as "Соответствует дизайну <link>".
- Phrase actions as user or tester actions whenever possible: prefer "Открыть страницу за пользователя с пустым списком покупок" or "Открыть подробности покупки с заполненным gameKey" over "Подготовить ответ GET ...".
- If navigation is proven by the opened page, do not also check the request caused by that navigation unless the request itself is the feature under test.
- Prefer one `Данные` case for a stable set of fields in one card, form, list item, or details page.
- Split `Данные` cases only when content is conditionally rendered and states are mutually exclusive.
- Check list item count, order, and card data together in one `Данные` case. Check independent list behavior, such as pagination, in a separate case named for that behavior, for example `Список покупок. Пагинация`.
- Keep empty-list content and empty-list actions separate when the action has navigation behavior.
- Do not create separate field-level cases for every displayed value unless the field has independent behavior, validation, formatting, visibility rules, or enough risk to justify a standalone case.
- Do not duplicate design coverage in functional or data cases. In data cases, check values derived from request/API data, such as image src, alt, title, edition, localized API enum values, email, key, price, item count, and item order; omit static labels, headings, fixed text, icons, skeletons, and empty-state copy.
- Keep loading and empty-state visual checks as design cases when they verify skeletons, icons, text, spacing, or composition. Keep separate functional cases only when the state has behavior, such as an empty-state button navigation.

## Output

- Write `steps` as `{ action, expected }`.
- Make `expected` an array of concrete expected results.
- Keep design, functional, and data checks separate when they verify different behavior.
