---
title: Case File Structure
---

## Case File Structure

Choose folders and files by user-facing interface structure and coverage ownership.

## Workflow

- Choose the target folder by interface structure: root page or reusable major system block.
- Choose the target file by the main semantic element, for example `Шаг Телефон`, `Шаг Проверочный код`, `Хэдер`, or `Футер`.
- Do not duplicate coverage already owned by another folder/file. Navigation checks belong to layout/navigation files; page files cover behavior inside the target page.
- Do not duplicate reusable setup or shared block checks across page files.
- Put reusable system block checks in the reusable block folder.
- Prefer one file per user-facing page block or workflow; do not split files by internal React components.
- Keep child elements, validation, loading, empty, error, selected, disabled, and similar states in the file of the block or form they belong to.
- For reusable overlays and system blocks, check confirmed close controls as separate atomic cases, such as `Отмена` and `Кнопка закрытия`, accounting for viewport-specific control availability.
- Put child pages/screens inside the parent feature folder when they are reached only through that feature, such as order details inside purchase history.
- Create a separate file for a child element only when it is a major reusable block or has enough independent scenarios to justify its own file.
- Design cases belong in the relevant page/block file by default.

## Output

- Place each case in the folder/file that owns its checked behavior.
- Keep navigation, reusable setup, reusable block, page, child screen, and page-block coverage in their owning files.
