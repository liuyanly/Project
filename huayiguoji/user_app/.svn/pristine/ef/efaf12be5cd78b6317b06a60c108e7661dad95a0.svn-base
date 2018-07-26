<template>
  <div class="consult-pay">
    <headers headName="支付"></headers>
    <div class="contentScollr">
      <div class="top-box">
        <div class="type-info clear">
          <div class="left">
            <p class="type">
              就近类
            </p>
            <p class="name">
              {{dataInfo.realname}}
            </p>
          </div>
          <p class="right">
            <span>¥{{dataInfo.price}}</span>/月
          </p>
        </div>
        <div class="choose-time clear">
          <span class="left">预定时长</span>
          <ul class="right">
            <li :class="{current:timeId==1}" @click="changeTime(1)">
              1个月
            </li>
            <li :class="{current:timeId==2}" @click="changeTime(2)">
              2个月
            </li>
            <li :class="{current:timeId==3}" @click="changeTime(3)">
              3个月
            </li>
            <li :class="{current:timeId==12}" @click="changeTime(12)">
              1年
            </li>
          </ul>
        </div>
        <p class="money-p">
          共需支付：
          <span>{{dataInfo.price*timeId}}元</span>
        </p>
      </div>
      <div class="way-box">
        <p class="title-p">
          选择支付方式
        </p>
        <p class="pay-way clear" v-if="!isWechat">
          <input class="one_sel" type="radio" name="payWay" id="payWay0" @click="setPayWay(0,0)" :checked="payWay==0" />
          <label for="payWay0">
            <img class="left" src="../assets/images/c14_icon1.png" />
            <span class="title left">支付宝</span>
          </label>
        </p>
        <p class="pay-way clear">
          <input class="one_sel" type="radio" name="payWay" id="payWay2" @click="setPayWay(2,0)" :checked="payWay==2" />
          <label for="payWay2">
            <img class="left" src="../assets/images/c14_icon2.png" />
            <span class="title left">微信支付</span>
          </label>
        </p>
        <p class="pay-way clear" v-for="vipItem in userVipList">
          <input class="one_sel" type="radio" name="payWay" id="payWay4" @click="setPayWay(4,vipItem.id)" />
          <label for="payWay4">
            <img class="left" src="../assets/images/c14_icon3.png" />
            <span class="title left">会员
              <span class="tip">(支付{{dataInfo.total-dataInfo.residue}}次,剩余{{dataInfo.residue}}次)</span>
            </span>
          </label>
        </p>
        <p class="pay-way clear" v-for="(vipItem,index) in familyVipList">
          <input class="one_sel" type="radio" name="payWay" :id="'payWayf4'+index" @click="setPayWay(5,vipItem.id)" />
          <label :for="'payWayf4'+index">
            <img class="left" src="../assets/images/c14_icon3.png" />
            <span class="title left">{{vipItem.name}}的会员
              <span class="tip">(支付{{dataInfo.total-dataInfo.residue}}次,剩余{{dataInfo.residue}}次)</span>
            </span>
          </label>
        </p>
        <p class="pay-way clear" v-for="(vipItem,index) in departmentVipList">
          <input class="one_sel" type="radio" name="payWay" :id="'payWayd4'+index" @click="setPayWay(6,vipItem.id)" />
          <label :for="'payWayd4'+index">
            <img class="left" src="../assets/images/c14_icon3.png" />
            <span class="title left">{{vipItem.name}}会员
              <span class="tip">(支付{{dataInfo.total-dataInfo.residue}}次,剩余{{dataInfo.residue}}次)</span>
            </span>
          </label>
        </p>
        <p class="pay-way clear">
          <input class="one_sel" type="radio" name="payWay" id="payWay3" @click="setPayWay(3,0)" />
          <label for="payWay3">
            <img class="left" src="../assets/images/c14_icon4.png" />
            <span class="title left">余额支付</span>
          </label>
        </p>
        <p class="pay-way clear">
          <input class="one_sel" type="radio" name="payWay" id="payWay1" @click="setPayWay(1,0)" />
          <label for="payWay1">
            <img class="left" src="../assets/images/c14_icon4.png" />
            <span class="title left">线下支付</span>
          </label>
        </p>
      </div>
      <div class="intro-box">
        <span>服务介绍：</span>详细内容详细内容详细内容详细内容详细内 容详细内容详细内容详细内容详细内容详细内容详细内 容详细内容详细内容详细内容详细内容详细内容详细内 容详细内容详细内容
      </div>
      <p class="tip">
        点击确认则默认同意
        <router-link :to="{ name: 'ServerClause', params: {} }">
          <span>《服务协议》</span>
        </router-link>
      </p>
      <p class="pay-btn" @click='pay()'>
        确认支付
      </p>
    </div>
  </div>
</template>
<script>
import headers from "../components/Header";
export default {
  data() {
    return {
      isWechat: false,
      payWay: 0, //支付方式
      payUser: 0, //会员支付时，使用，其余情况。都可以为0
      userVipList: [],
      familyVipList: [],
      departmentVipList: [],
      timeId: 1,
      moneyVal: 100,
      dataInfo: "",
      doctorAccount: "",
      id: this.$route.params.id,
      doctor_id:0,
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
    this.getVIP();
    this.getDoctorData();
  },
  methods: {
    changeTime(time) {
      this.timeId = time;
      this.moneyVal = this.timeId * this.dataInfo.price;
    },
    getDoctorData() {
      var that = this;
      that.$ajax
        .get("/doctor/" + that.id + "/advice/5")
        .then(function(res) {
          if (res.data.status == 200) {
            that.dataInfo = res.data.data;
            that.doctorAccount = res.data.data.translates.doctor_account;
            that.doctor_id = that.doctorAccount.id;
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin(that);
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {
          that.$toast(err);
          that.BaseSet.linkLogin(that);
        });
    },
    setPayWay(way, user) {
      this.payWay = way;
      this.payUser = user;
    },
    pay() {
      var that = this;
      var that = this;
      var data = {
        _me: "user-api",
        title: "就近类签约医生服务",
        money: that.dataInfo.price * that.timeId,
        paytype: that.payWay,
        body: "就近类签约医生服务",
        type_id: 4,
        type: "service",
        months: that.timeId,
        doctor_id: that.doctor_id
      };
      let openid = localStorage.weChartPayInfo
        ? JSON.parse(localStorage.weChartPayInfo).openid
        : "";
      if (openid) {
        postData.openid = openid;
      }
      if (this.payUser > 0) {
        data.payer_id = that.payUser;
      }
      if(this.doctor_id==0){
          return false;
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
                  if (typeof status == "string") {
                    status = JSON.parse(status);
                  }
                  status = status.status;
                  if (status == "9000") {
                    that.$router.push({
                      name: "PaySuccess",
                      params: { money: data.money }
                    });
                  } else {
                    that.$router.push({ name: "PayFail" });
                  }
                }
              );
            } else if (that.payWay == 2) {
              that.native.weChatPay({ content: report }, function(status) {
                if (typeof status == "string") {
                  status = JSON.parse(status);
                }
                status = status.status;
                if (status == "0") {
                  that.$router.push({ name: "PaySuccess" ,
                      params: { money: data.money }});
                } else if (status == "-2") {
                } else {
                  that.$router.push({ name: "PayFail" });
                }
              });
            } else if (that.payWay == 3) {
              if (report == "钱包余额不足！") {
                that.$toast(report);
              } else {
                that.$router.push({ name: "PaySuccess", params: {money: data.money}});
              }
            } else if (that.payWay == 1) {
              that.$router.push({
                name: "OfflineRemittance",
                params: { money: that.money, id: report.id }
              });
            } else if (
              that.payWay == 4 ||
              that.payWay == 5 ||
              that.payWay == 6
            ) {
              if (typeof report != "string") {
                that.$router.push({ name: "PaySuccess", params: {money: data.money}});
              } else {
                that.$toast(report);
              }
            }
          } else if (res.data.status == 401) {
            //that.BaseSet.linkLogin(that);
          } else {
            //that.$toast(res.data.message);
            that.$router.push({ name: "PayFail" });
          }
        })
        .catch(function(err) {
          that.BaseSet.linkLogin(that);
        });
    },
    getVIP() {
      var that = this;
      var userInfo = JSON.parse(localStorage.userInfo);
      var userVip = userInfo.vips;
      if (!userVip) {
        return;
      }
      getUserVip();
      getFamilyVip();
      getDepartmentVip();
      function getUserVip() {
        if (userVip.user_vip) {
          var temp = {
            id: userInfo.id,
            residue:
              userVip.user_vip.pivot.permissions[
                that.BaseSet.vippermissions.dianhua
              ],
            totalresidue: that.timeId
          };
          that.userVipList.push(temp);
        }
      }
      function getFamilyVip() {
        if (userVip.family_vips) {
          for (var i = 0; i < userVip.family_vips.length; i++) {
            if (userVip.family_vips[i].id != userInfo.id) {
              if (!userVip.family_vips[i].vips) {
                continue;
              }
              var temp = {
                id: userVip.family_vips[i].id,
                name: userVip.family_vips[i].realname,
                residue:
                  userVip.family_vips[i].vips.pivot.permissions[
                    that.BaseSet.vippermissions.dianhua
                  ],
                totalresidue: that.timeId
              };
              that.familyVipList.push(temp);
            }
          }
        }
      }
      function getDepartmentVip() {
        if (userVip.company_vips) {
          for (var i = 0; i < userVip.company_vips.length; i++) {
            var temp = {
              id: userVip.company_vips[i].id,
              name: userVip.company_vips[i].title,
              residue:
                userVip.company_vips[i].translates.vips.pivot.permissions[
                  that.BaseSet.vippermissions.dianhua
                ],
              totalresidue: that.timeId
            };
            that.departmentVipList.push(temp);
          }
        }
      }
    }
  },
  components: { headers }
};
</script>
<style lang="scss" scoped>
.consult-pay {
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .top-box {
    background: #fff;
    .type-info {
      padding: 0.8rem;
      border-bottom: 1px solid #e5e5e5;
      p {
        font-size: 0.7rem;
        color: #333;
        line-height: 0.7rem;
      }
      .name {
        color: #666;
        margin-top: 0.4rem;
        padding-bottom: 0.2rem;
      }
      .right {
        line-height: 2rem;
        color: #999;
        span {
          color: #4cc6d8;
        }
      }
    }
  }
  .way-box {
    background: #fff;
    margin-top: 0.5rem;
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
  }
  .choose-time {
    padding: 0.5rem 0.8rem;
    .left {
      font-size: 0.7rem;
      color: #333;
      line-height: 1.3rem;
    }
    ul {
      li {
        float: left;
        width: 3rem;
        border: 1px solid #999;
        font-size: 0.7rem;
        line-height: 1.3rem;
        height: 1.3rem;
        border-radius: 0.3rem;
        text-align: center;
        margin-right: 0.5rem;
        &:last-child {
          margin-right: 0;
        }
      }
      .current {
        background: #4cc6d8;
        color: #fff;
        border-color: #4cc6d8;
      }
    }
  }
  .money-p {
    line-height: 2.3rem;
    text-align: right;
    font-size: 0.7rem;
    color: #333;
    padding: 0 0.8rem;
    span {
      color: #fc4f4f;
    }
  }
  .intro-box {
    line-height: 0.9rem;
    font-size: 0.7rem;
    color: #666;
    padding: 1rem 0.8rem;
    background: #fff;
    span {
      color: #333;
    }
  }
  .tip {
    padding: 0 0.8rem;
    font-size: 0.7rem;
    color: #999;
    margin-top: 1rem;
    span {
      color: #4cc6d8;
    }
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
