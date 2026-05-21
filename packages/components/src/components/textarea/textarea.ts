import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { textareaStyles } from './textarea.styles.js';
import type { TextareaInputDetail, TextareaChangeDetail } from './textarea.types.js';

/* ── Inline feedback icons (shared with so-input) ───────────────────────── */

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
 * `so-textarea` — SnowyOwl Multiline Text Area component.
 *
 * Mirrors `so-input`'s API for labels, helper text, feedback states,
 * character counter, disabled, and skeleton. Adds textarea-specific
 * props: `rows`, `auto-grow`, and `max-rows`.
 *
 * **Sizing:** `rows` (default: 3) sets the initial height via the native
 * `<textarea rows>` attribute. Use `auto-grow` to expand as the user types.
 *
 * **Resize:** `resize: vertical` is hardcoded — the user can drag taller
 * but not wider, preventing broken layouts. When `auto-grow` is active the
 * resize handle is suppressed (JS controls height directly).
 *
 * @csspart base    - The native `<textarea>` element
 * @csspart control - The visible field wrapper (border, background)
 * @csspart label   - Field label above the control
 * @csspart helper  - Helper text below the label
 * @csspart counter - Character counter (shown when maxlength is set)
 * @csspart error   - Error feedback message
 * @csspart warning - Warning feedback message
 * @csspart success - Success/validation feedback message
 *
 * @fires so-input  - Fires on every keystroke. detail: { value: string }
 * @fires so-change - Fires on blur/commit. detail: { value: string }
 *
 * @example
 * <so-textarea label="Notes" placeholder="Write here…" rows="4"></so-textarea>
 *
 * @example
 * <so-textarea
 *   label="Bio"
 *   helper-text="Tell us about yourself"
 *   rows="3"
 *   auto-grow
 *   max-rows="8"
 *   maxlength="500"
 * ></so-textarea>
 */
@customElement('so-textarea')
export class SoTextarea extends LitElement {
  static styles = textareaStyles;

  /* ── Props ── */

  /** Field label rendered above the textarea. */
  @property({ type: String }) label = '';

  /** Helper text rendered below the label, above the textarea. */
  @property({ type: String, attribute: 'helper-text' }) helperText = '';

  /** Current textarea value. */
  @property({ type: String }) value = '';

  /** Placeholder text shown when value is empty. */
  @property({ type: String }) placeholder = '';

  /**
   * Initial number of visible text rows. Determines the default height via
   * the native `<textarea rows>` attribute.
   */
  @property({ type: Number }) rows = 3;

  /**
   * When true, the textarea grows vertically as the user types.
   * The resize handle is suppressed — JS controls height.
   * Combine with `max-rows` to cap the maximum height.
   */
  @property({ type: Boolean, reflect: true, attribute: 'auto-grow' }) autoGrow = false;

  /**
   * Maximum number of rows before a scrollbar appears (only applies when
   * `auto-grow` is true). Has no effect without `auto-grow`.
   */
  @property({ type: Number, attribute: 'max-rows' }) maxRows?: number;

  /** Disabled — blocks all interaction and dims the field. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Skeleton loading state — animated placeholder, blocks interaction. */
  @property({ type: Boolean, reflect: true }) skeleton = false;

  /** Marks the field as required for form validation. */
  @property({ type: Boolean }) required = false;

  /** Makes the textarea read-only. */
  @property({ type: Boolean }) readonly = false;

  /** Native form field name. */
  @property({ type: String }) name = '';

  /** Error message. Shown below the textarea. Takes precedence over warning and success. */
  @property({ type: String, attribute: 'error-text' }) errorText = '';

  /** Warning message. Shown below the textarea when no error is present. */
  @property({ type: String, attribute: 'warning-text' }) warningText = '';

  /** Success/validation message. Shown when no error or warning is present. */
  @property({ type: String, attribute: 'success-text' }) successText = '';

  /**
   * Maximum character count. When set, displays a `current/max` counter
   * on the label row and constrains input length natively.
   */
  @property({ type: Number }) maxlength?: number;

  /** Passed through to the native textarea's autocomplete attribute. */
  @property({ type: String }) autocomplete = '';

  /* ── Internal state ── */

  @state() private _charCount = 0;

  /* ── Lifecycle ── */

  protected firstUpdated() {
    // Initialise auto-grow height on first paint (handles a pre-set value).
    this._updateHeight();
  }

  protected updated(changed: Map<string | symbol, unknown>) {
    if (changed.has('value')) {
      this._charCount = this.value.length;
    }
    // Re-run height calc whenever any prop that affects content size changes.
    if (
      changed.has('value') ||
      changed.has('rows') ||
      changed.has('autoGrow') ||
      changed.has('maxRows')
    ) {
      this._updateHeight();
    }
  }

  /* ── Auto-grow height management ── */

  /**
   * Adjusts the textarea's inline `style.height` to match its content.
   *
   * Technique: set height to 'auto' to let the browser compute the natural
   * scroll height, then apply it. This is synchronous — no rAF needed
   * because Lit's updated() fires after the DOM is written.
   *
   * When maxRows is set and content exceeds the cap:
   * - height is fixed at cap height
   * - overflow-y is set to 'auto' so a scrollbar appears
   *
   * When autoGrow is off: clears any previously applied inline styles so
   * the native rows attribute + CSS resize:vertical take over.
   */
  private _updateHeight() {
    const ta = this.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement | null;
    if (!ta) return;

    if (!this.autoGrow) {
      // Remove inline overrides — let rows attr + CSS control sizing.
      ta.style.height = '';
      ta.style.overflowY = '';
      return;
    }

    // 'auto' lets the textarea collapse to its minimum before we read scrollHeight.
    ta.style.height = 'auto';
    const scrollH = ta.scrollHeight;

    if (this.maxRows) {
      const cs = getComputedStyle(ta);
      const lineH = parseFloat(cs.lineHeight) || 24;
      const padT = parseFloat(cs.paddingTop) || 0;
      const padB = parseFloat(cs.paddingBottom) || 0;
      const maxH = Math.ceil(lineH * this.maxRows + padT + padB);

      if (scrollH > maxH) {
        ta.style.height = `${maxH}px`;
        ta.style.overflowY = 'auto'; // scrollbar at max cap
        return;
      }
    }

    ta.style.height = `${scrollH}px`;
    ta.style.overflowY = 'hidden'; // no scrollbar while content fits
  }

  /* ── Event handlers ── */

  private _handleInput(e: Event) {
    if (this.disabled || this.skeleton) return;
    const ta = e.target as HTMLTextAreaElement;
    this.value = ta.value;
    this._charCount = this.value.length;
    // Trigger auto-grow height recalc immediately on each keystroke.
    this._updateHeight();
    this.dispatchEvent(
      new CustomEvent<TextareaInputDetail>('so-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleChange(e: Event) {
    if (this.disabled || this.skeleton) return;
    const ta = e.target as HTMLTextAreaElement;
    this.value = ta.value;
    this.dispatchEvent(
      new CustomEvent<TextareaChangeDetail>('so-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /* ── Render ── */

  render() {
    const showError = !!this.errorText;
    const showWarning = !showError && !!this.warningText;
    const showSuccess = !showError && !showWarning && !!this.successText;
    const feedbackState = showError
      ? 'error'
      : showWarning
        ? 'warning'
        : showSuccess
          ? 'success'
          : '';

    const describedBy = [
      this.helperText ? 'so-ta-helper' : '',
      showError ? 'so-ta-error' : showWarning ? 'so-ta-warning' : showSuccess ? 'so-ta-success' : '',
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
                ? html`<label part="label" for="so-ta-native">${this.label}</label>`
                : nothing}
              ${this.maxlength !== undefined
                ? html`<span part="counter">${this._charCount}/${this.maxlength}</span>`
                : nothing}
            </div>
          `
          : nothing}

        ${this.helperText
          ? html`<span part="helper" id="so-ta-helper">${this.helperText}</span>`
          : nothing}

        <div
          part="control"
          data-feedback=${feedbackState || nothing}
        >
          <textarea
            part="base"
            id="so-ta-native"
            .value=${this.value}
            rows=${this.rows}
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
          ></textarea>
        </div>

        ${showError
          ? html`
            <span part="error" class="feedback" id="so-ta-error" role="alert">
              ${errorIconSvg}
              ${this.errorText}
            </span>
          `
          : nothing}

        ${showWarning
          ? html`
            <span part="warning" class="feedback" id="so-ta-warning">
              ${warningIconSvg}
              ${this.warningText}
            </span>
          `
          : nothing}

        ${showSuccess
          ? html`
            <span part="success" class="feedback" id="so-ta-success">
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
    'so-textarea': SoTextarea;
  }
}
