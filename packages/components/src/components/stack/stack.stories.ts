import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/stack';
import '@snowyowl/components/components/card';
import '@snowyowl/components/components/button';
import '@snowyowl/components/components/tag';
import '@snowyowl/components/components/input';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Components/Stack',
  component: 'so-stack',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

/* ── Helpers ─────────────────────────────────────────────────────────────── */

const box = (label: string, color = 'var(--soSemanticColorSurfaceContainer, #f3eef7)') => html`
  <div style="
    padding: 16px 24px;
    background: ${color};
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--soSemanticColorTextDefault);
    text-align: center;
  ">${label}</div>
`;

// ── 1. ColumnDefault ──────────────────────────────────────────────────────────

export const ColumnDefault: Story = {
  render: () => html`
    <so-stack gap="lg" style="max-width: 400px">
      <so-card heading="Card One" description="First item in the vertical stack."></so-card>
      <so-card heading="Card Two" description="Second item in the vertical stack."></so-card>
      <so-card heading="Card Three" description="Third item in the vertical stack."></so-card>
    </so-stack>
  `,
};

// ── 2. RowBasic ───────────────────────────────────────────────────────────────

export const RowBasic: Story = {
  render: () => html`
    <so-stack direction="row" gap="sm">
      <so-button>Back</so-button>
      <so-button>Next</so-button>
      <so-button variant="primary">Submit</so-button>
    </so-stack>
  `,
};

// ── 3. SpaceBetween ───────────────────────────────────────────────────────────

export const SpaceBetween: Story = {
  render: () => html`
    <so-stack
      direction="row"
      justify="space-between"
      align="center"
      full-width
      style="padding: 12px 16px; background: var(--soSemanticColorSurfaceContainer, #f3eef7); border-radius: 8px"
    >
      <span style="font-size: 16px; font-weight: 600; color: var(--soSemanticColorTextDefault)">
        Section Title
      </span>
      <so-button size="sm" variant="ghost">Edit</so-button>
    </so-stack>
  `,
};

// ── 4. WrapRow ────────────────────────────────────────────────────────────────

export const WrapRow: Story = {
  render: () => html`
    <so-stack direction="row" gap="xs" wrap style="max-width: 400px">
      ${['Design', 'Engineering', 'Product', 'Marketing', 'Sales', 'Support', 'Legal', 'Finance', 'Operations'].map(
        tag => html`<so-tag>${tag}</so-tag>`,
      )}
    </so-stack>
  `,
};

// ── 5. NestedStacks ───────────────────────────────────────────────────────────

export const NestedStacks: Story = {
  render: () => html`
    <so-stack gap="lg" style="max-width: 500px">
      ${box('Header')}
      <so-stack direction="row" gap="md">
        ${box('Left', 'var(--soSemanticColorSurfaceContainerLow, #f9f5fc)')}
        ${box('Center', 'var(--soSemanticColorSurfaceContainerLow, #f9f5fc)')}
        ${box('Right', 'var(--soSemanticColorSurfaceContainerLow, #f9f5fc)')}
      </so-stack>
      ${box('Footer')}
    </so-stack>
  `,
};

// ── 6. GapScale ───────────────────────────────────────────────────────────────

const gapEntries: Array<{ value: string; px: string }> = [
  { value: 'none', px: '0px' },
  { value: 'xs',   px: '4px' },
  { value: 'sm',   px: '8px' },
  { value: 'md',   px: '16px' },
  { value: 'lg',   px: '24px' },
  { value: 'xl',   px: '32px' },
  { value: '2xl',  px: '48px' },
];

export const GapScale: Story = {
  render: () => html`
    <so-stack gap="2xl">
      ${gapEntries.map(
        ({ value, px }) => html`
          <div>
            <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                        color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:8px">
              gap="${value}" — ${px}
            </div>
            <so-stack direction="row" gap=${value as any}>
              ${box('A')}
              ${box('B')}
              ${box('C')}
            </so-stack>
          </div>
        `,
      )}
    </so-stack>
  `,
};

// ── 7. FormLayout ─────────────────────────────────────────────────────────────

export const FormLayout: Story = {
  render: () => html`
    <so-stack gap="lg" style="max-width: 400px">
      <so-input label="First name" placeholder="Alissa"></so-input>
      <so-input label="Last name" placeholder="Snowy"></so-input>
      <so-input label="Email" type="email" placeholder="alissa@example.com"></so-input>
      <so-stack direction="row" gap="sm" justify="end">
        <so-button>Cancel</so-button>
        <so-button variant="primary">Save</so-button>
      </so-stack>
    </so-stack>
  `,
};

// ── 8. ThemeShowcase ──────────────────────────────────────────────────────────

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px">
      ${THEMES.map(
        theme => html`
          <div data-theme=${theme} style="padding:24px;border-radius:8px;background:var(--soSemanticColorSurfaceDefault)">
            <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                        color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:16px">${theme}</div>
            <so-stack direction="row" gap="md" align="center" justify="space-between" full-width>
              <span style="color:var(--soSemanticColorTextDefault);font-weight:500">Stack content</span>
              <so-stack direction="row" gap="sm">
                <so-button size="sm">Cancel</so-button>
                <so-button size="sm" variant="primary">Save</so-button>
              </so-stack>
            </so-stack>
          </div>
        `,
      )}
    </div>
  `,
};
