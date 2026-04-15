import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/checkbox';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Atomic/Checkbox',
  component: 'so-checkbox',
  tags: ['autodocs'],
  argTypes: {
    label:       { control: 'text' },
    helperText:  { control: 'text', name: 'helper-text' },
    checked:     { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled:    { control: 'boolean' },
    skeleton:    { control: 'boolean' },
    touch:       { control: 'boolean' },
    errorText:   { control: 'text', name: 'error-text' },
    warningText: { control: 'text', name: 'warning-text' },
    name:        { control: 'text' },
    value:       { control: 'text' },
  },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

// ── 1. Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { checked: false, disabled: false, skeleton: false },
  render: args => html`
    <so-checkbox
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?skeleton=${args.skeleton}
    >Checkbox value</so-checkbox>
  `,
};

// ── 2. States ─────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px">

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Check states
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-checkbox label="Label">Checkbox value</so-checkbox>
          <so-checkbox label="Label" checked>Checkbox value</so-checkbox>
          <so-checkbox label="Label" indeterminate>Checkbox value</so-checkbox>
        </div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Disabled
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-checkbox label="Label" disabled>Checkbox value</so-checkbox>
          <so-checkbox label="Label" checked disabled>Checkbox value</so-checkbox>
          <so-checkbox label="Label" indeterminate disabled>Checkbox value</so-checkbox>
        </div>
      </div>

    </div>
  `,
};

// ── 3. Feedback — Error & Warning ─────────────────────────────────────────────

export const Feedback: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px">

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Error
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-checkbox
            label="Label"
            error-text="Error message goes here"
          >Checkbox value</so-checkbox>
          <so-checkbox
            label="Label"
            checked
            error-text="Error message goes here"
          >Checkbox value</so-checkbox>
        </div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Warning
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-checkbox
            label="Label"
            warning-text="Warning message goes here"
          >Checkbox value</so-checkbox>
          <so-checkbox
            label="Label"
            checked
            warning-text="Warning message goes here"
          >Checkbox value</so-checkbox>
        </div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Error takes precedence when both are set
        </div>
        <so-checkbox
          label="Label"
          error-text="Error message goes here"
          warning-text="Warning message goes here"
        >Checkbox value</so-checkbox>
      </div>

    </div>
  `,
};

// ── 4. Skeleton ───────────────────────────────────────────────────────────────

export const Skeleton: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px">
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Skeleton loading state
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-checkbox label="Label" skeleton>Checkbox value</so-checkbox>
          <so-checkbox label="Label" skeleton>Checkbox value</so-checkbox>
          <so-checkbox label="Label" skeleton>Checkbox value</so-checkbox>
        </div>
      </div>
      <div style="display:flex;gap:24px;flex-wrap:wrap">
        <so-checkbox skeleton>Checkbox value</so-checkbox>
        <so-checkbox skeleton>Checkbox value</so-checkbox>
        <so-checkbox skeleton>Checkbox value</so-checkbox>
      </div>
    </div>
  `,
};

// ── 5. With label and helper text ─────────────────────────────────────────────

export const WithHelperText: Story = {
  render: () => html`
    <div style="display:flex;gap:32px;flex-wrap:wrap">
      <so-checkbox
        label="Label"
        helper-text="Helper text goes here"
      >Checkbox value</so-checkbox>

      <so-checkbox
        label="Label"
        helper-text="Helper text goes here"
        checked
      >Checkbox value</so-checkbox>

      <so-checkbox
        label="Label"
        helper-text="Helper text goes here"
        error-text="Error message goes here"
      >Checkbox value</so-checkbox>
    </div>
  `,
};

// ── 6. Touch target (44px min height) ─────────────────────────────────────────

export const TouchTarget: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px">

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          touch=true — 44px minimum touch area
        </div>
        <div style="display:flex;gap:32px;flex-wrap:wrap">
          <so-checkbox
            label="Label"
            helper-text="Helper text goes here"
            touch
          >Checkbox value</so-checkbox>

          <so-checkbox
            label="Label"
            helper-text="Helper text goes here"
            checked
            touch
          >Checkbox value</so-checkbox>

          <so-checkbox
            label="Label"
            helper-text="Helper text goes here"
            touch
            error-text="Error message goes here"
          >Checkbox value</so-checkbox>
        </div>
      </div>

    </div>
  `,
};

// ── 7. Theme Showcase ─────────────────────────────────────────────────────────

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
              gap: 10px;
            "
          >
            <span style="font-size:11px;color:var(--soSemanticColorTextSubtle,#6b7280);
                         margin-bottom:4px;font-family:monospace">
              ${theme}
            </span>

            <so-checkbox label="Label">Unchecked</so-checkbox>
            <so-checkbox label="Label" checked>Checked</so-checkbox>
            <so-checkbox label="Label" indeterminate>Indeterminate</so-checkbox>
            <so-checkbox label="Label" disabled>Disabled</so-checkbox>
            <so-checkbox label="Label" checked disabled>Checked disabled</so-checkbox>
            <so-checkbox
              label="Label"
              error-text="Error message"
            >Error state</so-checkbox>
            <so-checkbox
              label="Label"
              warning-text="Warning message"
            >Warning state</so-checkbox>
            <so-checkbox skeleton>Skeleton</so-checkbox>
          </div>
        `,
      )}
    </div>
  `,
};
