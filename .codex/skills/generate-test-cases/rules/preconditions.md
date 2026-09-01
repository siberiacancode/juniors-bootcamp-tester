---
title: Precondition Scope
---

## Precondition Scope

Use the narrowest reusable scope for test case preconditions.

## Workflow

- Add reusable preconditions only when several cases share the same preliminary setup, such as an opened page, authenticated state, viewport, or repeated navigation path.
- Do not create reusable precondition constants for truly one-off setup used by a single case. Put those setup details in the case action.
- Keep `test-cases-ts/0 Configuration/preconditions.ts` only for preconditions reused across several case folders.
- Keep the global `Precondition` type in `test-cases-ts/0 Configuration/types.d.ts` aligned only with global preconditions.
- If a precondition is reused only inside one case file, define a local constant in that file typed as `Record<string, string[]>`.
- If a precondition is reused across several files of one folder, define it in that folder's `preconditions.ts`.
- Type folder-level preconditions in the same folder `preconditions.ts`; do not add their keys to global `types.d.ts`.
- Import folder-level preconditions from the nearest folder file, and global preconditions from `0 Configuration`.
- Do not put reusable string-array preconditions inline inside test cases.

## Output

- Use values from the appropriate preconditions constant.
- When adding a global precondition, update both global `preconditions.ts` and global `types.d.ts`.
- When adding a folder-level precondition, update only that folder's `preconditions.ts`.
