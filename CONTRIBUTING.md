# Contributing to agent-instruction-hygiene

Thanks for considering a contribution. This skill has one job: give clear,
model-agnostic criteria for trimming instructions (skill descriptions,
`CLAUDE.md`/`AGENTS.md`, task prompts) that were tuned for older, less
capable models and now over-constrain a high-capability one.

## Scope

This project intentionally stays:

- **Model-agnostic.** No principle here should be written for, or tuned
  against, one specific model or vendor. If a change only makes sense for a
  particular model family, it doesn't belong in `SKILL.md`.
- **A judgment framework, not a rulebook.** The point is to sharpen
  judgment about what's over-constraining, not to hand out more rigid rules
  to follow. A proposed addition that reads as "always do X" for every
  situation is usually the wrong shape for this project.
- **Small.** This is a short, focused skill on purpose. A change that
  roughly doubles `SKILL.md`'s length, or splits it into several new
  supporting files, should be discussed in an issue first.

## Before you open a PR

- Read [`SKILL.md`](SKILL.md) in full — it's short.
- If you're adding or changing a principle, make sure it doesn't
  contradict an existing one, and update
  [`references/checklist.md`](references/checklist.md) if the audit
  checklist needs a matching change.
- If you're fixing wording, keep the "principle first, example second"
  structure the existing sections use.

## Pull requests

- Keep PRs focused — one principle or one wording fix per PR.
- Explain *why* the current wording is a problem, not just what you'd
  change it to — this is a document about judgment calls, so the reasoning
  matters more than usual.

## Reporting issues

If something in `SKILL.md` reads as advice that's actually wrong or
outdated for current models, open an issue with the specific line and why
it no longer holds. General "make skills better" suggestions without a
concrete line to point at are hard to act on.
