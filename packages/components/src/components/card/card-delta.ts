import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cardDeltaStyles } from './card-delta.styles.js';
import type { DeltaDirection, DeltaSentiment } from './card.types.js';

/**
 * `so-card-delta` — Inline delta indicator with directional arrow and sentiment coloring.
 *
 * Direction (arrow) and sentiment (color) are independent — you can show an up arrow
 * in red (negative) or a down arrow in green (positive).
 *
 * @csspart arrow  - Arrow icon container
 * @csspart value  - Value text
 *
 * @example
 * <so-card-delta value="1.2%" direction="up" sentiment="positive"></so-card-delta>
 */
@customElement('so-card-delta')
export class SoCardDelta extends LitElement {
  static styles = cardDeltaStyles;

  /** The delta value string, e.g. `'1.2%'` or `'+4'` */
  @property({ type: String }) value = '';

  /** Arrow direction — independent of sentiment */
  @property({ type: String, reflect: true }) direction: DeltaDirection = 'none';

  /** Color sentiment — `positive` = green, `negative` = red, `none` = subtle */
  @property({ type: String, reflect: true }) sentiment: DeltaSentiment = 'none';

  private _renderArrow() {
    if (this.direction === 'up') {
      return html`
        <span part="arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3.5L3.5 10h9L8 3.5z" />
          </svg>
        </span>
      `;
    }
    if (this.direction === 'down') {
      return html`
        <span part="arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12.5L12.5 6h-9L8 12.5z" />
          </svg>
        </span>
      `;
    }
    return nothing;
  }

  render() {
    return html`
      ${this._renderArrow()}
      <span part="value">${this.value}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-card-delta': SoCardDelta;
  }
}
