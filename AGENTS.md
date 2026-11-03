# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

**For setup, commands, and general information, see [README.md](./README.md).**

## Rules

### Language

English is the official language of this repository. Everything in it must be written in English, with only two exceptions:

- **`docs/` folder** — documents may be in English or Spanish. Follow the language of the existing document; for new documents, ask which language to use.
- **Prompt conversations** — reply in the language the user writes in.

### Docs

- Documents in `docs/` are useful context but not an absolute source of truth — they can become outdated over time. When in doubt, verify against the current code rather than trusting a doc at face value.

### Git

- **Never run git commands on your own** — no `git add`, `git commit`, or `git push`. Run them only when the developer explicitly asks.
- When asked to commit, apply the `conventional-commits` skill.

### TypeScript

- After modifying any `.ts` or `.tsx` file, verify types with `pnpm exec tsc --noEmit`. Fix the errors before continuing — never accumulate unverified changes.

### Biome

- When you need to lint or format code, run Biome **only against the specific files you just created or modified** — e.g. `pnpm exec biome check --write path/to/file-a.ts path/to/file-b.tsx`. Always pass explicit file paths.
- **Never run Biome unscoped locally** (`biome check .`, `biome format --write .`, or any invocation without an explicit file list) on the whole repo or an entire app/package. An unscoped run can reformat or rewrite dozens or hundreds of unrelated files, which adds noise to the diff, pollutes the working tree, and clutters the context with irrelevant changes.
- **In CI, run Biome only on the files that changed in the current PR or push.** Use a changed-files action (e.g., `tj-actions/changed-files`) to generate the list, then invoke `pnpm exec biome ci <files>`. This keeps the CI scoped and avoids failing on unrelated pre-existing lint debt.

## Skills

| Skill | When to apply |
| --- | --- |
| [`conventional-commits`](./.agents/skills/conventional-commits/SKILL.md) | Creating a commit message that complies with Conventional Commits and the project's commit tooling |
