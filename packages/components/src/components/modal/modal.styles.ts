import { css } from 'lit';

export const modalStyles = css`
  :host {
    display: contents;
  }

  /* ════════════════
     BACKDROP
  ════════════════ */

  [part='backdrop'] {
    position: fixed;
    inset: 0;
    background-color: var(--soSemanticColorTextDefault);
    z-index: var(--soSemanticZindexOverlay);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault);
  }

  [part='backdrop']:not(.is-visible) {
    display: none;
  }

  [part='backdrop'].is-active {
    opacity: var(--soSemanticOpacityScrim);
    pointer-events: auto;
  }

  /* ════════════════
     DIALOG CONTAINER
  ════════════════ */

  [part='dialog'] {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.96);
    z-index: var(--soSemanticZindexModal);
    background: var(--soSemanticColorSurfaceOverlay);
    border-radius: var(--soSemanticRadiusContainer);
    box-shadow: var(--soSemanticShadowOverlay);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    box-sizing: border-box;
    overflow: hidden;
    opacity: 0;
    transition:
      opacity var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault),
      transform var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault);
  }

  [part='dialog']:not(.is-visible) {
    display: none;
  }

  [part='dialog'].is-active {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  /* ── Size variants ── */

  :host([size='sm']) [part='dialog'] {
    width: min(480px, calc(100vw - 32px));
  }

  :host([size='md']) [part='dialog'],
  :host(:not([size])) [part='dialog'] {
    width: min(640px, calc(100vw - 32px));
  }

  :host([size='lg']) [part='dialog'] {
    width: min(800px, calc(100vw - 32px));
  }

  :host([size='fullscreen']) [part='dialog'] {
    width: 100vw;
    max-height: 100vh;
    border-radius: 0;
    top: 0;
    left: 0;
    transform: scale(0.96);
  }

  :host([size='fullscreen']) [part='dialog'].is-active {
    transform: scale(1);
  }

  /* ════════════════
     HEADER ZONE
  ════════════════ */

  [part='header'] {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    /* Left and bottom padding only — close button fills top-right corner */
    padding-left: var(--soSemanticSpacingComponentLg);
    padding-bottom: var(--soSemanticSpacingComponentLg);
    border-bottom: 1px solid var(--soSemanticColorBorderSubtle);
    flex: 0 0 auto;
  }

  .header-slot-container {
    flex: 1 1 auto;
    padding-top: var(--soSemanticSpacingComponentLg);
    padding-right: var(--soSemanticSpacingComponentLg);
  }

  .header-text {
    flex: 1 1 auto;
    min-width: 0;
    padding-top: var(--soSemanticSpacingComponentLg);
    /* Gap between text and close button */
    padding-right: var(--soSemanticSpacingComponentMd);
  }

  [part='title'] {
    display: block;
    font-size: var(--soSemanticTextStyleHeadingSmFontSize);
    font-weight: var(--soSemanticTextStyleHeadingSmFontWeight);
    line-height: var(--soSemanticTextStyleHeadingSmLineHeight);
    letter-spacing: var(--soSemanticTextStyleHeadingSmLetterSpacing);
    color: var(--soSemanticColorTextDefault);
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
    margin: 0;
  }

  [part='subtitle'] {
    display: block;
    font-size: var(--soSemanticTextStyleLabelLgFontSize);
    font-weight: var(--soSemanticTextStyleLabelLgFontWeight);
    line-height: var(--soSemanticTextStyleLabelLgLineHeight);
    letter-spacing: var(--soSemanticTextStyleLabelLgLetterSpacing);
    color: var(--soSemanticColorTextSubtle);
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
    margin: var(--soSemanticSpacingComponentXs) 0 0;
  }

  /* Close button is placed at the top-right corner without outer padding */
  .close-btn-wrap {
    flex-shrink: 0;
    align-self: flex-start;
    /* No top or right padding — button sits flush with dialog corner */
    margin-right: 0;
  }

  /* ════════════════
     BODY ZONE
  ════════════════ */

  [part='body'] {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: var(--soSemanticSpacingComponentLg);
    font-size: var(--soSemanticTextStyleBodyMdFontSize);
    font-weight: var(--soSemanticTextStyleBodyMdFontWeight);
    line-height: var(--soSemanticTextStyleBodyMdLineHeight);
    letter-spacing: var(--soSemanticTextStyleBodyMdLetterSpacing);
    color: var(--soSemanticColorTextDefault);
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
    -webkit-overflow-scrolling: touch;
  }

  /* ════════════════
     FOOTER ZONE
  ════════════════ */

  [part='footer'] {
    flex: 0 0 auto;
    padding: var(--soSemanticSpacingComponentLg);
    border-top: 1px solid var(--soSemanticColorBorderSubtle);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--soSemanticSpacingComponentSm);
  }

  [part='footer'][hidden] {
    display: none;
  }

  /* ════════════════
     LOADING OVERLAY
  ════════════════ */

  /*
    Overlay scrim uses ::before with opacity so the so-loader spinner
    is not dimmed — same pattern as so-loader[overlay].
  */
  [part='loader'] {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    isolation: isolate;
  }

  [part='loader']::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--soSemanticColorSurfaceOverlay);
    opacity: var(--soSemanticOpacityScrim);
    z-index: -1;
  }

  /* ════════════════
     REDUCED MOTION
  ════════════════ */

  @media (prefers-reduced-motion: reduce) {
    [part='backdrop'],
    [part='dialog'] {
      transition: none;
    }
  }
`;
