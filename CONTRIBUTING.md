# Contributing to SnowyOwl

Thank you for your interest in contributing! This guide covers everything you need to get set up and submit your first change.

---

## Contents

- [Getting Started](#getting-started)
- [Repository Structure](#repository-structure)
- [Token Naming Convention](#token-naming-convention)
- [Adding a Component](#adding-a-component)
- [Adding Tokens](#adding-tokens)
- [Writing Storybook Stories](#writing-storybook-stories)
- [Community Themes](#community-themes)
- [Submitting a Pull Request](#submitting-a-pull-request)

---

## Getting Started

**Requirements:** Node 18+, pnpm 9+

```bash
git clone https://github.com/snowwitje/snowyowl.git
cd snowyowl
pnpm install

# Build design tokens first (other packages depend on the output)
pnpm --filter @snowyowl/tokens build

# Build all packages
pnpm build

# Run Storybook for live development
pnpm storybook
```

Storybook runs at `http://localhost:6006`. Changes to component source files hot-reload automatically.

---

## Repository Structure

```
snowyowl/
├── packages/
│   ├── tokens/          # @snowyowl/tokens — Style Dictionary source + build
│   ├── components/      # @snowyowl/components — Lit web components
│   └── icons/           # @snowyowl/icons — 278 SVG icons + so-icon component
├── apps/
│   └── storybook/       # Documentation site (Storybook 8)
├── docs/                # Token reference source (deployed to GitHub Pages)
├── index.html           # Public homepage
└── CHANGELOG.md         # Keep this updated with every component or token addition
```

---

## Token Naming Convention

This is the most important convention in the project. Style Dictionary with the `tokens-studio` transform group produces **camelCase** CSS custom properties. Always use camelCase — kebab-case will not match the compiled output.

```
semantic.color.interactive.primary  →  --soSemanticColorInteractivePrimary
semantic.radius.component           →  --soSemanticRadiusComponent
color.blue.500 (primitive)          →  --soColorBlue500
space.4 (primitive)                 →  --soSpace4
```

**Wrong** (will silently fail — the variable is undefined):
```css
border-radius: var(--so-semantic-radius-component);  /* ❌ kebab-case */
```

**Correct:**
```css
border-radius: var(--soSemanticRadiusComponent);     /* ✅ camelCase */
```

### Three-tier architecture

| Tier | Location | Purpose |
|------|----------|---------|
| **Primitives** | `packages/tokens/src/primitives/` | Raw scale values — `color.blue.500`, `radius.md`, `space.4` |
| **Semantic** | `packages/tokens/src/semantic/base.json` | Meaning-mapped aliases consumed by components |
| **Component** | `packages/tokens/src/components/[name].json` | Per-component overrides (only when needed) |

Never reference primitive tokens directly in components — always use semantic tokens:

```css
/* ❌ Don't reference primitives in components */
border-radius: var(--soRadiusMd);

/* ✅ Use semantic tokens */
border-radius: var(--soSemanticRadiusComponent);
```

After editing any token JSON, rebuild:

```bash
pnpm --filter @snowyowl/tokens build
```

---

## Adding a Component

### File structure

Create a directory under `packages/components/src/components/[name]/`:

```
packages/components/src/components/[name]/
├── [name].ts           # Lit component class
├── [name].styles.ts    # CSS tagged template
├── [name].types.ts     # TypeScript types for props and events
├── index.ts            # Re-export
└── [name].stories.ts   # Storybook stories (required)
```

### Component conventions

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './button.styles.js';

@customElement('so-button')
export class SoButton extends LitElement {
  static styles = styles;

  // Standard props most components should have
  @property({ type: String }) variant: 'primary' | 'secondary' = 'primary';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean }) disabled = false;
}
```

**Checklist for every component:**

- [ ] Tag name uses the `so-` prefix (`so-button`, `so-card`)
- [ ] All visual CSS uses `var(--soSemantic*)` tokens — no hardcoded colors, radii, or shadows
- [ ] Exposes `part="base"` on the main inner element
- [ ] Includes `:host([disabled])` styles
- [ ] Includes focus styles using `var(--soSemanticShadowFocus)` on `:focus-visible`
- [ ] Fires custom events with the `so-` prefix (`so-change`, `so-click`)
- [ ] Has a Storybook story file
- [ ] Has TypeScript types in a `.types.ts` file
- [ ] Is exported from `packages/components/src/index.ts`
- [ ] Has an entry in `CHANGELOG.md`

### Export the component

Add the export to `packages/components/src/index.ts`:

```typescript
export { SoButton } from './components/button/index.js';
export type { ButtonVariant, ButtonSize } from './components/button/index.js';
```

---

## Adding Tokens

Before adding a new token, check whether an existing one already covers the intent.

### Adding a semantic token

Edit `packages/tokens/src/semantic/base.json`:

```json
{
  "semantic": {
    "color": {
      "surface": {
        "subtle": {
          "$value": "{color.mauve.100}",
          "$type": "color",
          "$description": "Muted background for secondary panels and sidebars"
        }
      }
    }
  }
}
```

Use `$description` starting with ⭐ for tokens that are primary theme override points.

### Adding a component token

Only create component tokens when a component needs independent override capability beyond what semantic tokens provide. Add a file at `packages/tokens/src/components/[name].json`:

```json
{
  "button": {
    "radius": {
      "$value": "{semantic.radius.component}",
      "$type": "dimension",
      "$description": "Button border-radius — override to decouple from semantic.radius.component"
    }
  }
}
```

Always rebuild after changes:

```bash
pnpm --filter @snowyowl/tokens build
```

---

## Writing Storybook Stories

Every component needs these five stories:

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
type Story = StoryObj;

// 1. Default — base state, all defaults
export const Default: Story = {
  render: () => html`<so-button>Button</so-button>`,
};

// 2. Variants — all variant values side by side
export const Variants: Story = { ... };

// 3. Sizes — all size values side by side
export const Sizes: Story = { ... };

// 4. States — disabled, loading, error where applicable
export const States: Story = { ... };

// 5. ThemeShowcase — all 6 themes side by side
const themes = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];
export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      ${themes.map(theme => html`
        <div data-theme="${theme}" style="padding: 16px; border-radius: 8px;">
          <so-button>${theme}</so-button>
        </div>
      `)}
    </div>
  `,
};
```

---

## Community Themes

A theme overrides semantic tokens to change the visual personality without touching components. Only the four shape personality tokens need to change for a full personality shift:

```css
[data-theme="my-brand"] {
  --soSemanticColorInteractivePrimary: #7c3aed;
  --soSemanticRadiusComponent: 0px;
  --soSemanticRadiusContainer: 4px;
  --soSemanticShadowComponent: none;
  --soSemanticShadowContainer: none;
}
```

A contributed theme should include:
- A CSS file with the overrides
- A short description of what it overrides and what it inherits from
- A screenshot showing the theme applied to `so-button` and `so-checkbox`

---

## Submitting a Pull Request

1. Fork the repository and create a branch: `git checkout -b feat/my-component`
2. Make your changes following the conventions in this guide
3. Build and verify in Storybook: `pnpm storybook`
4. Update `CHANGELOG.md` under the `## Unreleased` section
5. Open a pull request with a clear description of what was added or changed

### PR checklist

- [ ] `pnpm build` passes without errors
- [ ] Storybook shows the component/change correctly in all themes
- [ ] No hardcoded colors, radii, shadows, or spacing values in component CSS
- [ ] Token variable names use camelCase (`--soSemanticRadiusComponent`)
- [ ] `CHANGELOG.md` updated

---

Questions? Open a [GitHub Discussion](https://github.com/snowwitje/snowyowl/discussions) or file an issue.
