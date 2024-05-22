// src/router/routes/Home.js
const HomeRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home/Index.vue')
    },
    {
        path: '/puppeteer',
        name: 'puppeteer',
        component: () => import('@/views/Puppeteer.vue')
    }
    // ... 其他Home模块的路由
];

export default HomeRoutes;