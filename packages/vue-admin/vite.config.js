import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ mode })=>{
    const config = loadEnv(mode, './')

    // console.log(11111111111)
    // console.log(mode)
    // console.log(config)
    // console.log(22222222222)
    // console.log(process.env.NODE_ENV)

    let plugins = [vue()]
    plugins.push(
        viteMockServe({
            supportTs: true,
            logger: false,
            mockPath: "./mock/", // 文件位置
            localEnabled: config.VITE_USE_MOCK==='false'? false : true
        })
    )
    return {
        plugins: plugins,
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
    }
})