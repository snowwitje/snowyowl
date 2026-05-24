import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/breadcrumb';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Components/Breadcrumb',
  component: 'so-breadcrumb',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    wrap: { control: 'boolean' },
  },
  args: {
    wrap: false,
  },
};
export default meta;
type Story = StoryObj;

/* ══════════════════════════════════════════════════════════════════════════
   1. Default — 3 items: Home › Parent › Current page
══════════════════════════════════════════════════════════════════════════ */

export const Default: Story = {
  render: () => html`
    <so-breadcrumb>
      <so-breadcrumb-item href="/home">Home</so-breadcrumb-item>
      <so-breadcrumb-item href="/home/parent">Parent</so-breadcrumb-item>
      <so-breadcrumb-item>Current page</so-breadcrumb-item>
    </so-breadcrumb>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. SingleItem — current page only (no separators)
══════════════════════════════════════════════════════════════════════════ */

export const SingleItem: Story = {
  render: () => html`
    <so-breadcrumb>
      <so-breadcrumb-item>Dashboard</so-breadcrumb-item>
    </so-breadcrumb>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   3. TwoItems — Home › Current page
══════════════════════════════════════════════════════════════════════════ */

export const TwoItems: Story = {
  render: () => html`
    <so-breadcrumb>
      <so-breadcrumb-item href="/home">Home</so-breadcrumb-item>
      <so-breadcrumb-item>Settings</so-breadcrumb-item>
    </so-breadcrumb>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   4. ManyItems — 5+ levels deep
══════════════════════════════════════════════════════════════════════════ */

export const ManyItems: Story = {
  render: () => html`
    <so-breadcrumb>
      <so-breadcrumb-item href="/">Home</so-breadcrumb-item>
      <so-breadcrumb-item href="/products">Products</so-breadcrumb-item>
      <so-breadcrumb-item href="/products/electronics">Electronics</so-breadcrumb-item>
      <so-breadcrumb-item href="/products/electronics/audio">Audio</so-breadcrumb-item>
      <so-breadcrumb-item href="/products/electronics/audio/headphones">Headphones</so-breadcrumb-item>
      <so-breadcrumb-item>Wireless Noise-Cancelling</so-breadcrumb-item>
    </so-breadcrumb>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   5. LongLabels — intermediate items truncated with max-width + tooltip
══════════════════════════════════════════════════════════════════════════ */

export const LongLabels: Story = {
  render: () => html`
    <so-breadcrumb>
      <so-breadcrumb-item href="/">Home</so-breadcrumb-item>
      <so-breadcrumb-item href="/category" max-width="120px">
        Very Long Category Name
      </so-breadcrumb-item>
      <so-breadcrumb-item href="/category/subcategory" max-width="120px">
        Another Extremely Long Subcategory
      </so-breadcrumb-item>
      <so-breadcrumb-item>Current Page Title</so-breadcrumb-item>
    </so-breadcrumb>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   6. WithWrap — enough items to demonstrate line wrapping
══════════════════════════════════════════════════════════════════════════ */

export const WithWrap: Story = {
  render: () => html`
    <div style="max-width: 360px; border: 1px dashed var(--soSemanticColorBorderDefault); padding: 12px; border-radius: 4px;">
      <so-breadcrumb wrap>
        <so-breadcrumb-item href="/">Home</so-breadcrumb-item>
        <so-breadcrumb-item href="/products">Products</so-breadcrumb-item>
        <so-breadcrumb-item href="/products/electronics">Electronics</so-breadcrumb-item>
        <so-breadcrumb-item href="/products/electronics/audio">Audio</so-breadcrumb-item>
        <so-breadcrumb-item href="/products/electronics/audio/headphones">Headphones</so-breadcrumb-item>
        <so-breadcrumb-item>Wireless Noise-Cancelling</so-breadcrumb-item>
      </so-breadcrumb>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   7. ThemeShowcase — all 6 themes × 3-item breadcrumb
══════════════════════════════════════════════════════════════════════════ */

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      ${THEMES.map(
        (theme) => html`
          <div
            data-theme=${theme}
            style="
              padding: 16px;
              border-radius: 8px;
              background: var(--soSemanticColorSurfaceDefault, #fff);
              border: 1px solid var(--soSemanticColorBorderDefault, #e5e7eb);
            "
          >
            <div style="
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.06em;
              color: var(--soSemanticColorTextSubtle);
              margin-bottom: 12px;
              font-family: monospace;
            ">${theme}</div>
            <so-breadcrumb>
              <so-breadcrumb-item href="/home">Home</so-breadcrumb-item>
              <so-breadcrumb-item href="/home/parent">Parent</so-breadcrumb-item>
              <so-breadcrumb-item>Current page</so-breadcrumb-item>
            </so-breadcrumb>
          </div>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'fullscreen' },
};
