<!--
 属性               说明            类型          备注
 title             柱状图名称       String        可选
 resourceName      数据说明         String        必填
 xData             横轴坐标         Array         必填
 yData             纵轴坐标         Array         必填

 说明： 横坐标有多少下标，纵坐标就有多少值，如果多了或是少了就会出现问题
-->

<style scoped>
    .echart {
        margin-top: 30px;
    }
</style>
<template>
    <div class="echart">
        <div ref="bar" :style="sty"></div>
    </div>
</template>

<script>
    let echarts = require('echarts/lib/echarts') ;
    require('echarts/lib/chart/bar');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');

    export default {
        props: {
            sty: {
                type: Object,
                default: {}
            },
            data: {
                type: Object,
                default: {}
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
                    this._drawLine();
                },
                deep: true
            },
        },
        methods: {
            _drawLine(){
                this.option = {
                    title: {
//                        text: 'Name',//title 应该是可传可不传
                        text: this.data.title
                    },
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
//                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], //xAxis轴的设置
                            data:this.data.xAxis,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
//                            name: '直接访问', //数据来源名称
                            name: this.resourceName,
                            type: 'bar',
                            barWidth: '60%',
//                            data: [10, 52, 200, 334, 390, 330, 220] //yAxis轴的值
                            data: this.data.yAxis
                        }
                    ]
                };
                this.$nextTick(function() {
                    this.bar.setOption(this.option);
                });
            }
        }
    }

</script>
