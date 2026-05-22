import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dividerStyles } from './divider.styles.js';
import type { DividerOrientation, DividerEmphasis } from './divider.types.js';

/**
 * `so-divider` — SnowyOwl divider / separator component.
 *
 * Renders a 1px horizontal or vertical line using background-color (not
 * border) to avoid cross-browser rendering differences.
 *
 * **Labeled divider:** populate the default slot to render two flanking
 * lines around centred text. Only supported when `orientation="horizontal"`.
 *
 * **Vertical divider:** use inside a flex row. The parent must have a
 * defined height or `align-items: stretch` for the full-height line to
 * appear correctly.
 *
 * @slot - Optional label text for horizontal labeled divider
 *
 * @csspart label - Slot wrapper span for the label text (labeled variant only)
 *
 * @csspart base  - Alias for the host element itself (no inner wrapper)
 */
@customElement('so-divider')
export class SoDivider extends LitElement {
  static styles = dividerStyles;

  /** Line direction */
  @property({ type: String, reflect: true }) orientation: DividerOrientation = 'horizontal';

  /** Controls border color — subtle uses `--soSemanticColorBorderSubtle`, strong uses `--soSemanticColorBorderDefault` */
  @property({ type: String, reflect: true }) emphasis: DividerEmphasis = 'subtle';

  @state() private _hasLabel = false;

  /* ── Lifecycle ── */

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
    this.setAttribute('aria-orientation', this.orientation);
  }

  updated(_changedProps: Map<string, unknown>) {
    if (_changedProps.has('orientation')) {
      this.setAttribute('aria-orientation', this.orientation);
    }
  }

  firstUpdated() {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
    if (slot) {
      this._checkSlot(slot);
    }
  }

  /* ── Slot handling ── */

  private _checkSlot(slot: HTMLSlotElement) {
    const hasNodes = slot.assignedNodes({ flatten: true }).some((n) => {
      if (n.nodeType === Node.TEXT_NODE) return (n.textContent?.trim() ?? '') !== '';
      return true;
    });

    if (this.orientation === 'vertical' && hasNodes) {
      console.warn(
        '[so-divider] Label slot is not supported for orientation="vertical". ' +
          'Slot content will be ignored.',
      );
      this._hasLabel = false;
      this.removeAttribute('has-label');
      return;
    }

    this._hasLabel = hasNodes;
    if (hasNodes) {
      this.setAttribute('has-label', '');
    } else {
      this.removeAttribute('has-label');
    }
  }

  private _onSlotChange(e: Event) {
    this._checkSlot(e.target as HTMLSlotElement);
  }

  /* ── Render ── */

  render() {
    if (this._hasLabel && this.orientation === 'horizontal') {
      return html`
        <span part="label">
          <slot @slotchange=${this._onSlotChange}></slot>
        </span>
      `;
    }

    return html`<slot @slotchange=${this._onSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-divider': SoDivider;
  }
}
