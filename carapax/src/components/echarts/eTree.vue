

<style scoped>
    .echart {
        margin-top: 30px;
    }
</style>
<template>
    <div class="echart">
        <div ref="tree" style="width: 1000px;height: 800px;" ></div>
    </div>
</template>

<script>
    let echarts = require('echarts/lib/echarts') ;
    require('echarts/lib/chart/tree');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');

    export default {
        props: {
            data: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                option: {},
                tree: '',
                sed:'',
                data:{
                    "name": "flare",
                    "children": [
                        {
                            "name": "data",
                        }
                    ]
                }
            }
        },
        watch: {
            data: {
                handler: function (val) {
                    this.data = val;
                    this._getData(val);
                },
                deep: true
            }
        },
        mounted() {
            this.tree = this.$echarts.init(this.$refs['tree']);
        },
        methods: {
            _getData(val) {
                this.option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'click',
                        formatter: (params,target) => {
                            getData(params);
                        }
                    },
                    legend: {
                        top: '2%',
                        left: '3%',
                        orient: 'vertical',
                        data: [{
                            name: 'tree1',
                            icon: 'rectangle'
                        }],
                        borderColor: '#c23531'
                    },
                    series:[
                        {
                            type: 'tree',

                            name: 'tree1',

                            data: [data1],

                            top: '5%',
                            left: '7%',
                            bottom: '2%',
                            right: '60%',

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

                            expandAndCollapse: true,

                            animationDuration: 550,
                            animationDurationUpdate: 750

                        }
                    ]
                };
                this._DrawLine(this.option, true)
            },
            _DrawLine(option) {
                this.$nextTick(function() {
                    this.tree.setOption(option,{});
                });
            },
            getInfo(params){
                let xhr = new XMLHttpRequest();
                if (xhr.withCredentials === undefined) return false;

                xhr.open("get", 'http://192.168.207.10:8088/data/tree?id=' + params.data.id);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState !== 4) return;
                    if (xhr.status === 200) {
                        let res = JSON.parse(xhr.responseText);
                        if (params.data.id === 1) {
                            this.$set(this.data, 'children', res.data);
                        }else if((params.data.id) > 10 && (params.data.id <20)){
                            let num = this.getNum(params.data);
                            this.$set(this.data.children[num], 'children', res.data);
                            this.sed = num;
                        }else if((params.data.id) > 100 && (params.data.id <200)){
                            let num = this.getNum(params.data);
                            this.$set(this.data.children[this.sed].children[num], 'children', res.data);
                        }
                    }
                };
                xhr.send(null);

            },
            getNum(ele){
                //获取子元素数组号
                let num=0;
                if((ele.id) > 10 && (ele.id <20)) {
                    for(let key of this.data.children){
                        if(!(key.id === ele.id)){
                            ++num;
                        }else{
                            break;
                        }

                    }
                }else{
                    console.log(this.sed);

                    /*for(let key of (this.data.children[this.sed].children)){
                        if(!(key.id === ele.id)){
                            ++num;
                        }else{
                            break;
                        }

                    }*/
                }

                return num;
            }

        }
    }

</script>
