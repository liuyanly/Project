<template>
	<div class="home_box">
		<headers headName='华医国际' NoBack='true'></headers>
		<div class="contentScollr">
			<div class="box">
				<!-- <div class="headimg">
					<router-link :to="{path: ''}" >
					<img src="../images/a1_banner@2x.png" alt="">
					</router-link>
				</div> -->
				<mt-swipe :auto="4000">
			<mt-swipe-item v-for="(data,i) in imgs" :key="i">
				<div class="swiper-slide"  :style="{background: 'url('+data +')',backgroundSize:'contain' }">
				</div>
			</mt-swipe-item>
			<!-- <mt-swipe-item>2</mt-swipe-item>
			<mt-swipe-item>3</mt-swipe-item> -->
			</mt-swipe>
				<!-- <div class="swiper-container" id="swiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<img src="../assets/images/a1_banner@2x.png" />
				</div>
				<div class="swiper-slide">
					<img src="../assets/images/a1_banner@2x.png" />
				</div>
				<div class="swiper-slide">
					<img src="../assets/images/a1_banner@2x.png" />
				</div>
				</div> -->
				<!-- Add Pagination -->
				<!-- <div class="swiper-pagination"></div>
			</div> -->
				<div class="nav">
					<ul>
						<li><router-link :to="{path: '/OnlineConsult/0'}" ><img src="../images/a1_icon1@2x.png" alt=""><span>在线咨询</span>
						</router-link>
						</li>
						<li><img src="../images/a1_icon2@2x.png" alt=""><span>分诊任务</span></li>
						<li><router-link :to="{path: ''}" ><img src="../images/a1_icon3@2x.png" alt=""><span>预约任务</span>
						</router-link></li>
						<li><router-link :to="{path: '/MyHuimeiPatient'}" ><img src="../images/a1_icon4@2x.png" alt=""><span>临床决策</span></router-link></li>
						<li><router-link :to="{path: ''}" ><img src="../images/a1_icon5@2x.png" alt=""><span>移动会诊</span></router-link></li>
						<li><router-link :to="{path: ''}" ><img src="../images/a1_icon6@2x.png" alt=""><span>双向转诊</span>
						</router-link></li>
						<li><router-link :to="{path: '/MyPatient'}" ><img src="../images/a1_icon7@2x.png" alt=""><span>患者管理</span>
						</router-link>
						</li>
						<li><img src="../images/a1_icon8@2x.png" alt=""><span>视频教学</span></li>
					</ul>
				</div>
			</div>
			<div class="index_news">
				<div class="head">今日服务</div>
				<div class="content">
					<ul>
						<li class="clear" @click="serviceList()">
							<div class="img-box left">
								<img src="../assets/images/avatar.png" class="head-img" />
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
import pic from "../assets/images/a1_banner@2x.png"
export default {
  data () {
    return {
      imgs:[pic,pic,pic],
    }
  },
  methods: {
	  serviceList(){

	  },
  },
  mounted(){
	  var swiperObj =  new Swiper('#swiper', {
        loop: true,
        pagination: '.swiper-pagination',
        autoplay: 2000,
        paginationClickable: true
      });
  },
  components: { headers, footers},
  //请求数据接口
}
</script>

<style lang="scss">
.mint-swipe{
	width: 17.55rem;
	height: 7.9rem /* 316/40 */;
	margin: .7rem auto 0 auto;
	img{
		width: 100vw;
		height: 11.1rem;
	}
}
.mint-swipe-indicator{
    width: .3rem /* 4/20 */!important;
    height: .3rem /* 4/20 */!important;
    background: #fff!important;
    opacity: 1!important;
}
.mint-swipe-indicator.is-active{
    background: #4CC6D8!important;
}
.home_box{
	display: flex;
	flex-direction: column;
	height: 100%;
	.contentScollr{
		flex: 1;
		overflow: scroll;
		-webkit-overflow-scrolling:touch;
	}
	.swiper-wrapper{
		width: 17.55rem;
		height: 7.9rem /* 316/40 */;
		margin: .7rem auto 0 auto;
		img{
			width: 17.55rem;
			height: 7.9rem /* 316/40 */;
		}
	}
	.box{
		width: 100%;
		overflow: hidden;
		background-color: #fff;
		.headimg{
			width: 17.55rem;
			height: 7.9rem /* 316/40 */;
			margin: .7rem auto 0 auto;
			img{
				width: 17.55rem;
				height: 7.9rem /* 316/40 */;
			}
		}
		.nav{
			width: 100%;
			overflow: hidden;
			//margin-top: 1.3rem;
			margin-bottom: .8rem /* 30/40 */;
			ul{
				display: flex;
				display: -webkit-flex;
				justify-content: center;
				flex-wrap: wrap;
				li{
					margin: 0 .725rem;
					width: 3rem;
					overflow: hidden;
					text-align: center;
					margin-top: .8rem /* 34/40 */;
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
