/**
 * floating.ts — shared floating panel positioning utility.
 *
 * Used by so-tooltip and so-toggletip. Computes a fixed-position (x, y)
 * for a floating panel relative to a trigger, with auto-flip when the panel
 * would overflow the viewport.
 */

export type Placement = 'top' | 'bottom' | 'left' | 'right';

export interface PositionResult {
  /** Resolved placement after any flip. */
  placement: Placement;
  /** Panel left (px), for use with `position: fixed`. */
  x: number;
  /** Panel top (px), for use with `position: fixed`. */
  y: number;
  /** Caret left offset relative to the panel (horizontal placements). */
  arrowX?: number;
  /** Caret top offset relative to the panel (vertical placements). */
  arrowY?: number;
}

function _panelCoords(
  trigger: DOMRect,
  panel: DOMRect,
  placement: Placement,
  offset: number,
): { x: number; y: number } {
  switch (placement) {
    case 'top':
      return {
        x: trigger.left + trigger.width / 2 - panel.width / 2,
        y: trigger.top - panel.height - offset,
      };
    case 'bottom':
      return {
        x: trigger.left + trigger.width / 2 - panel.width / 2,
        y: trigger.bottom + offset,
      };
    case 'left':
      return {
        x: trigger.left - panel.width - offset,
        y: trigger.top + trigger.height / 2 - panel.height / 2,
      };
    case 'right':
      return {
        x: trigger.right + offset,
        y: trigger.top + trigger.height / 2 - panel.height / 2,
      };
  }
}

function _opposite(p: Placement): Placement {
  return p === 'top' ? 'bottom' : p === 'bottom' ? 'top' : p === 'left' ? 'right' : 'left';
}

function _overflows(
  coords: { x: number; y: number },
  panel: DOMRect,
  placement: Placement,
  vp: { width: number; height: number },
): boolean {
  if (placement === 'top') return coords.y < 0;
  if (placement === 'bottom') return coords.y + panel.height > vp.height;
  if (placement === 'left') return coords.x < 0;
  return coords.x + panel.width > vp.width;
}

/**
 * Compute the fixed position for a floating panel.
 *
 * @param trigger           - `getBoundingClientRect()` of the trigger element
 * @param panel             - `getBoundingClientRect()` of the panel (may be 0-sized before first paint)
 * @param preferredPlacement - Caller-preferred placement
 * @param offset            - Gap between trigger edge and panel (including caret height)
 * @param viewport          - Current viewport dimensions
 */
export function computePosition(
  trigger: DOMRect,
  panel: DOMRect,
  preferredPlacement: Placement,
  offset: number,
  viewport: { width: number; height: number },
): PositionResult {
  let placement = preferredPlacement;
  let coords = _panelCoords(trigger, panel, placement, offset);

  if (_overflows(coords, panel, placement, viewport)) {
    const flipped = _opposite(placement);
    const flippedCoords = _panelCoords(trigger, panel, flipped, offset);

    if (_overflows(flippedCoords, panel, flipped, viewport)) {
      // Both sides overflow — pick the side with more space
      const spacePreferred =
        placement === 'top' ? trigger.top :
        placement === 'bottom' ? viewport.height - trigger.bottom :
        placement === 'left' ? trigger.left :
        viewport.width - trigger.right;

      const spaceFlipped =
        flipped === 'top' ? trigger.top :
        flipped === 'bottom' ? viewport.height - trigger.bottom :
        flipped === 'left' ? trigger.left :
        viewport.width - trigger.right;

      if (spaceFlipped > spacePreferred) {
        placement = flipped;
        coords = flippedCoords;
      }
      // else keep preferred coords (even if they overflow slightly)
    } else {
      placement = flipped;
      coords = flippedCoords;
    }
  }

  // Clamp panel to viewport edges (8px margin)
  const MARGIN = 8;
  coords.x = Math.max(MARGIN, Math.min(coords.x, viewport.width - panel.width - MARGIN));
  coords.y = Math.max(MARGIN, Math.min(coords.y, viewport.height - panel.height - MARGIN));

  // Arrow position: centered on the trigger edge, clamped inside panel bounds
  const ARROW_CLAMP = 8; // minimum distance from panel corner
  let arrowX: number | undefined;
  let arrowY: number | undefined;

  if (placement === 'top' || placement === 'bottom') {
    const triggerCenterX = trigger.left + trigger.width / 2;
    arrowX = Math.max(ARROW_CLAMP, Math.min(triggerCenterX - coords.x, panel.width - ARROW_CLAMP));
  } else {
    const triggerCenterY = trigger.top + trigger.height / 2;
    arrowY = Math.max(ARROW_CLAMP, Math.min(triggerCenterY - coords.y, panel.height - ARROW_CLAMP));
  }

  return { placement, x: coords.x, y: coords.y, arrowX, arrowY };
}
