/* main.ts — the entry program (Node 22, standard library only).
 *
 * It copies app/ and screenshots/ from this repository into the output
 * directory (MAKEFUN_OUTPUT_DIR, or /output) and writes dossier.json
 * there with buildDossier from vendor/makefun-frontend.ts.
 *
 * Deterministic: files are copied in sorted order and the dossier is
 * computed from the copied files, so two runs write identical bytes.
 */

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const REPO_ROOT = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

function copyEntryTree(): void {
  // Start from a clean output directory so stale files can never leak in.
  rmSync(OUTPUT_DIR, { recursive: true, force: true });
  mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const name of ['app', 'screenshots']) {
    const source = join(REPO_ROOT, name);
    if (!existsSync(source)) throw new Error(`main.ts: missing ${name}/ in the repository`);
    cpSync(source, join(OUTPUT_DIR, name), { recursive: true });
  }
}

function main(): void {
  copyEntryTree();
  const dossier = buildDossier(OUTPUT_DIR, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
    app_path_max_bytes: 1000,
  });
  writeFileSync(join(OUTPUT_DIR, 'dossier.json'), dossier);
}

main();
