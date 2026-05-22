import { css } from 'lit';

export const dividerStyles = css`
  /* ── Color token map ── */
  :host {
    --so-divider-color: var(--soSemanticColorBorderDefault);
  }

  :host([emphasis='strong']) {
    --so-divider-color: var(--soSemanticColorBorderStrong);
  }

  /* ── Horizontal (default) ── */
  :host {
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--so-divider-color);
    border: none;
    margin: 0;
    flex-shrink: 0;
    box-sizing: border-box;
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Vertical ── */
  :host([orientation='vertical']) {
    display: inline-block;
    width: 1px;
    height: 100%;
    background-color: var(--so-divider-color);
    align-self: stretch;
  }

  /* ── Labeled horizontal divider ── */
  :host([has-label]) {
    display: flex;
    align-items: center;
    gap: var(--soSemanticSpacingComponentMd);
    width: 100%;
    height: auto;
    background-color: transparent;
  }

  :host([has-label])::before,
  :host([has-label])::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: var(--so-divider-color);
    flex-shrink: 1;
  }

  /* ── Label text ── */
  [part='label'] {
    font-size: var(--soSemanticTextStyleBodySmFontSize);
    font-weight: var(--soSemanticTextStyleBodySmFontWeight);
    color: var(--soSemanticColorTextSubtle);
    white-space: nowrap;
    flex-shrink: 0;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  }
`;
