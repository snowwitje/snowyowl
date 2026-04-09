import type { StorybookConfig } from '@storybook/web-components-vite';
import path from 'path';

// __dirname = apps/storybook/.storybook/
// ../../../  = snowyowl/ (monorepo root)

const config: StorybookConfig = {
  stories: [
    '../../../packages/components/src/**/*.stories.ts',
    '../../../packages/icons/src/**/*.stories.ts',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

staticDirs: [{ from: '../../../packages/icons/', to: '/' }],

  docs: { autodocs: 'tag' },

  async viteFinal(config) {
    config.resolve = config.resolve ?? {};

    // Resolve workspace packages to source — no pre-build needed in dev
    const aliases = config.resolve.alias;
    const existingAliases = Array.isArray(aliases)
      ? aliases
      : Object.entries(aliases ?? {}).map(([find, replacement]) => ({ find, replacement }));

    config.resolve.alias = [
      ...existingAliases,
      {
        find: '@snowyowl/components',
        replacement: path.resolve(__dirname, '../../../packages/components/src'),
      },
      {
        find: '@snowyowl/icons',
        replacement: path.resolve(__dirname, '../../../packages/icons/src'),
      },
    ];

    // Compile Lit's @customElement / @property decorators to legacy form via
    // esbuild's tsconfigRaw option. This is needed because:
    //   - Stage 3 native decorators require Chrome 130+ / Safari 18+
    //   - esbuild 0.21.x won't accept `experimentalDecorators` as a top-level
    //     transform() option, but WILL honour it inside tsconfigRaw
    //   - Lit 3.x supports both decorator modes transparently
    config.esbuild = {
      ...config.esbuild,
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
          useDefineForClassFields: false,
        },
      },
    };

    return config;
  },
};

export default config;
