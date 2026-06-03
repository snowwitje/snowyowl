import { css } from 'lit';

export const accordionItemStyles = css`
  :host {
    display: block;
    border-top: var(--soBorderWidthThin) solid var(--soSemanticColorBorderDefault);
  }

  :host([last-item]) {
    border-bottom: var(--soBorderWidthThin) solid var(--soSemanticColorBorderDefault);
  }

  /* ── Heading element — strip browser margin ── */
  [part='heading-el'] {
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  /* ── Trigger button ── */
  [part='trigger'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 44px;
    padding: 0 var(--soSemanticSpacingComponentMd);
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    appearance: none;
    -webkit-appearance: none;
    transition: background-color var(--soSemanticMotionDurationControl);
    box-sizing: border-box;
    font-family: inherit;
  }

  :host([flush]) [part='trigger'] {
    padding: 0;
  }

  :host([icon-align='start']) [part='trigger'] {
    justify-content: flex-start;
    gap: var(--soSemanticSpacingComponentMd);
  }

  [part='trigger']:not([disabled]):hover {
    background: var(--soSemanticColorInteractiveGhostHover);
  }

  [part='trigger']:focus {
    outline: none;
  }

  [part='trigger']:focus-visible {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus);
    border-radius: var(--soSemanticRadiusControl);
  }

  :host([disabled]) [part='icon'] {
    cursor: not-allowed;
    opacity: var(--soSemanticOpacityDisabled);
  }
  [part='trigger'][disabled] {
    cursor: not-allowed;
  }

  /* ── Heading text ── */
  [part='heading-text'] {
    flex: 1;
    font-size: var(--soSemanticTextStyleLabelLgFontSize);
    font-weight: var(--soSemanticTextStyleLabelLgFontWeight);
    color: var(--soSemanticColorTextDefault);
  }

  :host([icon-align='start']) [part='heading-text'] {
    flex: none;
  }

  :host([disabled]) [part='heading-text'] {
    color: var(--soSemanticColorTextDisabled);
  }

  /* ── Chevron icon ── */
  [part='icon'] {
    --so-icon-size: 12px; /* intentional hardcode — no icon.size.xs token */
    color: var(--soSemanticColorTextDefault);
    flex-shrink: 0;
    transition: transform var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault);
    transform: rotate(0deg);
  }

  :host([icon-align='start']) [part='icon'] {
    transform: rotate(-90deg);
  }

  :host([open]) [part='icon'] {
    transform: rotate(180deg);
  }

  :host([open][icon-align='start']) [part='icon'] {
    transform: rotate(0deg);
  }

  /* ── Panel ── */
  [part='panel'] {
    overflow: hidden;
    transition: max-height var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault);
  }

  [part='panel'][hidden] {
    display: block !important; /* override browser hidden behavior during animation */
    max-height: 0;
  }

  /* ── Content ── */
  [part='content'] {
    padding: var(--soSemanticSpacingComponentMd) var(--soSemanticSpacingComponentMd);
    font-size: var(--soSemanticTextStyleBodyMdFontSize);
    font-weight: var(--soSemanticTextStyleBodyMdFontWeight);
    color: var(--soSemanticColorTextDefault);
    box-sizing: border-box;
  }

  :host([flush]) [part='content'] {
    padding: var(--soSemanticSpacingComponentMd) 0 var(--soSemanticSpacingComponentMd) 0;
  }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    [part='panel'] {
      transition: none;
    }

    [part='icon'] {
      transition: none;
    }
  }
`;
