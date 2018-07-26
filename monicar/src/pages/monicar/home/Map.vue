<style lang="scss" scope>
    .BMap_cpyCtrl {  
        display: none;  
    }  
    .anchorBL {  
        display: none;  
    }
    .infoBox {
        width: 270px;
        height: 185px;
        padding: 10px;
        border-radius: 4px;
        color: #f3f3f3;
        background: rgb(23, 78, 115);
        cursor: auto;
        img {
            top: 0;
        }
        .check-more {
            text-align: center;
            cursor: pointer;
            padding-top: 2px;
            margin-top: 5px;
            border-top: 1px #043454 solid;
        }
    }
</style>

<template>
    <div id="map" :style="{height: height + 'px'}"></div>
</template>

<script>
import config from '@/config/config.js';
export default {
    name: 'Map',
    props:{
        height: {
            type: Number,
            default: 500
        },
        // data: {
        //     type: Object,
        //     default: {}
        // }
    },
    data () {
        return {

        }
    },
    mounted () {
        this.map = this.initMap();
        let mapDom = document.getElementById("map");
        mapDom.style.backgroundColor = 'inherit';     //去掉地图右边的白色竖线
        this.getDevicesGps();
        // this.showAllDevice();
    },
    methods: {
        initMap() {
            let map = new BMap.Map("map");              // 创建Map实例
            map.enableScrollWheelZoom(true);            //开启鼠标滚轮缩放
            map.centerAndZoom(new BMap.Point(104.11977, 30.646012), 5);  // 初始化地图,设置中心点坐标和地图级别
            const mapStyle = {
                features: ["road", "building","water","land"],  //隐藏地图上的poi
                style : "midnight"                              //设置地图风格
            }
            map.setMapStyle(mapStyle);
            return map;
        },
        requestData(url, callback) {
            let xhr = new XMLHttpRequest();
            if (xhr.withCredentials === undefined) return false;
            xhr.open("get", url);
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) return;
                if (xhr.status === 200) {
                    let res = JSON.parse(xhr.responseText);
                    callback(res);
                }
            }
            xhr.send();
        },
        getDevicesGps() {
            const url = `${config.baseUrl}/datacenter/ui/number?type=allgpsdata`;
            this.requestData(url, this.showAllDevice);
        },
        showAllDevice(res) {
            let markers = [];
            for(let item of res.data) {
                let coordinateData = item['GPS 坐标'];
                coordinateData = coordinateData.replace(/{/g, '');
                coordinateData = coordinateData.replace(/}/g, '');
                let coordinate = coordinateData.split(',');
                let point  = new BMap.Point(coordinate[0], coordinate[1]);
                let marker = new BMap.Marker(point);
                this.checkPointInfo(marker, point, item);
                markers.push(marker);
            }
            let markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers:markers});     //点聚合
            // let myStyles = [{
            //     url: endPoint,  //图标路径
            //     size: new BMap.Size(50, 51),  //图标大小
            //     textColor: '#fff',  //文字颜色
            //     textSize: 14  //字体大小
            // }];
            // markerClusterer.setStyles(myStyles);

            //点击查看设备详情
            
        },
        checkPointInfo(marker, point, info) {
            const opts = {
                width : 200,        // 信息窗口宽度
                height: 180,        // 信息窗口高度
                background: '#1C3659',
                title : "设备信息" , // 信息窗口标题
            };

            let infoBox = new BMapLib.InfoBox(this.map, '',{   // 创建infoBox窗口对象 
                closeIconUrl: '../../../static/images/icon_close.png'
                // closeIconUrl: '/carapax-bi/static/images/icon_close.png'
                ,enableAutoPan: true
                ,align: INFOBOX_AT_TOP
            });
            marker.addEventListener("click", () => {          
                const url = `${config.baseUrl}/datacenter/ui/number?type=meta&deviceid=${info.deviceid}`;
                this.requestData(url, (res) => {
                    const info = res.data;
                    let message = '';
                    for(let key in info) {
                        message = message + `<p><label>${key}：&nbsp</label><span>${info[key]}</span></p>`;
                    }
                    message = message + `<div class="check-more">查看更多</div>`
                    infoBox._content = message;
                    infoBox.open(marker);
                });
            });
            
            
        }
    }
}
</script>

<style>

</style>
