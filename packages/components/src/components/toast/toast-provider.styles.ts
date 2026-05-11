import { css } from 'lit';

export const toastProviderStyles = css`
  :host {
    display: block;
    position: fixed;
    z-index: var(--soSemanticZindexToast, 600);
    display: flex;
    flex-direction: column;
    gap: var(--soSpace3, 12px);
    pointer-events: none;
  }

  /* ── Position variants ── */

  :host([position='top-right']),
  :host(:not([position])) {
    top: var(--soSpace5, 20px);
    right: var(--soSpace5, 20px);
  }

  :host([position='top-left']) {
    top: var(--soSpace5, 20px);
    left: var(--soSpace5, 20px);
  }

  :host([position='top-center']) {
    top: var(--soSpace5, 20px);
    left: 50%;
    transform: translateX(-50%);
  }

  :host([position='bottom-right']) {
    bottom: var(--soSpace5, 20px);
    right: var(--soSpace5, 20px);
    flex-direction: column-reverse;
  }

  :host([position='bottom-left']) {
    bottom: var(--soSpace5, 20px);
    left: var(--soSpace5, 20px);
    flex-direction: column-reverse;
  }

  :host([position='bottom-center']) {
    bottom: var(--soSpace5, 20px);
    left: 50%;
    transform: translateX(-50%);
    flex-direction: column-reverse;
  }
`;
