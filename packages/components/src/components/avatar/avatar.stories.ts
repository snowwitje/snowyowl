import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/avatar';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const STATUSES = ['online', 'busy', 'away', 'offline'] as const;

// 8 different names to showcase all hash colors
const HASH_NAMES = [
  'Alex Morgan',
  'Brigitte Fontaine',
  'Carlos Rivera',
  'Diana Chen',
  'Eduardo Silva',
  'Fatima Al-Rashid',
  'George Kowalski',
  'Hana Nakamura',
];

const meta: Meta = {
  title: 'Components/Avatar',
  component: 'so-avatar',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outline'],
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'busy', 'away', 'offline'],
    },
    src:         { control: 'text' },
    name:        { control: 'text' },
    email:       { control: 'text' },
    alt:         { control: 'text' },
    showTooltip: { control: 'boolean' },
    clickable:   { control: 'boolean' },
  },
  args: {
    size:        'md',
    variant:     'filled',
    status:      'none',
    src:         '',
    name:        'Alissa Nedossekina',
    email:       '',
    alt:         '',
    showTooltip: false,
    clickable:   false,
  },
};
export default meta;
type Story = StoryObj;

/* ══════════════════════════════════════════════════════════════════════════
   1. Default — md, filled, initials "AN"
══════════════════════════════════════════════════════════════════════════ */

export const Default: Story = {
  render: () => html`
    <so-avatar name="Alissa Nedossekina"></so-avatar>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. WithImage — md, photo provided
══════════════════════════════════════════════════════════════════════════ */

export const WithImage: Story = {
  render: () => html`
    <so-avatar
      name="Alissa Nedossekina"
      src="https://i.pravatar.cc/80?img=47"
    ></so-avatar>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   3. ImageFallback — broken src → initials fallback
══════════════════════════════════════════════════════════════════════════ */

export const ImageFallback: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <so-avatar
        name="Alissa Nedossekina"
        src="https://example.invalid/broken.jpg"
      ></so-avatar>
      <span style="font-size: 14px; color: var(--soSemanticColorTextSubtle);">
        Image fails to load → shows initials "AN"
      </span>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   4. NoName — no name, no src → user icon fallback
══════════════════════════════════════════════════════════════════════════ */

export const NoName: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <so-avatar></so-avatar>
      <span style="font-size: 14px; color: var(--soSemanticColorTextSubtle);">
        No name, no image → user icon
      </span>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   5. Sizes — all 5 sizes with same name
══════════════════════════════════════════════════════════════════════════ */

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
      ${SIZES.map(size => html`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <so-avatar name="Alissa Nedossekina" size=${size}></so-avatar>
          <span style="font-family: monospace; font-size: 11px; color: var(--soSemanticColorTextSubtle);">${size}</span>
        </div>
      `)}
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   6. Variants — filled vs outline, all 8 hash colors
══════════════════════════════════════════════════════════════════════════ */

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <p style="margin: 0 0 12px; font-family: monospace; font-size: 12px; color: var(--soSemanticColorTextSubtle);">variant="filled"</p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
          ${HASH_NAMES.map(name => html`
            <so-avatar name=${name} variant="filled" size="md"></so-avatar>
          `)}
        </div>
      </div>
      <div>
        <p style="margin: 0 0 12px; font-family: monospace; font-size: 12px; color: var(--soSemanticColorTextSubtle);">variant="outline"</p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
          ${HASH_NAMES.map(name => html`
            <so-avatar name=${name} variant="outline" size="md"></so-avatar>
          `)}
        </div>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   7. WithStatus — md, all 4 status values
══════════════════════════════════════════════════════════════════════════ */

export const WithStatus: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
      ${STATUSES.map(status => html`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <so-avatar name="Alissa Nedossekina" status=${status}></so-avatar>
          <span style="font-family: monospace; font-size: 11px; color: var(--soSemanticColorTextSubtle);">${status}</span>
        </div>
      `)}
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   8. WithTooltip — show-tooltip, name + email
══════════════════════════════════════════════════════════════════════════ */

export const WithTooltip: Story = {
  render: () => html`
    <div style="padding: 48px; display: flex; justify-content: center;">
      <so-avatar
        name="Alissa Nedossekina"
        email="alissa@example.com"
        show-tooltip
      ></so-avatar>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   9. WithTooltipNameOnly — show-tooltip, name only, no email
══════════════════════════════════════════════════════════════════════════ */

export const WithTooltipNameOnly: Story = {
  render: () => html`
    <div style="padding: 48px; display: flex; justify-content: center;">
      <so-avatar
        name="Carlos Rivera"
        show-tooltip
      ></so-avatar>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   10. Clickable — clickable=true, logs so-click
══════════════════════════════════════════════════════════════════════════ */

export const Clickable: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <so-avatar
        name="Alissa Nedossekina"
        clickable
        @so-click=${(e: CustomEvent) => console.log('so-click', e.detail)}
      ></so-avatar>
      <span style="font-size: 14px; color: var(--soSemanticColorTextSubtle);">
        Click the avatar — check console for so-click event
      </span>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   11. StatusAndClickable — status badge + clickable
══════════════════════════════════════════════════════════════════════════ */

export const StatusAndClickable: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
      ${STATUSES.map(status => html`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <so-avatar
            name="Alissa Nedossekina"
            status=${status}
            clickable
            @so-click=${(e: CustomEvent) => console.log('so-click', e.detail)}
          ></so-avatar>
          <span style="font-family: monospace; font-size: 11px; color: var(--soSemanticColorTextSubtle);">${status}</span>
        </div>
      `)}
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   12. ThemeShowcase — all 6 themes, filled and outline
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
            <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
              <so-avatar name="Alissa Nedossekina" variant="filled" size="md"></so-avatar>
              <so-avatar name="Carlos Rivera" variant="filled" size="md" status="online"></so-avatar>
              <so-avatar name="Diana Chen" variant="outline" size="md"></so-avatar>
              <so-avatar name="Eduardo Silva" variant="outline" size="md" status="busy"></so-avatar>
              <so-avatar size="md"></so-avatar>
            </div>
          </div>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'fullscreen' },
};
