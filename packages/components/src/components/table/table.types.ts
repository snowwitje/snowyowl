import type { TemplateResult } from 'lit';

export type SortDirection = 'asc' | 'desc' | 'none';

export type ColumnDef<T = Record<string, unknown>> = {
  key: string;                          // matches key in row data object
  header: string;                       // column header label
  sortable?: boolean;                   // default false
  width?: string;                       // CSS width e.g. '120px', '1fr', 'auto'
  minWidth?: string;                    // minimum column width
  align?: 'start' | 'center' | 'end';  // text-align, default 'start'
  frozen?: boolean;                     // sticky left positioning (alternative to freezeColumns prop)
  render?: (value: unknown, row: T, index: number) => TemplateResult | string;
  // Optional custom cell renderer. When absent, value is rendered as string.
};

export type TableRow<T = Record<string, unknown>> = T & {
  id: string | number;   // required unique row identifier
};

export type SortState = {
  key: string;
  direction: SortDirection;
};

export type TableSortDetail = {
  key: string;
  direction: SortDirection;
};

export type TableFilterDetail = {
  query: string;
  filterKeys: string[];
};

export type TableSelectionDetail<T = Record<string, unknown>> = {
  selectedIds: (string | number)[];
  selectedRows: TableRow<T>[];
};

export type TablePageChangeDetail = {
  page: number;
  pageSize: number;
};

export type TableRowExpandDetail<T = Record<string, unknown>> = {
  row: TableRow<T>;
  expanded: boolean;
};

export type TableRowSize = 'sm' | 'md' | 'lg';
