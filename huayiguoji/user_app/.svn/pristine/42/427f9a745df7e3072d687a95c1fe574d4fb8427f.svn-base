<template>
    <div class="recharge">
        <headers headName="充值"></headers>
        <div class="contentScollr">
        <p class="title-p">
            选择充值方式
        </p>
        <div class="way-box">
            <p class="radio-p borderBottom">
                <input type="radio" class="one_sel" v-model="payWay" value="1" name="payWay" />
                <img src="../assets/images/b2_icon1_p.png" v-if="payWay!=1" />
                <img src="../assets/images/b2_icon1.png" v-else="payWay==1"  />
                <span class="way-name">线上充值</span>
            </p>
            <p class="radio-p">
                <input type="radio" class="one_sel" v-model="payWay" value="2" name="payWay" />
                <img src="../assets/images/b2_icon1_p.png" v-if="payWay!=2" />
                <img src="../assets/images/b2_icon1.png" v-else="payWay==2"  />
                <span class="way-name">线下充值</span>
            </p>
        </div>
        <p class="pay-btn" @click="nextStep(1)">
            下一步
        </p>
    </div>
    </div>
</template>
<script>
    import headers from "../components/Header.vue";
    //import { Toast } from 'mint-ui';
    export default {
        data(){
            return{
                payWay:'1',
            }
        },
        methods:{
            nextStep(type){
                if(this.payWay==1){
                    this.$router.push({name: 'OnlineRecharge'});
                }else{
                    this.$router.push({name: 'OfflineRecharge'});
                }
            }
        },
        components: {headers},
    }
</script>
<style lang="scss" scoped>
a{
    color:#4CC6D8;
}
.recharge{
    display: flex;
    height: 100%;
    flex-direction: column;
    .contentScollr{
        flex: 1;
        overflow: auto;
        -webkit-overflow-scrolling:touch;
    }
    .title-p{
        font-size: .7rem /* 28/40 */;
        color:#999;
        line-height: 1.5rem /* 60/40 */;
        padding-left: .8rem /* 30/40 */;
    }
    .borderBottom{
        border-bottom: 1px solid #e5e5e5;
    }
    .radio-p{
        line-height: 2.3rem /* 92/40 */;
        padding: 0 .8rem /* 30/40 */;
        position: relative;
        .one_sel,.more_sel{
            width: 1.3rem /* 52/40 */;
            height: 1.3rem /* 52/40 */;
            position: absolute;
            top:.5rem /* 21/40 */;
        }
        .way-name{
            font-size: .7rem /* 28/40 */;
            color:#666;
            span{
                color:#4CC6D8;
            }
        }
        img{
            width: 1.3rem /* 52/40 */;
            height: 1.3rem /* 52/40 */;
            vertical-align: middle;
        }
    }
    .way-box{
        background: #fff;
        margin-bottom: 1.5rem /* 60/40 */;
    }
    .pay-btn{
        margin: 0 .8rem /* 30/40 */;
        background: #4CC6D8;
        text-align: center;
        color:#fff;
        font-size: .8rem /* 32/40 */;
        line-height: 2rem /* 82/40 */;
        border-radius: .3rem /* 10/40 */;
        a{
            color:#fff;
        }
    }
}
</style>
