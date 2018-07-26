export default (that) => {
    return [
        { type: 'selection', width: 60, align: 'center' },
        { title: 'proxy名称', key: 'name',
            render: (h, params) => {
                return (
                    <a onClick={ () => that.$router.push({ path: '/proxyInfo', query: { id: params.row.id }}) }>{params.row.name}</a>
                )
            }
        },
        { title: '创建时间', key: 'create_at' },
        { title: '状态', key: 'status', width: '250px',
            filters: [
                { label: '未知', value: 0 },
                { label: '在线', value: 1 },
                { label: '离线', value: 2 }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                if(value === 0) {
                    return row.status === 0;
                } else if (value === 1) {
                    return row.status === 1;
                } else if (value === 2) {
                    return row.status=== 2;
                }
            },
            render: (h, params) => {
                const { status, online_time, offline_time } = params.row;
                const statusClass = status ? (status === 1 ? 'status online' : 'status offline') : 'status init';
                const time = status === 1 ? 
                            ('上线时间：' + (online_time ? online_time : '')) 
                                : 
                            ('下线时间：' + (offline_time ? offline_time : ''));
                return (
                    <div style="height: 36px; display: flex; align-items: center;">
                        <span class={statusClass}></span>
                        <div style="padding-left: 10px">
                            <p>{time}</p>
                        </div>
                    </div>
                )
            }
        },
        { title: '可用性', key: 'is_enabled', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: params.row.is_enabled ? "checkmark-circled" : "android-cancel",
                    size: '24',
                    color: params.row.is_enabled ? '#19be6b' : '#ccc',
                  }
                })
              ])
            }
        },
        { title: '描述', key: 'description' },
        { title: '操作', key: 'actions', align: 'center', width: '20%',
            render: (h, params) => {
                const { id, is_enabled } = params.row;
                return h('div', [
                    h('a', {
                        on: {
                            click: () => {
                                that.editRowNum = params.index;
                                that.showModal('edit', true, '编辑proxy', '确定');
                                that.fillValue(params.row);
                            }
                        }
                    }, '编辑'),
                    h('span', {
                        style: {
                            color: '#ccc',
                            padding: '0 10px',
                        }
                    }, '|'),
                    h('a', {
                        on: {
                            click: () => {
                                const url = is_enabled ? `/gateway/proxy/${id}/disable/` : `/gateway/proxy/${id}/enable/`;
                                if(is_enabled) {
                                    that.stopProxy(url, params.index);
                                } else {
                                    that.startProxy(url, params.index);
                                }
                            }
                        }
                    }, is_enabled ? '停用' : '启用'),
                    h('span', {
                        style: {
                            color: '#ccc',
                            padding: '0 10px',
                        }
                    }, '|'),
                    h('a',[
                        h('Poptip', {
                            props: {
                                confirm: true,
                                title: '确定要删除吗！',
                                placement: 'left-start',
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                'on-ok': () => that.deleteProxy(params.row),
                            }
                        }, '删除')
                    ])
                ]);
            }
        }
    ]
}