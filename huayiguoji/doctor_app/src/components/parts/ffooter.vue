<template>
	<div>

		<footer class="aui-bar aui-bar-tab" id="footer">
			<div class="aui-bar-tab-item aui-active" tapmode>
				<router-link to="/shouye">
					<i class="aui-iconfont aui-icon-home"></i>
					<div class="aui-bar-tab-label">首页</div>
				</router-link>
			</div>
			<div class="aui-bar-tab-item" tapmode>
				<router-link to="/xiaoxi">
					<i class="aui-iconfont aui-icon-star"></i>
					<div class="aui-bar-tab-label">收藏</div>
				</router-link>
			</div>
			<div class="aui-bar-tab-item" tapmode>
				<div class="aui-badge">99</div>
				<router-link to="/shouye">
					<i class="aui-iconfont aui-icon-cart"></i>
					<div class="aui-bar-tab-label">购物车</div>
				</router-link>
			</div>
			<div class="aui-bar-tab-item" tapmode>
				<div class="aui-dot"></div>
				<router-link to="/xiaoxi">
					<i class="aui-iconfont aui-icon-my"></i>
					<div class="aui-bar-tab-label">我的</div>
				</router-link>
			</div>
		</footer>
	</div>
</template>

<script>
</script>

<style>

</style>