<template>
	<div>
		<header class="aui-bar aui-bar-nav header">
			<a class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left" @click="back()" v-if="NoBack!=='true'"></span>
			</a>
			<div class="aui-title">{{title}}</div>
		</header>
		<div class="hegiht90"></div>
	</div>
</template>

<script>
	export default {
		name: 'header',
		data() {
			return {}
		},
		props: {
			title: {
				type: String
			},
			NoBack:{
				type: Boolean
			}
			
		},
		methods:{
			back:function(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style >
.header{
	width: 100%;
	height: 2.25rem;
	position: relative;
	top: 0;
}
.hegiht90{
	height: 2.21rem;
}
.aui-bar-nav{
	background-color:#4CC6D8;
}
.aui-bar-nav .aui-title{
	font-size: 0.9rem;
}
.aui-icon-left:before{
	font-weight: 900;
}
/*#app>div{
	padding-bottom: 2.95rem;
}*/
</style>