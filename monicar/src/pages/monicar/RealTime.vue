<style scoped>
    h1 {
        text-align: center;
        font-size: 24px;
    }
    .real-head {
        padding: 30px 0 30px;
        border-bottom: 1px dashed #e9e9e9;
    }
    .table-item{
        margin-bottom: 25px;
    }
</style>
<style>
    .ivu-table td, .ivu-table th {
        height: 32px;
    }
</style>

<template>
    <div>
        <div class="real-head">
            <Row>
                <Col span="4" offset="1">
                <Select v-model="companyId" >
                    <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </Col>
                <Col span="2" offset="1">
                <Button type="info" @click="changeDevice">查询</Button>
                </Col>
            </Row>

        </div>
        <div class="table-box">
            <Row>
                <Col span="7" offset="1">
                    <div class="table-item">
                        <etable :data="carInfo"></etable>
                    </div>
                    <div class="table-item">
                        <etable :data="carOwner"></etable>
                    </div>
                    <div class="table-item">
                        <etable :data="gpsInfo"></etable>
                    </div>
                    <div class="table-item">
                        <itable :data="dsInfo"></itable>
                    </div>
                </Col>
                <Col span="14" offset="1">
                    <itable :data="canBus"></itable>
                </Col>
            </Row>
        </div>

    </div>
</template>

<script>
    import config from '@/config/config.js';
    import etable from '@/components/echarts/eTable.vue';
    import itable from '@/components/echarts/edemo.vue';
    export default {
        components: {
            etable,
            itable
        },
        data(){
            return {
                companyList: [],
                companyId: '',
                carInfo: {},
                carOwner: {},
                gpsInfo: {},
                canBus: {},
                dsInfo:{},
            }
        },
        created() {
            this.getData(`${config.baseUrl}/datacenter/config/sn`,(val)=>{
                this.companyList = val.data;
                if(this.companyList.length > 0){
                    this.changeId(this.companyList[0].value);
                }
            });
        },
        methods: {
            changeId(id) {
                this.getData(`${config.baseUrl}/datacenter/ui/table?type=car&deviceid=${id}`, (val) => {
                    this.carInfo = val;
                });
                //品牌信息
                this.getData(`${config.baseUrl}/datacenter/ui/table?type=user&deviceid=${id}`, (val) => {
                    this.carOwner = val;
                });
                //车主信息
                this.getData(`${config.baseUrl}/datacenter/ui/table?type=gpsdata&deviceid=${id}`, (val) => {
                    this.gpsInfo = val;
                });
                //gps信息
                this.getData(`${config.baseUrl}/datacenter/ui/table?type=canbusinfo&deviceid=${id}`, (val) => {
                    this.canBus = val;
                });
                //canbusinfo信息
                this.getData(`http://192.168.103.30:8080/datacenter/ui/table?type=dsinfo&deviceid=${id}`, (val) => {
                    this.dsInfo = val;
                });
            },
            getData(url, fun) {
                let xhr = new XMLHttpRequest();
                if (xhr.withCredentials === undefined) return false;

                xhr.open("get", url);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState !== 4) return;
                    if (xhr.status === 200) {
                        let res = JSON.parse(xhr.responseText);
                        console.log(res);
                        fun(res);
                    }
                };
                xhr.send(null);
            },
            changeDevice(){
                console.log(this.companyId);
                this.changeId(this.companyId);
            }
        }
    }
</script>
