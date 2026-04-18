import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/radio';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Atomic/Radio',
  component: 'so-radio',
  tags: ['autodocs'],
  argTypes: {
    label:       { control: 'text' },
    helperText:  { control: 'text', name: 'helper-text' },
    checked:     { control: 'boolean' },
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
    <so-radio
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?skeleton=${args.skeleton}
    >Radio value</so-radio>
  `,
};

// ── 2. States ─────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px">

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Default — unchecked / checked
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-radio label="Label">Radio value</so-radio>
          <so-radio label="Label" checked>Radio value</so-radio>
        </div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Hover — unchecked / checked
          <span style="font-weight:300;text-transform:none;font-size:11px">
            (mouse over to see halo)
          </span>
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-radio label="Label">Radio value</so-radio>
          <so-radio label="Label" checked>Radio value</so-radio>
        </div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Error — unchecked / checked
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-radio label="Label" error-text="This field is required">Radio value</so-radio>
          <so-radio label="Label" checked error-text="This field is required">Radio value</so-radio>
        </div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Warning — unchecked / checked
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-radio label="Label" warning-text="Check your selection">Radio value</so-radio>
          <so-radio label="Label" checked warning-text="Check your selection">Radio value</so-radio>
        </div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Disabled — unchecked / checked
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-radio label="Label" disabled>Radio value</so-radio>
          <so-radio label="Label" checked disabled>Radio value</so-radio>
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
          <so-radio
            label="Label"
            error-text="Error message goes here"
          >Radio value</so-radio>
          <so-radio
            label="Label"
            checked
            error-text="Error message goes here"
          >Radio value</so-radio>
        </div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Warning
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-radio
            label="Label"
            warning-text="Warning message goes here"
          >Radio value</so-radio>
          <so-radio
            label="Label"
            checked
            warning-text="Warning message goes here"
          >Radio value</so-radio>
        </div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
          Error takes precedence when both are set
        </div>
        <so-radio
          label="Label"
          error-text="Error message goes here"
          warning-text="Warning message goes here"
        >Radio value</so-radio>
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
          <so-radio label="Label" skeleton>Radio value</so-radio>
          <so-radio label="Label" skeleton>Radio value</so-radio>
          <so-radio label="Label" skeleton>Radio value</so-radio>
        </div>
      </div>
      <div style="display:flex;gap:24px;flex-wrap:wrap">
        <so-radio skeleton>Radio value</so-radio>
        <so-radio skeleton>Radio value</so-radio>
        <so-radio skeleton>Radio value</so-radio>
      </div>
    </div>
  `,
};

// ── 5. With label and helper text ─────────────────────────────────────────────

export const WithHelperText: Story = {
  render: () => html`
    <div style="display:flex;gap:32px;flex-wrap:wrap">
      <so-radio
        label="Label"
        helper-text="Helper text goes here"
      >Radio value</so-radio>

      <so-radio
        label="Label"
        helper-text="Helper text goes here"
        checked
      >Radio value</so-radio>

      <so-radio
        label="Label"
        helper-text="Helper text goes here"
        error-text="Error message goes here"
      >Radio value</so-radio>
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
          <so-radio
            label="Label"
            helper-text="Helper text goes here"
            touch
          >Radio value</so-radio>

          <so-radio
            label="Label"
            helper-text="Helper text goes here"
            checked
            touch
          >Radio value</so-radio>

          <so-radio
            label="Label"
            helper-text="Helper text goes here"
            touch
            error-text="Error message goes here"
          >Radio value</so-radio>
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

            <so-radio label="Label">Unchecked</so-radio>
            <so-radio label="Label" checked>Checked</so-radio>
            <so-radio label="Label" disabled>Disabled</so-radio>
            <so-radio label="Label" checked disabled>Checked disabled</so-radio>
            <so-radio
              label="Label"
              error-text="Error message"
            >Error state</so-radio>
            <so-radio
              label="Label"
              warning-text="Warning message"
            >Warning state</so-radio>
            <so-radio skeleton>Skeleton</so-radio>
          </div>
        `,
      )}
    </div>
  `,
};
