import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { stackStyles } from './stack.styles.js';
import type { StackAlign, StackDirection, StackGap, StackJustify } from './stack.types.js';

/**
 * `so-stack` — SnowyOwl flex layout primitive.
 *
 * A zero-markup flex container. Replaces ad-hoc
 * `<div style="display:flex; gap:16px; flex-direction:column">` with
 * idiomatic, token-driven SnowyOwl markup.
 *
 * **Critical:** `:host` IS the flex container — there is no inner wrapper
 * div. Slotted children are direct flex items, so `gap` and `align-items`
 * apply exactly as expected.
 *
 * @slot - Direct children become flex items.
 *
 * @example
 * <!-- vertical stack of form fields -->
 * <so-stack gap="lg">
 *   <so-input label="Name"></so-input>
 *   <so-input label="Email"></so-input>
 * </so-stack>
 *
 * @example
 * <!-- horizontal button row -->
 * <so-stack direction="row" gap="sm" justify="end">
 *   <so-button>Cancel</so-button>
 *   <so-button variant="primary">Save</so-button>
 * </so-stack>
 */
@customElement('so-stack')
export class SoStack extends LitElement {
  static styles = stackStyles;

  /** Flex direction. Default: `'column'`. */
  @property({ type: String, reflect: true })
  direction: StackDirection = 'column';

  /**
   * Gap between children. Maps to space tokens.
   * `none` = 0 | `xs` = 4px | `sm` = 8px | `md` = 16px |
   * `lg` = 24px | `xl` = 32px | `2xl` = 48px.
   */
  @property({ type: String, reflect: true })
  gap: StackGap = 'md';

  /** `align-items` value. Default: `'stretch'`. */
  @property({ type: String, reflect: true })
  align: StackAlign = 'stretch';

  /** `justify-content` value. Default: `'start'`. */
  @property({ type: String, reflect: true })
  justify: StackJustify = 'start';

  /** Enables `flex-wrap: wrap`. Useful for tag rows and button groups. */
  @property({ type: Boolean, reflect: true })
  wrap = false;

  /** Uses `display: inline-flex` instead of `flex`. */
  @property({ type: Boolean, reflect: true })
  inline = false;

  /** Sets `width: 100%` on the host. */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  /** Sets `height: 100%` on the host. */
  @property({ type: Boolean, reflect: true, attribute: 'full-height' })
  fullHeight = false;

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-stack': SoStack;
  }
}
