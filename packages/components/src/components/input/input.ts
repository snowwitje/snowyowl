import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { inputStyles } from './input.styles.js';
import type { InputInputDetail, InputChangeDetail } from './input.types.js';
// Note: <so-icon> is used for the password eye toggle.
// Consumers must import '@snowyowl/icons' once at app startup to register it.
// In Storybook this is handled by the story file and preview.ts.

/* ── Inline feedback icons ─────────────────────────────────────────────────── */

const errorIconSvg = html`
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="7" fill="currentColor" />
    <path d="M7 4v3.5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
    <circle cx="7" cy="10" r="0.875" fill="white" />
  </svg>
`;

const warningIconSvg = html`
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M6.134 1.5a1 1 0 0 1 1.732 0l5.196 9a1 1 0 0 1-.866 1.5H1.804a1 1 0 0 1-.866-1.5l5.196-9Z"
      fill="currentColor"
    />
    <path d="M7 5.5v3" stroke="white" stroke-width="1.5" stroke-linecap="round" />
    <circle cx="7" cy="10.25" r="0.875" fill="white" />
  </svg>
`;

const successIconSvg = html`
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="7" fill="currentColor" />
    <path
      d="M4 7l2 2 4-4"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;

/**
 * `so-input` — SnowyOwl Text Input component.
 *
 * Sizes: md (40px) | lg (48px)
 * States: default | hover | focus | disabled | error | warning | success | skeleton
 * Extras: prefix/suffix icon slots, password eye-toggle, character counter
 *
 * @slot prefix - Icon or element displayed inside the field on the left
 * @slot suffix - Icon or element displayed inside the field on the right
 *
 * @csspart base    - The native <input> element
 * @csspart control - The visible field wrapper (border, fill, icons)
 * @csspart label   - Field label above the control
 * @csspart helper  - Helper text below the label
 * @csspart prefix  - Prefix icon slot container
 * @csspart suffix  - Suffix icon slot container
 * @csspart counter - Character counter (shown when maxlength is set)
 * @csspart error   - Error feedback message
 * @csspart warning - Warning feedback message
 * @csspart success - Success/validation feedback message
 *
 * @fires so-input  - Fires on every keystroke. detail: { value: string }
 * @fires so-change - Fires on blur/commit. detail: { value: string }
 *
 * @example
 * <so-input label="Email" placeholder="you@example.com"></so-input>
 *
 * @example
 * <so-input
 *   label="Password"
 *   type="password"
 *   helper-text="At least 8 characters"
 *   success-text="Looks strong!"
 * ></so-input>
 *
 * @example
 * <so-input label="Search" maxlength="100" helper-text="Helper text goes here">
 *   <so-icon slot="prefix" name="search" size="sm" decorative></so-icon>
 * </so-input>
 */
@customElement('so-input')
export class SoInput extends LitElement {
  static styles = inputStyles;

  /* ── Props ── */

  /** Field label rendered above the input. */
  @property({ type: String }) label = '';

  /** Helper text rendered below the label, above the input. */
  @property({ type: String, attribute: 'helper-text' }) helperText = '';

  /** Current input value. */
  @property({ type: String }) value = '';

  /** Placeholder text shown when value is empty. */
  @property({ type: String }) placeholder = '';

  /** Native input type. Defaults to 'text'. When 'password', shows eye toggle automatically. */
  @property({ type: String }) type = 'text';

  /** Size variant — md = 40px height, lg = 48px height. */
  @property({ type: String, reflect: true }) size: 'md' | 'lg' = 'md';

  /** Disabled — blocks all interaction and dims the field. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Skeleton loading state — animated placeholder, blocks interaction. */
  @property({ type: Boolean, reflect: true }) skeleton = false;

  /** Marks the field as required for form validation. */
  @property({ type: Boolean }) required = false;

  /** Makes the input read-only. */
  @property({ type: Boolean }) readonly = false;

  /** Native form field name. */
  @property({ type: String }) name = '';

  /** Error message. Shown below the input. Takes precedence over warning and success. */
  @property({ type: String, attribute: 'error-text' }) errorText = '';

  /** Warning message. Shown below the input when no error is present. */
  @property({ type: String, attribute: 'warning-text' }) warningText = '';

  /** Success/validation message. Shown when no error or warning is present. */
  @property({ type: String, attribute: 'success-text' }) successText = '';

  /**
   * Maximum character count. When set, displays a `current/max` counter
   * on the label row and constrains input length.
   */
  @property({ type: Number }) maxlength?: number;

  /** Passed through to the native input's autocomplete attribute. */
  @property({ type: String }) autocomplete = '';

  /* ── Internal state ── */

  @state() private _charCount = 0;
  @state() private _showPassword = false;
  @state() private _hasPrefix = false;
  @state() private _hasSuffix = false;

  /* ── Lifecycle ── */

  protected updated(changed: Map<string | symbol, unknown>) {
    if (changed.has('value')) {
      this._charCount = this.value.length;
    }
  }

  /* ── Event handlers ── */

  private _handleInput(e: Event) {
    if (this.disabled || this.skeleton) return;
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this._charCount = this.value.length;
    this.dispatchEvent(
      new CustomEvent<InputInputDetail>('so-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleChange(e: Event) {
    if (this.disabled || this.skeleton) return;
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent<InputChangeDetail>('so-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _togglePassword() {
    this._showPassword = !this._showPassword;
  }

  private _onPrefixSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasPrefix = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private _onSuffixSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasSuffix = slot.assignedNodes({ flatten: true }).length > 0;
  }

  render() {
    const showError = !!this.errorText;
    const showWarning = !showError && !!this.warningText;
    const showSuccess = !showError && !showWarning && !!this.successText;
    const feedbackState = showError ? 'error' : showWarning ? 'warning' : showSuccess ? 'success' : '';

    const inputType = this.type === 'password' && this._showPassword ? 'text' : this.type;

    const describedBy = [
      this.helperText ? 'so-helper' : '',
      showError ? 'so-error' : showWarning ? 'so-warning' : showSuccess ? 'so-success' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const showLabelRow = !!this.label || this.maxlength !== undefined;

    return html`
      <div class="wrapper">

        ${showLabelRow
          ? html`
            <div class="label-row">
              ${this.label
                ? html`<label part="label" for="so-input-native">${this.label}</label>`
                : nothing}
              ${this.maxlength !== undefined
                ? html`<span part="counter">${this._charCount}/${this.maxlength}</span>`
                : nothing}
            </div>
          `
          : nothing}

        ${this.helperText
          ? html`<span part="helper" id="so-helper">${this.helperText}</span>`
          : nothing}

        <div
          part="control"
          data-feedback=${feedbackState || nothing}
        >
          <!-- Prefix icon slot — hidden when empty -->
          <span
            part="prefix"
            class=${`icon-slot${this._hasPrefix ? ' has-content' : ''}`}
          >
            <slot name="prefix" @slotchange=${this._onPrefixSlotChange}></slot>
          </span>

          <!-- Native input -->
          <input
            part="base"
            id="so-input-native"
            .value=${this.value}
            type=${inputType}
            placeholder=${this.placeholder || nothing}
            ?disabled=${this.disabled || this.skeleton}
            ?required=${this.required}
            ?readonly=${this.readonly}
            name=${this.name || nothing}
            maxlength=${this.maxlength ?? nothing}
            autocomplete=${this.autocomplete || nothing}
            aria-describedby=${describedBy || nothing}
            aria-invalid=${showError ? 'true' : nothing}
            @input=${this._handleInput}
            @change=${this._handleChange}
          />

          <!-- Password eye-toggle (automatic when type="password") -->
          ${this.type === 'password'
            ? html`
              <button
                type="button"
                class="eye-btn"
                aria-label=${this._showPassword ? 'Hide password' : 'Show password'}
                @click=${this._togglePassword}
              >
                <so-icon
                  name=${this._showPassword ? 'eye-off' : 'eye'}
                  size="sm"
                  decorative
                ></so-icon>
              </button>
            `
            : nothing}

          <!-- Suffix icon slot — hidden when empty, and not shown with password toggle -->
          ${this.type !== 'password'
            ? html`
              <span
                part="suffix"
                class=${`icon-slot${this._hasSuffix ? ' has-content' : ''}`}
              >
                <slot name="suffix" @slotchange=${this._onSuffixSlotChange}></slot>
              </span>
            `
            : nothing}
        </div>

        <!-- Error message (takes precedence) -->
        ${showError
          ? html`
            <span part="error" class="feedback" id="so-error" role="alert">
              ${errorIconSvg}
              ${this.errorText}
            </span>
          `
          : nothing}

        <!-- Warning message (when no error) -->
        ${showWarning
          ? html`
            <span part="warning" class="feedback" id="so-warning">
              ${warningIconSvg}
              ${this.warningText}
            </span>
          `
          : nothing}

        <!-- Success message (when no error or warning) -->
        ${showSuccess
          ? html`
            <span part="success" class="feedback" id="so-success">
              ${successIconSvg}
              ${this.successText}
            </span>
          `
          : nothing}

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-input': SoInput;
  }
}
