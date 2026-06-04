import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { accordionStyles } from './accordion.styles.js';
import { SoAccordionItem } from './accordion-item.js';
import type { AccordionSize, AccordionToggleDetail } from './accordion.types.js';

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

  /**
   * Visual size of all child items.
   * - `'sm'` (default) — 14px trigger label + 14px content, 40px trigger height
   * - `'md'` — 16px trigger label + 16px content, 44px trigger height
   * - `'lg'` — 18px semibold trigger label + 16px content, 56px trigger height
   */
  @property({ type: String, reflect: true }) size: AccordionSize = 'sm';

  /**
   * When true, opening an item automatically closes all other open items.
   * Only one panel can be expanded at a time.
   */
  @property({ type: Boolean, reflect: true }) exclusive = false;

  /* ── Lifecycle ── */

  protected override updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('flush') || changedProps.has('iconAlign') || changedProps.has('size')) {
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
      item.size = this.size;
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

  private _onToggle(e: Event) {
    if (!this.exclusive) return;
    const ev = e as CustomEvent<AccordionToggleDetail>;
    if (!ev.detail.open) return;
    // composedPath()[0] is the original target even inside shadow DOM
    const openedItem = e.composedPath()[0];
    this._getItems().forEach(item => {
      if (item !== openedItem && item.open) {
        item.open = false;
      }
    });
  }

  /* ── Render ── */

  render() {
    return html`
      <div part="base" role="list" @so-toggle=${this._onToggle}>
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
