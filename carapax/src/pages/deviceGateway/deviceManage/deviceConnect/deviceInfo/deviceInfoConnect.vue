<style lang="scss" scoped>
    @import './deviceConnect.scss';
</style>
<template>
    <div class="device-connect">
        <Row :gutter="20" class="statistics">
            <Col span="6">
                <Statistics backgroundColor="#19be6b" :num="connectNum.successNum" text="接入成功数量"></Statistics>
            </Col>
            <Col span="6">
                <Statistics backgroundColor="#f25e43" :num="connectNum.failNum" text="接入失败数量"></Statistics>
            </Col>
            <Col span="6">
                <Statistics backgroundColor="#19be6b" :num="connectNum.successSize" text="接入成功数据"></Statistics>
            </Col>
            <Col span="6">
                <Statistics backgroundColor="#f25e43" :num="connectNum.failSize" text="接入失败数据"></Statistics>
            </Col>
        </Row>
        <div class="connect">
            <div class="title">
                <span>设备实时接入</span>
                <a @click="onWebsocket()">{{btnValue}}</a>
            </div>
            <div class="content">
                <p v-if="firstMsg" style="paddingTop: 10px; paddingBottom: 10px;">
                    <span>{{firstMsg}}</span>
                </p>
                <p v-for="item of webSocketMsg">
                    <span class="connect-time">{{item.time}}</span>
                    <span :class="item.show ? 'connect-data-show' : 'connect-data'" @click="item.show = !item.show">{{item.data}}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import config from '@/config/config.js';
    import Statistics from '@/components/statistics/Statistics';

    const { DEVICE } = config.timer;

    export default {
        components: {
            Statistics,
        },
        data () {
            return {
                connectNum: {
                    successNum: '0',
                    successSize: '0',
                    failNum: '0',
                    failSize: '0'
                },
                msgCount: 0,
                firstMsg: '',
                btnValue: '查看',
                connectSocket: false,
                webSocketMsg: [],
            }
        },
        created() {
            const deviceId = this.$router.history.current.query.id;
            this.deviceId = deviceId;
            const deviceList = this.$store.state.gateway;
            this.getDeviceInfo(deviceId, deviceList);
        },
        methods: {
            async getDeviceInfo(deviceId, deviceList) {
                let response = await this.$util.http.get(`/gateway/devices/${deviceId}/`);
                this.device = response.data.data;
            },
            onWebsocket() {
                if(!this.connectSocket) {
                    this.firstMsg = '';
                    this.msgCount = 0;
                    this.webSocketMsg = [];
                    this.connet();
                } else {
                    this.close();
                }
            },
            connet() {
                const baseUrl = config.baseUrl.gateway.replace(/http:\/\//g, '');
                const url = `ws://${baseUrl}/ws/devicedata/${this.device.id}/?token=${localStorage.token}`;
                let socket = new WebSocket(url);
                this.socket = socket;
                socket.onopen = () => {
                    console.log("Socket 已打开");
                    this.btnValue = '关闭';
                    this.connectSocket = true;
                };
                socket.onerror = function(evt) {
                    console.log(evt);
                };
                socket.onclose = () => {
                    console.log("Socket已关闭");
                    this.btnValue = '查看';
                    this.connectSocket = false;
                };
                socket.onmessage = (msg) => {
                    console.log(msg);
                    if(this.msgCount === 0) {
                        let data = msg.data.split('||');
                        this.firstMsg = msg.data;
                        if(data[0] === "success") {
                            console.log("webSocket success");
                            this.firstMsgState = true;
                        } else {
                            this.firstMsgState = false;
                            console.log("webSocket error");
                        }
                        this.msgCount = 1;
                    } else {
                        let data = msg.data.split('||');
                        let deviceInfo = JSON.parse(data[1]);
                        this.webSocketMsg.push({
                            show: false,
                            time: this.$util.common.formatDateTime(deviceInfo.arriveCollector.toString()),
                            data: msg.data
                        });
                    }
                };

            },
            close() {
                this.btnValue = '关闭中...';
                this.socket.close();
            },
            async getDeviceStatistics(deviceId) {
                const url = `/gateway/devices/${deviceId}/data/statistics/`;
                let response = await this.$util.http.get(url);
                if(response.statusText === 'OK') {
                    this.setDeviceStatistics(response.data.data);
                    this.timer = setInterval( async () => {
                        let response = await this.$util.http.get(url);
                        this.setDeviceStatistics(response.data.data);
                    }, DEVICE);
                }
            },
            setDeviceStatistics(data) {
                const getObjKeyValue = (obj) => {       //该对象只有一个key-value
                    for(let item in obj) return obj[item];
                }
                const { total_numbers, total_size } = data;
                if(total_numbers.success) {
                    this.connectNum.successNum  = getObjKeyValue(total_numbers.success).toString();
                }
                if(total_size.success) {
                    this.connectNum.successSize  = getObjKeyValue(total_size.success).toString();
                }
                if(total_numbers.failed) {
                    this.connectNum.failNum = getObjKeyValue(total_numbers.failed).toString();
                }
                if(total_size.failed) {
                    this.connectNum.failSize= getObjKeyValue(total_size.failed).toString();
                }
            }
        }
    }
</script>