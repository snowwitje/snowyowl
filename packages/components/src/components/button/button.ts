import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * `so-button` — SnowyOwl Button component.
 *
 * @slot - Default slot for button label content
 * @slot prefix - Icon or element before the label
 * @slot suffix - Icon or element after the label
 *
 * @csspart base - The inner button element
 *
 * @fires so-click - Fired on click (not fired when disabled)
 */
@customElement('so-button')
export class SoButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }

    [part='base'] {
      /* Layout */
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--so-primitive-space-2);
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      border: var(--so-primitive-border-width-thin) solid transparent;

      /* Shape — driven by semantic tokens for theme-ability */
      border-radius: var(--so-semantic-radius-component);
      box-shadow: var(--so-semantic-shadow-component);

      /* Typography */
      font-family: var(--so-semantic-typography-family-body);
      font-weight: var(--so-semantic-typography-weight-label);
      line-height: var(--so-primitive-font-lineheight-tight);
      text-decoration: none;

      /* Transitions */
      transition:
        background-color var(--so-primitive-duration-fast) var(--so-primitive-easing-default),
        border-color var(--so-primitive-duration-fast) var(--so-primitive-easing-default),
        box-shadow var(--so-primitive-duration-fast) var(--so-primitive-easing-default),
        color var(--so-primitive-duration-fast) var(--so-primitive-easing-default);
    }

    /* ── Focus ── */
    [part='base']:focus-visible {
      outline: none;
      box-shadow: var(--so-semantic-shadow-focus);
    }

    /* ── Sizes ── */
    :host([size='sm']) [part='base'] {
      padding: var(--so-primitive-space-1) var(--so-primitive-space-3);
      font-size: var(--so-primitive-font-size-xs);
    }
    :host([size='md']) [part='base'],
    :host(:not([size])) [part='base'] {
      padding: var(--so-primitive-space-2) var(--so-primitive-space-4);
      font-size: var(--so-primitive-font-size-sm);
    }
    :host([size='lg']) [part='base'] {
      padding: var(--so-primitive-space-3) var(--so-primitive-space-6);
      font-size: var(--so-primitive-font-size-md);
    }

    /* ── Variants ── */
    :host([variant='primary']) [part='base'],
    :host(:not([variant])) [part='base'] {
      background-color: var(--so-semantic-color-interactive-primary);
      color: var(--so-semantic-color-text-inverse);
      border-color: var(--so-semantic-color-interactive-primary);
    }
    :host([variant='primary']:not([disabled])) [part='base']:hover,
    :host(:not([variant]):not([disabled])) [part='base']:hover {
      background-color: var(--so-semantic-color-interactive-primaryhover);
      border-color: var(--so-semantic-color-interactive-primaryhover);
    }
    :host([variant='primary']:not([disabled])) [part='base']:active,
    :host(:not([variant]):not([disabled])) [part='base']:active {
      background-color: var(--so-semantic-color-interactive-primaryactive);
    }

    :host([variant='secondary']) [part='base'] {
      background-color: var(--so-semantic-color-surface-default);
      color: var(--so-semantic-color-text-default);
      border-color: var(--so-semantic-color-border-default);
    }
    :host([variant='secondary']:not([disabled])) [part='base']:hover {
      background-color: var(--so-semantic-color-surface-subtle);
      border-color: var(--so-semantic-color-border-strong);
    }

    :host([variant='ghost']) [part='base'] {
      background-color: transparent;
      color: var(--so-semantic-color-text-default);
      border-color: transparent;
      box-shadow: none;
    }
    :host([variant='ghost']:not([disabled])) [part='base']:hover {
      background-color: var(--so-semantic-color-interactive-secondarysubtle);
    }

    :host([variant='danger']) [part='base'] {
      background-color: var(--so-semantic-color-status-error);
      color: var(--so-semantic-color-text-inverse);
      border-color: var(--so-semantic-color-status-error);
    }
    :host([variant='danger']:not([disabled])) [part='base']:hover {
      filter: brightness(0.9);
    }

    /* ── Disabled ── */
    :host([disabled]) {
      pointer-events: none;
    }
    :host([disabled]) [part='base'] {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }

    /* ── Full width ── */
    :host([full-width]) {
      width: 100%;
    }
    :host([full-width]) [part='base'] {
      width: 100%;
    }
  `;

  /** Visual style variant */
  @property({ type: String, reflect: true }) variant: ButtonVariant = 'primary';

  /** Size */
  @property({ type: String, reflect: true }) size: ButtonSize = 'md';

  /** Disabled state */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Stretch to full container width */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' }) fullWidth = false;

  /** Native button type (submit | button | reset) */
  @property({ type: String }) type: 'submit' | 'button' | 'reset' = 'button';

  private _handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent('so-click', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <button
        part="base"
        type=${this.type}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot name="prefix"></slot>
        <slot></slot>
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
