import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toastProviderStyles } from './toast-provider.styles.js';
import type { SoToast } from './toast.js';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

function slideDirectionForPosition(position: ToastPosition): 'right' | 'left' | 'top' | 'bottom' {
  if (position === 'top-right' || position === 'bottom-right') return 'right';
  if (position === 'top-left' || position === 'bottom-left') return 'left';
  if (position === 'top-center') return 'top';
  return 'bottom'; // bottom-center
}

/**
 * `so-toast-provider` — Fixed-position container that manages the toast stack.
 *
 * Place once in the app root:
 * ```html
 * <so-toast-provider position="top-right"></so-toast-provider>
 * ```
 *
 * Programmatic usage via `SoToast.show()`:
 * ```typescript
 * import { SoToast } from '@snowyowl/components';
 * SoToast.show({ type: 'success', message: 'Saved!' });
 * ```
 */
@customElement('so-toast-provider')
export class SoToastProvider extends LitElement {
  static styles = toastProviderStyles;

  /** Viewport position of the toast stack */
  @property({ type: String, reflect: true }) position: ToastPosition = 'top-right';

  /** Maximum number of toasts shown simultaneously. Excess are queued. */
  @property({ type: Number, attribute: 'max-visible' }) maxVisible = 3;

  private _queue: SoToast[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('so-toast-request', this._onToastRequest as EventListener);
    this.addEventListener('so-dismiss', this._onToastDismiss as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('so-toast-request', this._onToastRequest as EventListener);
    this.removeEventListener('so-dismiss', this._onToastDismiss as EventListener);
  }

  private _onToastRequest = (e: CustomEvent<{ toast: SoToast }>) => {
    const toast = e.detail.toast;
    // Set slide direction based on provider position
    toast.slideFrom = slideDirectionForPosition(this.position);

    const visible = this._visibleCount();
    if (visible < this.maxVisible) {
      this._show(toast);
    } else {
      this._queue.push(toast);
    }
  };

  private _onToastDismiss = () => {
    // After a toast is removed, show the next queued one
    if (this._queue.length > 0) {
      const next = this._queue.shift()!;
      next.slideFrom = slideDirectionForPosition(this.position);
      this._show(next);
    }
  };

  private _show(toast: SoToast) {
    this.appendChild(toast);
  }

  private _visibleCount(): number {
    return this.querySelectorAll('so-toast').length;
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-toast-provider': SoToastProvider;
  }
}
