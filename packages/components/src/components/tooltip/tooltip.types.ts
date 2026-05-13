import type { Placement } from '../../utils/floating.js';

export type { Placement };

export interface TooltipProps {
  /** Tooltip content — plain text only. */
  text: string;
  /** Preferred placement. Auto-flips if insufficient space. */
  placement: Placement;
  /** Show delay in ms. No delay on hide. */
  delay: number;
  /** Suppresses the tooltip entirely when true. */
  disabled: boolean;
}
