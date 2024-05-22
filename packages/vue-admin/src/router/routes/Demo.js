const HomeRoutes = [
    {
        path: '/demo',
        name: 'demo',
        component: () => import('@/views/Demo/Index.vue')
    },
];

export default HomeRoutes;