import { css } from 'lit';

export const avatarStyles = css`
  /* ── Host ── */
  :host {
    display: inline-flex;
    position: relative;
    flex-shrink: 0;
    vertical-align: middle;

    /* Default size (md) */
    --so-avatar-size: 40px;
    --so-avatar-font-size: var(--soSemanticTextStyleLabelMdFontSize);
    --so-avatar-font-weight: var(--soSemanticTextStyleLabelMdFontWeight);
    --so-avatar-icon-size: 18px;
  }

  :host([size='xs']) {
    --so-avatar-size: 24px;
    --so-avatar-font-size: 10px; /* caption — no token at 10px */
    --so-avatar-font-weight: 500;
    --so-avatar-icon-size: 12px;
  }

  :host([size='sm']) {
    --so-avatar-size: 32px;
    --so-avatar-font-size: var(--soSemanticTextStyleLabelSmFontSize);
    --so-avatar-font-weight: var(--soSemanticTextStyleLabelSmFontWeight);
    --so-avatar-icon-size: 14px;
  }

  :host([size='md']) {
    --so-avatar-size: 40px;
    --so-avatar-font-size: var(--soSemanticTextStyleLabelMdFontSize);
    --so-avatar-font-weight: var(--soSemanticTextStyleLabelMdFontWeight);
    --so-avatar-icon-size: 18px;
  }

  :host([size='lg']) {
    --so-avatar-size: 56px;
    --so-avatar-font-size: var(--soSemanticTextStyleHeadingXsFontSize);
    --so-avatar-font-weight: var(--soSemanticTextStyleHeadingXsFontWeight);
    --so-avatar-icon-size: 24px;
  }

  :host([size='xl']) {
    --so-avatar-size: 72px;
    --so-avatar-font-size: var(--soSemanticTextStyleHeadingSmFontSize);
    --so-avatar-font-weight: var(--soSemanticTextStyleHeadingSmFontWeight);
    --so-avatar-icon-size: 32px;
  }

  /* ── Base circle ── */
  [part='base'] {
    width: var(--so-avatar-size);
    height: var(--so-avatar-size);
    border-radius: 50%;
    overflow: hidden; /* clips image and content to the circle */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-sizing: border-box;
    background: var(--so-avatar-bg, var(--soColorNeutral400));
    color: var(--so-avatar-text, var(--soColorNeutral0));
    border: none;
    cursor: default;
    appearance: none;
    -webkit-appearance: none;
    padding: 0;
    font-family: inherit;
    user-select: none;
    text-decoration: none;
  }

  /* Outline variant: border applied on the circle */
  :host([variant='outline']) [part='base'] {
    border: 1.5px solid var(--so-avatar-border, currentColor);
  }

  /* ── Clickable state ── */
  :host([clickable]) [part='base'] {
    cursor: pointer;
    transition: opacity var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault);
  }

  :host([clickable]) [part='base']:hover {
    opacity: 0.85;
  }

  :host([clickable]) [part='base']:focus {
    outline: none;
  }

  :host([clickable]) [part='base']:focus-visible {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus);
  }

  /* ── Image ── */
  [part='image'] {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    flex-shrink: 0;
  }

  /* ── Initials text ── */
  [part='initials'] {
    font-size: var(--so-avatar-font-size);
    font-weight: var(--so-avatar-font-weight);
    line-height: 1;
    letter-spacing: 0.02em;
    color: inherit;
    pointer-events: none;
  }

  /* ── Icon fallback ── */
  [part='icon'] {
    --so-icon-size: var(--so-avatar-icon-size);
    color: var(--so-avatar-text, var(--soColorNeutral0));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  /* ── Status badge ── */
  [part='status'] {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(25%, 25%);
    pointer-events: none;
  }
`;
