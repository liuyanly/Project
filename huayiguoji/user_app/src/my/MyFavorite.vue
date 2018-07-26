<template>
    <div class="my-evaluate-box">
        <headers headName="我的收藏"></headers>
        <div class="contentScollr">
        <div class="box" :style="{'-webkit-overflow-scrolling': scrollMode}" style="overflow:auto">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore" :autoFill=false bottomPullText='上拉刷新' bottomLoadingText='加载中......'>
        <ul class="evaluate-list">
            <li v-for='data in dataList'>
                
            </li>
        </ul>
        </mt-loadmore>
        </div>
        <p class="noData" v-if="dataList.length == 0">暂无收藏</p>
    </div>
    </div>
</template>
<script>
    import headers from "../components/Header";
    import scoreReadOnly from "../components/ScoreReadOnly";
    export default {
        data(){
            return{
                fGradeNum:0,
                dataList:[],
                currentPage:1,
              	per_page:4,
              	total_page:0,
              	allLoaded:false,//分页
              	scrollMode:"auto",
            }
        },
        mounted(){
            this.BaseSet.getToken(this)
            this.getDataList()
        },
        methods:{
            //加载更多
      	  loadBottom() {
      		if(this.currentPage==this.total_page){
      			this.$toast('已经是最后一页了')
      			this.allLoaded = true;// 若数据已全部获取完毕
      		}
      		this.currentPage+=1
      		this.getDataList()
      		this.$refs.loadmore.onBottomLoaded();
      	  },
            viewDetail(id){
                this.$router.push({name:'EvaluateDetail',params:{id:id}});
            },
            getDataList(){
                var that = this
                that.$ajax.get('/user/mycomment?page='+that.currentPage+'&per_page='+that.per_page)
                .then(function(res){
                    if(res.data.status==200){
                        that.total_page=res.data.data.paginate.total_page
          			  if(that.total_page==0){
          				  that.$toast('暂无数据')
          			  }
          			  console.log(res.data.data)
          			  if(res.data.data.comment instanceof Array){
          				  that.dataList=that.dataList.concat(res.data.data.comment)
          			  }
          			  that.$nextTick(function () {
          				   that.scrollMode = "touch";
          			 });
    				}else if(res.data.status==401){
    					that.$toast('请重新登录')
    					setTimeout(function(){
    						that.$router.push({'name':'Login'})
    					},1500)
    				}else{
    					that.$toast(res.data.message)
    				}
                })
                .catch(function(err){
                    that.BaseSet.linkLogin(that)
                })
            }
        },
        components:{headers,scoreReadOnly},
    }
</script>
<style lang="scss" scoped>
.noData{
    text-align: center;
    color: #666;
    margin-top: 1rem /* 40/40 */;
    font-size: .7rem /* 28/40 */;
}
    .my-evaluate-box{
        display: flex;
		height: 100%;
		flex-direction: column;
		.contentScollr{
			flex: 1;
			overflow: auto;
			-webkit-overflow-scrolling:touch;
		}
        .evaluate-list{
            >li{
                
            }
        }
    }
</style>
