import { css } from 'lit';

export const textareaStyles = css`
  :host {
    display: block;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  }

  /* ════════════════
     WRAPPER
  ════════════════ */

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* ════════════════
     LABEL ROW (label + optional counter)
  ════════════════ */

  .label-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  [part='label'] {
    display: block;
    font-size: var(--soSemanticTextStyleLabelMdFontSize);
    font-weight: var(--soSemanticTextStyleLabelMdFontWeight);
    line-height: var(--soSemanticTextStyleLabelMdLineHeight);
    color: var(--soSemanticColorTextSubtle, #6b7280);
    cursor: default;
  }

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
    animation: so-skeleton-pulse var(--soSemanticMotionDurationSkeleton) var(--soSemanticMotionEasingDefault) infinite;
  }

  /* ════════════════
     CHARACTER COUNTER
  ════════════════ */

  [part='counter'] {
    font-size: var(--soSemanticTextStyleCaptionFontSize);
    font-weight: var(--soSemanticTextStyleCaptionFontWeight);
    line-height: var(--soSemanticTextStyleCaptionLineHeight);
    color: var(--soSemanticColorTextSubtle, #6b7280);
    white-space: nowrap;
  }

  :host([disabled]) [part='counter'] {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  /* ════════════════
     HELPER TEXT
     Negative margin-top pulls it 4px closer to the label (8px gap − 4px),
     so label→helper = 4px and helper→control = 8px.
  ════════════════ */

  [part='helper'] {
    display: block;
    font-size: var(--soSemanticTextStyleCaptionFontSize);
    font-weight: var(--soSemanticTextStyleCaptionFontWeight);
    line-height: var(--soSemanticTextStyleCaptionLineHeight);
    color: var(--soSemanticColorTextSubtle, #6b7280);
    margin-top: -4px;
  }

  /* ════════════════
     CONTROL WRAPPER (the visible field border + background)
  ════════════════ */

  [part='control'] {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: var(--soSpace3, 12px);
    border: 1px solid var(--soSemanticColorTextSubtle, #6b7280);
    border-radius: var(--soSemanticRadiusInput, 4px);
    background: var(--soSemanticColorSurfaceDefault, #ffffff);
    transition:
      border-color var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
      border-width var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
      box-shadow var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
      background-color var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault);
  }

  /* Hover — only when no feedback state is active */
  [part='control']:not([data-feedback]):hover {
    border: var(--soSemanticBorderWidthControlActive) solid var(--soSemanticColorTextDefault, #1f2937);
  }

  /* Focus ring — :focus-within covers the inner <textarea> gaining focus */
  [part='control']:focus-within {
    border: 1px solid var(--soSemanticColorTextSubtle, #6b7280);
    box-shadow: var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
    outline: none;
  }

  /* Feedback borders */
  [part='control'][data-feedback='error'] {
    border: var(--soSemanticBorderWidthControlActive) solid var(--soSemanticColorStatusError, #dc2626);
  }

  [part='control'][data-feedback='warning'] {
    border: var(--soSemanticBorderWidthControlActive) solid var(--soSemanticColorStatusWarning, #d97706);
  }

  [part='control'][data-feedback='success'] {
    border: var(--soSemanticBorderWidthControlActive) solid var(--soSemanticColorStatusSuccess, #16a34a);
  }

  /* ════════════════
     NATIVE TEXTAREA
  ════════════════ */

  [part='base'] {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    /* body-md = 16px — prevents iOS Safari auto-zoom on focus (same rule as so-input) */
    font-size: var(--soSemanticTextStyleBodyMdFontSize);
    font-weight: var(--soSemanticTextStyleBodyMdFontWeight);
    line-height: var(--soSemanticTextStyleBodyMdLineHeight);
    color: var(--soSemanticColorTextDefault, #1f2937);
    padding: 0;
    margin: 0;
    /* Vertical-only resize — prevents horizontal drag breaking layouts */
    resize: vertical;
    overflow-y: auto;
  }

  /*
   * When auto-grow is active the JS _updateHeight() controls height directly.
   * Suppress the resize handle and hide the scrollbar so content always fits.
   * overflow-y is toggled to 'auto' by JS if maxRows cap is reached.
   */
  :host([auto-grow]) [part='base'] {
    resize: none;
    overflow-y: hidden;
  }

  [part='base']::placeholder {
    color: var(--soSemanticColorTextPlaceholder, #9ca3af);
    font-weight: var(--soSemanticTextStyleBodyMdFontWeight);
  }

  /* ════════════════
     DISABLED STATE
  ════════════════ */

  :host([disabled]) [part='control'] {
    border-color: var(--soSemanticColorTextDisabled, #9ca3af);
    background: var(--soSemanticColorSurfaceDisabled, #f3f4f6);
    pointer-events: none;
  }

  :host([disabled]) [part='base'] {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
    cursor: not-allowed;
    resize: none;
  }

  :host([disabled]) [part='base']::placeholder {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  /* ════════════════
     SKELETON STATE
     The hidden textarea still occupies layout space (visibility: hidden ≠
     display: none), so [part='control'] height is naturally driven by the
     rows attribute on the native element — no explicit height needed.
  ════════════════ */

  :host([skeleton]) [part='control'] {
    background: var(--soSemanticColorSurfaceSkeleton, #d1d5db);
    border-color: transparent;
    pointer-events: none;
    animation: so-skeleton-pulse var(--soSemanticMotionDurationSkeleton) var(--soSemanticMotionEasingDefault) infinite;
  }

  :host([skeleton]) [part='base'] {
    visibility: hidden;
  }

  /* ════════════════
     FEEDBACK MESSAGES
  ════════════════ */

  .feedback {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: var(--soSemanticTextStyleCaptionFontSize);
    font-weight: var(--soSemanticTextStyleCaptionFontWeight);
    line-height: var(--soSemanticTextStyleCaptionLineHeight);
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

  [part='success'] {
    color: var(--soSemanticColorStatusSuccess, #16a34a);
  }

  /* ════════════════
     KEYFRAMES
  ════════════════ */

  @keyframes so-skeleton-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
`;
