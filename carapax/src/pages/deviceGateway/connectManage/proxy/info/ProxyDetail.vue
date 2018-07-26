<style lang="scss" scoped>
    .device-list {
        margin-right: 15px;
        display: inline-block;
    }
</style>

<template>
    <div>
        <InfoTable title="设备类型详情" :config="config" :data="proxy">
            <template slot="header">
                <a style="margin-left: 20px" @click="downloadKey()">秘钥下载</a>
                <a style="margin-left: 20px" @click="downloadCert()">证书下载</a>
                <a id="key"></a>
                <a id="cert"></a>
            </template>
            <tr slot="body">
                <td colspan="3">
                    <span class="label">设备列表：</span>
                    <span class="device-list" v-for="item of deviceList">
                        <a @click="checkDeviceInfo(item.id)">{{item.name}}</a>
                    </span>
                </td>
            </tr>
        </InfoTable>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import InfoTable from '@/components/infoTable/InfoTable';
    export default {
        components: {
            InfoTable
        },
        data () {
            return {
                proxy: {},
                deviceList: [],
                key: '',
                cert: '',
                type: '',
                color: ''
            }
        },
        name: 'proxyDetail',
        props: {
            proxyId: {
                type: String,
                default: ''
            },
            config: {
                type: Array,
                default: []
            }
        },
        async created() {
            this.proxy = await this.getProxyInfo(this.proxyId);
            this.deviceList = await this.getDeviceList(this.proxyId);
        },
        methods: {
            async downloadCert() {
                let id = this.proxy.id;
                if(this.cert) {
                    let aLink = document.getElementById('cert');
                    this.$util.common.downloadFile(aLink, id + '.crt', [this.cert]);
                } else {
                    let aLink = document.getElementById('cert');
                    let res = await this.$util.http.get(`/gateway/cert/${this.proxy.cert}/`);
                    const { key, cert } = res.data.data;
                    this.key = key;
                    this.cert = cert;
                    this.$util.common.downloadFile(aLink, id + '.crt', [this.cert]);
                }
            },
            async downloadKey() {
                let id = this.proxy.id;
                if(this.key) {
                    let aLink = document.getElementById('key');
                    this.$util.common.downloadFile(aLink, id + '.key', [this.key]);
                } else {
                    let aLink = document.getElementById('key');
                    let res = await this.$util.http.get(`/gateway/cert/${this.proxy.cert}/`);
                    const { key, cert } = res.data.data;
                    this.key = key;
                    this.cert = cert;
                    this.$util.common.downloadFile(aLink, id + '.key', [this.key]);
                }
            },
            async getProxyInfo(proxyId) {
                const url = `/gateway/proxy/${proxyId}/`;
                let res = await this.$util.http.get(url);
                if(res.status === 200) {
                    let proxy = res.data.data;
                    this.type = proxy.is_enabled ? "checkmark-circled" : "android-cancel";
                    this.color = proxy.is_enabled ? '#19be6b' : '#ccc';
                    return proxy;
                }
            },
            async getDeviceList(proxyId) {
                let deviceListUrl = `/gateway/proxy/${proxyId}/devices/`;
                let response = await this.$util.http.get(deviceListUrl);
                if(response.status === 200) {
                    if(response.data.data === null) {
                        response.data.data = [];
                    }
                }   
                return response.data.data;
            },
            checkDeviceInfo(deviceId) {
                console.log(deviceId);
                this.$router.push({path: '/deviceInfo', query: { id: deviceId}});
            },
        }
    }
</script>
