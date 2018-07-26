<template>
    <div class="my_assistant">
        <headers headName='我的健康助理'></headers>
        <div class="contentScollr">
            <div class="box">
                <div class="pic"><img :src="headImg" alt=""></div>
                <div class="name">{{assistantInfo.realname}}</div>
                <div class="tag">医助</div>
                <div class="icon">
                    <div class="phone" @click="goPhone"><img src="../assets/images/g5_icon1_p.png" alt=""></div>
                    <div class="message"><img src="../assets/images/g5_icon2_p.png" alt=""></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//导入模板
import headers from "../components/Header.vue";
import avatarImg from "../assets/images/avatar.png";
export default {
  data() {
    return {
      assistantInfo: {},
      headImg: avatarImg
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getInfo();
  },
  methods: {
    //获取医助信息
    getInfo() {
      var that = this;
      that.$ajax
        .get("/user/myassistant")
        .then(function(res) {
          if (res.data.status == 200) {
            console.log(res.data.data);
            that.assistantInfo = res.data.data.assistant;
            that.headImg = res.data.data.assistant.translates.avatar_img;
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin(that);
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {
          that.BaseSet.linkLogin(that);
        });
    },
    goPhone() {
      var that = this;
      that.$ajax
        .post("/user/anonymousphoneassistant", { credit: 36000 })
        .then(function(res) {
          if (res.data.status == 200) {
            console.log(res.data.data);
            that.$toast("请保持电话畅通，客服稍后与你联系");
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin(that);
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {});
    }
  },
  components: { headers }
  //请求数据接口
};
</script>

<style lang="scss">
.my_assistant {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .box {
    width: 17.25rem;
    height: 25rem;
    background-color: #fff;
    margin: 0.75rem auto;
    border-radius: 0.25rem;
    overflow: hidden;
    .pic {
      width: 2.85rem;
      height: 2.85rem;
      overflow: hidden;
      margin: 0 auto;
      margin-top: 4.5rem;
      border-radius: 100%;
      img {
        width: 2.85rem;
        height: 2.85rem;
        object-fit: cover;
      }
    }
    .name {
      width: 100%;
      text-align: center;
      margin-top: 0.375rem;
      color: #333;
      font-size: 0.7rem;
    }
    .tag {
      width: 100%;
      text-align: center;
      margin-top: 0.3rem;
      color: #999;
      font-size: 0.6rem;
    }
    .icon {
      width: 100%;
      text-align: center;
      margin-top: 4.5rem;
      font-size: 0;
      .phone,
      .message {
        width: 2.25rem;
        height: 2.25rem;
        display: inline-block;
        margin: 0 1.65rem;
        img {
          width: 2.25rem;
          height: 2.25rem;
        }
      }
    }
  }
}
</style>
