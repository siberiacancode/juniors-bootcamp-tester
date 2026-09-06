---
name: generate-test-cases
description: Generate, revise, review, or reorganize TypeScript test cases under test-cases-ts using this project's UI, source code, and test-case conventions.
---

# Generate Test Cases

## Project Evidence

Before asking the user, inspect the nearest confirmed project sources and the rule files required for the task.

Project sources:

- existing cases in `test-cases-ts`;
- `test-cases-ts/0 Configuration/types.d.ts`;
- `test-cases-ts/0 Configuration/statuses.ts`;
- `test-cases-ts/0 Configuration/preconditions.ts`;
- relevant `src` code: routes, components, labels, validation, API calls, redirects, permissions, links, UI states, and viewport-specific controls.

Rule files, relative to this skill:

- read `rules/case-file-structure.md` when choosing folders/files, reorganizing cases, or deduplicating coverage;
- read `rules/case-naming.md` when creating or revising test case `name`s;
- read `rules/case-content.md` when writing or revising `steps`, `action`, `expected`, design checks, data checks, functional checks, or atomicity;
- read `rules/preconditions.md` before writing, moving, importing, or reorganizing preconditions.

Use only behavior confirmed by the project or the user. Ask before writing cases when requirements, labels, routes, design links, expected behavior, API behavior, validation messages, or user states are missing or ambiguous.

For design cases, use a user-provided or previously confirmed design link. If none is available, ask for it.

## Workflow

1. Inspect the closest existing cases and relevant source code.
2. Before proposing or writing new cases, compare the target coverage with existing `name`s, file ownership, and confirmed planned cases. Remove exact and semantic duplicates unless the user explicitly asks to keep overlap.
3. Follow `rules/case-file-structure.md` when choosing the target folder and file.
4. Follow `rules/case-content.md` when choosing case scope and writing atomic cases.
5. Reuse precise existing preconditions and follow `rules/preconditions.md` when adding or moving them.
6. Follow `rules/case-naming.md` when creating or revising test case `name`s.
7. Use existing statuses only, unless the user explicitly confirms a new status.
8. Preserve unrelated cases and configuration. Change existing cases only when requested or confirmed by the user.

## Case Rules

- Test cases live under `test-cases-ts` and conform to `TestCase`.
- Each file exports one `TestCase[]` array.
- Write internal page URLs without the domain or application base path, for example `/`, `/profile`, or `/history/{orderId}`. Keep external URLs complete. These shortened paths are test-case notation, not requirements for literal DOM `href` values.
- If the user asks to revise a proposed list, do not edit existing files unless implementation is explicitly requested.

## Output

When producing cases, provide project-compatible TypeScript:

- import `statuses` from the correct relative `0 Configuration` path;
- import or define preconditions according to `rules/preconditions.md`;
- use `statuses.actual` or another confirmed existing status;
- use values from the appropriate preconditions constant;
- write `steps` as `{ action, expected }`;
- make `expected` an array of concrete expected results.

When proposing changes in chat, include the target folder/file, changed preconditions or statuses if any, and the TypeScript content.

When editing files directly, run `yarn types` and `yarn lint` when feasible.
