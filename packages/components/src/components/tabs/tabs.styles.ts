import { css } from 'lit';

export const tabsStyles = css`
  :host {
    display: block;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  }

  /* ════════════════
     TABLIST STRIP
  ════════════════ */

  [part='tablist'] {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    /* Overflow visible so tab focus rings are never clipped */
    overflow: visible;
  }

  /* Line variant — full-width bottom border provides the track line */
  :host([variant='line']) [part='tablist'] {
    border-bottom: 1px solid var(--soSemanticColorBorderStrong, #d1d5db);
  }

  /* Filled variant — colored strip background */
  :host([variant='filled']) [part='tablist'] {
    background: var(--soSemanticColorInteractivePrimarySubtle, #f3e8ff);
  }
`;
