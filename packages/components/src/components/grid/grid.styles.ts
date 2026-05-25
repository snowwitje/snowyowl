import { css } from 'lit';

export const gridStyles = css`
  /* ── Base ── */

  :host {
    --so-grid-gap: var(--soSpace4);

    display: grid;
    gap: var(--so-grid-gap, var(--soSpace4));
    align-items: stretch;
    justify-items: stretch;
    box-sizing: border-box;
  }

  /* ── Gap scale ── */

  :host([gap='none']) { --so-grid-gap: var(--soSpace0); }
  :host([gap='xs'])   { --so-grid-gap: var(--soSpace1); }
  :host([gap='sm'])   { --so-grid-gap: var(--soSpace2); }
  :host([gap='md'])   { --so-grid-gap: var(--soSpace4); }
  :host([gap='lg'])   { --so-grid-gap: var(--soSpace6); }
  :host([gap='xl'])   { --so-grid-gap: var(--soSpace8); }
  :host([gap='2xl'])  { --so-grid-gap: var(--soSpace12); }

  /* ── Align items ── */

  :host([align='start'])   { align-items: start; }
  :host([align='center'])  { align-items: center; }
  :host([align='end'])     { align-items: end; }

  /* ── Justify items ── */

  :host([justify='start'])  { justify-items: start; }
  :host([justify='center']) { justify-items: center; }
  :host([justify='end'])    { justify-items: end; }

  /* ── Full width ── */

  :host([full-width]) { width: 100%; }
`;
