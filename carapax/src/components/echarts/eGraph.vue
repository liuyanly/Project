<style scoped>
    .echart {
        margin-top: 30px;
    }
    a.e-item{
        display: block;
        cursor: pointer;
        color: #fff;
    }
</style>
<template>
    <div class="echart">
        <div ref="bar" style="width: 1300px; height: 700px;"></div>
    </div>
</template>
<script>
    let echarts = require('echarts/lib/echarts') ;
    require('echarts/lib/chart/tree');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    import router from '@/router/index.js';
    export default {
        props:{
              data:{
                  type: Array,
                  default: []
              }
        },
        data() {
            return {
                option: {},
                bar: ''
            }
        },
        mounted() {
            this.bar = echarts.init(this.$refs['bar']);
            this._drawLine();
        },
        watch: {
            data: {
                handler: function (val, oldval) {
                    this._drawLine(val);
                },
                deep: true
            },
        },
        methods: {
            _drawLine(val){
                this.option = {
                    tooltip: {
                        showContent: true,
                        trigger: 'item',
                        triggerOn: 'mousemove',
                        enterable: true,
                    },
                    legend: {
                        top: '2%',
                        left: '3%',
                        orient: 'vertical',
                        data: [
                            {
                                name: '设备关系图',
                                icon: 'rectangle'
                            }],
                        borderColor: '#c23531'
                    },
                    series:[
                        {
                            type: 'tree',
                            name: '设备关系图',
                            data: [{"name": "TSDB",
                                "children": [
                                    {
                                        "name": "kafka",
                                        "children": [
                                            {
                                                "name": "emqtt",
                                                "children": val,
                                                "tooltip":{
                                                    "formatter": function () {
                                                        let div="";
                                                        for(let key of val) {
                                                            div+=`<div><a href="/#/proxyInfo?id=${key.id}&status=connect" class="e-item">${key.name}</a></div>`;
                                                        }
                                                        return div;
                                                    }
                                                },
                                                'itemStyle': {
                                                    'normal':{
                                                        'borderColor': '#5ec430'
                                                    }
                                                }
                                            }
                                        ],
                                        "tooltip":{
                                            "formatter": function () {
                                                return `<a href="/#/databus">设备接入总线</a>`;
                                            }
                                        },
                                        'itemStyle': {
                                            'normal':{
                                                'borderColor': '#5ec430'
                                            }
                                        }
                                    },
                                ],
                                "tooltip":{
                                    "formatter": function () {
                                        return `<a href="/#/deviceData">设备数据</a>`;
                                    }
                                },
                                'itemStyle': {
                                    'normal':{
                                        'borderColor': '#5ec430'
                                    }
                                }}],
                            top: '5%',
                            left: '7%',
                            bottom: '2%',
                            right: '10%',
                            symbolSize: 7,
                            label: {
                                normal: {
                                    position: 'left',
                                    verticalAlign: 'middle',
                                    align: 'right'
                                }
                            },
                            leaves: {
                                label: {
                                    normal: {
                                        position: 'right',
                                        verticalAlign: 'middle',
                                        align: 'left'
                                    }
                                }
                            },
                            itemStyle:{
                              normal: {
                                  color: '#ccc'
                              }
                            },
                            tooltip:{
                                position:'right'
                            },
                            expandAndCollapse: true,
                            initialTreeDepth: 3,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        },
                    ]
                };
                this.$nextTick(function() {
                    this.bar.setOption(this.option);
                });
            },
        }
    }
</script>
