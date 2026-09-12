# Instruction Hygiene Checklist

Copy this into a review note (PR description, issue, or scratch file) when
auditing a repo's instruction files against the current model generation.
Only check items that actually apply to the files in scope — this is not a
mandatory pass over every row every time.

## 1. Skill descriptions (SKILL.md frontmatter)

- [ ] States only the trigger condition, with no workflow summary mixed in
- [ ] Roughly under 500 characters
- [ ] Doesn't fire on every task in a broad domain (e.g. "any database work")

## 2. Skill body structure

- [ ] A skill with multiple workflows keeps the root file a thin router
- [ ] Heavy procedures or API references live in supporting files, not the root
- [ ] Steps aren't over-scripted into rigid numbered recipes where judgment
      would do as well

## 3. CLAUDE.md / AGENTS.md

- [ ] No blanket "read every doc before every edit" instruction
- [ ] Each referenced doc is mapped to the situation it's actually needed for
- [ ] Referenced docs are still current
- [ ] No redundant "always run the tests" / "always verify" for things the
      model already does on its own initiative

## 4. Confirmation requirements

- [ ] Safe, routine, repeated tasks are pre-authorized rather than gated on
      a fresh confirmation every time
- [ ] Strongly worded "always confirm before proceeding" language isn't a
      leftover from an older, less capable model generation
- [ ] Irreversible or high-blast-radius actions still require confirmation
      (this checklist is about removing unnecessary gates, not all gates)

## 5. Task prompts

- [ ] The completion criterion is explicit — first working pass, or
      verified-and-fixed
- [ ] The exploration scope and stopping condition are explicit

## Audit trail

After a pass, leave a one-line note near the top of the file you revised, e.g.:

```
<!-- instruction-hygiene: reviewed 2026-09 against current model generation -->
```

so the next audit knows the baseline it's revising against instead of
re-deriving everything from scratch.
