import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        minify: false,
        rollupOptions: {
            output: {
                dir: 'dist',
                format: 'module',
                entryFileNames: 'index.mjs',
            }
        }
    }
})
