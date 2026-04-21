import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/toggle';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Atomic/Toggle',
  component: 'so-toggle',
  tags: ['autodocs'],
  argTypes: {
    label:      { control: 'text' },
    helperText: { control: 'text', name: 'helper-text' },
    checked:    { control: 'boolean' },
    disabled:   { control: 'boolean' },
    skeleton:   { control: 'boolean' },
    touch:      { control: 'boolean' },
    name:       { control: 'text' },
    value:      { control: 'text' },
  },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

// ── 1. Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { checked: false, disabled: false, skeleton: false },
  render: args => html`
    <so-toggle
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?skeleton=${args.skeleton}
    >Toggle value</so-toggle>
  `,
};

// ── 2. States ─────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px">

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Off / On
        </div>
        <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start">
          <so-toggle
            label="Label text"
            helper-text="Helper text goes here"
          >Toggle value</so-toggle>

          <so-toggle
            label="Label text"
            helper-text="Helper text goes here"
            checked
          >Toggle value</so-toggle>
        </div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Disabled Off / Disabled On
        </div>
        <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start">
          <so-toggle
            label="Label text"
            helper-text="Helper text goes here"
            disabled
          >Toggle value</so-toggle>

          <so-toggle
            label="Label text"
            helper-text="Helper text goes here"
            checked
            disabled
          >Toggle value</so-toggle>
        </div>
      </div>

    </div>
  `,
};

// ── 3. Skeleton ───────────────────────────────────────────────────────────────

export const Skeleton: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px">
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Skeleton loading state
        </div>
        <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start">
          <so-toggle label="Label text" helper-text="Helper text" skeleton>Toggle value</so-toggle>
          <so-toggle label="Label text" helper-text="Helper text" skeleton>Toggle value</so-toggle>
        </div>
      </div>
      <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start">
        <so-toggle skeleton>Toggle value</so-toggle>
        <so-toggle skeleton>Toggle value</so-toggle>
      </div>
    </div>
  `,
};

// ── 4. With label and helper text ─────────────────────────────────────────────

export const WithHelperText: Story = {
  render: () => html`
    <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start">
      <so-toggle
        label="Label text"
        helper-text="Helper text goes here"
      >Toggle value</so-toggle>

      <so-toggle
        label="Label text"
        helper-text="Helper text goes here"
        checked
      >Toggle value</so-toggle>
    </div>
  `,
};

// ── 5. Touch target (44px min height) ─────────────────────────────────────────

export const TouchTarget: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px">
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          touch=true — 44px minimum touch area
        </div>
        <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start">
          <so-toggle
            label="Label text"
            helper-text="Helper text goes here"
            touch
          >Toggle value</so-toggle>

          <so-toggle
            label="Label text"
            helper-text="Helper text goes here"
            checked
            touch
          >Toggle value</so-toggle>
        </div>
      </div>
    </div>
  `,
};

// ── 6. Theme Showcase ─────────────────────────────────────────────────────────

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;font-family:sans-serif">
      ${THEMES.map(
        theme => html`
          <div
            data-theme=${theme}
            style="
              padding: 20px;
              background: var(--soSemanticColorSurfaceDefault, #fff);
              display: flex;
              flex-direction: column;
              gap: 16px;
            "
          >
            <span style="font-size:11px;color:var(--soSemanticColorTextSubtle,#6b7280);
                         margin-bottom:4px;font-family:monospace">
              ${theme}
            </span>

            <so-toggle>Unchecked</so-toggle>
            <so-toggle checked>Checked</so-toggle>
            <so-toggle disabled>Disabled off</so-toggle>
            <so-toggle checked disabled>Disabled on</so-toggle>
            <so-toggle skeleton>Skeleton</so-toggle>
          </div>
        `,
      )}
    </div>
  `,
};
