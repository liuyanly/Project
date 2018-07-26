<style lang="scss" scope>
    .BMap_cpyCtrl {  
        display: none;  
    }  
    .anchorBL {  
        display: none;  
    } 
    .condition {
        position: absolute;
        width: 250px;
        left: 80px;
        top: 100px;
        z-index: 99;
        .condition-header {
            width: 100%;
            height: 25px;
            line-height: 25px;
            color: #fff;
            text-align: center;
            cursor: move;
            z-index: 999;
            &:hover {
                background-color: #86c0fd;
            }
        }
        .condition-content {
            width: 250px;
        }
    }
    #map, .condition-header span {
        user-select: none;
    }
</style>

<template>
    <div>
        <div class="condition">
            <div class="condition-header">
                <span>{{conditionHeader}}</span>
            </div>
            <Form class="condition-content" ref="form" :model="form" :rules="rules">
                <FormItem prop="device">
                    <Select v-model="form.device">
                        <Option v-for="(option, index) in deviceList" :value="option.value" :key="index" placeholder="选择一个设备">{{option.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="startTime">
                    <DatePicker v-model="form.startTime" :options="startTimeOption" type="datetime" placeholder="开始时间" style="width: 100%"></DatePicker>
                </FormItem>
                <FormItem>
                    <DatePicker v-model="form.endTime" :options="endTimeOption" type="datetime" placeholder="结束时间" style="width: 100%"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="success" :loading="loading" @click.native="handleSubmit('form')" long>{{btn}}</Button>
                </FormItem>
            </Form>
            <!-- <Select v-model="selectDevice">
                <Option v-for="(option, index) in deviceList" :value="option.value" :key="index">{{option.label}}</Option>
            </Select> -->
        </div>
        <div id="map" style="height: 100%;"></div>
    </div>
</template>

<script>
import config from '@/config/config.js';
import util from '@/util/util.js';
import redCar from '@/assets/imgs/redCar.png';
import startPoint from '@/assets/imgs/startPoint.png';
import endPoint from '@/assets/imgs/endPoint.png';

const deviceIcon = new BMap.Icon(redCar, new BMap.Size(30, 65));
const CURRENT_TRACE_INTERVAL = config.trace.interval;
const DRAW_TIME = config.trace.drawTime;

export default {
    name: 'trace',
    data () {
        return {
            conditionHeader: '',
            selectDevice: '',
            btn: '查询',
            loading: false,
            deviceList: [],
            startTimeOption: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            },
            endTimeOption: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            },
            form: {
                device: '',
                startTime: '',
                endTime: ''
            },
            rules: {
                device: [
                    { required: true, message: '选择一个设备', trigger: 'change' }
                ]
            }
        }
    },
    created() {
        const allDeviceUrl = `${config.baseUrl}/datacenter/config/sn`;
        this.getDeviceList(allDeviceUrl);
    },
    mounted () {
        let conditionHeader = document.getElementsByClassName('condition-header')[0];
        conditionHeader.onmouseover = () => {
            this.conditionHeader = '按住此处可拖动';
        };
        conditionHeader.onmouseout = () => {
            this.conditionHeader = '';
        };
        this.setConditionDomMove();
        this.map = this.initMap();
    },
    methods: {
        setConditionDomMove() {
            let conditionHeader = document.getElementsByClassName('condition-header')[0];
            let condition = document.getElementsByClassName('condition')[0];
            conditionHeader.onmousedown = (ev) => {
                let oevent = ev || event;

                let distanceX = oevent.clientX - condition.offsetLeft;
                let distanceY = oevent.clientY - condition.offsetTop;

                document.onmousemove = (ev) => {
                    let oevent = ev || event;
                    condition.style.left = parseInt(oevent.clientX - distanceX)  + 'px';
                    condition.style.top = parseInt(oevent.clientY - distanceY) + 'px';
                };
                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        },
        initMap() {
            let map = new BMap.Map("map");          // 创建Map实例
            map.enableScrollWheelZoom(true);        //开启鼠标滚轮缩放
            map.centerAndZoom(new BMap.Point(104.11977, 30.646012), 6);  // 初始化地图,设置中心点坐标和地图级别
            map.addControl(new BMap.MapTypeControl({    //添加地图类型控件
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    BMAP_HYBRID_MAP
                ]
            }));	  
            // map.setCurrentCity("成都");          // 设置地图显示的城市 
            return map;
        },
        /* 清除所有覆盖物 */
        removeOverlay(){
            this.map.clearOverlays();         
        },

        getDeviceList(url) {
            this.$util.cors(url, (res) => this.deviceList = res.data);
        },

        //提交查询
        handleSubmit(name) {
            clearInterval(this.timer);                  //每次请求前需清除定时器
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.removeOverlay();
                    if(this.form.startTime === '' && this.form.endTime === '') {
                        const url = `${config.baseUrl}/datacenter/ui/table?type=gpsdata&deviceid=${this.form.device}`;
                        this.getCurrentPosition(url);
                    } else {
                        this.loading = true;
                        let params = {}, coordinatesUrl = '';
                        params.device = this.form.device;
                        params.start = this.form.startTime.getTime();
                        if(this.form.endTime) {
                            params.end = this.form.endTime.getTime();
                            coordinatesUrl = `${config.baseUrl}/datacenter/ui/number?type=LatLng&proxy=c4a7ac35-3d21-470b-855a-8750ba2eb570&deviceid=${params.device}&starttime=${params.start}&endtime=${params.end}`;
                        } else {
                            coordinatesUrl = `${config.baseUrl}/datacenter/ui/number?type=LatLng&proxy=c4a7ac35-3d21-470b-855a-8750ba2eb570&deviceid=${params.device}&starttime=${params.start}`;
                        }
                        this.getTrace(coordinatesUrl);
                    }
                }
            })
        },

        setGps(res) {
            let coordinateData, orientationData;
            const data = res.data.filter((currentValue,index,arr) => {
                if(currentValue.metricName === 'GPS 坐标') coordinateData = currentValue
                if(currentValue.metricName === 'GPS 当前方向') orientationData = currentValue
            });
            let coordinate = coordinateData.value.replace(/{/g, '');
            coordinate = coordinate.replace(/}/g, '');
            coordinate = coordinate.split(',');
            let orientation = orientationData.value.split('.')[0];
            return [{lng: coordinate[0], lat: coordinate[1]}, orientation];
        },
        getCurrentPosition(url) {
            let currentMarker, prePoint;
            this.$util.cors(url, async (res) => {
                if(res.data == null) {
                    this.$Notice.warning({ title: '查询成功', desc: res.title });
                    return;
                }
                const [point, orientation]  = this.setGps(res);             //格式化坐标信息
                prePoint = point;
                let convertedPt = await this.convertCoordinate(point);      //转为百度坐标
                this.map.centerAndZoom(new BMap.Point(convertedPt.lng, convertedPt.lat), 13);
                currentMarker = this.drawPoint(convertedPt, orientation);   //初始化当前位置
                this.checkPointInfo(currentMarker, new BMap.Point(convertedPt.lng, convertedPt.lat), res.data)

                this.timer = setInterval(() => {                            //定时更新位置，并绘制轨迹
                    this.$util.cors(url, async (res) => {
                        const [point, orientation]  = this.setGps(res);
                        if(point.lng != prePoint.lng || point.lat != prePoint.lat) { //如果两个点坐标不同
                            const convertedPt = await this.convertCoordinate(point);
                            currentMarker.setPosition(convertedPt);
                            const points = [
                                {x: prePoint.lng, y: prePoint.lat},
                                {x: convertedPt.lng, y: convertedPt.lat}
                            ];
                            console.log(points);
                            this.drawTrace(points);                         //上个点和当前点连线
                            prePoint = convertedPt;
                        }
                    });
                }, CURRENT_TRACE_INTERVAL);
            });
        },
        getTrace(url) {
            this.$util.cors(url, async (res) => {
                if(res.code === 200 && res.data.length) {
                    let points =  await this.convertCoordinates(res);
                    this.btn = '轨迹绘制中...';
                    const centerPoint = {       
                        lng: (points[0].lng + points[points.length - 1].lng)/2, 
                        lat: (points[0].lat + points[points.length - 1].lat)/2 
                    };
                    this.map.centerAndZoom(new BMap.Point(centerPoint.lng, centerPoint.lat), 13);   //取第一个，最后一个坐标的平均值 设置为map中心
                    this.drawTrace(points);                                 //绘制轨迹
                    let startMaker = this.drawStartAndEndIcon(points);      //绘制起始图标
                    startMaker.addEventListener("click", () => {
                        this.replayTrace(points);                           //轨迹回放
                    });
                    this.loading = false;
                    this.btn = '查询';
                } else if(res.data) {
                    this.loading = false;
                    this.$Notice.warning({
                        title: '查询成功',
                        desc: '但没有相关的数据信息！'
                    });
                } else {
                    this.loading = false;
                    this.$Notice.error({
                        title: '查询失败',
                        desc: '原因：' + res.msg
                    });
                }
            });
        },

        checkPointInfo(marker, point, infos) {
            const opts = {
                width : 350,        // 信息窗口宽度
                height: 160,        // 信息窗口高度
                title : "GPS信息" , // 信息窗口标题
            };
            let message = '';
            for(let item of infos) {
                message = message + item.metricName + ': ' + item.value + '<br />';
            }
            let infoWindow = new BMap.InfoWindow(message, opts);    // 创建信息窗口对象 
            marker.addEventListener("click", () => {
                this.map.openInfoWindow(infoWindow, point);         //开启信息窗口
            });
        },
        drawPoint(point, orientation = 0, icon = deviceIcon) {
            let marker = new BMap.Marker(point,{icon: icon});           // 创建标注
            marker.setRotation(orientation);                            // 旋转度数
            this.map.addOverlay(marker);                                // 将标注添加到地图中
            return marker;
        },
        drawTrace(points) {
            let polyline = new BMap.Polyline(points, {
                enableClicking: true,   //是否响应点击事件，默认为true
                strokeWeight:'4',       //折线的宽度，以像素为单位
                strokeOpacity: 0.8,     //折线的透明度，取值范围0 - 1
                strokeColor:"#ED3F14"   //折线颜色
            });
            this.map.addOverlay(polyline);      //增加折线
        },
        drawStartAndEndIcon(points) {           //绘制起始图标  
            const start = points[0];
            const end   = points[points.length - 1];
            const startIcon = new BMap.Icon(startPoint, new BMap.Size(30,40));
            const endIcon   = new BMap.Icon(endPoint, new BMap.Size(30,40));
            const startMaker = new BMap.Marker(start,{icon:startIcon});  
            const endMaker   = new BMap.Marker(end,{icon:endIcon});  
            this.map.addOverlay(startMaker);
            this.map.addOverlay(endMaker);
            return startMaker;
        },
        replayTrace(points) {                   //轨迹回放
            let index = 0;
            let marker = this.drawPoint(points[0]);
            let timer = setInterval(() => {
                marker.setPosition(points[index]);
                index ++;
                if(index === (points.length - 1)) {
                    clearInterval(timer);
                    let allOverlay = this.map.getOverlays();
                    this.map.removeOverlay(allOverlay[allOverlay.length - 1]);
                }
            }, DRAW_TIME / points.length );
        },


        async convertCoordinate(point) {    //坐标转换, 转为百度坐标
            const url = `/baiduMap/geoconv/v1/?coords=${point.lng},${point.lat}&from=1&to=5&ak=${config.baiduMapKey}`;
            let res = await this.$util.http.get(url);
            point = {lng: res.data.result[0].x, lat: res.data.result[0].y};
            point = new BMap.Point(point.lng, point.lat);
            return point;
        },
        async convertCoordinates(res) {     //坐标转换, 转为百度坐标(批量)
            let pointsArr = this.$util.common.splitArray(res.data, 100);   //将数据以100数量等分， 因为api坐标转换max为100
            let convertUrlArr = [];
            for(let points of pointsArr) {
                let coordinates = '';
                for(let point of points) {
                    coordinates = coordinates + (point.lng + ',' +  point.lat + ';');
                }
                coordinates = coordinates.replace(/;$/g, '');
                convertUrlArr.push(`/baiduMap/geoconv/v1/?coords=${coordinates}&from=1&to=5&ak=${config.baiduMapKey}`);
            }
            this.btn = '坐标转换中...';
            let convertCoordinates = [];
            for(let url of convertUrlArr) {
                let res = await this.$util.http.get(url);
                if(res.status === 200 & res.data.status === 0) {
                    convertCoordinates.push(...res.data.result);
                }
            }
            for(let i=0; i<convertCoordinates.length; i++) {
                convertCoordinates[i] = new BMap.Point(convertCoordinates[i].x, convertCoordinates[i].y);
            }
            return convertCoordinates;
        },
    }
}
</script>