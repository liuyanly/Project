<style scoped>
    .echart {
        margin-top: 30px;
    }
</style>
<template>
    <div class="echart">
        <div ref="pie" :style="sty" :option="option"></div>
    </div>
</template>

<script>
    let echarts = require('echarts/lib/echarts');    // 引入饼图组件
    require('echarts/lib/chart/pie');   //引入提示框和图例组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/legend');
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
                itemName: [],
                pie: '',
            }
        },
        watch: {
            data: {
                handler: function (val, oldval) {
                    this._getOption(val);
                },
                deep: true
            },
        },
        mounted() {
            this.pie= this.$echarts.init(this.$refs['pie']);
        },
        methods: {
            _getOption(val) {
                for(let key of val.data) {
                    this.itemName.push(key.name);
                }
                this.option = {
                    title: {
                        text: val.title,
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.itemName,
                    },
                    series: [
                        {
                            name: val.sourcename,
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: val.data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                this._drawLine();
            },
            _drawLine() {
                this.$nextTick(function() {
                    this.pie.setOption(this.option);
                });
            }
        }
    }

</script>
