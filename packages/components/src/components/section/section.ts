import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sectionStyles } from './section.styles.js';
import type { SectionGap, SectionHeadingLevel } from './section.types.js';
import '../divider/divider.js';

let _uid = 0;

/**
 * `so-section` — SnowyOwl content grouping primitive.
 *
 * A semantic `<section>` element with an optional heading, description,
 * actions slot, optional divider, and optional padding. Used to break
 * settings pages, dashboards, and forms into clearly named areas.
 *
 * @slot         - Section body content (fields, cards, toggles, etc.)
 * @slot actions - Optional action controls anchored to the top-right of the header.
 *
 * @csspart base        - The `<section>` element
 * @csspart header      - Header zone (heading + actions row)
 * @csspart header-text - Heading + description column
 * @csspart heading     - The heading element (h2/h3/h4)
 * @csspart description - Description paragraph
 * @csspart actions     - Actions slot wrapper
 * @csspart content     - Content slot wrapper
 *
 * @example
 * <so-section heading="Personal Info" description="Update your details.">
 *   <so-input label="Name"></so-input>
 *   <so-input label="Email"></so-input>
 * </so-section>
 *
 * @example
 * <so-section heading="Security" heading-level="h2" divided padded>
 *   <so-button slot="actions" variant="ghost" size="sm">Edit</so-button>
 *   <so-toggle label="Two-factor authentication"></so-toggle>
 * </so-section>
 */
@customElement('so-section')
export class SoSection extends LitElement {
  static styles = sectionStyles;

  private readonly _headingId = `so-section-heading-${++_uid}`;

  /* ── Props ── */

  /** Section heading text. When absent, no header zone is rendered. */
  @property({ type: String })
  heading = '';

  /** Optional description text below the heading. */
  @property({ type: String })
  description = '';

  /**
   * Heading element level.
   * Set appropriately for your page document outline.
   */
  @property({ type: String, attribute: 'heading-level' })
  headingLevel: SectionHeadingLevel = 'h3';

  /**
   * Adds `var(--soSpace6)` (24px) padding inside the section.
   * Useful when the section sits inside a card or panel.
   */
  @property({ type: Boolean, reflect: true })
  padded = false;

  /**
   * Renders a `so-divider` between the heading and the content slot.
   * Only visible when `heading` is set.
   */
  @property({ type: Boolean, reflect: true })
  divided = false;

  /**
   * Gap between the header zone and the content slot.
   * `none` = 0 | `xs` = 4px | `sm` = 8px | `md` = 16px |
   * `lg` = 24px | `xl` = 32px.
   */
  @property({ type: String, reflect: true })
  gap: SectionGap = 'lg';

  /* ── Internal ── */

  @state() private _hasActions = false;

  private _handleActionsSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasActions = slot.assignedElements({ flatten: true }).length > 0;
  }

  /* ── Heading rendering helper ── */

  private _renderHeading() {
    switch (this.headingLevel) {
      case 'h2':
        return html`<h2 part="heading" id=${this._headingId}>${this.heading}</h2>`;
      case 'h4':
        return html`<h4 part="heading" id=${this._headingId}>${this.heading}</h4>`;
      default:
        return html`<h3 part="heading" id=${this._headingId}>${this.heading}</h3>`;
    }
  }

  /* ── Render ── */

  override render() {
    const hasHeading = !!this.heading;

    return html`
      <section
        part="base"
        aria-labelledby=${hasHeading ? this._headingId : nothing}
      >
        ${hasHeading
          ? html`
              <div part="header" class="header">
                <div part="header-text" class="header-text">
                  ${this._renderHeading()}
                  ${this.description
                    ? html`<p part="description">${this.description}</p>`
                    : nothing}
                </div>
                <div
                  part="actions"
                  class=${`actions${this._hasActions ? ' has-content' : ''}`}
                >
                  <slot
                    name="actions"
                    @slotchange=${this._handleActionsSlotChange}
                  ></slot>
                </div>
              </div>
              ${this.divided ? html`<so-divider></so-divider>` : nothing}
            `
          : nothing}

        <div part="content">
          <slot></slot>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-section': SoSection;
  }
}
