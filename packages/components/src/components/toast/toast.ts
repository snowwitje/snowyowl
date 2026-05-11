import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toastStyles } from './toast.styles.js';
import type { NotificationType, NotificationDismissDetail, ToastShowOptions } from '../notification/notification.types.js';

/* ── Status icons (inline SVG — no sprite dependency) ─────────────────────── */

const errorIcon = html`
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="8" fill="currentColor" />
    <path d="M8 4.5v4" stroke="white" stroke-width="1.5" stroke-linecap="round" />
    <circle cx="8" cy="11.25" r="1" fill="white" />
  </svg>
`;

const warningIcon = html`
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M7.134 1.5a1 1 0 0 1 1.732 0l6.062 10.5A1 1 0 0 1 14.062 13.5H1.938a1 1 0 0 1-.866-1.5L7.134 1.5Z"
      fill="currentColor"
    />
    <path d="M8 6v3.5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
    <circle cx="8" cy="11.5" r="1" fill="white" />
  </svg>
`;

const successIcon = html`
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="8" fill="currentColor" />
    <path
      d="M4.5 8l2.5 2.5 5-5"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;

const infoIcon = html`
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="8" fill="currentColor" />
    <path d="M8 7v5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
    <circle cx="8" cy="4.75" r="1" fill="white" />
  </svg>
`;

const ICONS: Record<NotificationType, ReturnType<typeof html>> = {
  error:   errorIcon,
  warning: warningIcon,
  success: successIcon,
  info:    infoIcon,
};

/**
 * `so-toast` — SnowyOwl toast notification.
 *
 * Use programmatically via `SoToast.show(options)` or place `<so-toast>` elements
 * inside a `<so-toast-provider>`.
 *
 * @csspart base      - Outer container
 * @csspart icon      - Status icon wrapper
 * @csspart title     - Title text element
 * @csspart message   - Message text element
 * @csspart timestamp - Timestamp text element
 * @csspart action    - Action button wrapper
 * @csspart close     - Dismiss button
 *
 * @fires so-dismiss - Fired when the toast is dismissed
 */
@customElement('so-toast')
export class SoToast extends LitElement {
  static styles = toastStyles;

  /** Status type */
  @property({ type: String, reflect: true }) type: NotificationType = 'info';

  /** Optional bold title */
  @property({ type: String }) title = '';

  /** Main message text */
  @property({ type: String }) message = '';

  /** Optional timestamp rendered below the message in caption style */
  @property({ type: String }) timestamp = '';

  /** When true, renders a dismiss button (default: true) */
  @property({ type: Boolean, reflect: true }) dismissible = true;

  /** Auto-dismiss delay in ms. 0 = no auto-dismiss. */
  @property({ type: Number, attribute: 'auto-dismiss' }) autoDismiss = 5000;

  /** Label for optional action button */
  @property({ type: String, attribute: 'action-label' }) actionLabel = '';

  /** Callback invoked when the action button is clicked */
  onAction?: () => void;

  /** Direction from which this toast slides in (set by provider) */
  @property({ type: String, reflect: true, attribute: 'slide-from' }) slideFrom: 'right' | 'left' | 'top' | 'bottom' = 'right';

  private _autoDismissTimer?: ReturnType<typeof setTimeout>;
  private _remainingMs = 0;
  private _timerStartedAt = 0;

  /* ── Lifecycle ── */

  connectedCallback() {
    super.connectedCallback();

    // Trigger entrance animation on next frame
    requestAnimationFrame(() => {
      this.classList.add('so-toast-enter');
    });

    this._startAutoDismiss();
    document.addEventListener('visibilitychange', this._onVisibilityChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearAutoDismiss();
    document.removeEventListener('visibilitychange', this._onVisibilityChange);
  }

  /* ── Auto-dismiss ── */

  private _startAutoDismiss() {
    if (this.autoDismiss <= 0) return;
    this._remainingMs = this.autoDismiss;
    this._scheduleTimer();
  }

  private _scheduleTimer() {
    this._timerStartedAt = Date.now();
    this._autoDismissTimer = setTimeout(() => {
      this._dismiss('auto-dismiss');
    }, this._remainingMs);
  }

  private _clearAutoDismiss() {
    if (this._autoDismissTimer !== undefined) {
      clearTimeout(this._autoDismissTimer);
      this._autoDismissTimer = undefined;
    }
  }

  private _onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      // Pause: record remaining time
      this._clearAutoDismiss();
      const elapsed = Date.now() - this._timerStartedAt;
      this._remainingMs = Math.max(0, this._remainingMs - elapsed);
    } else {
      // Resume
      if (this._remainingMs > 0) {
        this._scheduleTimer();
      }
    }
  };

  /* ── Dismiss ── */

  private _dismiss(reason: NotificationDismissDetail['reason']) {
    this._clearAutoDismiss();
    this.classList.add('so-toast-exit');

    const onEnd = () => {
      this.removeEventListener('transitionend', onEnd);
      this.dispatchEvent(
        new CustomEvent<NotificationDismissDetail>('so-dismiss', {
          detail: { reason },
          bubbles: true,
          composed: true,
        }),
      );
      this.remove();
    };

    this.addEventListener('transitionend', onEnd);
  }

  /* ── Programmatic API ── */

  /**
   * Display a toast notification.
   * Finds the first `<so-toast-provider>` in the document and appends a new toast.
   */
  static show(options: ToastShowOptions) {
    const provider = document.querySelector('so-toast-provider') as HTMLElement | null;
    if (!provider) {
      console.warn('[so-toast] No <so-toast-provider> found in the document.');
      return;
    }

    const toast = document.createElement('so-toast') as SoToast;
    toast.type = options.type;
    toast.title = options.title ?? '';
    toast.message = options.message;
    toast.timestamp = options.timestamp ?? '';
    toast.dismissible = options.dismissible ?? true;
    toast.autoDismiss = options.autoDismiss ?? 5000;
    toast.actionLabel = options.actionLabel ?? '';
    toast.onAction = options.onAction;

    // Let provider handle appending (respects maxVisible queue)
    provider.dispatchEvent(
      new CustomEvent('so-toast-request', {
        detail: { toast },
        bubbles: false,
      }),
    );
  }

  private _role() {
    return this.type === 'error' || this.type === 'warning' ? 'alert' : 'status';
  }

  render() {
    return html`
      <div
        part="base"
        role=${this._role()}
      >
        <span part="icon">${ICONS[this.type]}</span>

        <div class="text-zone">
          ${this.title
            ? html`<span part="title">${this.title}</span>`
            : nothing}
          ${this.message
            ? html`<span part="message">${this.message}</span>`
            : nothing}
          ${this.timestamp
            ? html`<span part="timestamp">${this.timestamp}</span>`
            : nothing}
          ${this.actionLabel
            ? html`
              <div part="action">
                <so-button
                  variant="outline"
                  size="sm"
                  @so-click=${() => this.onAction?.()}
                >${this.actionLabel}</so-button>
              </div>
            `
            : nothing}
        </div>

        ${this.dismissible
          ? html`
            <so-button
              part="close"
              variant="ghost"
              size="sm"
              icon-only
              label="Dismiss notification"
              aria-label="Dismiss notification"
              @so-click=${() => this._dismiss('close-button')}
            >
              <svg slot="prefix" viewBox="0 0 16 16" fill="none" aria-hidden="true" width="16" height="16">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </so-button>
          `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-toast': SoToast;
  }
}
