# agent-instruction-hygiene

A Claude Code skill for auditing and rewriting agent instructions —
skill descriptions, `CLAUDE.md`/`AGENTS.md`, and task prompts — that were
tuned for older, less capable models and now over-constrain a
high-capability one.

## What's here

- [`SKILL.md`](./SKILL.md) — the skill itself: when to use it, six core
  patterns for trimming over-constraining instructions, and a short
  workflow for running an audit.
- [`references/checklist.md`](./references/checklist.md) — a copyable
  checklist to paste into a PR description, issue, or review note when
  actually running an audit pass.

## Using this skill

Drop this repo (or just `SKILL.md` and `references/`) into a project's
`.claude/skills/agent-instruction-hygiene/` directory so Claude Code can
discover and load it. See the
[Claude Code skills documentation](https://code.claude.com/docs/en/skills)
for how skills are packaged and loaded.
