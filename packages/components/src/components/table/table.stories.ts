import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/table';
import '@snowyowl/components/components/badge';
import '@snowyowl/components/components/button';
import '@snowyowl/components/components/avatar';
import type { SoTable } from './table.js';
import type { ColumnDef, TableRow } from './table.types.js';

/* ── Sample data ── */

type Person = {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joined: string;
  score: number;
  email: string;
  department: string;
};

const PEOPLE: TableRow<Person>[] = [
  { id: 1,  name: 'Alex Morgan',       role: 'Engineer',       status: 'active',   joined: '2022-03-15', score: 92, email: 'alex@example.com',     department: 'Engineering' },
  { id: 2,  name: 'Brigitte Fontaine', role: 'Designer',       status: 'active',   joined: '2021-11-02', score: 88, email: 'brigitte@example.com',  department: 'Design' },
  { id: 3,  name: 'Carlos Rivera',     role: 'Product',        status: 'pending',  joined: '2023-01-20', score: 75, email: 'carlos@example.com',    department: 'Product' },
  { id: 4,  name: 'Diana Chen',        role: 'Engineer',       status: 'active',   joined: '2020-06-08', score: 95, email: 'diana@example.com',     department: 'Engineering' },
  { id: 5,  name: 'Eduardo Silva',     role: 'Data Analyst',   status: 'inactive', joined: '2019-09-14', score: 62, email: 'eduardo@example.com',   department: 'Analytics' },
  { id: 6,  name: 'Fatima Al-Rashid', role: 'Engineer',       status: 'active',   joined: '2022-07-30', score: 90, email: 'fatima@example.com',    department: 'Engineering' },
  { id: 7,  name: 'George Kowalski',   role: 'Marketing',      status: 'active',   joined: '2021-04-18', score: 78, email: 'george@example.com',    department: 'Marketing' },
  { id: 8,  name: 'Hana Nakamura',    role: 'Designer',       status: 'pending',  joined: '2023-05-03', score: 81, email: 'hana@example.com',      department: 'Design' },
];

const MANY_ROWS: TableRow<Person>[] = Array.from({ length: 50 }, (_, i) => ({
  ...PEOPLE[i % PEOPLE.length],
  id: i + 1,
  name: `${PEOPLE[i % PEOPLE.length].name} ${Math.floor(i / PEOPLE.length) > 0 ? Math.floor(i / PEOPLE.length) + 1 : ''}`.trim(),
}));

/* ── Column sets ── */

const BASIC_COLUMNS: ColumnDef<Person>[] = [
  { key: 'name',       header: 'Name',       minWidth: '160px' },
  { key: 'role',       header: 'Role',       minWidth: '120px' },
  { key: 'department', header: 'Department', minWidth: '140px' },
  { key: 'joined',     header: 'Joined',     minWidth: '110px' },
];

const SORTABLE_COLUMNS: ColumnDef<Person>[] = [
  { key: 'name',   header: 'Name',   sortable: true, minWidth: '160px' },
  { key: 'role',   header: 'Role',   sortable: true, minWidth: '120px' },
  { key: 'score',  header: 'Score',  sortable: true, minWidth: '90px', align: 'end' },
  { key: 'joined', header: 'Joined', sortable: true, minWidth: '110px' },
];

const FULL_COLUMNS: ColumnDef<Person>[] = [
  { key: 'name',       header: 'Name',       sortable: true, minWidth: '160px' },
  { key: 'role',       header: 'Role',       sortable: true, minWidth: '120px' },
  { key: 'department', header: 'Department', sortable: true, minWidth: '140px' },
  { key: 'score',      header: 'Score',      sortable: true, minWidth: '90px', align: 'end' },
  { key: 'status',     header: 'Status',     minWidth: '110px' },
  { key: 'joined',     header: 'Joined',     sortable: true, minWidth: '110px' },
];

const WIDE_COLUMNS: ColumnDef<Person>[] = [
  { key: 'name',       header: 'Name',       width: '180px' },
  { key: 'email',      header: 'Email',      width: '220px' },
  { key: 'role',       header: 'Role',       width: '140px' },
  { key: 'department', header: 'Department', width: '160px' },
  { key: 'score',      header: 'Score',      width: '100px', align: 'end' },
  { key: 'status',     header: 'Status',     width: '120px' },
  { key: 'joined',     header: 'Joined',     width: '120px' },
  { key: 'email',      header: 'Email 2',    width: '220px' },
];

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

/* ── Meta ── */

const meta: Meta = {
  title: 'Components/Table',
  component: 'so-table',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

/* Helper to mount a table with properties */
function mountTable(
  setup: (el: SoTable) => void,
  slot = '',
) {
  return html`
    <so-table
      ${slot
        ? html`` // slotted content rendered below
        : nothing}
      @so-sort=${(e: CustomEvent) => console.log('so-sort', e.detail)}
      @so-filter=${(e: CustomEvent) => console.log('so-filter', e.detail)}
      @so-selection-change=${(e: CustomEvent) => console.log('so-selection-change', e.detail)}
      @so-page-change=${(e: CustomEvent) => console.log('so-page-change', e.detail)}
      @so-row-expand=${(e: CustomEvent) => console.log('so-row-expand', e.detail)}
      ${ref(el => {
        if (el) setup(el as SoTable);
      })}
    >${slot}</so-table>
  `;
}

import { ref } from 'lit/directives/ref.js';
import { nothing } from 'lit';

/* ══════════════════════════════════════════════════════════════════════════
   1. Basic — 4 columns, 8 rows, no features
══════════════════════════════════════════════════════════════════════════ */

export const Basic: Story = {
  render: () => html`
    <so-table
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = BASIC_COLUMNS;
        t.rows = PEOPLE;
      })}
    ></so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. Sortable — click headers to sort
══════════════════════════════════════════════════════════════════════════ */

export const Sortable: Story = {
  render: () => html`
    <so-table
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = SORTABLE_COLUMNS;
        t.rows = PEOPLE;
      })}
    ></so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   3. WithFilter — filterable toolbar
══════════════════════════════════════════════════════════════════════════ */

export const WithFilter: Story = {
  render: () => html`
    <so-table
      filterable
      filter-placeholder="Search people…"
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = FULL_COLUMNS;
        t.rows = PEOPLE;
      })}
    ></so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   4. WithSelection — multi-select with checkboxes
══════════════════════════════════════════════════════════════════════════ */

export const WithSelection: Story = {
  render: () => html`
    <so-table
      selection="multi"
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = BASIC_COLUMNS;
        t.rows = PEOPLE;
      })}
    ></so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   5. SingleSelect — entire row clickable
══════════════════════════════════════════════════════════════════════════ */

export const SingleSelect: Story = {
  render: () => html`
    <so-table
      selection="single"
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = BASIC_COLUMNS;
        t.rows = PEOPLE;
      })}
    ></so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   6. WithBatchActions — selection + batch-actions slot
══════════════════════════════════════════════════════════════════════════ */

export const WithBatchActions: Story = {
  render: () => html`
    <so-table
      selection="multi"
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = BASIC_COLUMNS;
        t.rows = PEOPLE;
      })}
    >
      <so-button slot="batch-actions" variant="ghost" size="sm">
        <so-icon slot="prefix" name="arrow-down" decorative></so-icon>
        Export
      </so-button>
      <so-button slot="batch-actions" variant="danger" size="sm">Delete</so-button>
    </so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   7. WithPagination — 50 rows, page-size=5
══════════════════════════════════════════════════════════════════════════ */

export const WithPagination: Story = {
  render: () => html`
    <so-table
      paginate
      page-size="5"
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = FULL_COLUMNS;
        t.rows = MANY_ROWS;
      })}
    ></so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   8. WithExpandableRows — detail panel per row
══════════════════════════════════════════════════════════════════════════ */

export const WithExpandableRows: Story = {
  render: () => html`
    <so-table
      expandable
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = BASIC_COLUMNS;
        t.rows = PEOPLE;
        t.detailTemplate = (row: TableRow) => {
          const p = row as unknown as Person;
          return html`
            <div style="display: flex; gap: 24px; flex-wrap: wrap;">
              <div>
                <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--soSemanticColorTextSubtle); margin-bottom: 4px;">Email</div>
                <div style="font-size: 14px;">${p.email}</div>
              </div>
              <div>
                <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--soSemanticColorTextSubtle); margin-bottom: 4px;">Score</div>
                <div style="font-size: 14px;">${p.score}</div>
              </div>
              <div>
                <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--soSemanticColorTextSubtle); margin-bottom: 4px;">Status</div>
                <div style="font-size: 14px;">${p.status}</div>
              </div>
            </div>
          `;
        };
      })}
    ></so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   9. FrozenColumns — first 2 frozen, 8 columns, horizontal scroll
══════════════════════════════════════════════════════════════════════════ */

export const FrozenColumns: Story = {
  render: () => html`
    <div style="width: 500px; border: 1px solid var(--soSemanticColorBorderSubtle); border-radius: 8px; overflow: hidden;">
      <so-table
        freeze-columns="2"
        ${ref(el => {
          if (!el) return;
          const t = el as SoTable;
          t.columns = WIDE_COLUMNS;
          t.rows = PEOPLE;
        })}
      ></so-table>
    </div>
    <p style="font-size: 13px; color: var(--soSemanticColorTextSubtle); margin-top: 8px;">
      Scroll the table horizontally — first 2 columns (Name, Email) remain sticky.
    </p>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   10. Striped — alternating row backgrounds
══════════════════════════════════════════════════════════════════════════ */

export const Striped: Story = {
  render: () => html`
    <so-table
      striped
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = BASIC_COLUMNS;
        t.rows = PEOPLE;
      })}
    ></so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   11. Loading — skeleton state
══════════════════════════════════════════════════════════════════════════ */

export const Loading: Story = {
  render: () => html`
    <so-table
      loading
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = FULL_COLUMNS;
        t.rows = [];
      })}
    ></so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   12. EmptyState — no rows, default message
══════════════════════════════════════════════════════════════════════════ */

export const EmptyState: Story = {
  render: () => html`
    <so-table
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = BASIC_COLUMNS;
        t.rows = [];
      })}
    ></so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   13. EmptyStateCustom — custom slot="empty" content
══════════════════════════════════════════════════════════════════════════ */

export const EmptyStateCustom: Story = {
  render: () => html`
    <so-table
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = BASIC_COLUMNS;
        t.rows = [];
      })}
    >
      <div slot="empty" style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 48px; color: var(--soSemanticColorTextSubtle);">
        <so-icon name="search" size="xl" decorative></so-icon>
        <p style="margin: 0; font-weight: 600;">No results found</p>
        <p style="margin: 0; font-size: 13px;">Try adjusting your search or filters.</p>
      </div>
    </so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   14. ServerSide — all events logged; consumer drives data
══════════════════════════════════════════════════════════════════════════ */

export const ServerSide: Story = {
  render: () => html`
    <p style="font-size: 13px; color: var(--soSemanticColorTextSubtle); margin-bottom: 12px;">
      <strong>Server-side mode:</strong> sort, filter, and page events are logged to the console.
      In a real integration, handle <code>so-sort</code>, <code>so-filter</code>,
      and <code>so-page-change</code> to fetch new rows from the backend.
    </p>
    <so-table
      server-side
      sortable
      filterable
      paginate
      page-size="4"
      total-rows="8"
      @so-sort=${(e: CustomEvent) => console.log('so-sort (server-side)', e.detail)}
      @so-filter=${(e: CustomEvent) => console.log('so-filter (server-side)', e.detail)}
      @so-page-change=${(e: CustomEvent) => console.log('so-page-change (server-side)', e.detail)}
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = SORTABLE_COLUMNS;
        t.rows = PEOPLE; // in real use, consumer replaces this on each event
      })}
    ></so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   15. FullFeatured — sortable + filterable + paginate + multi select + batch + freeze
══════════════════════════════════════════════════════════════════════════ */

export const FullFeatured: Story = {
  render: () => html`
    <so-table
      sortable
      filterable
      filter-placeholder="Search people…"
      selection="multi"
      paginate
      page-size="5"
      freeze-columns="1"
      striped
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = FULL_COLUMNS;
        t.rows = MANY_ROWS;
      })}
    >
      <so-button slot="batch-actions" variant="ghost" size="sm">Export</so-button>
      <so-button slot="batch-actions" variant="danger" size="sm">Delete</so-button>
    </so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   16. WithCustomCells — so-badge, so-button, so-avatar in cells
══════════════════════════════════════════════════════════════════════════ */

const STATUS_VARIANT: Record<string, string> = {
  active:   'success',
  inactive: 'neutral',
  pending:  'warning',
};

const CUSTOM_COLUMNS: ColumnDef<Person>[] = [
  {
    key: 'name',
    header: 'Name',
    minWidth: '200px',
    render: (_val, row) => {
      const p = row as unknown as Person;
      return html`
        <div style="display: flex; align-items: center; gap: 10px;">
          <so-avatar name=${p.name} size="sm"></so-avatar>
          <div>
            <div style="font-weight: 500;">${p.name}</div>
            <div style="font-size: 12px; color: var(--soSemanticColorTextSubtle);">${p.email}</div>
          </div>
        </div>
      `;
    },
  },
  { key: 'department', header: 'Department', minWidth: '140px' },
  {
    key: 'status',
    header: 'Status',
    minWidth: '110px',
    render: (val) => html`
      <so-badge variant=${STATUS_VARIANT[val as string] ?? 'neutral'}>${val}</so-badge>
    `,
  },
  {
    key: 'score',
    header: 'Score',
    minWidth: '90px',
    align: 'end',
    render: (val) => {
      const score = val as number;
      const color = score >= 90 ? 'var(--soSemanticColorStatusSuccess)' : score >= 75 ? 'var(--soSemanticColorTextDefault)' : 'var(--soSemanticColorStatusError)';
      return html`<span style="font-weight: 600; color: ${color};">${score}</span>`;
    },
  },
  {
    key: 'id',
    header: 'Actions',
    minWidth: '80px',
    align: 'end',
    render: () => html`
      <so-button variant="ghost" size="sm" icon-only label="More actions">
        <so-icon slot="prefix" name="list" decorative></so-icon>
      </so-button>
    `,
  },
];

export const WithCustomCells: Story = {
  render: () => html`
    <so-table
      ${ref(el => {
        if (!el) return;
        const t = el as SoTable;
        t.columns = CUSTOM_COLUMNS as ColumnDef[];
        t.rows = PEOPLE;
      })}
    ></so-table>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   17. ThemeShowcase — all 6 themes, basic table
══════════════════════════════════════════════════════════════════════════ */

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
      ${THEMES.map(
        theme => html`
          <div
            data-theme=${theme}
            style="
              padding: 16px;
              border-radius: 8px;
              background: var(--soSemanticColorSurfaceDefault, #fff);
              border: 1px solid var(--soSemanticColorBorderSubtle);
            "
          >
            <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--soSemanticColorTextSubtle); margin-bottom: 12px; font-family: monospace;">${theme}</div>
            <so-table
              ${ref(el => {
                if (!el) return;
                const t = el as SoTable;
                t.columns = BASIC_COLUMNS;
                t.rows = PEOPLE.slice(0, 4);
              })}
            ></so-table>
          </div>
        `,
      )}
    </div>
  `,
};
