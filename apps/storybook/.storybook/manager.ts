// apps/storybook/.storybook/manager.ts
import { addons } from '@storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme,
  sidebar: {
    // Keep the Components root expanded on first load.
    // An empty collapsedRoots array means nothing is collapsed by default.
    collapsedRoots: [],
  },
});