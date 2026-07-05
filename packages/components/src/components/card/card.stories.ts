import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/card';
import '@snowyowl/components/components/button';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const MEDIA_IMG = html`<img slot="media" src="/assets/media/sample.webp" alt="Sample media" />`;

/* ── Sparkline SVG helper ─────────────────────────────────────────────────── */
const sparkline = () => html`
  <svg
    viewBox="0 0 200 80"
    preserveAspectRatio="none"
    style="width: 100%; height: 80px; display: block;"
    aria-hidden="true"
  >
    <path
      d="M0 70 C30 65,50 55,80 40 C110 25,130 38,160 20 C180 10,200 15,200 15 L200 80 L0 80 Z"
      fill="var(--soSemanticColorInteractivePrimarySubtle, rgba(111,90,126,0.15))"
    />
    <path
      d="M0 70 C30 65,50 55,80 40 C110 25,130 38,160 20 C180 10,200 15,200 15"
      fill="none"
      stroke="var(--soSemanticColorInteractivePrimary, #6f5a7e)"
      stroke-width="1.5"
    />
  </svg>
`;

/* ── Section label helper ─────────────────────────────────────────────────── */
const label = (text: string) => html`
  <div
    style="
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--soSemanticColorTextSubtle, #6b7280);
      margin-bottom: 12px;
      font-family: monospace;
    "
  >
    ${text}
  </div>
`;

/* ── Meta ─────────────────────────────────────────────────────────────────── */

const meta: Meta = {
  title: 'Components/Card',
  component: 'so-card',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

/* ══════════════════════════════════════════════════════════════════════════
   1. Media Top (default)
══════════════════════════════════════════════════════════════════════════ */

export const MediaTop: Story = {
  render: () => html`
    <so-card style="max-width: 300px">
      ${MEDIA_IMG}
      Card with media on top
      <span slot="secondary">Secondary text goes here</span>
      <span slot="body">Supporting text goes here</span>
    </so-card>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. Media Bottom
══════════════════════════════════════════════════════════════════════════ */

export const MediaBottom: Story = {
  render: () => html`
    <so-card style="max-width: 300px" media-position="bottom">
      ${MEDIA_IMG}
      Card with media below
      <span slot="secondary">Secondary text goes here</span>
      <span slot="body">Supporting text goes here</span>
    </so-card>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   3. Top Title (no media — long body text)
══════════════════════════════════════════════════════════════════════════ */

export const TopTitle: Story = {
  render: () => html`
    <so-card style="max-width: 300px">
      Card with top title
      <span slot="secondary">Secondary text goes here</span>
      <span slot="body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </span>
    </so-card>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   4. With Actions
══════════════════════════════════════════════════════════════════════════ */

export const WithActions: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">

      <div>${label('outline buttons')}
        <so-card style="max-width: 300px">
          ${MEDIA_IMG}
          Card with media on top
          <span slot="secondary">Secondary text goes here</span>
          <span slot="body">With small-size action buttons shown — can also be icon-only buttons</span>
          <so-button slot="actions" variant="outline" size="sm">Share</so-button>
          <so-button slot="actions" variant="outline" size="sm">Save</so-button>
        </so-card>
      </div>

      <div>${label('primary + outline')}
        <so-card style="max-width: 300px">
          ${MEDIA_IMG}
          Card with media on top
          <span slot="secondary">Secondary text goes here</span>
          <span slot="body">With default-size action buttons shown — can also be icon-only buttons</span>
          <so-button slot="actions" variant="outline" size="md">Share</so-button>
          <so-button slot="actions" variant="primary" size="md">Save</so-button>
        </so-card>
      </div>

      <div>${label('stretch row (flex: 1)')}
        <so-card style="max-width: 300px">
          ${MEDIA_IMG}
          Card with media on top
          <span slot="secondary">Secondary text goes here</span>
          <span slot="body">Buttons share the row equally — add style="flex: 1" to each</span>
          <so-button slot="actions" variant="outline" size="md" style="flex: 1">Share</so-button>
          <so-button slot="actions" variant="primary" size="md" style="flex: 1">Save</so-button>
        </so-card>
      </div>

      <div>${label('full-width stacked')}
        <so-card style="max-width: 300px">
          ${MEDIA_IMG}
          Card with media on top
          <span slot="secondary">Secondary text goes here</span>
          <span slot="body">Each button takes its own row — add full-width attribute</span>
          <so-button slot="actions" variant="outline" size="md" full-width>Share</so-button>
          <so-button slot="actions" variant="primary" size="md" full-width>Save</so-button>
        </so-card>
      </div>

      <div>${label('overflow menu (right-aligned)')}
        <so-card style="max-width: 300px">
          ${MEDIA_IMG}
          Card with media on top
          <span slot="secondary">Secondary text goes here</span>
          <span slot="body">With action(s) shown — can also be icon-only buttons</span>
          <so-button slot="actions" variant="outline" size="sm">Share</so-button>
          <so-button slot="actions" variant="outline" size="sm">Save</so-button>
          <so-button slot="actions" variant="ghost" size="sm" icon-only label="More options" style="margin-left: auto">
            <so-icon slot="prefix" name="menu-dots" decorative></so-icon>
          </so-button>
        </so-card>
      </div>

    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   5. With Corner Action
══════════════════════════════════════════════════════════════════════════ */

export const WithCornerAction: Story = {
  render: () => html`
    <so-card style="max-width: 300px">
      ${MEDIA_IMG}
      Card title
      <span slot="secondary">Secondary text goes here</span>
      <span slot="body">With action(s) shown — can also be icon-only buttons</span>
      <so-button slot="corner-action" variant="ghost" size="sm" icon-only label="Open in new tab">
        <so-icon slot="prefix" name="external-link" decorative></so-icon>
      </so-button>
    </so-card>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   6. KPI — Basic
══════════════════════════════════════════════════════════════════════════ */

export const KpiBasic: Story = {
  render: () => html`
    <so-card style="max-width: 280px">
      <span style="
        font-size: var(--soSemanticTextStyleLabelLgFontSize, 16px);
        font-weight: var(--soSemanticTextStyleLabelLgFontWeight, 500);
        color: var(--soSemanticColorTextSubtle);
        display: block;
      ">KPI Label</span>
      <span
        slot="secondary"
        style="
          font-size: var(--soSemanticTextStyleHeadingLgFontSize, 30px);
          font-weight: var(--soSemanticTextStyleHeadingLgFontWeight, 700);
          font-family: var(--soSemanticTextStyleHeadingLgFontFamily, system-ui);
          line-height: 1.2;
          color: var(--soSemanticColorTextDefault);
          display: block;
        "
      >
        30%
      </span>
      <span slot="body">Details about KPI go here</span>
      <div slot="chart">${sparkline()}</div>
    </so-card>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   7. KPI — With Delta
══════════════════════════════════════════════════════════════════════════ */

export const KpiWithDelta: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">

      <div>${label('positive sentiment')}
        <so-card style="max-width: 280px">
          <span style="
            font-size: var(--soSemanticTextStyleLabelLgFontSize, 16px);
            font-weight: var(--soSemanticTextStyleLabelLgFontWeight, 500);
            color: var(--soSemanticColorTextSubtle);
            display: block;
          ">KPI Label</span>
          <div
            slot="secondary"
            style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;"
          >
            <span style="
              font-size: var(--soSemanticTextStyleHeadingLgFontSize, 30px);
              font-weight: var(--soSemanticTextStyleHeadingLgFontWeight, 700);
              font-family: var(--soSemanticTextStyleHeadingLgFontFamily, system-ui);
              line-height: 1.2;
              color: var(--soSemanticColorTextDefault);
            ">30%</span>
            <so-card-delta value="1.2%" direction="up" sentiment="positive"></so-card-delta>
          </div>
          <span slot="body">Details about KPI go here</span>
        </so-card>
      </div>

      <div>${label('negative sentiment')}
        <so-card style="max-width: 280px">
          <span style="
            font-size: var(--soSemanticTextStyleLabelLgFontSize, 16px);
            font-weight: var(--soSemanticTextStyleLabelLgFontWeight, 500);
            color: var(--soSemanticColorTextSubtle);
            display: block;
          ">KPI Label</span>
          <div
            slot="secondary"
            style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;"
          >
            <span style="
              font-size: var(--soSemanticTextStyleHeadingLgFontSize, 30px);
              font-weight: var(--soSemanticTextStyleHeadingLgFontWeight, 700);
              font-family: var(--soSemanticTextStyleHeadingLgFontFamily, system-ui);
              line-height: 1.2;
              color: var(--soSemanticColorTextDefault);
            ">30%</span>
            <so-card-delta value="1.2%" direction="up" sentiment="negative"></so-card-delta>
          </div>
          <span slot="body">Details about KPI go here</span>
        </so-card>
      </div>

      <div>${label('down + negative')}
        <so-card style="max-width: 280px">
          <span style="
            font-size: var(--soSemanticTextStyleLabelLgFontSize, 16px);
            font-weight: var(--soSemanticTextStyleLabelLgFontWeight, 500);
            color: var(--soSemanticColorTextSubtle);
            display: block;
          ">KPI Label</span>
          <div
            slot="secondary"
            style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;"
          >
            <span style="
              font-size: var(--soSemanticTextStyleHeadingLgFontSize, 30px);
              font-weight: var(--soSemanticTextStyleHeadingLgFontWeight, 700);
              font-family: var(--soSemanticTextStyleHeadingLgFontFamily, system-ui);
              line-height: 1.2;
              color: var(--soSemanticColorTextDefault);
            ">30%</span>
            <so-card-delta value="1.2%" direction="down" sentiment="negative"></so-card-delta>
          </div>
          <span slot="body">Details about KPI go here</span>
        </so-card>
      </div>

    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   8. KPI — With Actions
══════════════════════════════════════════════════════════════════════════ */

export const KpiWithActions: Story = {
  render: () => html`
    <so-card style="max-width: 280px">
      <span style="
        font-size: var(--soSemanticTextStyleLabelLgFontSize, 16px);
        font-weight: var(--soSemanticTextStyleLabelLgFontWeight, 500);
        color: var(--soSemanticColorTextSubtle);
        display: block;
      ">KPI Label</span>
      <div
        slot="secondary"
        style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;"
      >
        <span
          style="
            font-size: var(--soSemanticTextStyleHeadingLgFontSize, 30px);
            font-weight: var(--soSemanticTextStyleHeadingLgFontWeight, 700);
            font-family: var(--soSemanticTextStyleHeadingLgFontFamily, system-ui);
            line-height: 1.2;
            color: var(--soSemanticColorTextDefault);
          "
        >
          30%
        </span>
        <so-card-delta value="1.2%" direction="up" sentiment="positive"></so-card-delta>
      </div>
      <span slot="body">Details about KPI go here</span>
      <div slot="chart">${sparkline()}</div>
      <so-button slot="actions" variant="outline" size="sm">Action 1</so-button>
      <so-button slot="actions" variant="outline" size="sm">Action 2</so-button>
    </so-card>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   9. Clickable
══════════════════════════════════════════════════════════════════════════ */

export const Clickable: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
      <div
        style="
          font-size: 12px;
          color: var(--soSemanticColorTextSubtle);
          background: var(--soSemanticColorSurfaceSunken, #f3ece8);
          border-radius: 6px;
          padding: 10px 12px;
        "
      >
        Hover the card to see elevated shadow. Click to fire <code>so-click</code>.
      </div>
      <so-card clickable style="max-width: 300px">
        ${MEDIA_IMG}
        Card with media on top
        <span slot="secondary">Secondary text goes here</span>
        <span slot="body">With action(s) shown — can also be icon-only buttons</span>
      </so-card>

      <so-card clickable href="https://example.com" style="max-width: 300px">
        ${MEDIA_IMG}
        Clickable link card
        <span slot="secondary">href="https://example.com"</span>
        <span slot="body">The card root is an &lt;a&gt; element when href is set.</span>
      </so-card>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   10. Center Aligned
══════════════════════════════════════════════════════════════════════════ */

export const CenterAligned: Story = {
  render: () => html`
    <so-card style="max-width: 300px" align="center">
      KPI Label
      <div
        slot="secondary"
        style="display: flex; align-items: center; justify-content: center; gap: 8px;"
      >
        <span
          style="
            font-size: var(--soSemanticTextStyleHeadingLgFontSize, 30px);
            font-weight: var(--soSemanticTextStyleHeadingLgFontWeight, 700);
            font-family: var(--soSemanticTextStyleHeadingLgFontFamily, system-ui);
            line-height: 1.2;
            color: var(--soSemanticColorTextDefault);
          "
        >
          30%
        </span>
        <so-card-delta value="1.2%" direction="up" sentiment="positive"></so-card-delta>
      </div>
      <span slot="body">Details about KPI go here</span>
      <div slot="chart">${sparkline()}</div>
    </so-card>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   11. Skeleton
══════════════════════════════════════════════════════════════════════════ */

export const Skeleton: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
      <so-card style="max-width: 280px" skeleton></so-card>
      <so-card style="max-width: 200px" skeleton aspect-ratio="1/1"></so-card>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   12. Theme Showcase
══════════════════════════════════════════════════════════════════════════ */

export const ThemeShowcase: Story = {
  render: () => html`
    <div
      style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2px;
        font-family: sans-serif;
      "
    >
      ${THEMES.map(
        theme => html`
          <div
            data-theme=${theme}
            style="
              padding: 20px;
              background: var(--soSemanticColorSurfaceSubtle, #f9f5f2);
            "
          >
            <div
              style="
                font-size: 11px;
                color: var(--soSemanticColorTextSubtle, #6b7280);
                font-family: monospace;
                margin-bottom: 16px;
              "
            >
              ${theme}
            </div>
            <so-card>
              <img
                slot="media"
                src="/assets/media/sample.webp"
                alt="Sample"
                style="width:100%;height:100%;object-fit:cover;display:block"
              />
              Card with media on top
              <span slot="secondary">Secondary text goes here</span>
              <span slot="body">Supporting text goes here</span>
              <so-button slot="actions" variant="outline">Share</so-button>
              <so-button slot="actions" variant="primary">Save</so-button>
            </so-card>
          </div>
        `,
      )}
    </div>
  `,
};
