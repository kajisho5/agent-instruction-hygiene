# Changelog

## 1.1.0

- `bin/install.js` + `package.json`: install into Claude Code, Cursor, or
  Codex's skills directory (`--claude`/`--cursor`/`--codex`/`--all`), the
  current project (`--project`), or a custom directory (`--dir`), plus
  `--uninstall`. Not published to npm — run via `npx github:kajisho5/agent-instruction-hygiene`.

## 1.0.0

- `SKILL.md`: six core patterns for auditing skill descriptions,
  `CLAUDE.md`/`AGENTS.md`, and task prompts for over-constraining
  instructions tuned for older models.
- `references/checklist.md`: copyable audit checklist with an audit-trail
  convention.
- Packaged as a Claude Code plugin (`.claude-plugin/plugin.json`).
- `LICENSE` (MIT), `CONTRIBUTING.md`, and a polished `README.md`.
