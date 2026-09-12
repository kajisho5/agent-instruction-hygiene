<h1 align="center">agent-instruction-hygiene</h1>

<p align="center"><strong>Stop writing instructions for a model your agent has already outgrown.</strong></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT"></a>
  <a href="https://github.com/kajisho5/agent-instruction-hygiene/commits/main"><img src="https://img.shields.io/github/last-commit/kajisho5/agent-instruction-hygiene" alt="last commit"></a>
  <a href="https://github.com/kajisho5/agent-instruction-hygiene/stargazers"><img src="https://img.shields.io/github/stars/kajisho5/agent-instruction-hygiene" alt="GitHub stars"></a>
</p>

`agent-instruction-hygiene` is a [Claude Code Skill](https://code.claude.com/docs/en/skills) — not a
code tool, but a judgment framework for the instructions *you* write for an
agent: skill descriptions, `CLAUDE.md`/`AGENTS.md`, and task prompts.

---

## Why

Instructions that helped an older, weaker model can actively hurt a
current, high-capability one. A skill description that fires on every
database-adjacent task, a `CLAUDE.md` that demands three docs be read
before every edit, an "always confirm before proceeding" left over from a
more cautious model generation — each of these used to be a safety net.
On a model that already reasons well from context, they burn tokens,
stall the agent short of the scope it was meant to cover, or both.

This skill gives you six concrete patterns for finding and fixing that —
model-agnostic, not tied to any specific vendor or release.

## What's here

| File | What it's for |
|---|---|
| [`SKILL.md`](SKILL.md) | The skill itself: when to use it, six core patterns, and a short workflow for running an audit |
| [`references/checklist.md`](references/checklist.md) | A copyable audit checklist — paste it into a PR description or review note when actually running a pass |

## Install

As a Claude Code plugin (recommended — stays up to date with `claude plugin update`):

```bash
claude plugin install kajisho5/agent-instruction-hygiene
```

Or copy it in by hand:

```bash
git clone https://github.com/kajisho5/agent-instruction-hygiene
cp -r agent-instruction-hygiene/SKILL.md agent-instruction-hygiene/references ~/.claude/skills/agent-instruction-hygiene/
```

## The six patterns, at a glance

1. **Keep a skill's description to "when to use it," and keep it short.** A description exists to narrow the trigger condition, not summarize the workflow.
2. **Progressive disclosure — keep the root file a thin router.** Push heavy procedures into supporting files; don't make every invocation pay to read them.
3. **Don't over-script procedures into rigid recipes.** State the governing principle and leave step-level judgment to the model.
4. **Make `CLAUDE.md`/`AGENTS.md` a signpost, not a mandatory reading list.** Map each doc to the situation it's actually needed for.
5. **Pre-authorize safe, routine work.** Don't gate a task you already know is safe on a fresh confirmation every time.
6. **Define "done" before the task starts.** State explicitly whether the first working pass is the finish line or the starting point.

Full detail, examples, and the audit workflow: [`SKILL.md`](SKILL.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) — scope, what a good addition looks
like, and PR expectations.

## License

[MIT](LICENSE)
