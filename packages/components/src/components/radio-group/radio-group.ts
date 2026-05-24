import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { radioGroupStyles } from './radio-group.styles.js';
import type { RadioGroupChangeDetail } from './radio-group.types.js';
import '../radio/radio.js';

/* ── Inline icons (same as so-radio) ────────────────────────────────────── */

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

let uidCounter = 0;

/**
 * `so-radio-group` — SnowyOwl managed radio group.
 *
 * Wraps slotted `so-radio` elements and manages their selected state,
 * keyboard navigation (roving tabindex, arrow keys), and group-level
 * validation.
 *
 * @slot - `so-radio` elements
 *
 * @csspart fieldset - The fieldset element
 * @csspart legend   - The legend element (group label)
 * @csspart helper   - Helper text span
 * @csspart items    - The items container div
 * @csspart error    - Error feedback span
 * @csspart warning  - Warning feedback span
 *
 * @fires so-change - Fires when selection changes.
 *   detail: { value: string, name: string }
 *
 * @example
 * <so-radio-group label="Preferred contact" name="contact" value="email">
 *   <so-radio value="email">Email</so-radio>
 *   <so-radio value="phone">Phone</so-radio>
 * </so-radio-group>
 */
@customElement('so-radio-group')
export class SoRadioGroup extends LitElement {
  static styles = radioGroupStyles;

  private readonly _uid = ++uidCounter;

  /* ── Props ── */

  /** Group label rendered above radios. */
  @property({ type: String }) label = '';

  /** Optional helper text below the label. */
  @property({ type: String, attribute: 'helper-text' }) helperText = '';

  /**
   * Name propagated to all child `so-radio` elements.
   * Auto-generated as `so-radio-group-{uid}` if not provided.
   */
  @property({ type: String }) name = '';

  /** Layout direction of radios. */
  @property({ type: String, reflect: true }) orientation: 'vertical' | 'horizontal' = 'vertical';

  /** A radio must be selected when submitting. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Propagates disabled to all child radios. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Propagates touch (44px target) to all child radios. */
  @property({ type: Boolean, reflect: true }) touch = false;

  /** Group-level error message. Overrides auto-generated validation errors. */
  @property({ type: String, attribute: 'error-text' }) errorText = '';

  /** Group-level warning. Only shown when error-text is absent. */
  @property({ type: String, attribute: 'warning-text' }) warningText = '';

  /* ── Internal state ── */

  @state() private _autoError = '';

  /* ── Value (backing field with getter/setter) ── */

  private _value = '';

  /** Currently selected value. Set programmatically via `.value = '...'`. */
  get value(): string {
    return this._value;
  }

  set value(v: string) {
    const old = this._value;
    this._value = v;
    this.requestUpdate('value', old);
    if (this.hasUpdated) {
      this._syncChildren();
    }
  }

  /* ── Effective name (auto-generated fallback) ── */

  private get _effectiveName(): string {
    return this.name || `so-radio-group-${this._uid}`;
  }

  /* ── Child event listener management ── */

  private _listenedRadios: Element[] = [];
  private readonly _onChildChange = (e: Event) => this._handleChildChange(e as CustomEvent);
  private readonly _onChildKeydown = (e: Event) => this._handleKeydown(e as KeyboardEvent);

  /* ── Slot query ── */

  private _getRadios(): Element[] {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
    if (!slot) return [];
    return slot.assignedElements({ flatten: true }).filter(
      el => el.tagName.toLowerCase() === 'so-radio',
    );
  }

  /* ── Sync checked state from _value to children ── */

  private _syncChildren() {
    const radios = this._getRadios();
    for (const r of radios) {
      const rEl = r as any;
      const rValue: string = rEl.value ?? r.getAttribute('value') ?? 'on';
      rEl.checked = rValue === this._value;
    }
    this._updateRovingTabindex();
  }

  /* ── Propagate group props to children ── */

  private _applyProps() {
    const radios = this._getRadios();
    const effectiveName = this._effectiveName;
    const showError = !!(this.errorText || this._autoError);

    for (const r of radios) {
      const rEl = r as any;
      rEl.name = effectiveName;
      if (this.disabled) rEl.disabled = true;
      if (this.touch) rEl.touch = true;
      // Show red border on non-disabled children when the group is invalid.
      // Error/warning text is shown only once at group level — never on children.
      rEl.invalid = showError && !rEl.disabled;
    }
  }

  /* ── Roving tabindex ── */

  private _updateRovingTabindex() {
    const radios = this._getRadios();
    let hasTabStop = false;

    for (const r of radios) {
      const rEl = r as any;
      const rValue: string = rEl.value ?? r.getAttribute('value') ?? 'on';
      const isSelected = rValue === this._value;
      if (isSelected) {
        this._setTabindex(r, 0);
        hasTabStop = true;
      } else {
        this._setTabindex(r, -1);
      }
    }

    // If nothing is selected, first non-disabled radio gets tabindex="0"
    if (!hasTabStop) {
      const first = radios.find(r => !(r as any).disabled);
      if (first) this._setTabindex(first, 0);
    }
  }

  private _setTabindex(radio: Element, index: number) {
    // so-radio's hidden native input is what should receive tabindex
    // We expose tabindex on the host element for roving tabindex
    (radio as HTMLElement).setAttribute('tabindex', String(index));
  }

  /* ── Re-attach event listeners when slotted children change ── */

  private _handleSlotChange() {
    // Remove old listeners
    for (const r of this._listenedRadios) {
      r.removeEventListener('so-change', this._onChildChange);
      r.removeEventListener('keydown', this._onChildKeydown);
    }
    const radios = this._getRadios();
    for (const r of radios) {
      r.addEventListener('so-change', this._onChildChange);
      r.addEventListener('keydown', this._onChildKeydown);
    }
    this._listenedRadios = radios;
    this._syncChildren();
    this._applyProps();
  }

  /* ── Individual radio change (user selects a radio) ── */

  private _handleChildChange(e: CustomEvent) {
    e.stopPropagation();

    const target = e.currentTarget as any;
    const rValue: string = target.value ?? 'on';
    const checked: boolean = e.detail?.checked ?? target.checked;

    if (!checked) return; // radio only fires change when becoming checked

    this._value = rValue;

    this._validate();
    this._syncChildren();
    this._applyProps();
    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent<RadioGroupChangeDetail>('so-change', {
        detail: { value: this._value, name: this._effectiveName },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /* ── Keyboard navigation (ARIA radiogroup pattern) ── */

  private _handleKeydown(e: KeyboardEvent) {
    const radios = this._getRadios();
    const navigable = radios.filter(r => !(r as any).disabled && !this.disabled);
    if (navigable.length === 0) return;

    const currentIndex = navigable.indexOf(e.currentTarget as Element);
    let nextIndex = -1;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = currentIndex < navigable.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : navigable.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex < 0) return;

    const next = navigable[nextIndex] as any;
    // Select and focus the next radio
    this._value = next.value ?? 'on';
    this._syncChildren();
    this._validate();
    this._applyProps();
    this.requestUpdate();

    // Move DOM focus to the next radio's native input
    next.updateComplete?.then(() => {
      const input = next.shadowRoot?.querySelector('input[type="radio"]') as HTMLElement | null;
      input?.focus();
    });

    this.dispatchEvent(
      new CustomEvent<RadioGroupChangeDetail>('so-change', {
        detail: { value: this._value, name: this._effectiveName },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /* ── Validation ── */

  private _validate(): boolean {
    if (this.errorText) {
      this._autoError = '';
      return false;
    }
    if (this.required && this._value === '') {
      this._autoError = 'Please select an option';
      return false;
    }
    this._autoError = '';
    return true;
  }

  /** Returns true if the current value satisfies all constraints. */
  checkValidity(): boolean {
    return this._validate();
  }

  /** Runs validation, updates the error display, and returns validity. */
  reportValidity(): boolean {
    const valid = this._validate();
    this.requestUpdate();
    this._applyProps();
    return valid;
  }

  /* ── Lifecycle ── */

  override firstUpdated() {
    this._handleSlotChange();
  }

  override updated(changed: Map<string, unknown>) {
    const syncProps = ['value', 'disabled', 'touch', 'name', 'errorText', 'warningText', '_autoError'];
    if (syncProps.some(p => changed.has(p))) {
      this._applyProps();
    }
    if (changed.has('value')) {
      this._syncChildren();
    }
  }

  /* ── Render ── */

  override render() {
    const activeError = this.errorText || this._autoError;
    const showError = !!activeError;
    const showWarning = !showError && !!this.warningText;

    const helperId = `rg-helper-${this._uid}`;
    const errorId = `rg-error-${this._uid}`;
    const warningId = `rg-warning-${this._uid}`;

    const describedBy = [
      this.helperText ? helperId : '',
      showError ? errorId : '',
      showWarning ? warningId : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <fieldset
        part="fieldset"
        role="radiogroup"
        aria-required=${this.required ? 'true' : nothing}
        aria-invalid=${showError ? 'true' : nothing}
        aria-describedby=${describedBy || nothing}
      >
        ${this.label ? html`<legend part="legend">${this.label}</legend>` : nothing}

        ${this.helperText
          ? html`<span part="helper" id=${helperId}>${this.helperText}</span>`
          : nothing}

        <div part="items">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>

        ${showError
          ? html`
              <span part="error" class="feedback" id=${errorId} role="alert">
                ${errorIconSvg}${activeError}
              </span>
            `
          : nothing}

        ${showWarning
          ? html`
              <span part="warning" class="feedback" id=${warningId}>
                ${warningIconSvg}${this.warningText}
              </span>
            `
          : nothing}
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-radio-group': SoRadioGroup;
  }
}
