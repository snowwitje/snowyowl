import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { loaderStyles } from './loader.styles.js';
import type { LoaderSize, LoaderVariant } from './loader.types.js';

/**
 * `so-loader` — SnowyOwl Loader / Spinner component.
 *
 * Variants: arc (default) | gradient
 * Sizes:    sm (24px) | md (40px) | lg (56px) | xl (72px)
 *
 * Layout modes:
 * - Default: centered flex block
 * - `inline` attribute: inline-flex, vertically centered with surrounding text
 * - `overlay` attribute: absolute overlay over parent container.
 *   **The parent element must have `position: relative`.**
 *
 * The `label` prop is always used as `aria-label` for screen readers.
 * When `overlay` is set, the label is also rendered as visible text below the spinner.
 *
 * @csspart spinner - The SVG spinner element
 * @csspart label   - Visible label text (overlay mode only)
 *
 * @example
 * <so-loader></so-loader>
 *
 * @example
 * <!-- Overlay — parent must have position: relative -->
 * <div style="position: relative; height: 200px;">
 *   <so-loader overlay label="Loading data…"></so-loader>
 * </div>
 *
 * @example
 * <!-- Inline with text -->
 * <p>Saving <so-loader inline size="sm"></so-loader></p>
 */
@customElement('so-loader')
export class SoLoader extends LitElement {
  static styles = loaderStyles;

  /** Spinner diameter scale */
  @property({ type: String, reflect: true }) size: LoaderSize = 'md';

  /** Visual style: arc (rounded cap spinner) or gradient (layered comet sweep) */
  @property({ type: String, reflect: true }) variant: LoaderVariant = 'arc';

  /**
   * Accessible label announced to screen readers.
   * Also rendered as visible text below the spinner when `overlay` is true.
   * Defaults to "Loading" when not provided.
   */
  @property({ type: String }) label = '';

  /**
   * Renders an absolute-positioned scrim over the parent container.
   * Parent must have `position: relative`.
   */
  @property({ type: Boolean, reflect: true }) overlay = false;

  /** Renders spinner inline with surrounding text flow (no centering wrapper) */
  @property({ type: Boolean, reflect: true }) inline = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'status');
    this.setAttribute('aria-live', 'polite');
    this.setAttribute('aria-label', this.label || 'Loading');
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('label')) {
      this.setAttribute('aria-label', this.label || 'Loading');
    }
  }

  // ── Size parameters ───────────────────────────────────────────────────────

  private _sizeParams(): { d: number; tw: number } {
    const map: Record<LoaderSize, { d: number; tw: number }> = {
      sm: { d: 24,  tw: 3   },
      md: { d: 40,  tw: 4.5 },
      lg: { d: 56,  tw: 6   },
      xl: { d: 72,  tw: 7   },
    };
    return map[this.size] ?? map.md;
  }

  // ── Arc variant ───────────────────────────────────────────────────────────

  private _renderArc(d: number, cx: number, cy: number, r: number, tw: number, circ: number) {
    const arcLen = 0.4 * circ;
    const gap    = circ - arcLen;

    return html`
      <svg
        part="spinner"
        viewBox="0 0 ${d} ${d}"
        width="${d}"
        height="${d}"
        aria-hidden="true"
      >
        <!-- Track: full 360° ring, no animation -->
        <circle
          cx="${cx}" cy="${cy}" r="${r}"
          fill="none"
          stroke="var(--soSemanticColorInteractiveGhostHover)"
          stroke-width="${tw}"
        ></circle>
        <!-- Arc: ~40% of circumference, rotates continuously -->
        <circle
          class="arc-spin"
          cx="${cx}" cy="${cy}" r="${r}"
          fill="none"
          stroke="var(--soSemanticColorInteractivePrimary)"
          stroke-width="${tw}"
          stroke-linecap="round"
          stroke-dasharray="${arcLen} ${gap}"
        ></circle>
      </svg>
    `;
  }

  // ── Gradient variant ──────────────────────────────────────────────────────

  private _renderGradient(d: number, cx: number, cy: number, r: number, tw: number, circ: number) {
    // Three overlapping arcs — all end at the same leading tip, stacked in document
    // order so shorter arcs paint on top (closer to the tip). Offsets calculated so
    // each layer shares the same end position (0.4 × circ from the arc origin).
    //
    // Primitive color values used here are intentional hardcoded palette references
    // for a purely decorative gradient comet-tail effect:
    //   #deccc3 → color.sand.300  (trailing, lightest)
    //   #a6808c → color.mauve.400 (middle)
    //   var(--soSemanticColorInteractivePrimary) → mauve.600 (leading tip)
    const arc1 = 0.40 * circ; // trailing sand, widest
    const arc2 = 0.25 * circ; // mid mauve
    const arc3 = 0.15 * circ; // leading mauve, shortest
    const off2  = arc1 - arc2; // shift layer 2 forward so it ends where layer 1 ends
    const off3  = arc1 - arc3; // shift layer 3 forward so it ends where layer 1 ends

    return html`
      <svg
        part="spinner"
        viewBox="0 0 ${d} ${d}"
        width="${d}"
        height="${d}"
        aria-hidden="true"
      >
        <!-- Track: full 360° ring, no animation -->
        <circle
          cx="${cx}" cy="${cy}" r="${r}"
          fill="none"
          stroke="var(--soSemanticColorInteractiveGhostHover)"
          stroke-width="${tw}"
        ></circle>
        <!-- Rotating arc group: all three layers spin together -->
        <g class="arc-spin">
          <!-- Layer 1: trailing sand (widest, at back in paint order) -->
          <circle
            cx="${cx}" cy="${cy}" r="${r}"
            fill="none"
            stroke="#deccc3"
            stroke-width="${tw}"
            stroke-dasharray="${arc1} ${circ - arc1}"
          ></circle>
          <!-- Layer 2: mid mauve -->
          <circle
            cx="${cx}" cy="${cy}" r="${r}"
            fill="none"
            stroke="#a6808c"
            stroke-width="${tw}"
            stroke-dasharray="${arc2} ${circ - arc2}"
            stroke-dashoffset="${off2}"
          ></circle>
          <!-- Layer 3: leading mauve (shortest, on top in paint order) -->
          <circle
            cx="${cx}" cy="${cy}" r="${r}"
            fill="none"
            stroke="var(--soSemanticColorInteractivePrimary)"
            stroke-width="${tw}"
            stroke-linecap="round"
            stroke-dasharray="${arc3} ${circ - arc3}"
            stroke-dashoffset="${off3}"
          ></circle>
        </g>
      </svg>
    `;
  }

  // ── Render ────────────────────────────────────────────────────────────────

  render() {
    const { d, tw } = this._sizeParams();
    const cx   = d / 2;
    const cy   = d / 2;
    const r    = (d - tw) / 2;
    const circ = 2 * Math.PI * r;

    const spinner =
      this.variant === 'gradient'
        ? this._renderGradient(d, cx, cy, r, tw, circ)
        : this._renderArc(d, cx, cy, r, tw, circ);

    const showLabel = this.overlay && !!this.label;

    return html`
      ${spinner}
      ${showLabel ? html`<span part="label">${this.label}</span>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-loader': SoLoader;
  }
}
