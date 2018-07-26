<template>
	<div id="publicPhoto" class="y-clear">
		<div class="aui-pull-left y-touxiang-100 y_p_l_30"><img src="../../assets/images/a_image1.png" /></div>
		<div class="aui-pull-left ">
			<p class="aui-text-333 aui-font-size-28 photo-txt">{{name}}</p>
			<p class="aui-text-666 aui-font-size-24 "><span class="gender">性别：{{sex}}</span><span>年龄:{{age}}岁</span></p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'photo',
		data() {
			return {}
		},
		props: {
			name: {
				type: String
			},
			sex: {
				type: String
			},
			age: {
				type: String
			},
			zijipic: {
				type: String
			}
		}
	}
</script>

<style>

</style>
