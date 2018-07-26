<style scoped>
  .transfer .ivu-transfer {
    text-align: center;
  }
</style>

<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
        <BreadcrumbItem href="/domains">用户中心</BreadcrumbItem>
        <BreadcrumbItem href="/domains">身份认证</BreadcrumbItem>
        <BreadcrumbItem href="/projects">项目</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <div class="header">
        <span class="title">项目列表</span>
        <div class="toolbar">
          <Button type="primary" icon="android-add" @click="showModal('create', true, '创建项目', '创建')">创建项目</Button>
          <Button type="error" icon="android-delete" @click="deleteProjects()">删除项目</Button>
        </div>
      </div>
      <Table :loading="loading1" :columns="columns" :data="data" @on-selection-change="onSelectChange" stripe></Table>
    </div>
    <Modal
      width="600"
      :title="modal.title"
      :okText="modal.okText"
      v-model="modal.show"
      :loading="loading"
      :mask-closable="false"
      @on-ok="handleOk()"
      @on-cancel="handleCancel()">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="项目名" prop="projectName">
          <Input v-model="formValidate.projectName" placeholder="项目名"></Input>
        </FormItem>
        <FormItem label="域名" prop="domain">
          <Select v-model="formValidate.domain" placeholder="请选择">
            <Option v-for="domain of domainList" :value="domain.domain_id" :key="domain.domain_id">{{domain.name}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="描述" prop="desc">
          <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="请输入..."></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  export default {
    data () {
      return {
        modal: {
          type: 'create',
          show: false,
          title: '创建项目',
          okText: '创建'
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
            title: '项目名称',
            key: 'projectName',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  on: {
                    click: () => {
                      this.$router.push({path: '/projectsInfo', query: {projectId: params.row.projectId}})
                    }
                  }
                }, params.row.projectName)
              ]);
            }
          },
          {
            title: '域名称',
            key: 'domainName'
          },
          {
            title: '创建时间',
            key: 'createTime'
          },
          {
            title: '是否可用',
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
              ])
            }
          },
          {
            title: '操作',
            key: 'actions',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  on: {
                    click: () => {
                      this.showModal('edit', true, '编辑域', '确定')
                      this.editProject(params.row);
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
                        this.deleteProject(params.row);
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
          projectName: '',
          desc: '',
          domain: '',
        },
        ruleValidate: {
          projectName: [
            {required: true, message: '项目名不能为空', trigger: 'blur'}
          ],
          domain: [
            {required: true, message: '必须选择一个域', trigger: 'change'}
          ],
        },
        titles: ['全部用户', '项目成员'],
        listStyle: {
          width: '250px',
          height: '304px',
          textAlign: 'left',
        },
        userList: [ ],
        targetKeys: ["1", "2"],
      }
    },
    async created() {
      const {domainList} = this.$store.state.userCenter;
      const {resetDomain ,resetProject} = this.$store.state.userCenter.reset;

      if (domainList.length === 0) {
        this.$store.dispatch('getDomainList');
      } else {
        this.loading1 = false;
        this.setProjectList(domainList, resetDomain, resetProject);
      }
    },
    watch: {
      domainList: {
        handler: function (val) {
          this.loading1 = false;
          this.setProjectList(val, this.resetDomain, this.resetProject);
        },
        deep: true
      },
      resetDomain: {
        handler: function (val) {
          this.loading1 = false;
          this.setProjectList(this.domainList, val, this.resetProject);
        },
        deep: true
      },
      resetProject: {
        handler: function (val) {
          this.setProjectList(this.domainList, this.resetDomain, val);
        },
        deep: true
      },
    },
    computed: mapState({
      domainList: state => state.userCenter.domainList,
      resetDomain: state => state.userCenter.reset.resetDomain,
      resetProject: state => state.userCenter.reset.resetProject,
    }),
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
      onSelectChange(selection) {
        this.index = [];
        this.index = this.$util.getSelectList(this.data, selection, "domainId");
        this.index = this.index.reverse();
      },
      handleReset() {
        this.$refs['formValidate'].resetFields();
      },
      handleCancel() {
        this.handleReset('formValidate');
      },
      handleOk () {
        this.$refs['formValidate'].validate(async (valid) => {
          if (!valid) {
            this.changeLoading();
          } else {
            this.createProject();
            this.modal.show = false;
            this.handleReset('formValidate');   //将信息提交后，清空
          }
        })
      },
      getProjectList() {
        return this.$util.http.get(this, '/domain/08a8cc78-0ced-4712-9460-8550c437a545');
      },
        async createProject() {
            let params = {
                name: this.formValidate.projectName,
                description: this.formValidate.desc,
                domain: this.formValidate.domain
            };
            let res = await this.$util.http.post('/keyauth/project/', params);
            console.log(res);
            let domainNum = this.$util.getEditNum(this.domainList, 'domain_id', res.data.domain_id);
            this.$store.state.userCenter.domainList[domainNum].projects.push(res.data);

            if(res.data) {
                this.$Message.success('创建成功！');
            }else{
                this.$Message.error('创建失败！');
            }
        },
        searchProject(id) {
            let url = '/keyauth/project/' + id;
            return this.$util.http.search(this, url);
        },
        async deleteProject(data) {
            let res = await this.$util.http.delete('/keyauth/project/' + data.projectId);
            if (res.status === 204) {
                let delNum = this.$util.getEditNum(this.data, 'projectId', data.projectId);
                let domainNum = this.$util.getEditNum(this.domainList, 'domain_id', data.domainId);
                this.$store.state.userCenter.domainList[domainNum].projects.splice(delNum, 1);
                this.data.splice(delNum, 1);
                this.$Message.success('删除成功！');
            }else{
                this.$Message.error('删除失败！');
            }
        },
      deleteProjects() {
          //暂时没有此接口
        if (this.index && this.index.length) {
          this.$Modal.confirm({
            title: '警告',
            content: '<p>确认要删除吗？</p>',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
              for (let index of this.index) {
                this.deleteProject(this.data[index]);
              }
            }
          });
        } else {
          this.$Message.info('至少选中一项！');
        }
      },
      setProjectList(domainList, domain, project) {
        this.data = [];
        if (project === '全选') {
          for (let item of domainList) {
            if (item.name === domain) {
              for (let key of item.projects) {
                this.data.push({
                  project: key,
                  projectName: key.name,
                  projectId: key.project_id,
                  domainName: item.name,
                  domainId: key.domain_id,
                  desc: key.description,
                  enabled: key.enabled,
                  createTime: this.$util.common.formatDateTime(key.create_at)
                });
              }
            }
          }
        } else {//暂时没有给这个选项
          for (let item of domainList) {
            if (item.name === domain) {
              for (let key of item.projects) {
                this.data.push({
                  project: key,
                  projectName: key.name,
                  projectId: key.project_id,
                  domainName: item.name,
                  domainId: key.domain_id,
                  desc: key.description,
                  enabled: key.enabled,
                  createTime: this.$util.common.formatDateTime(key.create_at)
                });
              }
            }
          }
        }
      },
    }
  }
</script>
