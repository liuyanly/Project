<template>
    <div class="now-pay">
        <headers headName="订单详情"></headers>
        <div class="top-div">
            <p class="tip-word">
                注：本平台只收取服务费，实际费用到时按实际情况支付
            </p>
            <p class="clear">
                <span class="title left">服务费预交款</span>
                <span class="money right">￥10000.00</span>
            </p>
        </div>
        <p class="title-p">
            选择支付方式
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
        <div class="agree-box">
            <p class="radio-p checkbox-p clear">
                <input type="checkbox" class="more_sel" v-model="agree" value="1" />
                <img src="../assets/images/b2_icon1_p.png" v-if="agree!=1" />
                <img src="../assets/images/b2_icon1.png" v-else="agree==1"  />
                <span class="way-name">我已阅读并同意遵守<span class="agreement-name"><router-link :to="{ path: '/Disclaimer' }">《免责声明》</router-link></span><span class="agreement-name"><router-link :to="{ path: '/ChargeAsk' }">《就诊安排预收费告知单》</router-link></span><span class="agreement-name"><router-link :to="{ path: '/ServerAsk' }">《服务费告知单》</router-link></span></span>
            </p>
        </div>
        <p class="pay-btn" @click="pay(1)">
            确认支付
        </p>
    </div>
</template>
<script>
    import headers from "../components/Header.vue";
    export default {

        data(){
            return{
                payWay:'1',
                agree:'0',
            }
        },
        methods:{
            pay(type){
                if(this.payWay==1){
                    this.$router.push({name: 'Pay',params:{id:1}});
                }
            }
        },
        components: {headers},
    }
</script>
<style lang="scss">
a{
    color:#4CC6D8;
}
.now-pay{
    margin-top: 2.2rem;
    .top-div{
        background: #fff;
        padding: .8rem /* 30/40 */;
        .tip-word{
            font-size: .6rem /* 24/40 */;
            color:#999;
            text-align: center;
        }
        .left{
            float: left;
        }
        .right{
            float: right;
        }
        .clear{
            line-height: .7rem /* 28/40 */;
        }
        .title{
            font-size: .7rem /* 28/40 */;
            color: #333;
            margin-top: 2.4rem /* 97/40 */;
            margin-bottom: .4rem /* 16/40 */;
        }
        .money{
            font-size: .7rem /* 28/40 */;
            color:#fc4f4f;
            margin-top: 2.4rem /* 97/40 */;
            margin-bottom: .4rem /* 16/40 */;
        }
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
    .checkbox-p{
        line-height: 1;
        margin-top: 1.4rem /* 57/40 */;
        margin-bottom: .9rem /* 35/40 */;
        .more_sel{
            top:0;
        }
        .way-name{
            float: left;
            width: 15.4rem /* 615/40 */;
            line-height: .9rem /* 36/40 */;
            margin-left: .3rem /* 13/40 */;
        }
        img{
            float: left;
        }
    }
    .way-box{
        background: #fff;
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
