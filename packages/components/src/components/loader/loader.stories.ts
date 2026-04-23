import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/loader';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Atomic/Loader',
  component: 'so-loader',
  tags: ['autodocs'],
  argTypes: {
    size:    { control: 'radio',  options: ['sm', 'md', 'lg', 'xl'] },
    variant: { control: 'radio',  options: ['arc', 'gradient'] },
    label:   { control: 'text' },
    overlay: { control: 'boolean' },
    inline:  { control: 'boolean' },
  },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

// ── 1. Default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => html`<so-loader></so-loader>`,
};

// ── 2. Sizes ─────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;align-items:center;gap:40px;flex-wrap:wrap">
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
        <so-loader size="sm"></so-loader>
        <span style="font-size:11px;color:var(--soSemanticColorTextSubtle,#6b7280);font-family:monospace">sm · 24px</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
        <so-loader size="md"></so-loader>
        <span style="font-size:11px;color:var(--soSemanticColorTextSubtle,#6b7280);font-family:monospace">md · 40px</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
        <so-loader size="lg"></so-loader>
        <span style="font-size:11px;color:var(--soSemanticColorTextSubtle,#6b7280);font-family:monospace">lg · 56px</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
        <so-loader size="xl"></so-loader>
        <span style="font-size:11px;color:var(--soSemanticColorTextSubtle,#6b7280);font-family:monospace">xl · 72px</span>
      </div>
    </div>
  `,
};

// ── 3. Variants ───────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => html`
    <div style="display:flex;align-items:center;gap:64px;flex-wrap:wrap">
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
        <so-loader size="lg" variant="arc"></so-loader>
        <span style="font-size:11px;color:var(--soSemanticColorTextSubtle,#6b7280);font-family:monospace">arc</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
        <so-loader size="lg" variant="gradient"></so-loader>
        <span style="font-size:11px;color:var(--soSemanticColorTextSubtle,#6b7280);font-family:monospace">gradient</span>
      </div>
    </div>
  `,
};

// ── 4. Inline ─────────────────────────────────────────────────────────────────

export const Inline: Story = {
  render: () => html`
    <div style="font-family:var(--soSemanticTypographyFamilyBody,'Geologica',system-ui,sans-serif);font-size:16px;font-weight:300;color:var(--soSemanticColorTextDefault,#1f2937)">
      <p>
        Saving your changes
        <so-loader inline size="sm" label="Saving"></so-loader>
      </p>
      <p>
        Your request is being processed
        <so-loader inline size="md" label="Processing"></so-loader>
        please wait.
      </p>
    </div>
  `,
};

// ── 5. Overlay ────────────────────────────────────────────────────────────────

export const Overlay: Story = {
  render: () => html`
    <div
      style="
        position: relative;
        width: 320px;
        height: 200px;
        border-radius: var(--soSemanticRadiusContainer, 8px);
        border: 1px solid var(--soSemanticColorBorderDefault, #e5e7eb);
        background: var(--soSemanticColorSurfaceDefault, #ffffff);
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 12px;
      "
    >
      <!-- Mock card content (behind the scrim) -->
      <div style="height:16px;border-radius:4px;background:var(--soSemanticColorSurfaceSkeleton,#d1d5db)"></div>
      <div style="height:12px;width:70%;border-radius:4px;background:var(--soSemanticColorSurfaceSkeleton,#d1d5db)"></div>
      <div style="height:12px;width:85%;border-radius:4px;background:var(--soSemanticColorSurfaceSkeleton,#d1d5db)"></div>
      <div style="height:12px;width:55%;border-radius:4px;background:var(--soSemanticColorSurfaceSkeleton,#d1d5db)"></div>

      <!-- Overlay spinner -->
      <so-loader overlay></so-loader>
    </div>
  `,
};

// ── 6. WithLabel (overlay + visible label) ────────────────────────────────────

export const WithLabel: Story = {
  render: () => html`
    <div
      style="
        position: relative;
        width: 320px;
        height: 200px;
        border-radius: var(--soSemanticRadiusContainer, 8px);
        border: 1px solid var(--soSemanticColorBorderDefault, #e5e7eb);
        background: var(--soSemanticColorSurfaceDefault, #ffffff);
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 12px;
      "
    >
      <div style="height:16px;border-radius:4px;background:var(--soSemanticColorSurfaceSkeleton,#d1d5db)"></div>
      <div style="height:12px;width:70%;border-radius:4px;background:var(--soSemanticColorSurfaceSkeleton,#d1d5db)"></div>
      <div style="height:12px;width:85%;border-radius:4px;background:var(--soSemanticColorSurfaceSkeleton,#d1d5db)"></div>

      <so-loader overlay label="Loading data…" size="lg"></so-loader>
    </div>
  `,
};

// ── 7. ThemeShowcase ──────────────────────────────────────────────────────────

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;font-family:sans-serif">
      ${THEMES.map(
        theme => html`
          <div
            data-theme=${theme}
            style="
              padding: 32px 20px;
              background: var(--soSemanticColorSurfaceDefault, #fff);
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 32px;
            "
          >
            <span style="font-size:11px;color:var(--soSemanticColorTextSubtle,#6b7280);
                         font-family:monospace;align-self:flex-start">
              ${theme}
            </span>

            <so-loader size="md" variant="arc"></so-loader>
            <so-loader size="md" variant="gradient"></so-loader>
          </div>
        `,
      )}
    </div>
  `,
};
