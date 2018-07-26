<template>
	<div class="my-info">
		<headers headName="设置"></headers>
		<div class="contentScollr">
			<ul class="menu-list">
				<router-link :to="{ name: 'changePassword', params: {} }">
					<li class="clear">
						<span class="name">修改密码</span>
						<img src="../assets/images/c13_liebiao.png" class="link-img" />
					</li>
				</router-link>
				<router-link :to="{ name: '', params: {} }">
					<li class="clear">
						<span class="name">清除缓存</span>
						<img src="../assets/images/c13_liebiao.png" class="link-img" />
					</li>
				</router-link>
			</ul>
			<input type="button" name="" id="" value="退出账号" @click="quitLogin()" />
		</div>
	</div>
</template>

<script>
import headers from "../components/Header";
//导入模板
export default {
  data() {
    return {};
  },
  methods: {
    Back() {
      //this.$toast('111')
      this.$router.go(-1);
    },
    msgCenter() {},
    quitLogin() {
      this.$toast("已退出,请重新登录");
      localStorage.removeItem("doctorInfo");
      this.native.logout();
      this.$router.push({ name: "Login" });
    },
    memberInfo(num) {
      if (num) {
        this.$router.push({
          name: "MemberInfo"
        });
      } else {
        this.$router.push({
          name: "NotVip"
        });
      }
    }
  },
  mounted: function() {},
  components: {
    headers
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #666;
}
.my-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .menu-list {
    li {
      padding: 0.5rem 0.8rem;
      background: #fff;
      border-bottom: 1px solid #e5e5e5;
      .name {
        float: left;
        font-size: 0.7rem;
        line-height: 1.5rem;
      }
      .link-img {
        vertical-align: middle;
        width: 0.3rem;
        height: 0.7rem;
        float: right;
        margin-top: 0.4rem;
      }
    }
  }
  input {
    width: 100%;
    height: 2.25rem;
    background: #fff;
    margin-top: 1.25rem;
    font-size: 0.7rem;
    color: #fc4f4f;
  }
}
</style>
