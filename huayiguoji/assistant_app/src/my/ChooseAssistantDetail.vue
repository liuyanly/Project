<template>
    <div class="my-patient">
        <headers headName='医助详情'></headers>
        <div class="head-box">
            <p class="head-img">
                <img :src="translates.avatar_img" />
            </p>
            <p class="name">
                {{assistantInfo.realname}}
            </p>
            <p class="tel-num">
                联系电话：{{assistant_account.username}}
            </p>
        </div>
        <div class="class-table">
            <table>
                <tbody>
                    <tr class="head-tr">
                        <td>日期</td>
                        <td>6.5</td>
                        <td>6.6</td>
                        <td>6.7</td>
                        <td>6.8</td>
                        <td>6.9</td>
                        <td>6.10</td>
                        <td>6.11</td>
                    </tr>
                    <tr>
                        <td>星期</td>
                        <td>一</td>
                        <td>二</td>
                        <td>三</td>
                        <td>四</td>
                        <td>五</td>
                        <td>六</td>
                        <td>日</td>
                    </tr>
                    <tr>
                        <td>上午</td>
                        <td>小明</td>
                        <td>小芳</td>
                        <td>小明</td>
                        <td>小芳</td>
                        <td>小明</td>
                        <td>小芳</td>
                        <td>小明</td>
                    </tr>
                    <tr>
                        <td>下午</td>
                        <td>小明</td>
                        <td>小芳</td>
                        <td>小明</td>
                        <td>小芳</td>
                        <td>小明</td>
                        <td>小芳</td>
                        <td>小明</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="content" :style="{'-webkit-overflow-scrolling': scrollMode}" style="overflow:auto">
			<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottomPullText='上拉刷新' bottomLoadingText='加载中......'>
        <ul class="order-list already-complete">
            <li class="clear" v-for="data in dataList">
                <div class="img-box left">
                    <img :src="data.user.translates.avatar_img" class="head-img" />
                </div>
                <div class="left info-box">
                    <p class="name">
                        {{data.user.realname}}
                    </p>
                    <p class="user-info">
                        {{data.user.translates.sex}}&emsp;{{data.user.translates.age}}岁
                    </p>
                    <p class="status">
                        症状：{{data.user.illness}}
                    </p>
                </div>
                <!-- <p class="right tag">
                    分诊
                </p> -->
            </li>
        </ul>
            </mt-loadmore>
        </div>
        <p class="sure-btn" @click="surePatient()">
            确认
        </p>
    </div>
</template>
<script>
    //导入模板
    import headers from "../components/Header.vue";
    export default {
        data (){
            return{
                patientId:this.$route.params.patientId,
                assistantId:this.$route.params.assistantId,
                assistantInfo:'',
                translates:'',
                assistant_account:'',
                scrollMode:"auto",
        		dataList:[],
        	  	currentPage:1,
        	  	per_page:7,
        	  	total_page:0,
        	  	allLoaded:false,//分页
        	  	topStatus:false,//分页
            }
        },
        mounted(){
            this.BaseSet.getToken(this)
            this.getDataList()
            this.getAssistantData()
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
      				  this.getDataList()
      				  this.$refs.loadmore.onBottomLoaded();
      			  }else{

      			  }
      		  }
      	  },
            surePatient(){
                if(this.$route.params.type==1){
                    this.$router.push({name:'DistributionTask',params:{patientId:this.patientId,assistantId:this.assistantId}});
                }else{
                    this.$router.push({name:'SignDistribution',params:{patientId:this.patientId,assistantId:this.assistantId}});
                }
            },
            getDataList(){
                var that = this
                that.$ajax.get('/assistant/member?per_page='+that.per_page+'&page='+that.currentPage)
                .then(function(res){
                    if(res.data.status == 200){
        				if(res.data.data.paginate.total_page==0){
        					that.$toast('暂无数据')
        				}else{
        					for(var i=0; i<res.data.data.member.length;i++){
        						that.dataList.push(res.data.data.member[i])
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

        			}else if(res.data.status == 401){
        				that.BaseSet.linkLogin(that)
        			}else{
        				that.$toast(res.data.message)
        			}
                })
                .catch(function(err){

                })
            },
            getAssistantData(){
                var that=this
                that.$ajax.get('/assistant/'+that.assistantId)
                .then(function(res){
                    if(res.data.status==200){
                        that.assistantInfo=res.data.data
                        that.translates=res.data.data.translates
                        that.assistant_account=res.data.data.translates.assistant_account
                    }else if(res.data.status==401){
                        that.BaseSet.linkLogin(that)
                    }else{
                        that.$toast(res.data.message)
                    }
                })
                .catch(function(err){
                    that.$toast(err)
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
        // margin-top: 2.7rem;
        .head-box{
            margin: .5rem /* 10/20 */ auto;
            width: calc(100% - 1.6rem);
            padding: .8rem /* 15/20 */ 0;
            background: #fff;
            p{
                text-align: center;
            }
            .head-img{
                >img{
                    width: 2.8rem /* 55/20 */;
                    height: 56px /* 2.8*20 */;
                    border-radius: 50%;

                }
            }
            .name{
                font-size: .7rem /* 14/20 */;
                color: #444;
                line-height: 1rem /* 20/20 */;
                margin-top: .4rem /* 8/20 */;
            }
            .tel-num{
                font-size: .65rem /* 13/20 */;
                color: #666;
                line-height: .9rem /* 18/20 */;
                margin-top: .4rem /* 8/20 */;
            }
        }
        .class-table{
            margin-bottom: .5rem /* 10/20 */;
            table{
                .head-tr td{
                    color: #4cc6d8;
                }
                width: 100%;
                background: #fff;
                tr,td{
                    border: 1px solid #e5e5e5;
                    font-size: .65rem;
                    text-align: center;
                    line-height: 1.8rem /* 35/20 */;
                    color: #999;
                }
            }
        }
        .order-list{
            //margin-top: .5rem /* 20/40 */;
            width: 100%;
            overflow: hidden;
            background: #fff;
            border-top: 1px solid #e5e5e5;
            margin-bottom: 3rem;
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
                .right{
                    font-size: 0.6rem /* 12/20 */;
                    color: #666;
                    line-height: 2.5rem /* 50/20 */;
                }
            }
        }
        .sure-btn{
            width: 100%;
            height: 2.5rem /* 50/20 */;
            line-height: 2.5rem;
            background: #4cc6d8;
            font-size: .8rem /* 15/20 */;
            color: #fff;
            text-align: center;;
            line-height: 2.5rem;
            margin-top: .5rem /* 10/20 */;
            position: fixed;
            bottom: 0;
        }
    }
</style>
