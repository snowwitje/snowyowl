import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/textarea';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Atomic/Textarea',
  component: 'so-textarea',
  tags: ['autodocs'],
  argTypes: {
    label:       { control: 'text' },
    helperText:  { control: 'text', name: 'helper-text' },
    value:       { control: 'text' },
    placeholder: { control: 'text' },
    rows:        { control: 'number' },
    autoGrow:    { control: 'boolean', name: 'auto-grow' },
    maxRows:     { control: 'number',  name: 'max-rows' },
    disabled:    { control: 'boolean' },
    skeleton:    { control: 'boolean' },
    required:    { control: 'boolean' },
    readonly:    { control: 'boolean' },
    errorText:   { control: 'text', name: 'error-text' },
    warningText: { control: 'text', name: 'warning-text' },
    successText: { control: 'text', name: 'success-text' },
    maxlength:   { control: 'number' },
  },
  args: {
    label: 'Label',
    placeholder: 'Write here…',
    rows: 3,
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

/* ══════════════════════════════════════════════════════════════════════════
   1. Default
══════════════════════════════════════════════════════════════════════════ */

export const Default: Story = {
  render: (args) => html`
    <so-textarea
      label=${args.label || ''}
      placeholder=${args.placeholder || ''}
      rows=${args.rows ?? 3}
      ?auto-grow=${args.autoGrow}
      ?disabled=${args.disabled}
      ?skeleton=${args.skeleton}
    ></so-textarea>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. Rows — different initial heights
══════════════════════════════════════════════════════════════════════════ */

export const Rows: Story = {
  render: () => html`
    <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start">
      <div style="width:280px">
        ${sectionLabel('rows=2')}
        <so-textarea label="Label" placeholder="Two rows" rows="2"></so-textarea>
      </div>
      <div style="width:280px">
        ${sectionLabel('rows=3 (default)')}
        <so-textarea label="Label" placeholder="Three rows (default)" rows="3"></so-textarea>
      </div>
      <div style="width:280px">
        ${sectionLabel('rows=6')}
        <so-textarea label="Label" placeholder="Six rows" rows="6"></so-textarea>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   3. AutoGrow — expands as user types
══════════════════════════════════════════════════════════════════════════ */

export const AutoGrow: Story = {
  render: () => html`
    <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start">
      <div style="width:320px">
        ${sectionLabel('Fixed (default) — scrolls at rows=3')}
        <so-textarea
          label="Without auto-grow"
          placeholder="Type a lot of text and it will scroll…"
          rows="3"
        ></so-textarea>
      </div>
      <div style="width:320px">
        ${sectionLabel('auto-grow — expands indefinitely')}
        <so-textarea
          label="With auto-grow"
          placeholder="Type a lot of text and it will expand…"
          rows="3"
          auto-grow
        ></so-textarea>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   4. AutoGrow with max-rows cap
══════════════════════════════════════════════════════════════════════════ */

export const AutoGrowMaxRows: Story = {
  render: () => html`
    <div style="width:360px">
      ${sectionLabel('auto-grow + max-rows=5 — scrolls after 5 rows')}
      <so-textarea
        label="Bio"
        helper-text="Tell us about yourself"
        placeholder="Start typing…"
        rows="2"
        auto-grow
        max-rows="5"
      ></so-textarea>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   5. With helper text
══════════════════════════════════════════════════════════════════════════ */

export const WithHelperText: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;flex-wrap:wrap">
      <so-textarea
        label="Label"
        helper-text="Helper text goes here"
        placeholder="Placeholder text"
        style="width:280px"
      ></so-textarea>
      <so-textarea
        label="Label"
        helper-text="Helper text goes here"
        value="Some text that has been entered"
        style="width:280px"
      ></so-textarea>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   6. Character counter (maxlength)
══════════════════════════════════════════════════════════════════════════ */

export const WithCounter: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px">
      ${sectionLabel('maxlength=200 — counter in label row')}
      <so-textarea
        label="Description"
        helper-text="Be concise — keep it under 200 characters"
        placeholder="Write your description here…"
        maxlength="200"
        rows="4"
        style="width:400px"
      ></so-textarea>

      ${sectionLabel('auto-grow + maxlength')}
      <so-textarea
        label="Short bio"
        maxlength="300"
        rows="2"
        auto-grow
        max-rows="6"
        style="width:400px"
      ></so-textarea>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   7. Feedback states
══════════════════════════════════════════════════════════════════════════ */

export const Feedback: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px">

      <div>
        ${sectionLabel('Error')}
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-textarea
            label="Label"
            placeholder="Placeholder text"
            error-text="This field is required"
            style="width:280px"
          ></so-textarea>
          <so-textarea
            label="Label"
            value="Some text that caused an error"
            error-text="Text exceeds allowed content"
            style="width:280px"
          ></so-textarea>
        </div>
      </div>

      <div>
        ${sectionLabel('Warning')}
        <so-textarea
          label="Label"
          value="Content that is borderline"
          warning-text="This may be flagged for review"
          style="width:280px"
        ></so-textarea>
      </div>

      <div>
        ${sectionLabel('Success')}
        <so-textarea
          label="Label"
          value="Validated content"
          success-text="Looks good!"
          style="width:280px"
        ></so-textarea>
      </div>

      <div>
        ${sectionLabel('Error takes precedence when multiple are set')}
        <so-textarea
          label="Label"
          value="Some text"
          error-text="Error message goes here"
          warning-text="Warning message goes here"
          success-text="Success message goes here"
          style="width:280px"
        ></so-textarea>
      </div>

    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   8. States — disabled / readonly / skeleton
══════════════════════════════════════════════════════════════════════════ */

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px">

      <div>
        ${sectionLabel('Disabled — empty / filled')}
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-textarea label="Label" placeholder="Placeholder text" disabled style="width:280px"></so-textarea>
          <so-textarea label="Label" value="Content that cannot be changed" disabled style="width:280px"></so-textarea>
        </div>
      </div>

      <div>
        ${sectionLabel('Read-only')}
        <so-textarea
          label="Label"
          value="Read-only content — selectable but not editable"
          readonly
          rows="2"
          style="width:320px"
        ></so-textarea>
      </div>

      <div>
        ${sectionLabel('Skeleton')}
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <so-textarea label="Label" skeleton rows="3" style="width:280px"></so-textarea>
          <so-textarea skeleton rows="4" style="width:280px"></so-textarea>
        </div>
      </div>

    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   9. ThemeShowcase — all 6 themes
══════════════════════════════════════════════════════════════════════════ */

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;font-family:sans-serif">
      ${THEMES.map(
        (theme) => html`
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

            <so-textarea label="Label" placeholder="Placeholder" rows="2"></so-textarea>
            <so-textarea label="Label" value="Some entered text" rows="2"></so-textarea>
            <so-textarea label="Label" value="Error state" rows="2" error-text="Error message"></so-textarea>
            <so-textarea label="Label" value="Warning state" rows="2" warning-text="Warning message"></so-textarea>
            <so-textarea label="Label" value="Success state" rows="2" success-text="Validated"></so-textarea>
            <so-textarea label="Label" placeholder="Disabled" rows="2" disabled></so-textarea>
            <so-textarea label="Label" rows="2" skeleton></so-textarea>
          </div>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'fullscreen' },
};
