import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tabStyles } from './tab.styles.js';
import type { TabsVariant, TabSelectDetail } from './tabs.types.js';

/**
 * `so-tab` — Individual tab item for use inside `<so-tabs>`.
 *
 * Tab selection and keyboard navigation are managed by the parent `<so-tabs>`.
 * Do not set `selected` or manage tabindex manually — use `<so-tabs active-tab="...">`.
 *
 * @slot icon - Optional icon. Use `<so-icon slot="icon" name="..." decorative></so-icon>`.
 *
 * @csspart base  - The focusable tab button element
 * @csspart label - The text label span
 * @csspart icon  - The icon slot wrapper
 *
 * @fires so-tab-select - Fired when the tab is clicked or activated (bubbles, composed).
 *   detail: `{ tabId: string }`
 *
 * @example
 * <so-tabs active-tab="overview">
 *   <so-tab tab-id="overview" label="Overview"></so-tab>
 *   <so-tab tab-id="details" label="Details"></so-tab>
 * </so-tabs>
 *
 * @example Icon-only
 * <so-tab tab-id="home">
 *   <so-icon slot="icon" name="home" decorative></so-icon>
 * </so-tab>
 *
 * @example Icon with label
 * <so-tab tab-id="home" label="Home">
 *   <so-icon slot="icon" name="home" decorative></so-icon>
 * </so-tab>
 */
@customElement('so-tab')
export class SoTab extends LitElement {
  static styles = tabStyles;

  /* ── Props ── */

  /** Unique identifier for this tab. Must match `active-tab` on the parent `<so-tabs>`. Required. */
  @property({ type: String, attribute: 'tab-id' }) tabId = '';

  /** Tab label text. If omitted and the icon slot is filled, renders icon-only. */
  @property({ type: String }) label = '';

  /**
   * Disables the tab. Disabled tabs cannot be selected and are skipped during
   * keyboard arrow-key navigation.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Skeleton loading state — shows an animated placeholder bar.
   * Blocks all interaction while active.
   */
  @property({ type: Boolean, reflect: true }) skeleton = false;

  /**
   * Whether this tab is the active/selected tab.
   * Managed by the parent `<so-tabs>` — do not set directly.
   */
  @property({ type: Boolean, reflect: true }) selected = false;

  /**
   * Visual variant — inherited automatically from the parent `<so-tabs>`.
   * `line` shows a bottom indicator; `filled` shows a top indicator.
   */
  @property({ type: String, reflect: true }) variant: TabsVariant = 'line';

  /* ── Internal ── */

  /** Roving tabindex value — managed by parent so-tabs. */
  @state() private _tabIndex = 0;

  /** Whether the icon slot has content. */
  @state() private _hasIcon = false;

  /* ── Public API for parent so-tabs ── */

  /**
   * Called by `so-tabs` to update this tab's position in the roving tabindex.
   * @param value 0 for the tab that should receive focus; -1 for all others.
   */
  setTabIndex(value: number): void {
    this._tabIndex = value;
  }

  /** Delegates focus to the inner button element. */
  override focus(options?: FocusOptions): void {
    this.shadowRoot?.querySelector<HTMLButtonElement>('[part="base"]')?.focus(options);
  }

  /* ── Handlers ── */

  private _handleClick() {
    if (this.disabled || this.skeleton) return;
    this.dispatchEvent(
      new CustomEvent<TabSelectDetail>('so-tab-select', {
        detail: { tabId: this.tabId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedElements().length > 0;
  }

  render() {
    // Disabled/skeleton tabs are always removed from the tab order
    const effectiveTabIndex = this.disabled || this.skeleton ? -1 : this._tabIndex;

    return html`
      <button
        part="base"
        role="tab"
        tabindex=${effectiveTabIndex}
        aria-selected=${this.selected ? 'true' : 'false'}
        ?aria-disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <span part="icon" ?hidden=${!this._hasIcon}>
          <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
        </span>
        ${this.label
          ? html`<span part="label">${this.label}</span>`
          : nothing}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-tab': SoTab;
  }
}
