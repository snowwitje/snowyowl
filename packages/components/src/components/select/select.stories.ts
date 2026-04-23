import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/select';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Atomic/Select',
  component: 'so-select',
  tags: ['autodocs'],
  argTypes: {
    label:       { control: 'text' },
    helperText:  { control: 'text', name: 'helper-text' },
    placeholder: { control: 'text' },
    size:        { control: 'radio', options: ['md', 'lg'] },
    multiple:    { control: 'boolean' },
    searchable:  { control: 'boolean' },
    disabled:    { control: 'boolean' },
    skeleton:    { control: 'boolean' },
    touch:       { control: 'boolean' },
    errorText:   { control: 'text', name: 'error-text' },
    warningText: { control: 'text', name: 'warning-text' },
  },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

/* ── Helpers ────────────────────────────────────────────────────────────────── */

const sectionLabel = (text: string) => html`
  <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
              color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">
    ${text}
  </div>
`;

/* ── 1. Default (single, empty) ──────────────────────────────────────────── */

export const Default: Story = {
  args: { label: 'Label', placeholder: 'Select' },
  render: args => html`
    <so-select
      label=${args.label || ''}
      placeholder=${args.placeholder || 'Select'}
      ?disabled=${args.disabled}
      ?skeleton=${args.skeleton}
      size=${args.size || 'md'}
      style="width: 240px"
    >
      <so-option value="design">Design</so-option>
      <so-option value="development">Development</so-option>
      <so-option value="research">Research</so-option>
      <so-option value="marketing">Marketing</so-option>
      <so-option value="product">Product</so-option>
      <so-option value="engineering">Engineering</so-option>
    </so-select>
  `,
};

/* ── 2. With value (single, pre-selected) ────────────────────────────────── */

export const WithValue: Story = {
  render: () => html`
    <so-select label="Label" .value=${'development'} style="width: 240px">
      <so-option value="design">Design</so-option>
      <so-option value="development">Development</so-option>
      <so-option value="research">Research</so-option>
      <so-option value="marketing">Marketing</so-option>
      <so-option value="product">Product</so-option>
      <so-option value="engineering">Engineering</so-option>
    </so-select>
  `,
};

/* ── 3. Multi-select (2 pre-selected) ───────────────────────────────────── */

export const MultiSelect: Story = {
  render: () => html`
    <so-select label="Tags" multiple .value=${['design', 'research']} style="width: 280px">
      <so-option value="design">Design</so-option>
      <so-option value="development">Development</so-option>
      <so-option value="research">Research</so-option>
      <so-option value="marketing">Marketing</so-option>
      <so-option value="product">Product</so-option>
      <so-option value="engineering">Engineering</so-option>
    </so-select>
  `,
};

/* ── 4. Searchable (single with search) ─────────────────────────────────── */

export const Searchable: Story = {
  render: () => html`
    <so-select label="Label" searchable style="width: 280px">
      <so-option value="design">Design</so-option>
      <so-option value="development">Development</so-option>
      <so-option value="research">Research</so-option>
      <so-option value="marketing">Marketing</so-option>
      <so-option value="product">Product</so-option>
      <so-option value="engineering">Engineering</so-option>
    </so-select>
  `,
};

/* ── 5. Searchable multi ─────────────────────────────────────────────────── */

export const SearchableMulti: Story = {
  render: () => html`
    <so-select label="Label" multiple .value=${['design', 'product']} style="width: 280px">
      <so-option value="design">Design</so-option>
      <so-option value="development">Development</so-option>
      <so-option value="research">Research</so-option>
      <so-option value="marketing">Marketing</so-option>
      <so-option value="product">Product</so-option>
      <so-option value="engineering">Engineering</so-option>
    </so-select>
  `,
};

/* ── 6. States ───────────────────────────────────────────────────────────── */

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px">

      <div>
        ${sectionLabel('Default — empty / with value')}
        <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">
          <so-select label="Label" style="width:240px">
            <so-option value="a">Option A</so-option>
            <so-option value="b">Option B</so-option>
            <so-option value="c">Option C</so-option>
          </so-select>
          <so-select label="Label" .value=${'b'} style="width:240px">
            <so-option value="a">Option A</so-option>
            <so-option value="b">Option B</so-option>
            <so-option value="c">Option C</so-option>
          </so-select>
        </div>
      </div>

      <div>
        ${sectionLabel('Disabled — empty / with value')}
        <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">
          <so-select label="Label" disabled style="width:240px">
            <so-option value="a">Option A</so-option>
          </so-select>
          <so-select label="Label" disabled .value=${'a'} style="width:240px">
            <so-option value="a">Option A</so-option>
            <so-option value="b">Option B</so-option>
          </so-select>
        </div>
      </div>

      <div>
        ${sectionLabel('Error')}
        <so-select label="Label" error-text="Error message goes here" style="width:240px">
          <so-option value="a">Option A</so-option>
          <so-option value="b">Option B</so-option>
        </so-select>
      </div>

      <div>
        ${sectionLabel('Warning')}
        <so-select label="Label" warning-text="Warning message goes here" style="width:240px">
          <so-option value="a">Option A</so-option>
          <so-option value="b">Option B</so-option>
        </so-select>
      </div>

    </div>
  `,
};

/* ── 7. Feedback messages ────────────────────────────────────────────────── */

export const Feedback: Story = {
  render: () => html`
    <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start">
      <div>
        ${sectionLabel('Error')}
        <so-select label="Label" error-text="Error message goes here" style="width:240px">
          <so-option value="a">Option A</so-option>
          <so-option value="b">Option B</so-option>
        </so-select>
      </div>

      <div>
        ${sectionLabel('Warning')}
        <so-select label="Label" warning-text="Warning message goes here" style="width:240px">
          <so-option value="a">Option A</so-option>
          <so-option value="b">Option B</so-option>
        </so-select>
      </div>
    </div>
  `,
};

/* ── 8. With helper text ─────────────────────────────────────────────────── */

export const WithHelperText: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">
      <so-select label="Label" helper-text="Helper text goes here" style="width:240px">
        <so-option value="a">Option A</so-option>
        <so-option value="b">Option B</so-option>
        <so-option value="c">Option C</so-option>
      </so-select>

      <so-select
        label="Label"
        helper-text="Helper text goes here"
        error-text="Error message goes here"
        style="width:240px"
      >
        <so-option value="a">Option A</so-option>
        <so-option value="b">Option B</so-option>
      </so-select>
    </div>
  `,
};

/* ── 9. Skeleton ─────────────────────────────────────────────────────────── */

export const Skeleton: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">
      ${sectionLabel('Skeleton loading state')}
      <so-select label="Label" skeleton style="width:240px"></so-select>
      <so-select skeleton style="width:240px"></so-select>
    </div>
  `,
};

/* ── 10. Touch target ────────────────────────────────────────────────────── */

export const TouchTarget: Story = {
  render: () => html`
    <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start">
      <div>
        ${sectionLabel('Standard — 40px items')}
        <so-select label="Label" style="width:240px">
          <so-option value="a">Option A</so-option>
          <so-option value="b">Option B</so-option>
          <so-option value="c">Option C</so-option>
        </so-select>
      </div>

      <div>
        ${sectionLabel('Touch — 48px items')}
        <so-select label="Label" touch style="width:240px">
          <so-option value="a">Option A</so-option>
          <so-option value="b">Option B</so-option>
          <so-option value="c">Option C</so-option>
        </so-select>
      </div>

      <div>
        ${sectionLabel('lg trigger + touch items')}
        <so-select label="Label" size="lg" touch style="width:240px">
          <so-option value="a">Option A</so-option>
          <so-option value="b">Option B</so-option>
          <so-option value="c">Option C</so-option>
        </so-select>
      </div>
    </div>
  `,
};

/* ── 11. Theme showcase ──────────────────────────────────────────────────── */

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
              gap: 20px;
            "
          >
            <span style="font-size:11px;color:var(--soSemanticColorTextSubtle,#6b7280);
                         margin-bottom:4px;font-family:monospace">
              ${theme}
            </span>

            <so-select label="Empty">
              <so-option value="a">Option A</so-option>
              <so-option value="b">Option B</so-option>
              <so-option value="c">Option C</so-option>
            </so-select>

            <so-select label="With value" .value=${'b'}>
              <so-option value="a">Option A</so-option>
              <so-option value="b">Option B</so-option>
              <so-option value="c">Option C</so-option>
            </so-select>

            <so-select label="Multi — 2 selected" multiple .value=${['a', 'c']}>
              <so-option value="a">Option A</so-option>
              <so-option value="b">Option B</so-option>
              <so-option value="c">Option C</so-option>
            </so-select>

            <so-select label="Error" error-text="Something went wrong">
              <so-option value="a">Option A</so-option>
            </so-select>

            <so-select label="Warning" warning-text="Double-check this">
              <so-option value="a">Option A</so-option>
            </so-select>

            <so-select label="Disabled" disabled>
              <so-option value="a">Option A</so-option>
            </so-select>

            <so-select label="Skeleton" skeleton></so-select>
          </div>
        `,
      )}
    </div>
  `,
};
