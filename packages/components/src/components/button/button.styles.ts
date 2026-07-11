import { css } from 'lit';

export const buttonStyles = css`
    :host {
      display: inline-flex;
    }

    :host([full-width]) {
      display: flex;
      width: 100%;
    }

    /* ── Base ── */
    [part='base'] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--so-btn-gap);
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      text-decoration: none;
      width: 100%;

      /* Sizing — set by size host selectors */
      height: var(--so-btn-height);
      padding: 0 var(--so-btn-padding-h);
      min-width: var(--so-btn-height);

      /* Typography */
      font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
      font-size: var(--so-btn-font-size);
      font-weight: var(--soSemanticTextStyleBodyMdFontWeight);
      line-height: var(--so-btn-line-height);
      letter-spacing: var(--so-btn-letter-spacing, 0);

      /* Shape — driven by semantic tokens */
      border-radius: var(--soSemanticRadiusComponent, 8px);
      border: 0 solid transparent;

      /* Colors — driven by variant host selectors */
      background: var(--so-btn-bg);
      color: var(--so-btn-color);
      border-width: var(--so-btn-border-width, 0);
      border-color: var(--so-btn-border-color, transparent);

      /* Transitions */
      transition:
        background-color var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
        color var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
        border-color var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
        box-shadow var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
        opacity var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault);

      -webkit-appearance: none;
      appearance: none;
    }

    /* ── Focus ── */
    [part='base']:focus-visible {
      outline: none;
      box-shadow: var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
    }

    /* ── Icon sizing via slotted so-icon ── */
    ::slotted(so-icon) {
      --so-icon-size: var(--so-btn-icon-size);
      flex-shrink: 0;
    }

    /* ════════════════
       SIZES
    ════════════════ */

    /* sm — 32px */
    :host([size='sm']) [part='base'],
    :host(:not([size])) [part='base'] {
      --so-btn-height:        32px;
      --so-btn-padding-h:     12px;
      --so-btn-font-size:     var(--soSemanticTextStyleLabelSmFontSize);
      --so-btn-line-height:   var(--soSemanticTextStyleLabelSmLineHeight);
      --so-btn-letter-spacing: var(--soSemanticTextStyleLabelSmLetterSpacing);
      --so-btn-gap:           8px;
      --so-btn-icon-size:     12px;
    }

    /* md — 40px (default) */
    :host([size='md']) [part='base'] {
      --so-btn-height:        40px;
      --so-btn-padding-h:     16px;
      --so-btn-font-size:     var(--soSemanticTextStyleLabelMdFontSize);
      --so-btn-line-height:   var(--soSemanticTextStyleLabelMdLineHeight);
      --so-btn-letter-spacing: var(--soSemanticTextStyleLabelMdLetterSpacing);
      --so-btn-gap:           12px;
      --so-btn-icon-size:     16px;
    }

    /* lg — 48px */
    :host([size='lg']) [part='base'] {
      --so-btn-height:        48px;
      --so-btn-padding-h:     20px;
      --so-btn-font-size:     var(--soSemanticTextStyleLabelLgFontSize);
      --so-btn-line-height:   var(--soSemanticTextStyleLabelLgLineHeight);
      --so-btn-letter-spacing: var(--soSemanticTextStyleLabelLgLetterSpacing);
      --so-btn-gap:           16px;
      --so-btn-icon-size:     20px;
    }

    /* ── Icon-only: square, no horizontal padding ── */
    :host([icon-only]) [part='base'],
    :host([icon-circle]) [part='base'] {
      padding: 0;
      width: var(--so-btn-height);
      min-width: var(--so-btn-height);
    }

    /* ── Icon-circle: pill radius via badge token ── */
    :host([icon-circle]) [part='base'] {
      border-radius: var(--soSemanticRadiusBadge, 500px);
    }

    /* ── Full width ── */
    :host([full-width]) [part='base'] {
      width: 100%;
    }

    /* ════════════════
       VARIANTS
    ════════════════ */

    /* Primary */
    :host([variant='primary']) [part='base'],
    :host(:not([variant])) [part='base'] {
      --so-btn-bg:    var(--soSemanticColorInteractivePrimary, #6f5a7e);
      --so-btn-color: var(--soSemanticColorInteractiveActionText, #ffffff);
    }
    :host([variant='primary']:not([disabled]):not([skeleton])) [part='base']:hover,
    :host(:not([variant]):not([disabled]):not([skeleton])) [part='base']:hover {
      --so-btn-bg: var(--soSemanticColorInteractivePrimaryHover, #5a5160);
    }
    :host([variant='primary']:not([disabled]):not([skeleton])) [part='base']:active,
    :host(:not([variant]):not([disabled]):not([skeleton])) [part='base']:active {
      --so-btn-bg: var(--soSemanticColorInteractivePrimaryActive, #433c4a);
    }

    /* Secondary */
    :host([variant='secondary']) [part='base'] {
      --so-btn-bg:    var(--soSemanticColorInteractiveSecondary, #1f2937);
      --so-btn-color: var(--soSemanticColorInteractiveActionText, #ffffff);
    }
    :host([variant='secondary']:not([disabled]):not([skeleton])) [part='base']:hover {
      --so-btn-bg: var(--soSemanticColorInteractiveSecondaryHover, #111827);
    }
    :host([variant='secondary']:not([disabled]):not([skeleton])) [part='base']:active {
      --so-btn-bg: var(--soSemanticColorInteractiveSecondaryActive, #030712);
    }

    /* Outline */
    :host([variant='outline']) [part='base'] {
      --so-btn-bg:           transparent;
      --so-btn-color:        var(--soSemanticColorInteractivePrimary, #6f5a7e);
      --so-btn-border-width: var(--soSemanticBorderWidthControlActive);
      --so-btn-border-color: var(--soSemanticColorInteractivePrimary, #6f5a7e);
    }
    :host([variant='outline']:not([disabled]):not([skeleton])) [part='base']:hover {
      --so-btn-bg:           var(--soSemanticColorInteractivePrimarySubtle, #f6f3f5);
      --so-btn-color:        var(--soSemanticColorInteractivePrimaryHover, #5a5160);
      --so-btn-border-color: var(--soSemanticColorInteractivePrimaryHover, #5a5160);
    }
    :host([variant='outline']:not([disabled]):not([skeleton])) [part='base']:active {
      --so-btn-bg:           var(--soSemanticColorInteractivePrimarySubtle, #f6f3f5);
      --so-btn-color:        var(--soSemanticColorInteractivePrimaryActive, #433c4a);
      --so-btn-border-color: var(--soSemanticColorInteractivePrimaryActive, #433c4a);
    }

    /* Ghost */
    :host([variant='ghost']) [part='base'] {
      --so-btn-bg:    transparent;
      --so-btn-color: var(--soSemanticColorTextDefault, #1f2937);
    }
    :host([variant='ghost']:not([disabled]):not([skeleton])) [part='base']:hover {
      --so-btn-bg: var(--soSemanticColorInteractiveGhostHover, #f5ede8);
    }
    :host([variant='ghost']:not([disabled]):not([skeleton])) [part='base']:active {
      --so-btn-bg: var(--soSemanticColorInteractiveGhostActive, #ede0d8);
    }

    /* Danger */
    :host([variant='danger']) [part='base'] {
      --so-btn-bg:    var(--soSemanticColorInteractiveDanger, #bb1637);
      --so-btn-color: var(--soSemanticColorInteractiveActionText, #ffffff);
    }
    :host([variant='danger']:not([disabled]):not([skeleton])) [part='base']:hover {
      --so-btn-bg: var(--soSemanticColorInteractiveDangerHover, #95020e);
    }
    :host([variant='danger']:not([disabled]):not([skeleton])) [part='base']:active {
      --so-btn-bg: var(--soSemanticColorInteractiveDangerActive, #7f1d1d);
    }

    /* ════════════════
       STATES
    ════════════════ */

    /* Disabled */
    :host([disabled]) {
      pointer-events: none;
    }
    :host([disabled]) [part='base'] {
      opacity: var(--soSemanticOpacityDisabled);
      cursor: not-allowed;
    }

    /* Skeleton */
    :host([skeleton]) [part='base'] {
      --so-btn-bg:           var(--soSemanticColorSurfaceSkeleton, #d1d5db);
      --so-btn-color:        transparent;
      --so-btn-border-color: transparent;
      pointer-events: none;
      animation: so-skeleton-pulse var(--soSemanticMotionDurationSkeleton) var(--soSemanticMotionEasingDefault) infinite;
    }
    :host([skeleton]) ::slotted(*) {
      opacity: 0;
    }

    @keyframes so-skeleton-pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.5; }
    }
  `;