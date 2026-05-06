import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { modalStyles } from './modal.styles.js';
import type { ModalSize, ModalOpenDetail, ModalCloseDetail, ModalRequestCloseDetail } from './modal.types.js';

// Side-effect imports to register so-button and so-loader custom elements.
import '../button/index.js';
import '../loader/index.js';

let _modalCount = 0;

/**
 * `so-modal` — SnowyOwl Modal / Dialog component.
 *
 * Controlled via the `open` boolean property. The component handles its own
 * close animations, focus trap, scroll lock, and keyboard interactions.
 *
 * **Limitation:** The dialog uses `position: fixed` inside the shadow DOM.
 * If an ancestor element has a CSS `transform`, `filter`, or `will-change`
 * property, the fixed positioning context will be that ancestor rather than
 * the viewport, causing incorrect centering. If you need to use the modal
 * inside such a container, you will need to move the `so-modal` element to
 * `document.body` in your application.
 *
 * @slot          - Modal body content — scrollable when content overflows.
 * @slot footer   - Action buttons. Rendered in a fixed footer zone below the body.
 * @slot header   - Optional: replaces the entire default header (title + subtitle + close button).
 *                  Consumer is responsible for ARIA labelling when using this slot.
 *
 * @csspart backdrop - The full-screen backdrop overlay.
 * @csspart dialog   - The dialog container.
 * @csspart header   - The header zone.
 * @csspart title    - The title element (`<h2>`).
 * @csspart subtitle - The subtitle element (`<p>`).
 * @csspart close    - The close button wrapper.
 * @csspart body     - The scrollable body zone.
 * @csspart footer   - The footer zone (only present when footer slot is populated).
 * @csspart loader   - The loading overlay (only present when `loading` is true).
 *
 * @fires so-open          - Fires after the modal finishes opening (post-animation).
 * @fires so-close         - Fires after the modal finishes closing. `detail.reason` indicates the trigger.
 * @fires so-request-close - Fires when the user initiates a close action (close button, backdrop, Escape).
 *                           Call `event.preventDefault()` to cancel.
 *
 * @example
 * <so-modal id="my-modal" title="Confirm action">
 *   <p>Are you sure you want to delete this item?</p>
 *   <so-button slot="footer" variant="secondary" id="cancel-btn">Cancel</so-button>
 *   <so-button slot="footer" variant="danger" id="confirm-btn">Delete</so-button>
 * </so-modal>
 *
 * <script>
 *   const modal = document.getElementById('my-modal');
 *   document.getElementById('cancel-btn').addEventListener('so-click', () => modal.open = false);
 *   document.getElementById('confirm-btn').addEventListener('so-click', () => modal.open = false);
 * </script>
 */
@customElement('so-modal')
export class SoModal extends LitElement {
  static styles = modalStyles;

  // ── Instance IDs (unique per modal for ARIA) ────────────────────────────────
  private readonly _id = ++_modalCount;
  private readonly _titleId = `so-modal-title-${this._id}`;
  private readonly _bodyId = `so-modal-body-${this._id}`;

  // ── Internal animation & focus state ───────────────────────────────────────
  private _returnFocusEl: Element | null = null;
  private _closeReason: ModalCloseDetail['reason'] = 'programmatic';
  private _closeTimer: ReturnType<typeof setTimeout> | undefined;
  private _openEndTimer: ReturnType<typeof setTimeout> | undefined;

  // ── Reactive state ──────────────────────────────────────────────────────────

  /** Whether backdrop + dialog are rendered (display:none when false). */
  @state() private _visible = false;

  /** Whether footer slot has assigned content. */
  @state() private _hasFooter = false;

  /** Whether the header override slot has assigned content. */
  @state() private _hasHeaderSlot = false;

  // ── Public properties ───────────────────────────────────────────────────────

  /** Controls modal visibility. Consumer manages this property. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Dialog max-width size scale. */
  @property({ type: String, reflect: true }) size: ModalSize = 'md';

  /** Modal heading text — required for accessibility. */
  @property({ type: String }) title = '';

  /** Optional subtitle rendered below the title. */
  @property({ type: String }) subtitle = '';

  /** Whether clicking the backdrop closes the modal. */
  @property({ type: Boolean, attribute: 'close-on-backdrop-click' })
  closeOnBackdropClick = true;

  /**
   * Disables all closing mechanisms (Escape, backdrop click, close button).
   * Use for destructive confirmations that require explicit action.
   */
  @property({ type: Boolean, reflect: true, attribute: 'prevent-close' })
  preventClose = false;

  /** Shows a `so-loader` overlay inside the dialog. Body content is behind the scrim. */
  @property({ type: Boolean, reflect: true }) loading = false;

  // ── Lifecycle ───────────────────────────────────────────────────────────────

  override firstUpdated(): void {
    // Sync slot presence on first render (belt-and-suspenders alongside slotchange)
    const sr = this.shadowRoot!;
    const footerSlot = sr.querySelector<HTMLSlotElement>('slot[name="footer"]');
    const headerSlot = sr.querySelector<HTMLSlotElement>('slot[name="header"]');
    if (footerSlot) this._hasFooter = footerSlot.assignedNodes({ flatten: true }).length > 0;
    if (headerSlot) this._hasHeaderSlot = headerSlot.assignedNodes({ flatten: true }).length > 0;

    // If consumer set open before the element upgraded, kick off open now.
    if (this.open) {
      this._startOpen();
    }
  }

  protected override updated(changed: Map<string, unknown>): void {
    if (!changed.has('open')) return;
    const prevOpen = changed.get('open');

    if (this.open && !this._visible) {
      this._startOpen();
    } else if (!this.open && prevOpen === true) {
      this._startClose();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this._closeTimer);
    clearTimeout(this._openEndTimer);
    document.removeEventListener('keydown', this._onDocKeyDown);
    if (this._visible) {
      this._unlockScroll();
    }
  }

  // ── Open / Close orchestration ──────────────────────────────────────────────

  private async _startOpen(): Promise<void> {
    // Cancel any in-progress close animation
    clearTimeout(this._closeTimer);
    clearTimeout(this._openEndTimer);
    this._closeTimer = undefined;
    const dialog = this.shadowRoot?.querySelector<HTMLElement>('[part="dialog"]');
    dialog?.removeEventListener('transitionend', this._onCloseEnd);

    this._returnFocusEl = document.activeElement;
    this._closeReason = 'programmatic';

    if (!this._visible) {
      this._visible = true;
      // Wait for Lit to render the elements (removes display:none)
      await this.updateComplete;
    }

    // Double rAF guarantees the browser has painted the initial transparent state
    // before we add the is-active class that triggers the CSS transition.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this._animate(true);
        this._lockScroll();
        this._focusOnOpen();
        document.addEventListener('keydown', this._onDocKeyDown);

        // Fire so-open after animation completes (with fallback timer)
        const openDialog = this.shadowRoot?.querySelector<HTMLElement>('[part="dialog"]');
        if (openDialog) {
          const onEnd = () => {
            clearTimeout(this._openEndTimer);
            this._openEndTimer = undefined;
            this.dispatchEvent(
              new CustomEvent<ModalOpenDetail>('so-open', { bubbles: true, composed: true }),
            );
          };
          openDialog.addEventListener('transitionend', onEnd, { once: true });
          this._openEndTimer = setTimeout(() => {
            openDialog.removeEventListener('transitionend', onEnd);
            onEnd();
          }, 350);
        }
      });
    });
  }

  private _startClose(): void {
    clearTimeout(this._openEndTimer);
    this._openEndTimer = undefined;

    this._animate(false);
    document.removeEventListener('keydown', this._onDocKeyDown);

    const dialog = this.shadowRoot?.querySelector<HTMLElement>('[part="dialog"]');
    if (dialog) {
      dialog.addEventListener('transitionend', this._onCloseEnd, { once: true });
      this._closeTimer = setTimeout(this._onCloseEnd, 350);
    } else {
      this._onCloseEnd();
    }
  }

  private _onCloseEnd = (): void => {
    clearTimeout(this._closeTimer);
    this._closeTimer = undefined;
    this._visible = false;
    this._unlockScroll();
    this._restoreFocus();
    const reason = this._closeReason;
    this._closeReason = 'programmatic';
    this.dispatchEvent(
      new CustomEvent<ModalCloseDetail>('so-close', {
        detail: { reason },
        bubbles: true,
        composed: true,
      }),
    );
  };

  // ── Animation helpers ───────────────────────────────────────────────────────

  private _animate(active: boolean): void {
    const sr = this.shadowRoot;
    if (!sr) return;
    sr.querySelector('[part="backdrop"]')?.classList.toggle('is-active', active);
    sr.querySelector('[part="dialog"]')?.classList.toggle('is-active', active);
  }

  // ── Scroll lock ─────────────────────────────────────────────────────────────

  private _lockScroll(): void {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  }

  private _unlockScroll(): void {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  // ── Focus management ────────────────────────────────────────────────────────

  private _focusOnOpen(): void {
    const sel =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // 1. First focusable element in the default (body) slot
    const defaultSlot = this.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])');
    if (defaultSlot) {
      for (const el of defaultSlot.assignedElements({ flatten: true })) {
        const candidate =
          (el as HTMLElement).matches?.(sel)
            ? (el as HTMLElement)
            : el.querySelector<HTMLElement>(sel);
        if (candidate) {
          candidate.focus();
          return;
        }
      }
    }

    // 2. Close button (pierce into so-button's shadow DOM)
    if (!this.preventClose) {
      const soBtn = this.shadowRoot!.querySelector('.close-btn') as (Element & {
        shadowRoot: ShadowRoot | null;
      }) | null;
      const innerBtn = soBtn?.shadowRoot?.querySelector<HTMLElement>('button:not([disabled])');
      if (innerBtn) {
        innerBtn.focus();
        return;
      }
    }

    // 3. Focus the dialog itself as last resort
    const dialog = this.shadowRoot!.querySelector<HTMLElement>('[part="dialog"]');
    dialog?.focus();
  }

  private _restoreFocus(): void {
    if (this._returnFocusEl && typeof (this._returnFocusEl as HTMLElement).focus === 'function') {
      (this._returnFocusEl as HTMLElement).focus();
    }
    this._returnFocusEl = null;
  }

  /**
   * Collects all focusable elements inside the dialog for focus trap management.
   * Pierces into so-button's shadow root for the close button, and queries
   * assigned elements from all named and unnamed slots.
   */
  private _getFocusable(): HTMLElement[] {
    const sel = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const items: HTMLElement[] = [];

    // Close button inner <button> (so-button shadow root)
    const soBtn = this.shadowRoot?.querySelector('.close-btn') as
      | (Element & { shadowRoot: ShadowRoot | null })
      | null;
    const closeInner = soBtn?.shadowRoot?.querySelector<HTMLElement>('button:not([disabled])');
    if (closeInner) items.push(closeInner);

    // Slotted light DOM content
    this.shadowRoot!.querySelectorAll<HTMLSlotElement>('slot').forEach(slot => {
      if ((slot as HTMLElement).hidden) return;
      slot.assignedElements({ flatten: true }).forEach(assigned => {
        const el = assigned as HTMLElement;
        if (el.matches?.(sel)) items.push(el);
        el.querySelectorAll<HTMLElement>(sel).forEach(c => items.push(c));
      });
    });

    return items.filter(el => {
      const s = getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden';
    });
  }

  /** Drills down to the deepest active element across shadow roots. */
  private _deepActiveElement(): Element | null {
    let active: Element | null = document.activeElement;
    while (active?.shadowRoot?.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    return active;
  }

  // ── Close request ───────────────────────────────────────────────────────────

  private _requestClose(reason: ModalRequestCloseDetail['reason']): void {
    if (this.preventClose) return;

    const event = new CustomEvent<ModalRequestCloseDetail>('so-request-close', {
      detail: { reason },
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);

    if (!event.defaultPrevented) {
      this._closeReason = reason;
      this.open = false;
    }
  }

  // ── Event handlers ──────────────────────────────────────────────────────────

  private _onDocKeyDown = (e: KeyboardEvent): void => {
    if (!this.open || this.preventClose) return;
    if (e.key === 'Escape') {
      this._requestClose('escape');
      e.stopPropagation();
    }
  };

  private _onTabKeyDown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;

    const items = this._getFocusable();
    if (items.length === 0) {
      e.preventDefault();
      return;
    }

    const first = items[0];
    const last = items[items.length - 1];
    const active = this._deepActiveElement();

    if (e.shiftKey) {
      if (active === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  private _onBackdropClick(): void {
    if (this.closeOnBackdropClick) {
      this._requestClose('backdrop');
    }
  }

  private _onCloseClick(): void {
    this._requestClose('close-button');
  }

  private _onFooterSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    this._hasFooter = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private _onHeaderSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    this._hasHeaderSlot = slot.assignedNodes({ flatten: true }).length > 0;
  }

  // ── Render helpers ──────────────────────────────────────────────────────────

  private _renderDefaultHeader() {
    return html`
      <div class="header-text">
        <h2 part="title" id=${this._titleId}>${this.title}</h2>
        ${this.subtitle
          ? html`<p part="subtitle">${this.subtitle}</p>`
          : nothing}
      </div>
      ${!this.preventClose
        ? html`
            <div class="close-btn-wrap" part="close">
              <so-button
                class="close-btn"
                variant="ghost"
                icon-only
                size="lg"
                label="Close dialog"
                aria-label="Close dialog"
                @so-click=${this._onCloseClick}
              >
                <so-icon slot="prefix" name="close-thin" decorative></so-icon>
              </so-button>
            </div>
          `
        : nothing}
    `;
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  override render() {
    const isVisible = this._visible;
    // When using a custom header slot, fall back to aria-label on the dialog itself.
    const ariaLabelledby = !this._hasHeaderSlot ? this._titleId : nothing;
    const ariaLabel = this._hasHeaderSlot ? this.title || nothing : nothing;

    return html`
      <!-- Backdrop -->
      <div
        part="backdrop"
        class=${classMap({ 'is-visible': isVisible })}
        aria-hidden="true"
        @click=${this._onBackdropClick}
      ></div>

      <!-- Dialog -->
      <div
        part="dialog"
        class=${classMap({ 'is-visible': isVisible })}
        role="dialog"
        aria-modal="true"
        aria-labelledby=${ariaLabelledby}
        aria-label=${ariaLabel}
        aria-describedby=${this._bodyId}
        aria-busy=${this.loading ? 'true' : nothing}
        tabindex="-1"
        @keydown=${this._onTabKeyDown}
      >
        <!-- Header zone -->
        <div part="header">
          <!-- Named header slot (always in DOM for slotchange; hidden when unused) -->
          <div
            class="header-slot-container"
            ?hidden=${!this._hasHeaderSlot}
          >
            <slot
              name="header"
              @slotchange=${this._onHeaderSlotChange}
            ></slot>
          </div>

          ${!this._hasHeaderSlot ? this._renderDefaultHeader() : nothing}
        </div>

        <!-- Body zone (default slot, scrollable) -->
        <div part="body" id=${this._bodyId}>
          <slot></slot>
        </div>

        <!-- Footer zone (only shown when populated) -->
        <div part="footer" ?hidden=${!this._hasFooter}>
          <slot name="footer" @slotchange=${this._onFooterSlotChange}></slot>
        </div>

        <!-- Loading overlay -->
        ${this.loading
          ? html`
              <div part="loader">
                <so-loader size="lg" variant="arc"></so-loader>
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-modal': SoModal;
  }
}
