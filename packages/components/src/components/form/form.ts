import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { formStyles } from './form.styles.js';
import type { FormSubmitDetail } from './form.types.js';
import '../loader/loader.js';

const FORM_CHILD_SELECTOR =
  'so-input, so-select, so-checkbox, so-radio, so-toggle, so-checkbox-group, so-radio-group, so-button, so-textarea';

/**
 * `so-form` — SnowyOwl layout-only form wrapper.
 *
 * Provides a semantic `<form>` element with consistent vertical gap between
 * fields, optional title/description header, footer slot for action buttons,
 * and a loading overlay state. Does **not** orchestrate validation, collect
 * values, or manage field state — each component handles its own.
 *
 * @slot         - Form field components (so-input, so-select, so-checkbox-group, etc.)
 * @slot footer  - Action buttons (Cancel / Save etc.)
 *
 * @csspart root        - Outer wrapper div
 * @csspart header      - Header zone (title + description)
 * @csspart title       - The heading element
 * @csspart description - Description paragraph
 * @csspart form        - The native form element
 * @csspart fields      - Fields container div
 * @csspart footer      - Footer zone
 * @csspart overlay     - Loading overlay
 *
 * @fires so-submit - Fires on form submit. detail: { formData: FormData, originalEvent: SubmitEvent }
 * @fires so-reset  - Fires on form reset
 *
 * @example
 * <so-form title="Contact Us" description="All fields required.">
 *   <so-input label="Name"></so-input>
 *   <so-input label="Email" type="email"></so-input>
 *   <so-button slot="footer" variant="primary">Submit</so-button>
 * </so-form>
 */
@customElement('so-form')
export class SoForm extends LitElement {
  static styles = formStyles;

  /* ── Props ── */

  /** Optional form title rendered above fields. */
  @property({ type: String }) title = '';

  /** Optional description text below the title. */
  @property({ type: String }) description = '';

  /**
   * CSS gap value between form fields.
   * Accepts any valid CSS length or custom-property reference.
   * Default: `var(--soSemanticSpacingComponentMd)` (16px).
   */
  @property({ type: String }) gap = 'var(--soSemanticSpacingComponentMd)';

  /** Shows a `so-loader` overlay. Sets `inert` on the form to prevent interaction. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /**
   * Propagates `disabled` to all child form elements on slot change and on change.
   * Also sets the `disabled` attribute on the native `<form>`.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Sets `novalidate` on the native `<form>`.
   * Default `true` — SnowyOwl components handle their own validation display.
   */
  @property({ type: Boolean, reflect: true }) novalidate = true;

  /**
   * Heading level for the form title.
   * Set appropriately for your page document outline.
   */
  @property({ type: String, attribute: 'title-level' }) titleLevel: 'h1' | 'h2' | 'h3' | 'h4' = 'h2';

  /* ── Internal state ── */

  @state() private _hasFooter = false;

  /* ── Disabled propagation ── */

  private _getDefaultSlot(): HTMLSlotElement | null {
    return this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])') ?? null;
  }

  private _applyDisabled() {
    const slot = this._getDefaultSlot();
    if (!slot) return;
    for (const root of slot.assignedElements({ flatten: true })) {
      if (root.matches(FORM_CHILD_SELECTOR)) {
        (root as any).disabled = this.disabled;
      }
      for (const el of Array.from(root.querySelectorAll(FORM_CHILD_SELECTOR))) {
        (el as any).disabled = this.disabled;
      }
    }
  }

  /* ── Slot change handlers ── */

  private _handleDefaultSlotChange() {
    this._applyDisabled();
  }

  private _handleFooterSlotChange(e: Event) {
    const slot = e.currentTarget as HTMLSlotElement;
    this._hasFooter = slot.assignedElements({ flatten: true }).length > 0;
  }

  /* ── Submit / reset ── */

  private _handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formEl = this.shadowRoot!.querySelector('form')!;
    const formData = new FormData(formEl);
    this.dispatchEvent(
      new CustomEvent<FormSubmitDetail>('so-submit', {
        detail: { formData, originalEvent: e },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleReset(_e: Event) {
    this.dispatchEvent(
      new CustomEvent('so-reset', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  /* ── Public API ── */

  /** Programmatically submits the form (fires `so-submit`). */
  submit() {
    this.shadowRoot?.querySelector('form')?.requestSubmit();
  }

  /* ── Lifecycle ── */

  override firstUpdated() {
    this.style.setProperty('--so-form-gap', this.gap);
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('gap')) {
      this.style.setProperty('--so-form-gap', this.gap);
    }
    if (changed.has('disabled')) {
      this._applyDisabled();
    }
  }

  /* ── Title rendering helper ── */

  private _renderTitle() {
    switch (this.titleLevel) {
      case 'h1': return html`<h1 part="title">${this.title}</h1>`;
      case 'h3': return html`<h3 part="title">${this.title}</h3>`;
      case 'h4': return html`<h4 part="title">${this.title}</h4>`;
      default:   return html`<h2 part="title">${this.title}</h2>`;
    }
  }

  /* ── Render ── */

  override render() {
    return html`
      <div part="root" ?aria-busy=${this.loading}>

        ${this.title
          ? html`
              <div part="header">
                ${this._renderTitle()}
                ${this.description
                  ? html`<p part="description">${this.description}</p>`
                  : nothing}
              </div>
            `
          : nothing}

        <form
          part="form"
          ?novalidate=${this.novalidate}
          ?disabled=${this.disabled}
          ?inert=${this.loading}
          @submit=${this._handleSubmit}
          @reset=${this._handleReset}
        >
          <div part="fields">
            <slot @slotchange=${this._handleDefaultSlotChange}></slot>
          </div>

          <div
            part="footer"
            class=${this._hasFooter ? 'has-content' : ''}
          >
            <slot name="footer" @slotchange=${this._handleFooterSlotChange}></slot>
          </div>
        </form>

        ${this.loading
          ? html`
              <div part="overlay" aria-hidden="true">
                <so-loader size="lg" variant="arc" label="Loading..."></so-loader>
              </div>
            `
          : nothing}

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-form': SoForm;
  }
}
