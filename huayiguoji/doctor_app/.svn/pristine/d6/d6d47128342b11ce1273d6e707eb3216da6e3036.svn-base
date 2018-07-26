<template>
    <div class="withdrawals">
        <headers headName="提现账户"></headers>
        <div class="withdrawalsRow">
        <div v-if="!card_status">
            <div>
                <div class="withdcard-box clear" @click="addCard()">
                    <div class="left">
                        <p class="line">
                            请添加银行卡
                        </p>
                    </div>
                    <p class="right">
                        <img src="../assets/images/c13_liebiao.png" />
                    </p>
                </div>
            </div>
        </div>
            <div v-else>
                <div class="withdcard-box clear"  @click="changeCard()">
                    <img :src="cardImg" class="left"/>
                    <div class="left">
                       <p class="line1">
                            {{bankName}}
                        </p>
                        <p class="line2">
                            尾号{{cardNum}}储蓄卡
                        </p>
                    </div>
            
                    <p class="right">
                        <img src="../assets/images/c13_liebiao.png" />
                    </p>
                </div>
                <div class="money-box" >
                    <span class="name">提现金额：</span>
                    <span class="unit">¥</span>
                    <input type="number" v-model="money"/>
                </div>
                <p class="withdrawals-btn" @click="sureWithdrawals()">
                    确认提现
                </p>
            </div>
            </div>
        </div>
</template>
<script>
    import headers from "../components/Header";
    export default {
        data(){
            return{
                money:'',
                cardNum:'',
                bankName:'',
                cardImg:'',
                card_status:Number(this.$route.query.card_status),
                cardId: this.$route.query.cardId,
            }
        },
        mounted(){
            this.BaseSet.getToken(this)
            this.getCard()
        },
        methods:{
            addCard(){
                this.$router.push({name:'AddCard'});
            },
            changeCard(){
                this.$router.push({name:'ChooseCard'});
            },
              getCard(){
    			var that=this
    			that.$ajax.get('/bank/'+that.card_status)
    			.then(function(res){
    				console.log(res.data)
    				if(res.data.status==200){
    					that.cardNum = res.data.data.cardno.substring(res.data.data.cardno.length-4,res.data.data.cardno.length)
                        that.bankName = res.data.data.translates.affiliation
                        that.cardImg = res.data.data.translates.cover_img
    				}
    			})
    			.catch(function(err){

    			})
    		},
            sureWithdrawals(){
                if(!this.money){
                    this.$toast('请输入提现金额！')
                    return false;
                }
                //提现接口占时没有
            }
        },
        components:{headers},
    }
</script>
<style lang="scss">

    .withdrawals{
        height: 100%;
        .withdrawalsRow{
            height: 100%;
            display: flex;
            flex-direction: column;
            }
            .contentScollr{
                flex: 1;
                overflow: scroll;
                -webkit-overflow-scrolling:touch;
            }
        .withdcard-box{
            background: #fff;
            padding:.9rem /* 36/40 */ .6rem /* 24/40 */;
            margin-bottom: .5rem /* 20/40 */;
            .left{
                float: left;
            }
            .right{
                float: right;
                >img{
                    width: .3rem /* 13/40 */;
                    height: .6rem /* 24/40 */;
                    vertical-align: middle;
                }
            }
            >img{
                width: 1.3rem /* 50/40 */;
                height: 1.3rem /* 50/40 */;
                margin-right: .6rem /* 24/40 */;
                margin-top: .1rem /* 6/40 */;
            }
            .line{
                font-size: .7rem /* 28/40 */;
                color:#333;
                line-height: 1.8rem /* 70/40 */;
            }
            .line1{
                font-size: .8rem /* 30/40 */;
                color:#333;
                line-height: .8rem /* 30/40 */;
            }
            .line2{
                font-size: .6rem /* 24/40 */;
                color: #999;
                line-height: .6rem /* 24/40 */;
                margin-top: .3rem /* 10/40 */;
            }
        }
        .money-box{
            line-height: 1.2rem /* 48/40 */;
            padding: 2.2rem /* 89/40 */ .6rem /* 24/40 */ 1.8rem /* 73/40 */ .6rem /* 24/40 */;
            box-sizing: border-box;
            background: #fff;
            .name{
                font-size: .7rem /* 28/40 */;
                color: #999;
            }
            .unit{
                font-size: 1.2rem /* 48/40 */;
                color: #333;
            }
            input{
                width: 10rem /* 400/40 */;
                line-height: 1.2rem /* 48/40 */;
                color: #333;
                font-size: .7rem /* 28/40 */;
                margin-left: .5rem /* 20/40 */;
            }
        }
        .withdrawals-btn{
            width: 17.2rem /* 688/40 */;
            height: 2rem /* 82/40 */;
            text-align: center;
            background: #4cc6d8;
            color: #fff;
            font-size: .8rem /* 32/40 */;
            line-height: 2rem;
            border-radius: .3rem /* 10/40 */;
            margin: 0 auto;
            margin-top: 1.5rem /* 60/40 */;
        }
    }
</style>
