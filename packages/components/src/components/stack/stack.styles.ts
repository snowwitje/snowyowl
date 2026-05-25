import { css } from 'lit';

export const stackStyles = css`
  /* ── Base ── */

  :host {
    --so-stack-gap: var(--soSpace4);

    display: flex;
    flex-direction: column;
    gap: var(--so-stack-gap, var(--soSpace4));
    align-items: stretch;
    justify-content: start;
    box-sizing: border-box;
  }

  /* ── Gap scale ── */

  :host([gap='none']) { --so-stack-gap: var(--soSpace0); }
  :host([gap='xs'])   { --so-stack-gap: var(--soSpace1); }
  :host([gap='sm'])   { --so-stack-gap: var(--soSpace2); }
  :host([gap='md'])   { --so-stack-gap: var(--soSpace4); }
  :host([gap='lg'])   { --so-stack-gap: var(--soSpace6); }
  :host([gap='xl'])   { --so-stack-gap: var(--soSpace8); }
  :host([gap='2xl'])  { --so-stack-gap: var(--soSpace12); }

  /* ── Direction ── */

  :host([direction='row']) { flex-direction: row; }

  /* ── Align items ── */

  :host([align='start'])    { align-items: flex-start; }
  :host([align='center'])   { align-items: center; }
  :host([align='end'])      { align-items: flex-end; }
  :host([align='baseline']) { align-items: baseline; }

  /* ── Justify content ── */

  :host([justify='center'])        { justify-content: center; }
  :host([justify='end'])           { justify-content: flex-end; }
  :host([justify='space-between']) { justify-content: space-between; }
  :host([justify='space-around'])  { justify-content: space-around; }
  :host([justify='space-evenly'])  { justify-content: space-evenly; }

  /* ── Modifiers ── */

  :host([wrap])        { flex-wrap: wrap; }
  :host([inline])      { display: inline-flex; }
  :host([full-width])  { width: 100%; }
  :host([full-height]) { height: 100%; }
`;
