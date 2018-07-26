<template>
	<div class="all_foot">
		<ul>
            <li v-if="FootOn=='home'"><router-link :to="{ path: '/Home' }" replace><img src="../assets/images/c1_btn1_p.png" alt=""><span class="name active">首页</span></router-link></li>
            <li v-else><router-link :to="{ path: '/Home' }" replace><img src="../assets/images/c1_btn1.png" alt=""><span class="name">首页</span></router-link></li>
            <li><img src="../assets/images/c1_btn2.png" alt=""><span class="name">资讯</span></li>
			<li v-if="FootOn=='service'"><router-link :to="{ path: '/Service' }" replace><img src="../assets/images/c1_btn3_p.png" alt=""><span class="name active">服务</span></router-link></li>
            <li v-else><router-link :to="{ path: '/Service' }" replace><img src="../assets/images/c1_btn3.png" alt=""><span class="name">服务</span></router-link></li>
			<li v-if="FootOn=='msg'"><router-link :to="{ path: '/Message' }" replace><img src="../assets/images/c1_btn4_p.png" alt=""><span class="name active">消息</span></router-link></li>
            <li v-else><router-link :to="{ path: '/Message' }" replace><img src="../assets/images/c1_btn4.png" alt=""><span class="name">消息</span></router-link></li>
			<li v-if="FootOn=='my'"><router-link :to="{ path: '/My' }" replace><img src="../assets/images/c1_btn5_p.png" alt=""><span class="name active">我的</span></router-link></li>
            <li v-else><router-link :to="{ path: '/My' }" replace><img src="../assets/images/c1_btn5.png" alt=""><span class="name">我的</span></router-link></li>
        </ul>
	</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods:{
  	Back(){
		this.$router.go(-1)
  	}
  },
  //从父页面获取数据
  props: ['FootOn'],
}
</script>

<style lang="scss" scoped>
.all_foot{
	width: 100%;
	height:2.45rem;
	background-color: #ffffff;
	overflow: hidden;
	text-align: center;
	z-index: 999;
	border-top: #e5e5e5 1px solid;
	ul{
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		li{
			width: 1.5rem;
			margin: 0 1rem;
			margin-top: .3rem;
			text-align: center;
			img{
				width: 1.15rem;
				height: 1.15rem;
				margin-bottom: .15rem;
			}
			.name{
				color: #666666;
				font-size: .55rem;
				display: block;
				//margin-top:-0.25rem;
			}
			.active{
				color: #4CC6D8;
			}
		}
	}
}

</style>
