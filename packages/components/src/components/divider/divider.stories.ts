import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/divider';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Components/Divider',
  component: 'so-divider',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    emphasis: {
      control: 'select',
      options: ['subtle', 'strong'],
    },
  },
  args: {
    orientation: 'horizontal',
    emphasis: 'subtle',
  },
};
export default meta;
type Story = StoryObj;

/* ══════════════════════════════════════════════════════════════════════════
   1. Horizontal (default, subtle)
══════════════════════════════════════════════════════════════════════════ */

export const Horizontal: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
      <p style="margin: 0; font-family: system-ui; font-size: 14px; color: #333;">Section one content sits above the divider.</p>
      <so-divider></so-divider>
      <p style="margin: 0; font-family: system-ui; font-size: 14px; color: #333;">Section two content sits below the divider.</p>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. HorizontalStrong
══════════════════════════════════════════════════════════════════════════ */

export const HorizontalStrong: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
      <p style="margin: 0; font-family: system-ui; font-size: 14px; color: #333;">Above the strong divider.</p>
      <so-divider emphasis="strong"></so-divider>
      <p style="margin: 0; font-family: system-ui; font-size: 14px; color: #333;">Below the strong divider.</p>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   3. Vertical — inside a flex row
══════════════════════════════════════════════════════════════════════════ */

export const Vertical: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; height: 32px; gap: 12px; font-family: system-ui; font-size: 14px; color: #333;">
      <span>Item one</span>
      <so-divider orientation="vertical"></so-divider>
      <span>Item two</span>
      <so-divider orientation="vertical"></so-divider>
      <span>Item three</span>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   4. VerticalStrong
══════════════════════════════════════════════════════════════════════════ */

export const VerticalStrong: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; height: 32px; gap: 12px; font-family: system-ui; font-size: 14px; color: #333;">
      <span>Left</span>
      <so-divider orientation="vertical" emphasis="strong"></so-divider>
      <span>Right</span>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   5. Labeled — with "OR" text
══════════════════════════════════════════════════════════════════════════ */

export const Labeled: Story = {
  render: () => html`
    <div style="max-width: 480px;">
      <so-divider>OR</so-divider>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   6. LabeledCustomText — longer label
══════════════════════════════════════════════════════════════════════════ */

export const LabeledCustomText: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 480px;">
      <so-divider>Continue with</so-divider>
      <so-divider emphasis="strong">More options below</so-divider>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   7. InForm — dividers separating form sections
══════════════════════════════════════════════════════════════════════════ */

export const InForm: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px; font-family: system-ui; font-size: 14px; color: #333;">
      <div>
        <div style="font-weight: 600; margin-bottom: 8px;">Personal details</div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <input style="padding: 8px; border: 1px solid #ddd; border-radius: 6px;" placeholder="First name" />
          <input style="padding: 8px; border: 1px solid #ddd; border-radius: 6px;" placeholder="Last name" />
        </div>
      </div>

      <so-divider></so-divider>

      <div>
        <div style="font-weight: 600; margin-bottom: 8px;">Contact</div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <input style="padding: 8px; border: 1px solid #ddd; border-radius: 6px;" placeholder="Email" />
          <input style="padding: 8px; border: 1px solid #ddd; border-radius: 6px;" placeholder="Phone" />
        </div>
      </div>

      <so-divider>OR</so-divider>

      <div style="display: flex; gap: 8px;">
        <button style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #fff; cursor: pointer;">Sign in with Google</button>
        <button style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #fff; cursor: pointer;">Sign in with Apple</button>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   8. ThemeShowcase — all 6 themes × horizontal subtle + labeled
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
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <so-divider></so-divider>
              <so-divider emphasis="strong"></so-divider>
              <so-divider>OR</so-divider>
            </div>
          </div>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'fullscreen' },
};
