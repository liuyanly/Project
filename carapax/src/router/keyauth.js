export default [
    {
        path: '/domains',
        component: resolve => require(['../pages/identity/domain/Domains.vue'], resolve),
        meta: { type: "identity", activeName: '/domains' }
    },
    {
        path: '/domainInfo',
        component: resolve => require(['../pages/identity/domain/domainInfo.vue'], resolve),
        meta: { type: "identity", activeName: '/domains' }
    },
    {
        path: '/projects',
        component: resolve => require(['../pages/identity/project/Projects.vue'], resolve),
        meta: { type: "identity", activeName: '/projects' }
    },
    {
      path: '/projectsInfo',
      component: resolve => require(['../pages/identity/project/projectsInfo.vue'], resolve),
      meta: { type: "identity", activeName: '/projects' }
    },
    {
        path: '/users',
        component: resolve => require(['../pages/identity/user/Users.vue'], resolve),
        meta: { type: "identity", activeName: '/users' }
    },
    {
        path: '/userInfo',
        component: resolve => require(['../pages/identity/user/UserInfo.vue'], resolve),
        meta: { type: "identity", activeName: '/users' }
    },
    {
        path: '/roles',
        component: resolve => require(['../pages/identity/role/Roles.vue'], resolve),
        meta: { type: "identity", activeName: '/roles' }
    },
    {
        path: '/roleInfo',
        component: resolve => require(['../pages/identity/role/roleInfo.vue'], resolve),
        meta: { type: "identity", activeName: '/roles' }
    },
    {
        path: '/services',
        component: resolve => require(['../pages/identity/service/Services.vue'], resolve),
        meta: { type: "identity", activeName: '/services' }
    },
    {
      path: '/servicesInfo',
      component: resolve => require(['../pages/identity/service/ServicesInfo.vue'], resolve),
      meta: { type: "identity", activeName: '/services' }
    }
];