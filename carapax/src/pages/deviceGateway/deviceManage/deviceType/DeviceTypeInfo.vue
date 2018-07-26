<style rel="stylesheet/scss" lang="scss" scoped>
    .create-attr {
        &:before {
            content: "*";
            display: inline-block;
            margin-right: 4px;
            line-height: 1;
            font-family: SimSun;
            font-size: 12px;
            color: #ed3f14;
        }
    }
    .loading {
        color: #2d8cf0;
    }
    .device-list {
        margin-right: 20px;
        display: inline-block;
    }
    .label {
        display: inline-block;
        color: #999;
        min-width: 60px;
        text-align: right;
    }
</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备管理</BreadcrumbItem>
                <BreadcrumbItem href="/deviceType">设备类型</BreadcrumbItem>
                <BreadcrumbItem href="/deviceType">详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <Tabs :animated="false">
                <TabPane label="概况" name="summary">
                    <InfoTable title="设备类型详情" :config="deviceTypeInfo" :data="deviceType">
                        <tr slot="body">
                            <td colspan="3">
                                <span class="label">设备列表：</span>
                                <span class="loading" v-if="loadingDeviceList">加载中...</span>
                                <span class="device-list" v-else v-for="item of deviceList">
                                    <a @click="checkDeviceInfo(item.id)">{{item.name}}</a>
                                </span>
                            </td>
                        </tr>
                    </InfoTable>
                </TabPane>
                <TabPane label="物理指标" name="physics">
                    <DeviceTypeAttr :id="deviceType.id" :type="'physics'"></DeviceTypeAttr>
                </TabPane>
                <TabPane label="计算指标" name="calculate">
                    <DeviceTypeAttr :id="deviceType.id" :type="'calculate'"></DeviceTypeAttr>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
    import InfoTable from '@/components/infoTable/InfoTable';
    import DeviceTypeAttr from './DeviceTypeAttr.vue';
    import config from '@/config/config.js';
    export default {
        components: {
            InfoTable,
            DeviceTypeAttr
        },
        data () {
            return {
                deviceType: {},
                deviceTypeInfo: config.info.deviceType,
                deviceList: [],
                loadingDeviceList: true
            }
        },
        async created() {
            const deviceTypeId = this.$router.history.current.query.id;
            this.getDeviceTypeInfo(deviceTypeId);
            this.getDeviceList(deviceTypeId);
        },
        methods: {
            async getDeviceTypeInfo(deviceTypeId) {
                const url = `/gateway/devicetypes/${deviceTypeId}/`;
                let res = await this.$util.http.get(url);
                if(res.status === 200) {
                    this.deviceType = res.data.data;
                }
            },
            async getDeviceList(deviceTypeId) {
                const deviceListUrl = `/gateway/devicetypes/${deviceTypeId}/devices/`;
                let res = await this.$util.http.get(deviceListUrl);
                if(res.status === 200) {
                    this.loadingDeviceList = false;
                    this.deviceList = res.data.data;
                }
            },
            checkDeviceInfo(deviceId) {
                console.log(deviceId);
                this.$router.push({path: '/deviceInfo', query: { id: deviceId}});
            },
        }
    }
</script>
