# @snowyowl/tokens

Design tokens for the [SnowyOwl Design System](https://snowwitje.github.io/snowyowl/) — compiled as CSS custom properties, ES modules, and JSON.

## Installation

```bash
npm install @snowyowl/tokens
```

## Usage

### CSS (recommended)

Load one theme CSS file. It sets all token variables on the appropriate selector.

```html
<!-- Direct file path in HTML -->
<link rel="stylesheet" href="node_modules/@snowyowl/tokens/dist/css/light.css" />
```

Or in a CSS/JS bundler:

```css
@import '@snowyowl/tokens/css/light';
```

```js
import '@snowyowl/tokens/css/light';
```

### Available themes

| Import path | Selector | Description |
|-------------|----------|-------------|
| `@snowyowl/tokens/css/light` | `:root, [data-theme="light"]` | Default light theme |
| `@snowyowl/tokens/css/dark` | `[data-theme="dark"]` | Dark theme |
| `@snowyowl/tokens/css/light-sharp` | `[data-theme="light-sharp"]` | Light + 0px radius |
| `@snowyowl/tokens/css/dark-sharp` | `[data-theme="dark-sharp"]` | Dark + 0px radius |
| `@snowyowl/tokens/css/light-elevated` | `[data-theme="light-elevated"]` | Light + stronger shadows |
| `@snowyowl/tokens/css/dark-elevated` | `[data-theme="dark-elevated"]` | Dark + stronger shadows |

### Switching themes at runtime

```html
<!-- Load the base theme once -->
<link rel="stylesheet" href="node_modules/@snowyowl/tokens/css/light" />

<!-- Switch any container by setting data-theme -->
<div data-theme="dark">...</div>
<div data-theme="light-sharp">...</div>
```

### JavaScript tokens

Each theme is also available as named ES module exports:

```js
import { soSemanticColorInteractivePrimary } from '@snowyowl/tokens';
// → '#7c4f9e' (light theme value)

// Or import a specific theme:
import { soSemanticColorInteractivePrimary } from '@snowyowl/tokens/js/dark';
```

### JSON

```js
import tokens from '@snowyowl/tokens/json/light';
console.log(tokens['soSemanticColorInteractivePrimary']); // '#7c4f9e'
```

## Token architecture

Tokens follow a three-tier hierarchy:

| Tier | Prefix | Example | Use |
|------|--------|---------|-----|
| Primitive | `--soColor*`, `--soSpace*`, `--soRadius*` | `--soColorMauve600` | Raw scale values |
| Semantic | `--soSemantic*` | `--soSemanticColorInteractivePrimary` | Meaning-mapped; what themes override |
| Component | `--soButton*`, `--soCheckbox*` | `--soButtonRadius` | Per-component overrides |

**Always use semantic tokens in your code**, not primitives. Semantic tokens are what themes override.

## Custom theming

Override only the tokens you need. CSS variables use camelCase:

```css
[data-theme="my-brand"] {
  --soSemanticColorInteractivePrimary: #7c3aed;
  --soSemanticRadiusComponent: 0px;
  --soSemanticRadiusContainer: 4px;
  --soSemanticShadowComponent: none;
}
```

The four shape personality tokens control the full visual character of the system:

| Token | Controls |
|-------|---------|
| `--soSemanticRadiusComponent` | Buttons, inputs, chips |
| `--soSemanticRadiusContainer` | Cards, panels, modals |
| `--soSemanticShadowComponent` | Input / chip elevation |
| `--soSemanticShadowContainer` | Card / panel elevation |

## Links

- [Token reference](https://snowwitje.github.io/snowyowl/docs/)
- [GitHub](https://github.com/snowwitje/snowyowl)
- [Contributing](https://github.com/snowwitje/snowyowl/blob/main/CONTRIBUTING.md)

## License

MIT
