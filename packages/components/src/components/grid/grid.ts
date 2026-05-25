import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { gridStyles } from './grid.styles.js';
import type { GridAlign, GridGap, GridJustify, GridMinColumnWidth } from './grid.types.js';

/** Maps gap preset values to CSS token references. */
const GAP_MAP: Record<string, string> = {
  none: 'var(--soSpace0)',
  xs:   'var(--soSpace1)',
  sm:   'var(--soSpace2)',
  md:   'var(--soSpace4)',
  lg:   'var(--soSpace6)',
  xl:   'var(--soSpace8)',
  '2xl':'var(--soSpace12)',
};

/**
 * `so-grid` — SnowyOwl CSS Grid layout container.
 *
 * A zero-markup grid container. Follows the token-driven `minmax` pattern
 * described in `CLAUDE.md`. Supports auto-fill, fixed column counts, and
 * custom template strings.
 *
 * **Critical:** `:host` IS the grid container — there is no inner wrapper
 * div. Slotted children are direct grid items, so `gap` and `align-items`
 * apply exactly as expected.
 *
 * @slot - Direct children become grid cells.
 *
 * @example
 * <!-- responsive auto-fill card grid -->
 * <so-grid columns="auto" gap="lg" full-width>
 *   <so-card heading="One"></so-card>
 *   <so-card heading="Two"></so-card>
 *   <so-card heading="Three"></so-card>
 * </so-grid>
 *
 * @example
 * <!-- fixed 3-column grid -->
 * <so-grid columns="3" gap="md">
 *   ...
 * </so-grid>
 *
 * @example
 * <!-- sidebar + main layout -->
 * <so-grid columns="1fr 2fr" gap="lg">
 *   <aside>...</aside>
 *   <main>...</main>
 * </so-grid>
 */
@customElement('so-grid')
export class SoGrid extends LitElement {
  static styles = gridStyles;

  /**
   * Column template.
   * - `'auto'` — `repeat(auto-fill, minmax(minColumnWidth, 1fr))`
   * - `'2'`, `'3'`, `'4'` — `repeat(n, 1fr)`
   * - Any CSS template string — passed through verbatim, e.g. `'1fr 2fr'`
   */
  @property({ type: String })
  columns = 'auto';

  /**
   * Gap between grid cells. Same scale as `so-stack`.
   * `none` = 0 | `xs` = 4px | `sm` = 8px | `md` = 16px |
   * `lg` = 24px | `xl` = 32px | `2xl` = 48px.
   */
  @property({ type: String, reflect: true })
  gap: GridGap = 'md';

  /**
   * Override column gap independently.
   * Accepts the same preset values as `gap`, or any valid CSS length.
   * When absent, `gap` applies to both axes.
   */
  @property({ type: String, attribute: 'column-gap' })
  columnGap = '';

  /**
   * Override row gap independently.
   * Accepts the same preset values as `gap`, or any valid CSS length.
   * When absent, `gap` applies to both axes.
   */
  @property({ type: String, attribute: 'row-gap' })
  rowGap = '';

  /**
   * Minimum column width for auto-fill mode.
   * `sm` = 160px | `md` = 240px | `lg` = 320px.
   */
  @property({ type: String, reflect: true, attribute: 'min-column-width' })
  minColumnWidth: GridMinColumnWidth = 'md';

  /** `align-items` value. Default: `'stretch'`. */
  @property({ type: String, reflect: true })
  align: GridAlign = 'stretch';

  /** `justify-items` value. Default: `'stretch'`. */
  @property({ type: String, reflect: true })
  justify: GridJustify = 'stretch';

  /** Sets `width: 100%` on the host. */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  /* ── Column template computation ── */

  private _computeTemplate(): string {
    const col = this.columns;
    if (col === 'auto') {
      const minWidth =
        { sm: 'var(--soGridColumnMinSm)', md: 'var(--soGridColumnMinMd)', lg: 'var(--soGridColumnMinLg)' }[
          this.minColumnWidth
        ] ?? 'var(--soGridColumnMinMd)';
      return `repeat(auto-fill, minmax(${minWidth}, 1fr))`;
    }
    const n = parseInt(col, 10);
    if (!isNaN(n)) return `repeat(${n}, 1fr)`;
    return col; // custom template string — pass through verbatim
  }

  /** Resolves a gap preset value or CSS string to a CSS value. */
  private _resolveGap(val: string): string {
    return GAP_MAP[val] ?? val;
  }

  /* ── Lifecycle ── */

  override updated(changed: Map<string, unknown>) {
    if (changed.has('columns') || changed.has('minColumnWidth')) {
      this.style.gridTemplateColumns = this._computeTemplate();
    }
    if (changed.has('columnGap')) {
      this.style.columnGap = this.columnGap ? this._resolveGap(this.columnGap) : '';
    }
    if (changed.has('rowGap')) {
      this.style.rowGap = this.rowGap ? this._resolveGap(this.rowGap) : '';
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-grid': SoGrid;
  }
}
