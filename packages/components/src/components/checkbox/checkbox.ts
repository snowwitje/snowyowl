import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { checkboxStyles } from './checkbox.styles.js';
import type { CheckboxChangeDetail } from './checkbox.types.js';

/* ── Inline icons ──────────────────────────────────────────────────────────── */

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

/**
 * `so-checkbox` — SnowyOwl Checkbox component.
 *
 * States: unchecked | checked | indeterminate
 * Extras: disabled, skeleton, error, warning, touch (44px target)
 *
 * @slot - Checkbox value label (the text next to the box)
 *
 * @csspart base    - The hidden native <input type="checkbox">
 * @csspart control - The visible 16×16 box <span>
 * @csspart label   - The optional field label above the checkbox
 * @csspart helper  - The optional helper text below the label
 * @csspart value   - The wrapper around the slotted value text
 * @csspart error   - The error feedback message
 * @csspart warning - The warning feedback message
 *
 * @fires so-change - Fired on user interaction.
 *   detail: { checked: boolean, indeterminate: boolean }
 *
 * @example
 * <so-checkbox name="accept">I accept the terms</so-checkbox>
 *
 * @example
 * <so-checkbox
 *   label="Preferences"
 *   helper-text="Select all that apply"
 *   checked
 * >
 *   Receive notifications
 * </so-checkbox>
 *
 * @example
 * <so-checkbox error-text="This field is required">
 *   Subscribe to newsletter
 * </so-checkbox>
 */
@customElement('so-checkbox')
export class SoCheckbox extends LitElement {
  static styles = checkboxStyles;

  /* ── Props ── */

  /** Optional field label displayed above the checkbox row. */
  @property({ type: String }) label = '';

  /** Optional helper text displayed below the field label. */
  @property({ type: String, attribute: 'helper-text' }) helperText = '';

  /** Checked state — reflected as attribute for CSS state selectors. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /**
   * Indeterminate state — reflects as attribute.
   * When true, renders a horizontal bar instead of a checkmark.
   * The native input's `indeterminate` DOM property is set accordingly.
   */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /** Disabled — blocks interaction and dims the control. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Skeleton loading state — shows animated placeholders.
   * Blocks all interaction while active.
   */
  @property({ type: Boolean, reflect: true }) skeleton = false;

  /**
   * Touch mode — enforces a 44px minimum touch target height
   * to meet WCAG 2.5.8 / mobile accessibility requirements.
   */
  @property({ type: Boolean, reflect: true }) touch = false;

  /** Error message. When present, takes precedence over warning-text. */
  @property({ type: String, attribute: 'error-text' }) errorText = '';

  /** Warning message. Only shown when error-text is absent. */
  @property({ type: String, attribute: 'warning-text' }) warningText = '';

  /** Native form field name. */
  @property({ type: String }) name = '';

  /**
   * The value submitted with the form when checked.
   * Defaults to the string "on" (same as native checkbox).
   */
  @property({ type: String }) value = 'on';

  /** Marks the field as required for form validation. */
  @property({ type: Boolean }) required = false;

  /* ── Internal ── */

  private _handleChange(e: Event) {
    if (this.disabled || this.skeleton) return;
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = input.indeterminate;
    this.dispatchEvent(
      new CustomEvent<CheckboxChangeDetail>('so-change', {
        detail: { checked: this.checked, indeterminate: this.indeterminate },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const showError = !!this.errorText;
    const showWarning = !showError && !!this.warningText;

    const describedBy = [
      this.helperText ? 'so-helper' : '',
      showError ? 'so-error' : showWarning ? 'so-warning' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="wrapper">
        ${this.label
          ? html`<span part="label">${this.label}</span>`
          : nothing}

        ${this.helperText
          ? html`<span part="helper" id="so-helper">${this.helperText}</span>`
          : nothing}

        <label class="row">
          <!-- Hidden native input — part="base" per API contract -->
          <input
            part="base"
            type="checkbox"
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            .value=${this.value}
            ?disabled=${this.disabled || this.skeleton}
            ?required=${this.required}
            name=${this.name || nothing}
            aria-invalid=${showError ? 'true' : nothing}
            aria-describedby=${describedBy || nothing}
            @change=${this._handleChange}
          />

          <!-- Visual 16×16 box — part="control" per API contract.
               Both marks are always in the DOM; opacity is controlled by CSS
               via :host([checked]) and :host([indeterminate]) so the layout
               never changes when the user checks or unchecks the box. -->
          <span part="control" aria-hidden="true">
            <svg class="checkmark" viewBox="0 0 10 8" fill="none" aria-hidden="true">
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="indeterminate-bar"></span>
          </span>

          <!-- Slotted value label -->
          <span part="value"><slot></slot></span>
        </label>

        <!-- Error message (takes precedence over warning) -->
        ${showError
          ? html`
              <span part="error" class="feedback" id="so-error" role="alert">
                ${errorIconSvg}
                ${this.errorText}
              </span>
            `
          : nothing}

        <!-- Warning message (only when no error) -->
        ${showWarning
          ? html`
              <span part="warning" class="feedback" id="so-warning">
                ${warningIconSvg}
                ${this.warningText}
              </span>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-checkbox': SoCheckbox;
  }
}
