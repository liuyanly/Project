<style scoped>

</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/script">计算平台</BreadcrumbItem>
                <BreadcrumbItem href="/offlineJobs">离线作业</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div class="header">
                <span class="title">离线作业列表</span>
                <div class="toolbar">
                    <Button type="primary" icon="android-add" @click="showModal('create', true, '提交作业', '提交')">提交作业
                    </Button>
                </div>
            </div>
            <Table stripe :loading="loading" :columns="columns" :data="data"></Table>
        </div>

        <Modal
            width="750"
            :title="modal.title"
            :okText="modal.okText"
            v-model="modal.show"
            :loading="loading1"
            :mask-closable="false"
            @on-ok="handleOk"
            @on-cancel="handleCancel">
            <Form ref="formDynamic" :model="formDynamic" :rules="ruleValidate" :label-width="80">
                <FormItem label="作业名称" prop="name">
                    <Input v-model="formDynamic.name" placeholder="作业名称"></Input>
                </FormItem>
                <FormItem label="选择算法" prop="scriptId">
                    <Select v-model="formDynamic.scriptId" placeholder="请选择算法" @on-change="getParam">
                        <Option v-for="script in scriptList"  :key="script.scriptId" :value="script.scriptId">{{script.scriptName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="时间" prop="time">
                    <DatePicker v-model="formDynamic.time" format="yyyy-MM-dd HH:mm" type="datetimerange" placeholder="选择时间" style="width: 380px;" @on-ok="getTime"></DatePicker>
                </FormItem>
                <FormItem label="设备类型" prop="deviceType">
                    <Select v-model="formDynamic.deviceTypeId" placeholder="设备类型" @on-change="getDevices">
                        <Option v-for="deviceType in deviceTypeList"  :key="deviceType.id" :value="deviceType.id">{{deviceType.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="设备" prop="deviceId" >
                    <Select v-model="formDynamic.deviceId" placeholder="设备" multiple>
                        <Option v-for="device in devices"  :key="device.id" :value="device.id">{{device.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem
                    v-for="(item, index) in formDynamic.vo"
                    :key="index"
                    :label="item.name">
                    <Row>
                        <Col span="12">
                        <Select v-model="item.value" placeholder="点位选择" >
                            <Option v-for="metric in metricList"  :key="metric.name" :value="metric.name">{{metric.description}}</Option>
                        </Select>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    export default {
        data() {
            return {
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '作业名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.$router.push({path: '/offlineJobInfo', query: {jobId: params.row.jobId}})
                                        }
                                    }
                                }, params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', [
                                    h('Poptip', {
                                        props: {
                                            confirm: true,
                                            title: '确定要停止吗！',
                                            placement: 'left-start',
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            'on-ok': () => {
                                                this.stopOfflineJob(params.row);
                                            },
                                        }
                                    }, '停止作业')
                                ])
                            ]);
                        }
                    }
                ],
                data: [],
                scriptList: [],
                loading: true,
                loading1: false,
                modal: {
                    type: 'create',
                    show: false,
                    title: '提交作业',
                    okText: '提交',
                },
                ruleValidate: {
                    scriptId: [
                        {required: true, message: '算法ID', trigger: 'change'}
                    ],
                    vo:{
                        value: [
                            {required: true, message: '请输入需要计算的值', trigger:'blur'}
                        ],
                    },
                    deviceId: [
                        {required: true}
                    ],
                    time: [
                        {required: true}
                    ],
                },
                deviceTypeList: [],
                devices: [],
                metricList: [],
                formDynamic: {
                    name: '',
                    time: [],
                    scriptId: '',
                    startTime: '',
                    endTime: '',
                    deviceId: [],
                    vo: [],
                },
            }
        },
        created () {
            this.getList();
        },
        computed: mapState({
            changeProject:  state => state.changeProject,
            offlineJobsList: state => state.valuka.offlineJobsList,
        }),
        watch: {
            changeProject: {
                handler:function(val, oldval) {
                    this.getList();
                }
            },
            offlineJobsList: {
                handler: function (val, oldval) {
                    this.loading = false;
                    this.setOfflineJobs(val);
                },
                deep: true
            },
        },
        methods: {
            getList() {
                let {offlineJobsList} = this.$store.state.valuka;
                if (!offlineJobsList.length) {
                    this.$store.dispatch('getOfflineJobsList');
                } else {
                    this.loading = false;
                    this.setOfflineJobs(offlineJobsList);
                    console.log(offlineJobsList)
                }
                this.getOfflineScript();
                this.getDeviceType();
            },
            onSelectChange() {

            },
            handleCancel() {
                this.handleReset();
            },
            handleOk(){
                let format = this.getFormat(this.formDynamic);
                this.createOfflineJob(format);
                this.handleReset();
            },
            async createOfflineJob(format) {
                let res = await this.$util.http.post('/valuka/jobs/offlinejob/', format);
                if (res.status === 202) {
                    this.$Message.success( '创建离线作业成功');
                    this.$store.state.valuka.offlineJobsList = this.$store.state.valuka.offlineJobsList.concat(res.data);
                } else {
                    this.$Message.error('创建失败');
                }
                this.handleReset();
            },
            deleteOfflineJob(data) {
                /*this.$store.dispatch('deleteOfflineJob', data.jobId);
                let editRow = this.$util.getEditRowNum(this.data, data.jobId, 'jobId');
                console.log(editRow);
                this.$store.state.userCenter.roleList.splice(editRow, 1);
                this.data.splice(editRow, 1);*/
                //功能接口暂未实现
            },
            async stopOfflineJob(data){
                console.log(data);
                let res = await this.$util.http.get('/valuka/jobs/offlinejob/'+data.jobId);
                console.log(res);

                if(res.data[0].status === 'success'){
                    this.$Message.warning('作业已运行完成,无法停止');
                } else if(res.data[0].status === 'failed'){
                    this.$Message.warning('作业已运行失败,无法停止');
                }else if(res.data[0].status.toLowerCase() === 'running'){
                    this.$store.dispatch('stopOfflineJob', data.jobId);
                    this.$store.dispatch('getOfflineJobsList');
                }
            },
            setOfflineJobs(jobList) {
                /*暂无此功能*/
                this.data = [];
                for (let offline of jobList) {
                    if(offline.status.toLowerCase() !== 'killed') {
                        this.data.push({
                            name: offline.mainClass,
                            jobId: offline.jobId,
                            status: offline.status.toUpperCase(),
                            createTime: this.$util.common.formatDateTime(offline.createTime),
                        });
                    }
                }
            },
            showModal(type, show, title, okText) {
                this.modal = {
                    type: type,
                    show: show,
                    title: title,
                    okText: okText
                };
            },
            handleReset () {
                this.$refs['formDynamic'].resetFields();
            },
            async getOfflineScript() {
                let response = await this.$util.http.get('/valuka/scripts?status=1&type=spark');
                console.log(response);
                this.scriptList = response.data.rows;
            },
            async getParam(val) {
                console.log(this.formDynamic.scriptId);/*这是选择算法*/
                let response = await this.$util.http.get('/valuka/scripts/parameter/'+val);
                console.log(response);
                this.formDynamic.vo = [];
                for( let input of response.data.data){
                    if ((input.name.toLowerCase() !== 'starttime') && (input.name.toLowerCase() !== 'endtime')) {
                        this.formDynamic.vo.push({
                            name: input.name,
                            value: ''
                        })
                    }
                }
            },
            getFormat(obj){
                let format = {
                    'name': '',
                    'scriptId': '',
                    'vo': []
                };
                format.scriptId = obj.scriptId;
                format.name = obj.name;
                let metricList = [];
                let deviceList = [];
                for(let metric of obj.vo){
                    metricList.push(metric.value);
                }
                for(let i=0; i<metricList.length; i++) {
                    deviceList[i] = {};
                    deviceList[i][metricList[i]] = obj.deviceId;
                }
                let dev = {
                    'name':'deviceList',
                    'value': JSON.stringify(deviceList)
                };
                let startT = {
                    'name':'starttime',
                    'value': JSON.stringify(obj.startTime)
                };
                let endT = {
                    'name' : 'endtime',
                    'value' : JSON.stringify(obj.endTime)
                };

                format.vo.push(dev);
                format.vo.push(startT);
                format.vo.push(endT);
                return format;
            },
            async getDeviceType() {
                let res = await this.$util.http.get('/gateway/devicetypes/');
                this.deviceTypeList = res.data.data;
            },
            async getDevices(val) {
                console.log(val);
                let res = await this.$util.http.get('/gatewaydevicetypes/'+val+'/devices/');//这是获取类型下面的设备
                console.log(res);
                this.devices = res.data.data;
                this.getMetric(val);
            },
            async getMetric(val) {
                let res = await this.$util.http.get('/gateway/devicetypes/'+val+'/attributes/');
                this.metricList = res.data.data;
            },
            getTime () {
                this.formDynamic.endTime = new Date(this.formDynamic.time[0]).getTime();
                this.formDynamic.startTime = new Date(this.formDynamic.time[1]).getTime();
            }

        },

    }
</script>
