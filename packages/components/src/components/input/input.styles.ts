import { css } from 'lit';

export const inputStyles = css`
  :host {
    display: block;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  }

  /* ── Wrapper ── */
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
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
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
    animation: so-skeleton-pulse 1.5s ease-in-out infinite;
  }

  /* ════════════════
     CHARACTER COUNTER
  ════════════════ */

  [part='counter'] {
    font-size: 12px;
    font-weight: 300;
    line-height: 1.2;
    color: var(--soSemanticColorTextSubtle, #6b7280);
    white-space: nowrap;
  }

  :host([disabled]) [part='counter'] {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  /* ════════════════
     HELPER TEXT
     Sits between label row and input. Negative margin-top pulls it
     4px closer to the label so label→helper = 4px (8px gap − 4px).
     helper→input retains the full 8px wrapper gap.
  ════════════════ */

  [part='helper'] {
    display: block;
    font-size: 12px;
    font-weight: 300;
    line-height: 1.4;
    color: var(--soSemanticColorTextSubtle, #6b7280);
    margin-top: -4px; /* net: 4px from label row (8px gap − 4px) */
  }

  /* ════════════════
     INPUT CONTROL (the visible field wrapper)
  ════════════════ */

  [part='control'] {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px; /* size md default */
    box-sizing: border-box;
    padding: 0 var(--soSpace3, 12px);
    gap: var(--soSpace3, 12px);
    border: 1px solid var(--soSemanticColorTextSubtle, #6b7280);
    border-radius: var(--soSemanticRadiusInput, 4px);
    background: var(--soSemanticColorSurfaceDefault, #ffffff);
    transition:
      border-color 120ms ease,
      border-width 120ms ease,
      box-shadow 120ms ease,
      background-color 120ms ease;
  }

  :host([size='lg']) [part='control'] {
    height: 48px;
  }

  /* ── Hover (only when no feedback state is active) ── */
  [part='control']:not([data-feedback]):hover {
    border: 1.5px solid var(--soSemanticColorTextDefault, #1f2937);
  }

  /* ── Feedback state borders ── */
  [part='control'][data-feedback='error'] {
    border: 1.5px solid var(--soSemanticColorStatusError, #dc2626);
  }

  [part='control'][data-feedback='warning'] {
    border: 1.5px solid var(--soSemanticColorStatusWarning, #d97706);
  }

  [part='control'][data-feedback='success'] {
    border: 1.5px solid var(--soSemanticColorStatusSuccess, #16a34a);
  }

  /* ── Focus ring (overrides hover and state borders) ── */
  [part='control']:focus-within {
    border: 1px solid var(--soSemanticColorTextSubtle, #6b7280);
    box-shadow: var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
    outline: none;
  }

  /* ════════════════
     NATIVE INPUT
  ════════════════ */

  [part='base'] {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    /* Fixed 16px — prevents iOS Safari auto-zoom on focus */
    font-size: 16px;
    font-weight: 300;
    line-height: 1.4;
    color: var(--soSemanticColorTextDefault, #1f2937);
    padding: 0;
  }

  [part='base']::placeholder {
    color: var(--soSemanticColorTextPlaceholder, #9ca3af);
    font-weight: 300;
  }

  /* ════════════════
     PREFIX / SUFFIX ICON SLOTS
  ════════════════ */

  .icon-slot {
    /* Hidden by default — shown only when slotted content exists */
    display: none;
    align-items: center;
    flex-shrink: 0;
    color: var(--soSemanticColorTextSubtle, #6b7280);
  }

  .icon-slot.has-content {
    display: flex;
  }

  /* ════════════════
     PASSWORD EYE-TOGGLE BUTTON
  ════════════════ */

  .eye-btn {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    background: none;
    border: none;
    padding: 2px;
    margin: 0;
    cursor: pointer;
    color: var(--soSemanticColorTextSubtle, #6b7280);
    border-radius: 2px;
    transition: color 120ms ease;
  }

  .eye-btn:hover {
    color: var(--soSemanticColorTextDefault, #1f2937);
  }

  .eye-btn:focus-visible {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
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
  }

  :host([disabled]) [part='base']::placeholder {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  :host([disabled]) [part='counter'],
  :host([disabled]) .icon-slot {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  /* ════════════════
     SKELETON STATE
  ════════════════ */

  :host([skeleton]) [part='control'] {
    background: var(--soSemanticColorSurfaceSkeleton, #d1d5db);
    border-color: transparent;
    pointer-events: none;
    animation: so-skeleton-pulse 1.5s ease-in-out infinite;
  }

  :host([skeleton]) [part='base'] {
    visibility: hidden;
  }

  /* ════════════════
     FEEDBACK MESSAGES
  ════════════════ */

  .feedback {
    /* wrapper gap 8px provides 8px separation from the input */
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
