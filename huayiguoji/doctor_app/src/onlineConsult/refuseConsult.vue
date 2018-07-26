<template>
	<div class="refuseWhy">
		<headers headName="拒绝原因"></headers>
		<div class="contentScollr">
			<textarea class="userInner" placeholder="请添加详细描述" v-model="userInner"></textarea>
			<button class="but" @click="complete()">提交</button>
		</div>
	</div>
</template>

<script>
    import headers from '../components/Header'
	export default {
		data() {
			return {
				userInner:'',
				id:this.$route.params.id,
			}
		},
		components:{headers},
		methods: {
			Back() {
				this.$router.go(-1)
			},
			complete() {
				var that=this;
				if(that.userInner == ''||that.userInner==' ') {
					that.$toast('请添加详细描述');
					return false;
				}

				this.BaseSet.getToken(this)
				this.$ajax.put(`/consult/reject/${that.id}`,{
					message: that.userInner,
				} )
				.then((res)=> {
					this.$toast('您已经拒绝了此任务')
					//验证通过
					this.$router.push(`/OnlineConsult/0`)
				})
				.catch((err)=> {
					this.$toast(err)
				});


			},
		},
		mounted: function() {

		}
	}
</script>

<style lang="scss">
	.but{
		width: 100%;
		height: 3em;
		border-radius: 0.2rem;
		color: #fff;
		background: #4cc6d8;
		margin-top: 2rem;
	}
	.refuseWhy{
		background: #fff;
		height: 100%;
		display: flex;
		flex-direction: column;
		.contentScollr{
			flex: 1;
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
			padding-left: 0.75rem;
			padding-right: 0.75rem;
		}

	}
	.all_header {
		width: 100%;
		height: 2.2rem;
		background-color: #4CC6D8;
		overflow: hidden;
		text-align: center;
		position: relative;
		line-height: 2.2rem;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.all_header .back {
		width: 0.475rem;
		height: 0.8rem;
		position: absolute;
		left: 0.75rem;
		top: 0.65rem;
	}
	.all_header .back img {
		width: 0.475rem;
		height: 0.8rem;
	}
	.all_header .name {
		color: #ffffff;
		font-size: 0.9rem;
	}
	.all_header .right {
		position: absolute;
		right: 0.75rem;
		top: 0;
		color: #ffffff;
		font-size: 0.75rem;
		img {
			width: .9rem/* 37/40 */
			;
			height: .9rem/* 37/40 */
			;
			vertical-align: middle;
		}
	}
	.userInner{
		margin-top: 1.2rem;
		width: 94%;
		padding: 0.5rem;
		height: 7.5rem;
		background: #eee;
		border-radius: 0.25rem;
		font-size: 0.7rem;
	}
</style>
