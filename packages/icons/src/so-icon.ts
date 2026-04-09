import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SoIconName } from '../icon-names.js';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * `so-icon` — SnowyOwl icon component.
 *
 * Renders an icon from the SnowyOwl sprite by name.
 * Color inherits from `currentColor` — set via CSS `color` property.
 *
 * @attr {string} name - Icon name (e.g. "arrow-right", "search", "close")
 * @attr {string} size - xs|sm|md|lg|xl (default: md)
 * @attr {string} label - Accessible label for meaningful icons
 * @attr {boolean} decorative - True if icon is purely visual (next to text)
 *
 * @csspart svg - The inner SVG element
 *
 * @example
 * <!-- Decorative (next to visible label) -->
 * <so-icon name="search" decorative></so-icon> Search
 *
 * @example
 * <!-- Meaningful (standalone, no visible label) -->
 * <so-icon name="close" label="Close dialog"></so-icon>
 */
@customElement('so-icon')
export class SoIcon extends LitElement {
  /**
   * Set once at app startup to the URL where sprite.svg is served.
   *
   * Fragment-only hrefs (`#so-name`) do not resolve correctly from inside
   * shadow roots in most browsers — the lookup stays scoped to the shadow
   * tree instead of searching the main document. An absolute URL forces
   * the browser to fetch the sprite directly, bypassing that limitation.
   *
   * @example
   * // index.ts (called once before any so-icon renders)
   * import { SoIcon } from '@snowyowl/icons';
   * SoIcon.spriteUrl = '/sprite.svg';
   */
  static spriteUrl: string = '';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      /* Size is controlled by --so-icon-size or the size attribute */
      width: var(--so-icon-size, 20px);
      height: var(--so-icon-size, 20px);
    }

    :host([size='xs']) { --so-icon-size: 12px; }
    :host([size='sm']) { --so-icon-size: 16px; }
    :host([size='md']) { --so-icon-size: 20px; }
    :host([size='lg']) { --so-icon-size: 24px; }
    :host([size='xl']) { --so-icon-size: 32px; }

    svg {
      width: 100%;
      height: 100%;
      /* Prevent svg from capturing pointer events */
      pointer-events: none;
    }
  `;

  /** Icon name from the SnowyOwl icon set */
  @property({ type: String, reflect: true }) name: SoIconName | string = '';

  /** Size variant */
  @property({ type: String, reflect: true }) size: IconSize = 'md';

  /**
   * Accessible label — required when icon is used without visible text.
   * Rendered as aria-label on the svg element.
   */
  @property({ type: String }) label: string = '';

  /**
   * Mark as decorative — icon is purely visual, next to visible text.
   * Screen readers will skip it entirely.
   */
  @property({ type: Boolean, reflect: true }) decorative: boolean = false;

  render() {
    if (!this.name) return nothing;

    const href = SoIcon.spriteUrl
      ? `${SoIcon.spriteUrl}#so-${this.name}`
      : `#so-${this.name}`;

    return html`
      <svg
        part="svg"
        role=${this.decorative ? 'presentation' : 'img'}
        aria-hidden=${this.decorative ? 'true' : nothing}
        aria-label=${!this.decorative && this.label ? this.label : nothing}
        focusable="false"
        fill="currentColor"
      >
        <use href="${href}"></use>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-icon': SoIcon;
  }
}
