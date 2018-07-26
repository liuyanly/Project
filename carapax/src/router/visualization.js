export default [
    {
        path: '/visuality',
        component: resolve => require(['../pages/visualization/visuality.vue'], resolve),
        meta: { type: "visualization", activeName: '/visuality' }
    },
]
