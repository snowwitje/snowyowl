import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/checkbox-group';
import '@snowyowl/components/components/checkbox';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Atomic/Checkbox/Group',
  component: 'so-checkbox-group',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const sectionLabel = (text: string) => html`
  <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
              color:var(--soSemanticColorTextSubtle,#6b7280);margin-bottom:12px">${text}</div>
`;

// ── 1. Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => html`
    <so-checkbox-group
      label="Notification Delivery"
      name="delivery"
      .value=${['email', 'text']}
    >
      <so-checkbox value="email">Email</so-checkbox>
      <so-checkbox value="text">Text</so-checkbox>
      <so-checkbox value="mail">Mail</so-checkbox>
    </so-checkbox-group>
  `,
};

// ── 2. Horizontal ─────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  render: () => html`
    <so-checkbox-group
      label="Preferred formats"
      name="formats"
      orientation="horizontal"
    >
      <so-checkbox value="pdf">PDF</so-checkbox>
      <so-checkbox value="docx">DOCX</so-checkbox>
      <so-checkbox value="csv">CSV</so-checkbox>
    </so-checkbox-group>
  `,
};

// ── 3. WithHelperText ─────────────────────────────────────────────────────────

export const WithHelperText: Story = {
  render: () => html`
    <so-checkbox-group
      label="Notification Delivery"
      helper-text="Select all that apply"
      name="delivery"
      .value=${['email']}
    >
      <so-checkbox value="email">Email</so-checkbox>
      <so-checkbox value="text">Text message</so-checkbox>
      <so-checkbox value="push">Push notification</so-checkbox>
    </so-checkbox-group>
  `,
};

// ── 4. WithSelectAll ──────────────────────────────────────────────────────────

export const WithSelectAll: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px">
      ${sectionLabel('Partial selection — master shows indeterminate')}
      <so-checkbox-group
        label="Permissions"
        name="perms"
        select-all
        .value=${['read', 'write']}
      >
        <so-checkbox value="read">Read</so-checkbox>
        <so-checkbox value="write">Write</so-checkbox>
        <so-checkbox value="delete">Delete</so-checkbox>
        <so-checkbox value="admin">Admin</so-checkbox>
      </so-checkbox-group>

      ${sectionLabel('All selected — master shows checked')}
      <so-checkbox-group
        label="Features"
        name="features"
        select-all
        .value=${['a', 'b', 'c']}
      >
        <so-checkbox value="a">Feature A</so-checkbox>
        <so-checkbox value="b">Feature B</so-checkbox>
        <so-checkbox value="c">Feature C</so-checkbox>
      </so-checkbox-group>

      ${sectionLabel('None selected — master shows unchecked')}
      <so-checkbox-group
        label="Interests"
        name="interests"
        select-all
      >
        <so-checkbox value="design">Design</so-checkbox>
        <so-checkbox value="eng">Engineering</so-checkbox>
        <so-checkbox value="product">Product</so-checkbox>
      </so-checkbox-group>
    </div>
  `,
};

// ── 5. Required ───────────────────────────────────────────────────────────────

export const Required: Story = {
  render: () => {
    const onSubmit = (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const group = form.querySelector('so-checkbox-group') as any;
      if (!group) return;
      const valid = group.reportValidity();
      if (valid) alert('Form submitted! Values: ' + JSON.stringify(group.value));
    };

    return html`
      <form @submit=${onSubmit} style="display:flex;flex-direction:column;gap:16px;max-width:320px">
        <so-checkbox-group
          label="Agree to terms"
          helper-text="You must accept before proceeding"
          name="terms"
          required
        >
          <so-checkbox value="tos">Terms of Service</so-checkbox>
          <so-checkbox value="privacy">Privacy Policy</so-checkbox>
        </so-checkbox-group>
        <button type="submit" style="padding:8px 16px;align-self:flex-start">Submit</button>
      </form>
      <p style="font-size:12px;color:var(--soSemanticColorTextSubtle);margin-top:8px">
        Click Submit without selecting any option to trigger validation.
      </p>
    `;
  },
};

// ── 6. MinMax ─────────────────────────────────────────────────────────────────

export const MinMax: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px">
      ${sectionLabel('min=1, max=2 — select 1 or 2 items')}
      <so-checkbox-group
        label="Select topics (1–2)"
        helper-text="Choose at least 1 and no more than 2"
        name="topics"
        .min=${1}
        .max=${2}
      >
        <so-checkbox value="react">React</so-checkbox>
        <so-checkbox value="vue">Vue</so-checkbox>
        <so-checkbox value="svelte">Svelte</so-checkbox>
        <so-checkbox value="solid">Solid</so-checkbox>
      </so-checkbox-group>
    </div>
  `,
};

// ── 7. ErrorState ─────────────────────────────────────────────────────────────

export const ErrorState: Story = {
  render: () => html`
    <so-checkbox-group
      label="Delivery methods"
      name="delivery"
      error-text="At least one delivery method is required"
    >
      <so-checkbox value="email">Email</so-checkbox>
      <so-checkbox value="sms">SMS</so-checkbox>
      <so-checkbox value="post">Post</so-checkbox>
    </so-checkbox-group>
  `,
};

// ── 8. WarningState ───────────────────────────────────────────────────────────

export const WarningState: Story = {
  render: () => html`
    <so-checkbox-group
      label="Notification channels"
      name="channels"
      warning-text="Selecting too many channels may result in duplicate alerts"
      .value=${['email', 'sms', 'push']}
    >
      <so-checkbox value="email">Email</so-checkbox>
      <so-checkbox value="sms">SMS</so-checkbox>
      <so-checkbox value="push">Push</so-checkbox>
    </so-checkbox-group>
  `,
};

// ── 9. Disabled ───────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => html`
    <so-checkbox-group
      label="Locked settings"
      name="settings"
      disabled
      .value=${['dark-mode']}
    >
      <so-checkbox value="dark-mode">Dark mode</so-checkbox>
      <so-checkbox value="notifications">Notifications</so-checkbox>
      <so-checkbox value="analytics">Analytics</so-checkbox>
    </so-checkbox-group>
  `,
};

// ── 10. Touch ─────────────────────────────────────────────────────────────────

export const Touch: Story = {
  render: () => html`
    <so-checkbox-group
      label="Mobile options"
      helper-text="44px touch targets enabled"
      name="mobile"
      touch
    >
      <so-checkbox value="sync">Background sync</so-checkbox>
      <so-checkbox value="location">Location access</so-checkbox>
      <so-checkbox value="camera">Camera access</so-checkbox>
    </so-checkbox-group>
  `,
};

// ── 11. ThemeShowcase ─────────────────────────────────────────────────────────

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
              gap: 24px;
            "
          >
            <span style="font-size:11px;color:var(--soSemanticColorTextSubtle,#6b7280);
                         font-family:monospace">${theme}</span>

            <so-checkbox-group
              label="Default"
              name="default-${theme}"
              .value=${['opt1']}
            >
              <so-checkbox value="opt1">Option 1</so-checkbox>
              <so-checkbox value="opt2">Option 2</so-checkbox>
            </so-checkbox-group>

            <so-checkbox-group
              label="With error"
              name="error-${theme}"
              error-text="Please select at least one"
            >
              <so-checkbox value="a">Option A</so-checkbox>
              <so-checkbox value="b">Option B</so-checkbox>
            </so-checkbox-group>

            <so-checkbox-group
              label="Disabled"
              name="disabled-${theme}"
              disabled
              .value=${['x']}
            >
              <so-checkbox value="x">Option X</so-checkbox>
              <so-checkbox value="y">Option Y</so-checkbox>
            </so-checkbox-group>

            <so-checkbox-group
              label="Select all"
              name="selectall-${theme}"
              select-all
              .value=${['p']}
            >
              <so-checkbox value="p">Option P</so-checkbox>
              <so-checkbox value="q">Option Q</so-checkbox>
              <so-checkbox value="r">Option R</so-checkbox>
            </so-checkbox-group>
          </div>
        `,
      )}
    </div>
  `,
};
