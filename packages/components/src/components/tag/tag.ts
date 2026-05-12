import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { tagStyles } from './tag.styles.js';
import type { TagVariant, TagColor, TagDismissDetail, TagSelectDetail, TagClickDetail } from './tag.types.js';

/* ── Color presets — primitive tokens, not semantic ───────────────────────
   These are categorization colors independent of the interactive color
   system. Fill/text/border are resolved to CSS custom properties and set
   on the host element via updated() so themes only need to override
   semantic tokens, not tag-specific colors.
─────────────────────────────────────────────────────────────────────────── */
const COLOR_PRESETS: Record<string, { fill: string; text: string; border: string }> = {
  neutral: { fill: 'var(--soColorNeutral200)', text: 'var(--soColorNeutral800)', border: 'var(--soColorNeutral400)' },
  mauve:   { fill: 'var(--soColorMauve100)',   text: 'var(--soColorMauve800)',   border: 'var(--soColorMauve400)' },
  sand:    { fill: 'var(--soColorSand100)',     text: 'var(--soColorSand800)',    border: 'var(--soColorSand400)' },
  green:   { fill: 'var(--soColorGreen100)',    text: 'var(--soColorGreen800)',   border: 'var(--soColorGreen500)' },
  red:     { fill: 'var(--soColorRed100)',      text: 'var(--soColorRed800)',     border: 'var(--soColorRed400)' },
  orange:  { fill: 'var(--soColorOrange100)',   text: 'var(--soColorOrange800)',  border: 'var(--soColorOrange500)' },
  teal:    { fill: 'var(--soColorTeal100)',     text: 'var(--soColorTeal800)',    border: 'var(--soColorTeal500)' },
  blue:    { fill: 'var(--soColorBlue100)',     text: 'var(--soColorBlue800)',    border: 'var(--soColorBlue400)' },
  purple:  { fill: 'var(--soColorPurple100)',   text: 'var(--soColorPurple800)',  border: 'var(--soColorPurple500)' },
};

/**
 * `so-tag` — SnowyOwl tag/chip component.
 *
 * Supports four variants:
 * - `read-only` — non-interactive label (default)
 * - `dismissible` — tag body is static; only the × button is interactive
 * - `selectable` — toggleable button, fires `so-change`
 * - `operational` — clickable button, fires `so-click`
 *
 * Named color presets (`neutral`, `mauve`, `sand`, `green`, `red`,
 * `orange`, `teal`, `blue`, `purple`) set fill, text, and border colors
 * using primitive tokens.
 *
 * **Custom color escape hatch:** Set `color="custom"` and provide the
 * three CSS custom properties from your own stylesheet:
 * ```css
 * so-tag[color="custom"] {
 *   --so-tag-fill:   #e0f2fe;
 *   --so-tag-text:   #0c4a6e;
 *   --so-tag-border: #7dd3fc;
 * }
 * ```
 *
 * @slot icon - Optional leading icon (`<so-icon>` recommended, sized to 14px)
 *
 * @csspart base  - Outer container (`<span>`, `<button>`)
 * @csspart icon  - Icon slot wrapper
 * @csspart label - Label text span
 * @csspart close - Dismiss button (dismissible variant only)
 *
 * @fires so-dismiss - Dismissible variant — fires after exit animation completes
 * @fires so-change  - Selectable variant — `{ selected: boolean, label: string }`
 * @fires so-click   - Operational variant — `{ label: string }`
 */
@customElement('so-tag')
export class SoTag extends LitElement {
  static styles = tagStyles;

  /** Controls the tag's interaction model */
  @property({ type: String, reflect: true }) variant: TagVariant = 'read-only';

  /**
   * Named color preset, or `'custom'` to provide `--so-tag-fill`,
   * `--so-tag-text`, and `--so-tag-border` from consumer CSS.
   */
  @property({ type: String }) color: TagColor = 'neutral';

  /** Selectable variant only — whether the tag is currently toggled on */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Disables interaction on dismissible, selectable, and operational variants */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Renders an animated placeholder in lieu of real content */
  @property({ type: Boolean, reflect: true }) skeleton = false;

  /** Tag text. Truncated with `text-overflow: ellipsis` when `max-width` is set. */
  @property({ type: String }) label = '';

  /**
   * Maximum width for the tag, e.g. `'160px'`. When set, long labels are
   * truncated with an ellipsis and the full text is shown via the native
   * `title` tooltip attribute.
   */
  @property({ type: String, attribute: 'max-width' }) maxWidth = '';

  @state() private _hasIcon = false;

  /* ── Lifecycle ── */

  firstUpdated() {
    const slot = this.shadowRoot?.querySelector('slot[name="icon"]') as HTMLSlotElement | null;
    if (slot) {
      this._hasIcon = slot.assignedNodes({ flatten: true }).length > 0;
    }
  }

  updated(_changedProps: Map<string, unknown>) {
    // Resolve fill / text / border from the color preset, unless consumer
    // is supplying custom values via color="custom".
    if (this.color !== 'custom') {
      const preset = COLOR_PRESETS[this.color] ?? COLOR_PRESETS['neutral'];

      // Selectable + selected overrides the preset with the primary interactive color.
      if (this.variant === 'selectable' && this.selected) {
        this.style.setProperty('--so-tag-fill',   'var(--soSemanticColorInteractivePrimary)');
        this.style.setProperty('--so-tag-text',   'var(--soSemanticColorTextInverse)');
        this.style.setProperty('--so-tag-border', 'var(--soSemanticColorInteractivePrimary)');
      } else {
        this.style.setProperty('--so-tag-fill',   preset.fill);
        this.style.setProperty('--so-tag-text',   preset.text);
        this.style.setProperty('--so-tag-border', preset.border);
      }
    } else if (this.variant === 'selectable' && this.selected) {
      // Custom color + selected: override to primary interactive so text stays readable
      // against the dark selected background. Consumer CSS vars are restored on deselect.
      this.style.setProperty('--so-tag-fill',   'var(--soSemanticColorInteractivePrimary)');
      this.style.setProperty('--so-tag-text',   'var(--soSemanticColorTextInverse)');
      this.style.setProperty('--so-tag-border', 'var(--soSemanticColorInteractivePrimary)');
    } else {
      // Custom color + not selected: clear any inline overrides so consumer CSS vars win.
      this.style.removeProperty('--so-tag-fill');
      this.style.removeProperty('--so-tag-text');
      this.style.removeProperty('--so-tag-border');
    }

    if (this.maxWidth) {
      this.style.setProperty('--so-tag-max-width', this.maxWidth);
    } else {
      this.style.removeProperty('--so-tag-max-width');
    }
  }

  /* ── Event handlers ── */

  private _handleDismiss() {
    if (this.disabled) return;
    this.classList.add('so-dismissing');

    const base = this.shadowRoot?.querySelector('[part="base"]') as HTMLElement | null;
    if (!base) {
      this._finishDismiss();
      return;
    }

    const onEnd = () => {
      base.removeEventListener('transitionend', onEnd);
      this._finishDismiss();
    };
    base.addEventListener('transitionend', onEnd);
  }

  private _finishDismiss() {
    this.dispatchEvent(
      new CustomEvent<TagDismissDetail>('so-dismiss', {
        detail: { label: this.label },
        bubbles: true,
        composed: true,
      }),
    );
    this.remove();
  }

  private _handleSelect() {
    if (this.disabled) return;
    this.selected = !this.selected;
    this.dispatchEvent(
      new CustomEvent<TagSelectDetail>('so-change', {
        detail: { selected: this.selected, label: this.label },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleOperationalClick() {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent<TagClickDetail>('so-click', {
        detail: { label: this.label },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedNodes({ flatten: true }).length > 0;
  }

  /* ── Shared template fragments ── */

  private _iconSlot() {
    return html`
      <span
        part="icon"
        class=${this._hasIcon ? '' : 'hidden'}
      >
        <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
      </span>
    `;
  }

  private _labelSpan() {
    return html`
      <span
        part="label"
        title=${ifDefined(this.maxWidth ? this.label : undefined)}
      >${this.label}</span>
    `;
  }

  /* ── Render ── */

  render() {
    if (this.skeleton) {
      return html`<span part="base"></span>`;
    }

    switch (this.variant) {
      case 'read-only':
        return html`
          <span part="base">
            ${this._iconSlot()}
            ${this._labelSpan()}
          </span>
        `;

      case 'dismissible':
        return html`
          <span part="base">
            ${this._iconSlot()}
            ${this._labelSpan()}
            <button
              part="close"
              type="button"
              aria-label="Remove ${this.label}"
              ?disabled=${this.disabled}
              @click=${this._handleDismiss}
            >
              <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" width="12" height="12">
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </span>
        `;

      case 'selectable':
        return html`
          <button
            part="base"
            type="button"
            aria-pressed=${this.selected ? 'true' : 'false'}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? 'true' : nothing}
            @click=${this._handleSelect}
          >
            ${this._iconSlot()}
            ${this._labelSpan()}
          </button>
        `;

      case 'operational':
        return html`
          <button
            part="base"
            type="button"
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? 'true' : nothing}
            @click=${this._handleOperationalClick}
          >
            ${this._iconSlot()}
            ${this._labelSpan()}
          </button>
        `;

      default:
        return html`
          <span part="base">
            ${this._iconSlot()}
            ${this._labelSpan()}
          </span>
        `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-tag': SoTag;
  }
}
