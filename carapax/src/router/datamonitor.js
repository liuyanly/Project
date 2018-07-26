export default [
    {
        path: '/dataMonitor',
        component: resolve => require(['../pages/dataMonitor/dataMonitor.vue'], resolve),
        meta: { type: "dataMonitor", activeName: '/dataMonitor' }
    },
]
