import { Poptip } from 'iview';

export default (that, SparkLine) => {
    return [
        { type: 'selection', width: 60, align: 'center' },
        { title: '设备名称', key: 'name',
            render: (h, params) => {
                return <a onClick={() => that.$router.push({path: '/deviceInfo', query: { id: params.row.id}})}>{params.row.name}</a>
            }
        },
        { title: '设备类型', key: 'type',
            render: (h, params) => {
                return <a onClick={() => that.$router.push({path: '/deviceTypeInfo', query: { id: params.row.type.id}})}>{params.row.type.name}</a>
            }
        },
        { title: '区域', key: 'location' },
        { title: '创建时间', key: 'create_at', sortable: true },
        { title: '接入方式', key: 'proxy',
            render: (h, params) => {
                const { proxy: { status } } = params.row;    //目前只有proxy
                let connect;
                if(status == undefined) connect = 'connectType unConnect'
                else if(status === 0) connect = 'connectType connect-init'
                else if(status === 1) connect = 'connectType connect-online'
                else if(status === 2) connect = 'connectType connect-offline'
                return (
                    <div>
                        <span class="connectType unConnect">A</span>
                        <span 
                            style="marginLeft: 10px"
                            class={connect}
                            onClick={() => that.$router.push({path: '/proxyInfo', query: { id: params.row.proxy.id}})}
                         >P</span>
                    </div>
                )
            }
        },
        { title: '设备状态', key: 'status', width:'180px',
            filters: [
                { label: '未知', value: 0 },
                { label: '在线', value: 1 },
                { label: '离线', value: 2 }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                if(value === 0) return row.status === 0
                else if (value === 1) return row.status === 1
                else if (value === 2) return row.status=== 2
            },
            render: (h, params) => {
                const { status, online_time, offline_time, offline_message} = params.row;
                let deviceStatus = status === 0 ? 'status init' : (status === 1 ? 'status online' : 'status offline');
                let time = status === 0 ?  '' : (status === 1 ? online_time : offline_time);
                return (
                    <div style="height:'20px', paddingTop: '2px'">
                        <Poptip trigger="click" title="离线信息" content={offline_message}>
                            <span class={deviceStatus}></span>
                        </Poptip>
                        <span style="paddingLeft: 10px">{time}</span>
                    </div>
                )
            }
        },
        { title: '流量统计', key: 'deviceFlow',
            render (h, params) {
                const data = [5,6,7,9,9,5,3,2,2,4,6,7,5,3,2,6,7,9,9,5,3,5,6,7,2,2,4,6,7,5];
                return <SparkLine id={params.row.id} data={data}></SparkLine>
            }
        },
        { title: '操作', key: 'actions', align: 'center', width: '15%',
            //此处未使用jsx，原因： jsx不支持that.$emit   (这里的on-ok方法)
            render: (h, params) => {    
                return h('div', [
                    h('a', {
                        on: {
                            click: () => {
                                that.showModal('edit', true, '编辑设备', '确定');
                                that.fillValue(params.row);
                            }
                        }
                    }, '编辑'),
                    h('span', {
                        class: 'connect-split-line'
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
                                'on-ok': () => that.deleteDevice(params.row)
                            }
                        }, '删除')
                    ])
                ]);
            }
        }
    ]
}