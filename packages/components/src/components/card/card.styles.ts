import { css } from 'lit';

export const cardStyles = css`
  /* ── Host ── */

  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  }

  /* ── Base (card root) ── */

  [part='base'] {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    background: var(--soSemanticColorSurfaceRaised);
    border: var(--soSemanticBorderWidthControl) solid var(--soSemanticColorBorderSubtle);
    border-radius: var(--soSemanticRadiusContainer);
    box-shadow: var(--soSemanticShadowContainer);
    overflow: hidden;
    cursor: default;
    /* Reset native button/anchor defaults */
    appearance: none;
    -webkit-appearance: none;
    text-decoration: none;
    color: inherit;
    text-align: left;
    padding: 0;
  }

  /* ── Clickable state ── */

  :host([clickable]) [part='base'] {
    cursor: pointer;
    transition: box-shadow var(--soSemanticMotionDurationPanel, 200ms)
      var(--soSemanticMotionEasingDefault, ease);
  }

  :host([clickable]) [part='base']:hover {
    box-shadow: var(--soSemanticShadowFloating);
    border: var(--soSemanticBorderWidthControl) solid var(--soSemanticColorBorderStrong);
  }

  :host([clickable]) [part='base']:focus-visible {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus);
  }

  /* ════════════════
     MEDIA ZONE
  ════════════════ */

  [part='media'] {
    width: 100%;
    overflow: hidden;
    aspect-ratio: var(--so-card-aspect-ratio, 16/9);
    flex-shrink: 0;
    /* order defaults to 0 — renders first in DOM = top */
  }

  /* Move media to bottom when media-position="bottom" */
  :host([media-position='bottom']) [part='media'] {
    order: 999;
  }

  /* Ensure slotted images fill the media zone */
  ::slotted(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ════════════════
     HEADER ZONE
  ════════════════ */

  [part='header'] {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--soSemanticSpacingComponentSm); /* 8px between text block and corner action */
    padding: var(--soSemanticSpacingComponentLg);
  }

  .header-text {
    display: flex;
    flex-direction: column;
    gap: var(--soSemanticSpacingComponentXs); /* 4px between title and subtitle */
    flex: 1;
    min-width: 0;
  }

  /* Title (default slot wrapper) — heading-sm */
  .title {
    font-family: var(--soSemanticTextStyleHeadingSmFontFamily, 'Geologica', system-ui, sans-serif);
    font-size: var(--soSemanticTextStyleHeadingSmFontSize, 20px);
    font-weight: var(--soSemanticTextStyleHeadingSmFontWeight, 600);
    line-height: var(--soSemanticTextStyleHeadingSmLineHeight, 1.375);
    letter-spacing: var(--soSemanticTextStyleHeadingSmLetterSpacing, 0);
    color: var(--soSemanticColorTextDefault);
    margin: 0;
  }

  /* Subtitle (secondary slot wrapper) — label-lg */
  .subtitle {
    font-family: var(--soSemanticTextStyleLabelLgFontFamily, 'Geologica', system-ui, sans-serif);
    font-size: var(--soSemanticTextStyleLabelLgFontSize, 16px);
    font-weight: var(--soSemanticTextStyleLabelLgFontWeight, 500);
    line-height: var(--soSemanticTextStyleLabelLgLineHeight, 1.25);
    letter-spacing: var(--soSemanticTextStyleLabelLgLetterSpacing, 0);
    color: var(--soSemanticColorTextSubtle);
    margin: 0;
  }

  .corner-action {
    flex-shrink: 0;
  }

  /* ════════════════
     BODY ZONE
  ════════════════ */

  [part='body'] {
    padding: 0 var(--soSemanticSpacingComponentLg) var(--soSemanticSpacingComponentLg);
    font-family: var(--soSemanticTextStyleBodyMdFontFamily, 'Geologica', system-ui, sans-serif);
    font-size: var(--soSemanticTextStyleBodyMdFontSize, 16px);
    font-weight: var(--soSemanticTextStyleBodyMdFontWeight, 300);
    line-height: var(--soSemanticTextStyleBodyMdLineHeight, 1.5);
    letter-spacing: var(--soSemanticTextStyleBodyMdLetterSpacing, 0);
    color: var(--soSemanticColorTextSubtle);
  }

  /* ════════════════
     CHART ZONE
  ════════════════ */

  [part='chart'] {
    padding: 0 var(--soSemanticSpacingComponentLg) var(--soSemanticSpacingComponentLg);
    overflow: hidden;
  }

  /* ════════════════
     ACTIONS ZONE
  ════════════════ */

  [part='actions'] {
    display: flex;
    flex-wrap: wrap;
    gap: var(--soSemanticSpacingComponentSm);
    align-items: center;
    padding: 0 var(--soSemanticSpacingComponentLg) var(--soSemanticSpacingComponentLg);
  }

  /* ════════════════
     ALIGNMENT
  ════════════════ */

  :host([align='center']) [part='header'] {
    justify-content: center;
  }

  :host([align='center']) .header-text {
    align-items: center;
    text-align: center;
  }

  :host([align='center']) [part='body'] {
    text-align: center;
  }

  :host([align='center']) [part='actions'] {
    justify-content: center;
  }

  /* ════════════════
     UTILITY
  ════════════════ */

  [hidden] {
    display: none !important;
  }

  /* ════════════════
     SKELETON
  ════════════════ */

  .skel {
    background: var(--soSemanticColorSurfaceSkeleton, #d1d5db);
    border-radius: var(--soSemanticRadiusComponent, 8px);
    animation: so-skeleton-pulse var(--soSemanticMotionDurationSkeleton, 1500ms)
      var(--soSemanticMotionEasingDefault, ease) infinite;
  }

  @keyframes so-skeleton-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .skel-media {
    width: 100%;
    aspect-ratio: var(--so-card-aspect-ratio, 16/9);
    border-radius: 0;
  }

  .skel-title {
    height: 20px;
    width: 60%;
  }

  .skel-subtitle {
    height: 16px;
    width: 80%;
    margin-top: var(--soSemanticSpacingComponentSm);
  }

  .skel-body-line {
    height: 14px;
    margin-bottom: 6px;
  }

  .skel-chart {
    height: 80px;
    border-radius: var(--soSemanticRadiusComponent, 8px);
  }
`;
