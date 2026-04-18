import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { radioStyles } from './radio.styles.js';
import type { RadioChangeDetail } from './radio.types.js';

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
 * `so-radio` — SnowyOwl Radio Button component.
 *
 * States: unchecked | checked
 * Extras: disabled, skeleton, error, warning, touch (44px target)
 *
 * @slot - Radio value label (the text next to the circle)
 *
 * @csspart base    - The hidden native <input type="radio">
 * @csspart control - The visible 16×16 circle <span>
 * @csspart label   - The optional field label above the radio
 * @csspart helper  - The optional helper text below the label
 * @csspart value   - The wrapper around the slotted value text
 * @csspart error   - The error feedback message
 * @csspart warning - The warning feedback message
 *
 * @fires so-change - Fired on user interaction.
 *   detail: { checked: boolean, value: string }
 *
 * @example
 * <so-radio name="size" value="sm">Small</so-radio>
 *
 * @example
 * <so-radio
 *   label="Preferences"
 *   helper-text="Choose one"
 *   name="pref"
 *   value="a"
 *   checked
 * >
 *   Option A
 * </so-radio>
 */
@customElement('so-radio')
export class SoRadio extends LitElement {
  static styles = radioStyles;

  /* ── Props ── */

  /** Optional field label displayed above the radio row. */
  @property({ type: String }) label = '';

  /** Optional helper text displayed below the field label. */
  @property({ type: String, attribute: 'helper-text' }) helperText = '';

  /** Checked state — reflected as attribute for CSS state selectors. */
  @property({ type: Boolean, reflect: true }) checked = false;

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
   * Defaults to the string "on" (same as native radio).
   */
  @property({ type: String }) value = 'on';

  /** Marks the field as required for form validation. */
  @property({ type: Boolean }) required = false;

  /* ── Internal ── */

  private _handleChange(e: Event) {
    if (this.disabled || this.skeleton) return;
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(
      new CustomEvent<RadioChangeDetail>('so-change', {
        detail: { checked: this.checked, value: this.value },
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
            type="radio"
            .checked=${this.checked}
            .value=${this.value}
            ?disabled=${this.disabled || this.skeleton}
            ?required=${this.required}
            name=${this.name || nothing}
            aria-invalid=${showError ? 'true' : nothing}
            aria-describedby=${describedBy || nothing}
            @change=${this._handleChange}
          />

          <!-- Visual 16×16 circle — part="control" per API contract.
               Inner dot is rendered via ::after pseudo-element, toggled by
               :host([checked]) so no layout shift occurs on state change. -->
          <span part="control" ?data-error=${showError} aria-hidden="true"></span>

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
    'so-radio': SoRadio;
  }
}
