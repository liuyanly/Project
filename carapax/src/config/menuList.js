
const menuList = {
    List1: [
        {
            name: 'identity',
            iconType: 'person-stalker',
            title: '用户中心',
            groups: [{
                title: '身份认证',
                members: [
                    {name: 'domains', value: '域'},
                    {name: 'projects', value: '项目'},
                    {name: 'users', value: '用户'},
                    {name: 'roles', value: '角色'}
                ]
            }, {
                title: '服务提供商',
                members: [
                    {name: 'services', value: '服务'},
                ]
            }]
        },
        {
            name: 'deviceGateway',
            iconType: 'wrench',
            title: '设备网关',
            groups: [{
                title: '设备管理',
                members: [
                    {name: 'deviceConnect', value: '设备接入'},
                    {name: 'deviceType', value: '设备类型'},
                    {name: 'deviceTag', value: '设备标签'},
                    {name: 'ruleEngine', value: '规则引擎'},
                ]
            }, {
                title: '接入代理管理',
                members: [
                    {name: 'agent', value: 'agent'},
                    {name: 'proxy', value: 'proxy'},
                ]
            }, {
                title: '设备数据',
                members: [
                    {name: 'deviceData', value: '设备数据'},
                ]
            },{
                title: '接入诊断',
                members:[
                    {name:'accessbus', value: '接入总线'},
                    {name:'databus', value: '设备接入总线'},
                    {name:'datarelative', value: '设备关系图'},
                ]
            }]
        },
        {
            name: 'valuka',
            iconType: 'wrench',
            title: '计算平台',
            groups: [{
                title: '文件管理',
                members: [
                    {name: 'script', value: '算法管理'},
                    {name: 'scriptTag', value: '标签管理'},
                ]
            }, {
                title: '作业管理',
                members: [
                    {name: 'onlineJob', value: '在线作业'},
                    {name: 'offlineJobs', value: '离线作业'},
                ]
            }]
        },
        {
            name: 'dispatchCenter',
            iconType: 'arrow-expand',
            title: '调度中心',
            members: [
                {name: 'job', value: '作业管理'},
                {name: 'task', value: '任务管理'},
                {name: 'status', value: '状态管理'},
            ]
        },
        {
            name: 'visualization',
            iconType: 'ios-eye',
            title: '可视化展示',
            members: [
                {name: 'visuality', value: '可视化展示页'}
            ]
        },
        {
            name: 'dataMonitor',
            iconType: 'ios-eye',
            title: '数据监控',
            members: [
                {name: 'dataMonitor', value: '数据监控'},
            ]
        }

    ],
    List2: [
        {
            name: 'identity',
            iconType: 'person-stalker',
            title: '用户中心',
            groups: [{
                title: '身份认证',
                members: [
                    {name: 'projects', value: '项目'},
                    {name: 'roles', value: '角色'}
                ]
            }]
        },
        {
            name: 'deviceGateway',
            iconType: 'wrench',
            title: '设备网关',
            groups: [{
                title: '设备管理',
                members: [
                    {name: 'deviceConnect', value: '设备接入'},
                    {name: 'deviceType', value: '设备类型'},
                    {name: 'deviceTag', value: '设备标签'},
                    {name: 'ruleEngine', value: '规则引擎'},
                ]
            }, {
                title: '接入代理管理',
                members: [
                    {name: 'agent', value: 'agent'},
                    {name: 'proxy', value: 'proxy'},
                ]
            }, {
                title: '设备数据',
                members: [
                    {name: 'deviceData', value: '设备数据'},
                ]
            }, {
                title: '接入诊断',
                members:[
                    {name:'accessbus', value: '接入总线'},
                    {name:'databus', value: '设备接入总线'}
                ]
            }]
        },
        {
            name: 'valuka',
            iconType: 'wrench',
            title: '计算平台',
            groups: [{
                title: '文件管理',
                members: [
                    {name: 'script', value: '算法管理'},
                    {name: 'scriptTag', value: '标签管理'},
                ]
            }, {
                title: '作业管理',
                members: [
                    {name: 'onlineJob', value: '在线作业'},
                    {name: 'offlineJobs', value: '离线作业'},
                ]
            }]
        },
        {
            name: 'dispatchCenter',
            iconType: 'arrow-expand',
            title: '调度中心',
            members: [
                {name: 'job', value: '作业管理'},
                {name: 'task', value: '任务管理'},
                {name: 'status', value: '状态管理'},
            ]
        },
        {
            name: 'visualization',
            iconType: 'ios-eye',
            title: '可视化展示',
            members: [
                {name: 'visuality', value: '可视化展示页'}
            ]
        },
        {
            name: 'dataMonitor',
            iconType: 'ios-eye',
            title: '数据监控',
            members: [
                {name: 'dataMonitor', value: '数据监控'},
            ]
        }
    ],
    List3: [
        {
            name: 'deviceGateway',
            iconType: 'wrench',
            title: '设备网关',
            groups: [{
                title: '设备管理',
                members: [
                    {name: 'deviceConnect', value: '设备接入'},
                    {name: 'deviceType', value: '设备类型'},
                    {name: 'deviceTag', value: '设备标签'},
                    {name: 'ruleEngine', value: '规则引擎'},
                ]
            }, {
                title: '接入代理管理',
                members: [
                    {name: 'agent', value: 'agent'},
                    {name: 'proxy', value: 'proxy'},
                ]
            }, {
                title: '设备数据',
                members: [
                    {name: 'deviceData', value: '设备数据'},
                ]
            }, {
                title: '接入诊断',
                members:[
                    {name:'accessbus', value: '接入总线'},
                    {name:'databus', value: '设备接入总线'}
                ]
            }]
        },
        {
            name: 'valuka',
            iconType: 'wrench',
            title: '计算平台',
            groups: [{
                title: '文件管理',
                members: [
                    {name: 'script', value: '算法管理'},
                    {name: 'scriptTag', value: '标签管理'},
                ]
            }, {
                title: '作业管理',
                members: [
                    {name: 'onlineJob', value: '在线作业'},
                    {name: 'offlineJobs', value: '离线作业'},
                ]
            }]
        },
        {
            name: 'dispatchCenter',
            iconType: 'arrow-expand',
            title: '调度中心',
            members: [
                {name: 'job', value: '作业管理'},
                {name: 'task', value: '任务管理'},
                {name: 'status', value: '状态管理'},
            ]
        },
        {
            name: 'visualization',
            iconType: 'ios-eye',
            title: '可视化展示',
            members: [
                {name: 'visuality', value: '可视化展示页'}
            ]
        },
        {
            name: 'dataMonitor',
            iconType: 'ios-eye',
            title: '数据监控',
            members: [
                {name: 'dataMonitor', value: '数据监控'},
            ]
        }
    ]
};

export default menuList;
