# <img src="assets/snowyowl.svg" alt="SnowyOwl" width="20px" height="20px"> SnowyOwl Design System

An open-source, theme-extensible design system built as framework-agnostic web components.


---

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| `@snowyowl/tokens` | Design tokens (CSS vars, JS, JSON) | ![npm](https://img.shields.io/npm/v/@snowyowl/tokens) |
| `@snowyowl/components` | Lit web components | ![npm](https://img.shields.io/npm/v/@snowyowl/components) |

## Quick Start

```bash
npm install @snowyowl/tokens @snowyowl/components
```

```html
<!-- Load base theme tokens -->
<link rel="stylesheet" href="node_modules/@snowyowl/tokens/dist/css/light.css" />

<!-- Use components anywhere -->
<so-button variant="primary">Hello SnowyOwl</so-button>
<script type="module" src="node_modules/@snowyowl/components/dist/index.js"></script>
```

## Theming

Switch themes by setting `data-theme` on any container:

```html
<div data-theme="dark">...</div>
<div data-theme="light-sharp">...</div>
<div data-theme="dark-elevated">...</div>
```

Available built-in themes: `light`, `dark`, `light-sharp`, `dark-sharp`, `light-elevated`, `dark-elevated`

### Custom Themes

Override just the tokens you want:

```css
[data-theme="my-brand"] {
  --so-semantic-color-interactive-primary: #7c3aed;
  --so-semantic-radius-component: 0px;
  --so-semantic-shadow-component: none;
}
```

## Development

```bash
# Install
pnpm install

# Build tokens
pnpm --filter @snowyowl/tokens build

# Build all
pnpm build

# Run Storybook
pnpm storybook
```

## Contributing

Contributions welcome — especially new themes! See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
