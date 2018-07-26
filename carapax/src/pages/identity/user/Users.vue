<style lang="scss">

</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/domains">用户中心</BreadcrumbItem>
                <BreadcrumbItem href="/domains">身份认证</BreadcrumbItem>
                <BreadcrumbItem href="/users">用户</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div class="header">
                <span class="title">用户列表</span>
                <div class="toolbar">
                    <Button type="primary" icon="android-add"
                            @click="showModal('create', true, '创建用户', '创建')">创建用户
                    </Button>
                    <Poptip
                        confirm
                        title="确认删除所选设备吗？"
                        placement="left-start"
                        @on-ok="onDeleteUsers()">
                        <Button  type="error" icon="android-delete">删除设备</Button>
                    </Poptip>
                </div>
            </div>
            <Table stripe :loading="loading1" :columns="columns" :data="data"
                   @on-selection-change="onSelectChange"></Table>
            <Page class="page" :total="100" show-total show-elevator show-sizer></Page>
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
                <FormItem label="用户名" prop="userName">
                    <Input v-model="formValidate.userName" placeholder="用户名"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="formValidate.password" placeholder="密码"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="passwordCheck">
                    <Input v-model="formValidate.passwordCheck" placeholder="再次输入密码"></Input>
                </FormItem>

                <FormItem label="域" prop="domain">
                    <Select v-model="formValidate.domain" placeholder="请选择域" @on-change="getProjectList">
                        <Option v-for="domain in domainList" :key="domain.domain_id" :value="domain.name" >
                            {{domain.name}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="项目" prop="project" >
                    <Select v-model="formValidate.project" placeholder="请选择项目" @on-change="getProjectId">
                        <Option v-for="project in projectList" :key="project.project_id" :value="project.name">
                            {{project.name}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="角色" prop="role" >
                    <Select v-model="formValidate.role" placeholder="请给用户添加角色" @on-change="getRoleId" multiple>
                        <Option v-for="role in roleList" :key="role.name" :value="role.role_id">{{role.name}}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    const token = localStorage.token;
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formValidate.passwordCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValidate.validateField('passwordCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formValidate.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                modal: {
                    type: '',
                    show: false,
                    okText: '',
                    title: ''
                },
                projectList: [
                    {name: '请先选择域'}
                ],
                loading: true,
                loading1: true,
                tabActive: 'userInfo',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'userName',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.$router.push({path: '/userInfo', query: {userId: params.row.userId}})
                                        }
                                    }
                                }, params.row.userName)
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
                        width: '20%',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.showModal('edit', true, '编辑用户', '确定');
                                            this.editUser(params.row);
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
                                                this.deleteUser(params.row);
                                            },
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ],
                data: [],
                listStyle: {
                    width: '250px',
                    height: '304px',
                    textAlign: 'left',
                },
                targetKeys: ["1", "2"],
                formValidate: {
                    userName: '',
                    password: '',
                    passwordCheck: '',
                    domain: '',
                    project: '',
                    role: [],
                },
                ruleValidate: {
                    userName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, validator: validatePass, trigger: 'blur'}
                    ],
                    passwordCheck: [
                        {required: true, validator: validatePassCheck, trigger: 'blur'}
                    ],
                    domain: [
                        {required: true, message: '域不能为空', trigger: 'change'}
                    ],
                    project: [
                        {required: true, message: '项目不能为空', trigger: 'change'}
                    ],
                    role: [
                        {required: true},
                    ],

                },
            }
        },
        async created() {
            const {userList, domainList, roleList} = this.$store.state.userCenter;
            const {domainSign} = this.$store.state.userCenter.status;

            if (userList.length === 0) {
                this.$store.dispatch('getUserList');
            } else {
                this.loading1 = false;
                this.setUserList(userList);
            }

            if (!domainSign) {
                this.$store.dispatch('getDomainList');
            }
            if (roleList.length === 0) {
                this.$store.dispatch('getRoleList');
            }
        },
        computed: mapState({
            userList: state => state.userCenter.userList,
            domainList: state => state.userCenter.domainList,
            roleList: state => state.userCenter.roleList,
        }),
        watch: {
            userList: {
                handler: function (val) {
                    this.loading1 = false;
                    this.setUserList(val);
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
                    type: 'create',
                    show: show,
                    title: title,
                    okText: okText
                };
            },
            onSelectChange(selection) {     //获取批量删除的行号（倒序）
                this.index = [];
                this.index = this.$util.getSelectList(this.data, selection, "userId");
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
                        this.changeLoading();
                        this.createUser();
                        this.handleReset('formValidate');
                    }
                })
            },
            async createUser() {
                let param = {
                    name: this.formValidate.userName,
                    password: this.formValidate.password,
                    project: this.formValidate.project,
                };
                let roleId = this.formValidate.role;
                let userInfo = await this.$util.http.post('/keyauth/user/', param);
                for(let role of roleId) {
                    let res = await this.$util.http.post('/keyauth/user/'+userInfo.data.user_id+'/role/'+ role);
                    console.log(res);
                }
                if( userInfo.status === 200) {
                    this.modal.show = false;
                    this.$store.dispatch('getUserList');
                    this.$Message.success('创建成功！');
                }else{
                    this.modal.show = false;
                    this.$Message.error('创建失败！');
                }

            },
            searchUser(user, searchType) {
                //暂无此功能
                const {userName, userId} = user;
                if (searchType === 'token') {
                    this.$http({
                        method: 'get',
                        url: '/keyauth/user/' + userId,
                        headers: {
                            'X-OAUTH-TOKEN': token,
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                } else {
                    this.$http({
                        method: 'get',
                        url: '/keyauth/user/' + userId + '/' + userName,
                    })
                        .then(response => {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                }
            },
            editUser(user) {
                //暂无此功能
                this.formValidate.userName = user.userName;
                this.formValidate.password = user.password;
            },
            async deleteUser(data) {
                let res = await this.$util.http.delete('/keyauth/user/' + data.userId);
//                this.$store.dispatch('deleteUser', data.userId);
                if(res.status === 204) {
                    this.$store.dispatch('getUserList');
                    this.$Message.success('删除成功！');
                }else {
                    this.$Message.error('删除失败！');
                }
            },
            deleteUsers() {
                if (this.index && this.index.length) {
                    this.$Modal.confirm({
                        title: '警告',
                        content: '<p>确认要删除吗？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            for (let index of this.index) {
                                this.deleteUser(this.data[index]);
                            }
                        }
                    });
                } else {
                    this.$Message.info('至少选中一项！');
                }
            },
            setUserList(userList) {
                this.data = [];
                for (let item of userList) {
                    this.data.push({
                        userName: item.name,
                        userId: item.user_id,
                        desc: item.description,
                        enabled: item.enabled,
                        createTime: this.$util.common.formatDateTime(item.create_at)
                    });
                }
            },
            getProjectList(name) {
                for(let domain of this.domainList) {
                    if(domain.name === name) {
                        this.projectList = domain.projects;
                    }
                }
            },
            getProjectId(name) {
                for(let project of this.projectList) {
                    if(project.name === name) {
                        this.formValidate.project = project.project_id;
                    }
                }
            },
            getRoleId(name) {
                for(let role of this.roleList) {
                    if(role.name === name) {
                        this.formValidate.role = role.role_id;
                    }
                }
            }
        }
    }
</script>
