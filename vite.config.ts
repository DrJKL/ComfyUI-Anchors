import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/anchor.ts'),
      name: 'comfyui-anchors',
      fileName: `comfyui-anchors`,
    },
    rollupOptions: {
      external: ['../../../scripts/app.js', '../../../scripts/api.js'],
      output: {
        globals: {
          '../../../scripts/app.js': 'ComfyApp',
        },
      },
    },
  },
  plugins: [dts()],
});
