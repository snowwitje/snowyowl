import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tooltipStyles, tooltipPanelCSS } from './tooltip.styles.js';
import { computePosition } from '../../utils/floating.js';
import type { Placement } from './tooltip.types.js';

/* ── Global panel stylesheet (injected once into document.head) ─────────── */

let _panelStyleInjected = false;
function _ensurePanelStyle() {
  if (_panelStyleInjected) return;
  const style = document.createElement('style');
  style.id = 'so-tooltip-panel-styles';
  style.textContent = tooltipPanelCSS;
  document.head.appendChild(style);
  _panelStyleInjected = true;
}

/* ── UID counter ────────────────────────────────────────────────────────── */

let _uid = 0;

/* ── Constants ──────────────────────────────────────────────────────────── */

/** Gap between trigger edge and panel (caret height 6px + 2px gap). */
const CARET_OFFSET = 8;
const RESIZE_DEBOUNCE_MS = 100;

/**
 * `so-tooltip` — SnowyOwl Tooltip component.
 *
 * A non-interactive text label shown on hover and focus. Plain text only.
 * Announced to screen readers via `aria-describedby` on the slotted trigger.
 *
 * The panel is appended to `document.body` so that `position: fixed` is always
 * relative to the viewport. Rendering the panel inside shadow DOM risks it
 * being trapped by a CSS containing block (transform, filter, contain) on
 * Storybook story wrappers or other ancestor elements.
 *
 * @slot - The trigger element (must be focusable for keyboard/screen reader access)
 *
 * @csspart panel - The tooltip panel element (on document.body, targetable via id)
 *
 * @example
 * <so-tooltip text="Save file">
 *   <so-button variant="ghost" icon-only label="Save">
 *     <so-icon slot="prefix" name="save" decorative></so-icon>
 *   </so-button>
 * </so-tooltip>
 */
@customElement('so-tooltip')
export class SoTooltip extends LitElement {
  static styles = tooltipStyles;

  /** Tooltip content — plain text only. */
  @property({ type: String }) text = '';

  /** Preferred placement. Auto-flips if there is insufficient space. */
  @property({ type: String, reflect: true }) placement: Placement = 'top';

  /** Show delay in ms (hover only). No delay on hide or focus. */
  @property({ type: Number }) delay = 300;

  /** Suppresses the tooltip entirely when true. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /* ── Private ── */

  private readonly _id: string;
  private _panel: HTMLDivElement | null = null;
  private _slottedTrigger: HTMLElement | null = null;
  private _visible = false;
  private _delayTimer: ReturnType<typeof setTimeout> | null = null;
  private _hideTimer: ReturnType<typeof setTimeout> | null = null;
  private _touchHideTimer: ReturnType<typeof setTimeout> | null = null;
  private _resizeTimer: ReturnType<typeof setTimeout> | null = null;

  private _boundEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') this._hide(); };
  private _boundResize = () => {
    if (this._resizeTimer) clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => { if (this._visible) this._reposition(); }, RESIZE_DEBOUNCE_MS);
  };
  private _boundScroll = () => { if (this._visible) this._reposition(); };

  constructor() {
    super();
    this._id = `so-tooltip-${++_uid}`;
  }

  /* ── Lifecycle ── */

  connectedCallback() {
    super.connectedCallback();
    _ensurePanelStyle();
    this.addEventListener('mouseenter', this._onMouseEnter);
    this.addEventListener('mouseleave', this._onMouseLeave);
    this.addEventListener('touchstart', this._onTouchStart, { passive: true });
    document.addEventListener('keydown', this._boundEscape);
    window.addEventListener('resize', this._boundResize);
    window.addEventListener('scroll', this._boundScroll, { passive: true, capture: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimers();
    this._removePanel();
    this._unwireTrigger();
    this.removeEventListener('mouseenter', this._onMouseEnter);
    this.removeEventListener('mouseleave', this._onMouseLeave);
    this.removeEventListener('touchstart', this._onTouchStart);
    document.removeEventListener('keydown', this._boundEscape);
    window.removeEventListener('resize', this._boundResize);
    window.removeEventListener('scroll', this._boundScroll, { capture: true });
  }

  protected firstUpdated() {
    this._wireSlot();
  }

  /* ── Slot wiring ── */

  private _wireSlot() {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
    if (!slot) return;

    const wire = () => {
      this._unwireTrigger();
      const trigger = slot.assignedElements({ flatten: true })[0] as HTMLElement | null;
      if (trigger) {
        trigger.setAttribute('aria-describedby', this._id);
        trigger.addEventListener('focus', this._onTriggerFocus);
        trigger.addEventListener('blur', this._onTriggerBlur);
        this._slottedTrigger = trigger;
      }
    };

    wire();
    slot.addEventListener('slotchange', wire);
  }

  private _unwireTrigger() {
    if (this._slottedTrigger) {
      this._slottedTrigger.removeEventListener('focus', this._onTriggerFocus);
      this._slottedTrigger.removeEventListener('blur', this._onTriggerBlur);
      this._slottedTrigger = null;
    }
  }

  /* ── Show / hide ── */

  private _canShow(): boolean {
    if (this.disabled || !this.text) return false;
    const trigger = this._slottedTrigger as HTMLButtonElement | null;
    if (trigger?.disabled) return false;
    return true;
  }

  private _show() {
    if (!this._canShow() || this._visible) return;
    this._clearHideTimer();
    this._visible = true;

    // Create panel and append to body — position:fixed on a body child is
    // always viewport-relative, bypassing any CSS containing blocks in ancestors.
    this._createPanel();
    this._reposition();

    requestAnimationFrame(() => {
      this._panel?.classList.add('so-tooltip-visible');
    });
  }

  private _hide() {
    if (!this._visible) return;
    this._clearDelayTimer();
    this._visible = false;

    if (!this._panel) return;
    this._panel.classList.remove('so-tooltip-visible');
    this._panel.classList.add('so-tooltip-hiding');
    this._panel.setAttribute('aria-hidden', 'true');

    const duration = this._motionDuration();
    this._hideTimer = setTimeout(() => this._removePanel(), duration);
  }

  private _motionDuration(): number {
    const val = getComputedStyle(document.documentElement)
      .getPropertyValue('--soSemanticMotionDurationControl')
      .trim();
    return parseInt(val) || 100;
  }

  /* ── Panel DOM ── */

  private _createPanel() {
    this._removePanel();

    const panel = document.createElement('div');
    panel.className = 'so-tooltip-panel';
    panel.setAttribute('role', 'tooltip');
    panel.setAttribute('id', this._id);
    panel.setAttribute('part', 'panel');
    panel.setAttribute('aria-hidden', 'true');
    panel.textContent = this.text;

    // Inherit the active theme so token values resolve correctly on the
    // body-level panel (e.g. in ThemeShowcase stories with multiple themes).
    const themed = this.closest<HTMLElement>('[data-theme]');
    if (themed) {
      panel.setAttribute('data-theme', themed.getAttribute('data-theme') ?? 'light');
    }

    document.body.appendChild(panel);
    this._panel = panel;
  }

  private _removePanel() {
    if (this._hideTimer) { clearTimeout(this._hideTimer); this._hideTimer = null; }
    if (this._panel) { this._panel.remove(); this._panel = null; }
  }

  /* ── Positioning ── */

  private _reposition() {
    if (!this._panel) return;

    const triggerRect = this.getBoundingClientRect();

    // Use offsetWidth/Height (layout dimensions, unaffected by transform:scale)
    // so the positioning math is based on the panel's natural size.
    const panelW = this._panel.offsetWidth;
    const panelH = this._panel.offsetHeight;
    // Build a synthetic DOMRect — only width/height matter to computePosition.
    const panelRect = new DOMRect(0, 0, panelW, panelH);

    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const result = computePosition(triggerRect, panelRect, this.placement, CARET_OFFSET, viewport);

    this._panel.style.left = `${result.x}px`;
    this._panel.style.top = `${result.y}px`;
    this._panel.setAttribute('data-placement', result.placement);
    this._panel.removeAttribute('aria-hidden');

    // Caret position via CSS custom properties (inherited by ::before).
    if (result.placement === 'top' || result.placement === 'bottom') {
      this._panel.style.setProperty('--_arrow-x', `${result.arrowX ?? 0}px`);
      this._panel.style.removeProperty('--_arrow-y');
    } else {
      this._panel.style.setProperty('--_arrow-y', `${result.arrowY ?? 0}px`);
      this._panel.style.removeProperty('--_arrow-x');
    }
  }

  /* ── Event handlers ── */

  private _onMouseEnter = () => {
    this._clearDelayTimer();
    this._delayTimer = setTimeout(() => this._show(), this.delay);
  };

  private _onMouseLeave = () => {
    this._clearDelayTimer();
    this._hide();
  };

  private _onTriggerFocus = () => {
    this._clearDelayTimer();
    this._show();
  };

  private _onTriggerBlur = () => {
    this._hide();
  };

  private _onTouchStart = () => {
    this._clearDelayTimer();
    this._show();
    if (this._touchHideTimer) clearTimeout(this._touchHideTimer);
    this._touchHideTimer = setTimeout(() => this._hide(), 1500);
  };

  /* ── Helpers ── */

  private _clearDelayTimer() {
    if (this._delayTimer) { clearTimeout(this._delayTimer); this._delayTimer = null; }
  }

  private _clearHideTimer() {
    if (this._hideTimer) { clearTimeout(this._hideTimer); this._hideTimer = null; }
  }

  private _clearTimers() {
    this._clearDelayTimer();
    this._clearHideTimer();
    if (this._touchHideTimer) { clearTimeout(this._touchHideTimer); this._touchHideTimer = null; }
    if (this._resizeTimer) { clearTimeout(this._resizeTimer); this._resizeTimer = null; }
  }

  /* ── Render ── */

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-tooltip': SoTooltip;
  }
}
