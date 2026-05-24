import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/radio-group';
import '@snowyowl/components/components/radio';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Atomic/RadioGroup',
  component: 'so-radio-group',
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
    <so-radio-group
      label="Preferred contact"
      name="contact"
      .value=${'email'}
    >
      <so-radio value="email">Email</so-radio>
      <so-radio value="phone">Phone</so-radio>
      <so-radio value="mail">Mail</so-radio>
    </so-radio-group>
  `,
};

// ── 2. Horizontal ─────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  render: () => html`
    <so-radio-group
      label="Plan size"
      name="plan"
      orientation="horizontal"
      .value=${'medium'}
    >
      <so-radio value="small">Small</so-radio>
      <so-radio value="medium">Medium</so-radio>
      <so-radio value="large">Large</so-radio>
    </so-radio-group>
  `,
};

// ── 3. WithHelperText ─────────────────────────────────────────────────────────

export const WithHelperText: Story = {
  render: () => html`
    <so-radio-group
      label="Notification frequency"
      helper-text="Choose how often you'd like to receive updates"
      name="frequency"
      .value=${'weekly'}
    >
      <so-radio value="realtime">Real-time</so-radio>
      <so-radio value="daily">Daily digest</so-radio>
      <so-radio value="weekly">Weekly summary</so-radio>
    </so-radio-group>
  `,
};

// ── 4. Required ───────────────────────────────────────────────────────────────

export const Required: Story = {
  render: () => {
    const onSubmit = (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const group = form.querySelector('so-radio-group') as any;
      if (!group) return;
      const valid = group.reportValidity();
      if (valid) alert('Form submitted! Value: ' + group.value);
    };

    return html`
      <form @submit=${onSubmit} style="display:flex;flex-direction:column;gap:16px;max-width:320px">
        <so-radio-group
          label="Billing cycle"
          helper-text="You must choose a billing cycle"
          name="billing"
          required
        >
          <so-radio value="monthly">Monthly</so-radio>
          <so-radio value="annual">Annual (save 20%)</so-radio>
        </so-radio-group>
        <button type="submit" style="padding:8px 16px;align-self:flex-start">Submit</button>
      </form>
      <p style="font-size:12px;color:var(--soSemanticColorTextSubtle);margin-top:8px">
        Click Submit without selecting an option to trigger validation.
      </p>
    `;
  },
};

// ── 5. ErrorState ─────────────────────────────────────────────────────────────

export const ErrorState: Story = {
  render: () => html`
    <so-radio-group
      label="Account type"
      name="account"
      error-text="Please select an account type to continue"
    >
      <so-radio value="personal">Personal</so-radio>
      <so-radio value="business">Business</so-radio>
      <so-radio value="enterprise">Enterprise</so-radio>
    </so-radio-group>
  `,
};

// ── 6. WarningState ───────────────────────────────────────────────────────────

export const WarningState: Story = {
  render: () => html`
    <so-radio-group
      label="Data retention"
      name="retention"
      warning-text="Shorter retention periods cannot be reversed after saving"
      .value=${'30days'}
    >
      <so-radio value="7days">7 days</so-radio>
      <so-radio value="30days">30 days</so-radio>
      <so-radio value="90days">90 days</so-radio>
      <so-radio value="forever">Forever</so-radio>
    </so-radio-group>
  `,
};

// ── 7. Disabled ───────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => html`
    <so-radio-group
      label="Region (locked)"
      name="region"
      disabled
      .value=${'us-east'}
    >
      <so-radio value="us-east">US East</so-radio>
      <so-radio value="us-west">US West</so-radio>
      <so-radio value="eu">Europe</so-radio>
    </so-radio-group>
  `,
};

// ── 8. Touch ──────────────────────────────────────────────────────────────────

export const Touch: Story = {
  render: () => html`
    <so-radio-group
      label="Payment method"
      helper-text="44px touch targets enabled"
      name="payment"
      touch
      .value=${'card'}
    >
      <so-radio value="card">Credit card</so-radio>
      <so-radio value="paypal">PayPal</so-radio>
      <so-radio value="bank">Bank transfer</so-radio>
    </so-radio-group>
  `,
};

// ── 9. NoneSelected ───────────────────────────────────────────────────────────

export const NoneSelected: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px">
      ${sectionLabel('No initial value — first item gets tabindex="0"')}
      <so-radio-group
        label="Priority"
        name="priority"
      >
        <so-radio value="low">Low</so-radio>
        <so-radio value="medium">Medium</so-radio>
        <so-radio value="high">High</so-radio>
        <so-radio value="critical">Critical</so-radio>
      </so-radio-group>
    </div>
  `,
};

// ── 10. ThemeShowcase ─────────────────────────────────────────────────────────

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

            <so-radio-group
              label="Default"
              name="default-${theme}"
              .value=${'b'}
            >
              <so-radio value="a">Option A</so-radio>
              <so-radio value="b">Option B</so-radio>
              <so-radio value="c">Option C</so-radio>
            </so-radio-group>

            <so-radio-group
              label="With error"
              name="error-${theme}"
              error-text="Please select an option"
            >
              <so-radio value="x">Option X</so-radio>
              <so-radio value="y">Option Y</so-radio>
            </so-radio-group>

            <so-radio-group
              label="Disabled"
              name="disabled-${theme}"
              disabled
              .value=${'p'}
            >
              <so-radio value="p">Option P</so-radio>
              <so-radio value="q">Option Q</so-radio>
            </so-radio-group>
          </div>
        `,
      )}
    </div>
  `,
};
