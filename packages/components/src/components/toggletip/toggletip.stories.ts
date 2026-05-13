import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/toggletip';
import '@snowyowl/components/components/button';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];
const PLACEMENTS = ['top', 'bottom', 'left', 'right'] as const;

const meta: Meta = {
  title: 'Atomic/Toggletip',
  component: 'so-toggletip',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    open:      { control: 'boolean' },
    placement: { control: 'select', options: PLACEMENTS },
    label:     { control: 'text' },
  },
  args: {
    open: false,
    placement: 'bottom',
    label: 'More information',
  },
};
export default meta;
type Story = StoryObj;

/* ══════════════════════════════════════════════════════════════════════════
   1. Default — info icon trigger, text content + primary button
══════════════════════════════════════════════════════════════════════════ */

export const Default: Story = {
  render: (args) => html`
    <div style="display: flex; justify-content: center; padding: 48px;">
      <so-toggletip label=${args.label} placement=${args.placement} ?open=${args.open}>
        <so-button slot="trigger" variant="ghost" icon-only label="More information">
          <svg slot="prefix" viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">
            <circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8 7v4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="8" cy="4.75" r="0.875" fill="currentColor"/>
          </svg>
        </so-button>
        <div slot="content" style="display: flex; flex-direction: column; gap: 12px;">
          <p style="margin: 0; font-size: var(--soSemanticTextStyleBodySmFontSize);">
            This feature is in early access. Your feedback helps us improve it.
          </p>
          <so-button variant="outline" size="sm" style="align-self: flex-start;">Give feedback</so-button>
        </div>
      </so-toggletip>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. TextOnly — no interactive content
══════════════════════════════════════════════════════════════════════════ */

export const TextOnly: Story = {
  render: () => html`
    <div style="display: flex; justify-content: center; padding: 48px;">
      <so-toggletip label="Definition" placement="bottom">
        <so-button slot="trigger" variant="ghost" icon-only label="Definition">
          <svg slot="prefix" viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">
            <circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8 7v4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="8" cy="4.75" r="0.875" fill="currentColor"/>
          </svg>
        </so-button>
        <div slot="content">
          <p style="margin: 0;">
            A <strong>toggletip</strong> is an interactive panel opened by clicking a trigger.
            Unlike a tooltip, it can contain focusable elements and stays open until dismissed.
          </p>
        </div>
      </so-toggletip>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   3. Placements — all four placements
══════════════════════════════════════════════════════════════════════════ */

export const Placements: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; padding: 64px; max-width: 420px; margin: 0 auto;">
      ${PLACEMENTS.map(
        (p) => html`
          <div style="display: flex; justify-content: center; align-items: center; height: 72px;">
            <so-toggletip label="Placement example" placement=${p}>
              <so-button slot="trigger" variant="outline" size="sm">${p}</so-button>
              <div slot="content" style="font-size: var(--soSemanticTextStyleBodySmFontSize);">
                Placed on the <strong>${p}</strong>.
              </div>
            </so-toggletip>
          </div>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'padded' },
};

/* ══════════════════════════════════════════════════════════════════════════
   4. WithLink — content includes a text link
══════════════════════════════════════════════════════════════════════════ */

export const WithLink: Story = {
  render: () => html`
    <div style="display: flex; justify-content: center; padding: 48px;">
      <so-toggletip label="Keyboard shortcuts" placement="bottom">
        <so-button slot="trigger" variant="secondary" size="md">Shortcuts</so-button>
        <div slot="content" style="display: flex; flex-direction: column; gap: 8px; font-size: var(--soSemanticTextStyleBodySmFontSize);">
          <div><kbd style="background: rgba(255,255,255,0.15); border-radius: 4px; padding: 2px 6px; font-family: monospace;">⌘K</kbd> Open command palette</div>
          <div><kbd style="background: rgba(255,255,255,0.15); border-radius: 4px; padding: 2px 6px; font-family: monospace;">⌘S</kbd> Save document</div>
          <div><kbd style="background: rgba(255,255,255,0.15); border-radius: 4px; padding: 2px 6px; font-family: monospace;">Esc</kbd> Close panel</div>
          <a href="#" style="color: var(--soSemanticColorTextOnTooltip); margin-top: 4px; font-size: inherit;">View all shortcuts</a>
        </div>
      </so-toggletip>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   5. ThemeShowcase — all 6 themes
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
            <so-toggletip label="Info" placement="bottom">
              <so-button slot="trigger" variant="ghost" icon-only label="Info">
                <svg slot="prefix" viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M8 7v4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <circle cx="8" cy="4.75" r="0.875" fill="currentColor"/>
                </svg>
              </so-button>
              <div slot="content" style="font-size: var(--soSemanticTextStyleBodySmFontSize);">
                Toggletip in <strong>${theme}</strong> theme.
              </div>
            </so-toggletip>
          </div>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'fullscreen' },
};
