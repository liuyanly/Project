<template>
    <div class="my-patient">
        <headers headName='选择患者'></headers>
        <div class="contentScollr">
        <div class="content"  :style="{'-webkit-overflow-scrolling': scrollMode}">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"  bottomPullText='上拉刷新' bottomLoadingText='加载中......'>
            <ul class="order-list already-complete">
                <li class="clear" @click="serviceList(data.id)" v-for="data in dataList">
                    <div class="img-box left">
                        <img :src="data.translates.avatar_img" class="head-img" />
                    </div>
                    <div class="left info-box">
                        <p class="name">
                            {{data.realname}}
                        </p>
                        <p class="user-info">
                            {{data.translates.sex}}&emsp;{{data.translates.sex}}岁
                        </p>
                        <p class="status">
                            症状：{{data.illness}}
                        </p>
                    </div>
                </li>
            </ul>
            </mt-loadmore>
        </div>
    </div>
    </div>
</template>
<script>
    //导入模板
    import headers from "../components/Header.vue";
    export default {
        data (){
            return{
                doctorId:this.$route.params.doctorId,
                temId:this.$route.params.temId,
                dataList: [],
                currentPage:1,
          	    per_page:8,
          	    total_page:0,
          	    allLoaded:false,//分页
          	    scrollMode:"auto",
            }
        },
        mounted(){
            this.BaseSet.getToken(this)
            this.getList()
        },
        methods:{
            loadBottom() {
                if(this.currentPage<this.total_page){
      			  if(this.currentPage==this.total_page){
      				  this.$toast('已经是最后一页了')
      				this.allLoaded = true;// 若数据已全部获取完毕
      			  }
      			  if(this.currentPage<this.total_page){
      				  this.currentPage=this.currentPage+1
      				  this.getList()
      				  this.$refs.loadmore.onBottomLoaded();
      			  }else{

      			  }
      		  }
      	  },
            serviceList(id){
                this.$router.push({name:'PublishMsg',params:{patientId:id,doctorId:this.doctorId,temId:this.temId}});
            },
            getList(){
                var that = this
                that.$ajax.get('/user/assistant_user?per_page='+that.per_page+'&page='+that.currentPage)
                .then(function(res){
                    if(res.data.status==200){
                        if(res.data.data.paginate.total_page==0){
        					that.$toast('暂无数据')
        				}else{
        					for(var i=0; i<res.data.data.user.length;i++){
        						that.dataList.push(res.data.data.user[i])
        					}
        					that.total_page=res.data.data.paginate.total_page
        				}
        				if(that.currentPage==that.total_page){
        					that.allLoaded = true;// 若数据已全部获取完毕
        				}
        				that.$nextTick(function () {
        					 // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
        					 // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
        					 // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
        					 that.scrollMode = "touch";
        			   });
      			  }else if(res.data.status==401){
      				  that.BaseSet.linkLogin(that)
      			  }else{
      				  that.$toast(res.data.message)
      			  }
                })
                .catch(function(err){
                    that.BaseSet.linkLogin(that)
                })
            }
        },
        components: {headers},
    }
</script>
<style lang="scss" scoped>
a{
    color:#fff;
}
    .my-patient{
        display: flex;
    	height: 100%;
    	flex-direction: column;
    	.contentScollr{
    		flex: 1;
    		overflow: scroll;
    		-webkit-overflow-scrolling:touch;
    	}
        .order-list{
            //margin-top: .5rem /* 20/40 */;
            width: 100%;
            overflow: hidden;
            background: #fff;
            border-top: 1px solid #e5e5e5;
            li{
                width: 100%;
                border-bottom: #e5e5e5 1px solid;
                overflow: hidden;
                box-sizing: border-box;
                padding: .75rem;
                font-size: 0;
                .left{
                    float: left;
                }
                .right{
                    float: right;
                }
                .img-box{
                    position: relative;
                    .head-img{
                        width: 2.5rem /* 50/20 */;
                        height: 2.5rem /* 50/20 */;
                        border-radius: 50%;
                    }
                }
                .info-box{
                    margin-left: 0.5rem /* 10/20 */;
                    .name{
                        font-size: 0.7rem /* 14/20 */;
                        color: #444;
                        line-height: 1rem /* 20/20 */;
                    }
                    .user-info{
                        font-size: 0.6rem /* 12/20 */;
                        color: #666;
                        line-height: 0.8rem /* 17/20 */;
                    }
                    .status{
                        font-size: 0.6rem /* 12/20 */;
                        color:#ff4646;
                        line-height: 0.8rem /* 17/20 */;
                    }
                }
            }
        }
    }
</style>
