<style rel="stylesheet/scss" lang="scss" scoped>
    .content {
        padding: 15px;
        table {
            margin-bottom: 25px;
            width: 100%;
        }
    }
    .info-header {
        text-align: left;
        margin-top: 10px;
        margin-bottom: -1px;
        height: 40px;
        background: #F5f6FA;
        line-height: 38px;
        border: 1px solid #e1e6eb;
        position: relative;
        border-left: 4px solid #6d7781;
        .title {
            font-size: 14px;
            color: #333333;
            display: inline-block;
            margin-left: 16px;
        }
    }
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
    .device-list {
        margin-right: 20px;
        display: inline-block;
    }
</style>

<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备管理</BreadcrumbItem>
                <BreadcrumbItem href="/deviceTag">设备标签</BreadcrumbItem>
                <BreadcrumbItem href="/deviceTagInfo">详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <div>
                <InfoTable title="设备标签详情" :config="deviceTagInfo" :data="deviceTag">
                    <tr slot="body">
                        <td colspan=3>
                            <span class="label">设备列表：</span>
                            <span class="device-list" v-for="item of deviceList">
                                <a @click="checkDeviceInfo(item.id)">{{item.name}}</a>
                            </span>
                        </td>
                    </tr>
                </InfoTable>
            </div>
        </div>
    </div>
</template>
<script>
    import InfoTable from '@/components/infoTable/InfoTable';
    import config from '@/config/config.js';
    export default {
        components: {
            InfoTable
        },
        data () {
            return {
                deviceList: [],
                deviceTag: {},
                deviceTagInfo: config.info.deviceTag,
            }
        },
        created() {
            const deviceTagId = this.$router.history.current.query.id;
            this.deviceTag = this.getdeviceTagInfo(deviceTagId);
            this.getDeviceList(deviceTagId);
        },
        methods: {
            async getDeviceList(deviceTagId) {
                let deviceListUrl = `/gateway/tags/${deviceTagId}/devices/`;
                let response = await this.$util.http.get(deviceListUrl);
                this.deviceList = response.data.data;
            },
            checkDeviceInfo(deviceId) {
                console.log(deviceId);
                this.$router.push({path: '/deviceInfo', query: { id: deviceId}});
            },
            getdeviceTagInfo(deviceTagId) {
                const { deviceTagList } = this.$store.state.gateway;
                if(deviceTagList) {
                    return deviceTagList.find((tag) => tag.id === deviceTagId);
                } else {
                    //http请求， 暂无api
                }
            }
        }
    }
</script>
