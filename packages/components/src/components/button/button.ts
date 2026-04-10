import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
  static styles = css`
    :host {
      display: inline-flex;
    }

    :host([full-width]) {
      display: flex;
      width: 100%;
    }

    /* ── Base ── */
    [part='base'] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--so-btn-gap);
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      text-decoration: none;
      width: 100%;

      /* Sizing — set by size host selectors */
      height: var(--so-btn-height);
      padding: 0 var(--so-btn-padding-h);
      min-width: var(--so-btn-height);

      /* Typography */
      font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
      font-size: var(--so-btn-font-size);
      font-weight: 500;
      line-height: var(--so-btn-line-height);
      letter-spacing: var(--so-btn-letter-spacing, 0);

      /* Shape — driven by semantic tokens */
      border-radius: var(--soSemanticRadiusComponent, 8px);
      border: 0 solid transparent;

      /* Colors — driven by variant host selectors */
      background: var(--so-btn-bg);
      color: var(--so-btn-color);
      border-width: var(--so-btn-border-width, 0);
      border-color: var(--so-btn-border-color, transparent);

      /* Transitions */
      transition:
        background-color 120ms ease,
        color 120ms ease,
        border-color 120ms ease,
        box-shadow 120ms ease,
        opacity 120ms ease;

      -webkit-appearance: none;
      appearance: none;
    }

    /* ── Focus ── */
    [part='base']:focus-visible {
      outline: none;
      box-shadow: var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
    }

    /* ── Icon sizing via slotted so-icon ── */
    ::slotted(so-icon) {
      --so-icon-size: var(--so-btn-icon-size);
      flex-shrink: 0;
    }

    /* ════════════════
       SIZES
    ════════════════ */

    /* sm — 32px */
    :host([size='sm']) [part='base'],
    :host(:not([size])) [part='base'] {
      --so-btn-height:        32px;
      --so-btn-padding-h:     12px;
      --so-btn-font-size:     12px;
      --so-btn-line-height:   14px;
      --so-btn-letter-spacing: 0.025em;
      --so-btn-gap:           8px;
      --so-btn-icon-size:     12px;
    }

    /* md — 40px (default) */
    :host([size='md']) [part='base'] {
      --so-btn-height:        40px;
      --so-btn-padding-h:     16px;
      --so-btn-font-size:     14px;
      --so-btn-line-height:   17px;
      --so-btn-letter-spacing: 0;
      --so-btn-gap:           12px;
      --so-btn-icon-size:     16px;
    }

    /* lg — 48px */
    :host([size='lg']) [part='base'] {
      --so-btn-height:        48px;
      --so-btn-padding-h:     20px;
      --so-btn-font-size:     16px;
      --so-btn-line-height:   19px;
      --so-btn-letter-spacing: 0;
      --so-btn-gap:           16px;
      --so-btn-icon-size:     20px;
    }

    /* ── Icon-only: square, no horizontal padding ── */
    :host([icon-only]) [part='base'],
    :host([icon-circle]) [part='base'] {
      padding: 0;
      width: var(--so-btn-height);
      min-width: var(--so-btn-height);
    }

    /* ── Icon-circle: pill radius via badge token ── */
    :host([icon-circle]) [part='base'] {
      border-radius: var(--soSemanticRadiusBadge, 500px);
    }

    /* ── Full width ── */
    :host([full-width]) [part='base'] {
      width: 100%;
    }

    /* ════════════════
       VARIANTS
    ════════════════ */

    /* Primary */
    :host([variant='primary']) [part='base'],
    :host(:not([variant])) [part='base'] {
      --so-btn-bg:    var(--soSemanticColorInteractivePrimary, #6f5a7e);
      --so-btn-color: var(--soSemanticColorInteractiveActionText, #ffffff);
    }
    :host([variant='primary']:not([disabled]):not([skeleton])) [part='base']:hover,
    :host(:not([variant]):not([disabled]):not([skeleton])) [part='base']:hover {
      --so-btn-bg: var(--soSemanticColorInteractivePrimaryHover, #5a5160);
    }
    :host([variant='primary']:not([disabled]):not([skeleton])) [part='base']:active,
    :host(:not([variant]):not([disabled]):not([skeleton])) [part='base']:active {
      --so-btn-bg: var(--soSemanticColorInteractivePrimaryActive, #433c4a);
    }

    /* Secondary */
    :host([variant='secondary']) [part='base'] {
      --so-btn-bg:    var(--soSemanticColorInteractiveSecondary, #1f2937);
      --so-btn-color: var(--soSemanticColorInteractiveActionText, #ffffff);
    }
    :host([variant='secondary']:not([disabled]):not([skeleton])) [part='base']:hover {
      --so-btn-bg: var(--soSemanticColorInteractiveSecondaryHover, #111827);
    }
    :host([variant='secondary']:not([disabled]):not([skeleton])) [part='base']:active {
      --so-btn-bg: var(--soSemanticColorInteractiveSecondaryActive, #030712);
    }

    /* Outline */
    :host([variant='outline']) [part='base'] {
      --so-btn-bg:           transparent;
      --so-btn-color:        var(--soSemanticColorInteractivePrimary, #6f5a7e);
      --so-btn-border-width: 1.5px;
      --so-btn-border-color: var(--soSemanticColorInteractivePrimary, #6f5a7e);
    }
    :host([variant='outline']:not([disabled]):not([skeleton])) [part='base']:hover {
      --so-btn-bg:           var(--soSemanticColorInteractiveGhostHover, #f5ede8);
      --so-btn-color:        var(--soSemanticColorInteractivePrimaryHover, #5a5160);
      --so-btn-border-color: var(--soSemanticColorInteractivePrimaryHover, #5a5160);
    }
    :host([variant='outline']:not([disabled]):not([skeleton])) [part='base']:active {
      --so-btn-bg:           var(--soSemanticColorInteractiveGhostActive, #ede0d8);
      --so-btn-color:        var(--soSemanticColorInteractivePrimaryActive, #433c4a);
      --so-btn-border-color: var(--soSemanticColorInteractivePrimaryActive, #433c4a);
    }

    /* Ghost */
    :host([variant='ghost']) [part='base'] {
      --so-btn-bg:    transparent;
      --so-btn-color: var(--soSemanticColorTextDefault, #1f2937);
    }
    :host([variant='ghost']:not([disabled]):not([skeleton])) [part='base']:hover {
      --so-btn-bg: var(--soSemanticColorInteractiveGhostHover, #f5ede8);
    }
    :host([variant='ghost']:not([disabled]):not([skeleton])) [part='base']:active {
      --so-btn-bg: var(--soSemanticColorInteractiveGhostActive, #ede0d8);
    }

    /* Danger */
    :host([variant='danger']) [part='base'] {
      --so-btn-bg:    var(--soSemanticColorInteractiveDanger, #bb1637);
      --so-btn-color: var(--soSemanticColorInteractiveActionText, #ffffff);
    }
    :host([variant='danger']:not([disabled]):not([skeleton])) [part='base']:hover {
      --so-btn-bg: var(--soSemanticColorInteractiveDangerHover, #95020e);
    }
    :host([variant='danger']:not([disabled]):not([skeleton])) [part='base']:active {
      --so-btn-bg: var(--soSemanticColorInteractiveDangerActive, #7f1d1d);
    }

    /* ════════════════
       STATES
    ════════════════ */

    /* Disabled */
    :host([disabled]) {
      pointer-events: none;
    }
    :host([disabled]) [part='base'] {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Skeleton */
    :host([skeleton]) [part='base'] {
      --so-btn-bg:           var(--soSemanticColorSurfaceSkeleton, #d1d5db);
      --so-btn-color:        transparent;
      --so-btn-border-color: transparent;
      pointer-events: none;
      animation: so-skeleton-pulse 1.5s ease-in-out infinite;
    }
    :host([skeleton]) ::slotted(*) {
      opacity: 0;
    }

    @keyframes so-skeleton-pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.5; }
    }
  `;

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
