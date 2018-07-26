export default [
	{
        path: '/deviceConnect',
        component: resolve => require(['../pages/deviceGateway/deviceManage/deviceConnect/DeviceConnect.vue'], resolve),
        meta: { type: "deviceGateway", activeName: '/deviceConnect' }
    },
    {
        path: '/deviceInfo',
        component: resolve => require(['../pages/deviceGateway/deviceManage/deviceConnect/DeviceInfo.vue'], resolve),
        meta: { type: "deviceGateway", activeName: '/deviceConnect' }
    },
    {
        path: '/deviceType',
        component: resolve => require(['../pages/deviceGateway/deviceManage/deviceType/DeviceType.vue'], resolve),
        meta: { type: "deviceGateway", activeName: '/deviceType' }
    },
    {
        path: '/deviceTypeInfo',
        component: resolve => require(['../pages/deviceGateway/deviceManage/deviceType/DeviceTypeInfo.vue'], resolve),
        meta: { type: "deviceGateway", activeName: '/deviceType' }
    },
    {
        path: '/deviceTag',
        component: resolve => require(['../pages/deviceGateway/deviceManage/deviceTag/deviceTag.vue'], resolve),
        meta: { type: "deviceGateway", activeName: '/deviceTag' }
    },
    {
        path: '/deviceTagInfo',
        component: resolve => require(['../pages/deviceGateway/deviceManage/deviceTag/deviceTagInfo.vue'], resolve),
        meta: { type: "deviceGateway", activeName: '/deviceTag' }
    },
    {
        path: '/deviceLog',
        component: resolve => require(['../pages/deviceGateway/deviceManage/DeviceLog.vue'], resolve),
        meta: { type: "deviceGateway", activeName: '/deviceLog' }
    },
    {
        path: '/ruleEngine',
        component: resolve => require(['../pages/deviceGateway/deviceManage/RuleEngine.vue'], resolve),
        meta: { type: "deviceGateway", activeName: '/ruleEngine' }
    },
    {
        path: '/agent',
        component: resolve => require(['../pages/deviceGateway/connectManage/agent/Agent.vue'], resolve),
        meta: { type: "deviceGateway", activeName: '/agent' }
    },
    {
        path: '/agentInfo',
        component: resolve => require(['../pages/deviceGateway/connectManage/agent/AgentInfo.vue'], resolve),
        meta: { type: "deviceGateway", activeName: '/agent' }
    },
    {
        path: '/proxy',
        component: resolve => require(['../pages/deviceGateway/connectManage/proxy/Proxy.vue'], resolve),
        meta: { type: "deviceGateway", activeName: '/proxy' }
    },
    {
        path: '/proxyInfo',
        component: resolve => require(['../pages/deviceGateway/connectManage/proxy/ProxyInfo.vue'], resolve),
        meta: { type: "deviceGateway", activeName: '/proxy' }
    },
    {
        path: '/deviceData',
        component: resolve => require(['../pages/deviceGateway/deviceData/deviceData.vue'], resolve),
        meta: { type: "deviceGateway", activeName: '/deviceData' }
    },
    {
        path: '/accessbus',
        component: resolve => require(['../pages/deviceGateway/connectManage/proxy/Proxy.vue'], resolve),
        meta: { type: "flowView", activeName: '/accessbus' }

    },
    {
        path: '/databus',
        component: resolve => require(['../pages/deviceGateway/flowView/databus.vue'], resolve),
        meta: { type: "flowView", activeName: '/databus' }
    },
    {
        path: '/datarelative',
        component: resolve => require(['../pages/deviceGateway/flowView/datarelative.vue'], resolve),
        meta: { type: "flowView", activeName: '/datarelative' }
    }
];
