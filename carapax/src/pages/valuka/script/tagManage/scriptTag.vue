<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/script">计算平台</BreadcrumbItem>
                <BreadcrumbItem href="/scriptTag">标签管理</BreadcrumbItem>
                <BreadcrumbItem href="/scriptTag">标签管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div class="header">
                <span class="title">设备标签列表</span>
                <div class="toolbar">
                    <Button type="primary" icon="android-add" @click="showModal('create', true, '创建标签', '创建')">创建标签</Button>
                    <Button type="error" icon="android-delete" @click="deleteTags()">删除标签</Button>
                    </Poptip>
                </div>
            </div>
            <Table stripe :columns="columns" :data="data" :loading="loadingData" @on-selection-change="onSelectChange"></Table>
            <Page class="page" :total="data.length" :page-size-opts="[5,10,15,20]" show-total show-elevator show-sizer></Page>
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
                <FormItem label="标签名称" prop="tagName">
                    <Input v-model="formValidate.tagName" placeholder="设备标签名称"></Input>
                </FormItem>
                <FormItem label="描述" prop="description">
                    <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="添加标签描述"></Input>
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
                    { title: '标签名称',  key: 'tagName',
                        render: (h, params) => {
                            const { tagId, tagName } = params.row;
                            return <a onClick={() => this.$router.push({ path: '/scriptTagInfo', query: { id: tagId }})}>{tagName}</a>;
                        }
                    },
                    { title: 'ip', key: 'ip' },
                    {title: '创建时间', key: 'createTime', sortable: true,
                        render: (h, params) => {
                            const createTime = this.$util.common.formatDateTime(params.row.createTime);
                            return <span>{createTime}</span>;
                        }
                    },
                    {title: '修改时间', key: 'updateTime', sortable: true,
                        render: (h, params) => {
                            const updateTime = this.$util.common.formatDateTime(params.row.updateTime)
                            return <span>{updateTime}</span>;
                        }
                    },
                    { title: '描述', key: 'description' },
                    { title: '操作', key: 'actions', align: 'center', width: '15%',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.showModal('edit', true, '编辑类型', '确定');
                                            this.formValidate = {
							                    tagName: params.row.tagName,
							                    description: params.row.description,
							                }
							                this.editId = params.row.tagId;
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
                                                this.deleteTag(params.row);
                                            },
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ],
                formValidate: {
                    tagName: '',
                    description: '',
                },
                ruleValidate: {
                    tagName: [
                        { required: true, message: '设备标签名称不能为空', trigger: 'blur' }
                    ],
                },
            }
        },
        created() {
            this.getList();
        },
        computed: mapState({
            changeProject:  state => state.changeProject,
            scriptTagList: state => state.valuka.scriptTagList,
        }),
        watch: {
            changeProject: {
                handler:function(val, oldval) {
                    this.getList();
                }
            },
            scriptTagList: {
                handler:function(val,oldval){  
                    this.loadingData = false;
                    this.data = val;
                },
                deep:true
            },
        },
        methods: {
            getList() {
                const { scriptTagList } = this.$store.state.valuka;
                if(scriptTagList.length === 0) {
                    this.$store.dispatch('getScriptTagList');
                } else {
                    this.loadingData = false;
                    this.data = scriptTagList;
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
                this.index = this.$util.getSelectList(this.data, selection, "tagId");
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
                            this.createTag();
                        } else {
                            this.editTag();
                        }
                    }
                })
            },
            async createTag() {
                const params = { 
                	tagName: this.formValidate.tagName,
                	description: this.formValidate.description
                };
                let res = await this.$util.http.post('/valuka/tags', params);

                if(res.status === 200) {
                    this.$store.dispatch('getScriptTagList');
                    this.$Message.success('创建成功!');
                    this.modal.show = false;
                    this.handleReset();   //将信息提交后，清空
                } else {
                    this.$Message.error('创建失败!');
                    this.loading = false;
                }
            },
            async editTag () {
            	let params = { 
                	tagName: this.formValidate.tagName,
                	description: this.formValidate.description
                };
            	const url = `/valuka/tags/${this.editId}?tagName=${params.tagName}&description=${params.description}`;
            	let res = await this.$util.http.put(url);
            	if(res.status === 200) {
            		this.$store.dispatch('getScriptTagList');
            		this.modal.show = false;
	                this.handleReset();   //将信息提交后，清空
            	}
            },
            async deleteTag(data) {
            	const url = `/valuka/tags/${data.tagId}`;
                let res = await this.$util.http.delete(url);
                if(res.status === 200) {
                    this.$Message.success('删除成功！');
                    this.$store.dispatch('getScriptTagList');
                } else {
                    this.$Message.success('删除失败！');
                }
            },
            deleteTags() {
                if(this.index && this.index.length) {
                    this.$Modal.confirm({
                        title: '警告',
                        content: '<p>确认要删除吗？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            for(let index of this.index) {
                                // this.deleteTag(this.data[index]);
                            }
                        }
                    });
                } else {
                    this.$Message.info('至少选中一项！');
                }
            },
        }
    }
</script>