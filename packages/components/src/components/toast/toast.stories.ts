import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/toast';
import '@snowyowl/components/components/notification';
import '@snowyowl/components/components/button';
import { SoToast } from './toast.js';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];
const TYPES = ['info', 'success', 'warning', 'error'] as const;

/* ── Helper: inline toast preview (not using provider / animation) ─────────── */
const staticToast = (
  type: string,
  opts: { title?: string; message?: string; timestamp?: string; actionLabel?: string; dismissible?: boolean } = {},
) => {
  const el = document.createElement('so-toast') as SoToast;
  el.type = type as SoToast['type'];
  el.title = opts.title ?? '';
  el.message = opts.message ?? `This is a ${type} toast notification.`;
  el.timestamp = opts.timestamp ?? '';
  el.actionLabel = opts.actionLabel ?? '';
  el.dismissible = opts.dismissible ?? false;
  el.autoDismiss = 0;
  // Force show state for preview
  el.classList.add('so-toast-enter');
  return el;
};

const meta: Meta = {
  title: 'Components/Toast',
  component: 'so-toast',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

/* ══════════════════════════════════════════════════════════════════════════
   1. AllTypes
══════════════════════════════════════════════════════════════════════════ */

export const AllTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      ${TYPES.map((t) => {
        const toast = staticToast(t);
        return toast;
      })}
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   2. WithTimestamp
══════════════════════════════════════════════════════════════════════════ */

export const WithTimestamp: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      ${TYPES.map((t) => {
        const toast = staticToast(t, { timestamp: 'Just now' });
        return toast;
      })}
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════════════════
   3. WithAction — warning toast with Reload button
══════════════════════════════════════════════════════════════════════════ */

export const WithAction: Story = {
  render: () => {
    const toast = staticToast('warning', {
      message: 'A new version of this page is available.',
      actionLabel: 'Reload',
      dismissible: true,
    });
    toast.onAction = () => alert('Reload action triggered');
    return toast;
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   4. WithTitleAndAction
══════════════════════════════════════════════════════════════════════════ */

export const WithTitleAndAction: Story = {
  render: () => {
    const toast = staticToast('error', {
      title: 'Upload failed',
      message: 'The file exceeds the maximum allowed size of 10 MB.',
      actionLabel: 'Try again',
      timestamp: '2 minutes ago',
      dismissible: true,
    });
    toast.onAction = () => alert('Try again triggered');
    return toast;
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   5. ProviderPositions — all 6 positions
══════════════════════════════════════════════════════════════════════════ */

const POSITIONS = ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'];

export const ProviderPositions: Story = {
  render: () => html`
    <div style="position: relative; height: 480px; border: 1px dashed var(--soSemanticColorBorderDefault); border-radius: 8px; overflow: hidden;">
      <p style="text-align: center; margin-top: 200px; color: var(--soSemanticColorTextSubtle); font-size: 14px;">
        Click a button to spawn a toast at that position
      </p>
      ${POSITIONS.map(
        (pos) => html`
          <so-toast-provider position=${pos} style="position: absolute;"></so-toast-provider>
          <so-button
            variant="outline"
            size="sm"
            style="position: absolute; ${
              pos === 'top-right' ? 'top: 8px; right: 8px;' :
              pos === 'top-left' ? 'top: 8px; left: 8px;' :
              pos === 'top-center' ? 'top: 8px; left: 50%; transform: translateX(-50%);' :
              pos === 'bottom-right' ? 'bottom: 8px; right: 8px;' :
              pos === 'bottom-left' ? 'bottom: 8px; left: 8px;' :
              'bottom: 8px; left: 50%; transform: translateX(-50%);'
            }"
            @so-click=${() => {
              const provider = document.querySelector(`so-toast-provider[position="${pos}"]`) as HTMLElement;
              const toast = document.createElement('so-toast') as SoToast;
              toast.type = 'info';
              toast.message = `Toast from ${pos}`;
              toast.dismissible = true;
              toast.autoDismiss = 3000;
              provider.dispatchEvent(new CustomEvent('so-toast-request', { detail: { toast } }));
            }}
          >${pos}</so-button>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'padded' },
};

/* ══════════════════════════════════════════════════════════════════════════
   6. ProgrammaticDemo — demonstrates SoToast.show()
══════════════════════════════════════════════════════════════════════════ */

export const ProgrammaticDemo: Story = {
  render: () => {
    let toastCount = 0;
    const triggerTypes: Array<SoToast['type']> = ['info', 'success', 'warning', 'error'];

    return html`
      <so-toast-provider position="top-right"></so-toast-provider>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        ${triggerTypes.map(
          (t) => html`
            <so-button
              variant="outline"
              size="sm"
              @so-click=${() => {
                toastCount++;
                SoToast.show({
                  type: t,
                  title: t.charAt(0).toUpperCase() + t.slice(1),
                  message: `This is toast #${toastCount} of type "${t}".`,
                  timestamp: 'Just now',
                  dismissible: true,
                  autoDismiss: 5000,
                });
              }}
            >Show ${t}</so-button>
          `,
        )}
        <so-button
          variant="outline"
          size="sm"
          @so-click=${() => {
            SoToast.show({
              type: 'warning',
              title: 'New version available',
              message: 'Reload to get the latest features.',
              actionLabel: 'Reload',
              onAction: () => alert('Reloading…'),
              autoDismiss: 0,
            });
          }}
        >Show with action</so-button>
      </div>
    `;
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   7. ThemeShowcase — all 6 themes
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
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${TYPES.map((t) => {
                const toast = staticToast(t, { dismissible: false });
                return toast;
              })}
            </div>
          </div>
        `,
      )}
    </div>
  `,
  parameters: { layout: 'fullscreen' },
};
