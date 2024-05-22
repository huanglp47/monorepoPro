const HomeRoutes = [
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About/Index.vue')
    },
];

export default HomeRoutes;