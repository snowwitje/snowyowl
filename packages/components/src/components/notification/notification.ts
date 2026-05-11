import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { notificationStyles } from './notification.styles.js';
import type { NotificationType, NotificationDismissDetail } from './notification.types.js';

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
 * `so-notification` — SnowyOwl inline notification component.
 *
 * Renders a status-typed inline notification with optional title, message,
 * and dismiss button. Supports slotted rich content in place of the message prop.
 *
 * @slot         - Rich content replacing the `message` prop when `message` is empty
 *
 * @csspart base    - Outer container
 * @csspart icon    - Status icon wrapper
 * @csspart title   - Title text element
 * @csspart message - Message text element
 * @csspart close   - Dismiss button
 *
 * @fires so-dismiss - Fired when the notification is dismissed
 *
 * @example
 * <so-notification type="error" title="Upload failed" message="File exceeds 10 MB limit." dismissible></so-notification>
 *
 * @example
 * <so-notification type="success" message="Your changes have been saved."></so-notification>
 */
@customElement('so-notification')
export class SoNotification extends LitElement {
  static styles = notificationStyles;

  /** Status type — controls icon, border, and background colors */
  @property({ type: String, reflect: true }) type: NotificationType = 'info';

  /** Optional bold title rendered above the message */
  @property({ type: String }) title = '';

  /** Main message text. Use the default slot for rich content instead. */
  @property({ type: String }) message = '';

  /** When true, renders a dismiss (×) button */
  @property({ type: Boolean, reflect: true }) dismissible = false;

  private _handleClose() {
    this.classList.add('so-dismissing');

    const base = this.shadowRoot?.querySelector('[part="base"]') as HTMLElement | null;
    if (!base) {
      this._finishDismiss('close-button');
      return;
    }

    const onEnd = () => {
      base.removeEventListener('transitionend', onEnd);
      this._finishDismiss('close-button');
    };
    base.addEventListener('transitionend', onEnd);
  }

  private _finishDismiss(reason: NotificationDismissDetail['reason']) {
    this.classList.remove('so-dismissing');
    this.classList.add('so-dismissed');
    this.dispatchEvent(
      new CustomEvent<NotificationDismissDetail>('so-dismiss', {
        detail: { reason },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _role() {
    return this.type === 'error' || this.type === 'warning' ? 'alert' : 'status';
  }

  private _ariaLive() {
    return this.type === 'error' || this.type === 'warning' ? 'assertive' : 'polite';
  }

  render() {
    return html`
      <div
        part="base"
        role=${this._role()}
        aria-live=${this._ariaLive()}
      >
        <span part="icon">${ICONS[this.type]}</span>

        <div class="text-zone">
          ${this.title
            ? html`<span part="title">${this.title}</span>`
            : nothing}
          ${this.message
            ? html`<span part="message">${this.message}</span>`
            : html`<span part="message"><slot></slot></span>`}
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
              @so-click=${this._handleClose}
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
    'so-notification': SoNotification;
  }
}
