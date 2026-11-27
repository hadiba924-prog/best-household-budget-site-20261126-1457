// Hearth & Ledger — build program for the make.fun household-budget bounty.
//
// Copies the site (app/), its screenshots (screenshots/) and the dossier
// library (vendor/) into the output directory, then writes dossier.json
// with buildDossier from vendor/makefun-frontend.ts.
//
// The output directory itself is NEVER deleted: on the grader it is a
// mount point, and removing it fails with "Device or resource busy".
// Stale files from an earlier run are cleared by deleting only the
// contents of the three subdirectories we own, never the directories.
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Outside the grader MAKEFUN_OUTPUT_DIR stands in for /output; when it is
// unset the build targets /output. Node 22, standard library only.

import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)));
const OUTPUT_DIR = resolve(
  process.env.MAKEFUN_OUTPUT_DIR ?? '/output',
);

// The three directories this build owns inside the output directory.
const OWNED_DIRS = ['app', 'screenshots', 'vendor'] as const;

// Caps from the bounty gate: the dossier text is capped at 160 KiB, at
// most 4 screenshots of at most 256 KiB each, app/ at most 993 entries
// and 16 MiB, and no app/ path over 1,000 bytes.
const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
  app_path_max_bytes: 1000,
} as const;

function fail(message: string): never {
  throw new Error(`main.ts: ${message}`);
}

// Delete every entry inside a directory, leaving the directory itself
// in place. This is the whole point of the fix: the grader mounts the
// output directory, so removing it (or any of its parents) throws.
function clearContents(dir: string): void {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function copyOwnedDir(name: (typeof OWNED_DIRS)[number]): void {
  const source = join(REPO_ROOT, name);
  if (!existsSync(source)) fail(`missing source directory: ${name}/`);
  const target = join(OUTPUT_DIR, name);
  mkdirSync(target, { recursive: true });
  clearContents(target);
  cpSync(source, target, { recursive: true });
}

function main(): void {
  if (OUTPUT_DIR === REPO_ROOT) {
    fail('refusing to build into the repository root');
  }
  // Building into a source directory would wipe the site itself: the
  // clear step below deletes the contents of app/, screenshots/ and
  // vendor/ inside the output directory, so refuse that outright.
  for (const name of OWNED_DIRS) {
    const source = join(REPO_ROOT, name);
    if (OUTPUT_DIR === source || OUTPUT_DIR.startsWith(source + sep)) {
      fail(`refusing to build into the source directory ${name}/`);
    }
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const name of OWNED_DIRS) copyOwnedDir(name);

  const dossier = buildDossier(OUTPUT_DIR, DOSSIER_CAPS);
  writeFileSync(join(OUTPUT_DIR, 'dossier.json'), dossier);
}

main();
