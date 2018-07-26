<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/proxy">接入代理管理</BreadcrumbItem>
                <BreadcrumbItem href="/proxy">proxy</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div v-if="errMsg" style="background:#f0f0f0; padding-bottom:1px">
            <Alert type="error" show-icon closable>{{errMsg}}</Alert>
        </div>
        <div class="content">
            <div class="header">
                <span class="title">proxy列表</span>
                <a style="margin-left: 15px" @click="downloadCA()">CA证书下载</a>
                <a id="download"></a>
                <div class="toolbar">
                    <Button type="primary" icon="refresh" @click="refresh()">刷新</Button>
                    <Button type="primary" icon="android-add" @click="showModal('create', true, '创建proxy', '创建')">创建proxy</Button>
                    <Poptip
                        confirm
                        title="确认删除所选proxy吗？"
                        placement="left-start"
                        @on-ok="deleteProxys()">
                        <Button type="error" icon="android-delete">删除proxy</Button>
                    </Poptip>
                </div>
            </div>
            <Table id="proxyList" stripe :columns="columns" :data="data" :loading="loadingData" @on-selection-change="onSelectChange"></Table>
            <!-- <Page class="page" :total="data.length" :page-size-opts="[5,10,15,20]" show-total show-elevator show-sizer></Page> -->
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
                    <FormItem label="proxy名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="proxy名称"></Input>
                    </FormItem>
                    <FormItem label="描述" prop="description">
                        <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="添加proxy描述"></Input>
                    </FormItem>
                </Form>
            </Tabs>
        </Modal>
    </div>
</template>
<script>
    import $ from 'jquery';
    import { mapState } from 'vuex';
    import getColumns from './proxy';

    export default {
        data () {
            return {
                modal: {
                    type: '',
                    deviceModal: false,
                    modalOkText: '',
                    modalTitle: ''
                },
                loading: true,
                loadingData: true,
                errMsg: '',
                data: [],
                formValidate: {
                    name: '',
                    is_enabled: true,
                    description: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                },
            }
        },
        created() {
            this.columns = getColumns(this);
            this.getList();
        },
        computed: mapState({
            changeProject: state => state.changeProject,
            proxyList: state => state.gateway.proxyList,
        }),
        watch: {
            changeProject: {
                handler:function(val, oldval) {
                    this.getList();
                }
            },
            proxyList: {
                handler:function(val,oldval){
                    this.loadingData = false;
                    this.data = val;
                },
                deep:true
            },
        },
        methods: {
            getList() {
                const { proxyList } = this.$store.state.gateway;
                if(proxyList.length === 0) {
                    this.$store.dispatch('getProxyList');
                } else {
                    this.loadingData = false;
                    this.data = proxyList;
                }
            },
            async downloadCA() {
                let res = await this.$util.http.get('/gateway/cacert/');
                let aLink = document.getElementById('download');
                this.$util.common.downloadFile(aLink, 'ca.crt', [res.data.data]);
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
                            this.createProxy();
                        } else {
                            this.editProxy();
                        }
                    }
                })
            },
            refresh() {
                this.loadingData = true;
                this.$store.dispatch('getProxyList');
            },
            async createProxy(data) {
                const params = {
                    name: this.formValidate.name,
                    description: this.formValidate.description,
                };
                let res = await this.$util.http.post('/gateway/proxy/', params);
                if(res.status === 200) {
                    this.$store.dispatch('getProxyList');
                    this.$Message.success('创建成功!');
                    this.modal.show = false;
                    this.handleReset();   //将信息提交后，清空
                } else {
                    this.$Message.error('创建失败!');
                    this.loading = false;
                }
            },
            async editProxy() {
                const editProxyId = this.data[this.editRowNum].id;
                const url = `/gateway/proxy/${editProxyId}/`;
                const params = {
                    name: this.formValidate.name,
                    description: this.formValidate.description,
                };
                let res = await this.$util.http.put(url, params);
                if(res) {
                    this.$set(this.data[this.editRowNum], 'name', params.name);
                    this.$set(this.data[this.editRowNum], 'description', params.description);
                    this.modal.show = false;
                    this.$Message.success('更新成功!');
                }
            },
            async startProxy(url, rowNum) {
                let res = await this.$util.http.post(url);    //启用
                if(res.status === 200) {
                    this.$set(this.data[rowNum], 'is_enabled', true);
                    this.$Message.success('启用成功!');
                }
            },
            async stopProxy(url, rowNum) {
                let res = await this.$util.http.post(url);    //停用
                if(res.status === 200) {
                    this.$set(this.data[rowNum], 'is_enabled', false);
                    this.$Message.success('停止成功!');
                }
            },
            fillValue(data) {
                this.formValidate = {
                    name: data.name,
                    description: data.description,
                }
            },
            async deleteProxy(data) {
                this.$Message.info({
                    content: '删除中...',
                    duration: 0
                });
                const url = `/gateway/proxy/${data.id}/`;
                let res = await this.$util.http.delete(url);
                if(res.status === 200) {
                    this.$Message.destroy();
                    this.$Message.success('删除成功!');
                    this.$store.dispatch('getProxyList');
                } else if(res.status === 'error') {
                    this.$Message.destroy();
                    console.log(res.message);
                    this.errMsg = '该proxy绑定了设备, 请解除绑定后再删除！';
                }
            },
            deleteProxys() {
                if(this.index && this.index.length) {
                    this.$Modal.confirm({
                        title: '警告',
                        content: '<p>确认要删除吗？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            for(let index of this.index) {
                                // this.deleteProxy(this.data[index]);
                            }
                        }
                    });
                } else {
                    this.$Message.warning('至少选中一项！');
                }
            }
        },
        mounted() {
            $("#proxyList .ivu-table-filter-select-item").each(function(index,element) {
                if(index === 1) $(this).prepend("<span class='status init' style='margin-right: 5px' ></span>")
                else if (index === 2) $(this).prepend("<span class='status online-1' style='margin-right: 5px' ></span>")
                else if (index === 3) $(this).prepend("<span class='status offline' style='margin-right: 5px' ></span>")
            });
        }
    }
</script>
