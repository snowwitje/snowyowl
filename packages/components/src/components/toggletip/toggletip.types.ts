import type { Placement } from '../../utils/floating.js';

export type { Placement };

export interface ToggletipProps {
  /** Panel visibility. */
  open: boolean;
  /** Preferred placement. Auto-flips if there is insufficient space. */
  placement: Placement;
  /**
   * `aria-label` for the panel dialog — required for accessibility.
   * Should describe the purpose of the toggletip panel content.
   */
  label: string;
}

/** Detail type for the `so-open` event. */
export type ToggletipOpenDetail = Record<string, never>;

/** Detail type for the `so-close` event. */
export type ToggletipCloseDetail = {
  reason: 'trigger' | 'escape' | 'outside-click' | 'tab-out';
};
