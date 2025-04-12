import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: {
        configFile: 'vite.config.ts',
      },
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3001',
    supportFile: false,
  },
});
