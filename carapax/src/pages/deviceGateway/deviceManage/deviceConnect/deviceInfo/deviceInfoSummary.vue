<style lang="scss" scoped>
    .device-summary {
        >div {
            display: flex;
        }
        .device-info {
            flex: 1;
            padding-right: 15px;
            .info-header {
                text-align: left;
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
        }
        .device-action {
            @media screen and (max-width: 2000px) and (min-width: 1600px) {
                width: 400px;
                padding: 0 20px;
            }
            padding: 0 15px;
            width: 350px;
            min-height: 410px;
            border-left: 1px solid #e0e1e1;
            .action {
                >div{
                    width: 45%;
                    display: inline-block;
                }
                button {
                    outline: none;
                    display: inline-block;
                    height: 32px;
                    width: 100%;
                    margin: 0 15px 10px 15px;
                    color: #333;
                    border: 1px solid #ddd;
                    background-color: #f7f7f7;
                    &:hover {
                        background-color: #fff;
                    }
                }
            }
        }
    }
    .tag-list {
        margin-right: 20px;
    }
</style>
<template>
    <div>
        <div class="device-info">
            <InfoTable type="separate" title="设备信息" :config="deviceInfo" :data="device">
                <tr slot="body">
                    <td><span class="label">设备类型</span></td>
                    <td>
                        <a v-if="device.type" @click="checkDeviceTypeInfo(device.type.id)">{{device.type.name}}</a>
                    </td>
                </tr>
                <tr slot="body">
                    <td><span class="label">设备标签</span></td>
                    <td>
                        <span class="tag-list" v-for="tag in tags">
                            <a @click="checkDeviceTagInfo(tag.id)">{{tag.name}}</a>
                        </span>
                    </td>
                </tr>
                <tr slot="body">
                    <td><span class="label">接入方式</span></td>
                    <td>
                        <a v-if="device.proxy" @click="checkProxyInfo(device.proxy.id)">{{device.proxy.name}}</a>
                    </td>
                </tr>
                <tr slot="body">
                    <td><span class="label">profile</span></td>
                    <td>
                        <Form :model="profileFrom">
                            <Row
                                v-for="(value, key, index) in profiles"
                                :key="index"
                            >
                                <Col span="16">
                                    <EnableEditSpan :data="{key: key, value: value}" @onChange="onProfileChange"></EnableEditSpan>
                                </Col>
                                <Col span="4">
                                    <Button type="text" @click="deleteProfile(index)">删除</Button>
                                </Col>
                            </Row>
                        </Form>
                    </td>
                </tr>
            </InfoTable>
        </div>
        <div class="device-action">
            <div class="header">
                <span class="title">操作</span>
            </div>
            <div class="action">
                <div><button>操作1</button></div>
                <div><button>操作2</button></div>
                <div><button>操作3</button></div>
                <div><button>操作4</button></div>
            </div>
        </div>
    </div>
</template>
<script>
    import InfoTable from '@/components/infoTable/InfoTable';
    import EnableEditSpan from './EnableEditSpan';

    import config from '@/config/config.js';

    export default {
        components: {
            InfoTable,
            EnableEditSpan,
        },
        data () {
            return {
                profiles: {},
                profileFrom: { items:[{ profile: '' }] },
                deviceInfo: config.info.device,
                device: {},
                tags: [],
            }
        },
        created() {
            const deviceId = this.$router.history.current.query.id;
            this.deviceId = deviceId;
            const deviceList = this.$store.state.gateway;
            this.getDeviceInfo(deviceId);
            this.getProfile(deviceId);
            this.getTag(deviceId);
        },
        methods: {
            async getDeviceInfo(deviceId) {
                let response = await this.$util.http.get(`/gateway/devices/${deviceId}/`);
                this.device = response.data.data;
            },
            async getTag(deviceId){
                const url = `/gateway/devices/${deviceId}/tags/`;
                let res = await this.$util.http.get(url);
                this.tags = res.data.data;
                console.log(this.tags);
            },
            async getProfile(deviceId) {
                const url = `/gateway/devices/${deviceId}/profile/`;
                let res = await this.$util.http.get(url);
                this.profiles = res.data.data;
            },
            async updateProfile(url, data) {
                let res = await this.$util.http.patch(url, data);
                if(res.status === 200 && res.data.status === 'success') {
                    this.profiles = res.data.data;
                }
            },
            async deleteProfile(index) {
                const url = `/gateway/devices/${this.deviceId}/profile/`;
                let i = 0;
                for(let key in this.profiles) {
                    if(index === i) {
                        let res = await this.$util.http.delete(url, [key]);
                        if(res.status === 200 && res.data.status === 'success') {
                            this.$delete(this.profiles, key);
                        }
                    }
                    i++;
                }
            },

            onProfileChange(newProfiles) {
                const url = `/gateway/devices/${this.deviceId}/profile/`;
                this.updateProfile(url, newProfiles);
            },
            checkProxyInfo(id) {
                this.$router.push({ path: '/proxyInfo', query: { id: id }})
            },
            checkDeviceTypeInfo(id) {
                this.$router.push({ path: '/deviceTypeInfo', query: { id: id }})
            },
            checkDeviceTagInfo(id) {
                this.$router.push({ path: '/deviceTagInfo', query: {id: id}})
            }
        }
    }
</script>