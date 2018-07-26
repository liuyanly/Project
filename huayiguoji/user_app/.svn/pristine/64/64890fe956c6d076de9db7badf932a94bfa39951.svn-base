<template>
	<div class="my-info">
		<headers headName='' NoBack='true'></headers>
		<div class="contentScollr">
			<div class="head-top">
				<p class="bg-p">
				</p>
				<router-link :to="{ name: 'MyData', params: {} }">
					<div class="user-box">
						<img class="head-img" :src="headImg" />
						<img v-if="vipId!=''" class="vip-img" :src="vipImg" />
						<p class="name">
							{{username}}
						</p>
					</div>
				</router-link>

				<div class="clear top-btn">
					<div class="left">
						<img src="../assets/images/g1_icon1.png" />
						<p class="title">
							健康档案
						</p>
					</div>
					<div class="right" @click="memberInfo(1)">
						<img src="../assets/images/g1_icon2.png" />
						<p class="title">
							会员信息
						</p>
					</div>
				</div>
			</div>
			<ul class="menu-list">
				<router-link :to="{ name: 'FamilyMember', params: {} }">
					<li class="clear">
						<img class="icon-img" src="../assets/images/g1_icon3.png" />
						<span class="name">家庭成员</span>
						<img src="../assets/images/c13_liebiao.png" class="link-img" />
					</li>
				</router-link>
				<router-link :to="{ name: 'MyWallet', params: {} }">
					<li class="clear">
						<img class="icon-img" src="../assets/images/g1_icon4.png" />
						<span class="name">我的钱包</span>
						<img src="../assets/images/c13_liebiao.png" class="link-img" />
					</li>
				</router-link>
				<router-link :to="{ name: 'MyOrder', params: {} }">
					<li class="clear">
						<img class="icon-img" src="../assets/images/g1_icon5.png" />
						<span class="name">我的订单</span>
						<img src="../assets/images/c13_liebiao.png" class="link-img" />
					</li>
				</router-link>
				<router-link :to="{ name: 'MyEvaluate', params: {} }">
					<li class="clear">
						<img class="icon-img" src="../assets/images/g1_icon6.png" />
						<span class="name">我的评价</span>
						<img src="../assets/images/c13_liebiao.png" class="link-img" />
					</li>
				</router-link>
				<router-link :to="{ name: '', params: {} }">
					<li class="clear">
						<img class="icon-img" src="../assets/images/g1_icon7.png" />
						<span class="name">我的收藏</span>
						<img src="../assets/images/c13_liebiao.png" class="link-img" />
					</li>
				</router-link>
				<router-link :to="{ name: 'FeedBack', params: {} }">
					<li class="clear">
						<img class="icon-img" src="../assets/images/g1_icon8.png" />
						<span class="name">问题与建议</span>
						<img src="../assets/images/c13_liebiao.png" class="link-img" />
					</li>
				</router-link>
				<router-link :to="{ name: 'setUp', params: {} }">
					<li class="clear">
						<img class="icon-img" src="../assets/images/g1_icon9.png" />
						<span class="name">设置</span>
						<img src="../assets/images/c13_liebiao.png" class="link-img" />
					</li>
				</router-link>
			</ul>
		</div>
		<footers FootOn="my"></footers>
	</div>
</template>

<script>
import headers from "../components/Header.vue";
import footers from "../components/Footer.vue";
import avatarImg from "../assets/images/avatar.png";
//导入模板
export default {
  data() {
    return {
      headImg: avatarImg,
      username: "",
      vipImg: "",
      vipId: 0
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getData();
  },
  methods: {
    Back() {
      //this.$toast('111')
      this.$router.go(-1);
    },
    msgCenter() {},
    getData() {
      var that = this;
      this.$ajax
        .get("/user/me")
        .then(function(res) {
          if (res.data.status == 200) {
            that.headImg = res.data.data.translates.avatar_img;
			that.username = res.data.data.realname;
			console.log(res.data.data.vips)
            if (res.data.data.vips) {
              that.vipImg = res.data.data.vips.translates.icon;
              that.vipId = res.data.data.vips.pivot.vip_id;
            }
          } else if (res.data.status == 401) {
            that.$toast("请重新登录");
            setTimeout(function() {
              that.$router.push({ name: "Login" });
            }, 1500);
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {
          that.BaseSet.linkLogin(that);
        });
    },
    memberInfo(num) {
      if (this.vipId > 0) {
        this.$router.push({ name: "MemberInfo" });
      } else {
        this.$router.push({ name: "NotVip" });
      }
    }
  },
  components: { footers, headers }
};
</script>

<style lang="scss" scoped>
.my-info {
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .head-top {
    position: relative;
    background: #fff;
    //height: 11.6rem /* 463/40 */;
    margin-bottom: 0.5rem;
    .bg-p {
      height: 2.1rem;
      background: #4cc6d8;
    }
    .user-box {
      position: absolute;
      text-align: center;
      top: 0.4rem;
      left: 7.7rem;
      .head-img {
        background-color: #ccc;
        width: 3rem;
        height: 3rem;
        border: 0.1rem solid #fff;
        border-radius: 50%;
      }
      .vip-img {
        position: absolute;
        width: 0.9rem;
        height: 1rem;
        top: 2.1rem;
        left: 2rem;
      }
      .name {
        font-size: 0.8rem;
        color: #333;
        margin-top: 0.3rem;
        line-height: 0.8rem;
      }
    }
    .top-btn {
      margin-top: 3.8rem;
      padding-bottom: 1.2rem;
      .title {
        font-size: 0.7rem;
        color: #666;
        margin-top: 0.5rem;
        line-height: 0.7rem;
      }

      .left {
        float: left;
        text-align: center;
        img {
          width: 1.2rem;
          height: 1rem;
        }
        margin-left: 3.5rem;
      }
      .right {
        float: right;
        text-align: center;
        margin-right: 3.6rem;
        img {
          width: 1.4rem;
          height: 1.1rem;
        }
      }
    }
  }
  .menu-list {
    li {
      padding: 0.5rem 0.8rem;
      background: #fff;
      border-bottom: 1px solid #e5e5e5;
      .icon-img {
        width: 1.5rem;
        height: 1.5rem;
        float: left;
      }
      .name {
        float: left;
        margin-left: 0.6rem;
        font-size: 0.7rem;
        line-height: 1.5rem;
        color: #666;
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
}
</style>
