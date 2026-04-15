# Changelog

## Unreleased

### Added

- **`so-checkbox`** — Checkbox web component (`packages/components/src/components/checkbox/`)
  - States: unchecked, checked, indeterminate
  - Optional field `label` prop (above the row) and `helper-text` prop
  - `error-text` and `warning-text` feedback messages; error takes precedence when both provided
  - `disabled` state dims the control and blocks interaction
  - `skeleton` state shows animated placeholder bars for label, value, and control box
  - `touch` prop enforces 44px minimum touch target height (WCAG 2.5.8 / mobile a11y)
  - `part="base"` on hidden native `<input>`, `part="control"` on visual 16×16 box
  - Focus ring via `box-shadow: var(--soSemanticShadowFocus)` on `part="control"`, `:focus-visible` only
  - Box radius uses existing `--soSemanticRadiusControl` token (2px base / 0px sharp themes)
  - Fires `so-change` custom event with `{ checked, indeterminate }` detail

## 0.1.0 — 2026-04

### Added

- **`so-button`** — Button web component
  - Variants: primary, secondary, outline, ghost, danger
  - Sizes: sm (32px), md (40px), lg (48px)
  - Icon-only square and circular modes
  - Disabled and skeleton states
  - Full-width stretch
  - Fires `so-click` custom event

- **`so-icon`** — Icon web component backed by SVG sprite (278 icons)
  - `SoIcon.spriteUrl` static property for shadow DOM cross-root resolution
  - Decorative mode (`decorative` attribute) suppresses `aria-label`

- **Token system** (`@snowyowl/tokens`)
  - Three-tier architecture: primitives → semantic → component
  - Six compiled CSS themes: light, dark, light-sharp, dark-sharp, light-elevated, dark-elevated
  - Shape personality tokens: `--soSemanticRadiusComponent`, `--soSemanticRadiusContainer`,
    `--soSemanticShadowComponent`, `--soSemanticShadowContainer`
  - `--soSemanticRadiusControl` — 2px base / 0px sharp (for checkboxes and tight form elements)
