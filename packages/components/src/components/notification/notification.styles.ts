import { css } from 'lit';

export const notificationStyles = css`
  :host {
    display: block;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  }

  :host([hidden]),
  :host(.so-dismissed) {
    display: none;
  }

  /* ── Base container ── */
  [part='base'] {
    display: flex;
    align-items: flex-start;
    gap: var(--soSpace3, 12px);
    padding: var(--soSemanticSpacingComponentMd, 16px);
    border-radius: var(--soSemanticRadiusControl);
    border-width: var(--soSemanticBorderWidthControl, 1px);
    border-style: solid;

    /* Colors set per-type below */
    border-color: var(--so-notification-color);
    background-color: var(--so-notification-bg);

    /* Dismiss animation */
    overflow: hidden;
    transition:
      opacity var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault),
      max-height var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault),
      margin var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault),
      padding var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault);
    max-height: 500px;
  }

  :host(.so-dismissing) [part='base'] {
    opacity: 0;
    max-height: 0;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
  }

  /* ════════════════
     TYPE COLORS
  ════════════════ */

  :host([type='error']),
  :host(:not([type])) {
    --so-notification-color: var(--soSemanticColorStatusError);
    --so-notification-bg:    var(--soSemanticColorStatusErrorSubtle);
  }

  :host([type='warning']) {
    --so-notification-color: var(--soSemanticColorStatusWarning);
    --so-notification-bg:    var(--soSemanticColorStatusWarningSubtle);
  }

  :host([type='success']) {
    --so-notification-color: var(--soSemanticColorStatusSuccess);
    --so-notification-bg:    var(--soSemanticColorStatusSuccessSubtle);
  }

  :host([type='info']) {
    --so-notification-color: var(--soSemanticColorStatusInfo);
    --so-notification-bg:    var(--soSemanticColorStatusInfoSubtle);
  }

  /* ── Icon ── */
  [part='icon'] {
    display: flex;
    align-items: flex-start;
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--so-notification-color);
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

  /* ── Close button ── */
  [part='close'] {
    flex-shrink: 0;
    align-self: flex-start;
    /* The sm so-button is 32px tall; the × icon is 16px centered inside it,
       leaving 8px of implicit padding above. Pull up by that 8px so the icon
       top aligns with the container's 16px padding line. */
    margin-top: -8px;
    margin-right: -8px;
    color: var(--soSemanticColorTextSubtle);
  }

  @media (prefers-reduced-motion: reduce) {
    [part='base'] {
      transition: none;
    }
  }
`;
