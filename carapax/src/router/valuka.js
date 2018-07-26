export default [
	{
        path: '/script',
        component: resolve => require(['../pages/valuka/script/fileManage/script.vue'], resolve),
        meta: { type: "valuka", activeName: '/script' }
    },
    {
        path: '/scriptInfo',
        component: resolve => require(['../pages/valuka/script/fileManage/scriptInfo.vue'], resolve),
        meta: { type: "valuka", activeName: '/script' }
    },
    {
        path: '/scriptTag',
        component: resolve => require(['../pages/valuka/script/tagManage/scriptTag.vue'], resolve),
        meta: { type: "valuka", activeName: '/scriptTag' }
    },
    {
        path: '/scriptTagInfo',
        component: resolve => require(['../pages/valuka/script/tagManage/scriptTagInfo.vue'], resolve),
        meta: { type: "valuka", activeName: '/scriptTag' }
    },
    {
        path: '/onlineJob',
        component: resolve => require(['../pages/valuka/job/onlineJob/onlineJob.vue'], resolve),
        meta: { type: "valuka", activeName: '/onlineJob' }
    },
    {
        path: '/onlineJobInfo',
        component: resolve => require(['../pages/valuka/job/onlineJob/onlineJobInfo.vue'], resolve),
        meta: { type: "valuka", activeName: '/onlineJob' }
    },
    
    {
      path: '/offlineJobs',
      component: resolve => require(['../pages/valuka/job/offlineJobs.vue'], resolve),
      meta: { type: "valuka", activeName: '/offlineJobs' }
    },
    {
        path: '/offlineJobInfo',
        component: resolve => require(['../pages/valuka/job/offlineJobInfo.vue'], resolve),
        meta: { type: "valuka", activeName: '/offlineJobs' }
    }
];