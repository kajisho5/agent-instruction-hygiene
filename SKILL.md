---
name: agent-instruction-hygiene
description: Use when writing or revising a skill (SKILL.md), a CLAUDE.md/AGENTS.md file, or a task prompt. Gives criteria for stripping out verbose instructions, excessive confirmation requirements, and overly recipe-like steps that were tuned for older, less capable models.
---

# Agent Instruction Hygiene

Model-agnostic principles, not tied to any specific model. They apply to
instruction design for any high-capability agent, Claude included.

## Overview

The smarter a model gets, the more the cost of over-constraining instructions
outweighs their benefit. Hand-holding instructions, excessive confirmation
requirements, and "always read everything first" rules that used to help now
tend to backfire on current high-capability models: they waste context, make
the model overly cautious to the point of stalling, and cause it to stop
short of the scope it was actually meant to cover.

Three kinds of instructions are worth auditing:
1. A skill's (SKILL.md) description and body
2. Always-loaded instructions such as CLAUDE.md / AGENTS.md
3. Individual task prompts (completion criteria and scope of discretion)

## When to Use

- Writing a new skill, or revisiting an existing skill's description
- Auditing "files that get loaded every time," such as CLAUDE.md or AGENTS.md
- Noticing that constraints which used to work with older models are now
  slowing work down
- After handing off a task, the model stops earlier than intended to ask for
  confirmation — or, conversely, barrels ahead without confirming when it
  should have

## Core Pattern

### 1. Keep a skill's description to "when to use it," and keep it short

```
❌ Bad:  Creates and validates Postgres schema migrations. Use for any work
         touching the database, queries, models, or persistence.
✅ Good: Creates and validates Postgres schema migrations. Use when adding
         or changing a migration, or reviewing its rollout.
```
The bad example fires on virtually any database-adjacent task. A description
exists to narrow the trigger condition, not summarize the workflow. The more
skills a system has, the more aggressively descriptions get truncated for
selection, so write them short from the start.

### 2. Progressive disclosure — keep the root file a thin router

A skill with multiple workflows shouldn't cram everything into the root
SKILL.md. Keep the root as an index that says which supporting file to open
for which situation, and push heavy procedures or API references into those
supporting files. Reading a skill at all consumes context and pushes the
conversation closer to compaction, and a bloated root file drags in
instructions that are irrelevant to the current task.

### 3. Don't over-script procedures into rigid recipes

Older models needed every step spelled out ("1, 2, 3...") or they'd wander
off course; current models handle ambiguity and contextual judgment much
better. Overly granular steps become actively counterproductive the moment
the situation deviates slightly from what was scripted. Stating the
governing principle and leaving step-level judgment to the model often gets
better results.

This matters even more for a skill shared across multiple models or
contributors: instructions heavily tuned for the model you personally use
can be an over-constraint for another.

### 4. Make CLAUDE.md/AGENTS.md a signpost, not a mandatory reading list

```
❌ Bad:  Always read architecture.md, database.md, and deployment.md before
         making any edit.
✅ Good: See architecture.md for service-boundary changes, database.md for
         schema changes, and deployment.md when preparing a deploy.
```
"Read everything, every time" burns context even on a trivial typo fix.
Map each document to the situation where it's actually needed, and keep the
documents themselves current.

The same applies to instructions like "always run the tests" — repeating
directives for things a current model already does on its own initiative
just adds redundant verification. Judge necessity from observed behavior,
not habit.

### 5. Pre-authorize safe, routine work

Current high-capability models have gotten better at judging "when to ask
before acting," but they can still be too cautious and request confirmation
for routine work that's clearly safe. For repeated tasks you already know
are safe, state the authorization up front in CLAUDE.md/AGENTS.md or the
task prompt so the model doesn't need to check in every time.

```
Example: "Local tests only touch disposable fixtures and have no access to
production. Run them, fix any failures caused by this change, and re-run
the affected tests. No per-step approval needed."
```

Conversely, strongly worded "always confirm before proceeding" language
written for older models can now act as an over-constraint even on safe,
routine work. When you upgrade to a newer model generation, revisit this
kind of restrictive language too.

### 6. Define "done" before the task starts

Current models sometimes stop to ask for review right after the first
working implementation — the opposite failure mode from older models, which
tended to keep grinding indefinitely. State up front whether "done" means
"implement it, run it, verify it works, and fix what's broken" or "stop and
check back once the first pass is in place." Without that, the model tends
to stop short. The same goes for how far to explore — spell out the scope
and the stopping condition.

## Quick Reference

| What to audit | Check |
|---|---|
| Skill description | Does it state only the trigger condition, with no workflow summary mixed in? Is it under ~500 characters? |
| Skill body structure | Is every workflow crammed into one file, or could heavy content move to supporting files? |
| How steps are written | Is it over-scripted into rigid steps that remove room for situational judgment? |
| CLAUDE.md/AGENTS.md | Any leftover "read everything, every time" instructions? Are the referenced docs still current? |
| Confirmation requirements | Does old, strongly worded "always confirm" language now constrain even safe, routine work? |
| Task prompts | Is the completion criterion (what counts as "done") stated explicitly? |

## Common Mistakes

- The more skills accumulate, the more aggressively descriptions get
  truncated for selection — writing them long from the start means the
  actual trigger condition gets cut off.
- Putting a workflow summary in the description tempts the model to decide
  based on the description alone, without reading the body.
- "Always confirm before proceeding," carried over across model
  generations, ends up over-constraining a newer model into stalling too
  often.
- Handing off a task as just "build this" with no completion criterion
  leads the model to stop after the first implementation and wait for
  review.
