<template>
    <div class="pay-fail">
        <headers headName="支付失败"></headers>
        <div class="contentScollr">
        <div class="inner-box clear">
            <p class="success-img left">
            </p>
            <div class="left">
                <p class="line1">
                    支付失败，请重新支付！
                </p>
            </div>
        </div>
        <p class="btn" @click="payLink()">
            重新支付
        </p>
    </div>
    </div>
</template>
<script>
    import headers from "../components/Header"
    export default {
        data(){
            return{

            }
        },
        methods:{
            payLink(){
                this.$router.go(-1)
            }
        },
        components:{headers},
    }
</script>
<style lang="scss" scoped>
    .pay-fail{
        display: flex;
		height: 100%;
		flex-direction: column;
		.contentScollr{
			flex: 1;
			overflow: auto;
			-webkit-overflow-scrolling:touch;
		}
        padding-bottom: 5rem /* 200/40 */;
        .inner-box{
            padding: 4.9rem /* 195/40 */ 0 3.3rem /* 131/40 */ 4rem /* 162/40 */;
            .left{
                float: left;
            }
            .success-img{
                width: 2.3rem /* 90/40 */;
                height: 2.3rem /* 90/40 */;
                text-align: center;
                background: url(../assets/images/g18_fail.png);
                border-radius: 50%;
                background-size: cover;
                line-height: 2.3rem;
                color: #fff;
                margin-right: .7rem /* 27/40 */;
            }
            .line1{
                font-size: .8rem /* 30/40 */;
                color: #ff2906;
                line-height: 2.3rem /* 90/40 */;

            }
        }
        .btn{
            width: 17.2rem;
            height: 2.05rem;
            text-align: center;
            margin:0 auto;
            background-color: #4DC6D8 ;
            color: #ffffff;
            line-height: 2.05rem;
            font-size: .8rem;
            border-radius:.25rem;
        }
    }
</style>
