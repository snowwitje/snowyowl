# Changelog

## Unreleased

### Added

- **`so-input`** — Text input web component (`packages/components/src/components/input/`)
  - Sizes: `md` (40px height, default) and `lg` (48px height) — reflected as attribute
  - Optional `label` prop (above the field) with optional `helper-text` (below the label)
  - Character counter: `current/max` shown on the label row when `maxlength` is set
  - Default border: `1px solid var(--soSemanticColorTextSubtle)`. Hover: `1.5px solid var(--soSemanticColorTextDefault)`. Focus: `box-shadow: var(--soSemanticShadowFocus)`, border resets to default — no `outline`
  - Input font fixed at 16px / weight 300 (textStyle.body-md) — prevents iOS Safari auto-zoom
  - `error-text`, `warning-text`, `success-text` — shown below the input with coloured icon; error takes precedence
  - `part="prefix"` / `part="suffix"` named slots for icon injection; slots are hidden when empty via `slotchange` tracking
  - `type="password"`: automatic eye-toggle button in suffix position using `so-icon` (so-eye / so-eye-off)
  - Disabled: `var(--soSemanticColorSurfaceDisabled)` fill, `var(--soSemanticColorTextDisabled)` text and border, `pointer-events: none`
  - Skeleton: animated pulse on the control, `so-skeleton-pulse` keyframe — same pattern as other components
  - Fires `so-input` (every keystroke) and `so-change` (blur/commit), both with `detail: { value: string }`
  - Parts: `base`, `control`, `label`, `helper`, `prefix`, `suffix`, `counter`, `error`, `warning`, `success`

- **`so-toggle`** — Toggle (switch) web component (`packages/components/src/components/toggle/`)
  - States: unchecked (off), checked (on)
  - Optional field `label` prop (above the row) and `helper-text` prop
  - `disabled` state dims the control and blocks interaction
  - `skeleton` state shows animated placeholder pill for the track and grey bar for the value label
  - `touch` prop enforces 44px minimum touch target height (WCAG 2.5.8 / mobile a11y)
  - `part="base"` on hidden `<input type="checkbox" role="switch">`, `part="control"` on 48×24px pill track, `part="thumb"` on 18×18px sliding circle
  - Thumb slides from left (off, 3px inset, primary colour) to right (on, 3px inset, white) via CSS `transform: translateX(24px)` with 150ms ease transition
  - Focus ring via `box-shadow: var(--soSemanticShadowFocus)` on `part="control"`, `:focus-visible` only
  - Fires `so-change` custom event with `{ checked, value }` detail

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

- **All form controls** (`so-input`, `so-toggle`, `so-checkbox`, `so-radio`) — When `disabled`, `[part='label']` and `[part='helper']` now retain their **default text colors** (`--soSemanticColorTextSubtle`). Only the interactive control itself (field wrapper, toggle track/thumb, circle, box) uses disabled colors. Intentional divergence from Carbon Design System — disabled fields remain scannable and their labels remain semantically readable.
- **`so-input`** — Wrapper gap corrected to `8px` (was `4px`). Gap between helper text→control and between control→feedback messages is now consistently 8px, matching the checkbox and radio spacing convention.
- **`so-toggle`** — Checked thumb `translateX` corrected to `22px` (was calculated 21px from box-model; 22px is visually optimal with the 1.5px border).
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

## 0.1.1 — 2026-04

### Added

- **Token system** (`@snowyowl/tokens`)
  - New `--soSemanticColorSurfaceDisabled` token for disabled inputs fill

## 0.1.2 — 2026-04

### Changed
- **Token system** (`@snowyowl/tokens`)
  - Fixed `--soSemanticRadiusBadge` in elevated theme to have full radius

### Added

- **Token system** (`@snowyowl/tokens`)
  - New `--soSemanticColorTextPlaceholder` token for placeholder text color
  - New `--soSemanticRadiusInput` token for border-radius on input fields