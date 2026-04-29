import { css } from 'lit';

export const tabStyles = css`
  :host {
    display: inline-flex;
    vertical-align: top;
    /* Overflow must remain visible so the focus ring is not clipped */
    overflow: visible;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host([skeleton]) {
    pointer-events: none;
    cursor: default;
  }

  /* ════════════════
     BASE BUTTON
  ════════════════ */

  [part='base'] {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 44px;
    padding: var(--soSpace2, 8px) var(--soSpace4, 16px);
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: transparent;
    color: var(--soSemanticColorTextSubtle, #6b7280);
    border: none;
    outline: none;
    box-sizing: border-box;
    position: relative;
    box-shadow: none;
    transition:
      background-color 120ms ease,
      color 120ms ease,
      box-shadow 120ms ease;
  }

  /* ════════════════
     LINE VARIANT
  ════════════════ */

  /* Unselected hover */
  :host([variant='line']:not([selected]):not([disabled]):not([skeleton])) [part='base']:hover {
    background: var(--soSemanticColorInteractiveGhostHover, #f3f4f6);
    color: var(--soSemanticColorTextDefault, #1f2937);
  }

  /* Selected */
  :host([selected][variant='line']) [part='base'] {
    background: var(--soSemanticColorInteractivePrimarySubtle, #f3e8ff);
    color: var(--soSemanticColorTextDefault, #1f2937);
    font-weight: 500;
    box-shadow: inset 0 -4px 0 var(--soSemanticColorInteractivePrimary, #7c3aed);
  }

  /* Selected hover */
  :host([selected][variant='line']:not([disabled])) [part='base']:hover {
    background: var(--soSemanticColorInteractiveGhostHover, #f3f4f6);
  }

  /* Selected focus-visible */
  :host([selected][variant='line']) [part='base']:focus-visible {
    box-shadow:
      inset 0 -4px 0 var(--soSemanticColorInteractivePrimary, #7c3aed),
      var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
  }

  /* ════════════════
     FILLED VARIANT
  ════════════════ */

  /* Unselected — takes strip color */
  :host([variant='filled']:not([selected])) [part='base'] {
    background: var(--soSemanticColorInteractivePrimarySubtle, #f3e8ff);
    color: var(--soSemanticColorTextSubtle, #6b7280);
  }

  /* Unselected hover */
  :host([variant='filled']:not([selected]):not([disabled]):not([skeleton])) [part='base']:hover {
    background: var(--soSemanticColorInteractiveGhostHover, #f3f4f6);
    color: var(--soSemanticColorTextDefault, #1f2937);
  }

  /* Selected */
  :host([selected][variant='filled']) [part='base'] {
    background: var(--soSemanticColorSurfaceDefault, #ffffff);
    color: var(--soSemanticColorTextDefault, #1f2937);
    font-weight: 500;
    box-shadow: inset 0 4px 0 var(--soSemanticColorInteractivePrimary, #7c3aed);
  }

  /* Selected hover */
  :host([selected][variant='filled']:not([disabled])) [part='base']:hover {
    background: var(--soSemanticColorInteractiveGhostHover, #f3f4f6);
  }

  /* Selected focus-visible */
  :host([selected][variant='filled']) [part='base']:focus-visible {
    box-shadow:
      inset 0 4px 0 var(--soSemanticColorInteractivePrimary, #7c3aed),
      var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
  }

  /* ════════════════
     FOCUS RING (base case — unselected)
  ════════════════ */

  [part='base']:focus-visible {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
  }

  /* ════════════════
     DISABLED
  ════════════════ */

  :host([disabled]) [part='base'] {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
    cursor: not-allowed;
    box-shadow: none;
  }

  /* Filled variant disabled — surface + text color both must be disabled tokens.
     Specificity here is (0,3,0), matching the filled unselected rule above.
     Coming later in the sheet means it wins the cascade. */
  :host([disabled][variant='filled']) [part='base'] {
    background: var(--soSemanticColorSurfaceDisabled, #f3f4f6);
    color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  /* ════════════════
     SKELETON
  ════════════════ */

  :host([skeleton]) [part='base'] {
    cursor: default;
    color: transparent;
    box-shadow: none;
  }

  /* Override any variant-specific backgrounds / indicators.
     Specificity (0,3,0) matches the variant rules above; later placement wins. */
  :host([skeleton][variant='line']) [part='base'],
  :host([skeleton][variant='filled']) [part='base'] {
    background: transparent;
    box-shadow: none;
  }

  /* Skeleton bar overlay.
     Width is controlled via --so-tab-skeleton-width so consumers / stories
     can vary it per-tab for a more natural loading appearance. */
  :host([skeleton]) [part='base']::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: var(--so-tab-skeleton-width, 80px);
    height: 14px;
    background: var(--soSemanticColorSurfaceSkeleton, #d1d5db);
    border-radius: 2px;
    animation: so-skeleton-pulse 1.5s ease-in-out infinite;
  }

  /* Hide actual content while skeleton is active */
  :host([skeleton]) [part='label'],
  :host([skeleton]) [part='icon'] {
    visibility: hidden;
  }

  /* ════════════════
     ICON
  ════════════════ */

  [part='icon'] {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }

  /* Restore [hidden] behaviour — our display rule above overrides the UA stylesheet. */
  [part='icon'][hidden] {
    display: none;
  }

  [part='icon'] ::slotted(*) {
    --so-icon-size: 20px;
  }

  /* ════════════════
     LABEL
  ════════════════ */

  [part='label'] {
    display: inline-block;
  }

  /* ════════════════
     KEYFRAMES
  ════════════════ */

  @keyframes so-skeleton-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
`;
