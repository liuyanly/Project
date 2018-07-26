<style scoped>

</style>

<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
        <BreadcrumbItem href="/domains">用户中心</BreadcrumbItem>
        <BreadcrumbItem href="/domains">身份认证</BreadcrumbItem>
        <BreadcrumbItem href="/domains">域</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <div class="header">
        <span class="title">域列表</span>
        <div class="toolbar">
          <Button type="primary" icon="android-add" @click="showModal('create', true, '创建域', '创建')">创建域</Button>
          <Button  type="error" icon="android-delete" @click="deleteDomains()">删除域</Button>
        </div>
      </div>
      <Table stripe :loading="loading2" :columns="columns" :data="data" ></Table>
    </div>

    <Modal
      width="600"
      :title="modal.title"
      :okText="modal.okText"
      v-model="modal.show"
      :loading="loading"
      :mask-closable="false"
      @on-ok="handleOk('formValidate')"
      @on-cancel="handleCancel('formValidate')">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="公司名称" prop="companyName">
            <Input v-model="formValidate.companyName" placeholder="公司名称"></Input>
        </FormItem>
        <FormItem label="域名" prop="domainName">
          <Input v-model="formValidate.domainName" placeholder="域名"></Input>
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
          title: '创建域',
          okText: '创建',
        },
        loading: true,
        loading2: true,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '域名 ',
            key: 'domainName',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  on: {
                    click: () => {
                      this.$router.push({path: '/domainInfo', query: {domainId: params.row.domainId}})
                    }
                  }
                }, params.row.domainName)
              ]);
            }
          },
          {
            title: '公司名称',
            key: 'companyName',
            className: 'table-name-column'
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
                    ])
                }
            },
          {
            title: '创建时间',
            key: 'createTime'
          },
          {
            title: '描述',
            key: 'desc',
            className: 'table-dec-column'
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
                      this.showModal('edit', true, '编辑域', '确定');
                      this.editDomain(params.row);
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
                        this.deleteDomain(params.row);
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
          companyNam:'',
          domainName: '',
          desc: '',
        },
        ruleValidate: {
          domainName: [
            {required: true, message: '域名不能为空', trigger: 'blur'}
          ],
            companyName: [
                {required: true, message: '公司名不能为空', trigger: 'blur'}
            ],
          desc: [
            {message: '请输入域描述', trigger: 'blur'},
          ]
        },
      }
    },
    async created() {
      const {domainList} = this.$store.state.userCenter;
      const {domainSign} = this.$store.state.userCenter.status;

      if (domainSign) {
        if(domainList.length !== 0){
          this.setDomainList(domainList);
          this.loading2 = false;
        }
      }

    },
    computed: mapState({
      domainList: state => state.userCenter.domainList,
    }),
    watch: {
        domainList: {
            handler: function (val, oldval) {
            this.loading2 = false;
            this.setDomainList(val);
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
     /* onSelectChange(selection) {
        this.index = [];
        this.index = this.$util.getSelectList(this.data, selection, "domainId");
        this.index = this.index.reverse();
      },*/
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      handleCancel(name) {
        this.handleReset(name);
      },
      handleOk (name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
              this.changeLoading();
              if (this.modal.type === 'create') {
                  this.createDomain();
              } else {
                  this.editDomain();
              }
          }
        })
      },
        setDomainList(domainList) {
        this.data = [];
        for (let item of domainList) {
          this.data.push({
            domainName: item.name,
            companyName: item.verbose,
            domainId: item.domain_id,
            desc: item.description,
            enabled: item.enabled,
            createTime: this.$util.common.formatDateTime(item.create_at)
          });
        }
      },
        async createDomain() {
            let params = {
                name: this.formValidate.domainName,
                verbose: this.formValidate.companyName,
                description: this.formValidate.desc
            };
            let res = await this.$util.http.post('/keyauth/domain/', params);
            this.$store.state.userCenter.domainList = this.$store.state.userCenter.domainList.concat(res.data);
            if(res.data) {
                this.$Message.success('创建成功！');
            }else{
                this.$Message.error('创建失败！');
            }
            this.modal.show = false;
            this.handleReset('formValidate');   //将信息提交后，清空
        },
        editDomain(data) {
            this.formValidate.domainName = data.domainName;
            this.formValidate.desc = data.desc;
        },
        async deleteDomain(data) {
            let res = await this.$util.http.delete('/keyauth/domain/' + data.domainId);

            if (res.status === 204) {
                let editRow = this.$util.getEditNum(this.data, 'domainId', data.domainId,);
                this.$store.state.userCenter.domainList.splice(editRow, 1);
                this.data.splice(editRow, 1);
                this.$Message.success('删除成功！');
            }else{
                this.$Message.error('删除失败！');
            }
        },
    }
  }
</script>
