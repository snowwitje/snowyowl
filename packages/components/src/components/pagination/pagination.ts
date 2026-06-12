import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { paginationStyles } from './pagination.styles.js';
import type { PaginationSize, PaginationChangeDetail } from './pagination.types.js';
import '../button/index.js';
// Consumers must import '@snowyowl/icons' once at app startup to register so-icon.

/**
 * `so-pagination` — Pagination nav component.
 *
 * Renders numbered page buttons with previous/next controls and overflow ellipsis.
 * Designed for composition with `so-table` and standalone page navigation use.
 *
 * ### Future extensibility (variant="full")
 * A future `variant="full"` will add:
 * - Items per page selector (`so-select`)
 * - Range display ("1–10 of 247 items")
 * - `pageSize` property
 * - `so-change` detail extended with `{ page, previousPage, pageSize }`
 * The current API is additive — no breaking changes needed for this extension.
 *
 * ### Overflow ellipsis
 * The `…` button is non-interactive in v1. Interactive overflow navigation
 * (direct page input on ellipsis click) can be added in a future iteration.
 *
 * @fires so-change - Fires when the active page changes. Detail: `{ page, previousPage }`
 *
 * @csspart base          - The `<nav>` container
 * @csspart prev          - Previous page `so-button`
 * @csspart next          - Next page `so-button`
 * @csspart page          - Individual page `<button>` (applied to all)
 * @csspart page-current  - The currently active page `<button>`
 * @csspart ellipsis      - Ellipsis `<span>`
 *
 * @example
 * <so-pagination page="1" total="10"></so-pagination>
 *
 * @example
 * <so-pagination page="5" total="50" siblings="2" size="lg" loop></so-pagination>
 */
@customElement('so-pagination')
export class SoPagination extends LitElement {
  static styles = paginationStyles;

  /** Current active page (1-indexed). */
  @property({ type: Number }) page = 1;

  /** Total number of pages. */
  @property({ type: Number }) total = 1;

  /**
   * Number of page buttons shown on each side of the current page before
   * overflow ellipsis is shown.
   */
  @property({ type: Number }) siblings = 1;

  /** When true, prev/next wrap around: first→last and last→first. */
  @property({ type: Boolean, reflect: true }) loop = false;

  /** Disables all controls. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Size of all controls — sm (32px) | md (40px) | lg (48px). */
  @property({ type: String, reflect: true }) size: PaginationSize = 'md';

  // ── Internal helpers ────────────────────────────────────────────────────

  private get _isPrevDisabled(): boolean {
    return !this.loop && this.page <= 1;
  }

  private get _isNextDisabled(): boolean {
    return !this.loop && this.page >= this.total;
  }

  private _goToPage(newPage: number) {
    if (this.disabled) return;
    const previousPage = this.page;
    this.page = newPage;
    this.dispatchEvent(
      new CustomEvent<PaginationChangeDetail>('so-change', {
        detail: { page: newPage, previousPage },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handlePrev() {
    if (this._isPrevDisabled) return;
    this._goToPage(this.page <= 1 ? this.total : this.page - 1);
  }

  private _handleNext() {
    if (this._isNextDisabled) return;
    this._goToPage(this.page >= this.total ? 1 : this.page + 1);
  }

  /**
   * Computes the ordered list of items to render.
   *
   * Rules:
   * - Always show page 1 and page `total`.
   * - Show a window of `siblings` pages on each side of `page`.
   * - Expand the window when clipped at either boundary to maintain its
   *   minimum size (2 × siblings + 1).
   * - Replace a single hidden page with the page number itself rather than
   *   an ellipsis (never show `…` for exactly one hidden page).
   */
  private _computePageItems(): Array<number | 'ellipsis-left' | 'ellipsis-right'> {
    const { page, total, siblings } = this;

    if (total <= 1) return [1];
    if (total === 2) return [1, 2];

    let windowStart = Math.max(2, page - siblings);
    let windowEnd = Math.min(total - 1, page + siblings);

    // Extend end if clipped at start (maintain window size)
    if (page - siblings < 2) {
      windowEnd = Math.min(total - 1, 1 + 2 * siblings);
    }

    // Extend start if clipped at end (maintain window size)
    if (page + siblings > total - 1) {
      windowStart = Math.max(2, total - 2 * siblings);
    }

    // Absorb single-page gaps — show the number rather than ellipsis
    if (windowStart === 3) windowStart = 2;
    if (windowEnd === total - 2) windowEnd = total - 1;

    const items: Array<number | 'ellipsis-left' | 'ellipsis-right'> = [1];

    if (windowStart > 2) items.push('ellipsis-left');

    for (let i = windowStart; i <= windowEnd; i++) {
      items.push(i);
    }

    if (windowEnd < total - 1) items.push('ellipsis-right');

    items.push(total);

    return items;
  }

  // ── Render ───────────────────────────────────────────────────────────────

  render() {
    const items = this._computePageItems();
    const prevDisabled = this._isPrevDisabled || this.disabled;
    const nextDisabled = this._isNextDisabled || this.disabled;

    return html`
      <nav part="base" role="navigation" aria-label="Pagination">
        <so-button
          part="prev"
          variant="ghost"
          icon-only
          size=${this.size}
          ?disabled=${prevDisabled}
          .label=${'Previous page'}
          @so-click=${this._handlePrev}
        >
          <so-icon slot="prefix" name="chevron-left" decorative></so-icon>
        </so-button>

        ${items.map(item => {
          if (item === 'ellipsis-left' || item === 'ellipsis-right') {
            return html`
              <span part="ellipsis" class="ellipsis" aria-hidden="true">\u2026</span>
            `;
          }

          const n = item as number;
          const isActive = n === this.page;

          return html`
            <button
              part=${isActive ? 'page page-current' : 'page'}
              class="page-btn"
              type="button"
              aria-label=${isActive ? `Page ${n}, current` : `Page ${n}`}
              aria-current=${isActive ? 'page' : nothing}
              ?disabled=${this.disabled}
              @click=${() => this._goToPage(n)}
            >${n}</button>
          `;
        })}

        <so-button
          part="next"
          variant="ghost"
          icon-only
          size=${this.size}
          ?disabled=${nextDisabled}
          .label=${'Next page'}
          @so-click=${this._handleNext}
        >
          <so-icon slot="prefix" name="chevron-right" decorative></so-icon>
        </so-button>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-pagination': SoPagination;
  }
}
