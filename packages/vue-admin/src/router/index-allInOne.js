import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: import('@/views/Home/Index.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/About/Index.vue')
        },
        {
            path: '/vscroll',
            name: 'vscroll',
            component: () => import('../views/Vscroll/Index.vue')
        },
        {
            path: '/demo',
            name: 'demo',
            component: () => import('../views/Demo/Index.vue')
        },
        {
            path: '/vscrollNew',
            name: 'vscrollNew',
            component: () => import('../views/VScrollNew.vue')
        },
        {
            path: '/puppeteer',
            name: 'puppeteer',
            component: () => import('../views/Puppeteer.vue')
        }
    ]
})

export default router
