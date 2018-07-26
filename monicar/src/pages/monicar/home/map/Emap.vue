<template>
    <div ref="chart" :style="sty"></div>
</template>

<script>
    import echarts from 'echarts';
    import 'echarts/map/js/china.js';
    require('echarts-gl'); 

    import geo from './geoCoordMap.js';

    export default {
        name: 'Emap',
        props: {
            sty: {
                type: Object,
                default: {},
            }
        },
        data () {
            return {
                option: {
                    tooltip: {
                        show: true,
                    },
                    geo3D: {
                        map: 'china',
                        roam: true,
                        itemStyle: {
                            areaColor: '#1d5e98',
                            opacity: 1,
                            borderWidth: 0.4,
                            borderColor: '#000'
                        },
                        label: {
                            show: false,
                        },
                        emphasis: { //当鼠标放上去  地区区域是否显示名称
                            label: {
                                show: false,
                            }
                        },
                        //shading: 'lambert',
                        light: { //光照阴影
                            main: {
                                color: '#fff', //光照颜色
                                intensity: 1.2, //光照强度
                                //shadowQuality: 'high', //阴影亮度
                                shadow: false, //是否显示阴影
                                alpha:55,
                                beta:10
                            },
                            ambient: {
                                intensity: 0.3
                            }
                        }
                    },
                    series: [{
                        name: 'bar3D',
                        type: "bar3D",
                        coordinateSystem: 'geo3D',
                        barSize: 1, //柱子粗细
                        itemStyle: {    
                            color: '#27ffff',
                            opacity: 0.8
                        },
                        shading: 'lambert',
                        opacity: 1,
                        bevelSize:0.3,
                        label: {
                            show: false,
                            formatter: '{b}'
                        },
                        data: this.convertData(geo.showGeo),
                    }]
                }
            }
        },
        mounted () {
            let chart = echarts.init(this.$refs['chart']);
            this.draw(chart, this.option);
        },
        methods: {
            draw(chart, option) {
                chart.setOption(this.option);
            },
            convertData(data) {
                let res = [];
                for (let i = 0; i < data.length; i++) {
                    let geoCoord = geo.geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            }
        }
    }
</script>

<style>

</style>
