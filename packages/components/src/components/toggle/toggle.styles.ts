import { css } from 'lit';

export const toggleStyles = css`
  :host {
    display: inline-block;
    vertical-align: top;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  }

  /* ── Wrapper ── */
  .wrapper {
    display: inline-flex;
    flex-direction: column;
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

  :host([disabled]) [part='label'] {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
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
     HELPER TEXT
  ════════════════ */

  [part='helper'] {
    display: block;
    font-size: 12px;
    font-weight: 300;
    line-height: 1.4;
    color: var(--soSemanticColorTextSubtle, #6b7280);
  }

  :host([disabled]) [part='helper'] {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  /* ════════════════
     TOGGLE ROW
  ════════════════ */

  .row {
    margin: 4px 0 0 0;
    padding: 0;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    min-height: 24px;
    overflow: visible;
    position: relative;
  }

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
    position: absolute;
    width: 48px;
    height: 24px;
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
     TRACK — [part='control']
  ════════════════ */

  [part='control'] {
    /* Fixed pill shape — 48×24px */
    flex: 0 0 48px;
    width: 48px;
    height: 24px;
    box-sizing: border-box;
    border-radius: var(--soSemanticRadiusBadge, 9999px);
    border: 1.5px solid var(--soSemanticColorInteractivePrimary, #7c3aed);
    background: transparent;
    /* relative so [part='thumb'] is positioned inside */
    position: relative;
    overflow: visible; /* keep so focus ring (box-shadow) is not clipped */
    transition:
      background-color 150ms ease,
      border-color 150ms ease,
      box-shadow 120ms ease;
  }

  /* Focus ring — triggered when the hidden input gets keyboard focus */
  [part='base']:focus-visible + [part='control'] {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
  }

  /* Hover — unchecked: darken border and thumb */
  :host(:not([checked])) .row:hover [part='control'] {
    border-color: var(--soSemanticColorInteractivePrimaryHover, #6d28d9);
  }

  :host(:not([checked])) .row:hover [part='thumb'] {
    background: var(--soSemanticColorInteractivePrimaryHover, #6d28d9);
  }

  /* Checked — filled track */
  :host([checked]) [part='control'] {
    background: var(--soSemanticColorInteractivePrimary, #7c3aed);
    border-color: var(--soSemanticColorInteractivePrimary, #7c3aed);
  }

  /* Hover — checked: darken fill (thumb stays white) */
  :host([checked]) .row:hover [part='control'] {
    background: var(--soSemanticColorInteractivePrimaryHover, #6d28d9);
    border-color: var(--soSemanticColorInteractivePrimaryHover, #6d28d9);
  }

  /* ════════════════
     THUMB — [part='thumb']
  ════════════════ */

  [part='thumb'] {
    position: absolute;
    left: 3px;
    top: 50%;
    /* Center vertically; horizontal slide via translateX */
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--soSemanticColorInteractivePrimary, #7c3aed);
    transition:
      transform 150ms ease,
      background-color 150ms ease;
    pointer-events: none;
  }

  /* Checked — thumb slides right and turns white. */
  :host([checked]) [part='thumb'] {
    transform: translateY(-50%) translateX(22px);
    background: var(--soSemanticColorTextInverse, #ffffff);
  }

  /* ════════════════
     VALUE LABEL
  ════════════════ */

  [part='value'] {
    display: inline-block;
    position: relative;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.4;
    color: var(--soSemanticColorTextDefault, #1f2937);
    user-select: none;
  }

  :host([disabled]) [part='value'] {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

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
     DISABLED STATE
  ════════════════ */

  /* Unchecked disabled — grey border, grey thumb */
  :host([disabled]) [part='control'] {
    border-color: var(--soSemanticColorTextDisabled, #9ca3af);
    background: transparent;
  }

  :host([disabled]) [part='thumb'] {
    background: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  /* Checked disabled — grey fill, white thumb */
  :host([disabled][checked]) [part='control'] {
    background: var(--soSemanticColorTextDisabled, #9ca3af);
    border-color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  :host([disabled][checked]) [part='thumb'] {
    background: var(--soSemanticColorTextInverse, #ffffff);
  }

  /* ════════════════
     SKELETON STATE
  ════════════════ */

  :host([skeleton]) [part='control'] {
    background: var(--soSemanticColorSurfaceSkeleton, #d1d5db);
    border-color: transparent;
    animation: so-skeleton-pulse 1.5s ease-in-out infinite;
  }

  :host([skeleton]) [part='thumb'] {
    opacity: 0;
  }

  /* ════════════════
     KEYFRAMES
  ════════════════ */

  @keyframes so-skeleton-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
`;
