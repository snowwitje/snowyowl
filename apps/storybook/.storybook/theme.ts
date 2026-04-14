import { create } from '@storybook/theming/create';

// SnowyOwl Storybook UI theme
// Uses primitive color values directly since the manager frame
// doesn't load our token CSS files.
//
// mauve.600 = #6F5A7E  (brand primary)
// mauve.800 = #433c4a  (dark text)
// mauve.50  = #f6f3f5  (sidebar bg)
// sand.50   = #faf7f5  (canvas bg)
// mauve.200 = #ddd0d7  (borders)

export default create({
  base: 'light',

  // Brand
  brandTitle: 'SnowyOwl',
  brandUrl: 'https://snowwitje.github.io/snowyowl/',
  brandImage: '/assets/snowyowl-storybook.svg',   // served via staticDirs
  brandTarget: '_self',

  // App chrome (sidebar + toolbar)
  appBg: '#faf7f5',              // --soColorSand50
  appContentBg: '#f9fafb',
  appPreviewBg: '#ffffff',
  appBorderColor: '#ede0d8',     // --soColorSand200
  appBorderRadius: 8,

  // Typography
  fontBase: "'Geologica', system-ui, sans-serif",
  fontCode: "'JetBrains Mono', 'Fira Code', monospace",

  // Text
  textColor: '#1f2937',          // --soColorNeutral800
  textMutedColor: '#4b5563',     // --soColorNeutral600
  textInverseColor: '#ffffff',

  // Toolbar
  barTextColor: '#4b5563',
  barHoverColor: '#6f5a7e',
  barSelectedColor: '#6f5a7e',
  barBg: '#ffffff',

  // Inputs
  inputBg: '#ffffff',
  inputBorder: '#ede0d8',
  inputTextColor: '#1f2937',
  inputBorderRadius: 8,

  // Color
  colorPrimary: '#6F5A7E',      // mauve.600
  colorSecondary: '#6f5a7e',
});
