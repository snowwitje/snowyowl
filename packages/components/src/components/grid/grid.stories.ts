import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/grid';
import '@snowyowl/components/components/card';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

const meta: Meta = {
  title: 'Components/Grid',
  component: 'so-grid',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

/* ── Helpers ─────────────────────────────────────────────────────────────── */

const kpiCard = (title: string, value: string, delta: string, positive = true) => html`
  <so-card>
    <div style="display:flex;flex-direction:column;gap:8px">
      <div style="font-size:12px;font-weight:500;color:var(--soSemanticColorTextSubtle)">${title}</div>
      <div style="font-size:28px;font-weight:700;color:var(--soSemanticColorTextDefault)">${value}</div>
      <div style="font-size:12px;color:${positive ? 'var(--soSemanticColorStatusSuccess,#148448)' : 'var(--soSemanticColorStatusError,#d9233b)'}">
        ${positive ? '↑' : '↓'} ${delta}
      </div>
    </div>
  </so-card>
`;

const box = (label: string) => html`
  <div style="
    padding: 24px;
    background: var(--soSemanticColorSurfaceContainer, #f3eef7);
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--soSemanticColorTextDefault);
    text-align: center;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  ">${label}</div>
`;

// ── 1. AutoFill ───────────────────────────────────────────────────────────────

export const AutoFill: Story = {
  render: () => html`
    <so-grid columns="auto" gap="lg" full-width>
      <so-card heading="Card One" description="Reflows as the viewport narrows."></so-card>
      <so-card heading="Card Two" description="Reflows as the viewport narrows."></so-card>
      <so-card heading="Card Three" description="Reflows as the viewport narrows."></so-card>
      <so-card heading="Card Four" description="Reflows as the viewport narrows."></so-card>
      <so-card heading="Card Five" description="Reflows as the viewport narrows."></so-card>
      <so-card heading="Card Six" description="Reflows as the viewport narrows."></so-card>
    </so-grid>
  `,
};

// ── 2. FixedColumns ───────────────────────────────────────────────────────────

export const FixedColumns: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:40px">
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle);margin-bottom:12px">columns="2"</div>
        <so-grid columns="2" gap="md" full-width>
          ${[1, 2, 3, 4].map(n => box(`Item ${n}`))}
        </so-grid>
      </div>
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle);margin-bottom:12px">columns="3"</div>
        <so-grid columns="3" gap="md" full-width>
          ${[1, 2, 3, 4, 5, 6].map(n => box(`Item ${n}`))}
        </so-grid>
      </div>
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle);margin-bottom:12px">columns="4"</div>
        <so-grid columns="4" gap="md" full-width>
          ${[1, 2, 3, 4, 5, 6, 7, 8].map(n => box(`Item ${n}`))}
        </so-grid>
      </div>
    </div>
  `,
};

// ── 3. Asymmetric ─────────────────────────────────────────────────────────────

export const Asymmetric: Story = {
  render: () => html`
    <so-grid columns="1fr 2fr" gap="lg" full-width>
      <div style="
        padding: 24px;
        background: var(--soSemanticColorSurfaceContainer,#f3eef7);
        border-radius: 8px;
        min-height: 200px;
      ">
        <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle)">Sidebar — 1fr</div>
      </div>
      <div style="
        padding: 24px;
        background: var(--soSemanticColorSurfaceContainerLow,#f9f5fc);
        border-radius: 8px;
        min-height: 200px;
      ">
        <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle)">Main Content — 2fr</div>
      </div>
    </so-grid>
  `,
};

// ── 4. MinWidthScale ──────────────────────────────────────────────────────────

export const MinWidthScale: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:40px">
      ${(['sm', 'md', 'lg'] as const).map(
        size => html`
          <div>
            <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                        color:var(--soSemanticColorTextSubtle);margin-bottom:12px">
              min-column-width="${size}"
            </div>
            <so-grid columns="auto" min-column-width=${size} gap="md" full-width>
              ${[1, 2, 3, 4].map(n => box(`Cell ${n}`))}
            </so-grid>
          </div>
        `,
      )}
    </div>
  `,
};

// ── 5. GapOverride ────────────────────────────────────────────────────────────

export const GapOverride: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:40px">
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle);margin-bottom:12px">
          gap="lg" (uniform 24px both axes)
        </div>
        <so-grid columns="3" gap="lg" full-width>
          ${[1, 2, 3, 4, 5, 6].map(n => box(`Cell ${n}`))}
        </so-grid>
      </div>
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle);margin-bottom:12px">
          gap="lg" + column-gap="sm" (tight columns, loose rows)
        </div>
        <so-grid columns="3" gap="lg" column-gap="sm" full-width>
          ${[1, 2, 3, 4, 5, 6].map(n => box(`Cell ${n}`))}
        </so-grid>
      </div>
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                    color:var(--soSemanticColorTextSubtle);margin-bottom:12px">
          gap="sm" + row-gap="xl" (tight columns, very loose rows)
        </div>
        <so-grid columns="3" gap="sm" row-gap="xl" full-width>
          ${[1, 2, 3, 4, 5, 6].map(n => box(`Cell ${n}`))}
        </so-grid>
      </div>
    </div>
  `,
};

// ── 6. CardGrid ───────────────────────────────────────────────────────────────

export const CardGrid: Story = {
  render: () => html`
    <so-grid columns="auto" gap="lg" full-width>
      ${kpiCard('Monthly Revenue',    '$84,320', '12.4% vs last month', true)}
      ${kpiCard('Active Users',       '24,781',  '3.2% vs last month',  true)}
      ${kpiCard('Support Tickets',    '142',     '8.1% vs last month',  false)}
      ${kpiCard('Avg. Response Time', '4.2 hrs', '11.5% vs last month', true)}
      ${kpiCard('Churn Rate',         '2.1%',    '0.3% vs last month',  true)}
      ${kpiCard('NPS Score',          '72',      '4 pts vs last month', true)}
    </so-grid>
  `,
};

// ── 7. ThemeShowcase ──────────────────────────────────────────────────────────

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px">
      ${THEMES.map(
        theme => html`
          <div data-theme=${theme} style="padding:24px;border-radius:8px;background:var(--soSemanticColorSurfaceDefault)">
            <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;
                        color:var(--soSemanticColorTextSubtle);margin-bottom:16px">${theme}</div>
            <so-grid columns="3" gap="md" full-width>
              <so-card heading="Alpha" description="First card"></so-card>
              <so-card heading="Beta" description="Second card"></so-card>
              <so-card heading="Gamma" description="Third card"></so-card>
            </so-grid>
          </div>
        `,
      )}
    </div>
  `,
};
