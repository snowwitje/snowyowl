import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@snowyowl/components/components/modal';
import '@snowyowl/components/components/button';
import '@snowyowl/components/components/tabs';

const THEMES = ['light', 'dark', 'light-sharp', 'dark-sharp', 'light-elevated', 'dark-elevated'];

/* ── Helpers ─────────────────────────────────────────────────────────────── */

/** Returns open/close handlers bound to a modal by DOM id. */
function modalControls(id: string) {
  const open = () => {
    const m = document.getElementById(id) as HTMLElement & { open: boolean };
    if (m) m.open = true;
  };
  const close = () => {
    const m = document.getElementById(id) as HTMLElement & { open: boolean };
    if (m) m.open = false;
  };
  return { open, close };
}

const LOREM =
  'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.';

const LOREM_LONG = `${LOREM}

Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

${LOREM}

Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper.

${LOREM}

Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod.`;

/* ── Meta ─────────────────────────────────────────────────────────────────── */

const meta: Meta = {
  title: 'Composite/Modal',
  component: 'so-modal',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj;

/* ══════════════════════════════════════════════════════════════════════════
   1. Default
══════════════════════════════════════════════════════════════════════════ */

export const Default: Story = {
  render: () => {
    const { open, close } = modalControls('modal-default');
    return html`
      <so-button variant="primary" @so-click=${open}>Open Modal</so-button>

      <so-modal id="modal-default" title="Confirm action" size="md">
        <p style="margin: 0">${LOREM}</p>

        <so-button slot="footer" variant="outline" @so-click=${close}>Cancel</so-button>
        <so-button slot="footer" variant="primary" @so-click=${close}>Confirm</so-button>
      </so-modal>
    `;
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   2. Sizes
══════════════════════════════════════════════════════════════════════════ */

export const Sizes: Story = {
  render: () => {
    const sizes: Array<{ size: string; label: string; desc: string }> = [
      { size: 'sm', label: 'Small (480px)', desc: 'Confirmation dialogs and alerts.' },
      { size: 'md', label: 'Medium (640px)', desc: 'Default — forms and standard dialogs.' },
      { size: 'lg', label: 'Large (800px)', desc: 'Complex forms and multi-section content.' },
      { size: 'fullscreen', label: 'Fullscreen', desc: 'Immersive tasks. No border-radius.' },
    ];

    return html`
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        ${sizes.map(({ size, label }) => {
          const id = `modal-size-${size}`;
          const { open, close } = modalControls(id);
          return html`
            <so-button variant="outline" @so-click=${open}>${label}</so-button>
            <so-modal id=${id} .size=${size as any} title=${label}>
              <p style="margin: 0">${sizes.find(s => s.size === size)?.desc} ${LOREM}</p>
              <so-button slot="footer" variant="outline" @so-click=${close}>Cancel</so-button>
              <so-button slot="footer" variant="primary" @so-click=${close}>OK</so-button>
            </so-modal>
          `;
        })}
      </div>
    `;
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   3. With Subtitle
══════════════════════════════════════════════════════════════════════════ */

export const WithSubtitle: Story = {
  render: () => {
    const { open, close } = modalControls('modal-subtitle');
    return html`
      <so-button variant="primary" @so-click=${open}>Open Modal</so-button>

      <so-modal
        id="modal-subtitle"
        title="Delete project"
        subtitle="This action cannot be undone."
        size="md"
      >
        <p style="margin: 0">
          Deleting <strong>My Project</strong> will permanently remove all associated data,
          including files, settings, and collaborator access. ${LOREM}
        </p>

        <so-button slot="footer" variant="outline" @so-click=${close}>Cancel</so-button>
        <so-button slot="footer" variant="danger" @so-click=${close}>Delete project</so-button>
      </so-modal>
    `;
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   4. Prevent Close
══════════════════════════════════════════════════════════════════════════ */

export const PreventClose: Story = {
  render: () => {
    const id = 'modal-prevent-close';
    const open = () => {
      const m = document.getElementById(id) as HTMLElement & { open: boolean };
      if (m) m.open = true;
    };
    const acknowledge = () => {
      const m = document.getElementById(id) as HTMLElement & { open: boolean };
      if (m) m.open = false;
    };

    return html`
      <so-button variant="danger" @so-click=${open}>Open Blocking Modal</so-button>

      <so-modal
        id=${id}
        title="Terms of service"
        size="sm"
        prevent-close
      >
        <p style="margin: 0">
          You must review and accept the terms before continuing. This dialog cannot be
          dismissed with Escape or by clicking the backdrop — you must take an explicit action
          below.
        </p>

        <so-button slot="footer" variant="primary" @so-click=${acknowledge}>
          I accept the terms
        </so-button>
      </so-modal>
    `;
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   5. Close on Backdrop Disabled
══════════════════════════════════════════════════════════════════════════ */

export const CloseOnBackdropDisabled: Story = {
  render: () => {
    const { open, close } = modalControls('modal-no-backdrop-close');
    return html`
      <so-button variant="primary" @so-click=${open}>Open Modal</so-button>

      <so-modal
        id="modal-no-backdrop-close"
        title="Close-on-backdrop disabled"
        size="md"
        close-on-backdrop-click="false"
      >
        <p style="margin: 0">
          Clicking outside this modal will not close it. Use the close button (×) in the
          header, or press Escape, or click Cancel below.
        </p>

        <so-button slot="footer" variant="outline" @so-click=${close}>Cancel</so-button>
        <so-button slot="footer" variant="primary" @so-click=${close}>Save</so-button>
      </so-modal>
    `;
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   6. Loading
══════════════════════════════════════════════════════════════════════════ */

export const Loading: Story = {
  render: () => {
    const id = 'modal-loading';
    const open = () => {
      const m = document.getElementById(id) as HTMLElement & {
        open: boolean;
        loading: boolean;
      };
      if (!m) return;
      m.loading = false;
      m.open = true;

      // Simulate async operation
      setTimeout(() => {
        m.loading = true;
        setTimeout(() => {
          m.loading = false;
        }, 2500);
      }, 800);
    };
    const close = () => {
      const m = document.getElementById(id) as HTMLElement & { open: boolean };
      if (m) m.open = false;
    };

    return html`
      <so-button variant="primary" @so-click=${open}>Open (triggers loading demo)</so-button>

      <so-modal id=${id} title="Saving changes" size="md">
        <p style="margin: 0">
          Your changes are being saved. The loading overlay appears briefly after opening to
          demonstrate the state — body content remains below the scrim.
        </p>

        <so-button slot="footer" variant="outline" @so-click=${close}>Cancel</so-button>
        <so-button slot="footer" variant="primary" @so-click=${close}>Save</so-button>
      </so-modal>
    `;
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   7. Long Content (internal scroll)
══════════════════════════════════════════════════════════════════════════ */

export const LongContent: Story = {
  render: () => {
    const { open, close } = modalControls('modal-long');
    return html`
      <so-button variant="primary" @so-click=${open}>Open Modal</so-button>

      <so-modal id="modal-long" title="Terms & conditions" size="md">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <p style="margin: 0">${LOREM_LONG}</p>
          <p style="margin: 0">${LOREM_LONG}</p>
        </div>

        <so-button slot="footer" variant="outline" @so-click=${close}>Decline</so-button>
        <so-button slot="footer" variant="primary" @so-click=${close}>Accept</so-button>
      </so-modal>
    `;
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   8. Fullscreen (with tabs in body)
══════════════════════════════════════════════════════════════════════════ */

export const Fullscreen: Story = {
  render: () => {
    const { open, close } = modalControls('modal-fullscreen');
    return html`
      <so-button variant="primary" @so-click=${open}>Open Fullscreen</so-button>

      <so-modal id="modal-fullscreen" title="Project settings" size="fullscreen">
        <div style="display: flex; flex-direction: column; gap: 16px;">
         <so-tabs variant="line" active-tab="a1">
                <so-tab tab-id="a1" label="Selected"></so-tab>
                <so-tab tab-id="a2" label="Tab"></so-tab>
                <so-tab tab-id="a3" label="Tab"></so-tab>
          </so-tabs>
          <p style="margin: 0">${LOREM_LONG}</p>
        </div>

        <so-button slot="footer" variant="outline" @so-click=${close}>Cancel</so-button>
        <so-button slot="footer" variant="primary" @so-click=${close}>Save changes</so-button>
      </so-modal>
    `;
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   9. Theme Showcase
   Renders the modal dialog shell statically (not as a live overlay) so all
   six themes can be compared side by side without stacking fixed-position
   elements on top of each other.
══════════════════════════════════════════════════════════════════════════ */

const themeShell = (theme: string) => html`
  <div
    data-theme=${theme}
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    "
  >
    <div
      style="
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--soSemanticColorTextSubtle, #6b7280);
        font-family: monospace;
      "
    >
      ${theme}
    </div>
    <!-- Static dialog shell — not a live overlay -->
    <div
      style="
        background: var(--soSemanticColorSurfaceOverlay);
        border-radius: var(--soSemanticRadiusContainer);
        box-shadow: var(--soSemanticShadowOverlay);
        width: 320px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        border: 1px solid var(--soSemanticColorBorderSubtle);
      "
    >
      <!-- Header -->
      <div
        style="
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 16px 16px 16px 20px;
          border-bottom: 1px solid var(--soSemanticColorBorderSubtle);
        "
      >
        <div>
          <div
            style="
              font-size: var(--soSemanticTextStyleHeadingSmFontSize);
              font-weight: var(--soSemanticTextStyleHeadingSmFontWeight);
              line-height: var(--soSemanticTextStyleHeadingSmLineHeight);
              color: var(--soSemanticColorTextDefault);
              font-family: var(--soSemanticTypographyFamilyBody, system-ui, sans-serif);
            "
          >
            Modal title
          </div>
          <div
            style="
              margin-top: 4px;
              font-size: var(--soSemanticTextStyleLabelLgFontSize);
              font-weight: var(--soSemanticTextStyleLabelLgFontWeight);
              color: var(--soSemanticColorTextSubtle);
              font-family: var(--soSemanticTypographyFamilyBody, system-ui, sans-serif);
            "
          >
            Optional subtitle
          </div>
        </div>
        <so-button variant="ghost" icon-only label="Close">
          <so-icon slot="prefix" name="close-thin" decorative></so-icon>
        </so-button>
      </div>

      <!-- Body -->
      <div
        style="
          padding: 20px;
          font-size: var(--soSemanticTextStyleBodyMdFontSize);
          font-weight: var(--soSemanticTextStyleBodyMdFontWeight);
          line-height: var(--soSemanticTextStyleBodyMdLineHeight);
          color: var(--soSemanticColorTextDefault);
          font-family: var(--soSemanticTypographyFamilyBody, system-ui, sans-serif);
        "
      >
        Dialog body content goes here. Scrollable when content overflows.
      </div>

      <!-- Footer -->
      <div
        style="
          display: flex;
          gap: 8px;
          justify-content: flex-end;
          padding: 16px 20px;
          border-top: 1px solid var(--soSemanticColorBorderSubtle);
        "
      >
        <so-button variant="outline" >Cancel</so-button>
        <so-button variant="primary" >Confirm</so-button>
      </div>
    </div>
  </div>
`;

export const ThemeShowcase: Story = {
  render: () => html`
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        padding: 24px;
        align-items: flex-start;
      "
    >
      ${THEMES.map(theme => themeShell(theme))}
    </div>
  `,
};
