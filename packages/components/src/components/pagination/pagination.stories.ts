import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/pagination';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Components/Pagination',
  component: 'so-pagination',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    page:     { control: { type: 'number', min: 1 } },
    total:    { control: { type: 'number', min: 1 } },
    siblings: { control: { type: 'number', min: 0 } },
    loop:     { control: 'boolean' },
    disabled: { control: 'boolean' },
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    page:     1,
    total:    10,
    siblings: 1,
    loop:     false,
    disabled: false,
    size:     'md',
  },
};
export default meta;

type Story = StoryObj;

/* ══════════════════════════════════════════════════════════════════════════
   1. Default — 10 pages, current=1
══════════════════════════════════════════════════════════════════════════ */

export const Default: Story = {
  render: args => html`
    <so-pagination
      page=${args['page']}
      total=${args['total']}
      siblings=${args['siblings']}
      ?loop=${args['loop']}
      ?disabled=${args['disabled']}
      size=${args['size']}
    ></so-pagination>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. MidPage — 10 pages, current=5 (both ellipses visible)
══════════════════════════════════════════════════════════════════════════ */

export const MidPage: Story = {
  args: { page: 5, total: 10 },
  render: args => html`
    <so-pagination
      page=${args['page']}
      total=${args['total']}
      siblings=${args['siblings']}
      ?loop=${args['loop']}
      ?disabled=${args['disabled']}
      size=${args['size']}
    ></so-pagination>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   3. FewPages — 3 pages, no ellipsis
══════════════════════════════════════════════════════════════════════════ */

export const FewPages: Story = {
  args: { page: 2, total: 3 },
  render: args => html`
    <so-pagination
      page=${args['page']}
      total=${args['total']}
      siblings=${args['siblings']}
      ?loop=${args['loop']}
      ?disabled=${args['disabled']}
      size=${args['size']}
    ></so-pagination>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   4. ManyPages — 50 pages, current=25
══════════════════════════════════════════════════════════════════════════ */

export const ManyPages: Story = {
  args: { page: 25, total: 50 },
  render: args => html`
    <so-pagination
      page=${args['page']}
      total=${args['total']}
      siblings=${args['siblings']}
      ?loop=${args['loop']}
      ?disabled=${args['disabled']}
      size=${args['size']}
    ></so-pagination>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   5. Loop — wraps from last to first page and vice versa
══════════════════════════════════════════════════════════════════════════ */

export const Loop: Story = {
  args: { page: 1, total: 10, loop: true },
  render: args => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p style="font-size: 13px; color: var(--soSemanticColorTextSubtle); margin: 0;">
        Loop mode — Prev/Next never disable; wraps from page 1 to last and vice versa.
      </p>
      <so-pagination
        page=${args['page']}
        total=${args['total']}
        siblings=${args['siblings']}
        loop
        ?disabled=${args['disabled']}
        size=${args['size']}
      ></so-pagination>
      <so-pagination
        page=${args['total']}
        total=${args['total']}
        siblings=${args['siblings']}
        loop
        ?disabled=${args['disabled']}
        size=${args['size']}
      ></so-pagination>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   6. Sizes — sm / md / lg side by side
══════════════════════════════════════════════════════════════════════════ */

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start;">
      ${(['sm', 'md', 'lg'] as const).map(
        size => html`
          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--soSemanticColorTextSubtle); width: 24px; font-family: monospace;">${size}</span>
            <so-pagination page="5" total="10" size=${size}></so-pagination>
          </div>
        `,
      )}
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   7. Disabled
══════════════════════════════════════════════════════════════════════════ */

export const Disabled: Story = {
  args: { page: 5, total: 10, disabled: true },
  render: args => html`
    <so-pagination
      page=${args['page']}
      total=${args['total']}
      siblings=${args['siblings']}
      ?loop=${args['loop']}
      disabled
      size=${args['size']}
    ></so-pagination>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   8. ThemeShowcase — all 6 themes
══════════════════════════════════════════════════════════════════════════ */

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
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
            <so-pagination page="5" total="10"></so-pagination>
          </div>
        `,
      )}
    </div>
  `,
};
