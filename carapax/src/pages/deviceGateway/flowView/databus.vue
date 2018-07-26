<style lang="scss" scoped>
    @import "./proxyConnect.scss";
</style>

<template>
   <div class="proxy-connect">
            <div class="connect">
                <div class="title">
                    <span>databus实时接入</span>
                    <a @click="onWebsocket">{{btnValue}}</a>
                </div>
                <div class="content">
                    <div v-for="item of webSocketData" class="ws-item">
                        <p class="ws-status" v-if="!item.time">{{item}}</p>
                        <p class="ws-info" v-else>
                            <span class="connect-time">{{item.time}}</span>
                            <span :class="item.show ? 'connect-data-show' : 'connect-data'" @click="item.show = !item.show">{{item.data}}</span>
                        </p>

                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import config from '@/config/config';
    import Statistics from '@/components/statistics/Statistics';

    export default {
        name: 'databus',
        components: {
            Statistics
        },
        data () {
            return {
                connectData: {
                    failNum: '0',
                    failSize: '0'
                },
                exceptionDevices: [],
                msgCount: 0,
                firstMsg: '',
                btnValue: '查看',
                checkWebSocket: false,
                webSocketData: [],
                socket: '',

            }
        },
        computed: {
            firstMsgColor() {
                return this.firstMsgState ? "#ccc" : "red";
            }
        },
        methods: {
            onWebsocket() {
                if(!this.checkWebSocket) {
                    this.checkWebSocket = true;
                    this.btnValue = '关闭';
                    this.connet(this.proxyId);
                } else {
                    this.checkWebSocket = false;
                    this.btnValue = '查看';
                    this.close(this.proxyId);
                }
            },
            clearTimerAndWebsocket() {
                clearInterval(this.timer);
                if(this.socket) {
                    this.socket.close();
                }
            },
            connet(proxyId) {
                const baseUrl = config.baseUrl.gateway.replace(/http:\/\//g, '');
                const url = `ws://${baseUrl}/ws/databus/?token=${localStorage.token}`;
                console.log(url);
                let socket = new WebSocket(url);
                this.socket = socket;
                socket.onopen = () => {
                    console.log("Socket 已打开");
                };
                socket.onerror = function(evt) {
                    console.log(evt);
                };
                socket.onclose = () => {
                    this.webSocketData.push("Socket已关闭");
                    console.log("Socket已关闭");
                    this.checkWebSocket = false;
                    this.btnValue = '查看';
                };
                socket.onmessage = (msg) => {
                    console.log(msg)
                    let data = msg.data.split('||');
                    if(data[0] === "success") {
                        this.webSocketData.push("数据接入 success");
                        this.webSocketData.push(msg.data);

                        console.log("数据接入 success");
                    }else if(data[0] === 'error'){
                        this.webSocketData.push(msg.data);
                        this.webSocketData.push("数据接入 error");
                    }else{
                        let proxyInfo = JSON.parse(data[1]);
                        this.webSocketData.push({
                            show: false,
                            time: this.$util.common.formatDateTime(proxyInfo.arriveCollector.toString()),
                            data: msg.data
                        });
                    }
                };
            },
            close() {
                this.socket.close();
                this.checkWebSocket = true;
                this.btnValue = '正在关闭websocket....';
            },
        },
        beforeDestroy () {
            this.clearTimerAndWebsocket();
        }
    }
</script>
