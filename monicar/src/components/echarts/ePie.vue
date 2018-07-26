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
                    this._getOption();
                },
                deep: true
            },
        },
        mounted() {
            console.log(this.sty);
            this.pie= this.$echarts.init(this.$refs['pie']);
            // this._getOption();
        },
        methods: {
            _getOption() {
                for(let key of this.data.data) {
                    this.itemName.push(key.name);
                }
                this.option = {
                    title: {
                        text: this.data.title,
                        x: 'center',
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    color: ['#2cdaff', '#1677c8', '#f35842', '#62c87f', '#ffcf4c', '#aac7ee'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.itemName,
                        textStyle: {
                            color: '#90b7da'
                        }
                    },
                    series: [
                        {
                            name: this.data.sourcename,
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: this.data.data,
                            textStyle: {
                                color: '#90b7da'
                            },
                            label: {
                                normal: {
                                  textStyle: {
                                    color: '#90b7da'
                                  }
                                }
                            },
                            labelLine: {
                                normal: {
                                  lineStyle: {
                                    color: '#90b7da'
                                  }
                                }
                            },
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
