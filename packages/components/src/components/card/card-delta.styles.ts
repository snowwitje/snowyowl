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

  /* so-icon carries its own size via size="sm" (16px); color inherits from :host */
  [part='arrow'] {
    flex-shrink: 0;
  }
`;
