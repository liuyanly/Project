<style scoped>
  .params-name {
    text-align: right;
  }
  .params-title {
    margin: 0 0 20px 80px;
  }
  .params-item {
    margin-bottom: 15px;
  }
  .label {
    color: #999;
    width: 80px;
    display: inline-block;
    text-align: right;
    margin-right: 15px;
  }
</style>

<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
        <BreadcrumbItem href="/job">调度中心</BreadcrumbItem>
        <BreadcrumbItem href="/job">作业管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <div class="header">
        <span class="title">作业列表</span>
        <div class="toolbar">
          <Button type="primary" icon="android-add" @click="modal = true">提交作业</Button>
        </div>
      </div>
      <Table stripe :loading="loadingData" :columns="columns" :data="data"></Table>
      <Page class="page" :total="data.length" :page-size-opts="[5,10,15,20]" show-total show-elevator show-sizer></Page>
    </div>

    <Modal
      width="600"
      title="提交在线作业"
      okText="提交"
      v-model="modal"
      :loading="loading"
      :mask-closable="false"
      @on-ok="handleOk()"
      @on-cancel="handleCancel()">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem>
        <!-- iview的Upload action的计算属性无效， 故重写组件为UploadFile，在手动上传时，传入uploadUrl-->
          <UploadFile     
              ref="upload"
              multiple
              type="drag"
              :headers="headers"
              :data="body"
              :action="''"
              :before-upload="handleUpload">
              <div>
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点击或将文件拖拽到这里上传</p>
              </div>
          </UploadFile>
          <div v-if="file !== null">
              算法文件：{{ file.name }} 
          </div>
        </FormItem>
        <FormItem label="作业名称" prop="jobName">
          <Input v-model="formValidate.jobName"></Input>
        </FormItem>
        <FormItem label="作业类型" prop="jobType">
          <Input v-model="formValidate.jobType"></Input>
        </FormItem>
        <FormItem label="指令" prop="command">
          <Input v-model="formValidate.command"></Input> 
        </FormItem>
        <FormItem label="参数" prop="params">
          <Input v-model="formValidate.params"></Input> 
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    import { mapState } from 'vuex';
    import UploadFile from "@/components/iview/UploadFile.vue";
    import config from '@/config/config.js';

    export default {
        components: { UploadFile },
        data() {
          return {
            data: [],
            columns: [
              { title: '作业名称', key: 'jobname',
                render: (h, params) => {
                  const { jobid, jobname } = params.row;
                  return <a onClick={()=> this.$router.push({path: '/jobInfo', query: { id: jobid }})}>{jobname}</a>
                }
              },
              { title: '作业类型', key: 'jobtype' },
              { title: '指令', key: 'command' },
              { title: '状态', key: 'status' },
              { title: '创建时间', key: 'createtime',
                render: (h, params) => {
                  return h('span', {}, this.$util.common.formatDateTime(params.row.createtime))
                }
              },
              { title: '操作', key: 'action', align: 'center',
                render: (h, params) => {
                  const JobStart = <a onClick={() => this.startJob(params.row, params.index)}>{params.row.isStart ? '停止作业' : '开始作业'}</a>;
                  const Running = <a>作业中...</a>;
                  return (
                    <div>
                      {params.row.jobRunState === 'wait' ? JobStart : Running}
                    </div>
                  )
                }
              }
            ],
            modal: false,
            loading: true,
            loadingData: true,
            file: null,
            headers: { "X-OAUTH-TOKEN": localStorage.token },
            body: { "file": null, "type": '' },
            formValidate: {
              jobName: '',
              jobType: '',
              command: '',
              params: '',
              items: {
                inputItems: [],
                outputItems: []
              }
            },
            ruleValidate: {
              jobName: [
                { type: 'string', required: true, message: '请输入任务名称', trigger: 'blur' }
              ],
              jobType: [
                { type: 'string', required: true, message: '请选择算法文件', trigger: 'blur' }
              ],
              command: [
                { type: 'string', required: true, message: '请选择设备类型', trigger: 'blur' }
              ]
            },
          }
        },
        created () {
            this.getList();
        },
        computed: mapState({
            changeProject: state => state.changeProject,
                  jobList: state => state.dispatchCenter.jobList
        }),
        watch: {
            changeProject: {
                handler:function(val, oldval) {
                    this.getList();
                }
            },
            jobList: {
                handler:function(val,oldval){
                    this.loadingData = false;
                    this.setJobList(val);
                },
                deep:true
            }
        },
        methods: {
            getList() {
                const { jobList } = this.$store.state.dispatchCenter;
                if(jobList.length === 0) {
                    this.$store.dispatch('getJobList');
                } else {
                    this.loadingData = false;
                    this.setJobList(jobList);
                }
            },
            setJobList(jobList) {
                for(let job of jobList) {
                  job.jobRunState = 'wait';
                }
                this.data.splice(0, this.data.length, ...jobList);
            },
            changeLoading() {
                this.loading = false;
                this.$nextTick(() => this.loading = true );
            },
            handleReset() {
                this.$refs['formValidate'].resetFields();
                this.file = null;
                this.$refs.upload.clearFiles();
            },
            handleCancel() {
                this.handleReset();
            },
            handleUpload (file) {
                this.file = file;
                return false;
            },
            handleOk() {
                this.$refs['formValidate'].validate(valid => {
                    if (!valid) {
                        this.changeLoading();
                    } else {
                        this.commitJob();
                    }
                })    
            },
            async commitJob() {
                const { jobName, jobType, command, params } = this.formValidate;
                const meta = {
                    jobinfo: {
                        name: jobName,
                        type: jobType,
                        cmd: command,
                        params: params
                    }
                };
                let formData = new FormData();
                formData.append('file', this.file);
                formData.append('meta', JSON.stringify(meta));
                let res = await this.$util.http.post('/dispatchCenter/ui/submitjob', formData, 'multipart/form-data');
                console.log(res.data.message);
                if(res.status === 200 && res.data.code === 200) {
                    this.$store.dispatch('getJobList');
                    this.modal = false;
                    this.handleReset();
                    this.$Message.success('任务提交成功!');
                }
            },
            async startJob(job, index) {
                this.setJobRunState(index, 'jobRunState', 'running');
                const params = {
                    jobId: job.jobid,
                    jobType: job.jobtype
                };
                let res = await this.$util.http.post('/dispatchCenter/ui/startjob', params);
                console.log(res.data.message);
                if(res.status === 200 && res.data.code === 200) {
                    this.setJobRunState(index, 'jobRunState', 'wait');
                    this.$Message.success('开始作业，任务正在执行!');
                }
            },
            setJobRunState(index, key, state) {
                this.$set(this.data[index], key, state);
                this.data.splice(0, this.data.length, ...this.data);
            }
        }
    }
</script>
