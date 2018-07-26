<style scoped>

</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备管理</BreadcrumbItem>
                <BreadcrumbItem href="/deviceTag">设备标签</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div class="header">
                <span class="title">设备标签列表</span>
                <div class="toolbar">
                    <Button type="primary" icon="android-add" @click="showModal('create', true, '创建设备标签', '创建')">创建标签</Button>
                    <Button type="error" icon="android-delete" @click="deleteDeviceTypes()">删除标签</Button>
                    </Poptip>
                </div>
            </div>
            <Table stripe :columns="columns" :data="data" :loading="loadingData" @on-selection-change="onSelectChange"></Table>
            <!-- <Page class="page" :total="100" :page-size-opts="[5,10,15,20]" show-total show-elevator show-sizer></Page> -->
        </div>
        <Modal
            width="600"
            v-model="modal.show"
            :okText="modal.okText"
            :title="modal.title"
            :mask-closable="false"
            :loading="loading"
            @on-ok="handleOk()"
            @on-cancel="handleCancel()">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="标签名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="设备标签名称"></Input>
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
                    show: false,
                    title: '',
                    title: ''
                },
                loading: true,
                loadingData: true,
                data: [],
                columns: [
                    { type: 'selection', width: 60, align: 'center' },
                    { title: '设备类型名称', key: 'name',
                        render: (h, params) => {
                            return <a onClick={() => this.$router.push({ path: '/deviceTagInfo', query: { id: params.row.id }})}>{params.row.name}</a>
                        }
                    },
                    { title: '创建时间', key: 'create_at', sortable: true },
                    { title: '修改时间', key: 'update_at', sortable: true },
                    { title: '操作', key: 'actions', align: 'center', width: '15%',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => this.showModal('edit', true, '编辑类型', '确定')
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
                                            'on-ok': () => this.deleteDeviceTag(params.row)
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ],
                formValidate: {
                    name: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '设备标签名称不能为空', trigger: 'blur' }
                    ],
                },
            }
        },
        created() {
            this.getList();
        },
        computed: mapState({
            changeProject: state => state.changeProject,
            deviceTagList: state => state.gateway.deviceTagList,
        }),
        watch: {
            changeProject: {
                handler:function(val, oldval) {
                    this.getList();
                }
            },
            deviceTagList: {
                handler:function(val,oldval){  
                    this.loadingData = false;
                    this.data = val;
                },
                deep:true
            },
        },
        methods: {
            getList() {
                const { deviceTagList } = this.$store.state.gateway;
                if(deviceTagList.length === 0) {
                    this.$store.dispatch('getDeviceTagList');
                } else {
                    this.loadingData = false;
                    this.data = deviceTagList;
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
            handleCancel() {
                this.handleReset();
            },
            handleOk() {
                this.$refs['formValidate'].validate(valid => {
                    if (!valid) {
                        this.changeLoading();
                    } else {
                        if(this.modal.type === 'create') {
                            this.createDeviceTag();
                        } else {
                            this.editDeviceTag();
                        }
                    }
                })
            },
            async createDeviceTag() {
                let params = { 
                    name: this.formValidate.name, 
                };
                let res = await this.$util.http.post('/gateway/tags/', params);
                if(res.status === 200) {
                    this.$store.dispatch('getDeviceTagList');
                    this.$Message.success('创建成功!');
                    this.modal.show = false;
                    this.handleReset();   //将信息提交后，清空
                } else {
                    this.$Message.error('创建失败!');
                    this.loading = false;
                }
            },
            editDeviceTag (data) {

            },
            async deleteDeviceTag(data) {
                const url = `/gateway/tags/${data.id}/`;
                let response = await this.$util.http.delete(url);
                if(response.status === 200) {
                    this.$store.dispatch('getDeviceTagList');
                    this.$Message.success('删除成功!');
                }
            },
            deleteDeviceTags() {
                if(this.index && this.index.length) {
                    this.$Modal.confirm({
                        title: '警告',
                        content: '<p>确认要删除吗？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            for(let index of this.index) {
                                // this.deleteDeviceTag(this.data[index]);
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