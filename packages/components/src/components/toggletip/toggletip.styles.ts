import { css } from 'lit';

/** Shadow DOM styles — host wrapper and hidden content slot only. */
export const toggletipStyles = css`
  :host {
    display: inline-flex;
    position: relative;
  }

  /* Keep the content slot invisible in shadow DOM — nodes are teleported
     to a body-appended panel on open and returned here on close. */
  slot[name='content'] {
    display: none;
  }
`;

/**
 * Panel styles injected once into document.head.
 * The toggletip panel is appended to document.body so position:fixed is
 * always viewport-relative — same fix as so-tooltip.
 */
export const toggletipPanelCSS = `
.so-toggletip-panel {
  position: fixed;
  z-index: var(--soSemanticZindexDropdown);
  min-width: 160px;
  max-width: 288px;
  padding: var(--soSemanticSpacingComponentMd);
  background: var(--soSemanticColorSurfaceTooltip);
  color: var(--soSemanticColorTextOnTooltip);
  border-radius: var(--soSemanticRadiusInteractive);
  box-shadow: var(--soSemanticShadowFloating);
  font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  font-size: var(--soSemanticTextStyleBodySmFontSize);
  font-weight: var(--soSemanticTextStyleBodyMdFontWeight);
  line-height: var(--soSemanticTextStyleBodySmLineHeight);
  word-break: break-word;
  pointer-events: auto;
  box-sizing: border-box;
  /* Start invisible — animates in via .so-toggletip-visible */
  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity var(--soSemanticMotionDurationPanel, 200ms) var(--soSemanticMotionEasingDefault, ease),
    transform var(--soSemanticMotionDurationPanel, 200ms) var(--soSemanticMotionEasingDefault, ease);
}

.so-toggletip-panel.so-toggletip-visible {
  opacity: 1;
  transform: scale(1);
}

.so-toggletip-panel.so-toggletip-hiding {
  opacity: 0;
  transform: scale(1);
}

/* ── Caret (CSS triangle via border trick) ── */

.so-toggletip-panel::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}

/* top: caret points down */
.so-toggletip-panel[data-placement='top']::before {
  top: 100%;
  left: var(--_arrow-x, 50%);
  margin-left: -6px;
  border-top-color: var(--soSemanticColorSurfaceTooltip);
}

/* bottom: caret points up */
.so-toggletip-panel[data-placement='bottom']::before {
  bottom: 100%;
  left: var(--_arrow-x, 50%);
  margin-left: -6px;
  border-bottom-color: var(--soSemanticColorSurfaceTooltip);
}

/* left: caret points right */
.so-toggletip-panel[data-placement='left']::before {
  left: 100%;
  top: var(--_arrow-y, 50%);
  margin-top: -6px;
  border-left-color: var(--soSemanticColorSurfaceTooltip);
}

/* right: caret points left */
.so-toggletip-panel[data-placement='right']::before {
  right: 100%;
  top: var(--_arrow-y, 50%);
  margin-top: -6px;
  border-right-color: var(--soSemanticColorSurfaceTooltip);
}

@media (prefers-reduced-motion: reduce) {
  .so-toggletip-panel,
  .so-toggletip-panel.so-toggletip-visible,
  .so-toggletip-panel.so-toggletip-hiding {
    transition: none;
    transform: none;
  }
}
`;
