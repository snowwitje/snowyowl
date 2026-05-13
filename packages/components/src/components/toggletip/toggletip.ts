import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toggletipStyles, toggletipPanelCSS } from './toggletip.styles.js';
import { computePosition } from '../../utils/floating.js';
import type { Placement, ToggletipOpenDetail, ToggletipCloseDetail } from './toggletip.types.js';

/* ── Global panel stylesheet (injected once into document.head) ─────────── */

let _panelStyleInjected = false;
function _ensurePanelStyle() {
  if (_panelStyleInjected) return;
  const style = document.createElement('style');
  style.id = 'so-toggletip-panel-styles';
  style.textContent = toggletipPanelCSS;
  document.head.appendChild(style);
  _panelStyleInjected = true;
}

/* ── UID counter ────────────────────────────────────────────────────────── */

let _uid = 0;

/* ── Constants ──────────────────────────────────────────────────────────── */

/** Gap between trigger edge and panel (caret height 6px + 2px gap). */
const CARET_OFFSET = 8;
const RESIZE_DEBOUNCE_MS = 100;

/** Focusable element selectors for focus management. */
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * `so-toggletip` — SnowyOwl Toggletip component.
 *
 * An interactive panel opened by clicking a trigger. Can contain any content
 * including buttons and links. Announced to screen readers as `role="dialog"`.
 *
 * The panel is appended to `document.body` so that `position: fixed` is always
 * relative to the viewport (same reason as `so-tooltip`). Content slot nodes
 * are physically moved — not cloned — from the host to the body panel on open,
 * preserving their event listeners and component identity. They are moved back
 * to the host's hidden `slot[name="content"]` on close, ready for the next open.
 *
 * **Note:** Slotted components render on a dark `--soSemanticColorSurfaceTooltip`
 * background. Style interactive children (e.g. `so-button`) for the dark context
 * — the toggletip does not restyle slotted content.
 *
 * @slot trigger - The element that opens/closes the panel (must be focusable)
 * @slot content - Panel content — may include any elements, including interactive ones
 *
 * @csspart panel - The toggletip panel element (on document.body)
 *
 * @fires so-open  - Fires when the panel opens. `detail`: `{}`
 * @fires so-close - Fires when the panel closes. `detail.reason`:
 *                   `'trigger' | 'escape' | 'outside-click' | 'tab-out'`
 *
 * @example
 * <so-toggletip label="More information">
 *   <so-button slot="trigger" variant="ghost" icon-only label="More information">
 *     <so-icon slot="prefix" name="information" decorative></so-icon>
 *   </so-button>
 *   <div slot="content">
 *     <p>Toggletip content here</p>
 *     <so-button variant="primary" size="sm">Action</so-button>
 *   </div>
 * </so-toggletip>
 */
@customElement('so-toggletip')
export class SoToggletip extends LitElement {
  static styles = toggletipStyles;

  /** Panel visibility. Reflects as an attribute. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * Preferred placement. Auto-flips if there is insufficient space.
   * Default is `bottom` — toggletips typically sit below an info icon.
   */
  @property({ type: String, reflect: true }) placement: Placement = 'bottom';

  /**
   * `aria-label` for the panel dialog — required for accessibility.
   * Describe the purpose of the content (e.g. "More information").
   */
  @property({ type: String }) label = '';

  /* ── Private ── */

  private readonly _id: string;
  private _panel: HTMLDivElement | null = null;
  /** Nodes physically moved from host → panel; returned to host on close. */
  private _movedNodes: Element[] = [];
  private _slottedTrigger: HTMLElement | null = null;
  private _hideTimer: ReturnType<typeof setTimeout> | null = null;
  private _resizeTimer: ReturnType<typeof setTimeout> | null = null;

  private _boundOutsideClick = (e: MouseEvent) => this._onOutsideClick(e);
  private _boundEscape = (e: KeyboardEvent) => { if (e.key === 'Escape' && this.open) this._close('escape'); };
  private _boundResize = () => {
    if (this._resizeTimer) clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => { if (this.open) this._reposition(); }, RESIZE_DEBOUNCE_MS);
  };
  private _boundScroll = () => { if (this.open) this._reposition(); };

  constructor() {
    super();
    this._id = `so-toggletip-${++_uid}`;
  }

  /* ── Lifecycle ── */

  connectedCallback() {
    super.connectedCallback();
    _ensurePanelStyle();
    document.addEventListener('keydown', this._boundEscape);
    window.addEventListener('resize', this._boundResize);
    window.addEventListener('scroll', this._boundScroll, { passive: true, capture: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._forceClose();
    this._unwireTrigger();
    document.removeEventListener('click', this._boundOutsideClick);
    document.removeEventListener('keydown', this._boundEscape);
    window.removeEventListener('resize', this._boundResize);
    window.removeEventListener('scroll', this._boundScroll, { capture: true });
  }

  protected firstUpdated() {
    this._wireTriggerSlot();
  }

  /* ── Slot wiring — trigger only ── */

  private _wireTriggerSlot() {
    const slot = this.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement | null;
    if (!slot) return;

    const wire = () => {
      this._unwireTrigger();
      const trigger = slot.assignedElements({ flatten: true })[0] as HTMLElement | null;
      if (trigger) {
        trigger.setAttribute('aria-expanded', String(this.open));
        trigger.setAttribute('aria-controls', this._id);
        trigger.addEventListener('click', this._onTriggerClick);
        trigger.addEventListener('keydown', this._onTriggerKeydown);
        this._slottedTrigger = trigger;
      }
    };

    wire();
    slot.addEventListener('slotchange', wire);
  }

  private _unwireTrigger() {
    if (this._slottedTrigger) {
      this._slottedTrigger.removeEventListener('click', this._onTriggerClick);
      this._slottedTrigger.removeEventListener('keydown', this._onTriggerKeydown);
      this._slottedTrigger = null;
    }
  }

  /* ── Open / close ── */

  private _openPanel() {
    if (this.open) return;
    this._clearHideTimer();
    this.open = true;
    this._updateTriggerAria();

    // ── Create body-appended panel ──────────────────────────────────────────
    const panel = document.createElement('div');
    panel.className = 'so-toggletip-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('id', this._id);
    panel.setAttribute('part', 'panel');
    if (this.label) panel.setAttribute('aria-label', this.label);
    panel.addEventListener('keydown', this._onPanelKeydown);

    // Inherit the active theme so token values resolve correctly on the
    // body-level panel (e.g. in ThemeShowcase stories with multiple themes).
    const themed = this.closest<HTMLElement>('[data-theme]');
    if (themed) {
      panel.setAttribute('data-theme', themed.getAttribute('data-theme') ?? 'light');
    }

    // ── Teleport slot content to panel ─────────────────────────────────────
    // Move actual DOM nodes (not clones) so event listeners are preserved.
    // The hidden slot[name="content"] in shadow DOM "owns" them between openings.
    const contentSlot = this.shadowRoot?.querySelector('slot[name="content"]') as HTMLSlotElement | null;
    this._movedNodes = Array.from(contentSlot?.assignedElements({ flatten: true }) ?? []);
    this._movedNodes.forEach(el => panel.appendChild(el));

    document.body.appendChild(panel);
    this._panel = panel;

    // ── Position ────────────────────────────────────────────────────────────
    this._reposition();

    // ── Animate in ─────────────────────────────────────────────────────────
    requestAnimationFrame(() => panel.classList.add('so-toggletip-visible'));

    // ── Focus first focusable element in content ────────────────────────────
    requestAnimationFrame(() => {
      const first = panel.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    });

    document.addEventListener('click', this._boundOutsideClick);
    this.dispatchEvent(
      new CustomEvent<ToggletipOpenDetail>('so-open', { bubbles: true, composed: true, detail: {} }),
    );
  }

  private _close(reason: ToggletipCloseDetail['reason']) {
    if (!this.open) return;
    this.open = false;
    this._updateTriggerAria();
    document.removeEventListener('click', this._boundOutsideClick);

    const panel = this._panel;
    this._panel = null; // clear immediately so reposition guards stop

    if (panel) {
      // ── Return content nodes to host ──────────────────────────────────────
      // Moving them back into the host re-assigns them to slot[name="content"]
      // (which is display:none), making them available for the next open.
      this._movedNodes.forEach(el => this.appendChild(el));
      this._movedNodes = [];

      // ── Animate out ───────────────────────────────────────────────────────
      panel.classList.remove('so-toggletip-visible');
      panel.classList.add('so-toggletip-hiding');

      const duration = this._motionDuration();
      this._hideTimer = setTimeout(() => {
        panel.removeEventListener('keydown', this._onPanelKeydown);
        panel.remove();
      }, duration);
    }

    this.dispatchEvent(
      new CustomEvent<ToggletipCloseDetail>('so-close', {
        bubbles: true,
        composed: true,
        detail: { reason },
      }),
    );

    if (reason === 'escape') {
      this._slottedTrigger?.focus();
    }
  }

  /** Hard removal without animation — used on disconnectedCallback. */
  private _forceClose() {
    this._clearHideTimer();
    const panel = this._panel;
    this._panel = null;
    if (panel) {
      this._movedNodes.forEach(el => this.appendChild(el));
      this._movedNodes = [];
      panel.removeEventListener('keydown', this._onPanelKeydown);
      panel.remove();
    }
    if (this.open) {
      this.open = false;
      this._updateTriggerAria();
    }
  }

  private _toggle() {
    if (this.open) { this._close('trigger'); } else { this._openPanel(); }
  }

  private _motionDuration(): number {
    const val = getComputedStyle(document.documentElement)
      .getPropertyValue('--soSemanticMotionDurationPanel')
      .trim();
    return parseInt(val) || 200;
  }

  /* ── Positioning ── */

  private _reposition() {
    if (!this._panel) return;

    const triggerRect = this.getBoundingClientRect();
    // offsetWidth/Height = layout dimensions, unaffected by transform:scale
    const panelW = this._panel.offsetWidth;
    const panelH = this._panel.offsetHeight;
    const panelRect = new DOMRect(0, 0, panelW, panelH);

    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const result = computePosition(triggerRect, panelRect, this.placement, CARET_OFFSET, viewport);

    this._panel.style.left = `${result.x}px`;
    this._panel.style.top = `${result.y}px`;
    this._panel.setAttribute('data-placement', result.placement);

    // Caret position via CSS custom properties (inherited by ::before).
    if (result.placement === 'top' || result.placement === 'bottom') {
      this._panel.style.setProperty('--_arrow-x', `${result.arrowX ?? 0}px`);
      this._panel.style.removeProperty('--_arrow-y');
    } else {
      this._panel.style.setProperty('--_arrow-y', `${result.arrowY ?? 0}px`);
      this._panel.style.removeProperty('--_arrow-x');
    }
  }

  /* ── Focus management ── */

  private _getFocusableInPanel(): HTMLElement[] {
    return Array.from(this._panel?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
  }

  /* ── ARIA ── */

  private _updateTriggerAria() {
    this._slottedTrigger?.setAttribute('aria-expanded', String(this.open));
  }

  /* ── Event handlers ── */

  private _onTriggerClick = () => {
    this._toggle();
  };

  private _onTriggerKeydown = (e: KeyboardEvent) => {
    // Non-button elements don't fire click on Enter/Space — handle it manually.
    if (e.key === 'Enter' || e.key === ' ') {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag !== 'button') {
        e.preventDefault();
        this._toggle();
      }
    }
  };

  private _onOutsideClick = (e: MouseEvent) => {
    const path = e.composedPath();
    // Close if the click was outside both the host and the body panel.
    if (!path.includes(this) && this._panel && !path.includes(this._panel)) {
      this._close('outside-click');
    }
  };

  private _onPanelKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const focusable = this._getFocusableInPanel();

    if (focusable.length === 0) {
      e.preventDefault();
      this._close('tab-out');
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    // Use document.activeElement — the panel is in light DOM (body), not shadow DOM.
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey) {
      if (active === first) { e.preventDefault(); this._close('tab-out'); }
    } else {
      if (active === last) { e.preventDefault(); this._close('tab-out'); }
    }
  };

  /* ── Helpers ── */

  private _clearHideTimer() {
    if (this._hideTimer) { clearTimeout(this._hideTimer); this._hideTimer = null; }
  }

  /* ── Render ── */

  render() {
    return html`
      <slot name="trigger"></slot>
      <slot name="content"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-toggletip': SoToggletip;
  }
}
