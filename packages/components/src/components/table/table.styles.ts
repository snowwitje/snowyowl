import { css } from 'lit';

export const tableStyles = css`
  :host {
    display: block;
  }

  /* ════════════════
     CONTAINER
  ════════════════ */

  [part='container'] {
    position: relative;
    width: 100%;
    overflow: hidden;
    border: 1px solid var(--soSemanticColorBorderSubtle);
    border-radius: var(--soSemanticRadiusContainer);
  }

  /* ════════════════
     TOOLBAR
  ════════════════ */

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:  var(--soSemanticSpacingComponentXs) var(--soSemanticSpacingComponentMd) var(--soSemanticSpacingComponentXs) var(--soSemanticSpacingComponentSm);
    border-bottom: 1px solid var(--soSemanticColorBorderSubtle);
    min-height: 48px;
    gap: var(--soSemanticSpacingComponentMd);
  }

  .toolbar-batch {
    background: var(--soSemanticColorSurfaceDim);
  }

  .toolbar-left {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: var(--soSemanticSpacingComponentMd);
  }

  .toolbar-right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 8px;
  }

  .filter-input {
    width: 320px;
    max-width: 100%;
  }

  /* Batch bar */
  .batch-count {
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
    font-size: var(--soSemanticTextStyleLabelSmFontSize);
    font-weight: var(--soSemanticTextStyleLabelSmFontWeight);
    color: var(--soSemanticColorTextDefault);
    white-space: nowrap;
  }

  /* ════════════════
     SCROLL WRAPPER
  ════════════════ */

  [part='scroll'] {
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;
  }

  /* ════════════════
     TABLE
  ════════════════ */

  [part='table'] {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  /* ════════════════
     HEADER
  ════════════════ */

  [part='thead'] {
    background: var(--soSemanticColorSurfaceMuted);
  }

  [part='header-cell'] {
    border-bottom: 1px solid var(--soSemanticColorBorderDefault);
    padding: 0 var(--soSemanticSpacingComponentMd);
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
    font-size: var(--soSemanticTextStyleLabelSmFontSize);
    font-weight: var(--soSemanticTextStyleLabelSmFontWeight);
    color: var(--soSemanticColorTextSubtle);
    text-align: start;
    white-space: nowrap;
    user-select: none;
    vertical-align: middle;
    height: 40px; /* md default — overridden by row-size selectors */
    box-sizing: border-box;
  }

  /* Sortable header */
  [part='header-cell'].header-sortable {
    cursor: pointer;
  }

  [part='header-cell'].header-sortable:hover {
    background: var(--soSemanticColorInteractiveGhostHover);
  }

  [part='header-cell'].header-sortable:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--soSemanticColorInteractivePrimary);
  }

  .header-content {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  /* Sort icon: hidden by default, shown on hover or when active */
  .sort-icon {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    opacity: 0;
    transition: opacity var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault);
    color: var(--soSemanticColorTextSubtle);
  }

  [part='header-cell'].header-sortable:hover .sort-icon {
    opacity: 1;
  }

  .sort-icon.sort-active {
    opacity: 1;
    color: var(--soSemanticColorInteractivePrimary);
  }

  /* ════════════════
     DATA ROWS
  ════════════════ */

  [part='tbody'] [part='row'] {
    background: var(--soSemanticColorSurfaceDefault);
    transition: background-color var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault);
  }

  [part='tbody'] [part='row'] [part='cell'] {
    border-bottom: 1px solid var(--soSemanticColorBorderSubtle);
  }

  [part='tbody'] [part='row']:last-child [part='cell'] {
    border-bottom: none;
  }

  /* ════════════════
     DATA CELLS
  ════════════════ */

  [part='cell'] {
    padding: 0 var(--soSemanticSpacingComponentMd);
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
    font-size: var(--soSemanticTextStyleBodySmFontSize);
    font-weight: var(--soSemanticTextStyleBodySmFontWeight);
    color: var(--soSemanticColorTextDefault);
    vertical-align: middle;
    height: 40px; /* md default */
    box-sizing: border-box;
  }

  .cell-inner {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ════════════════
     ROW SIZES
  ════════════════ */

  :host([row-size='sm']) [part='header-cell'],
  :host([row-size='sm']) [part='cell'] {
    height: 32px;
    font-size: var(--soSemanticTextStyleCaptionFontSize);
  }

  :host([row-size='md']) [part='header-cell'],
  :host([row-size='md']) [part='cell'],
  :host(:not([row-size])) [part='header-cell'],
  :host(:not([row-size])) [part='cell'] {
    height: 40px;
  }

  :host([row-size='lg']) [part='header-cell'],
  :host([row-size='lg']) [part='cell'] {
    height: 48px;
  }

  /* ════════════════
     SYSTEM COLUMNS (checkbox, expand)
  ════════════════ */

  .col-checkbox,
  .col-expand {
    width: 40px;
    min-width: 40px;
    padding: 0 8px;
    text-align: center;
    vertical-align: middle;
  }

  /* Center so-checkbox inside cell */
  .col-checkbox so-checkbox {
    display: inline-flex;
  }

  /* ════════════════
     SELECTION
  ════════════════ */

  [part='row'].row-selected {
    background: var(--soSemanticColorInteractivePrimarySubtle) !important;
  }

  :host([selection='single']) [part='row'] {
    cursor: pointer;
  }

  :host([selection='single']) [part='row']:not(.row-selected):hover,
  :host([selection='multi']) [part='row']:not(.row-selected):hover {
    background: var(--soSemanticColorInteractiveGhostHover);
  }

  /* Single-select: inset left border to avoid layout shift
     3px is intentional — matches Carbon; box-shadow avoids adding to box model */
  [part='row'].row-selected-single {
    box-shadow: inset 3px 0 0 var(--soSemanticColorInteractivePrimary);
  }

  :host([selection='single']) [part='row']:focus-visible,
  :host([selection='multi']) [part='row']:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--soSemanticColorInteractivePrimary);
  }

  /* Combined focus + selected-single */
  [part='row'].row-selected-single:focus-visible {
    box-shadow:
      inset 3px 0 0 var(--soSemanticColorInteractivePrimary),
      inset 0 0 0 2px var(--soSemanticColorInteractivePrimary);
  }

  /* ════════════════
     STRIPED
  ════════════════ */

  :host([striped]) [part='tbody'] [part='row']:nth-child(even) {
    background: var(--soSemanticColorSurfaceDim);
  }

  /* Selected takes precedence over striped */
  :host([striped]) [part='tbody'] [part='row'].row-selected {
    background: var(--soSemanticColorInteractivePrimarySubtle) !important;
  }

  /* ════════════════
     FROZEN COLUMNS
  ════════════════ */

  .frozen {
    position: sticky;
    /* left: set inline via updated() */
    z-index: 1;
    background: inherit;
  }

  [part='thead'] .frozen {
    z-index: 2;
    background: var(--soSemanticColorSurfaceMuted);
  }

  .frozen-last {
    border-right: 1px solid var(--soSemanticColorBorderDefault);
  }

  /* ════════════════
     EXPAND BUTTON
  ════════════════ */

  .expand-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: var(--soSemanticRadiusComponent);
    color: var(--soSemanticColorTextSubtle);
    transition:
      transform var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
      background-color var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault),
      color var(--soSemanticMotionDurationControl) var(--soSemanticMotionEasingDefault);
    -webkit-appearance: none;
    appearance: none;
  }

  .expand-btn:hover {
    background: var(--soSemanticColorInteractiveGhostHover);
    color: var(--soSemanticColorTextDefault);
  }

  .expand-btn:focus-visible {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus);
  }

  .expand-btn.expand-open {
    transform: rotate(180deg);
  }

  /* Detail row */
  [part='detail-row'] > td {
    padding: 0;
    overflow: hidden;
    height: auto;
  }

  .detail-content {
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--soSemanticMotionDurationPanel) var(--soSemanticMotionEasingDefault);
  }

  .detail-content.detail-expanded {
    max-height: 2000px; /* large enough; exact value doesn't matter for transition */
  }

  .detail-inner {
    padding: var(--soSemanticSpacingComponentMd);
  }

  /* ════════════════
     SKELETON
  ════════════════ */

  .skeleton-cell {
    display: block;
    height: 14px;
    background: var(--soSemanticColorSurfaceSkeleton);
    border-radius: var(--soSemanticRadiusControl, 2px);
    animation: so-tbl-skeleton-pulse var(--soSemanticMotionDurationSkeleton) ease-in-out infinite;
  }

  @keyframes so-tbl-skeleton-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* ════════════════
     EMPTY STATE
  ════════════════ */

  .empty-cell {
    padding: var(--soSemanticSpacingComponentMd);
    text-align: center;
    vertical-align: middle;
    min-height: 200px;
    height: 200px;
  }

  .empty-default {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--soSemanticColorTextSubtle);
    min-height: 200px;
  }

  .empty-default p {
    margin: 0;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
    font-size: var(--soSemanticTextStyleBodySmFontSize);
    font-weight: var(--soSemanticTextStyleBodySmFontWeight);
    color: var(--soSemanticColorTextSubtle);
  }

  /* ════════════════
     PAGINATION ZONE
  ════════════════ */

  [part='pagination'] {
    display: flex;
    justify-content: flex-end;
    padding: var(--soSemanticSpacingComponentMd);
    border-top: 1px solid var(--soSemanticColorBorderSubtle);
  }
`;
