<template>
    <div class="choose-user">
        <headers headName='新增会员'></headers>
        <ul class="order-list already-complete">
            <li class="clear" @click="serviceList(1)">
                <div class="img-box left">
                    <img src="../assets/images/a_image1.png" class="head-img" />
                </div>
                <div class="left info-box">
                    <p class="name">
                        毛杜拉
                    </p>
                    <p class="user-info">
                        女&emsp;42岁
                    </p>
                    <p class="status">
                        症状：脑肿瘤
                    </p>
                </div>
            </li>
            <li class="clear" @click="serviceList(2)">
                <div class="img-box left">
                    <img src="../assets/images/a_image1.png" class="head-img" />
                </div>
                <div class="left info-box">
                    <p class="name">
                        毛杜拉
                    </p>
                    <p class="user-info">
                        女&emsp;42岁
                    </p>
                    <p class="status">
                        症状：脑肿瘤
                    </p>
                </div>
            </li>
            <li class="clear" @click="serviceList(3)">
                <div class="img-box left">
                    <img src="../assets/images/a_image1.png" class="head-img" />
                </div>
                <div class="left info-box">
                    <p class="name">
                        毛杜拉
                    </p>
                    <p class="user-info">
                        女&emsp;42岁
                    </p>
                    <p class="status">
                        症状：脑肿瘤
                    </p>
                </div>
            </li>
            <li class="clear" @click="serviceList(4)">
                <div class="img-box left">
                    <img src="../assets/images/a_image1.png" class="head-img" />
                </div>
                <div class="left info-box">
                    <p class="name">
                        毛杜拉
                    </p>
                    <p class="user-info">
                        女&emsp;42岁
                    </p>
                    <p class="status">
                        症状：脑肿瘤
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    //导入模板
    import headers from "../components/Header.vue";
    export default {
        data (){
            return{
                type:this.$route.params.type,
                title:this.$route.params.title,
            }
        },
        methods:{
            serviceList(id){
                if(this.type==1){
                    this.$router.push({name:'SetUpVip',params:{id:id}});
                }else if(this.type==2){
                    this.$router.push({name:'PatientDetail',params:{type:1,patientId:id,assistantId:this.$route.params.assistantId}});
                }else{
                    this.$router.push({name:'PatientDetail',params:{type:2,patientId:id,assistantId:this.$route.params.assistantId}});
                }
            }
        },
        components: {headers},
    }
</script>
<style lang="scss" scoped>
a{
    color:#fff;
}
    .choose-user{
        margin-top: 2.2rem;
        .order-list{
            //margin-top: .5rem /* 20/40 */;
            width: 100%;
            overflow: hidden;
            background: #fff;
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
