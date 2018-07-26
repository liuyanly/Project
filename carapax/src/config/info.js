import { Icon } from 'iview';

import util from '../util/util';

const keyauth = {
    domainInfo: [
        [
            {label: '公司名称:', value: 'verbose'},
            {label: '域ID:', value: 'domain_id'},
            {label: '可用性:', value: 'enabled',
                render: (h, params) => {
                    const type = params.data.enabled ? "checkmark-circled" : "android-cancel";
                    const color = params.data.enabled ? '#19be6b' : '#ccc';
                    return <span><Icon type={type} color={color} size="20"></Icon></span>
                }
            }
        ],[
            { label: '创建时间', value: 'create_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.create_at)}</span>
            },
            {
                label: '更新时间', value: 'update_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.update_at)}</span>
            },
            {label: '描述:', value: 'description'}
        ]
    ],
    projectInfo: [
        [
            {label: '项目名称:', value: 'name'},
            {label: '项目ID:', value: 'project_id'},
            {label: '可用性:', value: 'enabled',
                render: (h, params) => {
                    const type = params.data.enabled ? "checkmark-circled" : "android-cancel";
                    const color = params.data.enabled ? '#19be6b' : '#ccc';
                    return <span><Icon type={type} color={color} size="20"></Icon></span>
                }
            }
        ],[
            {label: '域ID:', value: 'domain_id'},
            { label: '创建时间', value: 'create_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.create_at)}</span>
            },
            {
                label: '更新时间', value: 'update_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.update_at)}</span>
            },
        ],[
            {label: '描述:', value: 'description', colspan: 3}
        ]
    ],
    userInfo: [
        [
            {label: '用户名称:', value: 'name'},
            {label: '用户ID:', value: 'user_id'},
            {label: '可用性:', value: 'enabled',
                render: (h, params) => {
                    const type = params.data.enabled ? "checkmark-circled" : "android-cancel";
                    const color = params.data.enabled ? '#19be6b' : '#ccc';
                    return <span><Icon type={type} color={color} size="20"></Icon></span>
                }
            }
        ],[
            { label: '创建时间', value: 'create_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.create_at)}</span>
            },
            {
                label: '更新时间', value: 'update_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.update_at)}</span>
            },
            { label: '电话', value: 'phones',
                render: (h, params) => {
                    const phones = params.data.phones === [] ? '' : params.data.phones;
                    return <span>{phones}</span>
                }
            }
        ],[
            { label: '系统管理员', value: 'is_system_admin' },
            { label: '域管理员', value: 'is_cloud_admin' },
            { label: '邮箱', value: 'emails',
                render: (h, params) => {
                    const emails = params.data.emails === [] ? '' : params.data.emails;
                    return <span>{emails}</span>
                }
            },
        ]
    ],
    roleInfo: [
        [
            {label: '角色名称:', value: 'name'},
            {label: '角色ID:', value: 'role_id'},
            {label: '可用性:', value: 'enabled',
                render: (h, params) => {
                    const type = params.data.enabled ? "checkmark-circled" : "android-cancel";
                    const color = params.data.enabled ? '#19be6b' : '#ccc';
                    return <span><Icon type={type} color={color} size="20"></Icon></span>
                }
            }
        ],[
            { label: '创建时间', value: 'create_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.create_at)}</span>
            },
            {
                label: '更新时间', value: 'update_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.update_at)}</span>
            },
            {label: '描述:', value: 'description'} 
        ]
    ],
};

const gateway = {
    device: [
        { label: '设备名称', value: 'name' },
        { label: '设备id', value: 'id' },
        { label: '区域', value: 'location' },
        { label: '设备状态', value: 'status',
            render: (h, params) => {
                const { status } = params.data;
                const className = status ?  (status === 1 ? 'status online' : 'status offline') : 'status init';
                return <div class={className}></div>
            }
        },
        { label: '创建时间', value: 'create_at',
            render: (h, params) => <span>{util.common.formatDateTime(params.data.create_at)}</span>
        },
        {
            label: '更新时间', value: 'update_at',
            render: (h, params) => <span>{util.common.formatDateTime(params.data.update_at)}</span>
        },
        // {label: '设备类型', value: 'type'},
        // {label: '接入方式', value: 'proxy'},
        // {label: '设备标签', value: 'tags'},
        {label: '描述', value: 'description'},
    ],
    deviceMsg: [
        {label: '设备id', value: 'device_id'},
        {label: '消息id', value: 'id'},
        {label: 'engine_id', value: 'engine_id'},
        {label: '名称', value: 'title'},
        {label: '是否查看', value: 'is_checked'},
        {
            label: '发生时间', value: 'occurred_at',
            render: (occurred_at) => {
                return util.common.formatDateTime(occurred_at);
            }
        },
        {label: '告警', value: 'severity'},
        {label: '消息内容', value: 'message'},
        {label: 'topic', value: 'topic'},
    ],
    deviceType: [
        [
            {label: '类型名称', value: 'name'},
            {label: '类型id', value: 'id'},
            {label: 'parent_id', value: 'parent_id'},
        ],[
            {
                label: '创建时间', value: 'create_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.create_at)}</span>
            },
            {
                label: '更新时间', value: 'update_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.update_at)}</span>
            },
            {label: '描述', value: 'description'}
        ]
    ],
    deviceTypeAttr: [
        {label: '指标名称', value: 'name'},
        {label: '指标id', value: 'id'},
        {label: '类型id', value: 'type_id'},
        {label: '指标类型', value: 'value_type'},
        {
            label: '创建时间', value: 'create_at',
            render: (create_at) => {
                return util.common.formatDateTime(create_at);
            }
        },
        {
            label: '更新时间', value: 'update_at',
            render: (update_at) => {
                return util.common.formatDateTime(update_at);
            }
        },
        {label: '描述', value: 'description'},
    ],
    deviceTag: [
        [
            {label: '标签名称', value: 'name'},
            {label: '标签id', value: 'id'},
        ],[
            {
                label: '创建时间', value: 'create_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.create_at)}</span>
            },
            {
                label: '更新时间', value: 'update_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.update_at)}</span>
            }
        ]
    ],
    proxy: [
        [
            { label: 'proxy名称', value: 'name' },
            { label: 'proxyId', value: 'id' },
            { label: '证书', value: 'cert' }
        ],
        [
            { label: '状态', value: 'status',
                render: (h, params) => {
                    const { status } = params.data;
                    const className = status ?  (status === 1 ? 'status online' : 'status offline') : 'status init';
                    return <div class={className}></div>
                }
            },
            { label: '上线时间', value: 'online_time',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.online_time)}</span>
            },
            { label: '下线时间', value: 'offline_time',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.offline_time)}</span>
            }
        ],[
            { label: '可用性', value: 'is_enabled', 
                render: (h, params) => {
                    const type = params.data.is_enabled ? "checkmark-circled" : "android-cancel";
                    const color = params.data.is_enabled ? '#19be6b' : '#ccc';
                    return <span><Icon type={type} color={color} size="20"></Icon></span>
                }
            },
            { label: '创建时间', value: 'create_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.create_at)}</span>
            },
            { label: '更新时间', value: 'update_at',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.update_at)}</span>
            }
        ],[
            { label: '当前topic', value: 'data_current_topic' },
            { label: '历史topic', value: 'data_history_topic' },
            { label: 'cmd_req_topic', value: 'cmd_req_topic' }
        ],[
            { label: 'cmd_resp_topic', value: 'cmd_resp_topic' },
            { label: '描述', value: 'description', colspan: 2 },
        ]  
    ]
};

const valuka = {
    script: {
        online: [
            [
                { label: '算法名称', value: 'scriptName' },
                { label: '算法大小', value: 'fileSize' },
                { label: '算法id', value: 'scriptId' }
            ],[
                { label: '类型', value: 'type',
                    render: (h, params) => {
                        const type = params.data.type === 'jstorm' ? '在线计算' : '离线计算';
                        return <span>{type}</span>
                    }
                },
                { label: '创建时间', value: 'createTime',
                    render: (h, params) => <span>{util.common.formatDateTime(params.data.createTime)}</span>
                },
                { label: '更新时间', value: 'updateTime',
                    render: (h, params) => <span>{util.common.formatDateTime(params.data.updateTime)}</span>
                }
            ],[
                { label: 'ip', value: 'ip' },
                { label: '状态', value: 'status',
                    render: (h, params) => {
                        const status = params.data.status === 0 ? '初始化中' : '完成';
                        return <span>{status}</span>
                    }
                },
                { label: '描述', value: 'description', colspan: 2 }
            ]
        ],
        offline: [
            [
                {label: '算法名称', value: 'scriptName'},
                {label: '算法大小', value: 'fileSize'},
                {label: '算法id', value: 'scriptId'}
            ],[
                { label: '类型', value: 'type',
                    render: (h, params) => {
                        const type = params.data.type === 'jstorm' ? '在线计算' : '离线计算';
                        return <span>{type}</span>
                    }
                },
                { label: '创建时间', value: 'createTime',
                    render: (h, params) => <span>{util.common.formatDateTime(params.data.createTime)}</span>
                },
                { label: '更新时间', value: 'updateTime',
                    render: (h, params) => <span>{util.common.formatDateTime(params.data.updateTime)}</span>
                }
            ],[
                { label: 'ip', value: 'ip' },
                { label: '状态', value: 'status',
                    render: (h, params) => {
                        const status = params.data.status === 0 ? '初始化中' : '完成';
                        return <span>{status}</span>
                    }
                },
                { label: '主类', value: 'mainClass' },
            ],[
                // {label: 'extra', value: 'extra'},
                { label: '语言类型', value: 'language' },
                { label: '描述', value: 'description', colspan: 2 }
            ]
        ]
    },
    scriptTag: [
        [
            { label: '标签名称', value: 'tagName' },
            { label: '标签id', value: 'tagId' },
            { label: '状态', value: 'status' }
        ],[
            { label: 'ip', value: 'ip'},
            { label: '创建时间', value: 'createTime',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.createTime)}</span>
            },
            { label: '更新时间', value: 'updateTime',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.updateTime)}</span>
            }
        ],[
            { label: '描述', value: 'description', colspan: 3 }
        ]
    ],
    onlineJobInfo: [
        [
            { label: '作业名称', value: 'name' },
            { label: '算法名称', value: 'scriptName' },
            { label: '状态', value: 'status' },
        ],[
            { label: 'ip', value: 'ip' },
            { label: '创建时间', value: 'createTime',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.createTime)}</span>
            },
            { label: '结束时间', value: 'finishTime',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.finishTime)}</span>
            }
        ],[
            { label: '描述', value: 'description', colspan: 3 },
        ]
    ],
    offlineJobInfo: [
        [
            {label: '作业名称: ', value: 'mainClass'},
            {label: '作业ID: ', value: 'jobId'},
            {label: '状态: ', value: 'status'}
        ],[
            {label: '域ID: ', value: 'domainId'},
            {label: '脚本ID: ', value: 'scriptId'},
            {label: '计算结果: ', value: 'ro'}
        ],[
            { label: '创建时间', value: 'createTime',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.createTime)}</span>
            },
            { label: '结束时间', value: 'finishTime',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.finishTime)}</span>
            },
            {label: '计算语言: ', value: 'type'},
        ],[
            { label: '描述', value: 'description', colspan: 3 }
        ]
    ]
}

const dispatchCenter = {
    jobInfo: [
        [
            { label: '作业名称', value: 'jobname' },
            { label: '作业类型', value: 'jobtype' },
            { label: '作业id', value: 'jobid' }
        ],[
            { label: '状态', value: 'status'},
            { label: '创建时间', value: 'createtime',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.createtime)}</span>
            },
            { label: '更新时间', value: 'updatetime',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.updatetime)}</span>
            }
        ],[
            { label: '指令', value: 'command' },
            { label: '文件路径', value: 'jobfilepath', colspan: 2 },
        ],[
            { label: '参数', value: 'params', colspan: 3 }
        ]
    ],
    taskInfo: [
        [
            { label: '作业名称', value: 'jobname' },
            { label: '作业类型', value: 'jobtype' },
            { label: '作业id', value: 'jobid' }
        ],[
            { label: '任务id', value: 'taskid' },
            { label: 'remark', value: 'remark' },
            { label: '任务状态', value: 'status' }
        ],[
            { label: '开始时间', value: 'begintime',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.begintime)}</span>
            },
            { label: '提交时间', value: 'submittime',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.submittime)}</span>
            },
            { label: '创建时间', value: 'createtime',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.createtime)}</span>
            }
        ],[
            { label: '结束时间', value: 'endtime',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.endtime)}</span>
            },
            { label: '更新时间', value: 'updatetime',
                render: (h, params) => <span>{util.common.formatDateTime(params.data.updatetime)}</span>
            },
            {}
        ] 
    ]
}

const info = {
    ...keyauth,
    ...gateway,
    ...valuka,
    ...dispatchCenter
};

export default info;