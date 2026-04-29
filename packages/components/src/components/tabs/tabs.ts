import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tabsStyles } from './tabs.styles.js';
import { SoTab } from './tab.js';
import type { TabsVariant, TabSelectDetail } from './tabs.types.js';

/**
 * `so-tabs` — Tab strip container. Works together with `<so-tab>` child elements.
 *
 * Implements the ARIA tabs pattern with roving tabindex keyboard navigation.
 * The tab strip manages selection state — consumers only need to set `active-tab`.
 *
 * Tab panel management is consumer-managed. Wrap each panel in `role="tabpanel"`
 * with `aria-labelledby` pointing to the corresponding `so-tab`'s `tab-id`.
 *
 * @slot - Accepts `<so-tab>` elements.
 *
 * @csspart tablist - The tab strip container element (has role="tablist").
 *
 * @fires so-change - Fired when the active tab changes (bubbles, composed).
 *   detail: `{ tabId: string }`
 *
 * @example
 * <so-tabs variant="line" active-tab="tab1">
 *   <so-tab tab-id="tab1" label="Overview"></so-tab>
 *   <so-tab tab-id="tab2" label="Details"></so-tab>
 *   <so-tab tab-id="tab3" label="Settings" disabled></so-tab>
 * </so-tabs>
 *
 * @example Icon-only tabs
 * <so-tabs active-tab="tab1">
 *   <so-tab tab-id="tab1">
 *     <so-icon slot="icon" name="cube" decorative></so-icon>
 *   </so-tab>
 *   <so-tab tab-id="tab2">
 *     <so-icon slot="icon" name="gear" decorative></so-icon>
 *   </so-tab>
 * </so-tabs>
 */
@customElement('so-tabs')
export class SoTabs extends LitElement {
  static styles = tabsStyles;

  /* ── Props ── */

  /** Visual style. `line` shows a bottom indicator; `filled` shows a top indicator. */
  @property({ type: String, reflect: true }) variant: TabsVariant = 'line';

  /**
   * The `tab-id` of the currently selected tab.
   * Setting this attribute activates the matching `<so-tab>`.
   */
  @property({ type: String, attribute: 'active-tab' }) activeTab = '';

  /**
   * Accessible label for the tab group (`aria-label` on the tablist element).
   * Recommended when multiple tab groups appear on the same page.
   */
  @property({ type: String }) label = '';

  /* ── Lifecycle ── */

  override updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('activeTab') || changedProps.has('variant')) {
      this._syncTabs();
    }
  }

  /* ── Helpers ── */

  private _getAllTabs(): SoTab[] {
    return [...this.querySelectorAll('so-tab')] as SoTab[];
  }

  private _getEnabledTabs(): SoTab[] {
    return this._getAllTabs().filter(t => !t.disabled && !t.skeleton);
  }

  /**
   * Syncs `variant`, `selected`, and roving tabindex across all child `<so-tab>` elements.
   * Called on slotchange, activeTab change, and variant change.
   */
  private _syncTabs() {
    const allTabs = this._getAllTabs();
    if (allTabs.length === 0) return;

    allTabs.forEach(tab => {
      tab.variant = this.variant;
      tab.selected = tab.tabId === this.activeTab;
    });

    // Roving tabindex: active tab gets 0; if none active, first enabled tab gets 0
    const selectedEnabled = allTabs.find(t => t.selected && !t.disabled && !t.skeleton);
    const firstEnabled = allTabs.find(t => !t.disabled && !t.skeleton);
    const tabWithFocus = selectedEnabled ?? firstEnabled;

    allTabs.forEach(tab => {
      tab.setTabIndex(tab === tabWithFocus ? 0 : -1);
    });
  }

  /* ── Event handlers ── */

  private _onSlotChange() {
    this._syncTabs();
  }

  private _handleTabSelect(e: CustomEvent<TabSelectDetail>) {
    const { tabId } = e.detail;
    if (tabId === this.activeTab) return;

    this.activeTab = tabId;
    this._syncTabs();

    this.dispatchEvent(
      new CustomEvent<TabSelectDetail>('so-change', {
        detail: { tabId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleKeyDown(e: KeyboardEvent) {
    const tabs = this._getEnabledTabs();
    if (tabs.length === 0) return;

    // Only handle navigation keys
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;

    e.preventDefault();

    // Find the currently keyboard-focused tab via the composed path
    const currentTab = e.composedPath().find(
      (el): el is SoTab => el instanceof Element && el.tagName === 'SO-TAB',
    );
    const currentIndex = currentTab ? tabs.indexOf(currentTab) : -1;

    let nextIndex: number;
    switch (e.key) {
      case 'ArrowRight':
        nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex =
          currentIndex < 0
            ? tabs.length - 1
            : (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    // Update roving tabindex and move DOM focus
    this._getAllTabs().forEach(t => t.setTabIndex(-1));
    tabs[nextIndex].setTabIndex(0);
    tabs[nextIndex].focus();
  }

  render() {
    return html`
      <div
        part="tablist"
        role="tablist"
        aria-label=${this.label || nothing}
        @keydown=${this._handleKeyDown}
        @so-tab-select=${this._handleTabSelect}
      >
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-tabs': SoTabs;
  }
}
