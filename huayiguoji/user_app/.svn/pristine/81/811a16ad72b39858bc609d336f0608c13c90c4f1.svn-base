<template>
  <div class="now-pay-money">
    <headers headName="订单详情"></headers>
    <div class="contentScollr">
      <div class="top-div">
        <p class="tip-word">
          注：本平台只收取服务费，实际费用到时按实际情况支付
        </p>
        <p class="clear">
          <span class="title left">{{title}}</span>
          <span class="money right">￥{{money}}</span>
        </p>
      </div>
      <p class="title-p">
        选择支付方式
      </p>
      <div class="way-box">
        <p class="radio-p borderBottom">
          <input type="radio" class="one_sel" v-model="payWay" value="1" name="payWay" />
          <img src="../assets/images/b2_icon1_p.png" v-if="payWay!=1" />
          <img src="../assets/images/b2_icon1.png" v-else="payWay==1" />
          <span class="way-name">线上支付</span>
        </p>
        <p class="radio-p">
          <input type="radio" class="one_sel" v-model="payWay" value="2" name="payWay" />
          <img src="../assets/images/b2_icon1_p.png" v-if="payWay!=2" />
          <img src="../assets/images/b2_icon1.png" v-else="payWay==2" />
          <span class="way-name">线下支付</span>
        </p>
      </div>
      <div class="agree-box">
        <p class="radio-p checkbox-p clear">
          <input type="checkbox" class="more_sel" v-model="agree" value="1" />
          <img src="../assets/images/b2_icon1_p.png" v-if="agree!=1" />
          <img src="../assets/images/b2_icon1.png" v-else="agree==1" />
          <span class="way-name">我已阅读并同意遵守
            <span class="agreement-name">
              <router-link :to="{ path: '/Disclaimer' }">《免责声明》</router-link>
            </span>
            <span class="agreement-name">
              <router-link :to="{ path: '/ChargeAsk' }">《就诊安排预收费告知单》</router-link>
            </span>
            <span class="agreement-name">
              <router-link :to="{ path: '/ServerAsk' }">《服务费告知单》</router-link>
            </span>
          </span>
        </p>
      </div>
      <p class="pay-btn" @click="pay(1)">
        确认支付
      </p>
    </div>
  </div>
</template>
<script>
import headers from "../components/Header.vue";
//import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      money: this.$route.params.money,
      title: decodeURI(this.$route.params.title),
      id: this.$route.params.id,
      type: this.$route.params.type,
      payWay: "1",
      agree: 0
    };
  },
  methods: {
    pay(type) {
      var that = this;
      if (this.agree == 0) {
        //console.log(this.agree);
        this.$toast("请阅读并同意相关协议！");
        return false;
      }
      if (that.payWay == 1) {
        //如果是已经下过订单。则直接进入支付页面
        if (that.$route.params.type == "service") {
          that.$router.push({
            name: "repay",
            params: { id: that.id, orderno: that.$route.params.orderno,money:that.money }
          });
        } else {
          //VIP支付时。进入pay页面
          that.$router.push({
            name: "Pay",
            params: { id: that.id, money: that.money }
          });
        }
      } else {
        that.$router.push({
          name: "OfflineRemittance",
          params: { money: that.money, id: that.id }
        });
      }
    }
  },
  components: { headers }
};
</script>
<style lang="scss">
a {
  color: #4cc6d8;
}
.now-pay-money {
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .top-div {
    background: #fff;
    padding: 0.8rem;
    .tip-word {
      font-size: 0.6rem;
      color: #999;
      text-align: center;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .clear {
      line-height: 0.7rem;
    }
    .title {
      font-size: 0.7rem;
      color: #333;
      margin-top: 2.4rem;
      margin-bottom: 0.4rem;
    }
    .money {
      font-size: 0.7rem;
      color: #fc4f4f;
      margin-top: 2.4rem;
      margin-bottom: 0.4rem;
    }
  }
  .title-p {
    font-size: 0.7rem;
    color: #999;
    line-height: 1.5rem;
    padding-left: 0.8rem;
  }
  .borderBottom {
    border-bottom: 1px solid #e5e5e5;
  }
  .radio-p {
    line-height: 2.3rem;
    padding: 0 0.8rem;
    position: relative;
    .one_sel,
    .more_sel {
      width: 1.3rem;
      height: 1.3rem;
      position: absolute;
      top: 0.5rem;
    }
    .way-name {
      font-size: 0.7rem;
      color: #666;
      span {
        color: #4cc6d8;
      }
    }
    img {
      width: 1.3rem;
      height: 1.3rem;
      vertical-align: middle;
    }
  }
  .checkbox-p {
    line-height: 1;
    margin-top: 1.4rem;
    margin-bottom: 0.9rem;
    .more_sel {
      top: 0;
    }
    .way-name {
      float: left;
      width: 15.4rem;
      line-height: 0.9rem;
      margin-left: 0.3rem;
    }
    img {
      float: left;
    }
  }
  .way-box {
    background: #fff;
  }
  .pay-btn {
    margin: 0 0.8rem;
    background: #4cc6d8;
    text-align: center;
    color: #fff;
    font-size: 0.8rem;
    line-height: 2rem;
    border-radius: 0.3rem;
    a {
      color: #fff;
    }
  }
}
</style>
