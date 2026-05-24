import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { checkboxGroupStyles } from './checkbox-group.styles.js';
import type { CheckboxGroupChangeDetail } from './checkbox-group.types.js';
import '../checkbox/checkbox.js';
import '../divider/divider.js';

/* ── Inline icons (same as so-checkbox) ─────────────────────────────────── */

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
 * `so-checkbox-group` — SnowyOwl managed checkbox group.
 *
 * Wraps slotted `so-checkbox` elements and manages their checked state,
 * layout, and group-level validation.
 *
 * @slot - `so-checkbox` elements
 *
 * @csspart fieldset - The fieldset element
 * @csspart legend   - The legend element (group label)
 * @csspart helper   - Helper text span
 * @csspart items    - The items container div
 * @csspart error    - Error feedback span
 * @csspart warning  - Warning feedback span
 *
 * @fires so-change - Fires when any child checkbox changes.
 *   detail: { value: string[], name: string }
 *
 * @example
 * <so-checkbox-group label="Notifications" name="notif" .value=${['email']}>
 *   <so-checkbox value="email">Email</so-checkbox>
 *   <so-checkbox value="sms">SMS</so-checkbox>
 * </so-checkbox-group>
 */
@customElement('so-checkbox-group')
export class SoCheckboxGroup extends LitElement {
  static styles = checkboxGroupStyles;

  private readonly _uid = ++uidCounter;

  /* ── Props ── */

  /** Group label rendered above checkboxes. */
  @property({ type: String }) label = '';

  /** Optional helper text below the label. */
  @property({ type: String, attribute: 'helper-text' }) helperText = '';

  /** Name propagated to all child `so-checkbox` elements. */
  @property({ type: String }) name = '';

  /** Layout direction of checkboxes. */
  @property({ type: String, reflect: true }) orientation: 'vertical' | 'horizontal' = 'vertical';

  /** At least one checkbox must be checked. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Minimum number of checkboxes that must be checked (0 = no minimum). */
  @property({ type: Number }) min = 0;

  /** Maximum number of checkboxes that can be checked (0 = no maximum). */
  @property({ type: Number }) max = 0;

  /** Propagates disabled to all child checkboxes. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Propagates touch (44px target) to all child checkboxes. */
  @property({ type: Boolean, reflect: true }) touch = false;

  /** Shows a "Select all" master checkbox above the group. */
  @property({ type: Boolean, reflect: true, attribute: 'select-all' }) selectAll = false;

  /** Group-level error message. Overrides auto-generated validation errors. */
  @property({ type: String, attribute: 'error-text' }) errorText = '';

  /** Group-level warning. Only shown when error-text is absent. */
  @property({ type: String, attribute: 'warning-text' }) warningText = '';

  /* ── Internal state ── */

  @state() private _masterChecked = false;
  @state() private _masterIndeterminate = false;
  @state() private _autoError = '';

  /* ── Value (backing field with getter/setter) ── */

  private _value: string[] = [];

  /** Array of checked values. Set programmatically via `.value = [...]`. */
  get value(): string[] {
    return [...this._value];
  }

  set value(v: string[]) {
    const old = this._value;
    this._value = [...v];
    this.requestUpdate('value', old);
    if (this.hasUpdated) {
      this._syncChildren();
    }
  }

  /* ── Child event listener management ── */

  private _listenedCheckboxes: Element[] = [];
  private readonly _onChildChange = (e: Event) => this._handleChildChange(e as CustomEvent);

  /* ── Slot query ── */

  private _getCheckboxes(): Element[] {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
    if (!slot) return [];
    return slot.assignedElements({ flatten: true }).filter(
      el => el.tagName.toLowerCase() === 'so-checkbox',
    );
  }

  /* ── Sync checked state from _value to children ── */

  private _syncChildren() {
    const checkboxes = this._getCheckboxes();
    for (const cb of checkboxes) {
      const cbEl = cb as any;
      const cbValue: string = cbEl.value ?? cb.getAttribute('value') ?? 'on';
      cbEl.checked = this._value.includes(cbValue);
    }
    this._updateMasterState();
  }

  /* ── Propagate group props to children ── */

  private _applyProps() {
    const checkboxes = this._getCheckboxes();
    const activeError = this.errorText || this._autoError;
    const showError = !!activeError;
    const showWarning = !showError && !!this.warningText;

    for (const cb of checkboxes) {
      const cbEl = cb as any;
      if (this.name) cbEl.name = this.name;
      if (this.disabled) cbEl.disabled = true;
      if (this.touch) cbEl.touch = true;
      // Propagate error/warning state (group overrides individual)
      if (showError) {
        cbEl.errorText = activeError;
        cbEl.warningText = '';
      } else if (showWarning) {
        cbEl.errorText = '';
        cbEl.warningText = this.warningText;
      } else {
        cbEl.errorText = '';
        cbEl.warningText = '';
      }
    }
  }

  /* ── Recompute master checkbox checked/indeterminate state ── */

  private _updateMasterState() {
    if (!this.selectAll) return;
    const checkboxes = this._getCheckboxes();
    const nonDisabled = checkboxes.filter(cb => !(cb as any).disabled);
    if (nonDisabled.length === 0) {
      this._masterChecked = false;
      this._masterIndeterminate = false;
      return;
    }
    const checkedCount = nonDisabled.filter(cb =>
      this._value.includes((cb as any).value ?? 'on'),
    ).length;
    if (checkedCount === 0) {
      this._masterChecked = false;
      this._masterIndeterminate = false;
    } else if (checkedCount === nonDisabled.length) {
      this._masterChecked = true;
      this._masterIndeterminate = false;
    } else {
      this._masterChecked = false;
      this._masterIndeterminate = true;
    }
  }

  /* ── Re-attach event listeners when slotted children change ── */

  private _handleSlotChange() {
    // Remove old listeners
    for (const cb of this._listenedCheckboxes) {
      cb.removeEventListener('so-change', this._onChildChange);
    }
    const checkboxes = this._getCheckboxes();
    // Attach listeners to new set
    for (const cb of checkboxes) {
      cb.addEventListener('so-change', this._onChildChange);
    }
    this._listenedCheckboxes = checkboxes;
    this._syncChildren();
    this._applyProps();
  }

  /* ── Individual child checkbox change ── */

  private _handleChildChange(e: CustomEvent) {
    // Prevent the individual checkbox event from propagating beyond the group
    e.stopPropagation();

    const target = e.currentTarget as any;
    const cbValue: string = target.value ?? 'on';
    const checked: boolean = e.detail?.checked ?? target.checked;

    if (checked) {
      if (!this._value.includes(cbValue)) {
        this._value = [...this._value, cbValue];
      }
    } else {
      this._value = this._value.filter(v => v !== cbValue);
    }

    this._validate();
    this._updateMasterState();
    this._applyProps();
    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent<CheckboxGroupChangeDetail>('so-change', {
        detail: { value: [...this._value], name: this.name },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /* ── Master "Select all" checkbox change ── */

  private _handleMasterChange(e: CustomEvent) {
    e.stopPropagation();

    const checkboxes = this._getCheckboxes();
    const nonDisabled = checkboxes.filter(cb => !(cb as any).disabled);

    // Indeterminate or unchecked → check all; checked → uncheck all
    const shouldCheck = !this._masterChecked || this._masterIndeterminate;

    if (shouldCheck) {
      const nonDisabledValues = nonDisabled.map(cb => (cb as any).value ?? 'on');
      // Preserve already-checked disabled values
      const disabledChecked = this._value.filter(v =>
        checkboxes.some(cb => (cb as any).disabled && ((cb as any).value ?? 'on') === v),
      );
      this._value = [...new Set([...disabledChecked, ...nonDisabledValues])];
    } else {
      // Keep only disabled children that were checked
      this._value = this._value.filter(v =>
        checkboxes.some(cb => (cb as any).disabled && ((cb as any).value ?? 'on') === v),
      );
    }

    this._syncChildren();
    this._validate();
    this._applyProps();
    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent<CheckboxGroupChangeDetail>('so-change', {
        detail: { value: [...this._value], name: this.name },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /* ── Validation ── */

  private _validate(): boolean {
    // Explicit errorText always wins — no auto-generation
    if (this.errorText) {
      this._autoError = '';
      return false;
    }
    if (this.required && this._value.length === 0) {
      this._autoError = 'Please select at least one option';
      return false;
    }
    if (this.min > 0 && this._value.length < this.min) {
      this._autoError = `Please select at least ${this.min} option${this.min !== 1 ? 's' : ''}`;
      return false;
    }
    if (this.max > 0 && this._value.length > this.max) {
      this._autoError = `Please select no more than ${this.max} option${this.max !== 1 ? 's' : ''}`;
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
    if (changed.has('value') || changed.has('selectAll')) {
      this._updateMasterState();
    }
  }

  /* ── Render ── */

  override render() {
    const activeError = this.errorText || this._autoError;
    const showError = !!activeError;
    const showWarning = !showError && !!this.warningText;

    const helperId = `cbg-helper-${this._uid}`;
    const errorId = `cbg-error-${this._uid}`;
    const warningId = `cbg-warning-${this._uid}`;

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
        aria-required=${this.required ? 'true' : nothing}
        aria-invalid=${showError ? 'true' : nothing}
        aria-describedby=${describedBy || nothing}
      >
        ${this.label ? html`<legend part="legend">${this.label}</legend>` : nothing}

        ${this.helperText
          ? html`<span part="helper" id=${helperId}>${this.helperText}</span>`
          : nothing}

        ${this.selectAll
          ? html`
              <div class="select-all-area">
                <so-checkbox
                  class="select-all-control"
                  .checked=${this._masterChecked}
                  .indeterminate=${this._masterIndeterminate}
                  @so-change=${this._handleMasterChange}
                >Select all</so-checkbox>
                <so-divider></so-divider>
              </div>
            `
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
    'so-checkbox-group': SoCheckboxGroup;
  }
}
