<template>
	<div class="disclaimer">
		<headers :headName="yijianData.title"></headers>
		<div class="contentScollr">
		<div class="word-content" v-html="yijianData.content">
		</div>
	</div>
	</div>
</template>
<script>
	import headers from "../components/Header"
	export default {
		data() {
			return {
				yijianData: [],
			}
		},
		methods: {
			yijian() {
				var that = this;
				this.$ajax.get("/agreement?e_s[name]=user")   //get请求
					.then(function(res) {
						if(res.data.status == 200) {
							that.yijianData = res.data.data[0];
//							console.log(that.yijianData);
						}
					})
					.catch(function(err) {
						//
						//							console.log(err);
					});
			}
		},
		mounted: function() {
			this.yijian();
		},
		components: {
			headers
		},
	}
</script>
<style lang="scss">
	body, html, #app {
		height: 100%;
	}
	.disclaimer {
		height: 100%;
		background: #fff;
		position: relative;
		display: flex;
		height: 100%;
		flex-direction: column;
		.contentScollr{
			flex: 1;
			overflow: auto;
			-webkit-overflow-scrolling:touch;
		}
		/*padding-top: 2.2rem;*/
		.kong_2 {
			height: 2.2rem;
		}
		.word-content {
			line-height: 1.2rem/* 48/40 */
			;
			font-size: .7rem/* 28/40 */
			;
			color: #333;
			padding: 2rem/* 80/40 */
			.8rem/* 30/40 */
			;
			img {
				margin: .8rem/* 30/40 */
				0;
				width: 17.3rem/* 690/40 */
				;
				height: 9.2rem/* 367/40 */
				;
			}
		}
	}
</style>
