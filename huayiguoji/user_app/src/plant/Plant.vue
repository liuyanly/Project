<template>
  <div class="plant_box">
    <headers headName='就医策划'></headers>
    <div class="contentScollr">
      <div class="box">
        <div class="content">
          <div class="pic"><img src="../assets/images/c2_icon1.png" alt=""></div>
          <div class="name">健康管家</div>
          <div class="txt">“健康，是管出来的”是健康管家的外延。空气、水源、食品、噪音等污染极大的影响着每个人的身心健康，影响到家庭和谐，甚至威胁到整个人类的生存。</div>
        </div>
        <div class="content">
          <div class="pic"><img src="../assets/images/c2_icon2.png" alt=""></div>
          <div class="name">客服经理</div>
          <div class="txt">医助经理负责帮您安排医助，为您的就医提供全方位的服务。您现在只需要关心如何才能更健康的生活，其余的事情，交给医助经理帮您搞定。</div>
        </div>
      </div>
      <div class="foot">
        <div class="steward" @click="callAssistant"><img src="../assets/images/c2_icon3_p.png" alt="">健康管家</div>
        <div class="service" @click="callManager"><img src="../assets/images/c2_icon3.png" alt="">客服经理</div>
      </div>
    </div>
  </div>
</template>

<script>
//导入模板
import headers from "../components/Header.vue";
export default {
  data() {
    return {
      articles: ""
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getData();
  },
  methods: {
    getData() {
      var that = this;
      that.$ajax
        .get("/assistant")
        .then(function(res) {
          if (res.data.status == 200) {
            console.log(res.data.data);
            that.articles = res.data.data;
          }
        })
        .catch(function(err) {
          that.$toast(err);
          // that.BaseSet.linkLogin(that);
        });
    },
    callManager() {
      var that = this;
      that.$ajax
        .post("/user/anonymousphonemanager")
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
        .catch(function(err) {
          that.$toast(err);
          // that.BaseSet.linkLogin(that);
        });
    },
    callAssistant() {
      var that = this;
      var my_assistant = JSON.parse(localStorage.userInfo).translates
        .my_assistant;
      if (my_assistant > 0) {
        that.$ajax
          .post("/user/anonymousphoneassistant")
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
          .catch(function(err) {
            that.$toast(err);
            // that.BaseSet.linkLogin(that);
          });
      }
      else{
        that.$toast("您还不是会员");
      }
    }
  },
  components: { headers }
  //请求数据接口
};
</script>

<style lang="scss" scoped>
.plant_box {
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
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    padding-bottom: 4rem;
    .content {
      width: 14.3rem;
      margin: 0 auto;
      .pic {
        width: 2.65rem;
        height: 2rem;
        margin: 0 auto;
        margin-top: 3.1rem;
        img {
          width: 2.65rem;
          height: 2rem;
        }
      }
      .name {
        width: 100%;
        text-align: center;
        color: #333333;
        font-size: 0.75rem;
        margin-top: 1rem;
      }
      .txt {
        width: 100%;
        color: #666666;
        font-size: 0.7rem;
        margin-top: 0.725rem;
      }
    }
  }
  .foot {
    width: 100%;
    position: fixed;
    height: 2.45rem;
    left: 0;
    bottom: 0;
    z-index: 999;
    overflow: hidden;
    .steward {
      width: 50%;
      float: left;
      overflow: hidden;
      text-align: center;
      height: 2.45rem;
      line-height: 2.45rem;
      color: #6fc3d5;
      font-size: 0.75rem;
      background-color: #fff;
      img {
        width: 0.725rem;
        height: 0.725rem;
        vertical-align: middle;
        margin-right: 0.25rem;
      }
    }
    .service {
      width: 50%;
      float: left;
      overflow: hidden;
      text-align: center;
      height: 2.45rem;
      line-height: 2.45rem;
      color: #ffffff;
      font-size: 0.75rem;
      background-color: #6fc3d5;
      img {
        width: 0.725rem;
        height: 0.725rem;
        vertical-align: middle;
        margin-right: 0.25rem;
      }
    }
  }
}
</style>
