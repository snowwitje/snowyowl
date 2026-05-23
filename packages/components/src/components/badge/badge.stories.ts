import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/badge';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];
const COLORS = ['neutral', 'mauve', 'sand', 'red', 'orange', 'yellow', 'green', 'blue', 'purple'] as const;
const STATUSES = ['online', 'busy', 'away', 'offline', 'new'] as const;

const meta: Meta = {
  title: 'Atomic/Badge',
  component: 'so-badge',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['count', 'status', 'label'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    count:  { control: 'number' },
    max:    { control: 'number' },
    status: {
      control: 'select',
      options: STATUSES,
    },
    color: {
      control: 'select',
      options: [...COLORS, 'custom'],
    },
    label:    { control: 'text' },
    showZero: { control: 'boolean' },
    overlay: { control: 'boolean' },
    overlayPosition: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    },
  },
  args: {
    variant: 'count',
    size: 'md',
    count: 5,
    max: 99,
    status: 'online',
    color: 'neutral',
    label: 'New',
    showZero: false,
    overlay: false,
    overlayPosition: 'top-right',
  },
};
export default meta;
type Story = StoryObj;

/* ══════════════════════════════════════════════════════════════════════════
   1. CountVariant — all color presets, md size
══════════════════════════════════════════════════════════════════════════ */

export const CountVariant: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
      ${COLORS.map(
        (c) => html`
          <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
            <so-badge variant="count" count="7" color=${c}></so-badge>
            <span style="font-family: monospace; font-size: 11px; color: #888;">${c}</span>
          </div>
        `,
      )}
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. CountSizes — sm and md side by side
══════════════════════════════════════════════════════════════════════════ */

export const CountSizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 24px;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <so-badge variant="count" count="7" color="red" size="sm"></so-badge>
        <so-badge variant="count" count="12" color="red" size="sm"></so-badge>
        <span style="font-family: monospace; font-size: 11px; color: #888;">sm (16px)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <so-badge variant="count" count="7" color="red" size="md"></so-badge>
        <so-badge variant="count" count="12" color="red" size="md"></so-badge>
        <span style="font-family: monospace; font-size: 11px; color: #888;">md (20px)</span>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   3. HiddenAtZero — count=0 hides the badge; show-zero forces "0" pill
══════════════════════════════════════════════════════════════════════════ */

export const HiddenAtZero: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; font-family: system-ui; font-size: 13px; color: #555;">
      <p style="margin: 0;">
        By default, <code>count="0"</code> sets <code>display: none</code> on the badge so
        it takes no space. Add <code>show-zero</code> to force the "0" pill when an explicit
        zero is meaningful (e.g. analytics dashboards).
      </p>
      <div style="display: flex; align-items: center; gap: 32px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <so-badge variant="count" count="1" color="red"></so-badge>
          <span style="font-family: monospace; font-size: 11px; color: #888;">count=1 (visible)</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <div style="height: 20px; width: 40px; border: 1px dashed #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
            <so-badge variant="count" count="0" color="red"></so-badge>
          </div>
          <span style="font-family: monospace; font-size: 11px; color: #888;">count=0 (hidden)</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <so-badge variant="count" count="0" color="red" show-zero></so-badge>
          <span style="font-family: monospace; font-size: 11px; color: #888;">count=0 + show-zero</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <so-badge variant="count" count="0" color="blue" show-zero size="sm"></so-badge>
          <span style="font-family: monospace; font-size: 11px; color: #888;">show-zero sm</span>
        </div>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   4. CountOverflow — count exceeds max → shows "99+"
══════════════════════════════════════════════════════════════════════════ */

export const CountOverflow: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <so-badge variant="count" count="99"  color="red" size="md"></so-badge>
      <so-badge variant="count" count="100" color="red" size="md"></so-badge>
      <so-badge variant="count" count="999" color="red" size="md"></so-badge>
      <so-badge variant="count" count="999" color="red" size="sm"></so-badge>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   5. StatusVariant — all four status values, both sizes
══════════════════════════════════════════════════════════════════════════ */

export const StatusVariant: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: flex-start;">
      <div>
        <div style="font-family: system-ui; font-size: 12px; color: #888; margin-bottom: 8px;">md (12px)</div>
        <div style="display: flex; gap: 16px; align-items: center;">
          ${STATUSES.map(
            (s) => html`
              <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                <so-badge variant="status" status=${s} size="md"></so-badge>
                <span style="font-family: monospace; font-size: 11px; color: #888;">${s}</span>
              </div>
            `,
          )}
        </div>
      </div>
      <div>
        <div style="font-family: system-ui; font-size: 12px; color: #888; margin-bottom: 8px;">sm (8px)</div>
        <div style="display: flex; gap: 16px; align-items: center;">
          ${STATUSES.map(
            (s) => html`
              <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                <so-badge variant="status" status=${s} size="sm"></so-badge>
                <span style="font-family: monospace; font-size: 11px; color: #888;">${s}</span>
              </div>
            `,
          )}
        </div>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   6. LabelVariant — all color presets, sm and md
══════════════════════════════════════════════════════════════════════════ */

export const LabelVariant: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
        ${COLORS.map(
          (c) => html`<so-badge variant="label" color=${c} label="New" size="md"></so-badge>`,
        )}
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
        ${COLORS.map(
          (c) => html`<so-badge variant="label" color=${c} label="New" size="sm"></so-badge>`,
        )}
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
        <so-badge variant="label" color="purple" label="Beta" size="md"></so-badge>
        <so-badge variant="label" color="blue"   label="Pro"  size="md"></so-badge>
        <so-badge variant="label" color="green"  label="Live" size="md"></so-badge>
        <so-badge variant="label" color="orange" label="Soon" size="md"></so-badge>
        <so-badge variant="label" color="yellow" label="Last-minute sale" size="sm"></so-badge>
        <so-badge variant="label" color="red"    label="Deprecated" size="sm"></so-badge>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   7. OverlayUsage — badge overlaid on an icon button
══════════════════════════════════════════════════════════════════════════ */

export const OverlayUsage: Story = {
  render: () => html`
    <div style="display: flex; gap: 40px; align-items: flex-start; padding: 24px;">
      <!-- top-right (default) -->
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="position: relative; display: inline-flex;">
          <div style="width: 40px; height: 40px; border-radius: 8px; background: #f3f4f6; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center;">🔔</div>
          <so-badge variant="count" count="3" color="red" overlay overlay-position="top-right"></so-badge>
        </div>
        <span style="font-family: monospace; font-size: 11px; color: #888;">top-right</span>
      </div>

      <!-- top-left -->
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="position: relative; display: inline-flex;">
          <div style="width: 40px; height: 40px; border-radius: 8px; background: #f3f4f6; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center;">✉️</div>
          <so-badge variant="count" count="12" color="blue" overlay overlay-position="top-left"></so-badge>
        </div>
        <span style="font-family: monospace; font-size: 11px; color: #888;">top-left</span>
      </div>

      <!-- bottom-right -->
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="position: relative; display: inline-flex;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #f3f4f6; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 18px;">👤</div>
          <so-badge variant="status" status="online" overlay overlay-position="bottom-right"></so-badge>
        </div>
        <span style="font-family: monospace; font-size: 11px; color: #888;">bottom-right (status)</span>
      </div>

      <!-- bottom-left -->
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="position: relative; display: inline-flex;">
          <div style="width: 40px; height: 40px; border-radius: 8px; background: #f3f4f6; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center;">⚙️</div>
          <so-badge variant="label" label="New" color="green" overlay overlay-position="bottom-left"></so-badge>
        </div>
        <span style="font-family: monospace; font-size: 11px; color: #888;">bottom-left (label)</span>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   8. CustomColor — color="custom" escape hatch
══════════════════════════════════════════════════════════════════════════ */

export const CustomColor: Story = {
  render: () => html`
    <style>
      so-badge[color='custom'].ocean {
        --so-badge-fill:   #e0f2fe;
        --so-badge-text:   #0c4a6e;
        --so-badge-border: #7dd3fc;
      }
      so-badge[color='custom'].rose {
        --so-badge-fill:   #fff1f2;
        --so-badge-text:   #881337;
        --so-badge-border: #fda4af;
      }
      so-badge[color='custom'].mint {
        --so-badge-fill:   #d1fae5;
        --so-badge-text:   #064e3b;
        --so-badge-border: #6ee7b7;
      }
    </style>
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <so-badge variant="count" count="4"  color="custom" class="ocean"></so-badge>
      <so-badge variant="count" count="12" color="custom" class="rose"></so-badge>
      <so-badge variant="label" label="Ocean" color="custom" class="ocean"></so-badge>
      <so-badge variant="label" label="Rose"  color="custom" class="rose"></so-badge>
      <so-badge variant="label" label="Mint"  color="custom" class="mint"></so-badge>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   9. ThemeShowcase — all 6 themes × count + status + label
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
            <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
              <so-badge variant="count" count="7"  color="red"></so-badge>
              <so-badge variant="count" count="99" color="mauve"></so-badge>
              <so-badge variant="status" status="online"></so-badge>
              <so-badge variant="status" status="busy"></so-badge>
              <so-badge variant="status" status="away"></so-badge>
              <so-badge variant="status" status="offline"></so-badge>
              <so-badge variant="label" label="New"  color="blue"></so-badge>
              <so-badge variant="label" label="Beta" color="purple"></so-badge>
            </div>
          </div>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'fullscreen' },
};
