import { css } from 'lit';

export const paginationStyles = css`
  :host {
    display: inline-flex;
    --so-pg-size: 40px; /* md default */
  }

  :host([size='sm']) {
    --so-pg-size: 32px;
  }

  :host([size='md']) {
    --so-pg-size: 40px;
  }

  :host([size='lg']) {
    --so-pg-size: 48px;
  }

  /* ── Container ── */
  [part='base'] {
    display: flex;
    align-items: center;
    gap: var(--soSpace1, 4px);
    flex-wrap: nowrap;
    margin: 0;
    padding: 0;
  }

  /* ── Page buttons ── */
  .page-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    border: none;
    padding: 0;
    background: transparent;
    color: var(--soSemanticColorTextDefault);
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
    font-size: var(--soSemanticTextStyleLabelSmFontSize);
    font-weight: var(--soSemanticTextStyleLabelSmFontWeight);
    border-radius: var(--soSemanticRadiusComponent);
    width: var(--so-pg-size);
    height: var(--so-pg-size);
    flex-shrink: 0;
    transition:
      background-color var(--soSemanticMotionDurationControl, 150ms) var(--soSemanticMotionEasingDefault, ease),
      color var(--soSemanticMotionDurationControl, 150ms) var(--soSemanticMotionEasingDefault, ease),
      box-shadow var(--soSemanticMotionDurationControl, 150ms) var(--soSemanticMotionEasingDefault, ease);
    -webkit-appearance: none;
    appearance: none;
  }

  .page-btn:hover {
    background: var(--soSemanticColorInteractiveGhostHover);
  }

  .page-btn:focus-visible {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus);
  }

  /* Active / current page */
  .page-btn[aria-current='page'] {
    background: var(--soSemanticColorInteractivePrimary);
    color: var(--soSemanticColorTextInverse);
  }

  /* Suppress hover override on current page */
  .page-btn[aria-current='page']:hover {
    background: var(--soSemanticColorInteractivePrimary);
  }

  /* ── Ellipsis ── */
  .ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--so-pg-size);
    height: var(--so-pg-size);
    color: var(--soSemanticColorTextSubtle);
    font-size: var(--soSemanticTextStyleLabelSmFontSize);
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
    cursor: default;
    user-select: none;
    flex-shrink: 0;
  }

  /* ── Disabled ── */
  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .page-btn {
    opacity: var(--soSemanticOpacityDisabled, 0.38);
    cursor: not-allowed;
  }

  :host([disabled]) .ellipsis {
    opacity: var(--soSemanticOpacityDisabled, 0.38);
  }
`;
