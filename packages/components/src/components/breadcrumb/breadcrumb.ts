import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { breadcrumbStyles, breadcrumbItemStyles } from './breadcrumb.styles.js';
import '../tooltip/tooltip.js';

/* ══════════════════════════════════════════════════════════════════════════
   so-breadcrumb-item
   Defined first so SoBreadcrumb can reference it directly.
══════════════════════════════════════════════════════════════════════════ */

/**
 * `so-breadcrumb-item` — a single step in a breadcrumb trail.
 *
 * When `href` is present the item renders as a link (`<a>`).
 * When `href` is absent (or the item is the last in the trail) it renders
 * as the current-page label (`<span aria-current="page">`).
 *
 * The `last` and `wrap` properties are set automatically by the parent
 * `so-breadcrumb` component — do not set them manually.
 *
 * When `max-width` is set the link text is truncated with an ellipsis and
 * the full label is shown in an `so-tooltip` on hover/focus.
 *
 * @slot - The breadcrumb label text
 *
 * @csspart item      - The `<li>` element
 * @csspart link      - The `<a>` element (link items only)
 * @csspart current   - The `<span>` element (current page item only)
 * @csspart separator - The chevron `<so-icon>` (link items only)
 */
@customElement('so-breadcrumb-item')
export class SoBreadcrumbItem extends LitElement {
  static styles = breadcrumbItemStyles;

  /** URL for the breadcrumb link. When absent the item is the current page. */
  @property({ type: String }) href = '';

  /**
   * Optional max-width for link truncation, e.g. `'120px'`.
   * Triggers an `so-tooltip` showing the full label on hover/focus.
   * Has no effect on the current page item.
   */
  @property({ type: String, attribute: 'max-width' }) maxWidth = '';

  /**
   * Set to `true` by `so-breadcrumb` for the final item.
   * Suppresses the separator chevron and marks the item `aria-current="page"`.
   * Do not set this manually.
   */
  @property({ type: Boolean, reflect: true }) last = false;

  /**
   * Mirrors the parent `so-breadcrumb`'s `wrap` attribute.
   * Set automatically — do not set this manually.
   */
  @property({ type: Boolean, reflect: true }) wrap = false;

  /** Text content read from the slot, used as the tooltip label. */
  @state() private _slotText = '';

  /* ── Lifecycle ── */

  firstUpdated() {
    this._readSlotText();
  }

  /* ── Slot ── */

  private _onSlotChange() {
    this._readSlotText();
  }

  private _readSlotText() {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
    if (!slot) return;
    this._slotText = slot
      .assignedNodes({ flatten: true })
      .map((n) => n.textContent ?? '')
      .join('')
      .trim();
  }

  /* ── Render helpers ── */

  private _renderSeparator() {
    return html`
      <so-icon
        part="separator"
        name="chevron-right"
        aria-hidden="true"
      ></so-icon>
    `;
  }

  /* ── Render ── */

  render() {
    /* Current-page item — no href or explicitly marked as last */
    if (this.last || !this.href) {
      return html`
        <li part="item" aria-current="page">
          <span part="current">
            <slot @slotchange=${this._onSlotChange}></slot>
          </span>
        </li>
      `;
    }

    /* Link item with optional truncation + tooltip */
    const isTruncated = !!this.maxWidth;

    const anchor = html`
      <a
        part="link"
        href=${this.href}
        class=${isTruncated ? 'truncated' : ''}
        style=${isTruncated ? `--so-item-max-width: ${this.maxWidth}` : nothing}
      ><slot @slotchange=${this._onSlotChange}></slot></a>
    `;

    /*
     * Tooltip wiring for truncated items.
     *
     * so-tooltip wraps its trigger via a <slot>. Because the <a> lives
     * inside so-breadcrumb-item's shadow DOM we render the <so-tooltip>
     * directly in the render() method so Lit keeps the DOM in sync across
     * re-renders. The tooltip's `text` prop receives the full label text
     * extracted from the slotted nodes so screen readers always get the
     * complete label from the <a>'s DOM content; the tooltip is a visual
     * supplement only.
     */
    const anchorOrTooltip = isTruncated
      ? html`<so-tooltip text=${this._slotText || ' '} placement="top">${anchor}</so-tooltip>`
      : anchor;

    return html`
      <li part="item">
        ${anchorOrTooltip}
        ${this._renderSeparator()}
      </li>
    `;
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   so-breadcrumb
══════════════════════════════════════════════════════════════════════════ */

/**
 * `so-breadcrumb` — breadcrumb navigation trail.
 *
 * Slot `so-breadcrumb-item` children directly inside. The component
 * automatically marks the final item as the current page and propagates
 * the `wrap` state to all children.
 *
 * ```html
 * <so-breadcrumb>
 *   <so-breadcrumb-item href="/home">Home</so-breadcrumb-item>
 *   <so-breadcrumb-item href="/home/parent">Parent</so-breadcrumb-item>
 *   <so-breadcrumb-item>Current page</so-breadcrumb-item>
 * </so-breadcrumb>
 * ```
 *
 * @slot - `so-breadcrumb-item` elements
 *
 * @csspart nav  - The `<nav>` landmark element
 * @csspart list - The `<ol>` element
 */
@customElement('so-breadcrumb')
export class SoBreadcrumb extends LitElement {
  static styles = breadcrumbStyles;

  /** When true, items wrap onto multiple lines. Default: false (single line). */
  @property({ type: Boolean, reflect: true }) wrap = false;

  /** Accessible label for the `<nav>` landmark. */
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = 'Breadcrumb';

  /* ── Lifecycle ── */

  firstUpdated() {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
    if (!slot) return;
    slot.addEventListener('slotchange', () => this._updateItems());
    this._updateItems();
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('wrap')) {
      this._updateItems();
    }
  }

  /* ── Item wiring ── */

  /**
   * Iterates over assigned so-breadcrumb-item elements and:
   * 1. Resets `last` to false on all items
   * 2. Sets `last = true` on the final element
   * 3. Propagates the current `wrap` value to all items
   *
   * Uses assignedElements() (not assignedNodes()) so text nodes between
   * items are ignored — CSS :last-child would misfire on those.
   */
  private _updateItems() {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
    if (!slot) return;

    const items = slot
      .assignedElements({ flatten: true })
      .filter((el): el is SoBreadcrumbItem => el.tagName.toLowerCase() === 'so-breadcrumb-item');

    items.forEach((item) => {
      item.last = false;
      item.wrap = this.wrap;
    });

    if (items.length > 0) {
      items[items.length - 1].last = true;
    }
  }

  /* ── Render ── */

  render() {
    return html`
      <nav part="nav" aria-label=${this.ariaLabel}>
        <ol part="list">
          <slot></slot>
        </ol>
      </nav>
    `;
  }
}

/* ── Global element registry ────────────────────────────────────────────── */

declare global {
  interface HTMLElementTagNameMap {
    'so-breadcrumb': SoBreadcrumb;
    'so-breadcrumb-item': SoBreadcrumbItem;
  }
}
