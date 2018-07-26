<style scoped>
    .page {
        padding: 20px 10px;
        text-align: right;
    }
    .operat {
        color: red;
    }
    .operat:hover {
        text-decoration: underline;
    }
</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备管理</BreadcrumbItem>
                <BreadcrumbItem href="/ruleEngine">规则引擎</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <Table stripe :columns="columns" :data="data" @on-selection-change="onSelectChange"></Table>
            <Page class="page" :total="30"  show-total show-elevator show-sizer></Page>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '规则名称',
                        key: 'ruleName',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            // this.$router.push("/deviceInfo"); 
                                        }
                                    }
                                } ,params.row.ruleName)
                            ]);
                        }
                    },
                    {
                        title: '规则描述',
                        key: 'ruleDesc'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '状态',
                        key: 'ruleState',
                        render: (h, params) => {
                            let ruleState = params.row.ruleState;
                            if(ruleState) {
                                ruleState = '启动'; 
                            } else {
                                ruleState = '未启动'; 
                            }
                            return h('div', [
                                h('span', {}, ruleState),
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'actions',
                        align: 'center',
                        width: '20%',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            // this.editDevice(params.row);
                                        }
                                    }
                                }, '管理'),
                                h('span', {
                                    style: {
                                        color: '#ccc',
                                        padding: '0 10px',
                                    }
                                }, '|'),
                                h('a', {
                                    on: {
                                        click: () => {
                                            
                                        }
                                    }
                                }, '启动'),
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
                                            'on-ok': () => {
                                                // this.onDeleteDevice(params.index);
                                            },
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ],
                data: [
                    {
                        ruleName: 'test',
                        ruleDesc: '',
                        createTime: '2017-9-12 10:44:44',
                        ruleState: true
                    },
                    {
                        ruleName: 'abc',
                        ruleDesc: '',
                        createTime: '2017-9-13 17:11:22',
                        ruleState: false
                    },
                    {
                        ruleName: 'test1',
                        ruleDesc: '',
                        createTime: '2017-9-14 10:19:35',
                        ruleState: true
                    },

                ],
                formValidate: {
                    // deviceName: '',
                    // deviceAccess: '',
                    // deviceType: '',
                    // desc: ''
                },
                ruleValidate: {
                    // deviceName: [
                    //     { required: true, message: '设备名称不能为空', trigger: 'blur' }
                    // ],
                },
            }
        },
        computed: {

        },
        methods: {
            createDevice() {
                this.modal = {
                    modalTitle: '创建设备',
                    modalOkText: '创建'
                };
                this.handleReset('formValidate');
                this.createDeviceModel = true;
            },
            editDevice(data) {
                this.modal = {
                    modalTitle: '编辑设备',
                    modalOkText: '确定'
                }
                this.formValidate = {
                    deviceName: data.deviceName,
                    deviceAccess: data.deviceAccess,
                    deviceType: data.deviceType,
                    deviceState: data.deviceState,
                    //等等
                }
                this.createDeviceModel = true;
            },
            checkDeviceShadow() {
                this.$router.push('/deviceShadow');
            },
            handleOk() {
                let createTime = new Date().getTime();
                const { deviceName, deviceAccess, deviceType, deviceState } = this.formValidate;
                this.data.push({
                    deviceName: deviceName,
                    deviceAccess: deviceAccess,
                    deviceType: deviceType,
                    deviceState: deviceState,
                    createTime: createTime
                });
            },
            handleCancel() {

            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            onDeleteDevice(index) {
                this.data.splice(index, 1);
            },
            onDeleteDeviceBatch() {
                if(this.index && this.index.length) {
                    for(let index of this.index) {
                        this.onDeleteDevice(index);
                    }
                } else {
                    this.$Message.info('至少选中一项！');
                }
            },
            onSelectChange(selection) {
                this.index = [];
                for(let device of selection) {
                    for(let i=0; i<this.data.length; i++) {
                        if(device.createTime === this.data[i].createTime) {
                            this.index.push(i);
                        }
                    }
                }
                this.index = this.index.reverse();
            },
        }
    }
</script>