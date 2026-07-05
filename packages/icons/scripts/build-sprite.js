#!/usr/bin/env node
// Builds sprite.svg and icon-names.ts from packages/icons/src/svg/*.svg

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'src', 'svg');
const outSprite = join(__dirname, '..', 'sprite.svg');
const outNames = join(__dirname, '..', 'icon-names.ts');

const files = readdirSync(iconsDir)
  .filter(f => f.endsWith('.svg'))
  .sort();

const names = files.map(f => basename(f, '.svg'));

// Build sprite
const symbols = files.map(file => {
  const name = basename(file, '.svg');
  const content = readFileSync(join(iconsDir, file), 'utf8');
  // Strip opening <svg...> tag and closing </svg> tag; keep inner content
  const inner = content
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim();
  // Indent inner content by 4 spaces
  const indented = inner
    .split('\n')
    .map(line => '    ' + line)
    .join('\n');
  return `  <symbol id="so-${name}" viewBox="0 0 32 32">\n${indented}\n  </symbol>`;
});

const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${symbols.join('\n')}\n</svg>\n`;
writeFileSync(outSprite, sprite, 'utf8');
console.log(`sprite.svg: ${symbols.length} symbols`);

// Build icon-names.ts
const typeLines = names.map(n => `  | '${n}'`);
const arrayLines = names.map(n => `  '${n}'`);

const namesTs = `// Auto-generated — do not edit manually

export type SoIconName =\n${typeLines.join('\n')};\n\nexport const SO_ICON_NAMES: SoIconName[] = [\n${arrayLines.join(',\n')}\n];\n`;
writeFileSync(outNames, namesTs, 'utf8');
console.log(`icon-names.ts: ${names.length} entries`);

// Build icon-names.js (pre-compiled, committed alongside .ts)
const namesJs = `// Auto-generated — do not edit manually\nexport const SO_ICON_NAMES = [\n${arrayLines.join(',\n')}\n];\n`;
writeFileSync(join(__dirname, '..', 'icon-names.js'), namesJs, 'utf8');
console.log(`icon-names.js: ${names.length} entries`);
