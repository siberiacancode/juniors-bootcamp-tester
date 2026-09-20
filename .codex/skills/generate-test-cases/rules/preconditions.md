---
title: Precondition Scope
---

## Precondition Scope

Use the narrowest reusable scope for test case preconditions.

## Workflow

- Assume each test case starts independently with a clean context. Do not repeat this default in preconditions or actions with phrases such as "start a new session" or "has not been opened in this session". Explicitly describe prior actions or state only when the scenario requires them.
- Add reusable preconditions only when several cases share the same preliminary setup, such as an opened page, authenticated state, viewport, or repeated navigation path.
- Require only the setup needed for the checked behavior. Do not require a particular item count, pagination, or other data state for page layout or a static block unless that check depends on it.
- Do not create reusable precondition constants for truly one-off setup used by a single case. Put those setup details in the case action.
- Preserve setup order in preconditions and actions: establish the required user and data states before opening dependent pages, tabs, or popups. When moving setup, remove obsolete keys from precondition constants and types.
- Keep `test-cases-ts/0 Configuration/preconditions.ts` only for preconditions reused across several case folders.
- Keep the global `Precondition` type in `test-cases-ts/0 Configuration/types.d.ts` aligned only with global preconditions.
- If a precondition is reused only inside one case file, define a local constant in that file typed as `Record<string, string[]>`.
- If a precondition is reused across several files of one folder, define it in that folder's `preconditions.ts`.
- Keep shared page opening separate from case-specific data conditions. Reuse the folder's `pageOpened` across its case files; keep conditions such as a nonempty catalog or a catalog with pagination local when only one file uses them, without repeating page opening in those conditions.
- Type folder-level preconditions in the same folder `preconditions.ts`; do not add their keys to global `types.d.ts`.
- Import folder-level preconditions from the nearest folder file, and global preconditions from `0 Configuration`.
- Do not put reusable string-array preconditions inline inside test cases.

## Output

- Use values from the appropriate preconditions constant.
- When adding a global precondition, update both global `preconditions.ts` and global `types.d.ts`.
- When adding a folder-level precondition, update only that folder's `preconditions.ts`.
