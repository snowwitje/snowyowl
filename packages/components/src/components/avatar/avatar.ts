import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { avatarStyles } from './avatar.styles.js';
import type { AvatarSize, AvatarVariant, AvatarStatus, AvatarClickDetail } from './avatar.types.js';
import '../badge/badge.js';
import '../toggletip/toggletip.js';

/* ── Hash-based color palette ────────────────────────────────────────────
   Primitive tokens used intentionally — the avatar color is a visual
   identifier for a person, not a semantic UI color. These 8 colors cover
   the full hue wheel and are all legible at white text.
─────────────────────────────────────────────────────────────────────── */
const AVATAR_COLORS = [
  { bg: 'var(--soColorNeutral400)',  text: 'var(--soColorNeutral0)' },
  { bg: 'var(--soColorMauve400)',    text: 'var(--soColorNeutral0)' },
  { bg: 'var(--soColorSand500)',     text: 'var(--soColorNeutral0)' },
  { bg: 'var(--soColorSlate500)',    text: 'var(--soColorNeutral0)' },
  { bg: 'var(--soColorCyan600)',     text: 'var(--soColorNeutral0)' },
  { bg: 'var(--soColorBlue500)',     text: 'var(--soColorNeutral0)' },
  { bg: 'var(--soColorMagenta500)', text: 'var(--soColorNeutral0)' },
  { bg: 'var(--soColorPurple500)',   text: 'var(--soColorNeutral0)' },
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash) % AVATAR_COLORS.length;
}

/**
 * `so-avatar` — SnowyOwl Avatar component.
 *
 * Displays a user's identity via image, initials, or a generic user icon.
 * Falls back gracefully: image → initials → icon.
 *
 * Colors are derived from the `name` prop via a hash, ensuring each user
 * gets a consistent, visually distinct colour across the app.
 *
 * @csspart base     - The circle container (or button when clickable)
 * @csspart image    - The img element
 * @csspart initials - The initials text span
 * @csspart icon     - The icon wrapper span
 * @csspart status   - The status badge
 *
 * @fires so-click - Fires when `clickable` is true and the avatar is activated.
 *   `detail: { name: string, email: string }`
 */
@customElement('so-avatar')
export class SoAvatar extends LitElement {
  static styles = avatarStyles;

  /* ── Props ── */

  /** Image URL. When absent or fails to load, falls back to initials then icon. */
  @property({ type: String }) src = '';

  /** Full name. Used for initials generation, alt text, and toggletip label. */
  @property({ type: String }) name = '';

  /** Optional email. Shown as secondary line in toggletip when provided. */
  @property({ type: String }) email = '';

  /** Alt text for the image. Defaults to `name`. Set to "" for decorative use. */
  @property({ type: String }) alt = '';

  /** Avatar diameter scale. */
  @property({ type: String, reflect: true }) size: AvatarSize = 'md';

  /** Visual style when showing initials or icon (no image). */
  @property({ type: String, reflect: true }) variant: AvatarVariant = 'filled';

  /** Status dot. 'none' hides the badge. */
  @property({ type: String, reflect: true }) status: AvatarStatus = 'none';

  /** When true, wraps avatar in so-toggletip showing name (and email if provided). */
  @property({ type: Boolean, reflect: true, attribute: 'show-tooltip' }) showTooltip = false;

  /** Makes avatar interactive — adds button semantics and fires so-click. */
  @property({ type: Boolean, reflect: true }) clickable = false;

  /* ── Internal state ── */

  @state() private _imageError = false;

  /* ── Lifecycle ── */

  protected override updated(changedProps: Map<string, unknown>) {
    // Reset image error when src changes
    if (changedProps.has('src')) {
      this._imageError = false;
    }
    this._updateColors();
  }

  /* ── Helpers ── */

  private _updateColors() {
    const index = this.name ? hashName(this.name) : 0;
    const colors = AVATAR_COLORS[index];

    if (this.variant === 'outline') {
      this.style.setProperty('--so-avatar-bg', 'var(--soSemanticColorSurfaceDefault)');
      this.style.setProperty('--so-avatar-text', colors.bg);
      this.style.setProperty('--so-avatar-border', colors.bg);
    } else {
      // filled (default)
      this.style.setProperty('--so-avatar-bg', colors.bg);
      this.style.setProperty('--so-avatar-text', colors.text);
      this.style.setProperty('--so-avatar-border', colors.bg);
    }
  }

  private _getInitials(): string {
    if (!this.name) return '';
    const words = this.name.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length === 0) return '';
    const first = words[0][0].toUpperCase();
    if (this.size === 'xs' || words.length === 1) return first;
    const last = words[words.length - 1][0].toUpperCase();
    return first + last;
  }

  private get _badgeSize(): 'sm' | 'md' {
    return this.size === 'xs' || this.size === 'sm' ? 'sm' : 'md';
  }

  /* ── Handlers ── */

  private _handleImageError() {
    this._imageError = true;
  }

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent<AvatarClickDetail>('so-click', {
        detail: { name: this.name, email: this.email },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /* ── Render helpers ── */

  private _renderContent() {
    // 1. Image
    if (this.src && !this._imageError) {
      return html`
        <img
          part="image"
          src=${this.src}
          alt=${this.alt || this.name}
          @error=${this._handleImageError}
        />
      `;
    }
    // 2. Initials
    const initials = this._getInitials();
    if (initials) {
      return html`<span part="initials" aria-hidden="true">${initials}</span>`;
    }
    // 3. Icon fallback
    return html`
      <span part="icon" aria-hidden="true">
        <so-icon name="user" decorative></so-icon>
      </span>
    `;
  }

  private _renderBadge() {
    if (this.status === 'none') return nothing;
    return html`
      <so-badge
        part="status"
        variant="status"
        status=${this.status}
        size=${this._badgeSize}
      ></so-badge>
    `;
  }

  private _renderBase() {
    const ariaLabel = this.alt ? this.alt : (this.name || 'Avatar');

    if (this.clickable) {
      return html`
        <button
          part="base"
          type="button"
          aria-label=${ariaLabel}
          @click=${this._handleClick}
        >
          ${this._renderContent()}
        </button>
        ${this._renderBadge()}
      `;
    }

    return html`
      <div
        part="base"
        role="img"
        aria-label=${ariaLabel}
      >
        ${this._renderContent()}
      </div>
      ${this._renderBadge()}
    `;
  }

  render() {
    if (this.showTooltip && this.name) {
      return html`
        <so-toggletip label=${this.name} placement="bottom">
          <div slot="trigger">
            ${this._renderBase()}
          </div>
          <div slot="content">
            <div
              style="
                font-weight: var(--soSemanticTextStyleLabelSmFontWeight);
                font-size: var(--soSemanticTextStyleLabelSmFontSize);
                color: var(--soSemanticColorTextOnTooltip);
              "
            >${this.name}</div>
            ${this.email
              ? html`
                <div
                  style="
                    font-size: var(--soSemanticTextStyleBodySmFontSize);
                    /* rgba fallback: --soSemanticColorTextSubtle resolves too dark on dark tooltip bg */
                    color: rgba(255, 255, 255, 0.7);
                    margin-top: 2px;
                  "
                >${this.email}</div>
              `
              : nothing}
          </div>
        </so-toggletip>
      `;
    }

    return html`${this._renderBase()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-avatar': SoAvatar;
  }
}
