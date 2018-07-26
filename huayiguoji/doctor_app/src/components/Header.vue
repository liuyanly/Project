<template>
	<div class="all_header">
		<div class="back" @click="Back" v-if="NoBack!=='true'">
			<img src="../assets/images/b1_fanhui.png"/>
		</div>
		<div class="name">
			{{headName}}
			<span class="right-link" v-if='subOperat' @click='to'>{{subOperat.title}}</span>
		</div>
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
		this.$router.go(-1);
	  },
	  to: function () {
		  this.$router.push({name: this.subOperat.skip, params: this.subOperat.params});
	  }
  },
  //从父页面获取数据
  /**
   * subOperat {
   * 	title: '',
   * 	skip: '',
   * 	params: {}
   * }
   */
  props: ['headName','NoBack', 'subOperat'],
}
</script>

<style>
	.all_header{
		width: 100%;
		height:2.2rem;
		background-color: #4CC6D8;
		overflow: hidden;
		text-align: center;
		position: relative;
		line-height: 2.2rem;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.all_header .back{
		width: 0.475rem;
		height: 0.8rem;
		position: absolute;
		left: 0.75rem;
		top: 0.65rem;
		z-index: 200;
	}
	.all_header .back img{
		width: 0.475rem;
		height: 0.8rem;
	}
	.all_header .name{
		position: relative;
		color: #ffffff;
		font-size: 0.9rem;
		z-index: 100;
	}
	.name span.right-link{
		display: inline-block;
		height: 100%;
		position: absolute;
		right: .725rem;
		font-size: .75rem;
	}
</style>
