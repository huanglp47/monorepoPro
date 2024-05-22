import {createRouter, createWebHistory} from 'vue-router'

// （只适用于webpack）,使用require.context自动导入router/routes/下的所有路由文件
// const routesContext = require.context('./routes', true, /\.js$/)
const modules = import.meta.globEager('./routes/**/*.js');
const routes = []

Object.keys(modules).forEach(key => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routes.push(...modList);
})

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
