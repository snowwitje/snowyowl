import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toggleStyles } from './toggle.styles.js';
import type { ToggleChangeDetail } from './toggle.types.js';

/**
 * `so-toggle` — SnowyOwl Toggle (switch) component.
 *
 * States: unchecked | checked
 * Extras: disabled, skeleton, touch (44px target)
 * Layout: inline (default) | settings (full-width, label left, control right)
 *
 * @slot - Toggle value label (the text next to the track)
 *
 * @csspart base    - The hidden native <input type="checkbox" role="switch">
 * @csspart control - The visible 48×24px pill track
 * @csspart thumb   - The 18×18px sliding circle inside the track
 * @csspart label   - The optional field label above the row
 * @csspart helper  - The optional helper text (above row in inline; inline subtitle in settings)
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
 *
 * @example
 * <so-toggle layout="settings" helper-text="New features and improvements" checked>
 *   Product updates
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

  /**
   * Layout variant.
   * - `inline` (default): control left, value label right — compact inline usage.
   * - `settings`: full-width row, value label left, control right — iOS-style settings lists.
   */
  @property({ type: String, reflect: true }) layout: 'inline' | 'settings' = 'inline';

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
    const isSettings = this.layout === 'settings';
    const describedBy = this.helperText ? 'so-helper' : undefined;

    // Visual pill track + sliding thumb
    const controlEl = html`
      <span part="control" aria-hidden="true">
        <span part="thumb"></span>
      </span>
    `;

    // In settings layout with helperText, wrap value + helper in a column group
    const valueBlock = isSettings && this.helperText
      ? html`
          <div class="value-group">
            <span part="value"><slot></slot></span>
            <span part="helper" id="so-helper">${this.helperText}</span>
          </div>
        `
      : html`<span part="value"><slot></slot></span>`;

    return html`
      <div class="wrapper">
        ${this.label
          ? html`<span part="label">${this.label}</span>`
          : nothing}

        ${this.helperText && !isSettings
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

          <!-- settings: value left, control right; inline: control left, value right -->
          ${isSettings
            ? html`${valueBlock}${controlEl}`
            : html`${controlEl}${valueBlock}`}
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
