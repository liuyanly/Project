<style lang="scss" scoped>
    .content {
        padding: 15px;
    }
</style>
<style lang="scss"> //
    .proxyInfo {
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
    <div class="proxyInfo">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/domains">首页</BreadcrumbItem>
                <BreadcrumbItem href="/deviceConnect">设备网关</BreadcrumbItem>
                <BreadcrumbItem href="/agent">接入代理管理</BreadcrumbItem>
                <BreadcrumbItem href="/proxy">proxy</BreadcrumbItem>
                <BreadcrumbItem href="/proxyInfo">proxy详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="content">
            <Tabs :animated="false" @on-click="changeTabs" v-model="panel">
                <TabPane label="概况" name="summary">
                    <ProxyDetail :proxyId="proxyId" :config="proxyInfo"></ProxyDetail>
                </TabPane>
                <TabPane label="接入" name="connect">
                    <ProxyConnect :proxyId="proxyId" :connect="connect" ref="proxyConnect"></ProxyConnect>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import config from '@/config/config.js';
    import ProxyDetail from './info/ProxyDetail';
    import ProxyConnect from './info/ProxyConnect';

    export default {
        components: {
            ProxyDetail,
            ProxyConnect
        },
        data () {
            return {
                proxy: {},
                proxyInfo: config.info.proxy,
                connect: false,
                panel: "summary",
            }
        },
        created() {
            let params = this.$util.common.getQueryString();
            this.proxyId = params.id;
            if(params.status){
                this.panel = params.status;
            }
        },
        methods: {
            changeTabs(name) {
                this.connect = name === 'connect' ? true : false;
            }
        }
    }
</script>
