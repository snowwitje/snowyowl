import type { Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';
import '@snowyowl/components/components/form';
import '@snowyowl/components/components/input';
import '@snowyowl/components/components/button';
import '@snowyowl/components/components/checkbox';
import '@snowyowl/components/components/divider';

const meta: Meta = {
  title: 'Examples/Login Form',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A login form built entirely from SnowyOwl components — \`so-form\`, \`so-input\`,
\`so-checkbox\`, and \`so-button\`. No custom CSS required beyond layout wrappers.

The card shell uses only semantic tokens (\`--soSemanticColorSurfaceDefault\`,
\`--soSemanticRadiusContainer\`, \`--soSemanticShadowContainer\`) so it adapts
automatically to any theme. Use the **Theme** toolbar to preview all six themes.
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

/* ── Card shell ─────────────────────────────────────────────────────────────
   All values reference semantic tokens so the card adapts to every theme.
──────────────────────────────────────────────────────────────────────────── */
function card(content: TemplateResult) {
  return html`
    <div style="
      width: 380px;
      box-sizing: border-box;
      padding: 40px;
      background: var(--soSemanticColorSurfaceDefault);
      border: 1px solid var(--soSemanticColorBorderDefault);
      border-radius: var(--soSemanticRadiusContainer);
      box-shadow: var(--soSemanticShadowContainer);
    ">
      ${content}
    </div>
  `;
}

/* ── Brand header ───────────────────────────────────────────────────────────
   Logo + title + subtitle centered above the form.
──────────────────────────────────────────────────────────────────────────── */
const brandHeader = html`
  <div style="text-align: center; margin-bottom: 32px;">
    <div style="
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    ">
      <img src="/assets/snowyowl.svg" alt="" width="28" height="28" />
      <span style="
        font-size: var(--soSemanticTextStyleHeadingSmFontSize);
        font-weight: var(--soSemanticTextStyleHeadingSmFontWeight);
        color: var(--soSemanticColorTextDefault);
        font-family: inherit;
      ">SnowyOwl</span>
    </div>
    <p style="
      margin: 0;
      font-size: var(--soSemanticTextStyleBodySmFontSize);
      color: var(--soSemanticColorTextSubtle);
    ">Sign in to your account</p>
  </div>
`;

/* ── Footer CTA ─────────────────────────────────────────────────────────── */
const footerCta = html`
  <p style="
    margin: 24px 0 0;
    text-align: center;
    font-size: var(--soSemanticTextStyleBodySmFontSize);
    color: var(--soSemanticColorTextSubtle);
  ">
    Don't have an account?&nbsp;
    <a
      href="#"
      style="color: var(--soSemanticColorInteractivePrimary); text-decoration: none;"
      @click=${(e: Event) => e.preventDefault()}
    >Sign up</a>
  </p>
`;

/* ── Row: remember me + forgot password ─────────────────────────────────── */
const rememberRow = html`
  <div style="
    display: flex;
    justify-content: space-between;
    align-items: center;
  ">
    <so-checkbox label="Remember me"></so-checkbox>
    <a
      href="#"
      style="
        font-size: var(--soSemanticTextStyleBodySmFontSize);
        color: var(--soSemanticColorInteractivePrimary);
        text-decoration: none;
      "
      @click=${(e: Event) => e.preventDefault()}
    >Forgot password?</a>
  </div>
`;

/* ══════════════════════════════════════════════════════════════════════════
   1. Default — clean form, no values pre-filled
══════════════════════════════════════════════════════════════════════════ */

export const Default: Story = {
  render: () => card(html`
    ${brandHeader}
    <so-form>
      <so-input
        label="Email"
        type="email"
        placeholder="you@example.com"
        autocomplete="email"
      ></so-input>
      <so-input
        label="Password"
        type="password"
        placeholder="Enter your password"
        autocomplete="current-password"
      ></so-input>
      ${rememberRow}
      <so-button type="submit" full-width>Sign in</so-button>
    </so-form>
    ${footerCta}
  `),
};

/* ══════════════════════════════════════════════════════════════════════════
   2. Validation Errors — both fields show inline error messages
══════════════════════════════════════════════════════════════════════════ */

export const ValidationErrors: Story = {
  name: 'Validation Errors',
  parameters: {
    docs: {
      description: {
        story: 'Both fields carry pre-set `error-text` values. The `so-input` component renders the error message below the field and switches the border to `--soSemanticColorStatusError`.',
      },
    },
  },
  render: () => card(html`
    ${brandHeader}
    <so-form>
      <so-input
        label="Email"
        type="email"
        value="not-an-email"
        error-text="Please enter a valid email address."
      ></so-input>
      <so-input
        label="Password"
        type="password"
        value="abc"
        error-text="Password must be at least 8 characters."
      ></so-input>
      ${rememberRow}
      <so-button type="submit" full-width>Sign in</so-button>
    </so-form>
    ${footerCta}
  `),
};

/* ══════════════════════════════════════════════════════════════════════════
   3. Loading — form submitting; so-form renders a loader overlay
══════════════════════════════════════════════════════════════════════════ */

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `loading` prop on `so-form` renders a `so-loader` overlay and marks the native `<form>` as `inert`, blocking all interaction.',
      },
    },
  },
  render: () => card(html`
    ${brandHeader}
    <so-form loading>
      <so-input
        label="Email"
        type="email"
        value="me@example.com"
        autocomplete="email"
      ></so-input>
      <so-input
        label="Password"
        type="password"
        value="••••••••"
        autocomplete="current-password"
      ></so-input>
      ${rememberRow}
      <so-button type="submit" full-width disabled>Sign in</so-button>
    </so-form>
    ${footerCta}
  `),
};
