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

### TanStack Start documentation

- For TanStack Start tasks, consult the [official Start LLM documentation index](https://tanstack.com/start/latest/llms.txt) first. Follow the relevant React Markdown page for the task rather than loading the entire documentation.
- Check examples against the version of `@tanstack/react-start` installed in this project; the `latest` docs may describe newer APIs.

### Git

- **Never run git commands on your own** — no `git add`, `git commit`, or `git push`. Run them only when the developer explicitly asks.
- When asked to commit, apply the `conventional-commits` skill.

### TypeScript

- After modifying any `.ts` or `.tsx` file, verify types with `pnpm exec tsc --noEmit`. Fix the errors before continuing — never accumulate unverified changes.

### Biome

- When you need to lint or format code, run Biome **only against the specific files you just created or modified** — e.g. `pnpm exec biome check --write path/to/file-a.ts path/to/file-b.tsx`. Always pass explicit file paths.
- Explicit file paths still respect the `files.includes` configuration in `biome.json`. Do not bypass its exclusions for `src/routeTree.gen.ts` or `src/styles.css`.
- **Never run Biome unscoped locally** (`biome check .`, `biome format --write .`, or any invocation without an explicit file list) on the whole repo or an entire app/package. Runs without `--write` only check files, but can produce unrelated diagnostics. Runs with `--write` can reformat or rewrite unrelated files, adding noise to the diff and polluting the working tree. Keep both checks and writes scoped to the files you created or modified.
- **In CI, run Biome only on the files that changed in the current PR or push.** Use a changed-files action (e.g., `tj-actions/changed-files`) to generate the list, then invoke `pnpm exec biome ci <files>`. This keeps the CI scoped and avoids failing on unrelated pre-existing lint debt.

## Skills

| Skill | When to apply |
| --- | --- |
| [`conventional-commits`](./.agents/skills/conventional-commits/SKILL.md) | Creating a commit message that complies with Conventional Commits and the project's commit tooling |
