#!/usr/bin/env node
// Hook PostToolUse : après une édition, si le code source de l'app a changé, on
// valide sa syntaxe puis on régénère le livrable Cebat_v28.html. Si le livrable
// (ou le gabarit) est édité à la main, on valide et on prévient que l'édition
// directe sera écrasée par le prochain build.
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (d) => (input += d));
process.stdin.on('end', () => {
  let j = {};
  try { j = JSON.parse(input || '{}'); } catch {}
  const fp = (j.tool_input && (j.tool_input.file_path || j.tool_input.path)) || '';
  const isApp = /src[\\/]cebat\.app\.js$/.test(fp);
  const isArtifact = /Cebat_v28\.(template\.html|html)$/.test(fp);
  if (!isApp && !isArtifact) process.exit(0);

  const run = (script) => execFileSync(process.execPath, [path.join(root, 'scripts', script)], { stdio: 'pipe' }).toString();

  // 1) Validation de la syntaxe
  try {
    const v = run('validate-cebat.mjs');
    process.stderr.write('[Cebat] ' + v.trim() + '\n');
  } catch (e) {
    process.stderr.write('[Cebat] ' + ((e.stdout || '') + (e.stderr || '')).toString().trim() + '\n');
    process.exit(2); // remonte l'erreur à l'assistant
  }

  // 2) Rebuild depuis la source, ou avertissement si édition directe du livrable
  if (isApp) {
    try {
      const b = run('build.mjs');
      process.stderr.write('[Cebat] ' + b.trim() + '\n');
    } catch (e) {
      process.stderr.write('[Cebat] build échoué : ' + ((e.stdout || '') + (e.stderr || '')).toString().trim() + '\n');
      process.exit(2);
    }
  } else if (isArtifact) {
    process.stderr.write('[Cebat] ⚠ Cebat_v28.html / .template.html sont GÉNÉRÉS. Édite src/cebat.app.js puis « npm run build » — sinon cette modification sera écrasée au prochain build.\n');
  }
  process.exit(0);
});
