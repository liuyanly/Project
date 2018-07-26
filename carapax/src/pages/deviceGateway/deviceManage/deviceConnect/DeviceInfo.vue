<style lang="scss" scoped>
    .content {
        padding: 15px;
        .refresh {
            position: absolute;
            right: 30px;
            z-index: 999;
        }
    }
</style>

<style lang="scss">
    .tabs {
        height: 100%;
        display: flex;
        flex-direction: column;
        .content {
            flex: 1;
            position: relative;
            >div {
                height: 100%;
                display: flex;
                flex-direction: column;
                .ivu-tabs-content {
                    flex: 1;
                    // height: 0px;
                    .ivu-tabs-tabpane {
                        height: 100%;
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="tabs">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备管理</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备接入</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备控制台</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <Button type="text" icon="refresh" class="refresh" :style="{display: btnRefresh ? 'block' : 'none'}" @click="refresh()">刷新</Button>
            <Tabs :animated="false" @on-click="changeTabs">
                <TabPane label="概况" name="summary" class="device-summary">
                    <deviceInfoSummary></deviceInfoSummary>
                </TabPane>
                <TabPane label="接入" name="connect">
                    <deviceInfoConnect ref="connect"></deviceInfoConnect>
                </TabPane>
                <TabPane label="影子" name="shadow">
                    <deviceInfoShadow ref="shadow"></deviceInfoShadow>
                </TabPane>
                <TabPane label="消息" name="msg">
                    <deviceInfoMsg ref="msg"></deviceInfoMsg>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import deviceInfoSummary from './deviceInfo/deviceInfoSummary.vue';
    import deviceInfoConnect from './deviceInfo/deviceInfoConnect.vue';
    import deviceInfoShadow  from './deviceInfo/deviceInfoShadow.vue';
    import deviceInfoMsg     from './deviceInfo/deviceInfoMsg.vue';


    export default {
        components: {
            deviceInfoSummary,
            deviceInfoConnect,
            deviceInfoShadow,
            deviceInfoMsg
        },
        data () {
            return {
                btnRefresh: false,
                deviceId: '',
                refreshType: '',

            }
        },
        created() {
            const params = this.$util.common.getQueryString();
            this.deviceId = params.id;
        },
        methods: {
            clearConnectTimer() {
                clearInterval(this.$refs.connect.timer);    //统计信息定时器
                if(this.$refs.connect.socket) {
                    this.$refs.connect.close();             //websocket
                }
            },
            changeTabs(name) {
                if(name !== 'connect') {
                    this.clearConnectTimer();
                }
                switch(name) {
                    case 'connect':
                        this.btnRefresh = false;
                        this.$refs.connect.getDeviceStatistics(this.deviceId);
                        break;
                    case 'shadow':
                        this.btnRefresh = true;
                        clearInterval(this.$refs.connect.timer);
                        this.$refs.shadow.getDeviceShadow(this.deviceId,10,1);
                        this.refreshType = 'shadow';

                        break;
                    case 'msg':
                        this.btnRefresh = true;
                        this.refreshType = 'msg';
                        this.$refs.msg.getMessageList(this.deviceId);
                        break;
                    default:
                        this.btnRefresh = false;
                        break;
                }
            },
            refresh() {
                if(this.refreshType === 'shadow') {
                    this.refreshDeviceShadow(this.deviceId);
                } else if(this.refreshType === 'msg') {
                    this.refreshDeviceMsg(this.deviceId);
                }
            },
            refreshDeviceShadow(deviceId) {
                console.log(deviceId);
                this.$refs.shadow.deviceShadow = [];
                this.$refs.shadow.shadowLoading = true;
                this.$refs.shadow.getDeviceShadow(deviceId);
            },
            refreshDeviceMsg(deviceId) {
                this.$refs.msg.deviceMsg = [];
                this.$refs.msg.msgLoading = true;
                this.$refs.msg.getMessageList(deviceId);
            },
        },
        beforeDestroy() {
            this.clearConnectTimer();
        }
    }
</script>
