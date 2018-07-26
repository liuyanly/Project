<template>
    <div class="my-patient">
        <headers headName='患者'></headers>
        <smallHeader @changeView="changeTypeView" :parentType='editType' :smallData='smallHeaderData'></smallHeader>
        <div class="contentScollr">
        <ul class="order-list not-pay" v-show="editType==0">

        </ul>
        <ul class="order-list already-pay" v-show="editType==1">

        </ul>
        <ul class="order-list already-complete" v-show="editType==2">
            <li class="clear" @click="serviceList()">
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
                <p class="right tag">
                    分诊
                </p>
            </li>
            <li class="clear" @click="serviceList()">
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
                <p class="right tag">
                    分诊
                </p>
            </li>
            <li class="clear" @click="serviceList()">
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
                <p class="right tag">
                    分诊
                </p>
            </li>
            <li class="clear" @click="serviceList()">
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
                <p class="right tag">
                    分诊
                </p>
            </li>
        </ul>
    </div>
    </div>
</template>
<script>
    //导入模板
    import headers from "../components/Header.vue";
    import smallHeader from "../components/SmallHeader.vue"
    export default {
        data (){
            return{
                smallHeaderData: ['未服务','服务中','已完成'],
                editType:2,
            }
        },
        methods:{
            changeTypeView(num){
                this.editType=num;
            }
        },
        components: {headers,smallHeader},
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
        .small-header{
            padding: 0;
            li{
                margin: 0;
                width: 6.25rem /* 125/20 */;
            }
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
                .right{
                    font-size: 0.6rem /* 12/20 */;
                    color: #666;
                    line-height: 2.5rem /* 50/20 */;
                }
            }
        }
    }
</style>
