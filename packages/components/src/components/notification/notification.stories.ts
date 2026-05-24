import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/notification';
import '@snowyowl/components/components/button';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];
const TYPES = ['info', 'success', 'warning', 'error'] as const;

const meta: Meta = {
  title: 'Components/Notification',
  component: 'so-notification',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    title: { control: 'text' },
    message: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  args: {
    type: 'info',
    message: 'Your action was completed successfully.',
    dismissible: false,
  },
};
export default meta;
type Story = StoryObj;

/* ══════════════════════════════════════════════════════════════════════════
   1. Default
══════════════════════════════════════════════════════════════════════════ */

export const Default: Story = {
  render: (args) => html`
    <so-notification
      type=${args.type}
      title=${args.title || ''}
      message=${args.message}
      ?dismissible=${args.dismissible}
    ></so-notification>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. AllTypes — all four types stacked
══════════════════════════════════════════════════════════════════════════ */

export const AllTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 560px;">
      ${TYPES.map(
        (t) => html`
          <so-notification
            type=${t}
            message="This is a ${t} notification message."
          ></so-notification>
        `,
      )}
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   3. WithTitle — all four types with title + message
══════════════════════════════════════════════════════════════════════════ */

export const WithTitle: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 560px;">
      ${TYPES.map(
        (t) => html`
          <so-notification
            type=${t}
            title=${t.charAt(0).toUpperCase() + t.slice(1)}
            message="Something important happened that you should be aware of."
          ></so-notification>
        `,
      )}
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   4. WithoutTitle — message only, confirm body-sm weight
══════════════════════════════════════════════════════════════════════════ */

export const WithoutTitle: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 560px;">
      ${TYPES.map(
        (t) => html`
          <so-notification
            type=${t}
            message="No title present — this message should use body-sm font weight, not bold."
          ></so-notification>
        `,
      )}
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   5. Dismissible — with close button
══════════════════════════════════════════════════════════════════════════ */

export const Dismissible: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 560px;">
      ${TYPES.map(
        (t) => html`
          <so-notification
            type=${t}
            title=${t.charAt(0).toUpperCase() + t.slice(1)}
            message="Click × to dismiss this notification."
            dismissible
          ></so-notification>
        `,
      )}
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   6. LongMessage — no title, long body text
══════════════════════════════════════════════════════════════════════════ */

export const LongMessage: Story = {
  render: () => html`
    <div style="max-width: 480px;">
      <so-notification
        type="warning"
        message="Your session will expire in 5 minutes due to inactivity. Any unsaved changes may be lost. Please save your work or interact with the page to extend your session before the timeout occurs."
        dismissible
      ></so-notification>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   7. ThemeShowcase — all 6 themes × all 4 types
══════════════════════════════════════════════════════════════════════════ */

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      ${THEMES.map(
        (theme) => html`
          <div
            data-theme=${theme}
            style="
              padding: 16px;
              border-radius: 8px;
              background: var(--soSemanticColorSurfaceDefault, #fff);
              border: 1px solid var(--soSemanticColorBorderDefault, #e5e7eb);
            "
          >
            <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--soSemanticColorTextSubtle); margin-bottom: 12px; font-family: monospace;">${theme}</div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${TYPES.map(
                (t) => html`
                  <so-notification
                    type=${t}
                    message=${t.charAt(0).toUpperCase() + t.slice(1) + ' notification.'}
                  ></so-notification>
                `,
              )}
            </div>
          </div>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'fullscreen' },
};
