<template>
    <div class="trend-map">
        <headers headName="趋势图"></headers>
        <div class="contentScollr">
        <div class="chart-box">
            <p class="title">
                {{title}}-变化趋势
            </p>
            <div id="main">

            </div>
        </div>
    </div>
    </div>
</template>
<script>
    import headers from '../components/Header'
    export default {
        data(){
            return {
                title:this.$route.params.title,
                reId:this.$route.params.reId,
                oneLine_x:[],
                lineData:[],
            }
        },
        mounted(){
            this.getDetail()
        },
        methods:{
            getDetail(){
                console.log(this.reId)
                var that = this
                that.$ajax.get('tendency/'+that.reId)
                .then(function(res){
                    if(res.data.status == 200){
                        for(var i = 0;i<res.data.data.length;i++){
                            that.lineData.push(res.data.data[i].pivot.value)
                            that.oneLine_x.push(res.data.data[i].created_at.substring(0,10))
                        }
                        that.myChart.oneLine(that.oneLine_x,that.lineData,'main',that.title+'趋势图')
                    }
                })
                .catch(function(err){

                })
            },
        },
        components:{headers},
    }
</script>
<style lang="scss" scoped>
    .trend-map{
        background: #fff;
        display: flex;
		height: 100%;
		flex-direction: column;
		.contentScollr{
			flex: 1;
			overflow: auto;
			-webkit-overflow-scrolling:touch;
		}
        .chart-box{
            padding-bottom: 2rem;
            .title{
                padding: 0 .8rem /* 30/40 */;
                line-height: 2rem /* 80/40 */;
                color: #4CC6D8;
                font-size: .7rem /* 28/40 */;
            }
            #main{
                width: 100%;
                height: 17rem;
            }
        }
    }
</style>
