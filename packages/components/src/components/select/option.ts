import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * `so-option` — Option element for use inside `so-select`.
 *
 * Not rendered visually — `so-select` reads its children and builds
 * the listbox internally.
 *
 * @example
 * <so-select label="Fruit">
 *   <so-option value="apple">Apple</so-option>
 *   <so-option value="banana">Banana</so-option>
 *   <so-option value="cherry" disabled>Cherry (unavailable)</so-option>
 * </so-select>
 */
@customElement('so-option')
export class SoOption extends LitElement {
  static styles = css`:host { display: none; }`;

  /** The value submitted or reported in the change event. */
  @property({ type: String }) value = '';

  /** Display label. If absent, the slotted text content is used. */
  @property({ type: String }) label = '';

  /** Prevents the option from being selected. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-option': SoOption;
  }
}
