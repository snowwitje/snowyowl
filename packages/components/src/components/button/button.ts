import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buttonStyles } from './button.styles.js';
import type { ButtonVariant, ButtonSize, ButtonType } from './button.types.js';

/**
 * `so-button` — SnowyOwl Button component.
 *
 * Variants: primary | secondary | outline | ghost | danger
 * Sizes:    sm (32px) | md (40px) | lg (48px)
 * Types:    text+icon | icon-only (square) | icon-circle (pill)
 *
 * @slot         - Button label text
 * @slot prefix  - Icon before the label
 * @slot suffix  - Icon after the label
 *
 * @csspart base - The inner <button> element
 *
 * @fires so-click - Fired on click (suppressed when disabled or skeleton)
 *
 * @example
 * <so-button variant="primary" size="md">Save</so-button>
 *
 * @example
 * <so-button variant="primary" size="md">
 *   <so-icon slot="prefix" name="check" decorative></so-icon>
 *   Confirm
 * </so-button>
 *
 * @example
 * <!-- Icon-only — always provide label for screen readers -->
 * <so-button variant="ghost" size="md" icon-only label="Close">
 *   <so-icon slot="prefix" name="close" decorative></so-icon>
 * </so-button>
 */
@customElement('so-button')
export class SoButton extends LitElement {

  static styles = buttonStyles;

  /** Visual style variant */
  @property({ type: String, reflect: true }) variant: ButtonVariant = 'primary';

  /** Size — sm (32px) | md (40px) | lg (48px) */
  @property({ type: String, reflect: true }) size: ButtonSize = 'md';

  /** Native button type */
  @property({ type: String }) type: ButtonType = 'button';

  /** Disabled state */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Skeleton loading state — shows animated placeholder */
  @property({ type: Boolean, reflect: true }) skeleton = false;

  /** Square icon-only button — hides label slot, square aspect ratio */
  @property({ type: Boolean, reflect: true, attribute: 'icon-only' }) iconOnly = false;

  /** Circular icon-only button — pill border-radius, square aspect ratio */
  @property({ type: Boolean, reflect: true, attribute: 'icon-circle' }) iconCircle = false;

  /** Stretch to container width */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' }) fullWidth = false;

  /**
   * Accessible label — required when using icon-only or icon-circle
   * without visible text content.
   */
  @property({ type: String }) label = '';

  private _handleClick(e: MouseEvent) {
    if (this.disabled || this.skeleton) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent('so-click', { bubbles: true, composed: true }));
  }

  render() {
    const isIconOnly = this.iconOnly || this.iconCircle;

    return html`
      <button
        part="base"
        type=${this.type}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-label=${isIconOnly && this.label ? this.label : nothing}
        aria-busy=${this.skeleton ? 'true' : nothing}
        @click=${this._handleClick}
      >
        <slot name="prefix"></slot>
        ${isIconOnly ? nothing : html`<slot></slot>`}
        <slot name="suffix"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-button': SoButton;
  }
}
