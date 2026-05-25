import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/section';
import '@snowyowl/components/components/stack';
import '@snowyowl/components/components/input';
import '@snowyowl/components/components/toggle';
import '@snowyowl/components/components/checkbox';
import '@snowyowl/components/components/button';
import '@snowyowl/components/components/divider';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Components/Section',
  component: 'so-section',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

// ── 1. Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => html`
    <so-section
      heading="Personal Information"
      description="Update your name and contact details."
      style="max-width: 480px"
    >
      <so-stack gap="md">
        <so-input label="First name" value="Alissa"></so-input>
        <so-input label="Last name" value="Snowy"></so-input>
        <so-input label="Email" type="email" value="alissa@example.com"></so-input>
      </so-stack>
    </so-section>
  `,
};

// ── 2. WithAction ─────────────────────────────────────────────────────────────

export const WithAction: Story = {
  render: () => html`
    <so-section
      heading="Team Members"
      description="Manage who has access to this workspace."
      style="max-width: 520px"
    >
      <so-button slot="actions" size="sm" variant="primary">Invite member</so-button>

      <so-stack gap="sm">
        ${['Alissa Snowy', 'Jordan Frost', 'Morgan Hale'].map(
          name => html`
            <div style="
              display:flex;align-items:center;justify-content:space-between;
              padding:12px 16px;border-radius:8px;
              background:var(--soSemanticColorSurfaceContainer,#f3eef7)
            ">
              <span style="font-size:14px;color:var(--soSemanticColorTextDefault)">${name}</span>
              <so-button size="sm" variant="ghost">Remove</so-button>
            </div>
          `,
        )}
      </so-stack>
    </so-section>
  `,
};

// ── 3. Divided ────────────────────────────────────────────────────────────────

export const Divided: Story = {
  render: () => html`
    <so-section
      heading="Notification Settings"
      description="Choose how you receive updates."
      divided
      style="max-width: 480px"
    >
      <so-stack gap="md">
        <so-toggle label="Email notifications" checked></so-toggle>
        <so-toggle label="Push notifications"></so-toggle>
        <so-toggle label="SMS alerts"></so-toggle>
      </so-stack>
    </so-section>
  `,
};

// ── 4. Padded ─────────────────────────────────────────────────────────────────

export const Padded: Story = {
  render: () => html`
    <div style="
      background:var(--soSemanticColorSurfaceContainer,#f3eef7);
      border-radius:12px;
      max-width:480px
    ">
      <so-section
        heading="Security"
        description="Keep your account safe."
        padded
        divided
      >
        <so-stack gap="md">
          <so-toggle label="Two-factor authentication" checked></so-toggle>
          <so-toggle label="Login notifications"></so-toggle>
        </so-stack>
      </so-section>
    </div>
  `,
};

// ── 5. HeadingLevels ──────────────────────────────────────────────────────────

export const HeadingLevels: Story = {
  render: () => html`
    <so-stack gap="xl" style="max-width: 480px">
      <so-section
        heading="h2 — Page-level section"
        description="Use heading-level='h2' for top-level sections on a page."
        heading-level="h2"
        divided
      >
        <div style="padding:16px;background:var(--soSemanticColorSurfaceContainer,#f3eef7);border-radius:8px;
                    font-size:14px;color:var(--soSemanticColorTextSubtle)">Content area</div>
      </so-section>

      <so-section
        heading="h3 — Sub-section (default)"
        description="The default level. Use inside h2 sections."
        heading-level="h3"
        divided
      >
        <div style="padding:16px;background:var(--soSemanticColorSurfaceContainer,#f3eef7);border-radius:8px;
                    font-size:14px;color:var(--soSemanticColorTextSubtle)">Content area</div>
      </so-section>

      <so-section
        heading="h4 — Nested section"
        description="Use heading-level='h4' for deeply nested groupings."
        heading-level="h4"
        divided
      >
        <div style="padding:16px;background:var(--soSemanticColorSurfaceContainer,#f3eef7);border-radius:8px;
                    font-size:14px;color:var(--soSemanticColorTextSubtle)">Content area</div>
      </so-section>
    </so-stack>
  `,
};

// ── 6. SettingsPage ───────────────────────────────────────────────────────────

export const SettingsPage: Story = {
  render: () => html`
    <so-stack gap="xl" style="max-width: 560px">

      <so-section
        heading="Personal Info"
        description="Update your name and email address."
        divided
      >
        <so-button slot="actions" size="sm" variant="ghost">Edit</so-button>
        <so-stack gap="md">
          <so-input label="Full name" value="Alissa Snowy"></so-input>
          <so-input label="Email" type="email" value="alissa@example.com"></so-input>
        </so-stack>
      </so-section>

      <so-section
        heading="Notifications"
        description="Choose what updates you receive and how."
        divided
      >
        <so-stack gap="md">
          <so-toggle label="Product updates" helper-text="New features and improvements" checked></so-toggle>
          <so-toggle label="Security alerts" helper-text="Sign-ins and password changes" checked></so-toggle>
          <so-toggle label="Marketing emails" helper-text="Tips, offers, and announcements"></so-toggle>
        </so-stack>
      </so-section>

      <so-section
        heading="Security"
        description="Manage your password and authentication methods."
        divided
      >
        <so-stack gap="md">
          <so-toggle label="Two-factor authentication" helper-text="Adds a second verification step at sign-in" checked></so-toggle>
          <so-stack direction="row" gap="sm" justify="end">
            <so-button variant="ghost" size="sm">Change password</so-button>
            <so-button variant="primary" size="sm">Save changes</so-button>
          </so-stack>
        </so-stack>
      </so-section>

    </so-stack>
  `,
};

// ── 7. ThemeShowcase ──────────────────────────────────────────────────────────

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px">
      ${THEMES.map(
        theme => html`
          <div data-theme=${theme} style="padding:24px;border-radius:8px;background:var(--soSemanticColorSurfaceDefault)">
            <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                        color:var(--soSemanticColorTextSubtle);margin-bottom:16px">${theme}</div>
            <so-section
              heading="Notification Settings"
              description="Choose how you receive updates."
              divided
            >
              <so-button slot="actions" size="sm" variant="ghost">Edit</so-button>
              <so-stack gap="sm">
                <so-toggle label="Email notifications" checked></so-toggle>
                <so-toggle label="Push notifications"></so-toggle>
              </so-stack>
            </so-section>
          </div>
        `,
      )}
    </div>
  `,
};
