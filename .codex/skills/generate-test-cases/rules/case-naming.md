---
title: Case Naming
---

## Case Naming

Name test cases with the existing dot-separated hierarchy and the most precise confirmed user-facing terms.

## Workflow

- Match interface text exactly for pages, blocks, buttons, inputs, errors, links, and sections.
- Use common frontend/QA terminology when the interface has no explicit element name, such as icon-only buttons or unnamed containers.
- Follow the existing dot-separated hierarchy style for test names.
- Name loading design cases with the state before the check type: `Лоадер. Дизайн. Десктоп` or `Лоадер. Дизайн. Мобилка`.
- Always use `Мобилка` for the mobile viewport segment.
- Avoid redundant hierarchy segments in `name`. If the file or parent segment already identifies the only target element, do not repeat it.
- For action cases that check a labeled button, link, or control, use the exact UI label in the final meaningful `name` segment, such as `Выйти`, `Отмена`, or `Вернуться в каталог игр`, without redundant prefixes such as `Кнопка "..."` or `Ссылка "..."`. For unlabeled controls, use a precise control name such as `Кнопка закрытия`.
- Always name an empty-list state `Пустой список`, regardless of the empty-state text in the interface. Keep actual UI labels exact in actions and expected results.
- Name checks comparing displayed values with request/API data `Данные`; do not add the redundant qualifier `Исходные`.

## Output

- Set `name` to the concise dot-separated hierarchy that identifies the owned page/block, target element or scenario, and checked state or outcome.
