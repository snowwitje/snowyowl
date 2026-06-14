import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { tableStyles } from './table.styles.js';
import type {
  ColumnDef,
  TableRow,
  TableRowSize,
  SortDirection,
  SortState,
  TableSortDetail,
  TableFilterDetail,
  TableSelectionDetail,
  TablePageChangeDetail,
  TableRowExpandDetail,
} from './table.types.js';
import '../button/index.js';
import '../checkbox/index.js';
import '../input/index.js';
import '../pagination/index.js';
// Consumers must import '@snowyowl/icons' once at app startup to register so-icon.

type AnyRow = TableRow<Record<string, unknown>>;

/**
 * `so-table` — SnowyOwl data table component.
 *
 * Features (all opt-in via props):
 * - Sorting (client-side & server-side)
 * - Filtering with debounce (client-side & server-side)
 * - Row selection (single | multi) with keyboard support
 * - Batch action toolbar when rows are selected
 * - Pagination via `so-pagination`
 * - Expandable rows with `detailTemplate`
 * - Frozen / sticky columns via `freezeColumns`
 * - Striped alternating rows
 * - Inline skeleton loading state
 * - Custom cell renderers via `ColumnDef.render`
 *
 * @slot toolbar-actions - Right side of toolbar (no rows selected). Use for global table actions.
 * @slot batch-actions   - Shown in toolbar when rows are selected.
 * @slot empty           - Custom empty state (overrides `emptyMessage` prop).
 *
 * @fires so-sort             - `detail: TableSortDetail` — sort column or direction changed
 * @fires so-filter           - `detail: TableFilterDetail` — filter query changed (server-side only)
 * @fires so-selection-change - `detail: TableSelectionDetail` — row selection changed
 * @fires so-page-change      - `detail: TablePageChangeDetail` — page changed (server-side only)
 * @fires so-row-expand       - `detail: TableRowExpandDetail` — row expanded or collapsed
 *
 * @csspart container   - Outer wrapper
 * @csspart toolbar     - Toolbar zone
 * @csspart batch-bar   - Applied to toolbar in batch mode
 * @csspart scroll      - Horizontal scroll wrapper
 * @csspart table       - `<table>` element
 * @csspart thead       - `<thead>`
 * @csspart tbody       - `<tbody>`
 * @csspart header-row  - `<tr>` in thead
 * @csspart header-cell - `<th>` elements
 * @csspart row         - `<tr>` elements in tbody
 * @csspart cell        - `<td>` elements
 * @csspart expand-cell - Expand button cell
 * @csspart detail-row  - Expanded detail row
 * @csspart empty       - Empty state cell
 * @csspart pagination  - Pagination wrapper
 *
 * @example
 * <so-table></so-table>
 * // then set: table.columns = [...]; table.rows = [...];
 */
@customElement('so-table')
export class SoTable extends LitElement {
  static styles = tableStyles;

  // ── Props ────────────────────────────────────────────────────────────────

  /** Column definitions. Set via `.columns = [...]` (property, not attribute). */
  @property({ type: Array }) columns: ColumnDef[] = [];

  /** Row data. Set via `.rows = [...]` (property, not attribute). */
  @property({ type: Array }) rows: AnyRow[] = [];

  /** Row height: sm (32px) | md (40px, default) | lg (48px) */
  @property({ type: String, reflect: true, attribute: 'row-size' }) rowSize: TableRowSize = 'md';

  /** Row selection mode. */
  @property({ type: String, reflect: true }) selection: 'none' | 'single' | 'multi' = 'none';

  /**
   * Selected row IDs. Used to seed internal state. After initial mount, the
   * component manages selection internally; set this prop again to override.
   */
  @property({ type: Array }) selectedIds: (string | number)[] = [];

  /**
   * Enables sorting globally. Individual columns can also set `sortable: true`
   * in their ColumnDef to enable sorting per-column.
   */
  @property({ type: Boolean, reflect: true }) sortable = false;

  /**
   * Current sort state — seed for internal state. Set externally for server-side sorting.
   * Updates override internal state.
   */
  @property({ type: Object }) sortState: SortState = { key: '', direction: 'none' };

  /**
   * When true, disables client-side sort/filter/paginate and fires events
   * instead for the server to handle. Consumer provides new `.rows` in response.
   */
  @property({ type: Boolean, reflect: true, attribute: 'server-side' }) serverSide = false;

  /** Shows filter input in toolbar. */
  @property({ type: Boolean, reflect: true }) filterable = false;

  /** Placeholder text for the filter input. */
  @property({ type: String, attribute: 'filter-placeholder' }) filterPlaceholder = 'Search...';

  /**
   * Column keys to filter on. Empty array = all columns.
   */
  @property({ type: Array }) filterKeys: string[] = [];

  /** Debounce ms for filter input. */
  @property({ type: Number, attribute: 'filter-debounce' }) filterDebounce = 300;

  /** Shows `so-pagination` below the table. */
  @property({ type: Boolean, reflect: true }) paginate = false;

  /** Rows per page (client-side pagination). */
  @property({ type: Number, attribute: 'page-size' }) pageSize = 10;

  /**
   * Current page (1-indexed) — seeds internal page state. For server-side
   * pagination, also set `totalRows` so the pagination control has a total.
   */
  @property({ type: Number }) page = 1;

  /**
   * Total row count for server-side pagination. When `serverSide && paginate`,
   * pagination uses `Math.ceil(totalRows / pageSize)` as the page count.
   * Ignored in client-side mode.
   */
  @property({ type: Number, attribute: 'total-rows' }) totalRows = 0;

  /** Enables expandable rows. Requires `detailTemplate` to be set. */
  @property({ type: Boolean, reflect: true }) expandable = false;

  /**
   * Function returning a `TemplateResult` for the expanded row detail panel.
   * Must be set as a property: `table.detailTemplate = (row) => html\`...\``
   */
  @property({ type: Object }) detailTemplate: ((row: AnyRow) => TemplateResult) | null = null;

  /**
   * Number of columns to freeze (sticky left). Counts from the left including
   * system columns (checkbox, expand). `0` = no frozen columns.
   */
  @property({ type: Number, attribute: 'freeze-columns' }) freezeColumns = 0;

  /** Alternating row background (even rows use surface-subtle). */
  @property({ type: Boolean, reflect: true }) striped = false;

  /**
   * Shows inline skeleton loading state. Renders the table structure with
   * animated skeleton bars instead of data. Toolbar and pagination are hidden.
   */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Message shown when rows is empty or filter returns no results. */
  @property({ type: String, attribute: 'empty-message' }) emptyMessage = 'No data to display';

  // ── Internal state ───────────────────────────────────────────────────────

  @state() private _sortState: SortState = { key: '', direction: 'none' };
  @state() private _selectedIds = new Set<string | number>();
  @state() private _expandedIds = new Set<string | number>();
  @state() private _filterQuery = '';
  @state() private _page = 1;

  private _filterDebounceTimer: ReturnType<typeof setTimeout> | undefined;

  // ── Lifecycle ────────────────────────────────────────────────────────────

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('sortState')) {
      this._sortState = { ...this.sortState };
    }
    if (changed.has('selectedIds')) {
      this._selectedIds = new Set(this.selectedIds);
    }
    if (changed.has('page')) {
      this._page = this.page;
    }
    if (changed.has('filterable') && !this.filterable) {
      this._filterQuery = '';
    }
  }

  updated() {
    if (this.freezeColumns > 0 && !this.loading) {
      this._computeFrozenOffsets();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._filterDebounceTimer);
  }

  // ── Computed getters ─────────────────────────────────────────────────────

  /** All columns after sort + filter (before pagination slice). */
  private get _processedRows(): AnyRow[] {
    let rows = this.rows;

    if (!this.serverSide && this._sortState.direction !== 'none' && this._sortState.key) {
      rows = this._sortRows(rows);
    }

    if (!this.serverSide && this._filterQuery) {
      rows = this._filterRows(rows);
    }

    return rows;
  }

  /** Rows visible on the current page. */
  private get _visibleRows(): AnyRow[] {
    const rows = this._processedRows;

    if (!this.paginate || this.serverSide) return rows;

    const start = (this._page - 1) * this.pageSize;
    return rows.slice(start, start + this.pageSize);
  }

  /** Total number of pages for client-side pagination. */
  private get _totalPages(): number {
    if (this.serverSide) {
      return this.totalRows > 0 ? Math.ceil(this.totalRows / this.pageSize) : 1;
    }
    return Math.max(1, Math.ceil(this._processedRows.length / this.pageSize));
  }

  /** Total column count including system columns. */
  private get _totalCols(): number {
    return (
      this.columns.length +
      (this.selection === 'multi' ? 1 : 0) +
      (this.expandable && this.detailTemplate ? 1 : 0)
    );
  }

  /** True when all visible rows are selected. */
  private get _isAllSelected(): boolean {
    const visible = this._visibleRows;
    return visible.length > 0 && visible.every(r => this._selectedIds.has(r.id));
  }

  /** True when some (but not all) visible rows are selected. */
  private get _isIndeterminate(): boolean {
    const visible = this._visibleRows;
    const some = visible.some(r => this._selectedIds.has(r.id));
    return some && !this._isAllSelected;
  }

  /** True when any column has a width specified (use fixed table layout). */
  private get _useFixedLayout(): boolean {
    return this.columns.some(col => !!col.width);
  }

  // ── Sort ─────────────────────────────────────────────────────────────────

  private _sortRows(rows: AnyRow[]): AnyRow[] {
    const { key, direction } = this._sortState;
    return [...rows].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      let cmp = 0;
      if (aVal == null) cmp = 1;
      else if (bVal == null) cmp = -1;
      else if (typeof aVal === 'number' && typeof bVal === 'number') {
        cmp = aVal - bVal;
      } else {
        cmp = String(aVal).toLowerCase().localeCompare(String(bVal).toLowerCase());
      }

      return direction === 'desc' ? -cmp : cmp;
    });
  }

  private _handleSort(key: string) {
    const { key: prevKey, direction: prevDir } = this._sortState;
    let direction: SortDirection;

    if (prevKey !== key || prevDir === 'none') {
      direction = 'asc';
    } else if (prevDir === 'asc') {
      direction = 'desc';
    } else {
      direction = 'none';
    }

    this._sortState = { key, direction };
    this._page = 1;

    this.dispatchEvent(
      new CustomEvent<TableSortDetail>('so-sort', {
        detail: { key, direction },
        bubbles: true,
        composed: true,
      }),
    );
  }

  // ── Filter ───────────────────────────────────────────────────────────────

  private _filterRows(rows: AnyRow[]): AnyRow[] {
    const q = this._filterQuery.toLowerCase();
    const keys =
      this.filterKeys.length > 0 ? this.filterKeys : this.columns.map(c => c.key);
    return rows.filter(row =>
      keys.some(k => String(row[k] ?? '').toLowerCase().includes(q)),
    );
  }

  private _handleFilterInput(e: CustomEvent<{ value: string }>) {
    const value = e.detail.value;
    clearTimeout(this._filterDebounceTimer);
    this._filterDebounceTimer = setTimeout(() => {
      this._filterQuery = value;
      this._page = 1;

      if (this.serverSide) {
        this.dispatchEvent(
          new CustomEvent<TableFilterDetail>('so-filter', {
            detail: { query: value, filterKeys: this.filterKeys },
            bubbles: true,
            composed: true,
          }),
        );
      }
    }, this.filterDebounce);
  }

  // ── Selection ────────────────────────────────────────────────────────────

  private _handleSelectAll(e: CustomEvent<{ checked: boolean; indeterminate: boolean }>) {
    if (e.detail.checked) {
      const newIds = new Set(this._selectedIds);
      this._visibleRows.forEach(r => newIds.add(r.id));
      this._selectedIds = newIds;
    } else {
      const visibleSet = new Set(this._visibleRows.map(r => r.id));
      this._selectedIds = new Set([...this._selectedIds].filter(id => !visibleSet.has(id)));
    }
    this._emitSelectionChange();
  }

  private _handleRowSelect(id: string | number, checked: boolean) {
    const newIds = new Set(this._selectedIds);
    if (checked) newIds.add(id);
    else newIds.delete(id);
    this._selectedIds = newIds;
    this._emitSelectionChange();
  }

  private _handleSingleSelect(id: string | number) {
    this._selectedIds = this._selectedIds.has(id) ? new Set() : new Set([id]);
    this._emitSelectionChange();
  }

  private _handleRowKeydown(e: KeyboardEvent, id: string | number) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (this.selection === 'single') {
        this._handleSingleSelect(id);
      } else if (this.selection === 'multi') {
        this._handleRowSelect(id, !this._selectedIds.has(id));
      }
    }
  }

  private _handleCancelSelection() {
    this._selectedIds = new Set();
    this._emitSelectionChange();
  }

  private _emitSelectionChange() {
    const selectedIds = [...this._selectedIds];
    const selectedRows = this.rows.filter(r => this._selectedIds.has(r.id));
    this.dispatchEvent(
      new CustomEvent<TableSelectionDetail>('so-selection-change', {
        detail: { selectedIds, selectedRows },
        bubbles: true,
        composed: true,
      }),
    );
  }

  // ── Pagination ───────────────────────────────────────────────────────────

  private _handlePageChange(e: CustomEvent<{ page: number }>) {
    const newPage = e.detail.page;
    this._page = newPage;

    if (this.serverSide) {
      this.dispatchEvent(
        new CustomEvent<TablePageChangeDetail>('so-page-change', {
          detail: { page: newPage, pageSize: this.pageSize },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  // ── Expand ───────────────────────────────────────────────────────────────

  private _toggleExpand(id: string | number) {
    const newSet = new Set(this._expandedIds);
    const wasExpanded = newSet.has(id);
    if (wasExpanded) newSet.delete(id);
    else newSet.add(id);
    this._expandedIds = newSet;

    const row = this.rows.find(r => r.id === id);
    if (row) {
      this.dispatchEvent(
        new CustomEvent<TableRowExpandDetail>('so-row-expand', {
          detail: { row, expanded: !wasExpanded },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  // ── Frozen columns ───────────────────────────────────────────────────────

  private _computeFrozenOffsets() {
    const root = this.renderRoot as ShadowRoot;
    const headerCells = Array.from(
      root.querySelectorAll<HTMLTableCellElement>('thead tr th'),
    );

    const offsets: number[] = [];
    let accumulated = 0;

    for (let i = 0; i < headerCells.length; i++) {
      const th = headerCells[i];
      if (!th.classList.contains('frozen')) break;
      offsets[i] = accumulated;
      th.style.left = `${accumulated}px`;
      accumulated += th.offsetWidth;
    }

    // Apply same offsets to every body row
    root.querySelectorAll<HTMLTableRowElement>('tbody tr').forEach(tr => {
      Array.from(tr.querySelectorAll<HTMLTableCellElement>('td')).forEach((td, i) => {
        if (td.classList.contains('frozen') && offsets[i] !== undefined) {
          td.style.left = `${offsets[i]}px`;
        }
      });
    });
  }

  // ── Render helpers ───────────────────────────────────────────────────────

  private _renderSortIcon(key: string) {
    const dir = this._sortState.key === key ? this._sortState.direction : 'none';
    const isActive = dir !== 'none';

    const iconName = dir === 'asc' ? 'arrow-up' : dir === 'desc' ? 'arrow-down' : 'arrow-down-sort';

    return html`
      <span class="sort-icon ${isActive ? 'sort-active' : ''}">
        <so-icon name=${iconName} size="sm" decorative></so-icon>
      </span>
    `;
  }

  private _renderHeaderRow() {
    const hasCheckbox = this.selection === 'multi';
    const hasExpand = this.expandable && !!this.detailTemplate;
    const cells: TemplateResult[] = [];

    let effectiveIdx = 0;

    // Checkbox header
    if (hasCheckbox) {
      const isFrozen = effectiveIdx < this.freezeColumns;
      const isLastFrozen = isFrozen && effectiveIdx === this.freezeColumns - 1;
      cells.push(html`
        <th
          part="header-cell"
          class="col-checkbox ${isFrozen ? 'frozen' : ''} ${isLastFrozen ? 'frozen-last' : ''}"
          aria-label="Select all rows"
        >
          <so-checkbox
            .checked=${this._isAllSelected}
            .indeterminate=${this._isIndeterminate}
            ?disabled=${this._visibleRows.length === 0}
            @so-change=${this._handleSelectAll}
          ></so-checkbox>
        </th>
      `);
      effectiveIdx++;
    }

    // Expand header
    if (hasExpand) {
      const isFrozen = effectiveIdx < this.freezeColumns;
      const isLastFrozen = isFrozen && effectiveIdx === this.freezeColumns - 1;
      cells.push(html`
        <th
          part="header-cell"
          class="col-expand ${isFrozen ? 'frozen' : ''} ${isLastFrozen ? 'frozen-last' : ''}"
          aria-label="Expand"
        ></th>
      `);
      effectiveIdx++;
    }

    // Data column headers
    this.columns.forEach(col => {
      const isFrozen = effectiveIdx < this.freezeColumns;
      const isLastFrozen = isFrozen && effectiveIdx === this.freezeColumns - 1;
      const isSortable = this.sortable || !!col.sortable;

      const thStyle = [
        col.width ? `width: ${col.width}` : '',
        col.minWidth ? `min-width: ${col.minWidth}` : '',
        col.align && col.align !== 'start' ? `text-align: ${col.align}` : '',
      ]
        .filter(Boolean)
        .join('; ');

      cells.push(html`
        <th
          part="header-cell"
          class="${isSortable ? 'header-sortable' : ''} ${isFrozen ? 'frozen' : ''} ${isLastFrozen ? 'frozen-last' : ''}"
          style=${thStyle || nothing}
          aria-sort=${isSortable
            ? this._sortState.key === col.key
              ? this._sortState.direction === 'asc'
                ? 'ascending'
                : this._sortState.direction === 'desc'
                  ? 'descending'
                  : 'none'
              : 'none'
            : nothing}
          tabindex=${isSortable ? '0' : nothing}
          @click=${isSortable ? () => this._handleSort(col.key) : nothing}
          @keydown=${isSortable
            ? (e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  this._handleSort(col.key);
                }
              }
            : nothing}
        >
          <span class="header-content">
            ${col.header}
            ${isSortable ? this._renderSortIcon(col.key) : nothing}
          </span>
        </th>
      `);
      effectiveIdx++;
    });

    return html`<tr part="header-row">${cells}</tr>`;
  }

  private _renderBodyRow(row: AnyRow, index: number) {
    const isSelected = this._selectedIds.has(row.id);
    const isExpanded = this._expandedIds.has(row.id);
    const hasCheckbox = this.selection === 'multi';
    const hasExpand = this.expandable && !!this.detailTemplate;

    const rowClasses = [
      isSelected ? 'row-selected' : '',
      this.selection === 'single' && isSelected ? 'row-selected-single' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const isInteractive = this.selection !== 'none';
    const detailId = `so-table-detail-${String(row.id).replace(/[^a-z0-9]/gi, '-')}`;

    const cells: TemplateResult[] = [];
    let effectiveIdx = 0;

    // Checkbox cell
    if (hasCheckbox) {
      const isFrozen = effectiveIdx < this.freezeColumns;
      const isLastFrozen = isFrozen && effectiveIdx === this.freezeColumns - 1;
      cells.push(html`
        <td
          part="cell"
          class="col-checkbox ${isFrozen ? 'frozen' : ''} ${isLastFrozen ? 'frozen-last' : ''}"
        >
          <so-checkbox
            .checked=${isSelected}
            @so-change=${(e: CustomEvent<{ checked: boolean }>) => {
              e.stopPropagation();
              this._handleRowSelect(row.id, e.detail.checked);
            }}
          ></so-checkbox>
        </td>
      `);
      effectiveIdx++;
    }

    // Expand cell
    if (hasExpand) {
      const isFrozen = effectiveIdx < this.freezeColumns;
      const isLastFrozen = isFrozen && effectiveIdx === this.freezeColumns - 1;
      cells.push(html`
        <td
          part="cell expand-cell"
          class="col-expand ${isFrozen ? 'frozen' : ''} ${isLastFrozen ? 'frozen-last' : ''}"
        >
          <button
            type="button"
            class="expand-btn ${isExpanded ? 'expand-open' : ''}"
            aria-expanded=${isExpanded ? 'true' : 'false'}
            aria-controls=${detailId}
            aria-label="Expand row"
            @click=${(e: Event) => {
              e.stopPropagation();
              this._toggleExpand(row.id);
            }}
          >
            <so-icon name="chevron-down" size="sm" decorative></so-icon>
          </button>
        </td>
      `);
      effectiveIdx++;
    }

    // Data cells
    this.columns.forEach(col => {
      const isFrozen = effectiveIdx < this.freezeColumns;
      const isLastFrozen = isFrozen && effectiveIdx === this.freezeColumns - 1;

      const rawValue = row[col.key];
      const cellContent = col.render
        ? col.render(rawValue, row, index)
        : rawValue != null
          ? String(rawValue)
          : '';

      cells.push(html`
        <td
          part="cell"
          class="${isFrozen ? 'frozen' : ''} ${isLastFrozen ? 'frozen-last' : ''}"
          style=${col.align && col.align !== 'start' ? `text-align: ${col.align}` : nothing}
        >
          <div class="cell-inner">${cellContent}</div>
        </td>
      `);
      effectiveIdx++;
    });

    return html`
      <tr
        part="row"
        class=${rowClasses || nothing}
        aria-selected=${isInteractive ? String(isSelected) : nothing}
        tabindex=${isInteractive ? '0' : nothing}
        @click=${this.selection === 'single' ? () => this._handleSingleSelect(row.id) : nothing}
        @keydown=${isInteractive
          ? (e: KeyboardEvent) => this._handleRowKeydown(e, row.id)
          : nothing}
      >
        ${cells}
      </tr>
      ${hasExpand && this.detailTemplate
        ? html`
            <tr part="detail-row" id=${detailId}>
              <td colspan=${this._totalCols}>
                <div class="detail-content ${isExpanded ? 'detail-expanded' : ''}">
                  <div class="detail-inner">${isExpanded ? this.detailTemplate(row) : nothing}</div>
                </div>
              </td>
            </tr>
          `
        : nothing}
    `;
  }

  private _renderEmptyState() {
    return html`
      <tr>
        <td colspan=${this._totalCols} part="empty" class="empty-cell">
          <slot name="empty">
            <div class="empty-default">
              <so-icon name="search" size="lg" decorative></so-icon>
              <p>${this.emptyMessage}</p>
            </div>
          </slot>
        </td>
      </tr>
    `;
  }

  private _renderToolbar() {
    const hasBatch = this.selection !== 'none' && this._selectedIds.size > 0;
    const count = this._selectedIds.size;

    if (hasBatch) {
      return html`
        <div part="toolbar batch-bar" class="toolbar toolbar-batch">
          <div class="toolbar-left">
            <so-button
              variant="ghost"
              size="sm"
              icon-only
              .label=${'Cancel batch selection'}
              @so-click=${this._handleCancelSelection}
            >
              <so-icon slot="prefix" name="close" decorative></so-icon>
            </so-button>
            <span class="batch-count">${count} item${count === 1 ? '' : 's'} selected</span>
          </div>
          <div class="toolbar-right">
            <slot name="batch-actions"></slot>
          </div>
        </div>
      `;
    }

    return html`
      <div part="toolbar" class="toolbar">
        <div class="toolbar-left">
          ${this.filterable
            ? html`
                <so-input
                  part="filter"
                  class="filter-input"
                  type="search"
                  placeholder=${this.filterPlaceholder}
                  .value=${this._filterQuery}
                  aria-label="Filter table"
                  @so-input=${this._handleFilterInput}
                >
                  <so-icon slot="prefix" name="search" decorative></so-icon>
                </so-input>
              `
            : nothing}
        </div>
        <div class="toolbar-right">
          <slot name="toolbar-actions"></slot>
        </div>
      </div>
    `;
  }

  private _renderPagination() {
    return html`
      <div part="pagination">
        <so-pagination
          page=${this._page}
          total=${this._totalPages}
          @so-change=${this._handlePageChange}
        ></so-pagination>
      </div>
    `;
  }

  private _renderSkeletonTable() {
    const skeletonWidths = ['60%', '80%', '70%', '85%', '65%'];
    const rowCount = Math.min(this.pageSize, 5);

    return html`
      <div part="container">
        <div part="scroll">
          <table
            part="table"
            style=${this._useFixedLayout ? 'table-layout: fixed' : nothing}
          >
            <thead part="thead">
              <tr part="header-row">
                ${this.columns.map(
                  (col, i) => html`
                    <th
                      part="header-cell"
                      style=${col.width ? `width: ${col.width}` : nothing}
                    >
                      <span
                        class="skeleton-cell"
                        style="width: ${skeletonWidths[i % 5]}"
                      ></span>
                    </th>
                  `,
                )}
              </tr>
            </thead>
            <tbody part="tbody">
              ${Array.from({ length: rowCount }, (_, rowIdx) => html`
                <tr part="row">
                  ${this.columns.map(
                    (_, colIdx) => html`
                      <td part="cell">
                        <span
                          class="skeleton-cell"
                          style="width: ${skeletonWidths[(rowIdx + colIdx) % 5]}"
                        ></span>
                      </td>
                    `,
                  )}
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ── Main render ──────────────────────────────────────────────────────────

  render() {
    if (this.loading) return this._renderSkeletonTable();

    const showToolbar = this.filterable || this.selection !== 'none';
    const visibleRows = this._visibleRows;

    return html`
      <div
        part="container"
        aria-busy=${this.loading ? 'true' : nothing}
      >
        ${showToolbar ? this._renderToolbar() : nothing}

        <div part="scroll">
          <table
            part="table"
            role=${this.selection !== 'none' ? 'grid' : 'table'}
            style=${this._useFixedLayout ? 'table-layout: fixed' : nothing}
          >
            <thead part="thead">
              ${this._renderHeaderRow()}
            </thead>
            <tbody part="tbody">
              ${visibleRows.length === 0
                ? this._renderEmptyState()
                : repeat(
                    visibleRows,
                    row => row.id,
                    (row, idx) => this._renderBodyRow(row, idx),
                  )}
            </tbody>
          </table>
        </div>

        ${this.paginate ? this._renderPagination() : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'so-table': SoTable;
  }
}
