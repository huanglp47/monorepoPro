import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
            // '@': path.resolve(__dirname, './src'),
        }
    },
    server: {
        // Listening on all local IPs
        host: true,
        port: 80,
        // Load proxy configuration from .env
        proxy: {
            '/pc': {
                // target: 'https://hn.algolia.com/api',
                target: 'https://goblin.hupu.com/pc',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/pc/, '')
            },
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import (reference) "${path.resolve("./src/assets/less/base.less")}";`,
                },
                javascriptEnabled: true,
            },
        },
    },
})
