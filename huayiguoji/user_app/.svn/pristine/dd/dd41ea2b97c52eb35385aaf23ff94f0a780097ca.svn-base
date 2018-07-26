<template>
    <div class="my-evaluate">
        <headers headName="我的评价"></headers>
        <div class="contentScollr">
        <ul class="evaluate-list">
            <li>
                <div class="user-info clear">
                    <img :src="headImg" class="left" />
                    <span class="name left">{{doctorInfo.realname}}</span>
                    <span class="identity left">{{department}}&nbsp;(医生)</span>
                    <span class="right type-name" v-if="type==0">图文咨询</span>
                    <span class="right type-name" v-if="type==1">电话咨询</span>
                    <span class="right type-name" v-if="type==2">视频咨询</span>
                    <span class="right type-name" v-if="type==3">咨询</span>
                    <span class="right type-name" v-if="type==4">就近</span>
                    <span class="right type-name" v-if="type==5">策划</span>
                </div>
                <div class="content-word">
                    {{contentWord}}
                </div>
                <ul class="img-list clear">
                    <!-- <li>
                        <img src="../assets/images/a_image1.png" />
                    </li>
                    <li>
                        <img src="../assets/images/a_image1.png" />
                    </li>
                    <li>
                        <img src="../assets/images/a_image1.png" />
                    </li>
                    <li>
                        <img src="../assets/images/a_image1.png" />
                    </li>
                    <li>
                        <img src="../assets/images/a_image1.png" />
                    </li>
                    <li>
                        <img src="../assets/images/a_image1.png" />
                    </li> -->
                </ul>
                <div class="clear star-p">
                    <p class="left"><scoreReadOnly v-if="flag" :gradeNum="fGradeNum"></scoreReadOnly></p>
                    <p class="right time-p">
                        {{time}}
                    </p>
                </div>
                <ul class="tag-list clear">
                    <li v-for="data in tags">{{data}}</li>
                </ul>
            </li>
        </ul>
    </div>
    </div>
</template>
<script>
    import headers from "../components/Header";
    import scoreReadOnly from "../components/ScoreReadOnly";
    export default {
        data(){
            return{
                fGradeNum:4,
                id:this.$route.params.id,
                department:'',
                contentWord:'',
                time:'',
                type:'',
                tags:[],
                headImg:'/src/assets/images/avatar.png',
                doctorInfo:'',
                flag:false,
            }
        },
        mounted(){
            this.getDetail()
        },
        methods:{
            getDetail(){
                var that = this
                that.$ajax.get('/user/mycomment/'+that.id)
                .then(function(res){
                    if(res.data.status==200){
                        console.log(res.data.data)
                        that.contentWord = res.data.data.content
                        that.time = res.data.data.created_at.substring(0,16)
                        that.headImg = res.data.data.doctor.translates.avatar_img
                        that.department = res.data.data.doctor.translates.department_title
                        that.doctorInfo = res.data.data.doctor
                        that.type = res.data.data.service.type
                        that.fGradeNum = res.data.data.stars
                        that.flag = true
                        that.tags = res.data.data.tags
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
        components:{headers,scoreReadOnly},
    }
</script>
<style lang="scss" scoped>
    .my-evaluate{
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
                padding:.4rem /* 16/40 */ 0 0 /* 43/40 */ 0;
                background: #fff;
                margin-bottom: .5rem /* 20/40 */;
                .time-p{
                    font-size: .6rem /* 24/40 */;
                    color: #999;
                    line-height: .8rem /* 32/40 */;
                    padding: 0 .8rem;
                }
                .star-p{
                    padding: 0 .8rem;
                    margin-top: 1.2rem /* 48/40 */;
                }
                .content-word{
                    margin-top: .8rem /* 30/40 */;
                    margin-bottom: .5rem /* 20/40 */;
                    line-height: .9rem /* 36/40 */;
                    font-size: .7rem /* 28/40 */;
                    color: #333;
                    padding: 0 .8rem;
                }
                .tag-list{
                    background: #fff;
                    padding: 0 .8rem /* 30/40 */;
                    padding-bottom: 1.6rem /* 63/40 */;
                    margin-top: 1rem /* 53/40 */;
                    margin-bottom: 1.4rem /* 58/40 */;
                    li{
                        float: left;
                        width: 3.1rem /* 126/40 */;
                        height: 1.5rem /* 60/40 */;
                        font-size: .6rem /* 24/40 */;
                        color:#999;
                        text-align: center;
                        line-height: 1.5rem /* 60/40 */;
                        border: 1px solid #999;
                        border-radius: .3rem /* 10/40 */;
                        margin-right: .3rem /* 10/40 */;
                        margin-bottom: .9rem /* 36/40 */;
                        &:nth-of-type(5n){
                            margin-right: 0;
                        }
                    }
                }
                .img-list{
                    padding: 0 .8rem;
                    padding-bottom: .8rem /* 30/40 */;
                    border-bottom: 1px solid #e5e5e5;
                    li{
                        float: left;
                        margin-right: .1rem /* 6/40 */;
                        width: 5.6rem /* 223/40 */;
                        height: 4.1rem /* 164/40 */;
                        margin-bottom: .3rem /* 10/40 */;
                        img{
                            width: 5.6rem /* 223/40 */;
                            height: 4.1rem /* 164/40 */;
                        }
                        &:nth-of-type(3n){
                            margin-right: 0;
                        }
                    }
                }
                .user-info{
                    height: 1.6rem /* 66/40 */;
                    border-radius: .8rem /* 33/40 */;
                    background: #f5f5f5;
                    padding: 0 .8rem;
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
