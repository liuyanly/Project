<template>
	<div class="card-box">
		<headers headName="选择银行卡"></headers>
		<div class="contentScollr">
		<ul class="card-list">
			<li class="clear" @click="changeCard(data.id)" v-for="data in dataList">
				<img :src="data.translates.cover_img" class="left" />
	            <div class="left">
	                <p class="line1">
	                    {{data.translates.affiliation}}
	                </p>
	                <p class="line2">
	                    尾号{{data.cardno.substring(data.cardno.length-4,data.cardno.length)}}储蓄卡
	                </p>
	            </div>
	            <p class="right" v-if="cardId==data.id">
	                <img src="../assets/images/c73_xz_p.png" />
	            </p>
			</li>
			<li class="clear">
				<img src="../assets/images/d1_tianjia.png" class="left add-img" />
				<p class="add-btn" @click="addCard()">
		            添加银行卡
		        </p>
			</li>
		</ul>
		<p class="sure-btn" @click="sureChoose()">
            确认
        </p>
		</div>
	</div>
</template>

<script>
//导入模板
import headers from '../components/Header.vue'
export default {
  	data () {
	    return {
			cardId:1,
			dataList:[],
		}
  	},
	mounted:function(){
		this.BaseSet.getToken(this)
		this.getList()
  	},
  	methods:{
	  	Back(){
	        //this.$toast('111')
			this.$router.go(-1)
	    },
		addCard(){
			this.$router.push({name:'AddCard'});
		},
		getList(){
			var that=this
			that.$ajax.get('/bank')
			.then(function(res){
				console.log(res.data)
				if(res.data.status==200){
					that.dataList=res.data.data
				}else if(res.data.status==401){
					that.BaseSet.linkLogin(that)
				}else{
					that.$toast(res.data.message)
				}
			})
			.catch(function(err){
				that.$toast(err)
				that.BaseSet.linkLogin(that)
			})
		},
		changeCard(id){
			this.cardId=id;
		},
		sureChoose(){
			this.$router.push({name:'WithdrawalsHaveCard',params:{id:this.cardId,status:1}})
			//this.$router.push(`WithdrawalsHaveCard/cardId=${this.cardId}&card_status=${1}`);
		}
  	},
	components:{headers}
}
</script>

<style lang="scss" scoped>
	.card-box{
		display: flex;
		height: 100%;
		flex-direction: column;
		.contentScollr{
			flex: 1;
			overflow: auto;
			-webkit-overflow-scrolling:touch;
		}
	}
	.card-list{
		margin-bottom: 1.5rem /* 60/40 */;
		li{
			background: #fff;
            padding:.9rem /* 36/40 */ .8rem /* 30/40 */;
			border-bottom: 1px solid #e5e5e5;
            .left{
                float: left;
            }
            .right{
                float: right;
                >img{
                    width: 1.3rem /* 52/40 */;
                    height: 1.3rem /* 52/40 */;
                    vertical-align: middle;
                }
            }
            >img{
                width: 1.3rem /* 50/40 */;
                height: 1.3rem /* 50/40 */;
                margin-right: .6rem /* 24/40 */;
                margin-top: .1rem /* 6/40 */;
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
			&:last-child{
				border-bottom: none;
			}
		}
	}
	.sure-btn{
		width: 17.2rem /* 688/40 */;
		height: 2rem /* 82/40 */;
		text-align: center;
		background: #4cc6d8;
		color: #fff;
		font-size: .8rem /* 32/40 */;
		line-height: 2rem;
		border-radius: .3rem /* 10/40 */;
		margin: 0 auto;
	}
	.add-btn{
		font-size: .8rem /* 32/40 */;
		//width: 5rem /* 200/40 */;
		line-height: 1.5rem /* 60/40 */;
		color: #333;
	}
</style>
