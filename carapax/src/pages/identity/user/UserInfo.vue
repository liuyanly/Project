<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/domains">用户中心</BreadcrumbItem>
                <BreadcrumbItem href="/domains">身份认证</BreadcrumbItem>
                <BreadcrumbItem href="/users">用户</BreadcrumbItem>
                <BreadcrumbItem href="/userInfo">用户信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <Tabs value="userInfo">
                <TabPane label="用户详情" name="userInfo">
                    <div class="user-info">
                        <InfoTable title="用户信息" :config="userInfo" :data="user">
                            <tr slot="body">
                                <td colspan='3'>
                                    <span class="label">用户项目：</span>
                                    <span v-for="project in user.projects">
                                        <span @click="checkProjectInfo(project)">
                                        <Tag type="border" color="green" closable @on-close="deleteConfirm(project)">{{project.name}}</Tag>
                                        </span>
                                    </span>
                                    <span v-if="user.projects"><Button icon="plus" size="small" type="success" @click="addProject('create', true, '添加项目', '添加')">添加项目</Button></span>
                                </td>
                            </tr>
                            <tr slot="body">
                                <td colspan='3'>
                                    <span class="label">用户角色：</span>
                                        <span v-for="role in user.roles"><span @click="getRoleInfo(role)">
                                            <Tag type="border" color="green" closable @on-close="deleteConfirm(role)">{{role.name}}</Tag>
                                        </span>
                                    </span>
                                    <span v-if="user.roles"><Button icon="plus" size="small" type="success" @click="addRole('create', true, '添加角色', '添加')">添加角色</Button></span>
                                </td>
                            </tr>
                        </InfoTable>
                    </div>
                </TabPane>
                <TabPane label="用户应用" name="client">
                    <div style="padding-top: 10px">
                        <div class="header">
                            <span class="title">客户端列表</span>
                            <div class="toolbar">
                                <Button type="primary" :loading="refreshing" >
                                    <span v-if="!refreshing">刷新</span>
                                    <span v-else>刷新中...</span>
                                </Button>
                                <Button type="primary" icon="android-add" @click="showModal('create', true, '创建应用', '创建')">创建客户端</Button>
                                <Button type="error" icon="android-delete" @click="deleteApps">删除应用</Button>
                            </div>
                        </div>
                        <Table stripe :columns="columns" :data="data" @on-selection-change="onSelectChange"></Table>
                    </div>
                </TabPane>
            </Tabs>
        </div>

        <!--这是给用户添加角色-->
        <Modal
            width="600"
            v-model="modal.show"
            :okText="modal.okText"
            :title="modal.title"
            :mask-closable="false"
            :loading="loading"
            @on-ok="handleOk"
            @on-cancel="handleCancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <div v-if="modal.client">
                    <FormItem label="app名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="app名称"></Input>
                    </FormItem>
                    <FormItem label="重定向地址" prop="redirectUrl">
                        <Input v-model="formValidate.redirectUrl" placeholder="客户端"></Input>
                    </FormItem>
                    <FormItem label="描述" prop="desc">
                        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                    </FormItem>
                </div>
                <div v-if="modal.project">
                    <FormItem label="添加项目" prop="project" >
                        <Select v-model="formValidate.project" placeholder="添加项目" multiple>
                            <Option v-for="item in projectList" :value="item.project_id" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </div>
                <div v-if="modal.role">
                    <FormItem label="添加角色" prop="role" >
                        <Select v-model="formValidate.role" placeholder="添加角色" multiple>
                            <Option v-for="item in roleList" :value="item.role_id" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </div>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import InfoTable from '@/components/infoTable/InfoTable';
    import  config  from '@/config/config.js';
    import router from '@/router/index.js';
    export default {
        components: {
            InfoTable
        },
        data () {
            return {
                modal: {
                    type: '',
                    show: false,
                    okText: '',
                    title: '',
                    client: false,
                    project: false,
                    role: false,
                },
                user: {},
                userInfo: config.info.userInfo,
                loading:true,
                refreshing: false,
                columns: [
                    { type: 'selection', width: 60, align: 'center' },
                    { title: '应用名称', key: 'name' },
                    { title: '应用ID', key: 'app_id' },
                    { title: '应用秘钥', key: 'app_secret' },
                    { title: '重定向url', key: 'redirect_url' },
                    { title: '操作', key: 'actions', align: 'center',
                        render: (h, params) => {
                            return h('div', [
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
                                                this.deleteOneApp(params.row);
                                            },
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ],
                data: [],
                formValidate: {
                    redirectUrl: '',
                    project: [],
                    role: []
                },
                ruleValidate: {
                    name: {required: true},
                    redirectUrl: {required: true, type: "url"
                    },
                    desc: {required: true},
                    },
                color1:'#19be6b',
                type:'',
                color:'',
                projectList: [],
                roleList: []
            }
        },
        async created() {
            let userId = this.$router.history.current.query.userId;
            let res = await this.$util.http.get('/keyauth/user/'+ userId);
            this.user = res.data;

            this.type = this.user.enabled ? "checkmark-circled" : "android-cancel";
            this.color = this.user.enabled ? '#19be6b' : '#ccc';

            if(this.user.apps) {
                this.data = this.user.apps;
            }
            this.getProjectList();
            this.getRoleList();
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
                    okText: okText,
                    client: true
                };
            },
            onSelectChange(selection) {
                this.index = [];
                this.index = this.$util.getSelectList(this.data, selection, "consumerId");
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
                        this.modal.show = false;
                        if(this.modal.client) {
                            this.createApp();
                        }else if(this.modal.project) {
                            this.bindProject();
                        }else if(this.modal.role) {
                            this.bindRole();
                        }
                    }
                })
            },
            async createApp() {
                let params = {
                    'name': this.formValidate.name,
                    'redirect_url': this.formValidate.redirectUrl,
                    'description': this.formValidate.desc
                };
                let res = await this.$util.http.post('/keyauth/app', params);
                if(res.status === 201) {
                    this.data.push(res.data);
                    this.$Message.success('创建成功！');
                }else{
                    this.modal.show = false;
                    this.$Message.error('创建失败！');
                }
                this.handleReset('formValidate');
            },
            async deleteOneApp(data) {
                let res = await this.$util.http.delete('/keyauth/app/?app_id='+ data.app_id);
                if(res.status === 204) {
                    this.data.splice(data._index, 1);
                    this.$Message.success('删除成功！');
                }else{
                    this.modal.show = false;
                    this.$Message.error('删除失败！');
                }
            },
            deleteApps() {
                this.$Modal.confirm({
                    title: '警告',
                    content: '<p>确认要删除全部应用吗？</p>',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.deleteApp('/keyauth/app/user/'+ this.user.user_id);
                    }
                });
            },
            checkProjectInfo(project) {
                console.log(project);
              this.$router.push({path: '/projectsInfo', query: { projectId: project.project_id}});
            },
            getRoleInfo(role) {
              this.$router.push({path: '/roleInfo', query: { roleId: role.role_id}});
            },
            getRoleList() {
                let {roleList}= this.$store.state.userCenter;
                if(roleList.length === 0 ){
                    this.$store.dispatch('getRoleList');
                }
                this.roleList = roleList;
            },
            async getProjectList() {
                let resPro = await this.$util.http.get('/keyauth/project');
                this.projectList = resPro.data;
            },
            addProject(type, show, title, okText) {
                this.modal = {
                    type: type,
                    show: show,
                    title: title,
                    okText: okText,
                    project: true
                };
            },
            addRole(type, show, title, okText) {
                this.modal = {
                    type: type,
                    show: show,
                    title: title,
                    okText: okText,
                    role: true
                };
            },
            async bindProject() {
                console.log(this.formValidate.project);
                for(let id of this.formValidate.project) {
                    let res = await this.$util.http.post('/keyauth/user/'+this.user.user_id +'/project/'+ id);
                    console.log(res);

                    this.user.projects.push(res.data);

                }
            },
            deleteConfirm(obj) {
                let flag = obj.role_id ? true : false;
                let con = flag ? '<p>确认要删除该角色吗？</p>' : '<p>确认要删除该项目吗？</p>';
                this.$Modal.confirm({
                    title: '警告',
                    content: con,
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        if(flag) {
                            this.deleteRole(obj);
                        }else{
                            this.deleteProject(obj);
                        }
                    }
                });
            },
            async deleteProject(project) {
                console.log(project);
                let res = await this.$util.http.delete('/keyauth/user/'+this.user.user_id+ '/project/'+project.project_id);
                if(res.status === 204) {
                    this.$Message.success('删除成功！');
                    let num = this.$util.getEditNum(this.user.projects, 'project_id', project.project_id);
                    this.user.projects.splice(num,1);
                }else{
                    this.$Message.error('删除失败！');
                }
            },
            async bindRole() {
                for(let id of this.formValidate.role) {
                    let res = await this.$util.http.post('/keyauth/user/'+this.user.user_id +'/role/'+ id);
                    console.log(res);
                    if(res.status === 201){
                        this.user.roles.push(res.data);
                    }
                }
            },
            async deleteRole(role) {
                console.log(role.index);
                let res = await this.$util.http.delete('/keyauth/user/'+this.user.user_id+ '/role/'+role.role_id);
                if(res.status === 204) {
                    this.$Message.success('删除成功！');
                    let num = this.$util.getEditNum(this.user.roles, 'role_id', role.role_id);
                    this.user.roles.splice(num,1);
                }else{
                    this.$Message.error('删除失败！');
                }
            },
            async deleteApp(url) {
                let res = await this.$util.http.delete(url);
                console.log(res);
                if(res.status === 204) {
                    this.data.splice(0, this.data.length);
                    this.$Message.success('删除成功！');
                }else{
                    this.modal.show = false;
                    this.$Message.error('删除失败！');
                }
            },
        }
    }
</script>
