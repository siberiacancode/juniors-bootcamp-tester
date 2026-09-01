---
title: Case Naming
---

## Case Naming

Name test cases with the existing dot-separated hierarchy and the most precise confirmed user-facing terms.

## Workflow

- Match interface text exactly for pages, blocks, buttons, inputs, errors, links, and sections.
- Use common frontend/QA terminology when the interface has no explicit element name, such as icon-only buttons or unnamed containers.
- Follow the existing dot-separated hierarchy style for test names.
- Avoid redundant hierarchy segments in `name`. If the file or parent segment already identifies the only target element, do not repeat it.
- For action cases that check a button, link, or control, use the exact UI label or a precise control name in the final meaningful `name` segment, such as `Выйти`, `Отмена`, or `Кнопка закрытия`.
- Use state names that match the checked UI state, for example `Пустой список` when the page state is specifically an empty list.

## Output

- Set `name` to the concise dot-separated hierarchy that identifies the owned page/block, target element or scenario, and checked state or outcome.
