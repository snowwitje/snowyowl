import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/tag';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];
const COLORS = ['neutral', 'mauve', 'sand', 'green', 'red', 'orange', 'teal', 'blue', 'purple'] as const;
const VARIANTS = ['read-only', 'dismissible', 'selectable', 'operational'] as const;

const meta: Meta = {
  title: 'Components/Tag',
  component: 'so-tag',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    color: {
      control: 'select',
      options: [...COLORS, 'custom'],
    },
    label:    { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    skeleton: { control: 'boolean' },
  },
  args: {
    variant: 'read-only',
    color: 'neutral',
    label: 'Frontend',
    selected: false,
    disabled: false,
    skeleton: false,
  },
};
export default meta;
type Story = StoryObj;

/* ══════════════════════════════════════════════════════════════════════════
   1. Default
══════════════════════════════════════════════════════════════════════════ */

export const Default: Story = {
  render: (args) => html`
    <so-tag
      variant=${args.variant}
      color=${args.color}
      label=${args.label}
      ?selected=${args.selected}
      ?disabled=${args.disabled}
      ?skeleton=${args.skeleton}
    ></so-tag>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. ReadOnly — all color presets
══════════════════════════════════════════════════════════════════════════ */

export const ReadOnly: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      ${COLORS.map(
        (c) => html`<so-tag variant="read-only" color=${c} label=${c}></so-tag>`,
      )}
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   3. Dismissible — click × to dismiss each tag
══════════════════════════════════════════════════════════════════════════ */

export const Dismissible: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      ${COLORS.map(
        (c) => html`<so-tag variant="dismissible" color=${c} label=${c}></so-tag>`,
      )}
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   4. Selectable — multi-select group
══════════════════════════════════════════════════════════════════════════ */

export const Selectable: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      <so-tag variant="selectable" color="mauve"   label="Design"       selected></so-tag>
      <so-tag variant="selectable" color="blue"    label="Engineering"></so-tag>
      <so-tag variant="selectable" color="green"   label="Marketing"    selected></so-tag>
      <so-tag variant="selectable" color="orange"  label="Operations"></so-tag>
      <so-tag variant="selectable" color="purple"  label="Product"      selected></so-tag>
      <so-tag variant="selectable" color="teal"    label="Research"></so-tag>
      <so-tag variant="selectable" color="sand"    label="Sales"></so-tag>
      <so-tag variant="selectable" color="red"     label="Support"></so-tag>
      <so-tag variant="selectable" color="neutral" label="Other"></so-tag>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   5. Operational — click handler logs to console
══════════════════════════════════════════════════════════════════════════ */

export const Operational: Story = {
  render: () => {
    const onClick = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      console.log('[so-tag] so-click', detail);
    };
    return html`
      <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;" @so-click=${onClick}>
        <so-tag variant="operational" color="mauve"   label="Filter: Design"></so-tag>
        <so-tag variant="operational" color="blue"    label="Filter: Engineering"></so-tag>
        <so-tag variant="operational" color="green"   label="Filter: Marketing"></so-tag>
        <so-tag variant="operational" color="orange"  label="Filter: Operations"></so-tag>
        <so-tag variant="operational" color="neutral" label="More filters…"></so-tag>
      </div>
    `;
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   6. WithIcons — read-only and selectable with so-icon prefix
══════════════════════════════════════════════════════════════════════════ */

export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      <so-tag variant="read-only" color="green" label="Active">
        <so-icon slot="icon" name="check-circle" size="sm"></so-icon>
      </so-tag>
      <so-tag variant="read-only" color="red" label="Error">
        <so-icon slot="icon" name="close-circle" size="sm"></so-icon>
      </so-tag>
      <so-tag variant="read-only" color="orange" label="Warning">
        <so-icon slot="icon" name="warning-triangle" size="sm"></so-icon>
      </so-tag>
      <so-tag variant="selectable" color="blue" label="Starred">
        <so-icon slot="icon" name="star" size="sm"></so-icon>
      </so-tag>
      <so-tag variant="selectable" color="purple" label="Pinned">
        <so-icon slot="icon" name="star-o" size="sm"></so-icon>
      </so-tag>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   7. Disabled — interactive variants in disabled state
══════════════════════════════════════════════════════════════════════════ */

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      <so-tag variant="dismissible"  color="mauve"   label="Dismissible"  disabled></so-tag>
      <so-tag variant="selectable"   color="blue"    label="Selectable"   disabled></so-tag>
      <so-tag variant="selectable"   color="green"   label="Selected"     disabled selected></so-tag>
      <so-tag variant="operational"  color="neutral" label="Operational"  disabled></so-tag>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   8. Skeleton
══════════════════════════════════════════════════════════════════════════ */

export const Skeleton: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      <so-tag skeleton></so-tag>
      <so-tag skeleton></so-tag>
      <so-tag skeleton></so-tag>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   9. CustomColor — consumer provides --so-tag-* via CSS
══════════════════════════════════════════════════════════════════════════ */

export const CustomColor: Story = {
  render: () => html`
    <style>
      so-tag[color="custom"].ocean {
        --so-tag-fill:   #e0f2fe;
        --so-tag-text:   #0c4a6e;
        --so-tag-border: #7dd3fc;
      }
      so-tag[color="custom"].rose {
        --so-tag-fill:   #fff1f2;
        --so-tag-text:   #881337;
        --so-tag-border: #fda4af;
      }
    </style>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      <so-tag variant="read-only"    color="custom" class="ocean" label="Ocean"></so-tag>
      <so-tag variant="dismissible"  color="custom" class="ocean" label="Ocean dismissible"></so-tag>
      <so-tag variant="selectable"   color="custom" class="rose"  label="Rose selectable"></so-tag>
      <so-tag variant="operational"  color="custom" class="rose"  label="Rose operational"></so-tag>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   10. Truncation — max-width + long labels
══════════════════════════════════════════════════════════════════════════ */

export const Truncation: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      <so-tag
        variant="read-only"
        color="blue"
        label="This label is very long and will be truncated"
        max-width="160px"
      ></so-tag>
      <so-tag
        variant="selectable"
        color="mauve"
        label="Another very long label that exceeds the allowed width"
        max-width="140px"
      ></so-tag>
      <so-tag
        variant="dismissible"
        color="green"
        label="Dismissible tag with a long label for truncation"
        max-width="180px"
      ></so-tag>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   11. ThemeShowcase — all 6 themes × all variants
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
            <div style="display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
              <so-tag variant="read-only"   color="mauve"  label="Read only"></so-tag>
              <so-tag variant="dismissible" color="blue"   label="Dismissible"></so-tag>
              <so-tag variant="selectable"  color="green"  label="Selected" selected></so-tag>
              <so-tag variant="selectable"  color="purple" label="Unselected"></so-tag>
              <so-tag variant="operational" color="orange" label="Operational"></so-tag>
            </div>
          </div>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'fullscreen' },
};
