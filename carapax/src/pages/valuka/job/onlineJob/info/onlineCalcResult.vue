<style scoped>
    .aggregator .metric {
        width: 215px;
    }
    .device-item {
        margin-right: 15px;
    }
    .condition-container {
        display: flex;
        flex-direction: row;
    }
    .condition-container .condition {
        flex: 1;
    }
    .condition-container .search-btn {
        width: 200px;
        height: 35px;
        display: flex;
        justify-content: center;
    }
</style>

<template>
    <div>
        <div class="content">
            <div class="condition-container">
                <Form class="condition" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Row :gutter="20" type="flex" justify="start" >
                        <Col span="8">
                            <FormItem label="设备类型" prop="deviceType">
                                <Select label-in-value v-model="formValidate.deviceType" placeholder="请选择设备类型"
                                    @on-change="onSelectDeviceType">
                                    <Option v-for="{name, id, index} of deviceTypeList" :key="index" :value="id">{{name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="设备指标" v-model="formValidate.metric" prop="metric">
                                <Select :disabled="disabled" v-model="formValidate.metric" placeholder="请选择设备指标">
                                    <Option v-for="{name, id, index} of metricList" :key="index" :value="name">{{name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="开始时间" prop="startTime">
                                <DatePicker v-model="formValidate.startTime" type="datetime" placeholder="开始时间" style="width: 100%"></DatePicker>
                            </FormItem>
                        </Col> 
                    </Row>
                </Form>
                <div class="search-btn">
                    <Button size="large" type="info" @click="handleSubmit('formValidate')">查询</Button>
                </div>
            </div>
            <div id="echarts" style="height: 600px;"></div>
        </div>
    </div> 
</template>
<script>
    import axios from 'axios';
    import echarts from 'echarts';
    export default {
        data () {
            return {
                disabled: true,
                deviceTypeList: [],
                metricList: [],
                formValidate: {
                    deviceType: '',
                    metric: '',
                    startTime: '',
                },
                ruleValidate: {
                    deviceType: [
                        { required: true, message: '请选择监控指标', trigger: 'change' }
                    ],
                    metric: [
                        { required: true, message: '请选择监控指标', trigger: 'change' }
                    ],
                    startTime: [
                        { required: true, type: 'date', message: '开始时间不能为空', trigger: 'change' }
                    ]
                },
                charts: '',
                optionXAxis: [],
                optionLegend:[],
                optionSeries:[]
            }
        },
        name: 'onlineCalcReslut',
        props: {
            deviceIds: {
                type: String,
                default: ''
            }
        },
        created() {
            this.getDeviceTypeList();
        },
        mounted(){
            this.drawLine('echarts');
        },
        methods: {
            async getDeviceTypeList() {
                let res = await this.$util.http.get('/gateway/devicetypes/');
                this.deviceTypeList = res.data.data;
            },
            async getMetircList(url) {
                let res = await this.$util.http.get(url);
                if(res) {
                    this.disabled = false;
                    this.metricList = res.data.data;
                }
            },
            onSelectDeviceType(option) {
                const url = `/gateway/devicetypes/${option.value}/attributes/`;
                this.getMetircList(url);
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) this.search()
                })
            },
            async search() {
                const { metric, startTime } = this.formValidate;
                const start = startTime.getTime().toString();
                const url = `/valuka/online/jobs/value?deviceIds=${this.deviceIds}&metricNames=${metric}&startTime=${start}`;
                let res = await this.$util.http.get(url);
                const data = JSON.parse(res.data.data);
                const param = this.formatData(data[0].dps);    //暂时只画了一条线
                this.setParams(param);
            },
            setParams(data) {
                this.optionLegend.push('在线计算');
                this.optionXAxis = data[1];
                this.optionSeries.push({
                    name: '在线计算',
                    type: 'line',
                    data: data[0]
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
            drawLine(id){
               this.charts = echarts.init(document.getElementById(id));
               this.charts.setOption({
                    title: {
                        text: '计算结果',
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
            formatData(data) {
                let formatData = [[], []];
                for(let item in data) {
                    formatData[0].push(data[item]);
                    formatData[1].push(this.$util.common.formatDateTime(item));
                }
                return formatData;
            },
        }
    }
</script>