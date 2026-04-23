import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { selectStyles } from './select.styles.js';
import type { SelectChangeDetail, SelectOption } from './select.types.js';

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

const chevronSvg = html`
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;

const clearSvg = html`
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M4.5 4.5l7 7M11.5 4.5l-7 7"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
`;

const searchSvg = html`
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5" />
    <path d="M10.5 10.5L13 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
`;

const checkmarkSvg = html`
  <svg viewBox="0 0 10 8" fill="none" aria-hidden="true">
    <path
      d="M1 4L3.5 6.5L9 1"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;

/* ── UID counter ──────────────────────────────────────────────────────────── */

let _uid = 0;

/**
 * `so-select` — SnowyOwl Select component.
 *
 * Supports single-select and multi-select modes with optional live search.
 * Options are passed as slotted `<so-option>` elements.
 *
 * Sizes: md (40px) | lg (48px)
 * Modes: single | multiple
 * States: default | hover | focus | open | disabled | error | warning | skeleton
 *
 * @slot - Accepts `<so-option>` elements that define the available choices
 *
 * @csspart trigger  - The trigger button row (text, badge, clear, chevron)
 * @csspart clear    - The clear (×) button
 * @csspart chevron  - The chevron indicator
 * @csspart panel    - The dropdown panel
 * @csspart search   - The search field wrapper
 * @csspart listbox  - The options container
 * @csspart label    - Field label above the trigger
 * @csspart helper   - Helper text below the label
 * @csspart error    - Error feedback message
 * @csspart warning  - Warning feedback message
 *
 * @fires so-change - Fires when selection changes. detail: SelectChangeDetail
 * @fires so-open   - Fires when the panel opens.
 * @fires so-close  - Fires when the panel closes.
 *
 * @example
 * <so-select label="Country">
 *   <so-option value="us">United States</so-option>
 *   <so-option value="gb">United Kingdom</so-option>
 * </so-select>
 *
 * @example
 * <so-select label="Tags" multiple>
 *   <so-option value="design">Design</so-option>
 *   <so-option value="dev">Development</so-option>
 *   <so-option value="research">Research</so-option>
 * </so-select>
 */
@customElement('so-select')
export class SoSelect extends LitElement {
  static styles = selectStyles;

  /* ── Props ── */

  /** Enables multi-select mode. */
  @property({ type: Boolean, reflect: true }) multiple = false;

  /**
   * Shows a search field inside the panel.
   * Defaults to `false` for single-select and `true` for multi-select
   * when not explicitly set.
   */
  @property({ type: Boolean }) searchable = false;

  /** Placeholder text shown when no option is selected. */
  @property({ type: String }) placeholder = 'Select';

  /** Disabled — blocks all interaction and dims the field. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Skeleton loading state — animated placeholder, blocks interaction. */
  @property({ type: Boolean, reflect: true }) skeleton = false;

  /**
   * Touch mode — 48px item height (default 40px) for mobile a11y.
   * Also reflects on the host for CSS targeting.
   */
  @property({ type: Boolean, reflect: true }) touch = false;

  /** Trigger height: md = 40px, lg = 48px. */
  @property({ type: String, reflect: true }) size: 'md' | 'lg' = 'md';

  /** Field label rendered above the trigger. */
  @property({ type: String }) label = '';

  /** Helper text rendered below the label, above the trigger. */
  @property({ type: String, attribute: 'helper-text' }) helperText = '';

  /** Error message. Takes precedence over warning. */
  @property({ type: String, attribute: 'error-text' }) errorText = '';

  /** Warning message. Only shown when no error is present. */
  @property({ type: String, attribute: 'warning-text' }) warningText = '';

  /** Native form field name. */
  @property({ type: String }) name = '';

  /** Marks the field as required for form validation. */
  @property({ type: Boolean }) required = false;

  /* ── Internal state ── */

  @state() private _open = false;
  @state() private _panelAbove = false;
  @state() private _search = '';
  @state() private _focusedIndex = -1;
  @state() private _searchFocused = false;
  @state() private _options: SelectOption[] = [];
  @state() private _selectedValues = new Set<string>();

  private readonly _uid = `so-select-${++_uid}`;

  /* ── Value API ── */

  /**
   * Current selection.
   * - Single select: returns a `string` (empty string when nothing selected).
   * - Multi-select: returns a `string[]`.
   * Set this property programmatically to pre-select options.
   */
  get value(): string | string[] {
    if (this.multiple) {
      return Array.from(this._selectedValues);
    }
    const vals = Array.from(this._selectedValues);
    return vals.length > 0 ? vals[0] : '';
  }

  set value(v: string | string[]) {
    if (Array.isArray(v)) {
      this._selectedValues = new Set(v);
    } else {
      this._selectedValues = v ? new Set([v]) : new Set();
    }
  }

  /* ── Computed ── */

  /** Whether the search field is shown inside the panel. */
  private get _isSearchable(): boolean {
    if (this.hasAttribute('searchable')) return this.searchable;
    return this.multiple;
  }

  /** Options filtered by the current search string. */
  private _getFilteredOptions(): SelectOption[] {
    if (!this._search) return this._options;
    const q = this._search.toLowerCase();
    return this._options.filter(o => o.label.toLowerCase().includes(q));
  }

  /* ── Lifecycle ── */

  private _outsideClickHandler = (e: MouseEvent) => {
    if (!e.composedPath().includes(this) && this._open) {
      this._closePanel();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._outsideClickHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._outsideClickHandler);
  }

  protected updated(changed: Map<string | symbol, unknown>) {
    // Scroll focused option into view during keyboard navigation
    if (changed.has('_focusedIndex') && this._focusedIndex >= 0 && this._open) {
      const listbox = this.shadowRoot?.querySelector('[part="listbox"]');
      if (listbox) {
        const items = listbox.querySelectorAll<HTMLElement>('.option');
        items[this._focusedIndex]?.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  /* ── Option slot reading ── */

  private _onSlotChange() {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
    if (!slot) return;
    this._options = Array.from(slot.assignedElements({ flatten: true }))
      .filter(el => el.tagName.toLowerCase() === 'so-option')
      .map(el => ({
        value: el.getAttribute('value') || '',
        label: el.getAttribute('label') || el.textContent?.trim() || '',
        disabled: el.hasAttribute('disabled'),
      }));
  }

  /* ── Panel open / close ── */

  private _openPanel() {
    if (this.disabled || this.skeleton) return;
    this._open = true;
    this._search = '';
    this._computePanelPosition();

    // Focus the first selected option on open; if nothing selected, focus stays on trigger
    if (this._selectedValues.size > 0) {
      const opts = this._getFilteredOptions();
      const firstSelectedIdx = opts.findIndex(o => this._selectedValues.has(o.value));
      this._focusedIndex = firstSelectedIdx >= 0 ? firstSelectedIdx : -1;
    } else {
      this._focusedIndex = -1;
    }

    this.dispatchEvent(new CustomEvent('so-open', { bubbles: true, composed: true }));
  }

  private _closePanel() {
    this._open = false;
    this._search = '';
    this._focusedIndex = -1;
    this._searchFocused = false;
    this.dispatchEvent(new CustomEvent('so-close', { bubbles: true, composed: true }));
  }

  private _computePanelPosition() {
    const rect = this.getBoundingClientRect();
    this._panelAbove = window.innerHeight - rect.bottom < 240;
  }

  /* ── Selection ── */

  private _selectOption(opt: SelectOption) {
    if (opt.disabled) return;
    this._selectedValues = new Set([opt.value]);
    this._dispatchChange();
    this._closePanel();
  }

  private _toggleOption(opt: SelectOption) {
    if (opt.disabled) return;
    const next = new Set(this._selectedValues);
    if (next.has(opt.value)) {
      next.delete(opt.value);
    } else {
      next.add(opt.value);
    }
    this._selectedValues = next;
    this._dispatchChange();
    // Multi-select keeps panel open
  }

  private _clearSelection() {
    this._selectedValues = new Set();
    this._dispatchChange();
  }

  private _dispatchChange() {
    const selectedOpts = this._options.filter(o => this._selectedValues.has(o.value));
    this.dispatchEvent(
      new CustomEvent<SelectChangeDetail>('so-change', {
        detail: {
          value: this.value,
          selectedOptions: selectedOpts.map(o => ({ value: o.value, label: o.label })),
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /* ── Event handlers ── */

  private _handleTriggerClick() {
    if (this.disabled || this.skeleton) return;
    if (this._open) {
      this._closePanel();
    } else {
      this._openPanel();
    }
  }

  private _handleTriggerKeydown(e: KeyboardEvent) {
    if (this.disabled || this.skeleton) return;

    if (!this._open) {
      // Panel is closed
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        this._openPanel();
      } else if (e.key === 'Delete' && this.multiple) {
        this._clearSelection();
      }
      return;
    }

    // Panel is open — trigger handles keyboard nav; user can Tab to reach the search field
    const opts = this._getFilteredOptions();
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._focusedIndex = Math.min(this._focusedIndex + 1, opts.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (this._isSearchable && this._focusedIndex <= 0) {
          // In searchable mode, ArrowUp from the top option moves focus to the search field
          this._focusedIndex = -1;
          this.updateComplete.then(() => {
            this.shadowRoot?.querySelector<HTMLInputElement>('.search-input')?.focus();
          });
        } else {
          this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
        }
        break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const focused = opts[this._focusedIndex];
        if (focused && !focused.disabled) {
          if (this.multiple) {
            this._toggleOption(focused);
          } else {
            this._selectOption(focused);
          }
        }
        break;
      }
      case 'Escape':
      case 'Tab':
        this._closePanel();
        break;
    }
  }

  private _handleClear(e: MouseEvent) {
    e.stopPropagation();
    this._clearSelection();
    this._closePanel();
  }

  private _handleSearchInput(e: Event) {
    this._search = (e.target as HTMLInputElement).value;
    this._focusedIndex = -1;
  }

  private _handleSearchKeydown(e: KeyboardEvent) {
    const opts = this._getFilteredOptions();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._focusedIndex = Math.min(
          this._focusedIndex < 0 ? 0 : this._focusedIndex + 1,
          opts.length - 1,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        // ArrowUp from option 0 (or -1) returns to search-focused state (no option highlighted)
        this._focusedIndex = this._focusedIndex <= 0 ? -1 : this._focusedIndex - 1;
        break;
      case 'Enter':
      case ' ': {
        const focused = opts[this._focusedIndex];
        if (focused && !focused.disabled) {
          e.preventDefault();
          if (this.multiple) {
            this._toggleOption(focused);
          } else {
            this._selectOption(focused);
          }
        }
        break;
      }
      case 'Escape':
        if (this._search) {
          // First Esc clears search string
          this._search = '';
          this._focusedIndex = -1;
        } else {
          // Second Esc closes panel
          this._closePanel();
        }
        break;
      case 'Tab':
        this._closePanel();
        break;
    }
  }

  private _clearSearch(e: MouseEvent) {
    e.stopPropagation();
    this._search = '';
    this._focusedIndex = -1;
    this.shadowRoot?.querySelector<HTMLInputElement>('.search-input')?.focus();
  }

  private _handleOptionClick(opt: SelectOption) {
    if (this.multiple) {
      this._toggleOption(opt);
    } else {
      this._selectOption(opt);
    }
  }

  /* ── Render helpers ── */

  private _renderOption(opt: SelectOption, index: number) {
    const isSelected = this._selectedValues.has(opt.value);
    const isFocused = this._focusedIndex === index;

    const classes = [
      'option',
      isSelected ? 'selected' : '',
      opt.disabled ? 'disabled' : '',
      isFocused ? 'focused' : '',
    ]
      .filter(Boolean)
      .join(' ');

    if (this.multiple) {
      return html`
        <div
          class=${classes}
          role="option"
          aria-selected=${isSelected ? 'true' : 'false'}
          aria-disabled=${opt.disabled ? 'true' : nothing}
          @click=${() => this._handleOptionClick(opt)}
        >
          <span class=${`option-checkbox${isSelected ? ' checked' : ''}`} aria-hidden="true">
            ${isSelected ? checkmarkSvg : nothing}
          </span>
          <span class="option-label">${opt.label}</span>
        </div>
      `;
    }

    return html`
      <div
        class=${classes}
        role="option"
        aria-selected=${isSelected ? 'true' : 'false'}
        aria-disabled=${opt.disabled ? 'true' : nothing}
        @click=${() => this._handleOptionClick(opt)}
      >
        <span class="option-label">${opt.label}</span>
        ${isSelected
          ? html`<span class="option-check" aria-hidden="true">${checkmarkSvg}</span>`
          : nothing}
      </div>
    `;
  }

  /* ── Render ── */

  render() {
    const showError = !!this.errorText;
    const showWarning = !showError && !!this.warningText;
    const feedbackState = showError ? 'error' : showWarning ? 'warning' : '';

    const hasValue = this._selectedValues.size > 0;
    const selectedCount = this._selectedValues.size;
    const singleLabel =
      !this.multiple && hasValue
        ? (this._options.find(o => this._selectedValues.has(o.value))?.label ?? '')
        : '';

    const filteredOptions = this._getFilteredOptions();

    const labelId = `${this._uid}-label`;
    const listboxId = `${this._uid}-listbox`;

    const triggerClasses = [
      'trigger-container',
      this._open ? 'open' : '',
      // trigger-active: trigger is the active focus point (no option or search has focus)
      this._open && this._focusedIndex === -1 && !this._searchFocused ? 'trigger-active' : '',
      // options-navigating: suppresses trigger :focus-visible while an option has the ring
      this._open && this._focusedIndex >= 0 ? 'options-navigating' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div class="wrapper">

        <!-- Label -->
        ${this.label
          ? html`<label part="label" id=${labelId}>${this.label}</label>`
          : nothing}

        <!-- Helper text -->
        ${this.helperText
          ? html`<span part="helper" id="${this._uid}-helper">${this.helperText}</span>`
          : nothing}

        <!-- Field row (position: relative anchors the panel) -->
        <div class="field">

          ${this.skeleton
            ? html`<div class="skeleton-trigger"></div>`
            : html`
              <!-- ── Trigger ──────────────────────────────────────── -->
              <div
                class=${triggerClasses}
                part="trigger"
                tabindex=${this.disabled ? '-1' : '0'}
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded=${this._open ? 'true' : 'false'}
                aria-labelledby=${this.label ? labelId : nothing}
                aria-controls=${listboxId}
                aria-invalid=${showError ? 'true' : nothing}
                aria-required=${this.required ? 'true' : nothing}
                data-feedback=${feedbackState || nothing}
                @click=${this._handleTriggerClick}
                @keydown=${this._handleTriggerKeydown}
              >
                <!-- Count badge (multi-select only, left-aligned before spacer) -->
                ${this.multiple && selectedCount > 0
                  ? html`<span class="count-badge">${selectedCount} selected</span>`
                  : nothing}

                <!-- Placeholder / selected label text (empty spacer in multi+hasValue) -->
                <span class=${`trigger-text${hasValue ? ' has-value' : ''}`}>
                  ${this.multiple && hasValue ? nothing : (singleLabel || this.placeholder)}
                </span>

                <!-- Clear button -->
                ${hasValue
                  ? html`
                    <button
                      type="button"
                      part="clear"
                      class="icon-btn clear-btn"
                      aria-label="Clear selection"
                      tabindex=${this.disabled ? '-1' : '0'}
                      @click=${this._handleClear}
                    >
                      ${clearSvg}
                    </button>
                  `
                  : nothing}

                <!-- Separator (only when clear button is visible) -->
                ${hasValue
                  ? html`<span class="separator" aria-hidden="true"></span>`
                  : nothing}

                <!-- Chevron -->
                <span class="chevron-wrapper" part="chevron" aria-hidden="true">
                  ${chevronSvg}
                </span>
              </div>

              <!-- ── Dropdown panel ───────────────────────────────── -->
              ${this._open
                ? html`
                  <div
                    class=${`panel${this._panelAbove ? ' panel-above' : ''}`}
                    part="panel"
                  >
                    <!-- Search field (sticky at top) -->
                    ${this._isSearchable
                      ? html`
                        <div part="search" class=${`search-wrapper${this._focusedIndex >= 0 ? ' options-active' : ''}`}>
                          <span class="search-icon-wrap" aria-hidden="true">${searchSvg}</span>
                          <input
                            class="search-input"
                            type="text"
                            placeholder="Search"
                            .value=${this._search}
                            @focus=${() => { this._focusedIndex = -1; this._searchFocused = true; }}
                            @blur=${() => { this._searchFocused = false; }}
                            @input=${this._handleSearchInput}
                            @keydown=${this._handleSearchKeydown}
                            autocomplete="off"
                            aria-label="Search options"
                          />
                          ${this._search
                            ? html`
                              <button
                                type="button"
                                class="icon-btn"
                                aria-label="Clear search"
                                @click=${this._clearSearch}
                              >
                                ${clearSvg}
                              </button>
                            `
                            : nothing}
                        </div>
                      `
                      : nothing}

                    <!-- Listbox -->
                    <div
                      role="listbox"
                      part="listbox"
                      id=${listboxId}
                      aria-multiselectable=${this.multiple ? 'true' : nothing}
                      aria-label=${this.label || 'Options'}
                    >
                      ${filteredOptions.length === 0
                        ? html`<div class="no-options">No options available</div>`
                        : filteredOptions.map((opt, i) => this._renderOption(opt, i))}
                    </div>
                  </div>
                `
                : nothing}
            `}

        </div>

        <!-- Error feedback -->
        ${showError
          ? html`
            <span part="error" class="feedback" id="${this._uid}-error" role="alert">
              ${errorIconSvg}
              ${this.errorText}
            </span>
          `
          : nothing}

        <!-- Warning feedback -->
        ${showWarning
          ? html`
            <span part="warning" class="feedback" id="${this._uid}-warning">
              ${warningIconSvg}
              ${this.warningText}
            </span>
          `
          : nothing}

        <!-- Hidden slot: so-option elements live here -->
        <slot @slotchange=${this._onSlotChange}></slot>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-select': SoSelect;
  }
}
