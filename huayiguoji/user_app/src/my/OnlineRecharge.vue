<template>
    <div class="pay">
        <headers headName="线上充值"></headers>
        <div class="contentScollr">
            <div class="top-div">
                <p class="line1 clear">
                    <span class="name left">充值金额：</span>
                    <span class="unit left">¥</span>
                    <input type="number left" v-model="money" />
                </p>
                <p class="tip-word">
                    单笔最高充值5000元
                </p>
            </div>
            <div class="way-box">
                <p class="title-p">
                    选择支付方式
                </p>
                <p class="pay-way clear" v-if="!isWechat">
                    <input class="one_sel" type="radio" name="payWay" id="payWay0" @click="setPayWay(0,0)" :checked="!isWechat" />
                    <label for="payWay0">
                        <img class="left" src="../assets/images/c14_icon1.png" />
                        <span class="title left">支付宝</span>
                    </label>
                </p>
                <p class="pay-way clear">
                    <input class="one_sel" type="radio" name="payWay" id="payWay2" @click="setPayWay(2,0)" :checked="isWechat" />
                    <label for="payWay2">
                        <img class="left" src="../assets/images/c14_icon2.png" />
                        <span class="title left">微信支付</span>
                    </label>
                </p>
            </div>
            <p class="pay-btn" @click="nowRecharge()">
                充值
            </p>
        </div>
    </div>
</template>
<script>
import headers from "../components/Header.vue";
export default {
  data() {
    return {
      isWechat: false,
      payWay: 0, //支付方式
      payUser: 0, //会员支付时，使用，其余情况。都可以为0
      userVipList: [],
      familyVipList: [],
      departmentVipList: [],
      money: ""
    };
  },
  beforeMount() {
    // var that = this;
    var userAgent = navigator.userAgent,
      isAndroid =
        userAgent.indexOf("Android") > -1 || userAgent.indexOf("Adr") > -1,
      isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.isWechat = !isAndroid && !isiOS;
    if (this.isWechat) {
      this.payWay = 2;
    }
  },
  mounted() {
    this.BaseSet.getToken(this);
    console.log(this.payWay,this.payUser)
  },
  methods: {
    setPayWay(way, user) {
      this.payWay = way;
      this.payUser = user;
      console.log(this.payWay,this.payUser)
    },
    nowRecharge() {
      if (this.money > 5000) {
        this.$toast("单笔最高充值5000元");
        return false;
      }
      if (this.money == "") {
        this.$toast("请填写充值金额");
        return false;
      }
      var that = this;
      if (that.payWay == 0 || that.payWay == 2) {
        that.$ajax
          .post("/order", {
            _me: "user-api",
            title: "账号充值",
            money: this.money,
            paytype: that.payWay,
            body: "账号充值",
            type: "recharge"
          })
          .then(function(res) {
            if (res.data.status == 200) {
              var report = res.data.data;
              if (that.payWay == 0) {
                that.native.aliPay(
                  {
                    content: report
                  },
                  function(status) {
                    if (typeof(status) == "string") {
                      status = JSON.parse(status);
                    }
                    status = status.status;
                    if (status == "9000") {
                      that.$router.push({ name: "PaySuccess" , params: {money: that.dataInfo.price}});
                    } else {
                      that.$router.push({ name: "PayFail" });
                    }
                  }
                );
                //     that.$router.push({
                //     name: "PaySuccess",
                //     params: { money: that.money }
                //   });
              } else if(that.payWay == 2) {
                console.log("weChatPay");
                that.native.weChatPay({ content: report }, function(status) {
                  if (typeof(status) == "string") {
                      status = JSON.parse(status);
                    }
                  status=status.status;
                  if (status == "0") {
                    that.$router.push({ name: "PaySuccess" });
                  } else if (status == "-2") {
                  } else {
                    that.$router.push({ name: "PayFail" });
                  }
                });
              }
            } else if (res.data.status == 401) {
              that.BaseSet.linkLogin(that);
            } else {
              //that.$toast(res.data.message);
              that.$router.push({ name: "PayFail" });
            }
          })
          .catch(function(err) {
            that.$toast(err);
            // that.BaseSet.linkLogin(that);
          });
      }
    }
  },
  components: { headers }
};
</script>
<style lang="scss" scoped>
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
    padding: 2.2rem 0.6rem 0.8rem 0.6rem;
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
  .title-p {
    font-size: 0.7rem;
    color: #999;
    line-height: 2rem;
    padding-left: 0.8rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .pay-way,
  .borderBottom {
    border-bottom: 1px solid #e5e5e5;
  }
  .pay-way {
    line-height: 3rem;
    padding: 0 0.8rem;
    position: relative;
    &:last-child {
      border-bottom: none;
    }
    &:nth-of-type(5) {
      border-bottom: none;
    }
    .one_sel {
        display: none;
        position: relative;
        & + label {
          display: block;
          overflow: hidden;
        }
        &:checked + label:after {
          content: "";
          background: transparent url("../assets/images/c14_xz.png") no-repeat
            center center;
          background-size: 1.3rem;
          position: absolute;
          width: 1.3rem;
          height: 1.3rem;
          right: 0.8rem;
          top: 0.8rem;
        }
      }
    .title {
      font-size: 0.7rem;
      color: #666;
      span {
        color: #4cc6d8;
      }
    }
    .left {
      float: left;
    }
    img:nth-of-type(1) {
      width: 1.1rem;
      height: auto;
      margin-top: 0.9rem;
      margin-right: 0.4rem;
    }
    .right {
      float: right;
    }
    img {
      width: 1.3rem;
      height: 1.3rem;
      vertical-align: middle;
      margin-top: 0.85rem;
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
