<template>
  <div class="pay">
    <headers headName="线下充值"></headers>
    <div class="contentScollr">
      <div class="top-div">
        <p class="line1 clear">
          <span class="name left">充值金额：</span>
          <span class="unit left">¥</span>
          <input type="number left" v-model="money" />
        </p>
      </div>
      <p class="pay-btn" @click="nowRecharge()">
        下一步
      </p>
    </div>
  </div>
</template>
<script>
import headers from "../components/Header.vue";
export default {
  data() {
    return {
      money: ""
    };
  },
  mounted() {
    //console.log(this.$route.params.id);
  },
  methods: {
    nowRecharge() {
      var that = this;
      if (this.money > 5000) {
        this.$toast("单笔最高充值5000元");
        return false;
      }
      if (this.money == "") {
        this.$toast("请输入充值金额");
        return false;
      }
      that.$ajax
        .post("/order", {
          _me: "user-api",
          title: "账号充值",
          money: this.money,
          paytype: "1",
          body: "账号充值",
          type: "recharge"
        })
        .then(function(res) {
          if (res.data.status == 200) {
            var report = res.data.data;
            that.$router.push({
              name: "OfflineRemittance",
              params: { money: that.money, id: report.id }
            });
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin(that);
          } else {
            //that.$toast(res.data.message);
            that.$router.push({ name: "PayFail" });
          }
        })
        .catch(function(err) {
          that.BaseSet.linkLogin(that);
        });
    }
  },
  components: { headers }
};
</script>
<style lang="scss">
a {
  color: #4cc6d8;
}
.pay {
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .top-div {
    line-height: 1.2rem;
    padding: 2.2rem 0.6rem 1.8rem 0.6rem;
    box-sizing: border-box;
    //margin-bottom: 1.5rem /* 60/40 */;
    background: #fff;
    .left {
      float: left;
    }
    .line1 {
      line-height: 1.2rem;
    }
    .name {
      font-size: 0.7rem;
      color: #999;
      margin-right: 0.3rem;
    }
    .unit {
      font-size: 1.2rem;
      color: #333;
    }
    input {
      width: 10rem;
      line-height: 1.2rem;
      color: #333;
      font-size: 0.8rem;
      margin-left: 0.5rem;
    }
    .tip-word {
      font-size: 0.6rem;
      color: #999;
      margin-top: 0.3rem;
      line-height: 0.6rem;
    }
  }
  .way-box {
    background: #fff;
    margin-top: 0.5rem;
  }
  .pay-btn {
    margin: 1.5rem 0.8rem;
    background: #4cc6d8;
    text-align: center;
    color: #fff;
    font-size: 0.8rem;
    line-height: 2rem;
    border-radius: 0.3rem;
  }
}
</style>
