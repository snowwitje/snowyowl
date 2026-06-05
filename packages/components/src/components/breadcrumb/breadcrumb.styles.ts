import { css } from 'lit';

/* ── so-breadcrumb ─────────────────────────────────────────────────────── */

export const breadcrumbStyles = css`
  :host {
    display: block;
  }

  ol {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: var(--soSpace2);
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  :host([wrap]) ol {
    flex-wrap: wrap;
    overflow: visible;
  }
`;

/* ── so-breadcrumb-item ────────────────────────────────────────────────── */

export const breadcrumbItemStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
  }

  li {
    display: inline-flex;
    align-items: center;
    gap: var(--soSpace2);
    white-space: nowrap;
  }

  :host([wrap]) li {
    white-space: normal;
  }

  /* ── Link ── */

  a[part='link'] {
    font-size: var(--soSemanticTextStyleBodySmFontSize);
    font-weight: var(--soSemanticTextStyleBodySmFontWeight);
    line-height: var(--soSemanticTextStyleBodySmLineHeight);
    color: var(--soSemanticColorTextLink);
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-color: var(--soSemanticColorTextLink);
    cursor: pointer;
    transition:
      color var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
      text-decoration-color var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault);
  }

  a[part='link']:hover {
    color: var(--soSemanticColorTextLinkHover);
    text-decoration-color: var(--soSemanticColorTextLinkHover);
  }

  a[part='link']:focus-visible {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus);
    border-radius: var(--soSemanticRadiusInteractive);
  }

  /* Truncation — display:inline-block required for text-overflow to work */
  a[part='link'].truncated {
    display: inline-block;
    max-width: var(--so-item-max-width);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
  }

  /* ── Current page ── */

  span[part='current'] {
    font-size: var(--soSemanticTextStyleBodySmFontSize);
    font-weight: var(--soSemanticTextStyleLabelSmFontWeight);
    line-height: var(--soSemanticTextStyleBodySmLineHeight);
    color: var(--soSemanticColorTextDefault);
    cursor: default;
  }

  /* ── Separator chevron ── */

  so-icon[part='separator'] {
    /* 12px — intentional hardcode: no icon.size.xs semantic token exists */
    --so-icon-size: 12px;
    color: var(--soSemanticColorTextSubtle);
    flex-shrink: 0;
    pointer-events: none;
  }
`;
