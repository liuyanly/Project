<template>
	<div class="home_box">
		<headers headName='华医国际' NoBack='true'></headers>
		<div class="contentScollr">
		<div class="box">
			<div class="headimg">
				<router-link :to="{path: '/MyVip'}" >
				<img src="../assets/images/c1_icon1.png" alt="">
				</router-link>
			</div>
			<div class="nav">
				<ul>
					<router-link :to="{path: '/MyVip'}" >
					<li><img src="../assets/images/a1_icon1.png" alt=""><span>我的患者</span></li>
					</router-link>
					<li><img src="../assets/images/a1_icon2.png" alt=""><span>服务创建</span></li>
					<router-link :to="{path: ''}" >
					<li><img src="../assets/images/a1_icon3.png" alt=""><span>预约申请</span></li>
					</router-link>
					<li><img src="../assets/images/a1_icon4.png" alt=""><span>上传档案</span></li>
				</ul>
			</div>
		</div>
		<div class="index_news">
			<div class="head">今日服务</div>
			<div class="content">
				<router-link :to="{path: '/Service'}" >
				<ul>
					<li class="clear" @click="serviceList()">
						<div class="img-box left">
							<img src="../assets/images/avatar.png" class="head-img" />
							<img src="../assets/images/a1_icon5.png" class="vip" />
						</div>
						<div class="left info-box">
							<p class="name">
								李丽
							</p>
							<p class="user-info">
								女&emsp;27岁
							</p>
							<p class="status">
								症状：妇科病
							</p>
						</div>
						<p class="right tag">
							分诊
						</p>
					</li>
					<li class="clear" @click="serviceList()">
						<div class="img-box left">
							<img src="../assets/images/avatar.png" class="head-img" />
							<img src="../assets/images/a1_icon6.png" class="vip" />
						</div>
						<div class="left info-box">
							<p class="name">
								陈军
							</p>
							<p class="user-info">
								男&emsp;48岁
							</p>
							<p class="status">
								症状：高血压
							</p>
						</div>
						<p class="right tag">
							分诊
						</p>
					</li>
					<li class="clear" @click="serviceList()">
						<div class="img-box left">
							<img src="../assets/images/avatar.png" class="head-img" />
							<img src="../assets/images/a1_icon7.png" class="vip" />
						</div>
						<div class="left info-box">
							<p class="name">
								张国庆
							</p>
							<p class="user-info">
								男&emsp;51岁
							</p>
							<p class="status">
								症状：肝硬化
							</p>
						</div>
						<p class="right tag">
							分诊
						</p>
					</li>
					<li class="clear" @click="serviceList()">
						<div class="img-box left">
							<img src="../assets/images/avatar.png" class="head-img" />
							<img src="../assets/images/a1_icon8.png" class="vip" />
						</div>
						<div class="left info-box">
							<p class="name">
								李松柏
							</p>
							<p class="user-info">
								男&emsp;36岁
							</p>
							<p class="status">
								症状：单纯疱疹
							</p>
						</div>
						<p class="right tag">
							分诊
						</p>
					</li>
				</ul>
			</router-link>
			</div>
		</div>
		</div>
		<footers FootOn='home'></footers>
	</div>
</template>

<script>
//导入模板
import headers from "../components/Header.vue";
import footers from "../components/Footer.vue";
export default {
  data () {
    return {
      articles:''
    }
  },
  methods: {
	  serviceList(){

	  },
  },
  components: { headers, footers},
  //请求数据接口
}
</script>

<style lang="scss" scoped>
.home_box{
	width: 100%;
	display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: scroll;
		-webkit-overflow-scrolling:touch;
	}
	.box{
		width: 100%;
		background-color: #fff;
		.headimg{
			width: 17.55rem;
			height: 3.75rem;
			margin: 0 auto;
			padding: .7rem 0;
			img{
				width: 17.55rem;
				height: 3.75rem;
			}
		}
		.nav{
			width: 100%;
			overflow: hidden;
			margin-top: 1.3rem;
			padding-bottom: 1.725rem;
			ul{
				display: flex;
				display: -webkit-flex;
				justify-content: center;
				li{
					margin: 0 .725rem;
					width: 3rem;
					overflow: hidden;
					text-align: center;
					img{
						width: 3rem;
						height: 3rem;
						overflow: hidden;
					}
					span{
						width: 100%;
						margin-top: .45rem;
						font-size: .6rem;
						color: #666;
					}
				}
			}
		}
	}
	.index_news{
		width: 100%;
		overflow: hidden;
		background-color: #fff;
		margin-top: .5rem;
		.head{
			width: 100%;
			height: 2rem;
			border-bottom: #e5e5e5 1px solid;
			line-height: 2rem;
			box-sizing: border-box;
			padding: 0 .75rem;
			color: #4CC6D8;
			font-size: .7rem;
		}
		.content{
			width: 100%;
			overflow: hidden;
			ul{
				width: 100%;
				overflow: hidden;
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
						.vip{
							position: absolute;
							width: 0.9rem /* 18/20 */;
							height: 1.1rem /* 21/20 */;
							bottom:0.1rem /* 2/20 */;
							right: 1px;
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
	}
}
</style>
