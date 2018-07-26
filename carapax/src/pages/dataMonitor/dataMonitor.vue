<style scoped>
    .title {
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
        margin-bottom: 10px;
    }
    .filtrate-container{
        display: flex;
        flex-direction: row;
    }
    .filtrate {
        flex: 1;
    }
    .search {
        width: 200px;
        text-align: center;
        padding-top: 28px;
    }

</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/dataMonitor">数据监控</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div class="filtrate-container">
                <Form class="filtrate" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                    <Row :gutter="16">
                        <Col span="8">
                            <FormItem label="开始时间" prop="startTime">
                                <DatePicker v-model="formValidate.startTime" type="datetime" placeholder="开始时间" style="width: 100%"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem label="结束时间" prop="endTime">
                                <DatePicker v-model="formValidate.endTime" type="datetime" placeholder="结束时间" style="width: 100%"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="8"></Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="8" >
                            <FormItem label="Topic" prop="topic">
                                <Select v-model="formValidate.topic" @on-change="onTopicSelect" placeholder="topic" style="width:100%">
                                    <Option v-for="item in topicList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem label="ConsumerGroup" prop="consumerGroup">
                                <Select v-model="formValidate.consumerGroup" :disabled="!showConsumer" placeholder="consumerGroup" style="width:100%">
                                    <Option v-for="item in consumerList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem label="Type" prop="type">
                                <Select v-model="formValidate.type" placeholder="type" style="width:100%">
                                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div class="search">
                    <Button size="large" type="info" @click="handleSearch('formValidate')">查询</Button>
                </div>
            </div>
            <pre class="title">{{title}}</pre>
            <!-- <div class="title" v-for="item of title">
                <span>{{item}}</span>
            </div> -->
            <Table :columns="columns" :data="data"></Table>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    startTime: '',
                    endTime: '',
                    topic: '',
                    consumerGroup: '',
                    type: ''
                },
                topicList: [
                    {
                        value: 'totoro',
                        label: 'totoro'
                    },
                    {
                        value: 'domain_99a5d13d-9a83-459b-a2e1-c5a9fb92540d_data_current',
                        label: 'domain_99a5d13d-9a83-459b-a2e1-c5a9fb92540d_data_current'
                    },
                    {
                        value: 'subscription',
                        label: 'subscription'
                    },
                ],
                showConsumer: false,
                consumerList: [],
                typeList: [
                    {
                        value: 'kafkaBus',
                        label: 'kafkaBus'
                    }
                ],
                ruleValidate: {
                    startTime: [
                        {required: true, type: 'date', message: '开始时间不能为空', trigger: 'change'}
                    ],
                    endTime: [
                        {required: true, type: 'date', message: '结束时间为大于开始时间的整10分钟', trigger: 'change'}
                    ],
                    topic: [
                        {required: true, message: '请输入topic', trigger: 'change'}
                    ],
                    consumerGroup: [
                        {required: true, message: '请输入consumerGroup', trigger: 'change'}
                    ],
                    type: [
                        {required: true, message: '请输入type', trigger: 'change'}
                    ]
                },
                title: '',
                columns: [],
                data: [],
            }
        },
        methods: {
            onTopicSelect(value) {
                this.showConsumer = false;
                this.formValidate.consumerGroup = '';
                if( value == 'totoro') {
                    this.showConsumer = true;
                    this.consumerList = [
                        {
                            value: 'tf-iot-streams-DS-application.0.0.1',
                            label: 'tf-iot-streams-DS-application.0.0.1'
                        }
                    ]
                }
                if( value == "domain_99a5d13d-9a83-459b-a2e1-c5a9fb92540d_data_current") {
                    this.showConsumer = true;
                    this.consumerList = [
                        {
                            value: 'tfc-iot-trans',
                            label: 'tfc-iot-trans'
                        },
                        {
                            value: 'kafkaToTsdb',
                            label: 'kafkaToTsdb'
                        },
                        {
                            value: 'kafkaToRedis',
                            label: 'kafkaToRedis'
                        },
                    ]
                }
                if( value == 'subscription') {
                    this.showConsumer = true;
                    this.consumerList = [
                        {
                            value: 'kafkaToRedis',
                            label: 'kafkaToRedis'
                        }
                    ]
                }
            },
            formatTitle(title) {
                return title.split('\n');
            },
            handleSearch(name) {
                this.$refs[name].validate( async (valid) => {
                    if (valid) {
                        const url = `/dataMonitor/datacenter/ui/kafkameata4tsdb/`;
                        const {startTime, endTime, topic, consumerGroup, type} = this.formValidate;
                        const params = {
                            startTime: new Date(this.formValidate.startTime).getTime().toString().substr(0, 10),
                            endTime: new Date(this.formValidate.endTime).getTime().toString().substr(0, 10),
                            topic: topic,
                            consumerGroup: consumerGroup,
                            type: type
                        }
                        let res = await this.$util.http.post(url, params);
                        console.log(res);
                        if(res.status == 200 && res.data.code == 200){
                            // this.title = this.formatTitle(res.data.data.title);
                            this.title = res.data.data.title;
                            this.columns = res.data.data.columns;
                            this.data = res.data.data.data;
                        }
                    }
                })
            }
        }
    }
</script>
