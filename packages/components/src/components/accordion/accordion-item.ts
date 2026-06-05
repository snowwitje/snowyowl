import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { accordionItemStyles } from './accordion-item.styles.js';
import type { AccordionSize, AccordionToggleDetail } from './accordion.types.js';

/** Module-level UID counter for unique IDs. */
let _uid = 0;

/**
 * `so-accordion-item` — Individual collapsible item for use inside `<so-accordion>`.
 *
 * Each item manages its own open/close state independently (multi-expand by default).
 * The parent `<so-accordion>` propagates `flush` and `icon-align` automatically via slotchange.
 *
 * **Warning:** Nested `<so-accordion>` inside a panel is technically possible but strongly
 * discouraged — nesting adds visual and keyboard complexity that harms usability.
 *
 * @slot - Panel content.
 *
 * @csspart item         - Outer wrapper div (role="listitem")
 * @csspart heading-el   - The heading element (h2/h3/h4)
 * @csspart trigger      - The button element
 * @csspart heading-text - Heading text span
 * @csspart icon         - Chevron icon
 * @csspart panel        - Collapsible panel div
 * @csspart content      - Inner content wrapper with padding
 *
 * @fires so-toggle - Fires when open state changes. `detail: { open: boolean, heading: string }`
 */
@customElement('so-accordion-item')
export class SoAccordionItem extends LitElement {
  static styles = accordionItemStyles;

  /* ── Props ── */

  /** Header title text — required. */
  @property({ type: String }) heading = '';

  /** Heading element for document outline. Set to match page hierarchy. */
  @property({ type: String, attribute: 'heading-level' })
  headingLevel: 'h2' | 'h3' | 'h4' = 'h3';

  /** Controls panel visibility. Reflected for CSS targeting and external control. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Prevents interaction. The header is still rendered but not interactive. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Removes horizontal padding from the header and content.
   * Set by parent `so-accordion` via slotchange — do not set manually.
   */
  @property({ type: Boolean, reflect: true }) flush = false;

  /**
   * Position of the chevron icon in the header.
   * Set by parent `so-accordion` via slotchange — do not set manually.
   */
  @property({ type: String, reflect: true, attribute: 'icon-align' })
  iconAlign: 'end' | 'start' = 'end';

  /**
   * Visual size of this item. Propagated from `so-accordion` — do not set manually.
   * Controls trigger height and font sizes for both the heading and content.
   */
  @property({ type: String, reflect: true }) size: AccordionSize = 'md';

  /* ── Private ── */

  private readonly _uid: number;
  private _panel: HTMLElement | null = null;
  /** Guards against animating on the very first updated() call. */
  private _mounted = false;

  constructor() {
    super();
    this._uid = ++_uid;
  }

  /* ── Lifecycle ── */

  protected override firstUpdated() {
    this._panel = this.shadowRoot?.querySelector('[part="panel"]') as HTMLElement | null;
    // Initialize panel state without animation
    if (!this.open && this._panel) {
      this._panel.setAttribute('hidden', '');
    }
  }

  protected override updated(changedProps: Map<string, unknown>) {
    if (!this._mounted) {
      this._mounted = true;
      return; // skip animation on first render; firstUpdated handles initial state
    }
    if (changedProps.has('open') && this._panel) {
      if (this.open) {
        this._animateOpen();
      } else {
        this._animateClose();
      }
    }
  }

  /* ── Animation ── */

  private _animateOpen() {
    const panel = this._panel;
    if (!panel) return;
    panel.removeAttribute('hidden');
    panel.style.maxHeight = '0';
    // Double rAF: first frame processes removal of hidden + maxHeight:0,
    // second frame has accurate scrollHeight and triggers the transition.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
        panel.addEventListener(
          'transitionend',
          () => {
            panel.style.maxHeight = ''; // clear inline style after animation
          },
          { once: true },
        );
      });
    });
  }

  private _animateClose() {
    const panel = this._panel;
    if (!panel) return;
    // Start from current rendered height
    panel.style.maxHeight = `${panel.scrollHeight}px`;
    panel.getBoundingClientRect(); // force reflow so transition starts from correct height
    panel.style.maxHeight = '0';
    panel.addEventListener(
      'transitionend',
      () => {
        panel.setAttribute('hidden', '');
        panel.style.maxHeight = ''; // clear inline style
      },
      { once: true },
    );
  }

  /* ── Handlers ── */

  private _toggle() {
    if (this.disabled) return;
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent<AccordionToggleDetail>('so-toggle', {
        detail: { open: this.open, heading: this.heading },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /* ── Render ── */

  render() {
    const triggerId = `so-accordion-trigger-${this._uid}`;
    const panelId = `so-accordion-panel-${this._uid}`;

    const icon = html`
      <so-icon part="icon" name="chevron-down" aria-hidden="true"></so-icon>
    `;

    const button = html`
      <button
        part="trigger"
        type="button"
        id=${triggerId}
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-controls=${panelId}
        ?disabled=${this.disabled}
        @click=${this._toggle}
      >
        ${this.iconAlign === 'start' ? icon : nothing}
        <span part="heading-text">${this.heading}</span>
        ${this.iconAlign === 'end' ? icon : nothing}
      </button>
    `;

    let headingEl;
    if (this.headingLevel === 'h2') {
      headingEl = html`<h2 part="heading-el">${button}</h2>`;
    } else if (this.headingLevel === 'h4') {
      headingEl = html`<h4 part="heading-el">${button}</h4>`;
    } else {
      headingEl = html`<h3 part="heading-el">${button}</h3>`;
    }

    return html`
      <div part="item" role="listitem">
        ${headingEl}
        <div
          part="panel"
          role="region"
          id=${panelId}
          aria-labelledby=${triggerId}
        >
          <div part="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-accordion-item': SoAccordionItem;
  }
}
