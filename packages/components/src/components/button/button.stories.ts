import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/button';

// All 6 theme personalities — rendered in ThemeShowcase story
const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Atomic/Button',
  component: 'so-button',
  tags: ['autodocs'],
  argTypes: {
    variant:    { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
    size:       { control: 'select', options: ['sm', 'md', 'lg'] },
    type:       { control: 'select', options: ['button', 'submit', 'reset'] },
    disabled:   { control: 'boolean' },
    skeleton:   { control: 'boolean' },
    iconOnly:   { control: 'boolean' },
    iconCircle: { control: 'boolean' },
    fullWidth:  { control: 'boolean' },
    label:      { control: 'text' },
  },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

// ── 1. Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { variant: 'primary', size: 'md', disabled: false, skeleton: false },
  render: args => html`
    <so-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?skeleton=${args.skeleton}
    >Button</so-button>
  `,
};

// ── 2. Variants ───────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
      <so-button variant="primary">Primary</so-button>
      <so-button variant="secondary">Secondary</so-button>
      <so-button variant="outline">Outline</so-button>
      <so-button variant="ghost">Ghost</so-button>
      <so-button variant="danger">Danger</so-button>
    </div>
  `,
};

// ── 3. Sizes ──────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <so-button variant="primary" size="sm">Small</so-button>
      <so-button variant="primary" size="md">Medium</so-button>
      <so-button variant="primary" size="lg">Large</so-button>
    </div>
  `,
};

// ── 4. States ─────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:20px">
      ${(['primary', 'secondary', 'outline', 'ghost', 'danger'] as const).map(variant => html`
        <div>
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                      color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:10px">
            ${variant}
          </div>
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            <so-button variant=${variant} size="md">Enabled</so-button>
            <so-button variant=${variant} size="md" disabled>Disabled</so-button>
            <so-button variant=${variant} size="md" skeleton>Skeleton</so-button>
          </div>
        </div>
      `)}
    </div>
  `,
};

// ── 5. With Icons ─────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:20px">
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:10px">
          Icon prefix — sm / md / lg
        </div>
        <div style="display:flex;gap:10px;align-items:center">
          <so-button variant="primary" size="sm">
            <so-icon slot="prefix" name="plus-circle" decorative></so-icon>
            Button
          </so-button>
          <so-button variant="primary" size="md">
            <so-icon slot="prefix" name="plus-circle" decorative></so-icon>
            Button
          </so-button>
          <so-button variant="primary" size="lg">
            <so-icon slot="prefix" name="plus-circle" decorative></so-icon>
            Button
          </so-button>
        </div>
      </div>
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:10px">
          Icon suffix — sm / md / lg
        </div>
        <div style="display:flex;gap:10px;align-items:center">
          <so-button variant="secondary" size="sm">
            Button
            <so-icon slot="suffix" name="arrow-right" decorative></so-icon>
          </so-button>
          <so-button variant="secondary" size="md">
            Button
            <so-icon slot="suffix" name="arrow-right" decorative></so-icon>
          </so-button>
          <so-button variant="secondary" size="lg">
            Button
            <so-icon slot="suffix" name="arrow-right" decorative></so-icon>
          </so-button>
        </div>
      </div>
    </div>
  `,
};

// ── 6. Icon Only ──────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:20px">
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:10px">
          Square icon-only
        </div>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          ${(['primary', 'secondary', 'outline', 'ghost', 'danger'] as const).map(v => html`
            <so-button variant=${v} size="sm" icon-only label="Add">
              <so-icon slot="prefix" name="plus" decorative></so-icon>
            </so-button>
            <so-button variant=${v} size="md" icon-only label="Add">
              <so-icon slot="prefix" name="plus" decorative></so-icon>
            </so-button>
            <so-button variant=${v} size="lg" icon-only label="Add">
              <so-icon slot="prefix" name="plus" decorative></so-icon>
            </so-button>
          `)}
        </div>
      </div>
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:10px">
          Circular icon-only
        </div>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          ${(['primary', 'secondary', 'outline', 'ghost', 'danger'] as const).map(v => html`
            <so-button variant=${v} size="sm" icon-circle label="Add">
              <so-icon slot="prefix" name="plus" decorative></so-icon>
            </so-button>
            <so-button variant=${v} size="md" icon-circle label="Add">
              <so-icon slot="prefix" name="plus" decorative></so-icon>
            </so-button>
            <so-button variant=${v} size="lg" icon-circle label="Add">
              <so-icon slot="prefix" name="plus" decorative></so-icon>
            </so-button>
          `)}
        </div>
      </div>
    </div>
  `,
};

// ── 7. Full Width ─────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:10px;max-width:400px">
      <so-button variant="primary"   size="lg" full-width>Full width primary</so-button>
      <so-button variant="secondary" size="lg" full-width>Full width secondary</so-button>
      <so-button variant="outline"   size="lg" full-width>Full width outline</so-button>
    </div>
  `,
};

// ── 8. Theme Showcase ─────────────────────────────────────────────────────────
// Required by CLAUDE.md — renders component in all 6 themes side by side.

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;font-family:sans-serif">
      ${THEMES.map(theme => html`
        <div
          data-theme=${theme}
          style="
            padding: 20px;
            background: var(--soSemanticColorSurfaceDefault, #fff);
            display: flex;
            flex-direction: column;
            gap: 8px;
          "
        >
          <span style="font-size:11px;color:var(--soSemanticColorTextSubtle,#6b7280);
                       margin-bottom:4px;font-family:monospace">
            ${theme}
          </span>
          <so-button variant="primary"   size="md">Primary</so-button>
          <so-button variant="secondary" size="md">Secondary</so-button>
          <so-button variant="outline"   size="md">Outline</so-button>
          <so-button variant="ghost"     size="md">Ghost</so-button>
          <so-button variant="danger"    size="md">Danger</so-button>
          <div style="display:flex;gap:6px;margin-top:4px">
            <so-button variant="primary" size="md" icon-only label="Add">
              <so-icon slot="prefix" name="plus" decorative></so-icon>
            </so-button>
            <so-button variant="primary" size="md" icon-circle label="Add">
              <so-icon slot="prefix" name="plus" decorative></so-icon>
            </so-button>
            <so-button variant="primary" size="md" disabled>Off</so-button>
            <so-button variant="primary" size="md" skeleton>Skel</so-button>
          </div>
        </div>
      `)}
    </div>
  `,
};
