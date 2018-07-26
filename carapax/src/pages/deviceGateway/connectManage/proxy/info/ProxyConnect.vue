<style lang="scss" scoped>
	@import "./proxyConnect.scss";
</style>

<template>
	<div class="proxy-connect">
		<div class="alarm">
			<div class="statistics">
				<Statistics style="margin-bottom: 15px;" backgroundColor="#f25e43" :num="connectData.failNum" text="接入失败数量"></Statistics>
				<Statistics style="margin-bottom: 25px;" backgroundColor="#f25e43" :num="connectData.failSize" text="接入失败数据"></Statistics>
			</div>
			<div class="exception">
				<div class="header">
					<span class="title">非法接入设备</span>
				</div>
				<div v-if="!exceptionDevices.length" class="exception-content" style="text-align: center;font-size:14px">
					<span>没有非法接入的设备</span>
				</div>
				<Timeline v-else class="exception-content">
			        <TimelineItem color="red" v-for="item of exceptionDevices" :key="item.deviceId">
						<p>
							<span class="time">{{item.time}}</span>
							<a class="info">{{item.deviceId}}</a>
						</p>
			        </TimelineItem>
			    </Timeline>
			</div>
		</div>
        <div class="connect">
            <div class="title">
                <span>proxy实时接入</span>
                <a @click="onWebsocket()">{{btnValue}}</a>
            </div>
            <div class="content">
               <!-- <p v-if="firstMsg" style="paddingTop: 10px; paddingBottom: 10px;">
                    <span :style="{color: firstMsgColor}">{{firstMsg}}</span>
                    <span >{{msgStatus}}</span>
                </p>-->
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

	const { PROXY } = config.timer;

	export default {
		components: {
            Statistics
        },
		data () {
            return {
            	connectData: {
                    // successNum: '0',
                    // successSize: '0',
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
        name: 'proxyConnect',
        props: {
            proxyId: {
                type: String,
                default: ''
            },
            connect: {
            	type: Boolean,
                default: false
            }
        },
        computed: {
            firstMsgColor() {
            	return this.firstMsgState ? "#ccc" : "red";
            }
        },
        watch: {
        	connect: function(val, oldVal) {
        		if(val) {
                    this.timer = setInterval( async () => {
                        let statistics = this.getProxyStatistics(this.proxyId);
                        this.setProxyStatistics(statistics);
                    }, PROXY);
        			this.getExceptionDevices(this.proxyId);
        		} else {
                    this.clearTimerAndWebsocket();
                }
        	}
        },
        methods: {
        	onWebsocket() {
                if(!this.checkWebSocket) {
                    this.checkWebSocket = true;
                    this.webSocketData = [];
                    this.connet(this.proxyId);
                } else {
                    this.checkWebSocket = false;
                    this.close(this.proxyId);
                }
            },
            connet(proxyId) {
            	const baseUrl = config.baseUrl.gateway.replace(/http:\/\//g, '');
                const url = `ws://${baseUrl}/ws/proxydata/${proxyId}/?token=${localStorage.token}`;
                console.log(url);
                let socket = new WebSocket(url);
                this.socket = socket;
                socket.onopen = () => {
                    this.btnValue = '关闭';
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
                    let data = msg.data.split('||');
                    if(data[0] === "success") {
                        this.webSocketData.push("数据接入 success");
                        this.webSocketData.push(msg.data);
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
            clearTimerAndWebsocket() {
                clearInterval(this.timer);
                if(this.socket) {
                    this.socket.close();
                }
            },
            async getExceptionDevices(proxyId) {
            	const formatExceptionDevices = (obj) => {
            		let arr = [];
            		for(let item in obj) {
            			arr.push({ time: obj[item], deviceId: item });
            		}
            		return arr;
            	};
            	const url = `/gateway/proxy/${proxyId}/proxystatics/`;
            	let res = await this.$util.http.get(url);
            	this.exceptionDevices = formatExceptionDevices(res.data.data);
            },
            async getProxyStatistics(proxyId) {
                const url = `/gateway/proxy/${proxyId}/proxystatics/`;
                let response = await this.$util.http.get(url);
                if(response.status === 200) return response.data.data
            },
            setProxyStatistics(data) {
            	const getObjKeyValue = (obj) => {       //该对象只有一个key-value
                    for(let item in obj) return obj[item];
                }
            	if(!data.hasOwnProperty('decode_failed_message_number')) {
            		this.connectData.failNum = '0';
            		this.connectData.failSize = '0';
            	} else {
	                const { decode_failed_message_number, decode_failed_message_size } = data;
	                this.connectData.failNum = this.getObjKeyValue(decode_failed_message_number);
	            	this.connectData.failSize = this.getObjKeyValue(decode_failed_message_size);
	            }
            }
        },
        beforeDestroy () {
            this.clearTimerAndWebsocket();
        }
	}
</script>
