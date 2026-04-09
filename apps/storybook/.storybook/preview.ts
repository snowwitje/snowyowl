import type { Preview } from '@storybook/web-components';
import { html } from 'lit';

// ── Token themes ───────────────────────────────────────────────────────────────
// All 6 compiled theme CSS files — each scoped to [data-theme="..."]
// light.css also targets :root so the default canvas is styled correctly.
import '../../../packages/tokens/dist/css/light.css';
import '../../../packages/tokens/dist/css/dark.css';
import '../../../packages/tokens/dist/css/light-sharp.css';
import '../../../packages/tokens/dist/css/light-elevated.css';
import '../../../packages/tokens/dist/css/dark-sharp.css';
import '../../../packages/tokens/dist/css/dark-elevated.css';

// ── Icon sprite + component registration ──────────────────────────────────────
// Tell SoIcon where the sprite file lives so <use href> uses an absolute URL.
// Fragment-only hrefs (#so-name) don't resolve from shadow roots in Chrome;
// an absolute URL bypasses that — the browser fetches the file directly.
// The sprite is served at /sprite.svg via staticDirs in main.ts.
import { SoIcon } from '../../../packages/icons/src/so-icon.js';
SoIcon.spriteUrl = '/sprite.svg';
// Re-export so-icon registration is included via the SoIcon import above.

// ── Google Fonts ───────────────────────────────────────────────────────────────
// Geologica (variable, weights 300–700) + JetBrains Mono (code/tokens).
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href =
  'https://fonts.googleapis.com/css2?family=Geologica:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
document.head.appendChild(fontLink);

// ── Theme list ─────────────────────────────────────────────────────────────────
const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'] as const;
type Theme = typeof THEMES[number];

// ── Preview config ─────────────────────────────────────────────────────────────
const preview: Preview = {
  // Global toolbar item — selects which data-theme the decorator applies
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'SnowyOwl theme personality',
      defaultValue: 'light' satisfies Theme,
      toolbar: {
        icon: 'paintbrush',
        items: THEMES.map(t => ({ value: t, title: t })),
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  // Wrap every story in a data-theme div so token CSS applies correctly.
  // The background color uses the surface.default token so dark themes
  // get a dark canvas automatically.
  decorators: [
    (story, context) => {
      const theme = (context.globals as { theme?: Theme }).theme ?? 'light';
      return html`
        <div
          data-theme=${theme}
          style="
            padding: 1.5rem;
            min-height: 100%;
            background: var(--soSemanticColorSurfaceDefault, #ffffff);
            color: var(--soSemanticColorTextDefault, #1f2937);
            font-family: 'Geologica', sans-serif;
          "
        >
          ${story()}
        </div>
      `;
    },
  ],

  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true }, // we control bg via tokens
    controls: { matchers: { color: /(color)$/i } },
  },
};

export default preview;
