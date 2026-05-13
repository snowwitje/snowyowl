import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/tooltip';
import '@snowyowl/components/components/button';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];
const PLACEMENTS = ['top', 'bottom', 'left', 'right'] as const;

const meta: Meta = {
  title: 'Atomic/Tooltip',
  component: 'so-tooltip',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    text:      { control: 'text' },
    placement: { control: 'select', options: PLACEMENTS },
    delay:     { control: 'number' },
    disabled:  { control: 'boolean' },
  },
  args: {
    text: 'Save file',
    placement: 'top',
    delay: 300,
    disabled: false,
  },
};
export default meta;
type Story = StoryObj;

/* ══════════════════════════════════════════════════════════════════════════
   1. Default — tooltip above an icon-only ghost button
══════════════════════════════════════════════════════════════════════════ */

export const Default: Story = {
  render: (args) => html`
    <div style="display: flex; justify-content: center; padding: 40px;">
      <so-tooltip text=${args.text} placement=${args.placement} delay=${args.delay} ?disabled=${args.disabled}>
        <so-button variant="ghost" icon-only label="Save">
          <svg slot="prefix" viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">
            <path d="M3 14V2h7.5L13 4.5V14H3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            <rect x="5.5" y="9" width="5" height="5" rx=".5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M5.5 2v3.5h4V2" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </so-button>
      </so-tooltip>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. Placements — all four simultaneously
══════════════════════════════════════════════════════════════════════════ */

export const Placements: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 48px; max-width: 400px; margin: 0 auto;">
      ${PLACEMENTS.map(
        (p) => html`
          <div style="display: flex; justify-content: center; align-items: center; height: 64px;">
            <so-tooltip text=${`Placement: ${p}`} placement=${p} delay="0">
              <so-button variant="outline" size="sm">${p}</so-button>
            </so-tooltip>
          </div>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'padded' },
};

/* ══════════════════════════════════════════════════════════════════════════
   3. LongText — wraps near max-width
══════════════════════════════════════════════════════════════════════════ */

export const LongText: Story = {
  render: () => html`
    <div style="display: flex; justify-content: center; padding: 48px;">
      <so-tooltip
        text="This is a longer tooltip message that wraps across multiple lines when it approaches the 288px maximum width."
        placement="top"
        delay="0"
      >
        <so-button variant="secondary" size="md">Hover me</so-button>
      </so-tooltip>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   4. OnTextLink — tooltip wrapping an inline anchor
══════════════════════════════════════════════════════════════════════════ */

export const OnTextLink: Story = {
  render: () => html`
    <p style="font-family: system-ui, sans-serif; font-size: 14px; max-width: 400px; line-height: 1.6; margin: 40px auto;">
      Read the
      <so-tooltip text="Opens the full documentation in a new tab" placement="top" delay="0">
        <a href="#" style="color: var(--soSemanticColorInteractivePrimary);">documentation</a>
      </so-tooltip>
      for complete details about this feature.
    </p>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   5. Disabled — tooltip suppressed
══════════════════════════════════════════════════════════════════════════ */

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; justify-content: center; padding: 40px;">
      <so-tooltip text="This tooltip is suppressed" placement="top" disabled delay="0">
        <so-button variant="ghost" size="md">Disabled tooltip</so-button>
      </so-tooltip>
      <so-tooltip text="This one is active" placement="top" delay="0">
        <so-button variant="ghost" size="md">Active tooltip</so-button>
      </so-tooltip>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   6. ThemeShowcase — all 6 themes
══════════════════════════════════════════════════════════════════════════ */

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 16px;">
      ${THEMES.map(
        (theme) => html`
          <div
            data-theme=${theme}
            style="
              padding: 32px 16px;
              border-radius: 8px;
              background: var(--soSemanticColorSurfaceDefault, #fff);
              border: 1px solid var(--soSemanticColorBorderDefault, #e5e7eb);
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 12px;
            "
          >
            <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--soSemanticColorTextSubtle); font-family: monospace;">${theme}</div>
            <so-tooltip text="Tooltip in ${theme} theme" placement="top" delay="0">
              <so-button variant="outline" size="sm">Hover me</so-button>
            </so-tooltip>
          </div>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'fullscreen' },
};
