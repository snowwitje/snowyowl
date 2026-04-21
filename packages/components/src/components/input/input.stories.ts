import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/input';
// so-icon is registered globally via preview.ts → SoIcon import

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Atomic/Input',
  component: 'so-input',
  tags: ['autodocs'],
  argTypes: {
    label:       { control: 'text' },
    helperText:  { control: 'text', name: 'helper-text' },
    value:       { control: 'text' },
    placeholder: { control: 'text' },
    type:        { control: 'select', options: ['text', 'email', 'password', 'search', 'url', 'tel', 'number'] },
    size:        { control: 'radio', options: ['md', 'lg'] },
    disabled:    { control: 'boolean' },
    skeleton:    { control: 'boolean' },
    required:    { control: 'boolean' },
    readonly:    { control: 'boolean' },
    errorText:   { control: 'text', name: 'error-text' },
    warningText: { control: 'text', name: 'warning-text' },
    successText: { control: 'text', name: 'success-text' },
    maxlength:   { control: 'number' },
  },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const sectionLabel = (text: string) => html`
  <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
              color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
    ${text}
  </div>
`;

// ── 1. Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { label: 'Label', placeholder: 'Placeholder text' },
  render: args => html`
    <so-input
      label=${args.label || ''}
      placeholder=${args.placeholder || ''}
      ?disabled=${args.disabled}
      ?skeleton=${args.skeleton}
      size=${args.size || 'md'}
    ></so-input>
  `,
};

// ── 2. Sizes ──────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-end">
      <div>
        ${sectionLabel('md — 40px')}
        <so-input label="Label" placeholder="Placeholder text" size="md" style="width:240px"></so-input>
      </div>
      <div>
        ${sectionLabel('lg — 48px')}
        <so-input label="Label" placeholder="Placeholder text" size="lg" style="width:240px"></so-input>
      </div>
    </div>
  `,
};

// ── 3. States ─────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px">

      <div>
        ${sectionLabel('Default — empty / filled')}
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-input label="Label" placeholder="Placeholder text" style="width:240px"></so-input>
          <so-input label="Label" value="Input text" style="width:240px"></so-input>
        </div>
      </div>

      <div>
        ${sectionLabel('Disabled — empty / filled')}
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-input label="Label" placeholder="Placeholder text" disabled style="width:240px"></so-input>
          <so-input label="Label" value="Input text" disabled style="width:240px"></so-input>
        </div>
      </div>

      <div>
        ${sectionLabel('Readonly')}
        <so-input label="Label" value="Read-only value" readonly style="width:240px"></so-input>
      </div>

    </div>
  `,
};

// ── 4. Feedback — Error / Warning / Success ────────────────────────────────────

export const Feedback: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px">

      <div>
        ${sectionLabel('Error')}
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-input
            label="Label"
            placeholder="Placeholder text"
            error-text="Error message goes here"
            style="width:240px"
          ></so-input>
          <so-input
            label="Label"
            value="Input text"
            error-text="Error message goes here"
            style="width:240px"
          ></so-input>
        </div>
      </div>

      <div>
        ${sectionLabel('Warning')}
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-input
            label="Label"
            placeholder="Placeholder text"
            warning-text="Warning message goes here"
            style="width:240px"
          ></so-input>
          <so-input
            label="Label"
            value="Input text"
            warning-text="Warning message goes here"
            style="width:240px"
          ></so-input>
        </div>
      </div>

      <div>
        ${sectionLabel('Success / Validated')}
        <so-input
          label="Label"
          value="Input text"
          success-text="Validation message goes here"
          style="width:240px"
        ></so-input>
      </div>

      <div>
        ${sectionLabel('Error takes precedence when multiple are set')}
        <so-input
          label="Label"
          value="Input text"
          error-text="Error message goes here"
          warning-text="Warning message goes here"
          success-text="Success message goes here"
          style="width:240px"
        ></so-input>
      </div>

    </div>
  `,
};

// ── 5. With helper text ───────────────────────────────────────────────────────

export const WithHelperText: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;flex-wrap:wrap">
      <so-input
        label="Label"
        helper-text="Helper text goes here"
        placeholder="Placeholder text"
        style="width:240px"
      ></so-input>

      <so-input
        label="Label"
        helper-text="Helper text goes here"
        value="Input text"
        style="width:240px"
      ></so-input>

      <so-input
        label="Label"
        helper-text="Helper text goes here"
        value="Input text"
        error-text="Error message goes here"
        style="width:240px"
      ></so-input>
    </div>
  `,
};

// ── 6. With icons (prefix / suffix) ──────────────────────────────────────────

export const WithIcons: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px">

      <div>
        ${sectionLabel('Prefix — search icon')}
        <so-input label="Search" placeholder="Search…" style="width:280px">
          <so-icon slot="prefix" name="search" size="sm" decorative></so-icon>
        </so-input>
      </div>

      <div>
        ${sectionLabel('Password — automatic eye toggle')}
        <so-input
          label="Password"
          type="password"
          value="hftyr677%rsdfg"
          helper-text="password requirements go here"
          success-text="Validation message goes here"
          style="width:280px"
        ></so-input>
      </div>

    </div>
  `,
};

// ── 7. With character counter ─────────────────────────────────────────────────

export const WithCounter: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px">
      ${sectionLabel('maxlength set — shows 0/100 counter')}
      <so-input
        label="Example with counter"
        helper-text="Helper text goes here"
        maxlength="100"
        style="width:320px"
      ></so-input>
    </div>
  `,
};

// ── 8. Skeleton ───────────────────────────────────────────────────────────────

export const Skeleton: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px">
      ${sectionLabel('Skeleton loading state')}
      <div style="display:flex;gap:24px;flex-wrap:wrap">
        <so-input label="Label" skeleton style="width:240px"></so-input>
        <so-input skeleton style="width:240px"></so-input>
      </div>
    </div>
  `,
};

// ── 9. Theme Showcase ─────────────────────────────────────────────────────────

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

            <so-input label="Label" placeholder="Placeholder"></so-input>
            <so-input label="Label" value="Input text"></so-input>
            <so-input label="Label" value="Error state" error-text="Error message"></so-input>
            <so-input label="Label" value="Warning state" warning-text="Warning message"></so-input>
            <so-input label="Label" value="Success state" success-text="Validation message"></so-input>
            <so-input label="Label" placeholder="Disabled" disabled></so-input>
            <so-input label="Label" skeleton></so-input>
          </div>
        `,
      )}
    </div>
  `,
};
