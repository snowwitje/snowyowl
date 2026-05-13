import { css } from 'lit';

/** Shadow DOM styles — only the host wrapper. The panel lives on document.body. */
export const tooltipStyles = css`
  :host {
    display: inline-flex;
    position: relative;
  }
`;

/**
 * Panel styles injected once into document.head.
 * The tooltip panel is appended to document.body so that position:fixed is
 * always relative to the viewport — shadow DOM fixed positioning can be
 * trapped by CSS containing blocks (transform, filter, contain) on Storybook
 * docs story wrappers or other ancestors.
 *
 * CSS custom properties (--_arrow-x / --_arrow-y) set via inline style on the
 * panel element are readable by ::before because custom properties inherit
 * into pseudo-elements.
 */
export const tooltipPanelCSS = `
.so-tooltip-panel {
  position: fixed;
  z-index: var(--soSemanticZindexDropdown);
  max-width: 288px;
  padding: 8px var(--soSemanticSpacingComponentMd);
  background: var(--soSemanticColorSurfaceTooltip);
  color: var(--soSemanticColorTextOnTooltip);
  border-radius: var(--soSemanticRadiusInteractive);
  box-shadow: var(--soSemanticShadowFloating);
  font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  font-size: var(--soSemanticTextStyleBodySmFontSize);
  font-weight: var(--soSemanticTextStyleBodySmFontWeight);
  line-height: var(--soSemanticTextStyleBodySmLineHeight);
  word-break: break-word;
  pointer-events: none;
  box-sizing: border-box;
  /* Start invisible — animates in via .so-tooltip-visible class */
  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity var(--soSemanticMotionDurationControl, 100ms) var(--soSemanticMotionEasingDefault, ease),
    transform var(--soSemanticMotionDurationControl, 100ms) var(--soSemanticMotionEasingDefault, ease);
}

.so-tooltip-panel.so-tooltip-visible {
  opacity: 1;
  transform: scale(1);
}

.so-tooltip-panel.so-tooltip-hiding {
  opacity: 0;
  transform: scale(1); /* exit: fade only, no scale */
}

/* ── Caret (CSS triangle via border trick) ── */

.so-tooltip-panel::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}

/* top placement: caret points down, below the panel */
.so-tooltip-panel[data-placement='top']::before {
  top: 100%;
  left: var(--_arrow-x, 50%);
  margin-left: -6px;
  border-top-color: var(--soSemanticColorSurfaceTooltip);
}

/* bottom placement: caret points up, above the panel */
.so-tooltip-panel[data-placement='bottom']::before {
  bottom: 100%;
  left: var(--_arrow-x, 50%);
  margin-left: -6px;
  border-bottom-color: var(--soSemanticColorSurfaceTooltip);
}

/* left placement: caret points right */
.so-tooltip-panel[data-placement='left']::before {
  left: 100%;
  top: var(--_arrow-y, 50%);
  margin-top: -6px;
  border-left-color: var(--soSemanticColorSurfaceTooltip);
}

/* right placement: caret points left */
.so-tooltip-panel[data-placement='right']::before {
  right: 100%;
  top: var(--_arrow-y, 50%);
  margin-top: -6px;
  border-right-color: var(--soSemanticColorSurfaceTooltip);
}

@media (prefers-reduced-motion: reduce) {
  .so-tooltip-panel,
  .so-tooltip-panel.so-tooltip-visible,
  .so-tooltip-panel.so-tooltip-hiding {
    transition: none;
    transform: none;
  }
}
`;
