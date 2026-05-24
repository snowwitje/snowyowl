import { css } from 'lit';

export const checkboxGroupStyles = css`
  :host {
    display: block;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  }

  /* ════════════════
     FIELDSET (reset + flex column)
  ════════════════ */

  [part='fieldset'] {
    border: none;
    margin: 0;
    padding: 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 8px; /* matches so-input .wrapper gap */
  }

  /* ════════════════
     LEGEND (group label)
     float + width trick makes <legend> participate in flex column layout
  ════════════════ */

  [part='legend'] {
    display: block;
    font-size: var(--soSemanticTextStyleLabelMdFontSize);
    font-weight: var(--soSemanticTextStyleLabelMdFontWeight);
    color: var(--soSemanticColorTextSubtle, #6b7280); /* matches so-input [part='label'] */
    padding: 0;
    float: left;
    width: 100%;
    margin-bottom: 0;
  }

  /* ════════════════
     HELPER TEXT
  ════════════════ */

  [part='helper'] {
    display: block;
    font-size: var(--soSemanticTextStyleCaptionFontSize);
    font-weight: var(--soSemanticTextStyleCaptionFontWeight);
    line-height: var(--soSemanticTextStyleCaptionLineHeight);
    color: var(--soSemanticColorTextSubtle, #6b7280);
    /* Net 4px from legend (8px gap − 4px) — same as so-input */
    margin-top: -4px;
    clear: left;
  }

  /* ════════════════
     SELECT-ALL AREA
  ════════════════ */

  .select-all-area {
    display: flex;
    flex-direction: column;
    gap: var(--soSemanticSpacingComponentMd);
    clear: left;
  }

  /* ════════════════
     ITEMS CONTAINER
  ════════════════ */

  [part='items'] {
    display: flex;
    flex-direction: column;
    gap: var(--soSpace1);
    clear: left;
  }

  :host([orientation='horizontal']) [part='items'] {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--soSemanticSpacingComponentMd);
  }

  /* ════════════════
     FEEDBACK MESSAGES
  ════════════════ */

  .feedback {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: var(--soSemanticTextStyleCaptionFontSize);
    font-weight: var(--soSemanticTextStyleCaptionFontWeight);
    line-height: var(--soSemanticTextStyleCaptionLineHeight);
  }

  .feedback svg {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    margin-top: 1px;
  }

  [part='error'] {
    color: var(--soSemanticColorStatusError, #dc2626);
  }

  [part='warning'] {
    color: var(--soSemanticColorStatusWarning, #d97706);
  }
`;
