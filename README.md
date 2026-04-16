# <img src="assets/snowyowl.svg" alt="SnowyOwl" width="32px" height="32px"> SnowyOwl Design System

An open-source, theme-extensible design system built as framework-agnostic web components.

**[Live site](https://snowwitje.github.io/snowyowl/) · [Token reference](https://snowwitje.github.io/snowyowl/docs/) · [Contributing](./CONTRIBUTING.md)**

---

## What's in the box

| Package | Description | Status |
|---------|-------------|--------|
| `@snowyowl/tokens` | Design tokens | [![npm](https://img.shields.io/npm/v/@snowyowl/tokens)](https://www.npmjs.com/package/@snowyowl/tokens) |
| `@snowyowl/components` | Lit web components | Active development |
| `@snowyowl/icons` | 278 SVG icons + `so-icon` web component | Active development |

### Components

| Component | Description | Status |
|-----------|-------------|--------|
| `so-button` | Button — 5 variants, 3 sizes, icon-only mode | ✅ Stable |
| `so-checkbox` | Checkbox — checked / indeterminate, touch mode, skeleton | ✅ Stable |
| `so-icon` | SVG icon backed by sprite (278 icons) | ✅ Stable |

## Installation

`@snowyowl/tokens` is published to npm:

```bash
npm install @snowyowl/tokens
# or
pnpm add @snowyowl/tokens
```

Then load a theme CSS file:

```css
/* In a CSS/JS bundler */
@import '@snowyowl/tokens/css/light';
```

```html
<!-- Or in plain HTML (direct file path) -->
<link rel="stylesheet" href="node_modules/@snowyowl/tokens/dist/css/light.css" />
```

> `@snowyowl/components` and `@snowyowl/icons` are not yet published. Use the repository directly — see [Development](#development).

---

## Theming

Six compiled CSS themes are available. Load one and switch at runtime with `data-theme`:

```html
<!-- Load base theme (light) -->
<link rel="stylesheet" href="packages/tokens/dist/css/light.css" />
```

```html
<!-- Switch themes on any container -->
<div data-theme="dark">...</div>
<div data-theme="light-sharp">...</div>
<div data-theme="dark-elevated">...</div>
```

Available themes: `light`, `dark`, `light-sharp`, `dark-sharp`, `light-elevated`, `dark-elevated`

### Custom themes

Override just the tokens you need. CSS variables use **camelCase** (this is intentional — see [token naming](./CONTRIBUTING.md#token-naming-convention)):

```css
[data-theme="my-brand"] {
  --soSemanticColorInteractivePrimary: #7c3aed;
  --soSemanticRadiusComponent: 0px;
  --soSemanticRadiusContainer: 4px;
  --soSemanticShadowComponent: none;
}
```

The four **shape personality tokens** control the full visual character of the system:

| Token | Controls |
|-------|---------|
| `--soSemanticRadiusComponent` | Buttons, inputs, chips |
| `--soSemanticRadiusContainer` | Cards, panels, modals |
| `--soSemanticShadowComponent` | Input / chip elevation |
| `--soSemanticShadowContainer` | Card / panel elevation |

---

## Development

**Requirements:** Node 18+, pnpm 9+

```bash
# Clone and install
git clone https://github.com/snowwitje/snowyowl.git
cd snowyowl
pnpm install

# Build tokens (required before first run)
pnpm --filter @snowyowl/tokens build

# Build everything
pnpm build

# Run Storybook
pnpm storybook
```

Storybook runs at `http://localhost:6006` and includes live previews of all components across all six themes.

---

## Contributing

Contributions are welcome — new components, themes, icons, documentation, and bug fixes.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, component authoring rules, token conventions, and how to submit a pull request.

---

## License

MIT
