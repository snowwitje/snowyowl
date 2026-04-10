# CLAUDE.md — SnowyOwl Design System

This file defines how Claude should behave when working in this repository.
Read this before writing any code, tokens, or documentation.

---

## Project Overview

**SnowyOwl** is an open-source, theme-extensible design system built as framework-agnostic
web components using Lit. It is inspired by Carbon Design System in terms of documentation
depth and best practices, but designed to be lightweight and community-customizable.

**Public repo goal:** Anyone should be able to drop in a custom theme (colors + typography +
shape personality: radius, shadow, border) by overriding semantic tokens only.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Components | Lit 3.x (web components) |
| Tokens | Style Dictionary v4 + Tokens Studio format (W3C DTCG `$value`/`$type`) |
| Storybook | `@storybook/web-components-vite` 8.x — running at `apps/storybook/` |
| Monorepo | pnpm workspaces + Turborepo |
| Language | TypeScript throughout |
| CSS | CSS custom properties driven by tokens — no CSS-in-JS |
| Grid | CSS Grid, token-driven (`auto-fill` / `minmax` patterns) — no 12-col system |

---

## Repository Structure

```
snowyowl/
├── packages/
│   ├── tokens/          # @snowyowl/tokens — Style Dictionary source + build
│   ├── components/      # @snowyowl/components — Lit web components
│   └── icons/           # @snowyowl/icons — 278 SVG icons + so-icon component
├── apps/
│   └── storybook/       # Documentation site (Storybook 8, web-components-vite)
├── docs/
│   └── token-reference.html  # Living token reference page
├── .github/workflows/   # CI/CD
└── CLAUDE.md            # This file
```

---

## Token Architecture (Three Tiers — Critical)

### Tier 1: Primitives (`packages/tokens/src/primitives/`)
Raw values with no semantic meaning. Named by scale, not purpose.
- `color.blue.500`, `radius.md`, `shadow.sm`, `space.4`, `font.size.lg`
- **Never reference primitives directly in components.** Always go through semantic tokens.

### Tier 2: Semantic (`packages/tokens/src/semantic/base.json`)
Meaning-mapped aliases that components consume via CSS custom properties.
- `--soSemanticColorSurfaceDefault`, `--soSemanticRadiusComponent`, `--soSemanticShadowContainer`
- These are what themes override.

### Tier 3: Component tokens (`packages/tokens/src/components/[name].json`)
Per-component token aliases (optional, only when a component needs independent overrides).
- `--soButtonRadius` → `var(--soSemanticRadiusComponent)`

### The four ⭐ shape personality tokens
These four semantic tokens control visual character. When writing a theme, only these need to change for a full personality shift:
- `semantic.radius.component` — buttons, inputs, chips
- `semantic.radius.container` — cards, panels, modals
- `semantic.shadow.component` — input/chip elevation
- `semantic.shadow.container` — card/panel elevation

---

## Token Naming Convention — CRITICAL

Style Dictionary with the `tokens-studio` transform group + `so` prefix produces **camelCase** CSS custom properties. **Always use camelCase. Never kebab-case.**

```
semantic.color.interactive.primary  →  --soSemanticColorInteractivePrimary
semantic.radius.component           →  --soSemanticRadiusComponent
semantic.shadow.focus               →  --soSemanticShadowFocus
color.blue.500 (primitive)          →  --soColorBlue500
space.4 (primitive)                 →  --soSpace4
radius.md (primitive)               →  --soRadiusMd
```

**Wrong** (will not match compiled output):
```css
border-radius: var(--so-semantic-radius-component);   /* ❌ kebab-case */
color: var(--so-color-interactive-primary);            /* ❌ kebab-case */
```

**Correct**:
```css
border-radius: var(--soSemanticRadiusComponent);       /* ✅ camelCase */
color: var(--soSemanticColorInteractivePrimary);        /* ✅ camelCase */
```

When writing new tokens, always follow the existing naming pattern in the JSON files.
Use `$description` on any token that needs explanation. Use `$description` starting with ⭐ for
tokens that are primary theme override points.

---

## Component Authoring Rules

### File structure for each component
```
packages/components/src/components/[name]/
├── [name].ts           # Lit component class
├── [name].styles.ts    # CSS tagged template (uses semantic tokens)
├── [name].types.ts     # TypeScript types/interfaces for props
├── index.ts            # Re-export
└── [name].stories.ts   # Storybook stories
```

### Lit component conventions
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Always use the so- prefix for custom element names
@customElement('so-button')
export class SoButton extends LitElement {
  // Always consume tokens via CSS custom properties, never hardcoded values
  // IMPORTANT: use camelCase token names — kebab-case won't match compiled output
  static styles = css`
    :host {
      display: inline-flex;
      border-radius: var(--soSemanticRadiusComponent);
      box-shadow: var(--soSemanticShadowComponent);
    }
  `;

  // Use @property for public API
  @property({ type: String }) variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
}
```

### Component API conventions
- Custom element tag: `so-[name]` (e.g. `so-button`, `so-card`, `so-input`)
- Always provide `size` prop with values `sm | md | lg`
- Always provide `disabled` as boolean attribute
- Use slots for content, not props, wherever possible
- Emit custom events with `so-` prefix: `so-change`, `so-select`, `so-close`
- Always expose a CSS part for the main inner element: `part="base"`

### CSS rules in components
- Use `var(--soSemantic*)` for all visual properties (camelCase — see naming convention above)
- Use `var(--soSpace*)` for internal spacing (e.g. `var(--soSpace4)`)
- Never hardcode colors, radii, shadows, or font values
- Use `:host` for layout/display properties, internal elements for visual styling
- Always include `:host([disabled])` and focus styles using `var(--soSemanticShadowFocus)`

### Using so-icon inside components
`so-icon` uses an SVG sprite. Shadow DOM does not resolve fragment-only `href="#id"` references
against the main document. Components that embed `so-icon` work correctly once the consumer
sets `SoIcon.spriteUrl` at app startup:

```typescript
import { SoIcon } from '@snowyowl/icons';
SoIcon.spriteUrl = '/sprite.svg'; // call once before first render
```

In Storybook this is already configured in `apps/storybook/.storybook/preview.ts`.

---

## Grid System

SnowyOwl uses **CSS Grid with token-driven `minmax()` column sizing**. No 12-column system.

Standard pattern for responsive grids:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--soGridColumnMinMd), 1fr));
  gap: var(--soGridGutterMd);
  padding-inline: var(--soGridMarginMd);
}
```

Named area layouts for page structure:
```css
.layout {
  display: grid;
  grid-template-areas: "sidebar main";
  grid-template-columns: var(--soGridColumnSidebar) 1fr;
}
```

---

## Storybook Conventions

Storybook is running at `apps/storybook/`. Start with `pnpm storybook` from root or `npm run storybook` from `apps/storybook/`.

Every component must have these stories:
1. **Default** — base state, all defaults
2. **Variants** — all `variant` values side by side
3. **Sizes** — all `size` values side by side
4. **States** — disabled, loading, error where applicable
5. **ThemeShowcase** — renders the component in all 6 themes side by side
   (light, dark, light-sharp, dark-sharp, light-elevated, dark-elevated)

Story file convention:
```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/button';

const meta: Meta = {
  title: 'Atomic/Button',
  component: 'so-button',
  tags: ['autodocs'],
};
export default meta;
```

---

## Theme Authoring (for contributors)

A community theme lives in `packages/themes/[theme-name]/`:
```typescript
// packages/themes/[name]/index.ts
import type { SnowyOwlTheme } from '@snowyowl/tokens';

export const MyTheme: SnowyOwlTheme = {
  name: 'my-theme',
  extends: 'light', // base theme to inherit from
  overrides: {
    // Only override what you need — everything else inherits
    'soSemanticRadiusComponent': '0px',
    'soSemanticRadiusContainer': '4px',
    'soSemanticShadowComponent': 'none',
    'soSemanticColorInteractivePrimary': '#7c3aed',
  },
};
```

A theme must document: what it overrides, what it inherits, and include a screenshot.

---

## What Claude Should Always Do

1. **Check token existence before using one.** If a token doesn't exist in the JSON files, either use the closest existing one or propose adding a new one with rationale.
2. **Write Storybook stories alongside every component** — never ship a component without stories.
3. **Include TypeScript types** for all component properties and events.
4. **Add `$description`** to any new token that isn't self-explanatory.
5. **Maintain the `CHANGELOG.md`** — add an entry for every new component or token addition.
6. **Propose token additions as a separate diff** — don't silently add tokens inside component code.

## What Claude Should Never Do

- Hardcode any color, radius, shadow, spacing, or font value in a component
- Use kebab-case CSS variable names — always use camelCase (`--soSemanticRadiusComponent` not `--so-semantic-radius-component`)
- Use CSS-in-JS or style attributes for component styling
- Create a component without a corresponding Storybook story
- Reference `{color.blue.500}` directly in component CSS (always go through semantic tokens)
- Use a 12-column grid system (we use CSS Grid `minmax` patterns)
- Use `class` attribute styling — always use `part` and CSS custom properties

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| Init | Web components (Lit) over React/Vue | Framework-agnostic for public DS |
| Init | CSS Grid token-driven, no 12-col | More flexible, tokens express intent |
| Init | Slightly rounded + subtle shadows for base theme | Versatile starting point |
| Init | pnpm + Turborepo monorepo | Best-practice for multi-package DS |
| Init | Style Dictionary v4 + W3C DTCG format | Future-proof, Tokens Studio compatible |
| Init | camelCase CSS variables (`--soSemanticColorInteractivePrimary`) | Style Dictionary tokens-studio transform group output format |
| 2026-04 | `SoIcon.spriteUrl` static property | Fragment-only `href="#id"` in SVG `<use>` does not resolve from shadow DOM in Chrome; absolute URL required |
| 2026-04 | Storybook uses `staticDirs` to serve `sprite.svg` at `/` | Enables `SoIcon.spriteUrl = '/sprite.svg'` without bundling the sprite into JS |

---

*Update this file whenever a significant architectural decision is made.*
