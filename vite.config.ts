import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env);
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'lib/anchor.ts'),
        name: 'comfyui-anchors',
        formats: ['es'],
        fileName: `comfyui-anchors`,
      },
      rollupOptions: {
        external: [new RegExp('\\.\\./\\.\\./(?!ComfyUI)')],
      },
    },

    resolve: {
      alias: [{ find: /.+\/ComfyUI\/web\/(.*)/, replacement: '../../$1' }],
    },

    plugins: [dts({ include: ['lib'], exclude: ['ComfyUI/**'] })],
  };
});
