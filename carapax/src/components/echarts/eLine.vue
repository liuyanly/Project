<style scoped>
    .echart {
        margin-top: 30px;
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
                    this._getDigital(val);
                },
                deep: true
            },
        },
        methods: {
            _getDigital(val) {
                this.series = [];
                this.lengend = [];
                for(let key of val.yAxis) {
                    console.log(key)
                    this.series.push({
                        name: key.name,
                        type: this.data.type,
                        data: key.data
                    });
                }
                this.option =  {
                    title: {
                        text: val.title
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data: this.legend
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data: val.xAxis
                        }
                    ],
                    yAxis : [{
                            type : 'value'
                        }],
                    series : this.series
                };
                this._drawLine();
            },
            _drawLine() {
                this.$nextTick(function() {
                    this.line.setOption(this.option);
                });
            },
        }
    }

</script>
