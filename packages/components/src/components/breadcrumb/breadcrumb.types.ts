// so-breadcrumb and so-breadcrumb-item emit no custom events.
// Navigation is handled by standard <a> element behaviour.

/**
 * Props interface for `so-breadcrumb`.
 */
export interface BreadcrumbProps {
  /** When true, items wrap to multiple lines. Default: false (single line, truncation applies). */
  wrap: boolean;
  /** Accessible label for the `<nav>` landmark. Default: 'Breadcrumb'. */
  ariaLabel: string;
}

/**
 * Props interface for `so-breadcrumb-item`.
 */
export interface BreadcrumbItemProps {
  /** URL for the breadcrumb link. When absent the item is the current page (no link, no chevron). */
  href: string;
  /**
   * Optional CSS length for intermediate link truncation, e.g. `'120px'`.
   * When set and text overflows, an `so-tooltip` displays the full label.
   * Ignored on the current page item (last item).
   */
  maxWidth: string;
}
