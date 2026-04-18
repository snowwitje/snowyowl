# Changelog

## Unreleased

### Added

- **`so-radio`** — Radio button web component (`packages/components/src/components/radio/`)
  - States: unchecked, checked
  - Optional field `label` prop (above the row) and `helper-text` prop
  - `error-text` and `warning-text` feedback messages; error takes precedence when both provided
  - `disabled` state dims the control and blocks interaction
  - `skeleton` state shows animated placeholder bars for label, value, and control circle
  - `touch` prop enforces 44px minimum touch target height (WCAG 2.5.8 / mobile a11y)
  - `part="base"` on hidden native `<input type="radio">`, `part="control"` on visual 18×18 circle
  - Inner dot: 8×8px via CSS `::after` pseudo-element — toggled by `:host([checked])`, no layout shift
  - Hover halo: 28×28px **circle** (`border-radius: 50%`) via `.row::before`, 5px padding around control; suppressed when disabled/skeleton
  - Focus ring via `box-shadow: var(--soSemanticShadowFocus)` on `part="control"`, `:focus-visible` only
  - Error border: `border-color: var(--soSemanticColorStatusError)` via `[data-error]` attribute, `1.5px` width
  - Fires `so-change` custom event with `{ checked, value }` detail

### Changed

- **`so-checkbox`** — Hover halo enlarged: 26×26px rounded square (`border-radius: var(--soSemanticRadiusControl)`) via `.row::before`, 5px padding around the 16×16 control (was 22×22px / 3px padding). Not shown when `disabled` or `skeleton`.
- **`so-checkbox`** — Error border fixed: `[part='control']` now applies
  `border-color: var(--soSemanticColorStatusError)` (1.5px) when `error-text` is set,
  matching the design spec.

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
