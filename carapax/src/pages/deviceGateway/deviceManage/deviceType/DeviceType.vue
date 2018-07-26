<style scoped>
    .online {
        display: block;
        width: 10px;
        height: 10px;
        background: green;
    }
    .offline {
        display: block;
        width: 10px;
        height: 10px;
        background: gray;
    }
</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceType">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/deviceType">设备管理</BreadcrumbItem>
                <BreadcrumbItem href="/deviceType">设备类型</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div v-if="errMsg" style="background:#f0f0f0; padding-bottom:1px">
            <Alert type="error" show-icon closable>{{errMsg}}</Alert>
        </div>
        <div class="content">
            <div class="header">
                <span class="title">设备类型列表</span>
                <div class="toolbar">
                    <Button type="primary" icon="android-add" @click="showModal('create', true, '创建设备类型', '创建')">创建类型</Button>
                    <Button type="error" icon="android-delete" @click="deleteDeviceTypes()">删除类型</Button>
                    </Poptip>
                </div>
            </div>
            <Table stripe :columns="columns" :data="data" :loading="loadingData" @on-selection-change="onSelectChange"></Table>
            <Page class="page" :page-size-opts="[5,10,15,20]" show-total show-elevator show-sizer ></Page>
        </div>
        <Modal
            width="600"
            v-model="modal.show"
            :okText="modal.okText"
            :title="modal.title"
            :mask-closable="false"
            :loading="loading"
            @on-ok="handleOk()"
            @on-cancel="handleReset()">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="类型名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="设备类型名称"></Input>
                </FormItem>
                <FormItem label="描述" prop="description">
                    <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="添加设备描述"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
                modal: {
                    type: '',
                    deviceModal: false,
                    modalOkText: '',
                    modalTitle: ''
                },
                errMsg: '',
                loading: true,
                loadingData: true,
                data: [],
                columns: [
                    { type: 'selection', width: 60, align: 'center' },
                    { title: '设备类型名称', key: 'name',
                        render: (h, params) => {
                            return <a onClick={() => this.$router.push({ path: '/deviceTypeInfo', query: { id: params.row.id }})}>{params.row.name}</a>;
                        }
                    },
                    { title: '创建时间', key: 'create_at', sortable: true },
                    { title: '描述', key: 'description' },
                    { title: '操作', key: 'actions', align: 'center', width: '15%',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.showModal('edit', true, '编辑类型', '确定')
                                            this.editDeviceType(params.row);
                                        }
                                    }
                                }, '编辑'),
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
                                                this.deleteDeviceType(params.row);
                                            },
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ],
                formValidate: {
                    name: '',
                    description: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '设备类型名称不能为空', trigger: 'blur' }
                    ],
                },
            }
        },
        created() {
            this.getList();
        },
        computed: mapState({
            changeProject:  state => state.changeProject,
            deviceTypeList: state => state.gateway.deviceTypeList,
        }),
        watch: {
            changeProject: {
                handler:function(val, oldval) {
                    this.getList();
                }
            },
            deviceTypeList: {
                handler:function(val,oldval){
                    this.loadingData = false;
                    this.data = val;
                },
                deep:true
            },
        },
        methods: {
            getList() {
                const { deviceTypeList } = this.$store.state.gateway;
                if(deviceTypeList.length === 0) {
                    this.$store.dispatch('getDeviceTypeList');
                } else {
                    this.loadingData = false;
                    this.data = deviceTypeList
                }
            },
            changeLoading() {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                });
            },
            showModal(type, show, title, okText) {
                this.modal = {
                    type: type,
                    show: show,
                    title: title,
                    okText: okText
                };
            },
            onSelectChange(selection) {     //获取批量删除的行号（倒序）
                this.index = [];
                this.index = this.$util.getSelectList(this.data, selection, "id");
                this.index = this.index.reverse();
            },
            handleReset () {
                this.$refs['formValidate'].resetFields();
            },
            handleOk() {
                this.$refs['formValidate'].validate((valid) => {
                    if (!valid) {
                        this.changeLoading();
                    } else {
                        if(this.modal.type === 'create') {
                            this.createDeviceType();
                        } else {
                            this.editDeviceType();
                        }
                    }
                })
            },
            async createDeviceType() {
                const params = {
                    name: this.formValidate.name,
                    description: this.formValidate.description,
                };
                let res = await this.$util.http.post('/gateway/devicetypes/', params);
                if(res.status === 200) {
                    this.$store.dispatch('getDeviceTypeList');
                    this.$Message.success('创建成功!');
                    this.modal.show = false;
                    this.handleReset();   //将信息提交后，清空
                } else {
                    this.$Message.error('创建失败!');
                    this.loading = false;
                }
            },
            editDeviceType (data) {
                this.modal = {
                    type: 'edit',
                    show: true,
                    title: '编辑设备',
                    OkText: '确定'
                }
                this.formValidate = {
                    name: data.name,
                    deviceDesc: data.deviceDesc
                }
                this.editRow = this.$util.getEditRowNum(this.data, data.name, "name");
            },
            async deleteDeviceType(data) {
                this.$Message.info({
                    content: '删除中...',
                    duration: 0
                });
                const url = `/gateway/devicetypes/${data.id}/`;
                let res = await this.$util.http.delete(url);
                if(res.status === 200) {
                    this.$Message.destroy();
                    this.$Message.success('删除成功!');
                    this.$store.dispatch('getDeviceTypeList');
                } else if(res.status === 'error') {
                    this.$Message.destroy();
                    this.errMsg = '有设备绑定了该类型, 请解除绑定后再删除！';
                }
            },
            deleteDeviceTypes() {
                if(this.index && this.index.length) {
                    this.$Modal.confirm({
                        title: '警告',
                        content: '<p>确认要删除吗？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            for(let index of this.index) {
                                // this.deleteDeviceType(this.data[index]);
                            }
                        }
                    });
                } else {
                    this.$Message.warning('至少选中一项！');
                }
            },
        }
    }
</script>
