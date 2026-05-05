import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cardStyles } from './card.styles.js';
import type { CardMediaPosition, CardAlign, CardClickDetail } from './card.types.js';

/**
 * `so-card` — General-purpose card container, slot-driven.
 *
 * Supports media (image/video), header with title and subtitle, body text,
 * a chart/visualisation area, and an actions footer. Media position can be
 * top or bottom. When `clickable` the card root becomes a `<button>` (or
 * `<a>` when `href` is set) with hover/focus elevation.
 *
 * **Note:** Do not place interactive children (buttons, links) inside a
 * `clickable` card — nested interactive elements inside `<button>` are
 * invalid HTML and inaccessible.
 *
 * @slot              - Primary heading / title text. Rendered in the header zone.
 * @slot secondary    - Secondary / subtitle text or inline element (e.g. `so-card-delta`).
 * @slot body         - Supporting body text or any block content.
 * @slot chart        - Chart or data visualisation area.
 * @slot actions      - Action buttons rendered in the card footer.
 * @slot corner-action - Icon button or link rendered top-right of the header zone.
 * @slot media        - Image or media element. Rendered full-width.
 *
 * @csspart base    - Card root element (div / button / a)
 * @csspart media   - Media container
 * @csspart header  - Header zone
 * @csspart body    - Body zone
 * @csspart chart   - Chart zone
 * @csspart actions - Actions zone
 *
 * @fires so-click - Fired when a `clickable` card is activated.
 *   detail: `{ href?: string }`
 *
 * @example
 * <so-card>
 *   Card title
 *   <span slot="secondary">Subtitle goes here</span>
 *   <p slot="body">Supporting text goes here.</p>
 *   <img slot="media" src="/assets/media/sample.webp" alt="Sample" />
 * </so-card>
 *
 * @example
 * <!-- KPI card with delta -->
 * <so-card>
 *   KPI Label
 *   <span slot="secondary">
 *     <span style="font-size: 2rem; font-weight: 700;">30%</span>
 *     <so-card-delta value="1.2%" direction="up" sentiment="positive"></so-card-delta>
 *   </span>
 *   <span slot="body">Details about KPI go here</span>
 *   <div slot="chart">...</div>
 * </so-card>
 */
@customElement('so-card')
export class SoCard extends LitElement {
  static styles = cardStyles;

  // ── Props ──────────────────────────────────────────────────────────────────

  /** Makes the entire card interactive (renders as `<button>` or `<a>`) */
  @property({ type: Boolean, reflect: true }) clickable = false;

  /** Where the media slot renders relative to text zones */
  @property({ type: String, reflect: true, attribute: 'media-position' })
  mediaPosition: CardMediaPosition = 'top';

  /** CSS `aspect-ratio` value for the media container */
  @property({ type: String, attribute: 'aspect-ratio' }) aspectRatio = '16/9';

  /** Text alignment for all text zones */
  @property({ type: String, reflect: true }) align: CardAlign = 'start';

  /** When set with `clickable`, wraps the card in an `<a>` element */
  @property({ type: String }) href = '';

  /** Skeleton loading state — shows animated placeholder zones */
  @property({ type: Boolean, reflect: true }) skeleton = false;

  // ── Slot presence state ────────────────────────────────────────────────────

  @state() private _hasMedia = false;
  @state() private _hasSecondary = false;
  @state() private _hasBody = false;
  @state() private _hasChart = false;
  @state() private _hasActions = false;
  @state() private _hasCornerAction = false;

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  /**
   * Belt-and-suspenders for initial slot detection.
   *
   * `slotchange` is dispatched as a microtask — it fires *after* the first
   * Lit render cycle. For slots inside `?hidden` wrappers the event can be
   * delayed further (particularly when the slotted element is a custom element
   * that upgrades asynchronously, e.g. `so-button`). By querying
   * `assignedNodes()` directly here — after the DOM has been committed — we
   * capture the initial assignment synchronously and don't need to wait for
   * the event.
   */
  override firstUpdated() {
    this.shadowRoot?.querySelectorAll('slot').forEach(slot => {
      this._applySlotState(slot.name, slot.assignedNodes({ flatten: true }).length > 0);
    });
  }

  // ── Event handlers ─────────────────────────────────────────────────────────

  private _applySlotState(name: string, hasContent: boolean) {
    switch (name) {
      case 'media':
        this._hasMedia = hasContent;
        break;
      case 'secondary':
        this._hasSecondary = hasContent;
        break;
      case 'body':
        this._hasBody = hasContent;
        break;
      case 'chart':
        this._hasChart = hasContent;
        break;
      case 'actions':
        this._hasActions = hasContent;
        break;
      case 'corner-action':
        this._hasCornerAction = hasContent;
        break;
    }
  }

  private _onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._applySlotState(slot.name, slot.assignedNodes({ flatten: true }).length > 0);
  }

  private _handleClick() {
    if (!this.clickable) return;
    this.dispatchEvent(
      new CustomEvent<CardClickDetail>('so-click', {
        detail: { href: this.href || undefined },
        bubbles: true,
        composed: true,
      }),
    );
  }

  // ── Render helpers ─────────────────────────────────────────────────────────

  private _renderContent() {
    // querySelector fallback: ensures correct initial render even if slotchange
    // has not yet fired (can happen when slotted content is a custom element
    // that upgrades asynchronously, or when slot is inside a ?hidden container).
    const hasMedia = this._hasMedia || !!this.querySelector('[slot="media"]');
    const hasSecondary = this._hasSecondary || !!this.querySelector('[slot="secondary"]');
    const hasBody = this._hasBody || !!this.querySelector('[slot="body"]');
    const hasChart = this._hasChart || !!this.querySelector('[slot="chart"]');
    const hasActions = this._hasActions || !!this.querySelector('[slot="actions"]');
    const hasCornerAction =
      this._hasCornerAction || !!this.querySelector('[slot="corner-action"]');

    return html`
      <div
        part="media"
        ?hidden=${!hasMedia}
        style="--so-card-aspect-ratio: ${this.aspectRatio}"
      >
        <slot name="media" @slotchange=${this._onSlotChange}></slot>
      </div>

      <div part="header">
        <div class="header-text">
          <div class="title">
            <slot @slotchange=${this._onSlotChange}></slot>
          </div>
          <div class="subtitle" ?hidden=${!hasSecondary}>
            <slot name="secondary" @slotchange=${this._onSlotChange}></slot>
          </div>
        </div>
        <div class="corner-action" ?hidden=${!hasCornerAction}>
          <slot name="corner-action" @slotchange=${this._onSlotChange}></slot>
        </div>
      </div>

      <div part="body" ?hidden=${!hasBody}>
        <slot name="body" @slotchange=${this._onSlotChange}></slot>
      </div>

      <div part="chart" ?hidden=${!hasChart}>
        <slot name="chart" @slotchange=${this._onSlotChange}></slot>
      </div>

      <div part="actions" ?hidden=${!hasActions}>
        <slot name="actions" @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }

  private _renderSkeleton() {
    return html`
      <div part="base">
        <div
          class="skel skel-media"
          style="--so-card-aspect-ratio: ${this.aspectRatio}"
        ></div>
        <div part="header">
          <div class="header-text">
            <div class="skel skel-title"></div>
            <div class="skel skel-subtitle"></div>
          </div>
        </div>
        <div part="body">
          <div class="skel skel-body-line" style="width: 90%"></div>
          <div class="skel skel-body-line" style="width: 70%"></div>
        </div>
        <div part="chart">
          <div class="skel skel-chart"></div>
        </div>
      </div>
    `;
  }

  render() {
    if (this.skeleton) {
      return this._renderSkeleton();
    }

    const content = this._renderContent();

    if (this.clickable && this.href) {
      return html`
        <a part="base" href=${this.href} @click=${this._handleClick}>${content}</a>
      `;
    }

    if (this.clickable) {
      return html`
        <button part="base" type="button" @click=${this._handleClick}>${content}</button>
      `;
    }

    return html`<div part="base">${content}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-card': SoCard;
  }
}
