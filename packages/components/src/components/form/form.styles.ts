import { css } from 'lit';

export const formStyles = css`
  :host {
    display: block;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  }

  /* ════════════════
     ROOT
     position: relative is required for the loading overlay
  ════════════════ */

  [part='root'] {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* ════════════════
     HEADER ZONE
  ════════════════ */

  [part='header'] {
    margin-bottom: var(--soSemanticSpacingComponentLg);
  }

  [part='title'] {
    font-size: var(--soSemanticTextStyleHeadingSmFontSize);
    font-weight: var(--soSemanticTextStyleHeadingSmFontWeight);
    line-height: var(--soSemanticTextStyleHeadingSmLineHeight);
    color: var(--soSemanticColorTextDefault);
    margin: 0;
  }

  [part='description'] {
    font-size: var(--soSemanticTextStyleBodySmFontSize);
    font-weight: var(--soSemanticTextStyleBodySmFontWeight);
    color: var(--soSemanticColorTextSubtle);
    margin: var(--soSpace1) 0 0 0;
  }

  /* ════════════════
     FIELDS CONTAINER
     gap is set via --so-form-gap custom property from the gap prop.
     Fallback ensures the default gap applies on first render.
  ════════════════ */

  [part='fields'] {
    display: flex;
    flex-direction: column;
    gap: var(--so-form-gap, var(--soSemanticSpacingComponentMd));
  }

  /* ════════════════
     FOOTER ZONE
     Hidden when slot is empty (no .has-content class).
  ════════════════ */

  [part='footer']:not(.has-content) {
    display: none;
  }

  [part='footer'] {
    margin-top: var(--soSemanticSpacingComponentLg);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--soSemanticSpacingComponentSm);
  }

  /* ════════════════
     LOADING OVERLAY
     ::before is the scrim — isolates background opacity so the loader
     itself is not dimmed (same pattern as so-loader overlay and so-modal).
  ════════════════ */

  [part='overlay'] {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--soSemanticZindexModal);
    border-radius: inherit;
  }

  [part='overlay']::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--soSemanticColorSurfaceDefault);
    opacity: var(--soSemanticOpacityScrim);
    border-radius: inherit;
    z-index: -1;
  }
`;
