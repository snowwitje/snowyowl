import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { badgeStyles } from './badge.styles.js';
import type {
  BadgeVariant,
  BadgeSize,
  BadgeStatus,
  BadgeColor,
  BadgeOverlayPosition,
} from './badge.types.js';

/* ── Color presets — same palette as so-tag ────────────────────────────────
   Primitive tokens, not semantic. Fill/text/border are set as scoped CSS
   custom properties on the host via updated() so themes only need to
   override semantic tokens.
─────────────────────────────────────────────────────────────────────────── */
const COLOR_PRESETS: Record<string, { fill: string; text: string; border: string }> = {
  neutral: { fill: 'var(--soColorNeutral200)', text: 'var(--soColorNeutral800)', border: 'var(--soColorNeutral200)' },
  mauve:   { fill: 'var(--soColorMauve600)',   text: 'var(--soColorNeutral0)',   border: 'var(--soColorMauve600)'   },
  green:   { fill: 'var(--soColorGreen700)',    text: 'var(--soColorNeutral0)',   border: 'var(--soColorGreen700)'   },
  red:     { fill: 'var(--soColorRed700)',      text: 'var(--soColorNeutral0)',     border: 'var(--soColorRed700)'     },
  orange:  { fill: 'var(--soColorOrange500)',   text: 'var(--soColorNeutral0)',  border: 'var(--soColorOrange500)'  },
  yellow:  { fill: 'var(--soColorYellow200)',   text: 'var(--soColorNeutral800)',  border: 'var(--soColorYellow200)'  },
  sand:  { fill: 'var(--soColorSand300)',   text: 'var(--soColorNeutral900)',  border: 'var(--soColorSand300)'  },
  blue:    { fill: 'var(--soColorBlue700)',      text: 'var(--soColorNeutral0)',    border: 'var(--soColorBlue700)'    },
  cyan:    { fill: 'var(--soColorCyan400)',      text: 'var(--soColorNeutral0)',    border: 'var(--soColorCyan400)'    },
  purple:  { fill: 'var(--soColorPurple700)',   text: 'var(--soColorNeutral0)',  border: 'var(--soColorPurple700)'  },
};

const STATUS_COLORS: Record<string, string> = {
  online:  'var(--soColorGreen500)',
  busy:    'var(--soColorRed600)',
  away:    'var(--soColorYellow500)',
  new:     'var(--soColorBlue500)',
  offline: 'var(--soColorNeutral500)',
};

/**
 * `so-badge` — SnowyOwl badge component.
 *
 * Three variants:
 * - `count` — Numeric pill. Hidden (`display: none`) when `count=0` unless
 *   `show-zero` is set. Shows `"{max}+"` when the count exceeds `max`.
 * - `status` — Small coloured dot indicator (online / busy / away / offline).
 *   No text.
 * - `label` — Small text pill for non-numeric labels like "New", "Beta",
 *   "Pro". Supports the same named color presets as `so-tag`.
 *
 * **Zero count:** by default a badge with `count=0` is hidden entirely so
 * it doesn't reserve space. Set `show-zero` to force the "0" pill to render
 * (useful in analytics dashboards).
 *
 * **Overlay usage:** set `overlay` and optionally `overlay-position` to
 * absolutely-position the badge over a parent element. The parent must
 * have `position: relative`.
 *
 * ```html
 * <div style="position: relative; display: inline-flex;">
 *   <so-button variant="ghost" icon-only label="Notifications">
 *     <so-icon slot="prefix" name="notification-bell" decorative></so-icon>
 *   </so-button>
 *   <so-badge variant="count" count="3" color="red" overlay></so-badge>
 * </div>
 * ```
 *
 * **Custom color escape hatch:** `color="custom"` — supply from your CSS:
 * ```css
 * so-badge[color="custom"] {
 *   --so-badge-fill:   #e0f2fe;
 *   --so-badge-text:   #0c4a6e;
 *   --so-badge-border: #7dd3fc;
 * }
 * ```
 *
 * @csspart base  - The badge pill / dot element
 * @csspart label - Text content (count and label variants)
 */
@customElement('so-badge')
export class SoBadge extends LitElement {
  static styles = badgeStyles;

  /** Rendering mode */
  @property({ type: String, reflect: true }) variant: BadgeVariant = 'count';

  /** Visual size */
  @property({ type: String, reflect: true }) size: BadgeSize = 'md';

  /** Numeric count (count variant) */
  @property({ type: Number }) count = 0;

  /** Maximum count before showing "{max}+" (count variant) */
  @property({ type: Number }) max = 99;

  /** Dot color (status variant) */
  @property({ type: String, reflect: true }) status: BadgeStatus = 'offline';

  /**
   * Named color preset, or `'custom'` to provide `--so-badge-fill`,
   * `--so-badge-text`, and `--so-badge-border` from consumer CSS
   * (count and label variants).
   */
  @property({ type: String }) color: BadgeColor = 'neutral';

  /** Label text (label variant). Falls back to slotted content if empty. */
  @property({ type: String }) label = '';

  /**
   * When true, positions the badge absolutely over the nearest
   * `position: relative` parent element.
   */
  @property({ type: Boolean, reflect: true }) overlay = false;

  /**
   * Corner at which to anchor the badge when `overlay` is true.
   * Reflected so CSS attribute selectors can position it.
   */
  @property({ type: String, reflect: true, attribute: 'overlay-position' })
  overlayPosition: BadgeOverlayPosition = 'top-right';

  /**
   * When true, renders "0" as a normal pill instead of hiding the badge.
   * Useful in analytics dashboards where an explicit zero is meaningful.
   * Only affects the `count` variant.
   */
  @property({ type: Boolean, attribute: 'show-zero' }) showZero = false;

  /* ── Lifecycle ── */

  updated(_changedProps: Map<string, unknown>) {
    // Hide count variant when count is 0 and show-zero is not set.
    // Restores display for all other states (including other variants).
    if (this.variant === 'count' && this.count === 0 && !this.showZero) {
      this.style.setProperty('display', 'none');
    } else {
      this.style.removeProperty('display');
    }

    // ARIA — hidden badge needs no announcement; visible badge gets a label
    this.setAttribute('role', 'status');

    if (this.variant === 'count') {
      this.setAttribute('aria-label', `${this.count} notifications`);
    } else if (this.variant === 'status') {
      this.setAttribute('aria-label', `Status: ${this.status}`);
    } else {
      // label variant — use text content as aria-label
      const text = this.label || this.textContent?.trim() || '';
      if (text) this.setAttribute('aria-label', text);
    }

    // Color presets for count/label variants
    if (this.variant === 'count' || this.variant === 'label') {
      if (this.color !== 'custom') {
        const preset = COLOR_PRESETS[this.color] ?? COLOR_PRESETS['neutral'];
        this.style.setProperty('--so-badge-fill',   preset.fill);
        this.style.setProperty('--so-badge-text',   preset.text);
        this.style.setProperty('--so-badge-border', preset.border);
      } else {
        // Custom: clear inline overrides so consumer CSS vars win
        this.style.removeProperty('--so-badge-fill');
        this.style.removeProperty('--so-badge-text');
        this.style.removeProperty('--so-badge-border');
      }
    }

    // Status color
    if (this.variant === 'status') {
      const color = STATUS_COLORS[this.status] ?? STATUS_COLORS['offline'];
      this.style.setProperty('--so-badge-status-color', color);
    }
  }

  /* ── Helpers ── */

  private get _displayText(): string {
    if (this.count > this.max) return `${this.max}+`;
    return String(this.count);
  }

  /* ── Render ── */

  private _renderCount() {
    return html`
      <span part="base">
        <span part="label">${this._displayText}</span>
      </span>
    `;
  }

  private _renderStatus() {
    return html`<span part="base"></span>`;
  }

  private _renderLabel() {
    return html`
      <span part="base">
        ${this.label
          ? html`<span part="label">${this.label}</span>`
          : html`<span part="label"><slot></slot></span>`}
      </span>
    `;
  }

  render() {
    switch (this.variant) {
      case 'status':
        return this._renderStatus();
      case 'label':
        return this._renderLabel();
      case 'count':
      default:
        return this._renderCount();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-badge': SoBadge;
  }
}
