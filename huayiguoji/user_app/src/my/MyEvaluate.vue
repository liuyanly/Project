<template>
    <div class="my-evaluate-box">
        <headers headName="我的评价"></headers>
        <div class="contentScollr">
        <div class="box" :style="{'-webkit-overflow-scrolling': scrollMode}" style="overflow:auto">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore" :autoFill=false bottomPullText='上拉刷新' bottomLoadingText='加载中......'>
        <ul class="evaluate-list">
            <li v-for='data in dataList' @click="viewDetail(data.id)">
                <div class="clear">
                    <p class="left"><scoreReadOnly :gradeNum="data.stars"></scoreReadOnly></p>
                    <p class="right time-p">
                        {{data.created_at.substring(0,16)}}
                    </p>
                </div>
                <div class="content-word">
                    {{data.content}}
                </div>
                <div class="user-info clear">
                    <img :src="data.doctor.translates.avatar_img" class="left" />
                    <span class="name left">{{data.doctor.realname}}</span>
                    <span class="identity left">{{data.doctor.translates.department_title +" "+data.doctor.jobtitle}}</span>
                    <span class="right type-name" v-if="data.service.type==0">图文咨询</span>
                    <span class="right type-name" v-if="data.service.type==1">电话咨询</span>
                    <span class="right type-name" v-if="data.service.type==2">视频咨询</span>
                    <span class="right type-name" v-if="data.service.type==3">咨询</span>
                    <span class="right type-name" v-if="data.service.type==4">就近</span>
                    <span class="right type-name" v-if="data.service.type==5">策划</span>
                </div>
            </li>
        </ul>
        </mt-loadmore>
        </div>
        <p class="noData" v-if="dataList.length == 0">暂无评价</p>
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
                .left{
                    float: left;
                }
                .right{
                    float: right;
                }
                padding:.9rem /* 37/40 */ .8rem /* 30/40 */ 1.1rem /* 43/40 */ .8rem /* 30/40 */;
                background: #fff;
                margin-bottom: .5rem /* 20/40 */;
                .time-p{
                    font-size: .6rem /* 24/40 */;
                    color: #999;
                    line-height: .8rem /* 32/40 */;
                }
                .content-word{
                    margin-top: 1rem /* 39/40 */;
                    margin-bottom: .5rem /* 20/40 */;
                    line-height: .9rem /* 36/40 */;
                    font-size: .7rem /* 28/40 */;
                    color: #333;
                }
                .user-info{
                    height: 1.6rem /* 66/40 */;
                    border-radius: .8rem /* 33/40 */;
                    background: #f5f5f5;
                    >img{
                        width: 1.6rem /* 66/40 */;
                        height: 1.6rem /* 66/40 */;
                        border-radius: 50%;
                        margin-right: .5rem /* 20/40 */;
                    }
                    span{
                        font-size: .6rem /* 24/40 */;
                        color:#999;
                        line-height: 1.6rem;
                    }
                    .name{
                        font-size: .7rem /* 28/40 */;
                        color:#333;
                        margin-right: .6rem /* 24/40 */;
                    }
                    .type-name{
                        margin-right: .8rem /* 32/40 */;
                    }
                }
            }
        }
    }
</style>
