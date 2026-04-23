import { css } from 'lit';

export const selectStyles = css`
  :host {
    display: block;
    font-family: var(--soSemanticTypographyFamilyBody, 'Geologica', system-ui, sans-serif);
  }

  /* ════════════════
     WRAPPER
  ════════════════ */

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* Hidden slot — only so-option elements live here, invisible to layout */
  slot {
    display: none;
  }

  /* ════════════════
     LABEL
  ════════════════ */

  [part='label'] {
    display: block;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
    color: var(--soSemanticColorTextSubtle, #6b7280);
    cursor: default;
  }

  :host([skeleton]) [part='label'] {
    color: transparent;
    position: relative;
    min-width: 60px;
    min-height: 14px;
  }

  :host([skeleton]) [part='label']::after {
    content: '';
    position: absolute;
    inset: 1px 0;
    background: var(--soSemanticColorSurfaceSkeleton, #d1d5db);
    border-radius: 2px;
    animation: so-skeleton-pulse 1.5s ease-in-out infinite;
  }

  /* ════════════════
     HELPER TEXT
  ════════════════ */

  [part='helper'] {
    display: block;
    font-size: 12px;
    font-weight: 300;
    line-height: 1.4;
    color: var(--soSemanticColorTextSubtle, #6b7280);
    margin-top: -4px;
  }

  /* ════════════════
     FIELD (position: relative — anchors the panel)
  ════════════════ */

  .field {
    position: relative;
  }

  /* ════════════════
     SKELETON TRIGGER
  ════════════════ */

  .skeleton-trigger {
    height: 40px;
    border-radius: var(--soSemanticRadiusInput, 4px);
    background: var(--soSemanticColorSurfaceSkeleton, #d1d5db);
    pointer-events: none;
    animation: so-skeleton-pulse 1.5s ease-in-out infinite;
  }

  :host([size='lg']) .skeleton-trigger {
    height: 48px;
  }

  /* ════════════════
     TRIGGER CONTAINER
     The visual "input field" row: text + badge + clear + separator + chevron
  ════════════════ */

  .trigger-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding-left: var(--soSpace3, 12px);
    padding-right: var(--soSpace1, 4px);
    border: 1px solid var(--soSemanticColorTextSubtle, #6b7280);
    border-radius: var(--soSemanticRadiusInput, 4px);
    background: var(--soSemanticColorSurfaceDefault, #ffffff);
    cursor: pointer;
    user-select: none;
    outline: none;
    gap: 4px;
    transition:
      border-color 120ms ease,
      border-width 120ms ease,
      box-shadow 120ms ease,
      background-color 120ms ease;
  }

  :host([size='lg']) .trigger-container {
    height: 48px;
  }

  /* Hover — suppressed when feedback is active or panel is open */
  .trigger-container:not([data-feedback]):not(.open):hover {
    border: 1.5px solid var(--soSemanticColorTextDefault, #1f2937);
  }

  /* Open state — purple border, no glow by default */
  .trigger-container.open {
    outline: none;
    border-color: var(--soSemanticColorInteractivePrimary, #7c3aed);
    border-width: 1.5px;
    box-shadow: none;
  }

  /* Open + trigger is active focus point (no option/search focused) — full focus ring */
  .trigger-container.open.trigger-active {
    box-shadow: var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
  }

  /* Keyboard focus — glow (comes after .open so :focus-visible wins when both apply) */
  .trigger-container:focus-visible {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
  }

  /* Suppress trigger :focus-visible while an option has the focus ring */
  .trigger-container.options-navigating:focus-visible {
    box-shadow: none;
  }

  /* Error border */
  .trigger-container[data-feedback='error'] {
    border: 1.5px solid var(--soSemanticColorStatusError, #dc2626);
  }

  /* Warning border */
  .trigger-container[data-feedback='warning'] {
    border: 1.5px solid var(--soSemanticColorStatusWarning, #d97706);
  }

  /* Disabled */
  :host([disabled]) .trigger-container {
    border-color: var(--soSemanticColorTextDisabled, #9ca3af);
    background: var(--soSemanticColorSurfaceDisabled, #f3f4f6);
    pointer-events: none;
    cursor: not-allowed;
  }

  /* ════════════════
     TRIGGER TEXT (placeholder / selected label)
  ════════════════ */

  .trigger-text {
    flex: 1;
    min-width: 0;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.5;
    color: var(--soSemanticColorTextDisabled, #9ca3af); /* placeholder color */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }

  .trigger-text.has-value {
    color: var(--soSemanticColorTextDefault, #1f2937);
  }

  :host([disabled]) .trigger-text {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  /* ════════════════
     COUNT BADGE (multi-select)
  ════════════════ */

  .count-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: var(--soSemanticColorInteractivePrimary, #7c3aed);
    color: var(--soSemanticColorTextInverse, #ffffff);
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    padding: var(--soSpace2, 8px) 12px;
    border-radius: var(--soSemanticRadiusBadge, 9999px);
    white-space: nowrap;
  }

  /* ════════════════
     ICON BUTTONS (clear, search-clear)
  ════════════════ */

  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    color: var(--soSemanticColorTextSubtle, #6b7280);
    border-radius: 2px;
    transition: color 120ms ease;
  }

  .icon-btn:hover {
    color: var(--soSemanticColorTextDefault, #1f2937);
  }

  .icon-btn:focus-visible {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
  }

  .icon-btn svg {
    width: 16px;
    height: 16px;
    display: block;
  }

  /* ════════════════
     SEPARATOR (vertical line between text area and chevron)
  ════════════════ */

  .separator {
    width: 1px;
    align-self: stretch;
    background: var(--soSemanticColorBorderStrong, #d1d5db);
    flex-shrink: 0;
  }

  /* ════════════════
     CHEVRON
  ════════════════ */

  .chevron-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    padding: 0;
    color: var(--soSemanticColorTextSubtle, #6b7280);
    flex-shrink: 0;
  }

  .chevron-wrapper svg {
    width: 16px;
    height: 16px;
    display: block;
    transition: transform 200ms ease;
  }

  .trigger-container.open .chevron-wrapper svg {
    transform: rotate(180deg);
  }

  :host([disabled]) .chevron-wrapper,
  :host([disabled]) .clear-btn {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  /* ════════════════
     DROPDOWN PANEL
  ════════════════ */

  .panel {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 4px);
    z-index: 1000;
    background: var(--soSemanticColorSurfaceDefault, #ffffff);
    border: 1px solid var(--soSemanticColorBorderDefault, #e5e7eb);
    border-radius: var(--soSemanticRadiusInput, 4px);
    box-shadow: var(--soSemanticShadowFloating, 0 4px 16px rgba(0, 0, 0, 0.12));
    max-height: 220px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .panel.panel-above {
    top: auto;
    bottom: calc(100% + 4px);
  }

  /* ════════════════
     SEARCH FIELD (sticky at top of panel)
  ════════════════ */

  .search-wrapper {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 var(--soSpace3, 12px);
    height: 40px;
    background: var(--soSemanticColorSurfaceDefault, #ffffff);
    border-bottom: 1px solid var(--soSemanticColorBorderDefault, #e5e7eb);
    box-sizing: border-box;
  }

  .search-icon-wrap {
    display: flex;
    align-items: center;
    color: var(--soSemanticColorTextSubtle, #6b7280);
    flex-shrink: 0;
  }

  .search-icon-wrap svg {
    width: 16px;
    height: 16px;
    display: block;
  }

  .search-input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.5;
    color: var(--soSemanticColorTextDefault, #1f2937);
    padding: 0;
    /* Suppress browser's native search input styling */
    -webkit-appearance: none;
    appearance: none;
  }

  .search-input:focus-visible {
    outline: none;
    box-shadow: var(--soSemanticShadowFocus, 0 0 0 3px rgba(147, 51, 234, 1));
    border-radius: 2px;
  }

  /* Suppress search focus ring while keyboard-navigating options (only one ring at a time) */
  .search-wrapper.options-active .search-input:focus-visible {
    box-shadow: none;
  }

  .search-input::placeholder {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
    font-weight: 300;
  }

  /* Remove native search cancel button */
  .search-input::-webkit-search-cancel-button {
    display: none;
  }

  /* ════════════════
     LISTBOX
  ════════════════ */

  [part='listbox'] {
    display: flex;
    flex-direction: column;
  }

  /* ════════════════
     OPTION ITEMS
  ════════════════ */

  .option {
    display: flex;
    align-items: center;
    min-height: 40px;
    padding: 0 var(--soSpace3, 12px);
    gap: var(--soSpace3, 12px);
    font-size: 16px;
    font-weight: 300;
    line-height: 1.5;
    color: var(--soSemanticColorTextDefault, #1f2937);
    cursor: pointer;
    box-sizing: border-box;
    border-bottom: 1px solid var(--soSemanticColorBorderStrong, #d1d5db);
    transition: background-color 80ms ease;
    /* Prevents text-selection during keyboard navigation */
    user-select: none;
  }

  :host([touch]) .option {
    min-height: 48px;
  }

  .option:last-child {
    border-bottom: none;
  }

  .option:hover:not(.disabled) {
    background: var(--soSemanticColorInteractiveGhostHover, #f3f4f6);
  }

  /* Selected — single or checked multi */
  .option.selected {
    background: var(--soSemanticColorInteractivePrimarySubtle, #f5f3ff);
  }

  /* Keyboard focus indicator */
  .option.focused:not(.disabled) {
    box-shadow: inset 0 0 0 2px var(--soSemanticColorBorderFocus, #7c3aed);
    outline: none;
  }

  .option.disabled {
    color: var(--soSemanticColorTextDisabled, #9ca3af);
    pointer-events: none;
    cursor: not-allowed;
  }

  /* ── Option label ── */
  .option-label {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── Checkmark (single-select: right-aligned) ── */
  .option-check {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--soSemanticColorInteractivePrimary, #7c3aed);
  }

  .option-check svg {
    width: 14px;
    height: 14px;
    display: block;
  }

  /* ── Checkbox (multi-select: left-aligned) ── */
  .option-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 16px;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border-radius: var(--soSemanticRadiusControl, 2px);
    border: 1.5px solid var(--soSemanticColorTextDefault, #1f2937);
    background: transparent;
    color: var(--soSemanticColorTextInverse, #ffffff);
    transition:
      background-color 120ms ease,
      border-color 120ms ease;
  }

  .option-checkbox.checked {
    background: var(--soSemanticColorTextDefault, #1f2937);
    border-color: var(--soSemanticColorTextDefault, #1f2937);
  }

  .option-checkbox svg {
    width: 10px;
    height: 8px;
    display: block;
  }

  /* ── Disabled option checkbox ── */
  .option.disabled .option-checkbox {
    border-color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  .option.disabled .option-checkbox.checked {
    background: var(--soSemanticColorTextDisabled, #9ca3af);
    border-color: var(--soSemanticColorTextDisabled, #9ca3af);
  }

  /* ════════════════
     NO OPTIONS MESSAGE
  ════════════════ */

  .no-options {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-size: 14px;
    font-weight: 300;
    color: var(--soSemanticColorTextSubtle, #6b7280);
    padding: 0 var(--soSpace3, 12px);
  }

  /* ════════════════
     FEEDBACK MESSAGES
  ════════════════ */

  .feedback {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
  }

  .feedback svg {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    margin-top: 1px;
  }

  [part='error'] {
    color: var(--soSemanticColorStatusError, #dc2626);
  }

  [part='warning'] {
    color: var(--soSemanticColorStatusWarning, #d97706);
  }

  /* ════════════════
     KEYFRAMES
  ════════════════ */

  @keyframes so-skeleton-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
`;
