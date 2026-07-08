#!/usr/bin/env node
// Build Cebat : réinjecte le code applicatif (src/cebat.app.js) dans le gabarit
// (Cebat_v28.template.html, qui contient React + Babel vendored) pour produire
// le livrable autonome mono-fichier Cebat_v28.html.
//
// Usage : node scripts/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE = path.join(root, 'Cebat_v28.template.html');
const SRC = path.join(root, 'src/cebat.app.js');
const OUT = path.join(root, 'Cebat_v28.html');
const MARK = '/*__CEBAT_APP_SRC__*/';

for (const f of [TEMPLATE, SRC]) {
  if (!fs.existsSync(f)) { console.error(`✗ Fichier manquant : ${path.relative(root, f)}`); process.exit(2); }
}
const tpl = fs.readFileSync(TEMPLATE, 'utf8');
const app = fs.readFileSync(SRC, 'utf8');
if (!tpl.includes(MARK)) { console.error(`✗ Marqueur ${MARK} absent du gabarit`); process.exit(2); }
if (app.includes('</script')) { console.error('✗ src/cebat.app.js contient « </script » — impossible à inliner sans casser le HTML'); process.exit(2); }

// Fonction de remplacement pour ne pas interpréter les motifs $ dans le code source.
const out = tpl.replace(MARK, () => app);
fs.writeFileSync(OUT, out);
console.log(`✓ Build OK — Cebat_v28.html généré (${out.length} octets, app ${app.split('\n').length} lignes)`);
