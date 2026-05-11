import { css } from 'lit';

export const toastStyles = css`
  :host {
    display: block;
    pointer-events: auto;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
    min-width: 320px;
    max-width: 480px;

    /* Entrance start state */
    opacity: 0;
    transform: translateX(110%);
    transition:
      opacity var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault),
      transform var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault),
      max-height var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault),
      margin var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault),
      padding var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault);
    max-height: 600px;
  }

  :host(.so-toast-enter) {
    opacity: 1;
    transform: translateX(0);
  }

  /* Slide from left for left-position toasts */
  :host([slide-from='left']) {
    transform: translateX(-110%);
  }
  :host([slide-from='left'].so-toast-enter) {
    transform: translateX(0);
  }

  /* Slide from top for top-center toasts */
  :host([slide-from='top']) {
    transform: translateY(-110%);
  }
  :host([slide-from='top'].so-toast-enter) {
    transform: translateY(0);
  }

  /* Slide from bottom for bottom-center toasts */
  :host([slide-from='bottom']) {
    transform: translateY(110%);
  }
  :host([slide-from='bottom'].so-toast-enter) {
    transform: translateY(0);
  }

  /* Exit animation */
  :host(.so-toast-exit) {
    opacity: 0;
    transform: translateX(110%);
    max-height: 0;
    margin: 0;
  }

  :host([slide-from='left'].so-toast-exit) {
    transform: translateX(-110%);
  }
  :host([slide-from='top'].so-toast-exit) {
    transform: translateY(-110%);
  }
  :host([slide-from='bottom'].so-toast-exit) {
    transform: translateY(110%);
  }

  /* ── Base container ── */
  [part='base'] {
    display: flex;
    align-items: flex-start;
    gap: var(--soSpace3, 12px);
    padding: var(--soSpace4, 16px);
    border-radius: var(--soSemanticRadiusComponent);
    border: 1px solid var(--so-toast-border-color);
    background: var(--soSemanticColorSurfaceOverlay);
    box-shadow: var(--soSemanticShadowFloating);
  }

  /* ════════════════
     TYPE BORDER COLORS
  ════════════════ */

  :host([type='error']),
  :host(:not([type])) {
    --so-toast-border-color: var(--soSemanticColorStatusError);
  }

  :host([type='warning']) {
    --so-toast-border-color: var(--soSemanticColorStatusWarning);
  }

  :host([type='success']) {
    --so-toast-border-color: var(--soSemanticColorStatusSuccess);
  }

  :host([type='info']) {
    --so-toast-border-color: var(--soSemanticColorStatusInfo);
  }

  /* ── Icon ── */
  [part='icon'] {
    display: flex;
    align-items: flex-start;
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--so-toast-border-color);
  }

  [part='icon'] svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  /* ── Text zone ── */
  .text-zone {
    flex: 1;
    min-width: 0;
  }

  [part='title'] {
    display: block;
    font-size: var(--soSemanticTextStyleLabelMdFontSize);
    font-weight: var(--soSemanticTextStyleLabelMdFontWeight);
    color: var(--soSemanticColorTextDefault);
    line-height: var(--soSemanticTextStyleLabelMdLineHeight, 1.5);
  }

  [part='message'] {
    display: block;
    font-size: var(--soSemanticTextStyleBodySmFontSize);
    font-weight: var(--soSemanticTextStyleBodySmFontWeight);
    color: var(--soSemanticColorTextDefault);
    line-height: var(--soSemanticTextStyleBodySmLineHeight, 1.5);
  }

  [part='title'] + [part='message'] {
    margin-top: var(--soSpace1, 4px);
  }

  [part='timestamp'] {
    display: block;
    font-size: var(--soSemanticTextStyleCaptionFontSize);
    font-weight: var(--soSemanticTextStyleCaptionFontWeight);
    color: var(--soSemanticColorTextSubtle);
    margin-top: var(--soSpace4, 16px);
    line-height: var(--soSemanticTextStyleCaptionLineHeight, 1.4);
  }

  [part='action'] {
    display: block;
    margin-top: var(--soSpace3, 12px);
  }

  /* ── Close button ── */
  [part='close'] {
    flex-shrink: 0;
    color: var(--soSemanticColorTextSubtle);
  }

  @media (prefers-reduced-motion: reduce) {
    :host,
    :host(.so-toast-exit) {
      transition: none;
    }
  }
`;
