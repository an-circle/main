import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    hd: { rules: [] },
    rtl: true,
    logo: '/images/logo.png',
    footer: 'Open-source MIT Licensed | Copyright © 2019-present',
  },
});
