import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/tabs';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Atomic/Tabs',
  component: 'so-tabs',
  tags: ['autodocs'],
  argTypes: {
    variant:   { control: { type: 'select' }, options: ['line', 'filled'] },
    activeTab: { control: 'text', name: 'active-tab' },
    label:     { control: 'text' },
  },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

// ── Helper label style ─────────────────────────────────────────────────────────
const sectionLabel = (text: string) => html`
  <div style="
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--soSemanticColorTextSubtle, #6b7280);
    margin-bottom: 12px;
    font-family: monospace;
  ">${text}</div>
`;

// ── 1. Default (line) ─────────────────────────────────────────────────────────

export const Default: Story = {
  args: { variant: 'line', activeTab: 'tab1' },
  render: args => html`
    <so-tabs variant=${args.variant} active-tab=${args.activeTab}>
      <so-tab tab-id="tab1" label="Selected Tab"></so-tab>
      <so-tab tab-id="tab2" label="Tab label"></so-tab>
      <so-tab tab-id="tab3" label="Tab label"></so-tab>
      <so-tab tab-id="tab4" label="Tab label"></so-tab>
      <so-tab tab-id="tab5" label="Tab label"></so-tab>
    </so-tabs>
  `,
};

// ── 2. Filled ─────────────────────────────────────────────────────────────────

export const Filled: Story = {
  render: () => html`
    <so-tabs variant="filled" active-tab="tab1">
      <so-tab tab-id="tab1" label="Selected Tab"></so-tab>
      <so-tab tab-id="tab2" label="Tab label"></so-tab>
      <so-tab tab-id="tab3" label="Tab label"></so-tab>
      <so-tab tab-id="tab4" label="Tab label"></so-tab>
      <so-tab tab-id="tab5" label="Tab label"></so-tab>
    </so-tabs>
  `,
};

// ── 3. With icons (icon-only) ─────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      ${sectionLabel('line — icon only')}
      <so-tabs variant="line" active-tab="i1">
        <so-tab tab-id="i1">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="i2">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="i3">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="i4">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="i5">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
      </so-tabs>

      ${sectionLabel('filled — icon only')}
      <so-tabs variant="filled" active-tab="f1">
        <so-tab tab-id="f1">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="f2">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="f3">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="f4">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="f5">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
      </so-tabs>
    </div>
  `,
};

// ── 4. With icons and labels ──────────────────────────────────────────────────

export const WithIconsAndLabels: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      ${sectionLabel('line — icon + label')}
      <so-tabs variant="line" active-tab="il1">
        <so-tab tab-id="il1" label="Overview">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="il2" label="Details">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="il3" label="Settings">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="il4" label="History">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="il5" label="More">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
      </so-tabs>

      ${sectionLabel('filled — icon + label')}
      <so-tabs variant="filled" active-tab="if1">
        <so-tab tab-id="if1" label="Overview">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="if2" label="Details">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="if3" label="Settings">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="if4" label="History">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
        <so-tab tab-id="if5" label="More">
          <so-icon slot="icon" name="cube" decorative></so-icon>
        </so-tab>
      </so-tabs>
    </div>
  `,
};

// ── 5. States ─────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => html`
    <div style="display: flex; gap: 48px; flex-wrap: wrap; align-items: flex-start;">

      <!-- Line variant states -->
      <div style="flex: 1; min-width: 200px;">
        ${sectionLabel('line variant')}
        <div style="display: flex; flex-direction: column; gap: 8px;">

          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="width: 120px; font-size: 12px; color: var(--soSemanticColorTextSubtle);">enabled</span>
            <div style="border-bottom: 1px solid var(--soSemanticColorBorderStrong, #d1d5db); display: inline-flex;">
              <so-tab variant="line" label="Tab label"></so-tab>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="width: 120px; font-size: 12px; color: var(--soSemanticColorTextSubtle);">selected</span>
            <div style="border-bottom: 1px solid var(--soSemanticColorBorderStrong, #d1d5db); display: inline-flex;">
              <so-tab variant="line" label="Tab label" selected></so-tab>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="width: 120px; font-size: 12px; color: var(--soSemanticColorTextSubtle);">disabled</span>
            <div style="border-bottom: 1px solid var(--soSemanticColorBorderStrong, #d1d5db); display: inline-flex;">
              <so-tab variant="line" label="Tab label" disabled></so-tab>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="width: 120px; font-size: 12px; color: var(--soSemanticColorTextSubtle);">skeleton</span>
            <div style="border-bottom: 1px solid var(--soSemanticColorBorderStrong, #d1d5db); display: inline-flex;">
              <so-tab variant="line" label="Tab label" skeleton></so-tab>
            </div>
          </div>

        </div>
      </div>

      <!-- Filled variant states -->
      <div style="flex: 1; min-width: 200px;">
        ${sectionLabel('filled variant')}
        <div style="display: flex; flex-direction: column; gap: 8px;">

          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="width: 120px; font-size: 12px; color: var(--soSemanticColorTextSubtle);">enabled</span>
            <div style="background: var(--soSemanticColorInteractivePrimarySubtle, #f3e8ff); display: inline-flex;">
              <so-tab variant="filled" label="Tab label"></so-tab>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="width: 120px; font-size: 12px; color: var(--soSemanticColorTextSubtle);">selected</span>
            <div style="background: var(--soSemanticColorInteractivePrimarySubtle, #f3e8ff); display: inline-flex;">
              <so-tab variant="filled" label="Tab label" selected></so-tab>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="width: 120px; font-size: 12px; color: var(--soSemanticColorTextSubtle);">disabled</span>
            <div style="background: var(--soSemanticColorInteractivePrimarySubtle, #f3e8ff); display: inline-flex;">
              <so-tab variant="filled" label="Tab label" disabled></so-tab>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="width: 120px; font-size: 12px; color: var(--soSemanticColorTextSubtle);">skeleton</span>
            <div style="background: var(--soSemanticColorInteractivePrimarySubtle, #f3e8ff); display: inline-flex;">
              <so-tab variant="filled" label="Tab label" skeleton></so-tab>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div style="margin-top: 32px; font-size: 12px; color: var(--soSemanticColorTextSubtle);">
      Hover and focus states are interactive — try hovering or tabbing to the tabs above.
    </div>
  `,
};

// ── 6. With disabled tabs ──────────────────────────────────────────────────────

export const WithDisabledTabs: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      ${sectionLabel('line — with disabled tabs')}
      <so-tabs variant="line" active-tab="d1">
        <so-tab tab-id="d1" label="Tab label"></so-tab>
        <so-tab tab-id="d2" label="Tab label" disabled></so-tab>
        <so-tab tab-id="d3" label="Tab label"></so-tab>
        <so-tab tab-id="d4" label="Tab label" disabled></so-tab>
        <so-tab tab-id="d5" label="Tab label"></so-tab>
      </so-tabs>

      ${sectionLabel('filled — with disabled tabs')}
      <so-tabs variant="filled" active-tab="fd1">
        <so-tab tab-id="fd1" label="Tab label"></so-tab>
        <so-tab tab-id="fd2" label="Tab label" disabled></so-tab>
        <so-tab tab-id="fd3" label="Tab label"></so-tab>
        <so-tab tab-id="fd4" label="Tab label" disabled></so-tab>
        <so-tab tab-id="fd5" label="Tab label"></so-tab>
      </so-tabs>
    </div>
  `,
};

// ── 7. Skeleton loading ───────────────────────────────────────────────────────

export const SkeletonLoading: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      ${sectionLabel('line — skeleton')}
      <so-tabs variant="line">
        <so-tab label="Tab label" skeleton></so-tab>
        <so-tab label="Tab label" skeleton></so-tab>
        <so-tab label="Tab label" skeleton></so-tab>
        <so-tab label="Tab label" skeleton></so-tab>
        <so-tab label="Tab label" skeleton></so-tab>
      </so-tabs>

      ${sectionLabel('filled — skeleton')}
      <so-tabs variant="filled">
        <so-tab label="Tab label" skeleton></so-tab>
        <so-tab label="Tab label" skeleton></so-tab>
        <so-tab label="Tab label" skeleton></so-tab>
        <so-tab label="Tab label" skeleton></so-tab>
        <so-tab label="Tab label" skeleton></so-tab>
      </so-tabs>
    </div>
  `,
};

// ── 8. Theme Showcase ──────────────────────────────────────────────────────────

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; font-family: sans-serif;">
      ${THEMES.map(
        theme => html`
          <div
            data-theme=${theme}
            style="
              padding: 20px;
              background: var(--soSemanticColorSurfaceDefault, #fff);
              display: flex;
              flex-direction: column;
              gap: 20px;
            "
          >
            <span style="font-size: 11px; color: var(--soSemanticColorTextSubtle, #6b7280);
                         font-family: monospace;">${theme}</span>

            <div>
              <div style="font-size: 10px; color: var(--soSemanticColorTextSubtle); margin-bottom: 8px; font-family: monospace;">line</div>
              <so-tabs variant="line" active-tab="a1-${theme}">
                <so-tab tab-id="a1-${theme}" label="Selected"></so-tab>
                <so-tab tab-id="a2-${theme}" label="Tab"></so-tab>
                <so-tab tab-id="a3-${theme}" label="Tab" disabled></so-tab>
              </so-tabs>
            </div>

            <div>
              <div style="font-size: 10px; color: var(--soSemanticColorTextSubtle); margin-bottom: 8px; font-family: monospace;">filled</div>
              <so-tabs variant="filled" active-tab="b1-${theme}">
                <so-tab tab-id="b1-${theme}" label="Selected"></so-tab>
                <so-tab tab-id="b2-${theme}" label="Tab"></so-tab>
                <so-tab tab-id="b3-${theme}" label="Tab" disabled></so-tab>
              </so-tabs>
            </div>
          </div>
        `,
      )}
    </div>
  `,
};
