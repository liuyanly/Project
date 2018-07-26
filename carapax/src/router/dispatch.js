export default [
	{
        path: '/job',
        component: resolve => require(['../pages/dispatchCenter/job/Job.vue'], resolve),
        meta: { type: "dispatchCenter", activeName: '/job' }
    },
    {
        path: '/jobInfo',
        component: resolve => require(['../pages/dispatchCenter/job/JobInfo.vue'], resolve),
        meta: { type: "dispatchCenter", activeName: '/job' }
    },
    {
        path: '/task',
        component: resolve => require(['../pages/dispatchCenter/task/Task.vue'], resolve),
        meta: { type: "dispatchCenter", activeName: '/task' }
    },
    {
        path: '/taskInfo',
        component: resolve => require(['../pages/dispatchCenter/task/TaskInfo.vue'], resolve),
        meta: { type: "dispatchCenter", activeName: '/task' }
    },
    {
        path: '/status',
        component: resolve => require(['../pages/dispatchCenter/Status.vue'], resolve),
        meta: { type: "dispatchCenter", activeName: '/status' }
    },
]
