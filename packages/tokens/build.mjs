// build.mjs — Style Dictionary v4 build script for @snowyowl/tokens
// Outputs: CSS custom properties, ESM/CJS JS objects, and a flat JSON for Tokens Studio sync

import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { mkdirSync } from 'fs';

// Register Tokens Studio transforms (handles $value/$type W3C DTCG format)
register(StyleDictionary);

// ─── Helpers ────────────────────────────────────────────────────────────────

const outDir = './dist';
mkdirSync(outDir, { recursive: true });

/**
 * Build a theme combination.
 * @param {string} name        - Output file name prefix
 * @param {string[]} sources   - Token JSON files to include (later files override earlier)
 * @param {string} selector    - CSS selector for scoping (e.g. ':root', '[data-theme="dark"]')
 */
async function buildTheme(name, sources, selector = ':root') {
  const sd = new StyleDictionary({
    log: { verbosity: 'silent' },
    source: sources,
    preprocessors: ['tokens-studio'],
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        prefix: 'so', // so- = SnowyOwl prefix
        buildPath: `${outDir}/css/`,
        files: [
          {
            destination: `${name}.css`,
            format: 'css/variables',
            options: {
              selector,
              outputReferences: true,
              showFileHeader: true,
            },
          },
        ],
      },
      js: {
        transformGroup: 'tokens-studio',
        buildPath: `${outDir}/js/`,
        files: [
          {
            destination: `${name}.mjs`,
            format: 'javascript/esm',
          },
          {
            destination: `${name}.cjs`,
            format: 'javascript/module-flat',
          },
        ],
      },
      json: {
        transformGroup: 'tokens-studio',
        buildPath: `${outDir}/json/`,
        files: [
          {
            destination: `${name}.json`,
            format: 'json/flat',
          },
        ],
      },
    },
  });

  await sd.buildAllPlatforms();
  console.log(`✅  Built theme: ${name}`);
}

// ─── Theme Builds ────────────────────────────────────────────────────────────
// Each build is a combination of:
//   1. All primitives (always included)
//   2. A color mode (base light | dark)
//   3. Optionally a style personality override (sharp | elevated)

const primitives = [
  'src/primitives/color.json',
  'src/primitives/typography.json',
  'src/primitives/spacing.json',
  'src/primitives/shape.json',
  'src/primitives/grid.json',
];

await Promise.all([
  // ── Core color modes ──
  buildTheme(
    'light',
    [...primitives, 'src/semantic/base.json'],
    ':root, [data-theme="light"]'
  ),
  buildTheme(
    'dark',
    [...primitives, 'src/semantic/base.json', 'src/themes/dark.json'],
    '[data-theme="dark"]'
  ),

  // ── Style personality × Light ──
  buildTheme(
    'light-sharp',
    [...primitives, 'src/semantic/base.json', 'src/themes/sharp.json'],
    '[data-theme="light-sharp"]'
  ),
  buildTheme(
    'light-elevated',
    [...primitives, 'src/semantic/base.json', 'src/themes/elevated.json'],
    '[data-theme="light-elevated"]'
  ),

  // ── Style personality × Dark ──
  buildTheme(
    'dark-sharp',
    [...primitives, 'src/semantic/base.json', 'src/themes/dark.json', 'src/themes/sharp.json'],
    '[data-theme="dark-sharp"]'
  ),
  buildTheme(
    'dark-elevated',
    [...primitives, 'src/semantic/base.json', 'src/themes/dark.json', 'src/themes/elevated.json'],
    '[data-theme="dark-elevated"]'
  ),
]);

console.log('\n🦉  SnowyOwl tokens built successfully.\n');
