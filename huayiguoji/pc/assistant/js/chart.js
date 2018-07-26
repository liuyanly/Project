/**
 * Created by Administrator on 2017/11/20.
 */
function x_word(params) {
    var newParamsName = ""; // 最终拼接成的字符串
    var paramsNameNumber = params.length; // 实际标签的个数
    var provideNumber = 6; // 每行能显示的字的个数
    var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
    if (paramsNameNumber > provideNumber) {
        /** 循环每一行,p表示行 */
        for (var p = 0; p < rowNumber; p++) {
            var tempStr = ""; // 表示每一次截取的字符串
            var start = p * provideNumber; // 开始截取的位置
            var end = start + provideNumber; // 结束截取的位置
            // 此处特殊处理最后一行的索引值
            if (p == rowNumber - 1) {
                // 最后一次不换行
                tempStr = params.substring(start, paramsNameNumber);
            } else {
                // 每一次拼接字符串并换行
                tempStr = params.substring(start, end) + "\n";
            }
            newParamsName += tempStr; // 最终拼成的字符串
        }

    } else {
        // 将旧标签的值赋给新标签
        newParamsName = params;
    }
    //将最终的字符串返回
    return newParamsName
}

function oneLine(x_data, lineData, id, name) {
    var option = {
        /*title: {
         text: '身高变化趋势图',
         textStyle: {
         fontSize:14,
         }
         },*/
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: x_data,
            axisLabel: { //轴上文字标签的样式
                color: '#999',
                margin: 15,
                // formatter: this.x_word,
                fontSize: 14,
            },
            axisLine: {
                lineStyle: {
                    color: '#e5e5e5'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e5e5e5',
                    width: 1
                }
            },
        }],
        yAxis: [{
            type: 'value',
            max: function(value) {
                return value.max + 30;
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e5e5e5',
                    width: 1
                }
            },
            axisLine: { //刻度线的颜色
                lineStyle: {
                    color: '#e5e5e5'
                }
            },
            axisLabel: {
                color: '#999',
                fontSize: 14
            }

        }],
        series: [{
            name: name,
            type: 'line',
            symbol: 'circle',
            symbolSize: 6.6,
            smooth: true, //设置为曲线
            label: { //提示标志样式
                normal: {
                    show: true,
                    backgroundColor: { image: 'images/f7_bg1.png' },
                    color: '#fff',
                    padding: [5, 5, 5, 5],
                    fontSize: 13,
                }
            },
            lineStyle: {
                normal: {
                    color: '#FC4F4F',
                    width: 4
                }
            },
            areaStyle: {
                normal: {
                    color: { //背景填充色
                        type: 'linear', //线性渐变
                        x: 1,
                        y: 1,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: '#fff' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#FC4F4F' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    opacity: 0.3,
                }
            },
            itemStyle: {
                normal: {
                    color: 'red',
                }
            },
            data: lineData
        }]
    };
    var lineChart = echarts.init(document.getElementById(id));
    lineChart.setOption(option);
}

function twoLine(data, id) {
    //图例配置
    var legendData = []
        //折线配置
    var lineData = []
    for (var i = 0; i < data.length; i++) {
        var tem = {
            name: data[i].title,
            icon: 'circle', //图例图形形状
            textStyle: { //图例文字样式
                fontSize: 16,
                color: '#666'
            }
        }
        legendData.push(tem)
        var tem2 = {
            name: data[i].title,
            type: 'line',
            symbol: 'circle',
            symbolSize: 6.6,
            smooth: true, //设置为曲线图
            data: data[i].data,
            label: {
                normal: {
                    show: true,
                    backgroundColor: data[i].color,
                    color: '#fff',
                    fontSize: 13,
                    padding: [5, 5, 10, 5],
                }
            },
            itemStyle: {
                normal: {
                    color: data[i].color,
                    lineStyle: {
                        color: data[i].color
                    }
                }
            },
        }
        lineData.push(tem2)
    }
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: { //图例
            itemWidth: 8, //图例图形宽度
            itemHeight: 8, //图例图形高度
            top: 20,
            right: 100, //图例组件离容器右侧的距离。
            itemGap: 40, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
            data: legendData,
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: data[0].date,
            axisLine: {
                lineStyle: {
                    color: '#e5e5e5'
                }
            },
            axisLabel: { //轴上文字标签的样式
                color: '#999',
                margin: 15,
                fontSize: 14,
                // formatter: this.x_word
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e5e5e5',
                    type: 'solid',
                    width: 1
                }
            },
        }],
        yAxis: [{
            type: 'value',
            splitNumber: 4,
            axisLine: { //轴线条颜色
                lineStyle: {
                    color: '#e5e5e5'
                }
            },
            axisLabel: {
                color: '#999',
                fontSize: 14,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e5e5e5',
                    type: 'solid',
                    width: 1
                }
            },
            splitArea: { //图表背景间隔颜色
                show: true,
                areaStyle: {
                    color: ['#4CC6D8', '#FF9B1A'],
                    opacity: 0.17
                }
            }
        }],
        series: lineData,
    };
    var myChart = echarts.init(document.getElementById(id));
    myChart.setOption(option);
}

function twoBar(twoBar_data, id, nameData, barName) {
    var option = {
        tooltip: {
            show: true
        },
        xAxis: [{
            type: 'category', //默认为类目
            data: nameData,
            axisLine: {
                lineStyle: {
                    color: '#e5e5e5'
                }
            },
            axisLabel: { //轴上文字标签的样式
                color: '#666',
                margin: 15,
                formatter: this.x_word,
                fontSize: 14,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e5e5e5',
                    width: 2
                }
            },
        }],
        yAxis: [{
            type: 'value', //默认为值类型
            minInterval: 0.5,
            axisLabel: { //轴上文字标签的样式
                color: '#666',
                margin: 15,
                formatter: this.x_word,
                fontSize: 14,
            },
            axisLine: {
                lineStyle: {
                    color: '#e5e5e5'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e5e5e5',
                    width: 2
                }
            },
        }],
        series: [{
            name: barName,
            type: 'bar',
            data: twoBar_data,
            barWidth: 136, //柱图宽度
            itemStyle: {
                normal: {
                    color: function(params) {
                        //首先定义一个数组
                        var colorList = [
                            '#41EABA', '#37D3CA', '#ACEF4B', '#8DC53C'
                        ];
                        //return colorList[params.dataIndex]
                        var index = 0;
                        if (params.dataIndex == 0) {
                            index = 0;
                        } else {
                            index = 2;
                        }
                        return new echarts.graphic.LinearGradient(1, 1, 0, 1, [{
                            offset: 0,
                            color: colorList[index]
                        }, {
                            offset: 1,
                            color: colorList[index + 1]
                        }])
                    },
                }
            }
        }]

    };
    var myChart3 = echarts.init(document.getElementById(id));
    myChart3.setOption(option);
}

function barLine(lineData, barData, id) {
    var option = {
        title: {
            text: '',
            left: 'center',
            textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 16,
            }
        },
        tooltip: {
            //触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
            trigger: 'axis'
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true, //坐标轴两边留白
            data: ['当前', '目标'],
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                margin: 15,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,

                }
            },
            axisTick: { //坐标轴刻度相关设置。
                show: false,
            },
            axisLine: { //坐标轴轴线相关设置
                lineStyle: {
                    color: '#e5e5e5'
                }
            },
            splitLine: { //坐标轴在 grid 区域中的分隔线。
                show: true,
            }
        }],
        yAxis: [{
            type: 'value',
            splitNumber: 5,
            axisLabel: {
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#e5e5e5'
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#e5e5e5'],
                }
            }

        }],
        series: [{
                name: '总胆固醇',
                type: 'bar',
                data: lineData,
                barWidth: 40,
                barGap: 0, //柱间距离
                label: { //图形上的文本标签
                    normal: {
                        /*show: true,
                         position: 'top',
                         textStyle: {
                         color: '#a8aab0',
                         fontStyle: 'normal',
                         fontFamily: '微软雅黑',
                         fontSize: 12,
                         },*/
                    },
                },
                itemStyle: { //图形样式
                    normal: {
                        color: '#4cc6d8',
                    },
                },
            },
            {
                name: '低密度脂蛋白',
                type: 'bar',
                data: barData,
                barWidth: 40,
                barGap: 0.12, //柱间距离
                label: { //图形上的文本标签
                    normal: {
                        /*show: true,
                         position: 'top',
                         textStyle: {
                         color: '#a8aab0',
                         fontStyle: 'normal',
                         fontFamily: '微软雅黑',
                         fontSize: 12,
                         },*/
                    },
                },
                itemStyle: { //图形样式
                    normal: {
                        color: '#FFD52E',
                    },
                },
            },
            {

                name: '总胆固醇',
                type: 'line',
                symbolSize: 6,
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: '#FF902E',
                        barBorderRadius: 0,
                        /*label:{
                         show:true,
                         position:'top',
                         formatter:function(p){
                         return p.value > 0 ? (p.value) : '';
                         }
                         }*/
                    }
                },
                lineStyle: {
                    normal: {
                        type: 'dashed',
                        color: '#FF902E',
                        width: 2,
                    }
                },
                data: lineData
            }

        ]
    };
    var myChart4 = echarts.init(document.getElementById(id));
    myChart4.setOption(option);
}

function barLine2(lineData, barData, id) {
    var option = {
        title: {
            text: '',
            left: 'center',
            textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 16,
            }
        },
        tooltip: {
            //触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
            trigger: 'axis'
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true, //坐标轴两边留白
            data: ['当前', '目标'],
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                margin: 15,
                textStyle: {
                    color: '#666',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 13,

                }
            },
            axisTick: { //坐标轴刻度相关设置。
                show: false,
            },
            axisLine: { //坐标轴轴线相关设置
                lineStyle: {
                    color: '#e5e5e5'
                }
            },
            splitLine: { //坐标轴在 grid 区域中的分隔线。
                show: true,
            }
        }],
        yAxis: [{
            type: 'value',
            splitNumber: 5,
            axisLabel: {
                textStyle: {
                    color: '#666',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 13,
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#e5e5e5'
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#e5e5e5'],
                }
            }

        }],
        series: [{
                name: '总胆固醇',
                type: 'bar',
                data: lineData,
                barWidth: 45,
                barGap: 0, //柱间距离
                label: { //图形上的文本标签
                    normal: {
                        /*show: true,
                        position: 'top',
                        textStyle: {
                            color: '#a8aab0',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: 12,
                        },*/
                    },
                },
                itemStyle: { //图形样式
                    normal: {
                        color: '#4cc6d8',
                    },
                },
            },
            {
                name: '低密度脂蛋白',
                type: 'bar',
                data: barData,
                barWidth: 45,
                barGap: 0.12, //柱间距离
                label: { //图形上的文本标签
                    normal: {
                        /*show: true,
                        position: 'top',
                        textStyle: {
                            color: '#a8aab0',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: 12,
                        },*/
                    },
                },
                itemStyle: { //图形样式
                    normal: {
                        color: '#FFD52E',
                    },
                },
            },
            {

                name: '总胆固醇',
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: '#FF902E',
                        barBorderRadius: 0,
                        /*label:{
                         show:true,
                         position:'top',
                         formatter:function(p){
                         return p.value > 0 ? (p.value) : '';
                         }
                         }*/
                    }
                },
                lineStyle: {
                    normal: {
                        type: 'dashed',
                        color: '#FF902E',
                        width: 3,
                    }
                },
                data: lineData
            }

        ]
    };
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
}