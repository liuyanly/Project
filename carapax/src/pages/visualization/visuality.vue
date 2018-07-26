<style scoped>
    .header {
        text-align: left;
        margin-top: 10px;
        margin-bottom: -1px;
        height: 40px;
        background: #F5f6FA;
        line-height: 38px;
        border: 1px solid #e1e6eb;
        position: relative;
        border-left: 4px solid #6d7781;
    }
    .header .title {
        font-size: 14px;
        color: #333333;
        display: inline-block;
        margin-left: 16px;
    }
    .condition {
        text-align: left;
        padding: 15px 0 10px 5px;
    }
</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/visuality">可视化展示</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <Tabs value="echartPie">
                <TabPane label="饼图展示数据" name="echartPie">
                    <Row >
                        <Col span="12" >
                            <Input v-model="echartPie" type="text" placeholder="请输入需要展示的数据地址"></Input>
                        </Col>
                        <Col span="10" offset="1">
                            <Button type="primary" @click="showEchartPie">饼图展示数据</Button>
                        </Col>
                    </Row>
                    <echartPie :sty="sty" :data="epie"></echartPie>
                </TabPane>

                <TabPane label="折线图展示数据" name="echartLine">
                    <Row>
                        <Col span="12">
                            <Input v-model="echartLine" type="text" placeholder="请输入需要展示的数据地址"></Input>
                        </Col>
                        <Col span="10" offset="1">
                            <Button type="primary" @click="showEchartLine">折线图展示数据</Button>
                        </Col>
                    </Row>
                    <echartLine :sty="sty" :data="eline"></echartLine>
                </TabPane>

                <TabPane label="柱状图展示数据" name="echartBar">
                    <Row>
                        <Col span="12">
                            <Input v-model="echartBar" type="text"  placeholder="请输入需要展示的数据地址"></Input>
                        </Col>
                        <Col span="10" offset="1">
                            <Button type="primary" @click="showEchartBar">柱状图展示数据</Button>
                        </Col>
                    </Row>
                    <eBar :sty="sty" :data="ebar"></eBar>
                </TabPane>

                <TabPane label="表格展示数据" name="echartTable">
                    <Row>
                        <Col span="12">
                            <Input v-model="echartTable" type="text" placeholder="请输入需要展示的数据地址"></Input>
                        </Col>
                        <Col span="10" offset="1">
                            <Button type="primary" @click="showEchartTable">表格展示数据</Button>
                        </Col>
                    </Row>
                    <eTable :data="etable" ></eTable>
                </TabPane>
                <TabPane label="树状图" name="echartTree">
                    <Row>
                        <Col span="12">
                        <Input v-model="echartTable" type="text" placeholder="树状图"></Input>
                        </Col>
                        <Col span="10" offset="1">
                            <Button type="primary" @click="showEchartTable">树状图</Button>
                        </Col>
                    </Row>
                    <eTree :data="etree"></eTree>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery';
    import echartPie from '@/components/echarts/ePie.vue';
    import echartLine from '@/components/echarts/eLine.vue';
    import eTable from '@/components/echarts/eTable.vue';
    import eBar from '@/components/echarts/eBar.vue';
    import eTree from '@/components/echarts/eTree.vue';
    export default {
        components: {
            echartPie,
            echartLine,
            eTable,
            eBar,
            eTree
        },
        data () {
            return {
                echartPie: '',
                echartTable:'',
                echartLine:'',
                echartBar: '',
                sty: {
                    width: 800+'px',
                    height: 600+'px'
                },
                epie: {},
                eline: {},
                etable: {},
                ebar: {},
                etree:{}
            }
        },
         async created() {
             this.changeData('http://192.168.207.10:8088/data/pie?num=5',(val) => {this.epie = val;});
//             this.changeData('http://172.16.24.234:8080/datacenter/ui/line?type=TravelDistance&proxy=c4a7ac35-3d21-470b-855a-8750ba2eb570',(val) => {this.eline = val;});
//             this.changeData('http://172.16.24.234:8080/datacenter/ui/bar?type=ObdConnect&proxy=c4a7ac35-3d21-470b-855a-8750ba2eb570',(val) => {this.ebar = val;});
             this.changeData('http://192.168.207.10:8088/data/tree?id=0',(val) => {this.etree = val.data;});
        },
        methods: {
            showEchartPie() {
                let url = this.echartPie;
                this.changeData(url, (val) => {this.epie = val;});
            },
            showEchartTable() {
                let url = this.echartTable;
                this.changeData(url,(val) => {this.etable = val;});
            },
            showEchartLine() {
                let url = this.echartLine;
                this.changeData(url, (val) => {this.eline = val;});
            },
            showEchartBar() {
                let url = this.echartBar;
                this.changeData(url, (val) => {this.ebar = val;});
            },
            messageError(msg){
                this.$Message.error(msg);
            },
            changeData(url,fun) {
                let xhr = new XMLHttpRequest();
                if (xhr.withCredentials === undefined) return false;

                xhr.open("get", url);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState !== 4) return;
                    if (xhr.status === 200) {
                        let res = JSON.parse(xhr.responseText);
                        fun(res);
                    }
                };
                xhr.send(null);

            }
        }
    }
</script>
