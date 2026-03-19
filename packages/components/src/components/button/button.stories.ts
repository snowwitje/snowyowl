import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/button';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Components/Button',
  component: 'so-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { variant: 'primary', size: 'md', disabled: false },
  render: args => html`
    <so-button variant=${args.variant} size=${args.size} ?disabled=${args.disabled}>
      Button
    </so-button>
  `,
};

// ── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => html`
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <so-button variant="primary">Primary</so-button>
      <so-button variant="secondary">Secondary</so-button>
      <so-button variant="ghost">Ghost</so-button>
      <so-button variant="danger">Danger</so-button>
    </div>
  `,
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex; gap:12px; align-items:center;">
      <so-button size="sm">Small</so-button>
      <so-button size="md">Medium</so-button>
      <so-button size="lg">Large</so-button>
    </div>
  `,
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => html`
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <so-button>Default</so-button>
      <so-button disabled>Disabled</so-button>
      <so-button full-width>Full Width</so-button>
    </div>
  `,
};

// ── Theme Showcase ────────────────────────────────────────────────────────────
// Renders the component in all 6 themes side by side.
// Critical for verifying token overrides work correctly across themes.

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:2px; font-family:sans-serif;">
      ${THEMES.map(
        theme => html`
          <div
            data-theme=${theme}
            style="
              padding:20px;
              background:var(--so-semantic-color-surface-default);
              display:flex;
              flex-direction:column;
              gap:8px;
            "
          >
            <span style="font-size:11px;color:var(--so-semantic-color-text-subtle);margin-bottom:4px;">
              ${theme}
            </span>
            <so-button variant="primary">Primary</so-button>
            <so-button variant="secondary">Secondary</so-button>
            <so-button variant="ghost">Ghost</so-button>
          </div>
        `
      )}
    </div>
  `,
};
