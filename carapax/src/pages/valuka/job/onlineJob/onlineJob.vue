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
</style>

<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
        <BreadcrumbItem href="/script">计算平台</BreadcrumbItem>
        <BreadcrumbItem href="/onlineJob">作业管理</BreadcrumbItem>
        <BreadcrumbItem href="/onlineJob">在线作业</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <div class="header">
        <span class="title">作业列表</span>
        <div class="toolbar">
          <Button type="primary" icon="android-add" @click="modal = true">提交作业</Button>
        </div>
      </div>
      <Table stripe :loading="loadingData" :columns="columns" :data="data" @on-selection-change="onSelectChange"></Table>
      <Page class="page" :total="data.length" :page-size-opts="[5,10,15,20]" show-total show-elevator show-sizer></Page>
    </div>

    <Modal
      width="800"
      title="提交在线作业"
      okText="提交"
      v-model="modal"
      :loading="loading"
      :mask-closable="false"
      @on-ok="handleOk()"
      @on-cancel="handleCancel()">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="任务名称" prop="job">
          <Input v-model="formValidate.job"></Input>
        </FormItem>
        <FormItem label="算法" prop="script" v-if="scriptList.length">
          <Select v-model="formValidate.script" filterable label-in-value @on-change="onSelectScript">
              <Option v-for="(item,index) in scriptList" :value="item.scriptId" :key="index">{{ item.scriptName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="设备类型" prop="deviceType" v-if="deviceTypeList.length">
          <Select v-model="formValidate.deviceType" filterable label-in-value @on-change="onSelectDeviceType" placeholder="设备类型">
            <Option v-for="(item,index) in deviceTypeList" :value="item.id" :key="index">{{ item.name }}</Option>
          </Select> 
        </FormItem>
        <FormItem label="设备" prop="devices">
          <Select v-model="formValidate.devices" :disabled="disabled"  multiple filterable label-in-value placeholder="设备">
            <Option v-for="(item,index) in deviceList" :value="item.id" :key="index">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </FormItem>
        <Row class="params-title" v-if="formValidate.deviceType">
          <Col span="12"><span>输入参数</span></Col>
          <Col span="12"><span>输出参数</span></Col>
        </Row>
        <FormItem v-if="formValidate.deviceType" prop="items">
          <Row :gutter="20">
            <Col span="12">
              <Row class="params-item" :gutter="20" type="flex" justify="space-between" v-for="(item, index) of formValidate.items.inputItems" :key="index">
                <Col span="7">
                  <p class="params-name">{{item.description}}：</p>
                </Col>
                <Col span="17">
                  <Select v-model="item.metric" filterable label-in-value>
                    <Option v-for="(item,index) of metricList.physics" :value="item.name" :key="index">{{ item.name }}</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
            <Col span="12">
              <Row class="params-item" :gutter="20" type="flex" justify="space-between" v-for="(item, index) of formValidate.items.outputItems" :key="index">
                <Col span="7">
                  <p class="params-name">{{item.description}}：</p>
                </Col>
                <Col span="17">
                  <Select v-model="item.metric" filterable label-in-value>
                    <Option v-for="(item,index) of metricList.calculate" :value="item.name" :key="index">{{ item.name }}</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        columns: [
          { type: 'selection', width: 60, align: 'center' },
          { title: '作业名称', key: 'name',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  on: {
                    click: () => {
                      this.$router.push({path: '/onlineJobInfo', query: {jobId: params.row.jobId}})
                    }
                  }
                }, params.row.name)
              ]);
            }
          },
          { title: '状态', key: 'status' },
          { title: '创建时间', key: 'createTime',
            render: (h, params) => {
              return h('span', {}, this.$util.common.formatDateTime(params.row.createTime))
            }
          },
          { title: '描述', key:'description' },
          { title: '操作', key: 'action', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  on: {
                    click: () => {
                      const url = `/valuka/online/jobs/${params.row.jobId}/cancel`;
                      this.cancelOnlineJob(url);
                    }
                  }
                }, '取消任务')
              ]);
            }
          }
        ],
        data: [],
        modal: false,
        loading: true,
        loadingData: true,
        disabled: true,
        scriptList: [],
        scriptParam: {},
        deviceTypeList: [],
        deviceList: [],
        metricList: {
          physics: [],
          calculate: [],
        },
        formValidate: {
          script: '',
          deviceType: '',
          devices: [],
          description: '',
          items: {
            inputItems: [],
            outputItems: []
          }
        },
        ruleValidate: {
          job: [
            { type: 'string', required: true, message: '请输入任务名称', trigger: 'change' }
          ],
          script: [
            { type: 'string', required: true, message: '请选择算法文件', trigger: 'change' }
          ],
          deviceType: [
            { type: 'string', required: true, message: '请选择设备类型', trigger: 'change' }
          ],
          devices: [
            { type: 'array', required: true, message: '请选择设备', trigger: 'change' }
          ]
        },
      }
    },
    async created () {
      this.getList();
    },
    computed: mapState({
       changeProject:  state => state.changeProject,
         scriptList1: state => state.valuka.scriptList,
      onlineJobsList: state => state.valuka.onlineJobsList,
    }),
    watch: {
      changeProject: {
          handler:function(val, oldval) {
              this.getList();
          }
      },
      onlineJobsList: {
        handler: function (val, oldval) {
          this.loadingData = false;
          this.setOnlineJobs(val);
        },
        deep: true
      },
      scriptList1: {
        handler:function(val,oldval){
          this.scriptList = val.rows;
        },
        deep:true
      }
    },
    methods: {
      getList() {
        const { onlineJobsList, scriptList } = this.$store.state.valuka;
        if (!onlineJobsList.length) {
          this.$store.dispatch('getOnlineJobsList');
        } else {
          this.loadingData = false;
          this.setOnlineJobs(onlineJobsList);
        }
        if(scriptList.length === 0) {
          this.$store.dispatch('getScriptList');
        } else {
          this.scriptList = scriptList.rows;
        }
        this.getDeviceTypeList();
      },
      setOnlineJobs(jobList) {
        this.data = [];
        this.data = jobList;
      },
      changeLoading() {
          this.loading = false;
          this.$nextTick(() => this.loading = true );
      },
      onSelectChange(selection) {     //获取批量删除的行号（倒序）
        this.index = [];
        this.index = this.$util.getSelectList(this.data, selection, "jobId");
        this.index = this.index.reverse();
      },
      handleReset() {
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
            this.commitOnlineJob();
          }
        })    
      },
      async cancelOnlineJob(url) {
        let res = await this.$util.http.post(url);
        if(res) {
          this.$store.dispatch('getOnlineJobsList');
          this.$Message.success('任务取消成功!');
        }
      },
      async commitOnlineJob() {
        const { job, script, devices, description, items: { inputItems, outputItems } } = this.formValidate;
        const params = {
          domainId: localStorage.domainId,
          jobName: job,
          sid: script,
          description: description,
          inputs: this.formatInputParams(devices, inputItems),
          results: this.formatOutputParams(outputItems)
        }
        console.log(params);
        let res = await this.$util.http.post('/valuka/online/jobs', params);
        console.log(res);
        if(res) {
          this.$store.dispatch('getOnlineJobsList');
          this.$Message.success('任务提交成功!');
          this.handleReset();
          this.modal = false;
        }
      },
      onSelectScript(option) {
        if(option.value) {    //重置的时候不请求
          this.getScriptParam(option.value);
        }
      },
      onSelectDeviceType(option) {
        if(option.value) {      //重置的时候不请求
          const deviceListUrl = `/gateway/devicetypes/${option.value}/devices/`;
          const physicsMetricListUrl = `/gateway/devicetypes/${option.value}/attributes/?category=1`;
          const calculateMetricListUrl = `/gateway/devicetypes/${option.value}/attributes/?category=2`;
          this.getDeviceList(deviceListUrl);
          this.getMetricList(physicsMetricListUrl, calculateMetricListUrl);
        }
      },
      async getScriptParam(scriptId) {
        const url = `/valuka/scripts/parameter/${scriptId}`;
        let res = await this.$util.http.get(url);
        this.scriptParam = res.data.data;
        const { require, output } = this.scriptParam;
        for(let item of require) {
          this.formValidate.items.inputItems.push({ 
            metric: '', 
            name: item.name, 
            description: item.description 
          });
        }
        for(let item of output) {
          this.formValidate.items.outputItems.push({ 
            metric: '', 
            name: item.name, 
            description: item.description 
          });
        }
      },
      async getDeviceTypeList() {
        let res = await this.$util.http.get('/gateway/devicetypes/');
        this.deviceTypeList = res.data.data;
      },
      async getDeviceList(url) {
        let res = await this.$util.http.get(url);
        this.deviceList = res.data.data;
        this.disabled = false;
      },
      async getMetricList(physicsMetricListUrl, calculateMetricListUrl) {
        let resPhysics   = await this.$util.http.get(physicsMetricListUrl);
        let resCalculate = await this.$util.http.get(calculateMetricListUrl);
        this.metricList.physics   = resPhysics.data.data;
        this.metricList.calculate = resCalculate.data.data;
      },

      formatInputParams(devices, params) {
        let arr = [];
        for(let device of devices) {
          arr.push({ deviceId: device });
        }
        let metricDetails = [];
        for(let param of params) {
          for(let item of arr) {
            item.argname = param.name;
            item.metricname = param.metric,
            item.setArgname = true,
            item.setMetricname = true
          }
          metricDetails.push({
            metricDetail: arr
          });
        }
        return metricDetails;
      },
      formatOutputParams(params) {
        let arr = [];
        for(let param of params) {
          arr.push({
            argname: param.name,
            metricname: param.metric,
            setArgname: true,
            setMetricname: true
          });
        }
        return arr;
      }
    }
  }
</script>
