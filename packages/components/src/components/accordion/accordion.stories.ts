import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/accordion';
import '@snowyowl/components/components/input';
import '@snowyowl/components/components/checkbox';
import '@snowyowl/components/components/checkbox-group';
import '@snowyowl/components/components/button';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Components/Accordion',
  component: 'so-accordion',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    flush: { control: 'boolean' },
    exclusive: { control: 'boolean' },
    iconAlign: {
      control: 'select',
      options: ['end', 'start'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    flush: false,
    exclusive: false,
    iconAlign: 'end',
    size: 'sm',
  },
};
export default meta;
type Story = StoryObj;

/* ══════════════════════════════════════════════════════════════════════════
   1. Default — 3 items, first open
══════════════════════════════════════════════════════════════════════════ */

export const Default: Story = {
  render: () => html`
    <so-accordion style="max-width: 640px;">
      <so-accordion-item heading="Personal Information" open>
        <p style="margin: 0;">
          Manage your personal details including name, date of birth, and contact information.
        </p>
      </so-accordion-item>
      <so-accordion-item heading="Notifications">
        <p style="margin: 0;">
          Control which notifications you receive and how they are delivered.
        </p>
      </so-accordion-item>
      <so-accordion-item heading="Privacy &amp; Security">
        <p style="margin: 0;">
          Review your privacy settings and manage connected applications.
        </p>
      </so-accordion-item>
    </so-accordion>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. AllClosed — 3 items, none open
══════════════════════════════════════════════════════════════════════════ */

export const AllClosed: Story = {
  render: () => html`
    <so-accordion style="max-width: 640px;">
      <so-accordion-item heading="Personal Information">
        <p style="margin: 0;">Content for personal information.</p>
      </so-accordion-item>
      <so-accordion-item heading="Notifications">
        <p style="margin: 0;">Content for notifications.</p>
      </so-accordion-item>
      <so-accordion-item heading="Privacy &amp; Security">
        <p style="margin: 0;">Content for privacy and security.</p>
      </so-accordion-item>
    </so-accordion>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   3. AllOpen — 3 items, all open
══════════════════════════════════════════════════════════════════════════ */

export const AllOpen: Story = {
  render: () => html`
    <so-accordion style="max-width: 640px;">
      <so-accordion-item heading="Personal Information" open>
        <p style="margin: 0;">Manage your personal details including name and contact info.</p>
      </so-accordion-item>
      <so-accordion-item heading="Notifications" open>
        <p style="margin: 0;">Control which notifications you receive.</p>
      </so-accordion-item>
      <so-accordion-item heading="Privacy &amp; Security" open>
        <p style="margin: 0;">Review your privacy settings.</p>
      </so-accordion-item>
    </so-accordion>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   4. Sizes — sm (default 14px) / md (16px) / lg (18px heading)
══════════════════════════════════════════════════════════════════════════ */

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <p style="margin: 0 0 8px; font-family: monospace; font-size: 12px; color: var(--soSemanticColorTextSubtle);">size="sm" (default) — 14px label + 14px content</p>
        <so-accordion style="max-width: 640px;">
          <so-accordion-item heading="Personal Information" open>
            <p style="margin: 0;">Manage your personal details including name and contact information.</p>
          </so-accordion-item>
          <so-accordion-item heading="Notifications">
            <p style="margin: 0;">Control which notifications you receive and how they are delivered.</p>
          </so-accordion-item>
        </so-accordion>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-family: monospace; font-size: 12px; color: var(--soSemanticColorTextSubtle);">size="md" — 16px label + 16px content</p>
        <so-accordion size="md" style="max-width: 640px;">
          <so-accordion-item heading="Personal Information" open>
            <p style="margin: 0;">Manage your personal details including name and contact information.</p>
          </so-accordion-item>
          <so-accordion-item heading="Notifications">
            <p style="margin: 0;">Control which notifications you receive and how they are delivered.</p>
          </so-accordion-item>
        </so-accordion>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-family: monospace; font-size: 12px; color: var(--soSemanticColorTextSubtle);">size="lg" — 18px semibold heading + 16px content</p>
        <so-accordion size="lg" style="max-width: 640px;">
          <so-accordion-item heading="Personal Information" open>
            <p style="margin: 0;">Manage your personal details including name and contact information.</p>
          </so-accordion-item>
          <so-accordion-item heading="Notifications">
            <p style="margin: 0;">Control which notifications you receive and how they are delivered.</p>
          </so-accordion-item>
        </so-accordion>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   5. SingleOpen — exclusive mode: only one panel open at a time
══════════════════════════════════════════════════════════════════════════ */

export const SingleOpen: Story = {
  render: () => html`
    <so-accordion exclusive style="max-width: 640px;">
      <so-accordion-item heading="Personal Information" open>
        <p style="margin: 0;">Manage your personal details including name, date of birth, and contact information.</p>
      </so-accordion-item>
      <so-accordion-item heading="Notifications">
        <p style="margin: 0;">Control which notifications you receive and how they are delivered.</p>
      </so-accordion-item>
      <so-accordion-item heading="Privacy &amp; Security">
        <p style="margin: 0;">Review your privacy settings and manage connected applications.</p>
      </so-accordion-item>
      <so-accordion-item heading="Advanced">
        <p style="margin: 0;">Developer options and API access controls.</p>
      </so-accordion-item>
    </so-accordion>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   6. MultiExpand — 5 items, demonstrates multiple panels open simultaneously
══════════════════════════════════════════════════════════════════════════ */

export const MultiExpand: Story = {
  render: () => html`
    <so-accordion style="max-width: 640px;">
      <so-accordion-item heading="Account Details" open>
        <p style="margin: 0;">Username, email address, and account type.</p>
      </so-accordion-item>
      <so-accordion-item heading="Billing" open>
        <p style="margin: 0;">Payment methods, invoices, and billing history.</p>
      </so-accordion-item>
      <so-accordion-item heading="Notifications">
        <p style="margin: 0;">Email, push, and in-app notification preferences.</p>
      </so-accordion-item>
      <so-accordion-item heading="Integrations" open>
        <p style="margin: 0;">Connected apps and third-party integrations.</p>
      </so-accordion-item>
      <so-accordion-item heading="Advanced">
        <p style="margin: 0;">Developer options and API access.</p>
      </so-accordion-item>
    </so-accordion>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   7. FlushAlignment — flush attribute removes horizontal padding
══════════════════════════════════════════════════════════════════════════ */

export const FlushAlignment: Story = {
  render: () => html`
    <div style="max-width: 240px; border: 1px solid var(--soSemanticColorBorderSubtle); border-radius: 8px; padding: 8px;">
      <p style="margin: 0 0 8px; font-size: 12px; color: var(--soSemanticColorTextSubtle); font-family: monospace; text-transform: uppercase; letter-spacing: 0.05em;">Sidebar</p>
      <so-accordion flush>
        <so-accordion-item heading="Settings" open>
          <p style="margin: 0;">General and advanced settings.</p>
        </so-accordion-item>
        <so-accordion-item heading="Appearance">
          <p style="margin: 0;">Theme, colours, and fonts.</p>
        </so-accordion-item>
        <so-accordion-item heading="Help">
          <p style="margin: 0;">Documentation and support resources.</p>
        </so-accordion-item>
      </so-accordion>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   8. IconStart — icon-align="start" — tree-like layout
══════════════════════════════════════════════════════════════════════════ */

export const IconStart: Story = {
  render: () => html`
    <so-accordion icon-align="start" style="max-width: 640px;">
      <so-accordion-item heading="Components" open>
        <p style="margin: 0;">Browse all available components.</p>
      </so-accordion-item>
      <so-accordion-item heading="Tokens">
        <p style="margin: 0;">Design tokens and CSS custom properties.</p>
      </so-accordion-item>
      <so-accordion-item heading="Guidelines">
        <p style="margin: 0;">Usage guidelines and accessibility requirements.</p>
      </so-accordion-item>
    </so-accordion>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   9. WithDisabledItem — second of 3 items disabled
══════════════════════════════════════════════════════════════════════════ */

export const WithDisabledItem: Story = {
  render: () => html`
    <so-accordion style="max-width: 640px;">
      <so-accordion-item heading="Personal Information" open>
        <p style="margin: 0;">Manage your personal details.</p>
      </so-accordion-item>
      <so-accordion-item heading="Billing (requires upgrade)" disabled>
        <p style="margin: 0;">Billing features require a Pro plan.</p>
      </so-accordion-item>
      <so-accordion-item heading="Privacy &amp; Security">
        <p style="margin: 0;">Review privacy settings.</p>
      </so-accordion-item>
    </so-accordion>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   10. RichContent — real form use case with so-input and so-checkbox
══════════════════════════════════════════════════════════════════════════ */

export const RichContent: Story = {
  render: () => html`
    <so-accordion style="max-width: 640px;">
      <so-accordion-item heading="Contact Details" open>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <so-input label="First name" placeholder="Jane"></so-input>
          <so-input label="Last name" placeholder="Smith"></so-input>
          <so-input label="Email" type="email" placeholder="jane@example.com"></so-input>
        </div>
      </so-accordion-item>
      <so-accordion-item heading="Preferences">
        <so-checkbox-group
        orientation="horizontal"
        name="preferences"
        .value=${['email']}
      >
        <so-checkbox value="email">Email marketing updates</so-checkbox>
        <so-checkbox value="product">Product announcements</so-checkbox>
      </so-checkbox-group>
      </so-accordion-item>
      <so-accordion-item heading="Advanced">
        <p style="margin: 0; color: var(--soSemanticColorTextSubtle);">
          Advanced developer options for API access and integrations.
        </p>
      </so-accordion-item>
    </so-accordion>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   11. HeadingLevels — h2/h3/h4 for document outline / accessibility
   NOTE: heading-level controls the semantic HTML element only (h2/h3/h4)
   so that screen readers and search engines see the correct page hierarchy.
   Visual size is controlled by the `size` prop on `so-accordion`, not by
   heading-level. All three levels intentionally look identical by default.
══════════════════════════════════════════════════════════════════════════ */

export const HeadingLevels: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <p style="margin: 0 0 8px; font-family: monospace; font-size: 12px; color: var(--soSemanticColorTextSubtle);">heading-level="h2" — use when accordion lives under a page title</p>
        <so-accordion style="max-width: 640px;">
          <so-accordion-item heading="Section heading (h2)" heading-level="h2" open>
            <p style="margin: 0;">Content under an h2 heading.</p>
          </so-accordion-item>
          <so-accordion-item heading="Another h2 item" heading-level="h2">
            <p style="margin: 0;">More content.</p>
          </so-accordion-item>
        </so-accordion>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-family: monospace; font-size: 12px; color: var(--soSemanticColorTextSubtle);">heading-level="h3" (default) — use inside a section already headed by h2</p>
        <so-accordion style="max-width: 640px;">
          <so-accordion-item heading="Subsection heading (h3)" open>
            <p style="margin: 0;">Content under an h3 heading.</p>
          </so-accordion-item>
          <so-accordion-item heading="Another h3 item">
            <p style="margin: 0;">More content.</p>
          </so-accordion-item>
        </so-accordion>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-family: monospace; font-size: 12px; color: var(--soSemanticColorTextSubtle);">heading-level="h4" — use inside a nested section</p>
        <so-accordion style="max-width: 640px;">
          <so-accordion-item heading="Deep heading (h4)" heading-level="h4" open>
            <p style="margin: 0;">Content under an h4 heading.</p>
          </so-accordion-item>
          <so-accordion-item heading="Another h4 item" heading-level="h4">
            <p style="margin: 0;">More content.</p>
          </so-accordion-item>
        </so-accordion>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   12. Controlled — open/close controlled externally via buttons
══════════════════════════════════════════════════════════════════════════ */

export const Controlled: Story = {
  render: () => {
    const openAll = () => {
      document.querySelectorAll<any>('#controlled-accordion so-accordion-item').forEach(item => {
        item.open = true;
      });
    };
    const closeAll = () => {
      document.querySelectorAll<any>('#controlled-accordion so-accordion-item').forEach(item => {
        item.open = false;
      });
    };
    return html`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 640px;">
        <div style="display: flex; gap: 8px;">
          <so-button variant="secondary"  @click=${openAll}>Open all</so-button>
          <so-button variant="secondary"  @click=${closeAll}>Close all</so-button>
        </div>
        <so-accordion id="controlled-accordion">
          <so-accordion-item heading="Panel one" open>
            <p style="margin: 0;">First panel content.</p>
          </so-accordion-item>
          <so-accordion-item heading="Panel two">
            <p style="margin: 0;">Second panel content.</p>
          </so-accordion-item>
          <so-accordion-item heading="Panel three">
            <p style="margin: 0;">Third panel content.</p>
          </so-accordion-item>
        </so-accordion>
      </div>
    `;
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   13. ThemeShowcase — all 6 themes, default alignment
══════════════════════════════════════════════════════════════════════════ */

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      ${THEMES.map(
        theme => html`
          <div
            data-theme=${theme}
            style="
              padding: 16px;
              border-radius: 8px;
              background: var(--soSemanticColorSurfaceDefault, #fff);
              border: 1px solid var(--soSemanticColorBorderSubtle);
            "
          >
            <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--soSemanticColorTextSubtle); margin-bottom: 12px; font-family: monospace;">${theme}</div>
            <so-accordion>
              <so-accordion-item heading="Getting started" open>
                <p style="margin: 0;">Introduction and quick start guide.</p>
              </so-accordion-item>
              <so-accordion-item heading="Configuration">
                <p style="margin: 0;">Theme and token configuration.</p>
              </so-accordion-item>
              <so-accordion-item heading="Advanced" disabled>
                <p style="margin: 0;">Advanced options (disabled).</p>
              </so-accordion-item>
            </so-accordion>
          </div>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'fullscreen' },
};
