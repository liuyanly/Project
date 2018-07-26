<style scoped>
    .echart {
        /*margin-top: 30px;*/
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<template>
    <div class="echart">
        <div ref="line" :style="sty" :option="line"></div>
    </div>
</template>

<script>
    let echarts = require('echarts/lib/echarts');    // 引入折线图组件
    require('echarts/lib/chart/line');   //引入提示框和图例组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/legend');
    export default {
        props: {
            sty: {
                type: Object,
                default: {},
            },
            data: {
                type: Object,
                default: {},
            }
        },
        data() {
            return {
                option: {},
                series:[],
                legend:[],
                line:''
            }
        },
        mounted() {
            this.line= this.$echarts.init(this.$refs['line']);
        },
        watch: {
            data: {
                handler: function (val, oldval) {
                    this._getDigital();
                },
                deep: true
            },
        },
        methods: {
            _drawLine() {
                this.$nextTick(function() {
                    this.line.setOption(this.option);
                });
            },
            _getDigital() {

                this.series = [];
                this.lengend = [];
                for(let key of this.data.yAxis) {
                    this.series.push({
                        name: key.name,
                        type: this.data.type,
                        data: key.data
                    });
                    this.legend.push(key.name);
                }
                this.option =  {
                    title: {
                        text: this.data.title,
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    color: ['#6cf5f2'],
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data: this.legend,
                        bottom: 0,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    textStyle: {
                        color: '#90b7da',
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            axisLine:{
                              lineStyle:{color: '#525e68'}
                            },
                            data: this.data.xAxis,
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                              lineStyle: {color: '#525e68'}
                            },
                            splitLine: {
                              lineStyle:{color: '#525e68'}
                            }
                        }
                    ],
                    series: this.series
                };
                this._drawLine();
            }
        }
    }

</script>
