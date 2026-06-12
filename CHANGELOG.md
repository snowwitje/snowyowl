# Changelog

## Unreleased

### Added

- **`so-table`** (`packages/components/src/components/table/`) — Data table component. All features opt-in via props. Sorting: per-column or global `sortable` prop; asc → desc → none cycle; client-side string/number comparison; server-side fires `so-sort`. Filtering: `filterable` shows debounced search input in toolbar; client-side case-insensitive substring match on `filterKeys` (empty = all columns); server-side fires `so-filter`. Selection: `selection="multi"` adds checkbox column with select-all header (indeterminate when partial); `selection="single"` makes full row clickable with inset left-border indicator (`box-shadow: inset 3px 0` to avoid layout shift); both fire `so-selection-change`; keyboard Space/Enter toggles selection. Batch actions: when any rows selected, toolbar switches to batch bar (primary-subtle bg) showing cancel button, count label, and `slot="batch-actions"` content. Pagination: `paginate` integrates `so-pagination` below the table; client-side slice of processed rows; server-side fires `so-page-change`; `totalRows` prop for server-side total calculation. Expandable rows: `expandable` + `detailTemplate` (function property) adds chevron expand column; detail row uses `max-height` CSS transition; fires `so-row-expand`. Frozen columns: `freezeColumns` prop (counts all columns including system ones); `position: sticky` with `left` offsets computed from `offsetWidth` in `updated()`; `frozen-last` right border. Skeleton loading: `loading` renders animated skeleton bars per column with varying widths (60/80/70/85/65% pattern); no toolbar or pagination. Striped: `striped` alternates even-row backgrounds; selected takes precedence. Custom cells: `ColumnDef.render(value, row, index) => TemplateResult | string`. Empty state: default with list icon + message; customizable via `slot="empty"`. Performance: `repeat()` directive with `row.id` key for efficient DOM diffing. ARIA: `role="grid"` (interactive) or `role="table"`; `aria-sort`; `aria-selected`; `aria-busy`; `aria-expanded`. Parts: `container`, `toolbar`, `batch-bar`, `scroll`, `table`, `thead`, `tbody`, `header-row`, `header-cell`, `row`, `cell`, `expand-cell`, `detail-row`, `empty`, `pagination`. Events: `so-sort`, `so-filter`, `so-selection-change`, `so-page-change`, `so-row-expand`. Slots: `toolbar-actions`, `batch-actions`, `empty`. Stories: `Basic`, `Sortable`, `WithFilter`, `WithSelection`, `SingleSelect`, `WithBatchActions`, `WithPagination`, `WithExpandableRows`, `FrozenColumns`, `Striped`, `Loading`, `EmptyState`, `EmptyStateCustom`, `ServerSide`, `FullFeatured`, `WithCustomCells`, `ThemeShowcase`.

- **`so-pagination`** (`packages/components/src/components/pagination/`) — Pagination nav variant. Numbered page buttons with prev/next chevron controls and overflow ellipsis. Properties: `page` (1-indexed current page), `total` (page count), `siblings` (window width, default 1), `loop` (wrap-around), `disabled`, `size` (`sm` | `md` | `lg`, default `md`). Page window algorithm: always shows first and last page; shows a `siblings`-wide window around the current page; uses `…` for hidden ranges; never replaces a single hidden page with ellipsis (shows the number directly instead); expands the window at boundaries to maintain minimum size. Prev/Next rendered as `so-button variant="ghost" icon-only` with `chevron-left`/`chevron-right` icons; disabled at boundaries unless `loop` is set. Ellipsis is a non-interactive `<span aria-hidden>` in v1 (interactive overflow navigation deferred). ARIA: `role="navigation"`, `aria-label="Pagination"` on nav; `aria-current="page"` on active button; `aria-disabled` on prev/next via `so-button`. Parts: `base`, `prev`, `next`, `page`, `page-current`, `ellipsis`. Fires `so-change` with `{ page, previousPage }`. Stories: `Default`, `MidPage`, `FewPages`, `ManyPages`, `Loop`, `Sizes`, `Disabled`, `ThemeShowcase`.

- **`so-toggle`** — added `layout="settings"` variant: full-width row with label left and toggle control right, suitable for iOS-style settings lists. When `helper-text` is also set in settings layout, the helper renders as a subtitle below the value label inside the row rather than above it.

### Changed

- **`so-accordion`** / **`so-accordion-item`** — Default `size` changed from `'sm'` to `'md'`. The `md` size (44px trigger height, 16px label + 16px content) is a better general-purpose default for most layouts. Existing usage that relied on the `sm` default should add `size="sm"` explicitly.

- **`so-avatar`** — `show-tooltip` now uses `so-tooltip` (hover/focus) instead of `so-toggletip` (click). The tooltip shows name and email separated by ` · ` (e.g. `"Alex Morgan · alex@example.com"`) as plain text. This is the expected UX for an identity hover label — the previous toggletip required an explicit click.

### Fixed

- **`so-input`** — `.eye-btn` (password visibility toggle) `border-radius` was hardcoded to `2px`; now uses `var(--soSemanticRadiusInteractive)` so sharp themes correctly render a square button.
- **`so-select`** — `.icon-btn` (clear button) and `.search-input:focus-visible` `border-radius` were hardcoded to `2px`; now use `var(--soSemanticRadiusInteractive)`.
- **`so-input`**, **`so-select`**, **`so-textarea`**, **`so-checkbox`**, **`so-radio`**, **`so-toggle`**, **`so-tabs` (`so-tab`)** — Skeleton placeholder `::after` `border-radius` was hardcoded to `2px`; now uses `var(--soSemanticRadiusControl, 2px)` so sharp/custom themes are applied consistently to loading states.
- **`so-breadcrumb-item`** — `a[part='link']:focus-visible` `border-radius` was hardcoded to `2px`; now uses `var(--soSemanticRadiusInteractive)`.

### Added

- **`so-accordion`** / **`so-accordion-item`** (`packages/components/src/components/accordion/`) — Multi-expand accordion. `so-accordion` is the container (propagates `flush`, `icon-align`, and `size` to children via slotchange; marks the last item with `last-item` attribute for correct border rendering). `so-accordion-item` manages its own open/close state independently — multiple panels can be open simultaneously. `max-height` CSS transition for smooth expand/collapse (double-rAF pattern for reliable scrollHeight measurement; `transitionend` callback re-applies `hidden` after close). `flush` prop removes horizontal padding for sidebar use. `icon-align` (`end` | `start`) positions chevron right (default) or left (tree-like). `size` prop (`sm` | `md` | `lg`, default `sm`) controls trigger height and font sizes: `sm` = 40px / 14px medium label (label-md) / 14px regular content (body-sm); `md` = 44px / 16px medium label (label-lg) / 16px light content (body-md); `lg` = 56px / 18px semibold heading (heading-xs) / 16px light content (body-md). `exclusive` boolean — when set, opening any item automatically closes all others (single-expand; `so-toggle` listener on the container uses `composedPath()[0]` to identify the opener across shadow DOM boundaries; programmatic closes do not fire `so-toggle`). Chevron rotates 180° (end) or 0°/−90° (start) via CSS transitions. `disabled` items render the header at reduced opacity with `cursor: not-allowed` and `color: --soSemanticColorTextDisabled` on the label. `heading-level` (`h2` | `h3` | `h4`, default `h3`) controls the semantic HTML element for document outline / screen readers only — visual size is controlled independently by `size`. ARIA: `role="list"` on container, `role="listitem"` on each item, `aria-expanded` + `aria-controls` on trigger button, `role="region"` + `aria-labelledby` on panel. `prefers-reduced-motion` respected. `so-toggle` event fires on user-initiated open/close. Parts: `base` (accordion); `item`, `heading-el`, `trigger`, `heading-text`, `icon`, `panel`, `content` (accordion-item). Stories: `Default`, `AllClosed`, `AllOpen`, `Sizes`, `SingleOpen`, `MultiExpand`, `FlushAlignment`, `IconStart`, `WithDisabledItem`, `RichContent`, `HeadingLevels`, `Controlled`, `ThemeShowcase`.

- **`so-avatar`** (`packages/components/src/components/avatar/`) — Avatar component with image/initials/icon fallback chain. `src` prop loads an image; on `onerror` falls back to initials (derived from `name`), then to a `so-icon name="user"` placeholder. 5 sizes (`xs` 24px, `sm` 32px, `md` 40px, `lg` 56px, `xl` 72px) — font, font-weight, and icon size scale with CSS custom properties set via size attribute selectors. Hash-based color assignment maps `name` string to one of 8 primitive-token colors (neutral, mauve, sand, slate, cyan, blue, magenta, purple) — consistent across re-renders. `variant="filled"` (default): hashed color background, white text. `variant="outline"`: surface background, hashed color border and text (1.5px solid). `status` prop (`online` | `busy` | `away` | `offline` | `none`) renders a `so-badge variant="status"` absolutely positioned at bottom-right with `translate(25%, 25%)` — rendered as a sibling outside `overflow:hidden` so it is never clipped. `show-tooltip` wraps the avatar in `so-toggletip` showing `name` (label-sm, `--soSemanticColorTextOnTooltip`) and optional `email` (body-sm, `rgba(255,255,255,0.7)` — `--soSemanticColorTextSubtle` resolves too dark on the dark tooltip background). `clickable` renders `<button part="base">` with `cursor: pointer`, 0.85 opacity hover, `--soSemanticShadowFocus` focus ring, and fires `so-click` with `{ name, email }`. Colors set via `--so-avatar-bg`, `--so-avatar-text`, `--so-avatar-border` CSS custom properties in `updated()`. ARIA: `role="img"` + `aria-label` on div; `aria-label` on button; `alt` attribute on img. Parts: `base`, `image`, `initials`, `icon`, `status`. Stories: `Default`, `WithImage`, `ImageFallback`, `NoName`, `Sizes`, `Variants`, `WithStatus`, `WithTooltip`, `WithTooltipNameOnly`, `Clickable`, `StatusAndClickable`, `ThemeShowcase`.

- **`so-stack`** (`packages/components/src/components/stack/`) — Flex layout primitive. Replaces ad-hoc `<div style="display:flex; gap:16px">` with idiomatic, token-driven markup. `:host` IS the flex container — no inner wrapper div, so slotted children are direct flex items and `gap`/`align-items` work exactly as expected. `direction` (`row` | `column`, default `column`), `gap` scale (`none` → `xs` → `sm` → `md` → `lg` → `xl` → `2xl`, mapped to space tokens via CSS attribute selectors), `align` (align-items), `justify` (justify-content), `wrap`, `inline`, `full-width`, `full-height`. Gap is set as `--so-stack-gap` CSS custom property via attribute selectors so consumer `style` overrides cascade correctly. Purely presentational — no events, no ARIA. Stories: `ColumnDefault`, `RowBasic`, `SpaceBetween`, `WrapRow`, `NestedStacks`, `GapScale`, `FormLayout`, `ThemeShowcase`.

- **`so-grid`** (`packages/components/src/components/grid/`) — CSS Grid layout container. Follows the token-driven `minmax` pattern from `CLAUDE.md`. `:host` IS the grid container — no inner wrapper div. `columns` prop accepts `'auto'` (auto-fill with `minmax(minColumnWidth, 1fr)`), integer strings (`'2'`, `'3'`, `'4'` → `repeat(n, 1fr)`), or any custom CSS template string (passed through verbatim, e.g. `'1fr 2fr'`). `grid-template-columns` is computed via `_computeTemplate()` and applied via `style.gridTemplateColumns` in `updated()` — re-runs whenever `columns` or `minColumnWidth` changes. `minColumnWidth` (`sm` = 160px | `md` = 240px | `lg` = 320px, maps to grid tokens). Gap scale same as `so-stack`. `columnGap` and `rowGap` override individual axes (accept preset values or raw CSS strings). `align` (align-items), `justify` (justify-items), `full-width`. No events, no ARIA. Stories: `AutoFill`, `FixedColumns`, `Asymmetric`, `MinWidthScale`, `GapOverride`, `CardGrid`, `ThemeShowcase`.

- **`so-section`** (`packages/components/src/components/section/`) — Content grouping primitive. A semantic `<section part="base">` element with an optional heading, description, actions slot, optional `so-divider`, and optional padding. Used to split settings pages, dashboards, and forms into named areas. `heading` prop renders the header zone; absent = header zone not rendered. `headingLevel` (`h2` | `h3` | `h4`, default `h3`) selects the correct heading element. `description` renders a subtitle below the heading. `actions` named slot anchors action controls (buttons etc.) to the top-right of the header; slot wrapper is hidden via `_hasActions` state when unpopulated. `divided` renders a `so-divider` between the header and content. `padded` adds `var(--soSpace6)` padding inside the section. Gap scale (`none`–`xl`) controls spacing between header zone and content slot. ARIA: `aria-labelledby` on `<section>` pointing to a per-instance heading ID when heading is set. No events. Stories: `Default`, `WithAction`, `Divided`, `Padded`, `HeadingLevels`, `SettingsPage`, `ThemeShowcase`.

- **`so-form`** (`packages/components/src/components/form/`) — Layout-only form wrapper. Provides a semantic `<form>` element with consistent configurable vertical gap between fields (`gap` prop, default `var(--soSemanticSpacingComponentMd)` / 16px, applied via `style.setProperty('--so-form-gap', ...)` to keep it consumer-overridable). Optional `title` + `description` header zone; `titleLevel` prop (`h1`–`h4`, default `h2`) for correct document outline. Footer slot (`slot="footer"`) pre-styled as a flex row; slot is visually hidden when empty via slotchange detection. Loading overlay (`loading` attribute) renders a `so-loader` over the form with `::before` scrim at `--soSemanticOpacityScrim` opacity (same pattern as `so-loader`/`so-modal` — spinner is not dimmed); `inert` attribute set on the native `<form>` when loading to prevent all interaction. `disabled` prop propagates to all slotted SnowyOwl form elements on slotchange and on prop change. `novalidate` defaults to `true`. `so-submit` event wraps the native submit with `{ formData, originalEvent }`; `so-reset` event fires on reset. Public `submit()` method calls `requestSubmit()`. ARIA: `aria-busy` on root when loading, `aria-hidden` on overlay. Parts: `root`, `header`, `title`, `description`, `form`, `fields`, `footer`, `overlay`. Stories: `Default`, `NoHeader`, `Loading`, `Disabled`, `WithDivider`, `ThemeShowcase`.

- **`so-checkbox-group`** (`packages/components/src/components/checkbox-group/`) — Managed checkbox group. Wraps slotted `so-checkbox` elements; group is the source of truth for checked state. `value: string[]` getter/setter syncs checked state to all children on set and via `slotchange`. `orientation` (`vertical` | `horizontal`) drives flex layout. `select-all` prop renders a master `so-checkbox` with checked / indeterminate / unchecked state reflecting whether all, some, or no non-disabled children are checked; master click toggles all non-disabled children. Validation: `required` (at least one), `min`, `max` with auto-generated error messages unless `error-text` is explicitly set; `checkValidity()` / `reportValidity()` public methods. `disabled` and `touch` propagated to all children; `error-text` / `warning-text` propagated to non-disabled children. `so-divider` separator between master and items. ARIA: `<fieldset role>` + `<legend>` + `aria-required` / `aria-invalid` / `aria-describedby`. Parts: `fieldset`, `legend`, `helper`, `items`, `error`, `warning`. Stories: `Default`, `Horizontal`, `WithHelperText`, `WithSelectAll`, `Required`, `MinMax`, `ErrorState`, `WarningState`, `Disabled`, `Touch`, `ThemeShowcase`.

- **`so-radio-group`** (`packages/components/src/components/radio-group/`) — Managed radio group. Wraps slotted `so-radio` elements; group is the source of truth for selected state (single `value: string`). Syncs `checked` to children on `value` set and via `slotchange`; clears all others when one is selected. `name` auto-generated as `so-radio-group-{uid}` if not provided, propagated to all children. `orientation` (`vertical` | `horizontal`). Keyboard: roving tabindex (only selected radio — or first if none — has `tabindex="0"`); `↑`/`←` / `↓`/`→` arrow keys move selection through non-disabled radios (wraps); `Space` selects focused radio; `Tab` moves focus in/out of the group as a single stop. Validation: `required` with auto-generated error unless `error-text` is set; `checkValidity()` / `reportValidity()` public methods. `disabled`, `touch`, `error-text`, `warning-text` propagated to all children. ARIA: `<fieldset role="radiogroup">` + `<legend>` + `aria-required` / `aria-invalid` / `aria-describedby`. Parts: `fieldset`, `legend`, `helper`, `items`, `error`, `warning`. Stories: `Default`, `Horizontal`, `WithHelperText`, `Required`, `ErrorState`, `WarningState`, `Disabled`, `Touch`, `NoneSelected`, `ThemeShowcase`.

- **`so-badge`** (`packages/components/src/components/badge/`) — Badge component with three variants: `count` (numeric pill; hidden via `display:none` when `count=0` unless `show-zero` is set; shows `"{max}+"` when the count exceeds `max`), `status` (small coloured dot for online/busy/away/offline states using semantic status tokens), and `label` (text pill for non-numeric labels like "New", "Beta", "Pro"). `show-zero` boolean prop forces the "0" pill to render for analytics dashboards. Seven named color presets matching `so-tag` (`neutral`, `mauve`, `green`, `red`, `orange`, `blue`, `purple`) set fill/text/border via `updated()`. `color="custom"` escape hatch exposes `--so-badge-fill`, `--so-badge-text`, `--so-badge-border`. Two sizes: `sm` (16px) and `md` (20px). `overlay` + `overlay-position` props (`top-right`, `top-left`, `bottom-right`, `bottom-left`) for absolutely-positioning the badge over a parent element. `role="status"` and `aria-label` on all variants. Parts: `base`, `label`. Stories: `CountVariant`, `CountSizes`, `HiddenAtZero`, `CountOverflow`, `StatusVariant`, `LabelVariant`, `OverlayUsage`, `CustomColor`, `ThemeShowcase`.

- **`so-divider`** (`packages/components/src/components/divider/`) — Divider / separator component. Horizontal (default): `display: block; width: 100%; height: 1px; background-color` — uses `background-color` not `border` to avoid cross-browser rendering differences. Vertical: `display: inline-block; width: 1px; align-self: stretch` — fills flex container height. Two emphasis levels: `subtle` (`--soSemanticColorBorderSubtle`) and `strong` (`--soSemanticColorBorderDefault`). Optional text label via default slot: when slot is populated in horizontal orientation the divider switches to `display: flex` with `::before`/`::after` pseudo-elements flanking the centred label text. Vertical + label logs a console warning and ignores slot content. `role="separator"` + `aria-orientation` on host. Parts: `label`. Stories: `Horizontal`, `HorizontalStrong`, `Vertical`, `VerticalStrong`, `Labeled`, `LabeledCustomText`, `InForm`, `ThemeShowcase`.

- **`so-textarea`** (`packages/components/src/components/textarea/`) — Multiline text area, mirroring `so-input`'s label, helper-text, counter, error/warning/success feedback, disabled, skeleton, and ARIA patterns. Sizing via `rows` prop (default: 3) using the native `<textarea rows>` attribute — no size prop. Optional `auto-grow` boolean expands the field vertically as the user types, with an optional `max-rows` cap that shows a scrollbar once reached. When `auto-grow` is off, `resize: vertical` is hardcoded so the user can drag taller but not wider. Resize handle is suppressed when `auto-grow` is on (JS controls height). Character counter appears in the label row, top right, matching `so-input`. Font locked at 16px (body-md) for iOS Safari auto-zoom prevention. Events: `so-input` (every keystroke) and `so-change` (blur/commit). Parts: `base`, `control`, `label`, `helper`, `counter`, `error`, `warning`, `success`. Stories: `Default`, `Rows`, `AutoGrow`, `AutoGrowMaxRows`, `WithHelperText`, `WithCounter`, `Feedback`, `States`, `ThemeShowcase`.

- **`so-breadcrumb`** / **`so-breadcrumb-item`** (`packages/components/src/components/breadcrumb/`) — Breadcrumb navigation trail. `so-breadcrumb` renders a `<nav>`+`<ol>` landmark and manages the trail via a `slotchange` listener that marks the final `so-breadcrumb-item` as `last=true` using JS (not `:last-child`, which misfires on text nodes). `wrap` prop switches the list between single-line (`overflow: hidden`) and multi-line wrapping. `so-breadcrumb-item` renders as a link (`<a>`) when `href` is set or as the current-page label (`<span aria-current="page">`) when it is the last item. Chevron separator (`<so-icon name="chevron-right">`, 12px hardcoded — no `icon.size.xs` token) appears after every link item. Optional `max-width` prop on intermediate items truncates text with `text-overflow: ellipsis` and wraps the link in an `so-tooltip` (wired inside `render()`) showing the full label on hover/focus. Full label text is always present in the `<a>` DOM so screen readers read it regardless of truncation. ARIA: `<nav aria-label>` landmark, `<ol>` hierarchy, `aria-current="page"` on last item, `aria-hidden` on separators. Parts: `nav`, `list` (breadcrumb); `item`, `link`, `current`, `separator` (breadcrumb-item). Stories: `Default`, `SingleItem`, `TwoItems`, `ManyItems`, `LongLabels`, `WithWrap`, `ThemeShowcase`.

- **`so-tooltip`** (`packages/components/src/components/tooltip/`) — Non-interactive hover/focus tooltip. Plain text only (`text` prop). Preferred `placement` auto-flips when insufficient viewport space. `delay` prop (default 300ms) throttles hover show; focus shows immediately. Touch: shows immediately, auto-hides after 1500ms. `disabled` prop suppresses the tooltip entirely. Panel rendered with `position: fixed` inside shadow DOM, escaping `overflow: hidden` ancestors. Caret triangle positioned per resolved placement using arrow offset from `computePosition`. Entrance: `opacity`+`scale` transition using `--soSemanticMotionDurationControl`. Exit: fade only. `role="tooltip"` + `aria-describedby` on slotted trigger. `prefers-reduced-motion` respected. Parts: `panel`.

- **`so-toggletip`** (`packages/components/src/components/toggletip/`) — Click-triggered interactive panel. Two named slots: `trigger` (the opener) and `content` (panel body — any elements including interactive ones). Default `placement` is `bottom` (differs from tooltip — toggletips typically sit below an info icon). Focus management: on open, focus moves to the first focusable element in the panel; Tab from the last element closes the panel; Escape returns focus to the trigger. Click outside or second trigger click also closes. `aria-expanded` and `aria-controls` set on the slotted trigger; panel has `role="dialog"` + `aria-label`. Fires `so-open` and `so-close` (with `detail.reason: 'trigger' | 'escape' | 'outside-click' | 'tab-out'`). Entrance uses `--soSemanticMotionDurationPanel`. Parts: `panel`.

- **`utils/floating.ts`** (`packages/components/src/utils/`) — Shared floating panel positioning utility. `computePosition(trigger, panel, placement, offset, viewport)` computes `position: fixed` coordinates with auto-flip (preferred → opposite → whichever side has more space), viewport-edge clamping (8px margin), and caret arrow offset clamped inside panel bounds. Exported for reuse by other components.

- **`so-tag`** (`packages/components/src/components/tag/`) — Tag/chip component with four variants: `read-only` (non-interactive `<span>`), `dismissible` (static body with an interactive × close button, animates out on dismiss), `selectable` (toggleable `<button>` with `aria-pressed`, fires `so-change`), and `operational` (clickable `<button>`, fires `so-click`). Nine named color presets (`neutral`, `mauve`, `sand`, `green`, `red`, `orange`, `teal`, `blue`, `purple`) resolve fill/text/border from primitive tokens set as scoped CSS custom properties via `updated()`. `color="custom"` escape hatch lets consumers supply `--so-tag-fill`, `--so-tag-text`, and `--so-tag-border` directly. Selectable selected state overrides any preset with `--soSemanticColorInteractivePrimary`. Optional `slot="icon"` for leading icons (14px). `max-width` prop enables label truncation with native `title` tooltip. `skeleton` prop renders an animated pill placeholder. Parts: `base`, `icon`, `label`, `close`.

- **`so-notification`** (`packages/components/src/components/notification/`) — Inline notification component with four status types (`info`, `success`, `warning`, `error`). Optional `title` prop renders a bold label above the message. `dismissible` prop shows a ghost × button with animated fade + collapse exit. Default slot accepts rich content (links, `<code>`, etc.) in place of the `message` prop. ARIA: `role="alert"` + `aria-live="assertive"` for error/warning, `role="status"` + `aria-live="polite"` for info/success. Fires `so-dismiss` event on close. Parts: `base`, `icon`, `title`, `message`, `close`.

- **`so-toast`** / **`so-toast-provider`** (`packages/components/src/components/toast/`) — Toast notification system with programmatic API. `SoToast.show(options)` finds the nearest `<so-toast-provider>` and appends a toast. Four status types, optional `title`, `timestamp` (caption style), and `actionLabel` (outline button). `autoDismiss` (default 5000 ms) auto-removes the toast after a timeout, pausing when the document is hidden and resuming on visibility restore. Entrance animation slides in from the viewport edge (direction driven by provider `position`); exit reverses with max-height collapse to smoothly close the gap. `<so-toast-provider>` is `position: fixed`, supports 6 position values (`top-right`, `top-left`, `top-center`, `bottom-right`, `bottom-left`, `bottom-center`), and queues excess toasts when `maxVisible` is reached. Both elements respect `prefers-reduced-motion`. Fires `so-dismiss` with `reason: 'close-button' | 'auto-dismiss'`. Parts: `base`, `icon`, `title`, `message`, `timestamp`, `action`, `close`.

- **`semantic.zindex.toast`** token (`packages/tokens/src/semantic/base.json`) — `--soSemanticZindexToast` → `--soZIndexToast` (600). ⭐ Toast notifications sit above modals in the stacking context.

- **`so-card`** (`packages/components/src/components/card/`) — Card container with `media`, default (title), `secondary` (subtitle), `body`, `chart`, `actions`, and `corner-action` slots. `media-position` prop switches media between top/bottom via CSS `order`. `clickable` renders card as `<button>` (or `<a>` with `href`) with hover/focus elevation transitions. `align` prop centres all text zones. `skeleton` prop renders animated placeholder zones.
- **`so-card-delta`** — Inline delta indicator with independent `direction` (`up`/`down`/`none`) and `sentiment` (`positive`/`negative`/`none`) props. Positive = green chip, negative = red chip, none = subtle text. Arrow rendered as inline SVG.
- **`so-modal`** (`packages/components/src/components/modal/`) — Dialog component with `sm`/`md`/`lg`/`fullscreen` sizes. Fade + scale open/close animation using `--soSemanticMotionDurationPanel`. Focus trap (pierces slotted shadow DOM), scroll lock with scrollbar-width compensation, and `Escape` key support via document-level listener. `preventClose` disables all closing mechanisms for destructive confirmations. `loading` prop shows `so-loader` overlay (scrim via `::before` — spinner not dimmed). `so-request-close` event is cancellable for unsaved-changes guards. `so-open` and `so-close` events fire after animation completes. Parts: `backdrop`, `dialog`, `header`, `title`, `subtitle`, `close`, `body`, `footer`, `loader`.



- **`semantic.border.*` tokens** (`packages/tokens/src/semantic/base.json`) + new `border.width.semi` primitive
  - `--soSemanticBorderWidthControl` → `--soBorderWidthThin` (1px) — standard form control border
  - `--soSemanticBorderWidthControlActive` → `--soBorderWidthSemi` (1.5px) ⭐ — hover/focus/error border on form controls
  - `--soSemanticBorderWidthIndicator` → `--soBorderWidthThick` (4px) — selected tab indicator
  - New primitive `border.width.semi` (1.5px) added to `primitives/shape.json`

- **`semantic.motion.*` tokens** (`packages/tokens/src/semantic/base.json`)
  - `--soSemanticMotionDurationControl` → `--soDurationFast` (100ms) ⭐ — micro-interactions: checkbox, radio, toggle, button
  - `--soSemanticMotionDurationPanel` → `--soDurationNormal` (200ms) ⭐ — dropdown open/close, field hover/focus
  - `--soSemanticMotionDurationSkeleton` → `1500ms` — skeleton pulse cycle (not a theme variable)
  - `--soSemanticMotionEasingDefault` → `cubic-bezier(0.4, 0, 0.2, 1)` ⭐ — standard UI transition easing

- **`semantic.opacity.*` tokens** (`packages/tokens/src/semantic/base.json`) + new `opacity.75` primitive
  - `--soSemanticOpacityDisabled` → `--soOpacity40` (0.4) ⭐ — disabled interactive elements
  - `--soSemanticOpacityScrim` → `--soOpacity75` (0.75) ⭐ — overlay scrim behind loaders and modals
  - New primitive `opacity.75` (0.75) added to `primitives/shape.json`

- **`semantic.zindex.*` tokens** (`packages/tokens/src/semantic/base.json`)
  - Four new semantic z-index tokens mapping to existing primitives in `grid.json`:
    - `--soSemanticZindexSticky` → `--soZIndexRaised` (10) — sticky elements within a scrollable panel (e.g. search bar inside dropdown)
    - `--soSemanticZindexDropdown` → `--soZIndexDropdown` (100) — floating panels: dropdowns, popovers, tooltips ⭐
    - `--soSemanticZindexOverlay` → `--soZIndexOverlay` (300) — full-surface loading overlays ⭐
    - `--soSemanticZindexModal` → `--soZIndexModal` (400) — modals and dialogs ⭐
  - No new primitive tokens needed — full z-index scale was already in `primitives/grid.json`

### Changed

- **Token architecture — `semantic.typography` trimmed to family tokens only** (`packages/tokens/src/semantic/base.json`)
  - Removed 8 redundant tokens (`size-body`, `size-body-sm`, `weight-body`, `weight-body-sm`, `weight-heading`, `weight-label`, `weight-footnote`, `weight-caption`) that were not consumed by any component and created a false impression of being theme override points
  - `semantic.typography` now contains only the three ⭐ theme levers: `family-body`, `family-heading`, `family-code`
  - Font size and weight are design system constants expressed through `semantic.textStyle.*` tokens, not theme variables
  - **Note:** the `add-font-styles` preprocessor in `@tokens-studio/sd-transforms` does not support chained references inside composite textStyle `fontFamily` values; consequently `textStyle.*.fontFamily` continues to reference font-family primitives directly. The theme cascade for font-family works correctly via the `:host { font-family: var(--soSemanticTypographyFamilyBody) }` pattern already in all components, where CSS inheritance propagates the family to all descendant text.

- **Border widths tokenized across all form controls and tabs**
  - All `1.5px` border values → `var(--soSemanticBorderWidthControlActive)` across button (outline variant), checkbox, radio, toggle, input (hover + feedback states), select (hover, open, feedback, multi-select checkbox)
  - `tab.styles.ts` indicator: `var(--soBorderWidthThick)` (primitive violation) → `var(--soSemanticBorderWidthIndicator)`; `-4px` hardcoded offset → `calc(-1 * var(--soSemanticBorderWidthIndicator))`

- **Transition durations and easing tokenized across all components**
  - button, checkbox, radio, toggle: `120ms ease` / `150ms ease` → `var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault)`
  - input, tab: `var(--soDurationFast) ease` (primitive) → `var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault)`
  - select: `var(--soDurationNormal) ease` (primitive) → `var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault)` for panel transitions; `var(--soDurationFast) ease` → control token for option hover
  - Skeleton animation: `1.5s ease-in-out` → `var(--soSemanticMotionDurationSkeleton) var(--soSemanticMotionEasingDefault)` across all 7 components
  - Note: `ease-in-out` easing replaced with the design system's `cubic-bezier(0.4, 0, 0.2, 1)` — intentional standardisation. Keyframe mid-point opacity values (e.g. `50% { opacity: 0.4; }`) remain as raw values — they are animation control values, not theme tokens.

- **Opacity values tokenized**
  - `button.ts` disabled `opacity: 0.4` → `var(--soSemanticOpacityDisabled)`
  - `loader.styles.ts` scrim `opacity: 0.75` → `var(--soSemanticOpacityScrim)`

- **Z-index values tokenized in `select` and `loader`**
  - `select.styles.ts` panel `z-index: 100` → `var(--soSemanticZindexDropdown)`
  - `select.styles.ts` search-wrapper `z-index: 1` → `var(--soSemanticZindexSticky)` (local sticky within dropdown panel stacking context)
  - `loader.styles.ts` overlay host `z-index: 100` → `var(--soSemanticZindexOverlay)`
  - `loader.styles.ts` scrim `::before z-index: -1` left as raw — this is a structural CSS technique (send ::before behind flex siblings within the local overlay stacking context; no semantic meaning)

- **All component styles now use `--soSemanticTextStyle*` tokens for typography** (button, checkbox, radio, toggle, input, select, loader, tab)
  - Removed all hardcoded `font-size`, `font-weight`, and `line-height` values
  - Role → token mapping applied consistently across all components:
    - `[part='label']` → `LabelMd` (14px / medium / tight)
    - `[part='helper']`, `.feedback`, `[part='counter']` → `Caption` (12px / light / normal)
    - `[part='value']`, input/select body text → `BodyMd` (16px / light / normal)
    - Tab and loader label text → `BodySm` (14px / regular / normal)
    - Button sizes → `LabelSm` / `LabelMd` / `LabelLg` per size
  - Minor visual adjustments: `line-height` on helper and feedback text changes from `1.4` → `1.5` (aligning to the `normal` primitive); feedback `font-weight` changes from `400` → `300` (light, matching `caption`)

### Added

- **`so-tabs` / `so-tab`** — Tab strip component (`packages/components/src/components/tabs/`)
  - Two elements: `so-tabs` (strip container) + `so-tab` (individual tab item)
  - Variants: `line` (bottom indicator, no strip background) and `filled` (colored strip, top indicator)
  - Icon slot on `so-tab` for icon-only or icon+label modes; icon size fixed at 20×20px
  - Keyboard navigation: ARIA tabs pattern with roving tabindex; ArrowLeft/Right navigate focus, Home/End jump to ends, Enter/Space activates; disabled tabs are skipped
  - ARIA: `so-tabs` has `role="tablist"` with optional `label` passthrough; `so-tab` has `role="tab"`, `aria-selected`, `aria-disabled`
  - States: enabled, selected (4px inset indicator), hover, focus (purple ring via `--soSemanticShadowFocus`), disabled, skeleton (animated 80×14px bar)
  - Focus ring uses combined `box-shadow` so the indicator + ring are both visible on selected+focused tabs
  - `so-tabs` fires `so-change` on selection change; `so-tab` fires `so-tab-select` on activation
  - Parts: `so-tabs[tablist]`, `so-tab[base]`, `so-tab[label]`, `so-tab[icon]`
  - Stories: `Default`, `Filled`, `WithIcons`, `WithIconsAndLabels`, `States`, `WithDisabledTabs`, `SkeletonLoading`, `ThemeShowcase`

- **`so-loader`** — Spinner / loader web component (`packages/components/src/components/loader/`)
  - Sizes: `sm` (24px), `md` (40px, default), `lg` (56px), `xl` (72px); track widths 3/4.5/6/7px respectively
  - Variant `arc` (default): inline SVG with track ring + rotating arc (~40% circumference), `stroke-linecap="round"`, driven by CSS `so-spin` keyframe (1s linear infinite)
  - Variant `gradient`: layered comet-tail effect — three concentric arcs (40%/25%/15% of circumference) stacked in paint order with `stroke-dashoffset` alignment so all layers share the same leading tip; colors sweep from `#deccc3` (sand.300, trailing) through `#a6808c` (mauve.400) to `var(--soSemanticColorInteractivePrimary)` (leading tip). Hardcoded primitive palette values are intentional for the decorative gradient effect.
  - SVG arc parameters computed from size at render time — not hardcoded per-size
  - Layout modes: default (centered flex block), `inline` (inline-flex, vertically aligned with text), `overlay` (absolute positioned with 75% opacity scrim via `::before` so spinner is not dimmed; parent must have `position: relative`)
  - `label` prop: always used as `aria-label` (fallback `"Loading"`); also rendered as visible text below spinner in overlay mode (`margin-top: 12px`, `font-size: 14px`, `font-weight: 400`)
  - ARIA: `:host` has `role="status"` and `aria-live="polite"` (set via `connectedCallback`); `aria-label` updates reactively
  - Parts: `spinner` (the SVG), `label` (overlay visible text)
  - No custom events emitted
  - Stories: `Default`, `Sizes`, `Variants`, `Inline`, `Overlay`, `WithLabel`, `ThemeShowcase`

- **`so-select`** — Select / dropdown web component (`packages/components/src/components/select/`)
  - Single-select and multi-select modes (`multiple` attribute)
  - Optional search field inside the panel (`searchable` — explicit; defaults to `true` for multi-select); search field does **not** auto-focus on open — user clicks or tabs to it
  - Options via slotted `<so-option value="…">` elements; label falls back to slotted text content
  - Trigger sizes: `md` (40px, default) and `lg` (48px) — matching `so-input`
  - `touch` prop sets `min-height: 48px` on option rows for mobile a11y
  - Trigger right side: count badge (multi, inline left) → flex spacer → clear button (×) → separator → chevron; separator only rendered when a value is selected; chevron rotates 180° when open
  - Multi-select: "N selected" pill badge sits inline left in the trigger; placeholder text is hidden when any value is selected
  - Border: `1px solid var(--soSemanticColorTextSubtle)` (closed); `1.5px solid var(--soSemanticColorInteractivePrimary)` (open)
  - Focus ring logic — exactly one ring visible at a time:
    - `trigger-active` class: full focus glow on trigger when panel open and no option/search has focus (works for mouse + keyboard)
    - `options-navigating` class: suppresses trigger `:focus-visible` while an option has the keyboard ring
    - `_searchFocused` state: prevents `trigger-active` from firing when the search input owns DOM focus
    - `options-active` class on search-wrapper: suppresses search `:focus-visible` during option keyboard navigation
  - On open: trigger has focus ring when nothing selected; first selected option is keyboard-focused when a value exists
  - Keyboard navigation: `Enter`/`Space`/`↓` opens; `↑`/`↓` navigates options from trigger; `ArrowUp` from top option moves to search field (searchable); `Enter`/`Space` selects; `Esc`/`Tab` closes; search `Esc` clears text first, second `Esc` closes; `Delete` on multi clears all
  - Options: `min-height: 40px` (not fixed height) with `line-height: 1.5` to prevent text clipping; hover = background change only, no focus ring unless actually in keyboard focus
  - Dropdown panel: absolute-positioned, flips above trigger when `< 240px` viewport space below; `z-index: 1000`; `max-height: 220px` with scroll; `var(--soSemanticShadowFloating)` shadow
  - Single-select: selected option shows right-aligned checkmark; multi-select: embedded 16×16 checkbox left-aligned with `var(--soSemanticColorInteractivePrimarySubtle)` background
  - ARIA: `role="combobox"` + `aria-haspopup="listbox"` on trigger; `role="listbox"` + `aria-multiselectable` on panel; `role="option"` + `aria-selected` + `aria-disabled` on items; `aria-invalid` when `errorText` set
  - `error-text` / `warning-text` shown below trigger with coloured icon; error takes precedence
  - Disabled: `var(--soSemanticColorSurfaceDisabled)` fill, pointer-events none; clear button (×) and chevron both use `--soSemanticColorTextDisabled`; skeleton: pulsing trigger bar
  - Companion `so-option` element (`value`, `label`, `disabled`) — display: none, used as data holder only
  - Fires `so-change` (with `detail: SelectChangeDetail`), `so-open`, `so-close`
  - Parts: `trigger`, `clear`, `chevron`, `panel`, `search`, `listbox`, `label`, `helper`, `error`, `warning`

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