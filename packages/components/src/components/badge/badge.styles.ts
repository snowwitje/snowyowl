import { css } from 'lit';

export const badgeStyles = css`
  /* ── Size tokens ── */
  :host {
    --so-badge-height: 20px;
    --so-badge-dot-size: 12px;
    --so-badge-count-padding: 0 6px;
    --so-badge-label-padding: 0 8px;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
    position: static;
    box-sizing: border-box;
    line-height: 1;
  }

  :host([size='sm']) {
    --so-badge-height: 16px;
    --so-badge-dot-size: 8px;
    --so-badge-count-padding: 0 4px;
    --so-badge-label-padding: 0 6px;
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Overlay positioning ── */
  :host([overlay]) {
    position: absolute;
  }

  :host([overlay][overlay-position='top-right']),
  :host([overlay]:not([overlay-position])) {
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }

  :host([overlay][overlay-position='top-left']) {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  :host([overlay][overlay-position='bottom-right']) {
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%);
  }

  :host([overlay][overlay-position='bottom-left']) {
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
  }

  /* ═══════════════════════════════════════════════════════════════
     Count variant
  ═══════════════════════════════════════════════════════════════ */

  :host([variant='count']) [part='base'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--so-badge-height);
    min-width: var(--so-badge-height);
    padding: var(--so-badge-count-padding);
    border-radius: var(--soSemanticRadiusBadge);
    background-color: var(--so-badge-fill, var(--soColorNeutral200));
    color: var(--so-badge-text, var(--soColorNeutral800));
    border: 1px solid var(--so-badge-border, var(--soColorNeutral400));
    box-sizing: border-box;
    white-space: nowrap;
  }

  /* ═══════════════════════════════════════════════════════════════
     Status variant — coloured circle, no text, no border
  ═══════════════════════════════════════════════════════════════ */

  :host([variant='status']) [part='base'] {
    display: inline-block;
    width: var(--so-badge-dot-size);
    height: var(--so-badge-dot-size);
    border-radius: 50%;
    background-color: var(--so-badge-status-color, var(--soSemanticColorTextSubtle));
    flex-shrink: 0;
  }

  /* ═══════════════════════════════════════════════════════════════
     Label variant
  ═══════════════════════════════════════════════════════════════ */

  :host([variant='label']) [part='base'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--so-badge-height);
    padding: var(--so-badge-label-padding);
    border-radius: var(--soSemanticRadiusBadge);
    background-color: var(--so-badge-fill, var(--soColorNeutral200));
    color: var(--so-badge-text, var(--soColorNeutral800));
    border: 1px solid var(--so-badge-border, var(--soColorNeutral400));
    box-sizing: border-box;
    white-space: nowrap;
  }

  /* ═══════════════════════════════════════════════════════════════
     Label text (count and label variants)
  ═══════════════════════════════════════════════════════════════ */

  [part='label'] {
    font-size: var(--soSemanticTextStyleLabelSmFontSize);
    font-weight: var(--soSemanticTextStyleLabelSmFontWeight);
    line-height: var(--soSemanticTextStyleLabelSmLineHeight);
    font-variant-numeric: tabular-nums;
    color: inherit;
  }

  :host([size='sm']) [part='label'] {
    font-size: var(--soSemanticTextStyleCaptionFontSize);
    font-weight: var(--soSemanticTextStyleCaptionFontWeight);
    line-height: var(--soSemanticTextStyleCaptionLineHeight);
  }
`;
