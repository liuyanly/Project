<style rel="stylesheet/scss" lang="scss" scoped>
    table {
        width: 100%;
        border-collapse:collapse;
        .label {
            color: #999;
        }
    }
    td {
        padding: 11px 20px;
        border: 1px solid #eeeeee;
    }
    .content {
        padding: 15px;
        table {
            margin-bottom: 25px;
            width: 100%;
        }
    }
    .info-header {
        text-align: left;
        margin-top: 10px;
        margin-bottom: -1px;
        height: 40px;
        background: #F5f6FA;
        line-height: 38px;
        border: 1px solid #e1e6eb;
        position: relative;
        border-left: 4px solid #6d7781;
        .title {
            font-size: 14px;
            color: #333333;
            display: inline-block;
            margin-left: 16px;
        }
    }
</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/agent">接入代理管理</BreadcrumbItem>
                <BreadcrumbItem href="/agent">agent</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div class="header">
                <span class="title">agent列表</span>
                <div class="toolbar">
                    <Button type="primary" icon="android-add" @click="createAgent()">创建agent</Button>
                    <Poptip
                        confirm
                        title="确认删除所选agent吗？"
                        placement="left-start"
                        @on-ok="onDeleteAgents()">
                        <Button type="error" icon="android-delete">删除agent</Button>
                    </Poptip>
                </div>
            </div>
            <Table stripe :columns="columns" :data="data" @on-selection-change="onSelectChange"></Table>
            <Page class="page" :total="100"  show-total show-elevator show-sizer></Page>
        </div>

        <Modal
            width="600"
            v-model="modal.agentModal"
            :okText="modal.modalOkText"
            :title="modal.modalTitle"
            :mask-closable="false"
            @on-ok="handleOk()"
            @on-cancel="handleCancel()">
               <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="agent名称" prop="agentName">
                        <Input v-model="formValidate.agentName" placeholder="agent名称"></Input>
                    </FormItem>
                    <FormItem label="绑定设备">
                        <Select v-model="formValidate.agentDevice" clearable >
                            <Option value="beijing">设备1</Option>
                            <Option value="shanghai">设备2</Option>
                            <Option value="shenzhen">设备3</Option>
                            <Option value="shenzhen">设备4</Option>
                            <Option value="shenzhen">设备5</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="可用性">
                        <i-switch v-model="formValidate.enabled" size="large">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </FormItem>
                </Form>
            </Tabs>
        </Modal>
        <Modal
            width="600"
            v-model="modal.certificateModal"
            okText="确定"
            title="上报证书">
            <table>
                <tbody>
                    <tr>
                        <td colspan='3'>
                            <span class="label">agent名称：</span>
                            <span>test</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan='3'>
                            <span class="label">agent密码：</span>
                            <span>test123</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Modal>
    </div>
</template>
<script>
    import util from '../../../../util/util.js';
    export default {
        data () {
            return {
                modal: {
                    type: '',
                    agentModal: false,
                    certificateModal: false,
                    modalOkText: '',
                    modalTitle: ''
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'agent名称',
                        key: 'agentName',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.$router.push({ path: '/agentInfo', query: { agent: params.row }})
                                        }
                                    }
                                } ,params.row.agentName)
                            ]);
                        }
                    },
//                    {
//                        title: 'agentID',
//                        key: 'agentId'
//                    },
                    {
                      title: '创建时间',
                      key: 'createTime',
                      sortable: true
                    },
                    {
                        title: '代理设备',
                        key: 'agentDevice'
                    },
                    {
                        title: '可用性',
                        key: 'enabled',
                        align: 'center',
                        filters: [
                            {
                                label: '可用',
                                value: 1
                            },
                            {
                                label: '不可用',
                                value: 0
                            },
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value) {
                                return row.enabled === true;
                            } else {
                                return row.enabled === false;
                            }
                        },
                        render: (h, params) => {
                          return h('div', [
                            h('Icon', {
                              props: {
                                type: params.row.enabled ? "checkmark-circled" : "android-cancel",
                                size: '24',
                                color: params.row.enabled ? '#19be6b' : '#ccc',
                              }
                            })
                          ])
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
                                            this.editAgent(params.row);
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
                                            this.checkCertificate(params.row);
                                        }
                                    }
                                }, '证书'),
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
                                                this.onDeleteAgent(params.index);
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
                        agentName: 'agent1',
                        agentId: 'f09696910bdd874a99',
                        enabled: true,
                        agentDevice: 'device1',
                        createTime: '2017-9-10 10:17:56'
                    },
                    {
                        agentName: 'agent2',
                        agentId: '7815696ecbf1c96e68',
                        enabled: true,
                        agentDevice: 'device2',
                        createTime: '2017-9-10 10:17:56'
                    },
                    {
                        agentName: 'agent3',
                        agentId: '30fc12a40afaa0c384',
                        enabled: true,
                        agentDevice: 'device3',
                        createTime: '2017-9-10 10:17:56'
                    },
                    {
                        agentName: 'agent4',
                        agentId: 'c95fd5284717784f1b',
                        enabled: false,
                        agentDevice: 'device4',
                        createTime: '2017-9-10 10:17:56'
                    },
                    {
                        agentName: 'agent5',
                        agentId: '3a51ffe792ebbc1cb1',
                        enabled: false,
                        agentDevice: 'device4',
                        createTime: '2017-9-10 10:17:56'
                    }
                ],
                targetKeys: ["1","2"],
                formValidate: {
                    agentName: '',
                    agentDevice: '',
                    enabled: ''
                },
                ruleValidate: {
                    agentName: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                },
            }
        },
        methods: {
            createAgent () {
                this.modal = {
                    type: 'create',
                    agentModal: true,
                    modalTitle: '创建agent',
                    modalOkText: '创建'
                };
            },
            checkCertificate(data) {
                this.modal.certificateModal = true;
            },
            editAgent (data) {
                this.modal = {
                    type: 'edit',
                    agentModal: true,
                    modalTitle: '编辑agent',
                    modalOkText: '确定'
                }
                this.formValidate = {
                    agentName: data.agentName,
                    // agentDevice: data.agentDevice,
                    enabled: data.enabled
                    //等等
                }
                this.editRow = util.getEditRowNum(this.data, data.agentName, "agentName");
            },
            renderFormat (item) {
                return item.label;
            },
            handleTransfer (newTargetKeys) {
                console.log(newTargetKeys);
                this.targetKeys = newTargetKeys;
            },
            handleOk () {
                const { modal:{ type } } = this;
                const { agentName, enabled, agentDevice } = this.formValidate;
                let agent = {
                    agentName: agentName,
                    agentId: "agentId",
                    enabled: enabled,
                    agentDevice: agentDevice,
                }
                if(type === "create") {
                    agent.createTime = util.common.formatDateTime(new Date().getTime());
                    this.data.push(agent);
                } else {
                    agent.updateTime = util.common.formatDateTime(new Date().getTime());
                    this.data.splice(this.editRow, 1, agent);
                }
                this.handleReset('formValidate');
            },
            handleCancel() {
                this.handleReset();
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('用户创建成功!');
                    } else {
                        this.$Message.error('用户创建失败!');
                    }
                })
            },
            handleReset () {
                this.$refs['formValidate'].resetFields();     //清空表单内容
                this.tabActive = 'agentInfo';        //重置tab标签到第一个
            },
            onDeleteAgent(index) {
                this.data.splice(index, 1);
            },
            onDeleteAgents() {
                if(this.index && this.index.length) {
                    for(let index of this.index) {
                        this.onDeleteAgent(index);
                    }
                } else {
                    this.$Message.info('至少选中一项！');
                }
            },
            onSelectChange(selection) {
                this.index = util.getSelectList(this.data, selection, "agentName");
                this.index = this.index.reverse();
            },
        }
    }
</script>
