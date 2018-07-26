function chartLine(label,value,id) {
    var option = {
        title: {
            left: 'center',
            text: '',
            textStyle: {
                color: '#607D8B',
                fontSize: 11,
            }
        },
        xAxis: {
            type: 'category',
            data: label,
            axisLine: {
                lineStyle: {
                    color: '#607D8B',
                }
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#607D8B',
                }
            },
        },
        series: [{
            data: value,
            type: 'line',
            lineStyle: {
                color: '#607D8B',
            },
            itemStyle: {
                color: '#607D8B',
            }
        }]
    };
    var myChartLine = echarts.init(document.getElementById(id));
    myChartLine.setOption(option);
}
function chartpie(picData,id) {
    var option = {
        color: ['#84CCCA', '#ffffff'],
        series: [
            {
                name: '',
                type: 'pie',
                hoverOffset: 0,
                selectedOffset: 0,
                radius: ['90%', '100%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            color: '#84CCCA',
                            fontSize: '16',
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: picData
            }
        ]
    }
    var myChartpie = echarts.init(document.getElementById(id));
    myChartpie.setOption(option);
}
function chartPieLarge(data,id) {
    var option = {
        color: ['#74d669', '#faba00', '#fe6876', '#bb7dfa', '#358cf0'],
        series: [
            {
                name: '情绪',
                type: 'pie',
                selectedMode: 'single',
                radius: ['20%', '70%'],
                center: ['50%', '50%'],
                data: data,
                label: {
                    color: '#607D8B',
                },
                labelLine: {
                    lineStyle: {
                        color: '#B8CAD2',
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
    var myPie = echarts.init(document.getElementById(id));
    myPie.setOption(option);
}