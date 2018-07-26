<style lang="scss" scoped>
    @import './deviceData.scss';
</style>

<template>
    <div class="device-data">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/deviceData">设备数据</BreadcrumbItem>
                <BreadcrumbItem href="/deviceData">设备数据</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div class="condition-container">
                <Form class="condition" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Row :gutter="20" type="flex" justify="start">
                        <Col span="8">
                            <FormItem label="设备名称" prop="device">
                                <Select v-model="formValidate.device" @on-change="onDeviceSelect" placeholder="请选择设备">
                                    <Option v-for="{name, id, index} of deviceList" :key="index" :value="id">{{name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem label="设备指标" prop="metric">
                                <Select v-model="formValidate.metric" :disabled="!showMetric" placeholder="请选择设备指标" filterable >
                                    <!--<Scroll :on-reach-bottom="handleReachBottom">-->
                                        <!--<Card dis-hover v-for="(item, index) in list2" :key="index" style="margin: 32px 0">
                                            Content {{ item }}
                                        </Card>-->
                                        <Option v-for="{name, id, index} of metricList" :key="index" :value="name">{{name}}</Option>
                                    <!--</Scroll>-->
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem label="设备类型:" rop="deviceType">
                                <span v-if="device.type">{{device.type.name}}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="20" type="flex" justify="start">
                        <Col span="8">
                            <FormItem label="聚合方式" v-model="formValidate.aggregator" prop="aggregator">
                                <Select placeholder="请选择聚合方式" v-model="formValidate.aggregator" >
                                    <Option value="min">最低</Option>
                                    <Option value="avg">平均</Option>
                                    <Option value="max">最高</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="开始时间" prop="startTime">
                                <DatePicker v-model="formValidate.startTime" type="datetime" placeholder="开始时间" style="width: 100%"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="结束时间" prop="endTime">
                                <DatePicker v-model="formValidate.endTime" type="datetime" placeholder="结束时间" style="width: 100%"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div class="search-btn">
                    <Button size="large" type="info" @click="handleSubmit('formValidate')">查询</Button>
                </div>
            </div>
            <div class="split-line"></div>
            <div class="result">
                <div id="echarts"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import echarts from 'echarts';
    export default {
        data () {
            return {
                device: {},
                showMetric: false,
                metricList: [],
                deviceList: [],
                formValidate: {
                    device: '',
                    metric: '',
                    aggregator: '',
                    startTime: '',
                    endTime: '',
                },
                ruleValidate: {
                    device: [
                        { required: true, message: '请选择设备', trigger: 'change' }
                    ],
                    metric: [
                        { required: true, message: '请选择监控指标', trigger: 'change' }
                    ],
                    aggregator: [
                        { required: true, message: '请选择聚合方式', trigger: 'change' }
                    ],
                    startTime: [
                        { required: true, type: 'date', message: '开始时间不能为空', trigger: 'change' }
                    ]
                },
                charts: '',
                optionXAxis: [],
                optionLegend:[],
                optionSeries:[],
                pageSize: 20,
                pageNum:1
            }
        },
        created() {
            this.getDeviceList();
        },
        mounted(){
            this.$nextTick(function() {
                this.initLine('echarts');
            });
        },
        methods: {
            async getDeviceList() {
                const url = `/gateway/devices/?page_size=${50}&page_number=${1}`;
                let res = await this.$util.http.get(url);
                this.deviceList = res.data.data;
            },
            async onDeviceSelect(deviceId) {
                this.showMetric = false;
                this.formValidate.metric = '';
                this.device = await this.getDeviceInfo(deviceId);
                if(this.device) {
                    this.showMetric = true;
                }
                this.metricList= []; //每次切换设备的时候就要清空之前设备指标里面的数据
//                this.getMetricList(this.device.type.id, this.pageSize, this.pageNum,true);
                this.getMetricList(this.device.type.id);

            },
            async getDeviceInfo(deviceId) {
                const url = `/gateway/devices/${deviceId}/`;
                let response = await this.$util.http.get(url);
                return response.data.data;
            },
            async getMetricList(deviceTypeId, pageSize, pageNum,flag) {
//                const metricListurl = `/gateway/devicetypes/${deviceTypeId}/attributes/?category=1&page_size=${pageSize}&page_number=${pageNum}`;  //计算指标
                const metricListurl = `/gateway/devicetypes/${deviceTypeId}/attributes/?category=1`;  //计算指标
                let response = await this.$util.http.get(metricListurl);
                console.log(response);
                this.showMetric = true;
//                if(flag){
                    this.metricList=response.data.data;
//                }else{
//                    this.metricList.concat(response.data.data);
//                }
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        const { metric, aggregator, startTime, endTime } = this.formValidate;
                        this.searchData(this.device, metric, aggregator, startTime, endTime);
                    }
                })
            },
            async searchData(device, metric, aggregator, startTime, endTime) {
                let start = startTime.getTime().toString().substr(0, 10);
                let url = '';
                if(endTime) {
                    let end = endTime.getTime().toString().substr(0, 10);
                    url ='/gateway/devices/' + device.id + '/data/history/?start=' + start + '&end='+ end + '&aggregator=' + aggregator + '&metric=' + metric;
                } else {
                    url ='/gateway/devices/' + device.id + '/data/history/?start=' + start + '&aggregator=' + aggregator + '&metric=' + metric;
                }
                let res = await this.$util.http.get(url);
                if(res.status === 200 && res.data.status === 'success') {
                    if(JSON.stringify(res.data.data) == "{}") {
                        this.$Notice.warning({
                            title: '查询成功',
                            desc: '但数据为空！'
                        });
                    }
                    this.drawLine(res.data.data, device.name);
                } else {
                    this.$Message.error('查询失败!')
                }
            },
            drawLine(data, deviceName) {
                this.data = [];
                this.data = this.formatData(data);
                this.optionLegend.push(deviceName);
                this.optionXAxis = this.data[1];
                this.optionSeries.push({
                    name: deviceName,
                    type: 'line',
                    data: this.data[0]
                });
                this.charts.setOption({
                    legend: {
                        data: this.optionLegend
                    },
                    xAxis: {
                        data: this.optionXAxis
                    },
                    series: this.optionSeries
                });
            },
            formatData(data) {
                let formatData = [[], []];
                for(let item in data) {
                    formatData[0].push(data[item]);
                    formatData[1].push(this.$util.common.formatDateTime(item));
                }
                return formatData;
            },
            initLine(id){
               this.charts = echarts.init(document.getElementById(id));
               this.charts.setOption({
                    title: {
                        text: '设备数据',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c}'
                    },
                    legend: {
                        left: 'right',
                        data: this.optionLegend
                    },
                    xAxis: {
                        type: 'category',
                        name: 'x',
                        // offset: -20,
                        splitLine: {show: false},
                        data: this.optionXAxis,
                        // axisLabel:{
                        //     rotate:45,  //倾斜度
                        // },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'log',
                        name: 'y'
                    },
                    series: this.optionSeries
                })
            },
            handleReachBottom() {
                return new Promise (resolve => {
                    //这是滚动加载，就是在下拉过程中
                    this.pageNum++;
                    setTimeout(() => {
                        this.getMetricList(this.device.type.id, this.pageSize, this.pageNum);
                        resolve();
                    }, 2000);

                })

            }
        }
    }
</script>
