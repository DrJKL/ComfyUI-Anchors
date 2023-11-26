import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/anchor.ts'),
            name: 'comfyui-anchors',
            fileName: `comfyui-anchors`
        }
    }
});