import { css } from 'lit';

export const sectionStyles = css`
  /* ── Base ── */

  :host {
    display: block;
    box-sizing: border-box;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: var(--so-section-gap, var(--soSpace6));
    padding: var(--so-section-padding, 0);
    box-sizing: border-box;
  }

  /* ── Gap scale ── */

  :host { --so-section-gap: var(--soSpace6); }
  :host([gap='none']) { --so-section-gap: var(--soSpace0); }
  :host([gap='xs'])   { --so-section-gap: var(--soSpace1); }
  :host([gap='sm'])   { --so-section-gap: var(--soSpace2); }
  :host([gap='md'])   { --so-section-gap: var(--soSpace4); }
  :host([gap='lg'])   { --so-section-gap: var(--soSpace6); }
  :host([gap='xl'])   { --so-section-gap: var(--soSpace8); }

  /* ── Padded variant ── */

  :host([padded]) { --so-section-padding: var(--soSpace6); }

  /* ── Header zone ── */

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--soSpace4);
  }

  .header-text {
    display: flex;
    flex-direction: column;
  }

  /* ── Heading levels ── */

  [part='heading'] {
    margin: 0;
    color: var(--soSemanticColorTextDefault);
  }

  h2[part='heading'] {
    font-size: var(--soSemanticTextStyleHeadingSmFontSize);
    font-weight: var(--soSemanticTextStyleHeadingSmFontWeight);
  }

  h3[part='heading'] {
    font-size: var(--soSemanticTextStyleHeadingXsFontSize);
    font-weight: var(--soSemanticTextStyleHeadingXsFontWeight);
  }

  h4[part='heading'] {
    font-size: var(--soSemanticTextStyleLabelLgFontSize);
    font-weight: var(--soSemanticTextStyleLabelLgFontWeight);
  }

  /* ── Description ── */

  [part='description'] {
    margin: var(--soSpace1) 0 0 0;
    font-size: var(--soSemanticTextStyleBodySmFontSize);
    font-weight: var(--soSemanticTextStyleBodySmFontWeight);
    color: var(--soSemanticColorTextSubtle);
  }

  /* ── Actions ── */

  .actions {
    flex-shrink: 0;
  }

  .actions:not(.has-content) {
    display: none;
  }
`;
