import { css } from 'lit';

export const checkboxStyles = css`
  :host {
    display: inline-block;
    vertical-align: top;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  }

  /* ── Wrapper ── */
  .wrapper {
    display: inline-flex;
    flex-direction: column;
    /* 4px base gap; .row and .feedback add 4px margin-top each → 8px total from prev item */
    gap: 4px;
  }

  /* ════════════════
     FIELD LABEL
  ════════════════ */

  [part='label'] {
    display: block;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
    color: var(--soSemanticColorTextSubtle, #6b7280);
  }

  /* ── Field label skeleton bar ── */
  :host([skeleton]) [part='label'] {
    color: transparent;
    position: relative;
    min-width: 60px;
    min-height: 14px;
  }

  :host([skeleton]) [part='label']::after {
    content: '';
    position: absolute;
    inset: 1px 0;
    background: var(--soSemanticColorSurfaceSkeleton, #d1d5db);
    border-radius: 2px;
    animation: so-skeleton-pulse 1.5s ease-in-out infinite;
  }

  /* ════════════════
     HELPER TEXT
  ════════════════ */

  [part='helper'] {
    display: block;
    font-size: 12px;
    font-weight: 300;
    line-height: 1.4;
    color: var(--soSemanticColorTextSubtle, #6b7280);
  }

  /* ════════════════
     CHECKBOX ROW
  ════════════════ */

  .row {
    /* 4px extra margin-top + wrapper gap 4px = 8px from previous item */
    margin: 4px 0 0 0;
    padding: 0;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    min-height: 20px;
    /* No overflow:hidden anywhere — focus ring must not be clipped */
    overflow: visible;
    position: relative;
  }

  /* Touch target — 44px minimum */
  :host([touch]) .row {
    min-height: 44px;
  }

  :host([disabled]) .row {
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([skeleton]) .row {
    pointer-events: none;
    cursor: default;
  }

  /* ════════════════
     NATIVE INPUT (visually hidden)
  ════════════════ */

  [part='base'] {
    /* Visually hidden but accessible + focusable */
    position: absolute;
    width: 16px;
    height: 16px;
    opacity: 0;
    margin: 0;
    padding: 0;
    border: 0;
    pointer-events: none;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  /* ════════════════
     VISUAL CONTROL BOX
  ════════════════ */

  [part='control'] {
    /* Fixed dimensions — flex shorthand prevents grow/shrink in the row */
    flex: 0 0 16px;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border-radius: var(--soSemanticRadiusControl, 2px);
    border: 1.5px solid var(--soSemanticColorTextDefault, #1f2937);
    background: transparent;
    /* position: relative for absolute-positioned marks */
    position: relative;
    /* No overflow:hidden — focus ring (box-shadow) must show */
    overflow: visible;
    transition:
      background-color 120ms ease,
      border-color 120ms ease,
      box-shadow 120ms ease;
  }

  /* Focus ring — triggers when the hidden input receives keyboard focus */
  [part='base']:focus-visible + [part='control'] {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
  }

  /* ── Hover halo (26×26 area centered on the 16×16 control) ──
     Placed on .row::before so it paints behind [part='control'] in
     document order — avoids z-index stacking context issues. */
  .row::before {
    content: '';
    position: absolute;
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    width: 26px;
    height: 26px;
    border-radius: var(--soSemanticRadiusControl, 2px);
    background: transparent;
    pointer-events: none;
    transition: background-color 120ms ease;
  }

  .row:hover::before {
    background: var(--soSemanticColorInteractiveGhostHover, #f3f4f6);
  }

  /* ── Checked ── */
  :host([checked]) [part='control'] {
    background: var(--soSemanticColorTextDefault, #1f2937);
    border-color: var(--soSemanticColorTextDefault, #1f2937);
  }

  /* ── Indeterminate (overrides checked visually) ── */
  :host([indeterminate]) [part='control'] {
    background: var(--soSemanticColorTextDefault, #1f2937);
    border-color: var(--soSemanticColorTextDefault, #1f2937);
  }

  /* ── Marks: always in DOM, positioned absolutely, shown via opacity ──
     Using opacity (not display/visibility) prevents any layout recalculation
     when checking/unchecking, which eliminates the 1px row-shift bug. */

  .checkmark {
    position: absolute;
    top: 50%;
    left: 50%;
    /* SVG is 10×8, translate by half to center */
    transform: translate(-50%, -50%);
    width: 10px;
    height: 8px;
    display: block;
    color: var(--soSemanticColorTextInverse, #ffffff);
    opacity: 0;
    pointer-events: none;
  }

  .indeterminate-bar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 2px;
    background: var(--soSemanticColorTextInverse, #ffffff);
    border-radius: 1px;
    opacity: 0;
    pointer-events: none;
  }

  /* Show checkmark only when checked and NOT indeterminate */
  :host([checked]:not([indeterminate])) [part='control'] .checkmark {
    opacity: 1;
  }

  /* Show bar only when indeterminate */
  :host([indeterminate]) [part='control'] .indeterminate-bar {
    opacity: 1;
  }

  /* ════════════════
     VALUE LABEL
  ════════════════ */

  [part='value'] {
    display: inline-block;
    position: relative;
    /* textStyle.body-md: 16px, weight 300, line-height 1.4 */
    font-size: 16px;
    font-weight: 300;
    line-height: 1.4;
    color: var(--soSemanticColorTextDefault, #1f2937);
    user-select: none;
  }

  :host([disabled]) [part='value'] {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  /* ── Value skeleton bar ── */
  :host([skeleton]) [part='value'] {
    color: transparent;
    min-width: 80px;
    min-height: 14px;
  }

  :host([skeleton]) [part='value']::after {
    content: '';
    position: absolute;
    inset: 3px 0;
    background: var(--soSemanticColorSurfaceSkeleton, #d1d5db);
    border-radius: 2px;
    animation: so-skeleton-pulse 1.5s ease-in-out infinite;
  }

  /* ════════════════
     ERROR STATE
  ════════════════ */

  [part='control'][data-error] {
    border-color: var(--soSemanticColorStatusError, #dc2626);
  }

  /* ════════════════
     DISABLED STATE
  ════════════════ */

  :host([disabled]) [part='control'] {
    border-color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  :host([disabled][checked]) [part='control'],
  :host([disabled][indeterminate]) [part='control'] {
    background: var(--soSemanticColorTextDisabled, #9ca3af);
    border-color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  /* ════════════════
     SKELETON STATE
  ════════════════ */

  :host([skeleton]) [part='control'] {
    background: var(--soSemanticColorSurfaceSkeleton, #d1d5db);
    border-color: transparent;
    animation: so-skeleton-pulse 1.5s ease-in-out infinite;
  }

  /* ════════════════
     FEEDBACK MESSAGES
  ════════════════ */

  .feedback {
    /* 4px extra margin-top + wrapper gap 4px = 8px from the .row */
    margin-top: 4px;
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
  }

  .feedback svg {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    margin-top: 1px;
  }

  [part='error'] {
    color: var(--soSemanticColorStatusError, #dc2626);
  }

  [part='warning'] {
    color: var(--soSemanticColorStatusWarning, #d97706);
  }

  /* ════════════════
     KEYFRAMES
  ════════════════ */

  @keyframes so-skeleton-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
`;
