<style scoped>
    .featureList{
        height: 300px;
        overflow: auto;
        border: 1px solid #ccc;
        padding: 0 15px;
        border-radius: 3px;
    }
</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/domains">用户中心</BreadcrumbItem>
                <BreadcrumbItem href="/domains">身份认证</BreadcrumbItem>
                <BreadcrumbItem href="/roles">角色</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div class="header">
                <span class="title">角色列表</span>
                <div class="toolbar">
                    <Button  type="primary" icon="android-add"
                            @click="showModal('create', true, '创建角色', '创建')">创建角色
                    </Button>
                    <Button  type="error" icon="android-delete" @click="deleteRoles()">
                        删除角色
                    </Button>
                </div>
            </div>
            <Table stripe :loading="loading1" :columns="columns" :data="data"
                   @on-selection-change="onSelectChange"></Table>
            <Page class="page" :total="data.length" :page-size-opts="[5,10,15,20]" show-total show-elevator
                  show-sizer></Page>
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
            <Tabs >
                <TabPane label="角色信息" name="roleInfo" icon="information">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <FormItem label="角色名" prop="roleName">
                            <Input v-model="formValidate.roleName" placeholder="角色名"></Input>
                        </FormItem>
                        <FormItem label="描述" prop="desc">
                            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入..."></Input>
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane  label="添加服务" name="featureList" icon="person">
                    <div class="featureList">
                        <Tree :data="featuresList" show-checkbox multiple ref="featureList" ></Tree>
                    </div>
                </TabPane>
            </Tabs>
        </Modal>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    const token = localStorage.token;
    export default {
        data () {
            return {
                modal: {
                    type: '',
                    show: false,
                    okText: '',
                    title: ''
                },
                loading: true,
                loading1: true,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '角色名',
                        key: 'roleName',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.$router.push({path: '/roleInfo', query: {roleId : params.row.roleId}})
                                        }
                                    }
                                }, params.row.roleName)
                            ]);
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '可用性',
                        key: 'enabled',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: params.row.enabled ? "checkmark-circled" : "android-cancel",
                                        size: '24',
                                        color: params.row.enabled ? '#19be6b' : '#ccc',
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'actions',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        color: '#ccc',
                                        disabled: true
                                    },
                                    on: {
                                        click: () => {
                                            this.showModal('edit', true, '编辑角色', '确定');
                                            this.editRole(params.row);
                                        }
                                    }
                                }, '编辑'),
                                h('span', {
                                    style: {
                                        color: '#ccc',
                                        padding: '0 10px',
                                    }
                                }, '|'),
                                h('a', [
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
                                                this.deleteRole(params.row);
                                            },
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ],
                data: [],
                titles: ['全部服务', '已添加服务'],
                features: [],
                featuresList: [],
                clearFeature: [],
                formValidate: {
                    roleName: '',
                    desc: '',
                },
                ruleValidate: {
                    roleName: [
                        {required: true, message: '角色名不能为空', trigger: 'blur'}
                    ],
                },
            }
        },
        async created() {
            const {roleList} = this.$store.state.userCenter;

            //这是获取角色列表
            if (roleList.length === 0) {
                this.$store.dispatch('getRoleList');
                this.setRoleList(roleList);
            } else {
                this.loading1 = false;
                this.setRoleList(roleList);
            }
            this.getFeatureList();
        },
        computed: mapState({
            roleList: state => state.userCenter.roleList,
        }),
        watch: {
            roleList: {
                handler: function (val, oldval) {
                    this.loading1 = false;
                    this.setRoleList(val);
                },
                deep: true
            },
        },
        methods: {
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
            onSelectChange(selection) {
                this.index = [];
                this.index = this.$util.getSelectList(this.data, selection, "roleId");
                this.index = this.index.reverse();
            },
            handleReset () {
                this.$refs['formValidate'].resetFields();
            },
            handleCancel() {
                this.handleReset();
            },
            handleOk () {
                this.$refs['formValidate'].validate(async (valid) => {
                    if (valid) {
                        this.getFeature(this.$refs['featureList'].getCheckedNodes());
                        this.changeLoading();
                        this.createRole();
                        this.handleReset('formValidate');   //将信息提交后，清空
                        this.modal.show = false;
                        this.getFeatureList();
                    }
                })
            },
            async createRole() {
                let param = {
                    name: this.formValidate.roleName,
                    description: this.formValidate.desc
                };
                let feature = this.features;
                let roleInfo = await this.$util.http.post('/keyauth/role/', param);
                let url = '/keyauth/feature/' + roleInfo.data.role_id;
                await this.$util.http.post(url, feature); //绑定角色功能
                this.$Message.success('创建成功！');
                this.$store.dispatch('getRoleList');
            },
            async deleteRole(data) {
                let res = await this.$util.http.delete('/keyauth/role/' + data.roleId);
                if(res.status === 204) {
                    this.$store.dispatch('getRoleList');
                    this.$Message.success('删除成功！');
                }else {
                    this.$Message.error('删除失败！');
                }
            },
            deleteRoles() {
                //批量删除暂无此功能
                if (this.index && this.index.length) {
                    this.$Modal.confirm({
                        title: '警告',
                        content: '<p>确认要删除吗？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            for (let index of this.index) {
                                this.deleteRole(this.data[index]);
                            }
                        }
                    });
                } else {
                    this.$Message.info('至少选中一项！');
                }
            },
            setRoleList(roleList){
                this.data = [];
                for (let item of roleList) {
                    this.data.push({
                        roleName: item.name,
                        roleId: item.role_id,
                        desc: item.description,
                        enabled: item.enabled,
                        createTime: this.$util.common.formatDateTime(item.create_at),
                        role: item
                    });
                }
            },
            async getFeatureList() {
                this.featuresList=[];
                let res = await this.$util.http.get('/keyauth/catalog/');
                let featureList = res.data.services;
                let obj = {};
                obj.title = '全部功能';
                obj.expand = true;
                obj.selected = true;
                obj.children = [];
                for(let key of featureList){
                    if(key['valuka']) {
                        let p = {
                            title: 'valuka',
                            expand: true,
                            children: []
                        };
                        for(let child of key['valuka'].features) {
                            p.children.push({
                                title: child
                            })
                        }
                        obj.children.push(p);
                    }else if(key['gateway']) {
                        let p = {
                            title: 'gateway',
                            expand: true,
                            children: []
                        };
                        for(let child of key['gateway'].features) {
                            p.children.push({
                                title: child
                            })
                        }
                        obj.children.push(p);
                    }else if(key['keyauth']) {
                        let p = {
                            title: 'keyauth',
                            expand: true,
                            children: []
                        };
                        for(let child of key['keyauth'].features) {
                            p.children.push({
                                title: child
                            })
                        }
                        obj.children.push(p);
                    }
                }
//                this.clearFeature.push(obj);
                this.featuresList.push(obj);
            },
            getFeature(nodes) {
                for(let key of nodes) {
                    if(!key.children) {
                        this.features.push(key.title);
                    }
                }
                console.log(this.features); //暂时保留以便以后是查验
            },
        }
    }
</script>
