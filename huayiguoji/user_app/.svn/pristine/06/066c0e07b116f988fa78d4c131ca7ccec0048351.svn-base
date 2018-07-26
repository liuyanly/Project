<template>
	<div class="all_header" v-if='!isWeiXin'>
		<div class="back" @click="Back" v-if="NoBack!=='true'">
			<img src="../assets/images/b1_fanhui.png" />
		</div>
		<div class="name">{{headName}}</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      isWeiXin: false
    };
  },
  mounted() {
    var that = this;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      that.isWeiXin = true;
    } else {
      that.isWeiXin = false;
    }
  },
  methods: {
    Back() {
      this.$router.go(-1);
    }
  },
  //从父页面获取数据
  props: ["headName", "NoBack"]
};
</script>

<style>
.all_header {
  width: 100%;
  height: 2.2rem;
  background-color: #4cc6d8;
  overflow: hidden;
  text-align: center;
  position: fixed;
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
</style>