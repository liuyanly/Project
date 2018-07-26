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
        <ul class="order-list already-complete">
            <li class="clear">
                <div class="img-box left">
                    <img src="../assets/images/avatar.png" class="head-img" />
                </div>
                <div class="left info-box">
                    <p class="name">
                        杜萍
                    </p>
                    <p class="user-info">
                        女&emsp;61岁
                    </p>
                    <p class="status">
                        症状：骨质增生
                    </p>
                </div>
                <p class="right tag">
                    分诊
                </p>
            </li>
            <li class="clear">
                <div class="img-box left">
                    <img src="../assets/images/avatar.png" class="head-img" />
                </div>
                <div class="left info-box">
                    <p class="name">
                        包建国
                    </p>
                    <p class="user-info">
                        男&emsp;38岁
                    </p>
                    <p class="status">
                        症状：哮喘
                    </p>
                </div>
                <p class="right tag">
                    分诊
                </p>
            </li>
            <li class="clear">
                <div class="img-box left">
                    <img src="../assets/images/avatar.png" class="head-img" />
                </div>
                <div class="left info-box">
                    <p class="name">
                        丁前进
                    </p>
                    <p class="user-info">
                        男&emsp;29岁
                    </p>
                    <p class="status">
                        症状：单纯疱疹
                    </p>
                </div>
                <p class="right tag">
                    分诊
                </p>
            </li>
            <li class="clear">
                <div class="img-box left">
                    <img src="../assets/images/avatar.png" class="head-img" />
                </div>
                <div class="left info-box">
                    <p class="name">
                        方小丽
                    </p>
                    <p class="user-info">
                        女&emsp;42岁
                    </p>
                    <p class="status">
                        症状：肺炎
                    </p>
                </div>
                <p class="right tag">
                    分诊
                </p>s
            </li>
        </ul>
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
            }
        },
        mounted(){
            this.getAssistantData()
        },
        methods:{
            surePatient(){
                this.$router.push({name:'SignDistribution',params:{patientId:this.patientId,assistantId:this.assistantId}});
            },
            getAssistantData(){
                var that=this
                that.$ajax.get('/assistant/'+that.assistantId)
                .then(function(res){
                    if(res.data.status==200){
                        console.log(res.data.data)
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
