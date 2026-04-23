import { css } from 'lit';

export const loaderStyles = css`
  /* ════════════════
     HOST — layout modes
  ════════════════ */

  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
  }

  :host([inline]) {
    display: inline-flex;
    vertical-align: middle;
    flex-direction: row;
  }

  :host([overlay]) {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }

  /*
    Scrim: background-color with opacity on ::before so the spinner itself
    is not dimmed. Parent must have position: relative.
  */
  :host([overlay])::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--soSemanticColorSurfaceDefault, #ffffff);
    opacity: 0.75;
    z-index: -1;
  }

  /* ════════════════
     SPINNER (SVG element)
  ════════════════ */

  [part='spinner'] {
    display: block;
    flex-shrink: 0;
  }

  /* ════════════════
     ARC SPIN — applied to the rotating arc circle or <g> group
     transform-box: fill-box ensures origin is relative to the element's own box
  ════════════════ */

  .arc-spin {
    transform-box: fill-box;
    transform-origin: 50% 50%;
    animation: so-spin 1s linear infinite;
  }

  /* ════════════════
     VISIBLE LABEL (overlay mode only)
  ════════════════ */

  [part='label'] {
    margin-top: 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    color: var(--soSemanticColorTextSubtle, #6b7280);
    text-align: center;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  }

  /* ════════════════
     KEYFRAMES
  ════════════════ */

  @keyframes so-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
