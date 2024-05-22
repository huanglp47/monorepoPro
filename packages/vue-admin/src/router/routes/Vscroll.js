const HomeRoutes = [
    {
        path: '/vscroll',
        name: 'vscroll',
        component: () => import('@/views/Vscroll/Index.vue')
    },
    {
        path: '/vscrollNew',
        name: 'vscrollNew',
        component: () => import('@/views/VScrollNew.vue')
    },
];

export default HomeRoutes;