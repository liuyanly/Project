<template>
  <div class="pay">
    <headers headName="支付"></headers>
    <div class="contentScollr">
      <div class="top-div">
        <p class="clear">
          <span class="title left" v-if='id!=0'>{{dataInfo.title}}</span>
          <span class="title left" v-if='id==0'>会员续费</span>
          <span class="money right">
            <span>{{money}}</span>元</span>
        </p>
        <p class="all-money">
          <span class="title">共需支付:</span>
          <span class="money">{{money}}元</span>
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
        <p class="pay-way clear">
          <input class="one_sel" type="radio" name="payWay" id="payWay3" @click="setPayWay(3,0)" />
          <label for="payWay3">
            <img class="left" src="../assets/images/c14_icon4.png" />
            <span class="title left">余额支付</span>
          </label>
        </p>
      </div>
      <p class="pay-btn" @click='pay()'>
        确认支付
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
      agree: "0",
      id: this.$route.params.id,
      money: this.$route.params.money,
      dataInfo: {}
    };
  },
  beforeMount() {
    var that = this;
    var userAgent = navigator.userAgent,
      isAndroid =
        userAgent.indexOf("Android") > -1 || userAgent.indexOf("Adr") > -1,
      isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.isWechat = !isAndroid && !isiOS;
    if (that.isWechat) {
      that.payWay = 2;
    }
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getData();
  },
  methods: {
    getData() {
      if (this.id != undefined && this.id != 0) {
        var that = this;
        that.$ajax
          .get("/order/" + that.id)
          .then(function(res) {
            if (res.data.status == 200) {
              that.dataInfo = res.data.data;
            } else if (res.data.status == 401) {
              that.BaseSet.linkLogin(that);
            } else {
              that.$toast(res.data.message);
            }
          })
          .catch(function(err) {
            that.BaseSet.linkLogin(that);
          });
      }
    },
    setPayWay(way, user) {
      this.payWay = way;
      this.payUser = user;
    },
    pay() {
      var that = this;
      if (that.payWay == 0 || that.payWay == 2) {
        var data = {
          _me: "user-api",
          title: that.dataInfo.title,
          money: that.dataInfo.money,
          paytype: that.payWay,
          body: that.dataInfo.title,
          type: "vip",
          type_id: that.$route.params.id
        };
        if (this.id == 0) {
          data.title = "会员续费";
          data.body = "会员续费";
          data.money = this.money;
        }
        that.$ajax
          .post("/order", data)
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
                      this.$ajax.get("/user/me").then(function(res1) {
                        if (res1.data.status == 200) {
                          localStorage.userInfo = res1.data.data;
                        }
                      });
                      that.$router.push({ name: "PaySuccess" , params: {money: data.money}});
                    } else {
                      that.$router.push({ name: "PayFail" });
                    }
                  }
                );
              } else if (that.payWay == 2) {
                that.native.weChatPay({ content: report }, function(status) {
                  if (typeof(status) == "string") {
                      status = JSON.parse(status);
                    }
                  status=status.status;
                  if (status == "0") {
                    this.$ajax.get("/user/me").then(function(res) {
                      if (res.data.status == 200) {
                        localStorage.userInfo = res.data.data;
                      }
                    });
                    that.$router.push({ name: "PaySuccess", params: {money: data.money}});
                  } else if (status == "-2") {
                  } else {
                    that.$router.push({ name: "PayFail" });
                  }
                });
              } else if (that.payWay == 3) {
                if (report == "钱包余额不足！") {
                  that.$toast(report);
                } else {
                  that.$router.push({ name: "PaySuccess" , params: {money: data.money}});
                }
              }
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
    background: #fff;
    //padding: .8rem /* 30/40 */;
    .clear {
      font-size: 0.7rem;
      color: #333;
      line-height: 3.5rem;
      padding: 0 0.8rem;
      border-bottom: 1px solid #e5e5e5;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .money {
      color: #999;
      font-size: 0.6rem;
      span {
        font-size: 0.7rem;
        color: #4cc6d8;
      }
    }
    .all-money {
      line-height: 2.3rem;
      text-align: right;
      padding: 0 0.8rem;
      font-size: 0.7rem;
      color: #333;
      .money {
        color: #fc4f4f;
      }
    }
  }
  .title-p {
    font-size: 0.7rem;
    color: #999;
    line-height: 2rem;
    padding-left: 0.8rem;
  }
  .pay-way,
  .borderBottom {
    border-bottom: 1px solid #e5e5e5;
  }
  .pay-way {
    line-height: 3rem;
    padding: 0 0.8rem;
    position: relative;
    &:nth-of-type(5) {
      border-bottom: none;
    }
    .one_sel,
    .more_sel {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0.85rem;
      right: 0.8rem;
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
