---
name: skill-updater
description: Update existing Codex skills from feedback in the current chat, or suggest a new skill when the feedback does not fit the existing skill's purpose.
metadata:
  short-description: Update skills from chat feedback
---

# Skill Updater

Update the relevant skill so future work accounts for reusable feedback from the current discussion. If the feedback does not belong in the target skill, propose a better place for it: another existing skill, a new reference file, or a new skill.

## Skill Evidence

Before editing, inspect:

- the target skill's `SKILL.md`;
- relevant referenced files, rule files, templates, scripts, or examples used by that skill;
- existing files under the target skill's `rules/` directory when the requested update may affect operational rules, workflows, output requirements, naming, structure, or formatting;
- the current chat feedback that prompted the update.
- repository-level agent guidance such as `AGENTS.md`, only when the requested update may affect skill discovery, invocation, or cross-skill conventions.

Use only corrections, preferences, decisions, and repeated patterns from this discussion or from inspected skill files. Do not add rules from assumptions or unrelated project context.

## Workflow

1. Identify the target skill or skills from the user's request.
2. Read the existing skill structure before proposing changes.
3. Compare the requested feedback with existing guidance and avoid exact or semantic duplicates.
4. Convert chat feedback into durable instructions, not transcript notes.
5. Update the closest existing section or rule file when the change is small.
6. If the target skill already uses rule files, put detailed operational rules in the nearest relevant rule file instead of expanding `SKILL.md`.
7. Add a new section, reference file, rule file, template, or skill only when the existing structure would become unclear or overloaded.
8. Preserve the skill's purpose, frontmatter, invocation boundaries, and unrelated content.

## Update Rules

- Prefer revising existing wording over adding another similar rule.
- Resolve conflicts with existing instructions instead of leaving both versions.
- Keep `description` focused on invocation; keep operational details in the body.
- Do not turn a one-off correction into a universal rule unless it clearly applies to future similar work.
- Do not copy global Codex or repository rules into the skill unless the skill needs a narrower project-specific version.
- Explain why any new file, section, or skill is needed.
- When adding, renaming, or removing a rule file, update every `SKILL.md` reference that tells agents when to read it.
- When updating a rule file, keep its scope narrow and do not leave duplicate or conflicting copies of the same rule in `SKILL.md`.
- Consider `AGENTS.md` only for repository-wide agent guidance; do not duplicate skill-specific instructions there.

## Structure Rules

- Keep `SKILL.md` short enough to scan.
- Move conditional, lengthy, example-heavy, mode-specific, or operational rule guidance into referenced files or rule files.
- Link each supporting file from `SKILL.md` and state when to read it.
- Keep related rules in one place; do not repeat them across `SKILL.md` and references.
- For skills with a `rules/` directory, keep `SKILL.md` as the invocation and routing layer, and keep detailed rules in the matching `rules/*.md` file.
- Preserve existing naming, language, formatting, and organization unless changing them improves future use.
