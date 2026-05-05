import { css } from 'lit';

export const cardDeltaStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--soSemanticSpacingComponentXs); /* 4px */
    padding: calc(var(--soSemanticSpacingComponentXs) / 2) var(--soSemanticSpacingComponentXs); /* 2px 4px */
    border-radius: var(--soSemanticRadiusControl);
    font-family: var(--soSemanticTextStyleHeadingXsFontFamily, 'Geologica', system-ui, sans-serif);
    font-size: var(--soSemanticTextStyleHeadingXsFontSize, 18px);
    font-weight: var(--soSemanticTextStyleHeadingXsFontWeight, 600);
    line-height: var(--soSemanticTextStyleHeadingXsLineHeight, 1.375);
  }

  /* ── Sentiment ── */

  :host([sentiment='positive']) {
    background-color: var(--soSemanticColorStatusSuccessSubtle);
    color: var(--soSemanticColorStatusSuccess);
  }

  :host([sentiment='negative']) {
    background-color: var(--soSemanticColorStatusErrorSubtle);
    color: var(--soSemanticColorStatusError);
  }

  :host([sentiment='none']),
  :host(:not([sentiment])) {
    color: var(--soSemanticColorTextSubtle);
  }

  /* ── Parts ── */

  [part='arrow'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  [part='arrow'] svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;
