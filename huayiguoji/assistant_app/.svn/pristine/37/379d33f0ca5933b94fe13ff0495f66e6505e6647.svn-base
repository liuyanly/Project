<template>
	<div class="message-box">
		<headers headName="医助管理"></headers>
		<div class="contentScollr">
		<ul class="list-ul">
			<li class="clear">
				<router-link :to="{ name: 'MyAssistant', params: {} }">
				<div class="left img-box">
					<img src="../assets/images/e9_icon1.png" />
				</div>
				<div class="left word">
					<p class="line1 clear">
						我的医助
					</p>
				</div>
				</router-link>
			</li>
			<li class="clear">
				<router-link :to="{ name: 'ChooseUser', params: {type:1,patientId:0,assistantId:0,title:'新增会员'} }">
				<div class="left img-box">
					<img src="../assets/images/e9_icon2.png" />
					<!-- <span class="num">22</span> -->
				</div>
				<div class="left word">
					<p class="line1 clear">
						新增会员
					</p>
				</div>
				</router-link>
			</li>
			<li class="clear">
				<router-link :to="{ name: 'DistributionTask', params: {patientId:0,userId:0} }">
				<div class="left img-box">
					<img src="../assets/images/b1_icon3.png" />
					<!-- <span class="num">22</span> -->
				</div>
				<div class="left word">
					<p class="line1 clear">
						分配任务
					</p>
				</div>
				</router-link>
			</li>
			<li class="clear">
				<router-link :to="{ name: 'SignDistribution', params: {patientId:0,userId:0} }">
				<div class="left img-box">
					<img src="../assets/images/e9_icon4.png" />
					<!-- <span class="num">22</span> -->
				</div>
				<div class="left word">
					<p class="line1 clear">
						签约分配
					</p>
				</div>
				</router-link>
			</li>
		</ul>
	</div>
	</div>
</template>

<script>
//导入模板
import headers from "../components/Header.vue";
export default {
  data () {
    return {
      articles:''
    }
  },
  methods: {

  },
  components: { headers},
  //请求数据接口
}
</script>

<style lang="scss" scoped>
.message-box{
	width: 100%;
	display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: scroll;
		-webkit-overflow-scrolling:touch;
	}
	.list-ul{
		background: #fff;
		li{
			padding: 1rem /* 20/20 */ .8rem /* 15/20 */;
			border-bottom: 1px solid #e5e5e5;
			&:last-child{
				border-bottom: none;
			}
			.left{
				float:left;
			}
			.right{
				float: right;
			}
			.img-box{
				margin-right: .8rem /* 16/20 */;
				position: relative;
				>img{
					width: 2.5rem /* 50/20 */;
					height: 2.5rem /* 50/20 */;
				}
				.num{
					font-size: .5rem /* 10/20 */;
					color: #fff;
					position: absolute;
					width: .8rem /* 16/20 */;
					height: .8rem /* 16/20 */;
					text-align: center;
					border-radius: 50%;
					background: #ff2906;
					top: -.1rem /* -2/20 */;
					right: 0;
				}
			}
			.word{
				.line1{
					font-size: .8rem /* 15/20 */;
					line-height: 2.5rem;
					color: #444;
				}
			}
		}
	}
}
</style>
