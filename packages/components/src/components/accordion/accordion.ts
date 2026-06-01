import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { accordionStyles } from './accordion.styles.js';
import { SoAccordionItem } from './accordion-item.js';

/**
 * `so-accordion` — Multi-expand accordion container.
 *
 * Works together with `<so-accordion-item>` children. Each item manages its own
 * open/close state independently — multiple panels can be open simultaneously.
 *
 * `so-accordion` propagates `flush` and `icon-align` to all child items via slotchange.
 * It also marks the last child item with `last-item` for correct border rendering.
 *
 * @slot - Accepts `<so-accordion-item>` elements.
 *
 * @csspart base - The container div (role="list")
 *
 * @example
 * <so-accordion>
 *   <so-accordion-item heading="Personal information" open>
 *     <p>Content goes here</p>
 *   </so-accordion-item>
 *   <so-accordion-item heading="Notifications">
 *     <p>More content here</p>
 *   </so-accordion-item>
 *   <so-accordion-item heading="Security" disabled>
 *     <p>Disabled content</p>
 *   </so-accordion-item>
 * </so-accordion>
 */
@customElement('so-accordion')
export class SoAccordion extends LitElement {
  static styles = accordionStyles;

  /* ── Props ── */

  /**
   * When true, removes horizontal padding from all item headers.
   * Use in sidebars and tight spaces.
   */
  @property({ type: Boolean, reflect: true }) flush = false;

  /**
   * Position of the chevron icon in item headers.
   * `'end'` (default) keeps title text left-aligned with surrounding content.
   * `'start'` gives a tree-like appearance.
   */
  @property({ type: String, reflect: true, attribute: 'icon-align' })
  iconAlign: 'end' | 'start' = 'end';

  /* ── Lifecycle ── */

  protected override updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('flush') || changedProps.has('iconAlign')) {
      this._syncItems();
    }
  }

  /* ── Helpers ── */

  private _getItems(): SoAccordionItem[] {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
    if (!slot) return [];
    return slot
      .assignedElements({ flatten: true })
      .filter((el): el is SoAccordionItem => el.tagName === 'SO-ACCORDION-ITEM');
  }

  private _syncItems() {
    const items = this._getItems();
    items.forEach((item, index) => {
      item.flush = this.flush;
      item.iconAlign = this.iconAlign;
      if (index === items.length - 1) {
        item.setAttribute('last-item', '');
      } else {
        item.removeAttribute('last-item');
      }
    });
  }

  /* ── Handlers ── */

  private _onSlotChange() {
    this._syncItems();
  }

  /* ── Render ── */

  render() {
    return html`
      <div part="base" role="list">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-accordion': SoAccordion;
  }
}
