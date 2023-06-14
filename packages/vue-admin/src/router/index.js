import {createRouter, createWebHistory} from 'vue-router'
import AppView from '../views/AppView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/vscroll',
            name: 'vscroll',
            component: () => import('../views/VScroll.vue')
        },
        {
            path: '/puppeteer',
            name: 'puppeteer',
            component: () => import('../views/Puppeteer.vue')
        }
    ]
})

export default router
