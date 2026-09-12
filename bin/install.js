#!/usr/bin/env node
'use strict';

/**
 * agent-instruction-hygiene installer.
 *
 * Copies SKILL.md and references/ into the skills directory of one or more
 * coding agents. Default target is Claude Code (~/.claude/skills/agent-instruction-hygiene).
 *
 *   npx agent-instruction-hygiene                 # Claude Code
 *   npx agent-instruction-hygiene --cursor        # Cursor  (~/.cursor/skills/agent-instruction-hygiene)
 *   npx agent-instruction-hygiene --codex         # Codex   (~/.agents/skills/agent-instruction-hygiene)
 *   npx agent-instruction-hygiene --all           # all of the above
 *   npx agent-instruction-hygiene --project       # ./.claude/skills/agent-instruction-hygiene in the current project
 *   npx agent-instruction-hygiene --dir ./skills  # custom parent directory
 *   npx agent-instruction-hygiene --uninstall     # remove from the selected targets
 *
 * Not published to npm — run it straight from GitHub:
 *   npx github:kajisho5/agent-instruction-hygiene [flags]
 *
 * Already installed? Re-run to refresh. Copies are not updated automatically.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const SKILL_NAME = 'agent-instruction-hygiene';
const ROOT = path.resolve(__dirname, '..');
const PAYLOAD = ['SKILL.md', 'references'];

const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);
const optValue = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : null;
};

if (has('--help') || has('-h')) {
  console.log(
    fs
      .readFileSync(__filename, 'utf8')
      .split('*/')[0]
      .replace(/^\/\*\*?\s?|^\s\*\s?/gm, '')
  );
  process.exit(0);
}

const home = os.homedir();
const want = { claude: has('--claude'), cursor: has('--cursor'), codex: has('--codex') };
if (has('--all')) want.claude = want.cursor = want.codex = true;
const customDir = optValue('--dir');
const project = has('--project');

if (!want.claude && !want.cursor && !want.codex && !customDir && !project) want.claude = true;

const targets = [];
if (want.claude) targets.push({ label: 'Claude Code', dir: path.join(home, '.claude', 'skills', SKILL_NAME) });
if (want.cursor) targets.push({ label: 'Cursor', dir: path.join(home, '.cursor', 'skills', SKILL_NAME) });
// Codex reads user-level skills from ~/.agents/skills (its docs list $HOME/.agents/skills,
// .agents/skills up the repo tree, and /etc/codex/skills) -- Cursor reads this location too.
if (want.codex) targets.push({ label: 'Codex', dir: path.join(home, '.agents', 'skills', SKILL_NAME) });
if (project) targets.push({ label: 'project (.claude/skills)', dir: path.join(process.cwd(), '.claude', 'skills', SKILL_NAME) });
if (customDir) targets.push({ label: 'custom', dir: path.join(path.resolve(customDir), SKILL_NAME) });

function copyRecursive(src, dst) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dst, entry));
    }
  } else {
    fs.copyFileSync(src, dst);
  }
}

let failed = false;
for (const t of targets) {
  try {
    if (has('--uninstall')) {
      fs.rmSync(t.dir, { recursive: true, force: true });
      console.log(`removed ${t.label}: ${t.dir}`);
      continue;
    }
    fs.mkdirSync(t.dir, { recursive: true });
    for (const item of PAYLOAD) {
      const src = path.join(ROOT, item);
      copyRecursive(src, path.join(t.dir, item));
    }
    console.log(`installed ${t.label}: ${t.dir}`);
  } catch (err) {
    failed = true;
    console.error(`failed for ${t.label} (${t.dir}): ${err.message}`);
  }
}

if (!has('--uninstall')) {
  console.log('\nDone. Ask your agent to review a SKILL.md, CLAUDE.md/AGENTS.md, or task prompt for over-constraining instructions.');
}
process.exit(failed ? 1 : 0);
