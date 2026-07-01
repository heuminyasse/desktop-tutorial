#!/usr/bin/env node
// Validation de la syntaxe du code applicatif Cebat.
//
// Le code de l'app est du JS classique (appels React.createElement via `r(...)`,
// aucune balise JSX) : `node --check` suffit à en valider la syntaxe.
//
// - Si src/cebat.app.js existe (mode source/build), on le valide directement :
//   les numéros de ligne correspondent alors exactement au fichier source.
// - Sinon on extrait le <script type="text/x-dc"> de Cebat_v28.html et on
//   remappe les numéros de ligne sur le HTML.
//
// Usage : node scripts/validate-cebat.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'src/cebat.app.js');
const HTML = path.join(root, 'Cebat_v28.html');

let code, label, mapLine;
if (fs.existsSync(SRC)) {
  code = fs.readFileSync(SRC, 'utf8');
  label = 'src/cebat.app.js';
  mapLine = (n) => `${label}:${n}`;
} else if (fs.existsSync(HTML)) {
  const html = fs.readFileSync(HTML, 'utf8');
  const m = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) { console.error('✗ Aucun <script type="text/x-dc"> trouvé dans Cebat_v28.html'); process.exit(2); }
  code = m[1];
  label = 'Cebat_v28.html';
  const startIdx = m.index + m[0].indexOf('>') + 1;
  const off = html.slice(0, startIdx).split('\n').length - 1;
  mapLine = (n) => `${label}:${n + off}`;
} else {
  console.error('✗ Ni src/cebat.app.js ni Cebat_v28.html trouvés'); process.exit(2);
}

const tmp = path.join(os.tmpdir(), 'cebat-check.js');
fs.writeFileSync(tmp, code);
try {
  execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' });
  console.log(`✓ Cebat OK — ${label} (${code.split('\n').length} lignes, syntaxe valide)`);
} catch (e) {
  const out = (e.stderr || e.stdout || '').toString();
  const rx = new RegExp(tmp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':(\\d+)', 'g');
  console.error(`✗ Erreur de syntaxe dans ${label} :\n`);
  console.error(out.replace(rx, (_, n) => mapLine(Number(n))).trim());
  process.exit(1);
}
