#!/usr/bin/env node
// Fetches the latest upstream skills for the given groups into <project>/.claude/skills.
// Usage: node refresh-skills.mjs <group...> [--project <dir>] [--max-age-days N] [--yes] [--force]
// Groups come from ../sources.json (angular, react, vue, gsap, design).
// Safety: only clones the repos listed in sources.json, never runs code from them,
// never follows symlinks, never overwrites skill folders it did not install itself.
// Exit codes: 0 ok, 2 approval needed (re-run with --yes after the user agrees), 1 error.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const sources = JSON.parse(fs.readFileSync(path.join(here, '..', 'sources.json'), 'utf8'));

const groups = [];
let project = process.cwd();
let maxAgeDays = 7;
let yes = false;
let force = false;
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--project') project = path.resolve(argv[++i]);
  else if (a === '--max-age-days') maxAgeDays = Number(argv[++i]);
  else if (a === '--yes') yes = true;
  else if (a === '--force') force = true;
  else if (a.startsWith('--')) fail(`Unknown option ${a}`);
  else groups.push(a);
}
if (groups.length === 0) fail(`Give at least one group: ${Object.keys(sources).filter((k) => !k.startsWith('_')).join(', ')}`);
for (const g of groups) if (!Array.isArray(sources[g])) fail(`Unknown group "${g}"`);

const skillsDir = path.join(project, '.claude', 'skills');
const lockPath = path.join(skillsDir, '.frontend-ai-kit-lock.json');
const lock = fs.existsSync(lockPath) ? JSON.parse(fs.readFileSync(lockPath, 'utf8')) : { skills: {} };

const safeName = /^[a-z0-9][a-z0-9-]*$/;
const pending = [];
let changed = false;

for (const group of groups) {
  for (const src of sources[group]) {
    const names = src.skills.map((s) => s.name);
    const known = names.every((n) => lock.skills[n]?.repo === src.repo);
    const fresh =
      known &&
      names.every((n) => Date.now() - Date.parse(lock.skills[n].fetchedAt) < maxAgeDays * 864e5);
    if (fresh && !force) {
      console.log(`up to date: ${src.repo} (${names.join(', ')})`);
      continue;
    }
    if (!known && !yes) {
      pending.push(src);
      continue;
    }
    fetchSource(src);
  }
}

if (changed) {
  fs.mkdirSync(skillsDir, { recursive: true });
  fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
}
if (pending.length) {
  console.log('\nAPPROVAL NEEDED: these third-party skill sources are not installed in this project yet.');
  console.log('Their SKILL.md files become instructions the agent follows. Ask the user, then re-run with --yes.');
  for (const s of pending) {
    console.log(`  - ${s.repo}  [${s.publisher}]  skills: ${s.skills.map((k) => k.name).join(', ')}`);
  }
  process.exit(2);
}

function fetchSource(src) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fak-'));
  try {
    execFileSync('git', ['-c', 'core.symlinks=false', 'clone', '--depth', '1', '--quiet', src.repo, tmp], {
      stdio: ['ignore', 'inherit', 'inherit'],
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
    });
    const sha = execFileSync('git', ['-C', tmp, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    for (const s of src.skills) {
      if (!safeName.test(s.name)) fail(`Bad skill name ${s.name}`);
      const from = path.resolve(tmp, s.path);
      if (!from.startsWith(tmp + path.sep)) fail(`Path escapes repo: ${s.path}`);
      if (!fs.existsSync(path.join(from, 'SKILL.md'))) {
        console.warn(`skipped ${s.name}: no SKILL.md at ${s.path} (upstream layout changed?)`);
        continue;
      }
      const to = path.join(skillsDir, s.name);
      if (fs.existsSync(to) && !lock.skills[s.name]) {
        console.warn(`skipped ${s.name}: ${to} already exists and was not installed by this kit`);
        continue;
      }
      fs.rmSync(to, { recursive: true, force: true });
      fs.mkdirSync(skillsDir, { recursive: true });
      fs.cpSync(from, to, {
        recursive: true,
        filter: (p) => !fs.lstatSync(p).isSymbolicLink() && path.basename(p) !== '.git',
      });
      lock.skills[s.name] = { repo: src.repo, path: s.path, commit: sha, fetchedAt: new Date().toISOString() };
      changed = true;
      console.log(`installed ${s.name} from ${src.repo}@${sha.slice(0, 10)}`);
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

function fail(msg) {
  console.error(msg);
  process.exit(1);
}
