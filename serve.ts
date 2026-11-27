/* serve.ts — a tiny static server for local testing only (Node 22,
   standard library only). Serves app/ at http://localhost:8080
   (--port for another port). Not part of the graded entry. */

import { createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const APP_DIR = resolve(join(fileURLToPath(new URL('.', import.meta.url)), 'app'));
const PORT = Number(process.argv.find((a) => a.startsWith('--port='))?.split('=')[1] ?? 8080);

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
    const filePath = resolve(join(APP_DIR, normalize(urlPath).replace(/^(\.\.[/\\])+/, '')));
    if (!filePath.startsWith(APP_DIR)) {
      res.writeHead(403); res.end('Forbidden'); return;
    }
    const target = filePath.endsWith('/') || filePath === APP_DIR ? join(filePath, 'index.html') : filePath;
    const info = await stat(target);
    if (!info.isFile()) throw new Error('not a file');
    res.writeHead(200, { 'content-type': MIME[extname(target)] ?? 'application/octet-stream' });
    createReadStream(target).pipe(res);
  } catch {
    res.writeHead(404); res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Hearth & Ledger serving app/ at http://localhost:${PORT}/`);
});
