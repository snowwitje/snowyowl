import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/form';
import '@snowyowl/components/components/input';
import '@snowyowl/components/components/select';
import '@snowyowl/components/components/toggle';
import '@snowyowl/components/components/checkbox-group';
import '@snowyowl/components/components/checkbox';
import '@snowyowl/components/components/button';
import '@snowyowl/components/components/divider';
import '@snowyowl/components/components/textarea';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Composite/Form',
  component: 'so-form',
  tags: ['autodocs'],
  argTypes: {
    title:       { control: 'text' },
    description: { control: 'text' },
    gap:         { control: 'text' },
    loading:     { control: 'boolean' },
    disabled:    { control: 'boolean' },
    novalidate:  { control: 'boolean' },
    titleLevel:  { control: 'select', options: ['h1', 'h2', 'h3', 'h4'], name: 'title-level' },
  },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

// ── 1. Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => html`
    <so-form
      title="Form Example"
      description="Update your notification preferences."
      title-level="h2"
      style="max-width: 480px"
    >
      <so-input label="First Name" value="Alissa"></so-input>
      <so-input label="Last Name" value="Snowy"></so-input>
      <so-select label="State" .value=${'indiana'}>
        <so-option value="indiana">Indiana</so-option>
        <so-option value="california">California</so-option>
        <so-option value="new-york">New York</so-option>
        <so-option value="texas">Texas</so-option>
        <so-option value="florida">Florida</so-option>
      </so-select>
      <so-toggle label="Receive notifications" checked></so-toggle>
      <so-checkbox-group
        label="Notification Delivery"
        helper-text="Select all that apply"
        orientation="horizontal"
        .value=${['email', 'text']}
      >
        <so-checkbox value="email">Email</so-checkbox>
        <so-checkbox value="text">Text</so-checkbox>
        <so-checkbox value="mail">Mail</so-checkbox>
      </so-checkbox-group>
      <so-button slot="footer" variant="outline">Cancel</so-button>
      <so-button slot="footer" variant="primary">Save</so-button>
    </so-form>
  `,
};

// ── 2. NoHeader ───────────────────────────────────────────────────────────────

export const NoHeader: Story = {
  render: () => html`
    <so-form style="max-width: 480px">
      <so-input label="First Name"></so-input>
      <so-input label="Last Name"></so-input>
      <so-input label="Email" type="email"></so-input>
      <so-button slot="footer" variant="outline">Cancel</so-button>
      <so-button slot="footer" variant="primary">Submit</so-button>
    </so-form>
  `,
};

// ── 3. Loading ────────────────────────────────────────────────────────────────

export const Loading: Story = {
  render: () => html`
    <so-form
      title="Saving Changes"
      description="Please wait while your changes are saved."
      loading
      style="max-width: 480px"
    >
      <so-input label="First Name" value="Alissa"></so-input>
      <so-input label="Last Name" value="Snowy"></so-input>
      <so-select label="State" .value=${'indiana'}>
        <so-option value="indiana">Indiana</so-option>
        <so-option value="california">California</so-option>
      </so-select>
      <so-button slot="footer" variant="outline">Cancel</so-button>
      <so-button slot="footer" variant="primary">Save</so-button>
    </so-form>
  `,
};

// ── 4. Disabled ───────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => html`
    <so-form
      title="Account Details"
      description="Contact support to update these fields."
      disabled
      style="max-width: 480px"
    >
      <so-input label="First Name" value="Alissa"></so-input>
      <so-input label="Last Name" value="Snowy"></so-input>
      <so-toggle label="Receive notifications" checked></so-toggle>
      <so-button slot="footer" variant="outline">Cancel</so-button>
      <so-button slot="footer" variant="primary">Save</so-button>
    </so-form>
  `,
};

// ── 5. WithDivider ────────────────────────────────────────────────────────────

export const WithDivider: Story = {
  render: () => html`
    <so-form
      title="Notification Preferences"
      style="max-width: 480px"
    >
      <so-input label="First Name" value="Alissa"></so-input>
      <so-input label="Last Name" value="Snowy"></so-input>
      <so-toggle label="Receive notifications" checked></so-toggle>
      <so-divider></so-divider>
      <so-button slot="footer" variant="outline">Cancel</so-button>
      <so-button slot="footer" variant="primary">Save</so-button>
    </so-form>
  `,
};

// ── 6. ThemeShowcase ──────────────────────────────────────────────────────────

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;font-family:sans-serif">
      ${THEMES.map(
        theme => html`
          <div
            data-theme=${theme}
            style="
              padding: 24px;
              background: var(--soSemanticColorSurfaceDefault, #fff);
            "
          >
            <span style="font-size:11px;color:var(--soSemanticColorTextSubtle,#6b7280);
                         font-family:monospace;display:block;margin-bottom:16px">${theme}</span>

            <so-form title="Example Form" description="Update your preferences.">
              <so-input label="Name" value="Alissa Snowy"></so-input>
              <so-toggle label="Notifications" checked></so-toggle>
              <so-checkbox-group label="Delivery" orientation="horizontal" .value=${['email']}>
                <so-checkbox value="email">Email</so-checkbox>
                <so-checkbox value="sms">SMS</so-checkbox>
              </so-checkbox-group>
              <so-button slot="footer" variant="outline">Cancel</so-button>
              <so-button slot="footer" variant="primary">Save</so-button>
            </so-form>
          </div>
        `,
      )}
    </div>
  `,
};
