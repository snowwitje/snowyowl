import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { SO_ICON_NAMES } from '../icon-names.js';
import './so-icon.js';

const meta: Meta = {
  title: 'Atomic/Icon',
  component: 'so-icon',
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: SO_ICON_NAMES },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    label: { control: 'text' },
    decorative: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { name: 'search', size: 'md', decorative: true },
  render: args => html`
    <so-icon
      name=${args.name}
      size=${args.size}
      ?decorative=${args.decorative}
      label=${args.label || ''}
    ></so-icon>
  `,
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;align-items:center;gap:16px;color:#1f2937">
      <div style="text-align:center">
        <so-icon name="star" size="xs" decorative></so-icon>
        <div style="font-size:10px;margin-top:4px;color:#6b7280">xs 12px</div>
      </div>
      <div style="text-align:center">
        <so-icon name="star" size="sm" decorative></so-icon>
        <div style="font-size:10px;margin-top:4px;color:#6b7280">sm 16px</div>
      </div>
      <div style="text-align:center">
        <so-icon name="star" size="md" decorative></so-icon>
        <div style="font-size:10px;margin-top:4px;color:#6b7280">md 20px</div>
      </div>
      <div style="text-align:center">
        <so-icon name="star" size="lg" decorative></so-icon>
        <div style="font-size:10px;margin-top:4px;color:#6b7280">lg 24px</div>
      </div>
      <div style="text-align:center">
        <so-icon name="star" size="xl" decorative></so-icon>
        <div style="font-size:10px;margin-top:4px;color:#6b7280">xl 32px</div>
      </div>
    </div>
  `,
};

// ── Colors (inherits currentColor) ───────────────────────────────────────────

export const Colors: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center">
      <so-icon name="heart" size="lg" decorative style="color:#1f2937"></so-icon>
      <so-icon name="heart" size="lg" decorative style="color:#7d5e8f"></so-icon>
      <so-icon name="heart" size="lg" decorative style="color:#148448"></so-icon>
      <so-icon name="heart" size="lg" decorative style="color:#d9233b"></so-icon>
      <so-icon name="heart" size="lg" decorative style="color:#c94500"></so-icon>
      <so-icon name="heart" size="lg" decorative style="color:#9ca3af"></so-icon>
    </div>
  `,
};

// ── Accessibility ─────────────────────────────────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;font-family:sans-serif;font-size:14px;color:#1f2937">
      <div style="display:flex;align-items:center;gap:8px">
        <so-icon name="search" size="md" decorative></so-icon>
        <span>Decorative — icon ignored by screen reader</span>
      </div>
      <div>
        <so-icon name="close" size="md" label="Close dialog"></so-icon>
        <span style="font-size:11px;color:#6b7280;margin-left:8px">Meaningful — announces "Close dialog"</span>
      </div>
    </div>
  `,
};

// ── Full Gallery ──────────────────────────────────────────────────────────────

export const Gallery: Story = {
  render: () => html`
    <div style="
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 8px;
      font-family: sans-serif;
      color: #1f2937;
    ">
      ${SO_ICON_NAMES.map(name => html`
        <div style="
          display:flex;flex-direction:column;align-items:center;
          gap:6px;padding:12px 4px;border-radius:6px;
          border:1px solid #e5e7eb;cursor:default;
        "
          title=${name}
          @mouseenter=${(e: MouseEvent) => (e.currentTarget as HTMLElement).style.background='#f7f3fa'}
          @mouseleave=${(e: MouseEvent) => (e.currentTarget as HTMLElement).style.background=''}
        >
          <so-icon name=${name} size="md" decorative></so-icon>
          <span style="font-size:9px;color:#6b7280;text-align:center;word-break:break-all;line-height:1.3">
            ${name}
          </span>
        </div>
      `)}
    </div>
  `,
};
