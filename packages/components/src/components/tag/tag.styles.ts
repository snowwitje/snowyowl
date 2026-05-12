import { css } from 'lit';

export const tagStyles = css`
  :host {
    display: inline-flex;
    vertical-align: middle;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
    /* Needed so max-width collapse animation has a from-value */
    max-width: 600px;
    overflow: hidden;
    transition:
      opacity var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
      max-width var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
      margin var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault);
  }

  :host([hidden]) {
    display: none;
  }

  :host([skeleton]) {
    pointer-events: none;
  }

  /* Dismiss exit animation — applied from JS */
  :host(.so-dismissing) {
    opacity: 0;
    max-width: 0;
    margin-inline: 0;
    pointer-events: none;
  }

  /* ── Base container ── */
  [part='base'] {
    display: inline-flex;
    align-items: center;
    gap: var(--soSpace15, 6px);
    height: 32px;
    box-sizing: border-box;
    border-radius: var(--soSemanticRadiusBadge);
    white-space: nowrap;
    background: var(--so-tag-fill);
    max-width: var(--so-tag-max-width, none);
    overflow: hidden;
    cursor: default;
    font-family: inherit;
    /* Needed so content doesn't overflow during dismiss animation */
    flex-shrink: 0;
    transition:
      background var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
      border-color var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
      box-shadow var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
      filter var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault);
  }

  /* ── read-only: no border, compact padding ── */
  :host([variant='read-only']) [part='base'],
  :host(:not([variant])) [part='base'] {
    padding: 0 var(--soSpace2, 8px);
    border: none;
  }

  /* ── dismissible: border, compact padding ── */
  :host([variant='dismissible']) [part='base'] {
    padding: 0 var(--soSpace1, 4px) 0 var(--soSpace2, 8px);
    border: 1px solid var(--so-tag-border);
  }

  /* ── selectable / operational: border, wider padding ── */
  :host([variant='selectable']) [part='base'],
  :host([variant='operational']) [part='base'] {
    padding: 0 var(--soSpace3, 12px);
    border: 1px solid var(--so-tag-border);
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    /* Inherit font from host — buttons don't inherit by default */
    font-size: var(--soSemanticTextStyleLabelSmFontSize);
    font-weight: var(--soSemanticTextStyleLabelSmFontWeight);
  }

  /* Hover — selectable / operational (not selected) */
  :host([variant='selectable']) [part='base']:not(:disabled):hover,
  :host([variant='operational']) [part='base']:not(:disabled):hover {
    filter: brightness(0.95);
  }

  /* Hover — selectable selected */
  :host([variant='selectable'][selected]) [part='base']:not(:disabled):hover {
    filter: none;
    background: var(--soSemanticColorInteractivePrimaryHover);
  }

  /* Focus ring — selectable / operational (keyboard navigation only) */
  :host([variant='selectable']) [part='base']:focus-visible,
  :host([variant='operational']) [part='base']:focus-visible {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus);
  }

  /* Suppress focus ring during mouse press so it doesn't flash on click */
  :host([variant='selectable']) [part='base']:active,
  :host([variant='operational']) [part='base']:active {
    box-shadow: none;
    outline: none;
  }

  /* ── Disabled ── */
  :host([disabled]) {
    opacity: var(--soSemanticOpacityDisabled);
  }

  :host([variant='selectable'][disabled]) [part='base'],
  :host([variant='operational'][disabled]) [part='base'] {
    cursor: not-allowed;
  }

  /* ── Skeleton ── */
  :host([skeleton]) [part='base'] {
    width: 80px;
    border: none;
    background: var(--soSemanticColorSurfaceSkeleton);
    animation: so-skeleton-pulse var(--soSemanticMotionDurationSkeleton) var(--soSemanticMotionEasingDefault) infinite;
  }

  @keyframes so-skeleton-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.5; }
  }

  /* ── Icon slot ── */
  [part='icon'] {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--so-tag-text);
  }

  [part='icon'].hidden {
    display: none;
  }

  /* so-icon sets --so-icon-size on its own :host([size]) rule, which wins
     over any inherited custom property. Force dimensions directly via
     ::slotted() — outer shadow root styles beat inner :host styles per
     the CSS cascade spec. */
  ::slotted(so-icon) {
    width: 16px;
    height: 16px;
  }

  /* ── Label ── */
  [part='label'] {
    font-size: var(--soSemanticTextStyleLabelSmFontSize);
    font-weight: var(--soSemanticTextStyleLabelSmFontWeight);
    color: var(--so-tag-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    line-height: var(--soSemanticTextStyleLabelSmLineHeight);
  }

  /* ── Close button (dismissible) ── */
  [part='close'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
    color: var(--so-tag-text);
    font-family: inherit;
    transition: background var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault);
  }

  [part='close']:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.1);
  }

  [part='close']:focus-visible {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus);
  }

  [part='close']:disabled {
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    :host,
    [part='base'],
    [part='close'] {
      transition: none;
      animation: none;
    }
  }
`;
