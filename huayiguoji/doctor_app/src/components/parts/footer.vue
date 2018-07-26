<template>
	<div>
		<div>
			<ul class="footer1">
				<li v-if="FootOn=='shouye'">
					<router-link to="/shouye">
						<img src="/src/./images/c1_btn5_p@2x.png" />
						<p class="active">首页</p>
					</router-link>
				</li>
				<li v-else>
					<router-link to="/shouye">
						<img src="/src/./images/c1_btn5@2x.png" />
						<p>首页</p>
					</router-link>
				</li>

				<li v-if="FootOn=='xiaoxi'">
					<router-link to="/xiaoxi">
						<img src="/src/./images/c1_btn4_p@2x.png" />
						<p class="active">消息</p>
					</router-link>
				</li>
				<li v-else>
					<router-link to="/xiaoxi">
						<img src="/src/./images/c1_btn4@2x.png" />
						<p>消息</p>
					</router-link>
				</li>
				<li v-if="FootOn=='fuwu'">
					<router-link to="/d10fwYwc">
						<img src="/src/./images/c1_btn3_p@2x.png" />
						<p class="active">服务</p>
					</router-link>
				</li>
				<li v-else>
					<router-link to="/d10fwYwc">
						<img src="/src/./images/c1_btn3@2x.png" />
						<p>服务</p>
					</router-link>
				</li>
				<li v-if="FootOn=='zixun'">
					<router-link to="/zixun">
						<img src="/src/./images/c1_btn2_p@2x.png" />
						<p class="active">资讯</p>
					</router-link>
				</li>
				<li v-else>
					<router-link to="/zixun">
						<img src="/src/./images/c1_btn2@2x.png" />
						<p>资讯</p>
					</router-link>
				</li>
				<li v-if="FootOn=='wode'">
					<router-link to="/wode">
						<img src="/src/./images/c1_btn5_p@2x.png" />
						<p class="active">我的</p>
					</router-link>
				</li>
				<li v-else>
					<router-link to="/wode">
						<img src="/src/./images/c1_btn5@2x.png" />
						<p>我的</p>
					</router-link>
				</li>
			</ul>
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',

		data() {
			return {
				selected: 'waimai',
			};
		},
		props: ['FootOn'],
		methods: {

		},
		watch: {

		},

		component: {

		}
	};
</script>

<style scoped>
	.footer1 {
		position: fixed;
		bottom: 0;
		height: 2.45rem;
		background: #fff;
		width: 100%;
		margin: 0;
		padding: 0;
		border-top: 1px solid #e5e5e5;
	}
	.footer1 li {
		margin: 0;
		padding-top: 0.35rem;
		float: left;
		text-align: center;
		width: 20%;
		font-size: 0.55rem;
	}
	.footer1 li a{
		color: #666;
	}
	.footer1 img {
		width: 1.15rem;
		height: 1.15rem;
		margin: 0 auto;
	}
	.active {
		color: #4CC6D8;
	}
</style>