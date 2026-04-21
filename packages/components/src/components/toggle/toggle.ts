import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toggleStyles } from './toggle.styles.js';
import type { ToggleChangeDetail } from './toggle.types.js';

/**
 * `so-toggle` — SnowyOwl Toggle (switch) component.
 *
 * States: unchecked | checked
 * Extras: disabled, skeleton, touch (44px target)
 *
 * @slot - Toggle value label (the text next to the track)
 *
 * @csspart base    - The hidden native <input type="checkbox" role="switch">
 * @csspart control - The visible 48×24px pill track
 * @csspart thumb   - The 18×18px sliding circle inside the track
 * @csspart label   - The optional field label above the row
 * @csspart helper  - The optional helper text below the label
 * @csspart value   - The wrapper around the slotted value text
 *
 * @fires so-change - Fired on user interaction.
 *   detail: { checked: boolean, value: string }
 *
 * @example
 * <so-toggle name="notifications">Email notifications</so-toggle>
 *
 * @example
 * <so-toggle
 *   label="Preferences"
 *   helper-text="Toggle to enable"
 *   checked
 * >
 *   Dark mode
 * </so-toggle>
 */
@customElement('so-toggle')
export class SoToggle extends LitElement {
  static styles = toggleStyles;

  /* ── Props ── */

  /** Optional field label displayed above the toggle row. */
  @property({ type: String }) label = '';

  /** Optional helper text displayed below the field label. */
  @property({ type: String, attribute: 'helper-text' }) helperText = '';

  /** Checked (on) state — reflected as attribute for CSS state selectors. */
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

  /** Native form field name. */
  @property({ type: String }) name = '';

  /**
   * The value submitted with the form when checked.
   * Defaults to "on" (same as native checkbox).
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
      new CustomEvent<ToggleChangeDetail>('so-change', {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const describedBy = this.helperText ? 'so-helper' : undefined;

    return html`
      <div class="wrapper">
        ${this.label
          ? html`<span part="label">${this.label}</span>`
          : nothing}

        ${this.helperText
          ? html`<span part="helper" id="so-helper">${this.helperText}</span>`
          : nothing}

        <label class="row">
          <!-- Hidden native input — role="switch" for toggle semantics -->
          <input
            part="base"
            type="checkbox"
            role="switch"
            .checked=${this.checked}
            .value=${this.value}
            ?disabled=${this.disabled || this.skeleton}
            ?required=${this.required}
            name=${this.name || nothing}
            aria-describedby=${describedBy || nothing}
            @change=${this._handleChange}
          />

          <!-- Visual pill track — part="control" per API contract -->
          <span part="control" aria-hidden="true">
            <!-- Sliding thumb circle -->
            <span part="thumb"></span>
          </span>

          <!-- Slotted value label -->
          <span part="value"><slot></slot></span>
        </label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-toggle': SoToggle;
  }
}
