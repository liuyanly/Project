<template>
	<div>
		<div class="header_bg"></div>
		<div class="d4_pic">
			<div class="d4_pic_imgbox">
				<img class="img" v-bind:src="translates.avatar_img" />
				<img src="../../images/a1_icon5.png" class="hz" v-if="data.vip && data.vip.id == '2'"/>
				<img src="../../images/a1_icon7.png" class="hz" v-if="data.vip && data.vip.id == '2'"/>
				<img src="../../images/a1_icon6.png" class="hz" v-if="data.vip && data.vip.id == '1'"/>
			</div>
			<div class="user_info">
				<p class="aui-text-333 aui-font-size-28">{{data.realname}}</p>
				<p class="aui-text-666 aui-font-size-24 nzl">{{data.illness}}</p>
				<p class="aui-text-666 aui-font-size-24"><span class="gender">性别:{{data.sex}}</span><span>年龄:{{translates.age}}岁</span></p>
			</div>
		</div>
		<div class="y-fengexian"></div>
	</div>
</template>

<script>
	export default {
		name: 'header',
		data() {
			return {}
		},
		props: {
			data:{
			
			},
			translates:{

			}
		},
		methods: {
			back: function() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
	.header {
		width: 100%;
		height: 2.25rem;
		position: fixed;
		top: 0;
		z-index: 1;
	}
	.vipLv{
		position: absolute;
		width: 1em;
		height: auto;
		bottom: 0.2rem;
		right: 0.2rem;
	}
	.aui-bar-nav {
		background-color: #4CC6D8;
	}
	.aui-bar-nav .aui-title {
		font-size: 0.9rem;
	}
	.aui-icon-left:before {
		font-weight: 900;
	}
	.aui-bar-nav .aui-pull-right{
		font-size: 0.75rem;
	}
</style>