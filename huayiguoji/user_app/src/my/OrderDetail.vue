<template>
    <div class="now-pay">
        <headers headName="订单详情"></headers>
        <div class="contentScollr">
            <div class="top-div">
                <p class="tip-word borderBottom">
                    注：本平台只收取服务费，实际费用到时按实际情况支付
                </p>
            </div>
            <p class="center-p clear borderBottom">
                <span class="title left">{{dataDetail.title}}
                    <span class="c1">(预缴款)</span>
                </span>
            </p>
            <p class="center-p clear">
                <span class="title left">服务费预缴款</span>
                <span class="money right">￥{{dataDetail.money}}</span>
            </p>
            <div class="agree-box">
                <p class="radio-p checkbox-p clear">
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
            <p class="pay-btn" v-if="orderType==1" @click="complete">完成订单</p>
            <p class="pay-btn" v-if="orderType==2&&orderableType&&comment==0" @click="evaluate">立即评价
                <!-- <router-link :to="{path:'/Evaluate/'+id}">立即评价</router-link> -->
            </p>
        </div>
    </div>
</template>
<script>
import headers from "../components/Header.vue";
export default {
  data() {
    return {
      payWay: "1",
      agree: "0",
      orderType: this.$route.params.type,
      id: this.$route.params.id,
      comment:this.$route.params.comment,
      dataDetail: {},
      orderableId: "",
      orderableType: false
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getDetail();
  },
  methods: {
    getDetail() {
      var that = this;
      that.$ajax
        .get("/order/" + that.id)
        .then(function(res) {
          if (res.data.status == 200) {
            console.log(res.data.data);
            that.dataDetail = res.data.data;
            that.orderableId = res.data.data.orderable_id;
            var patt1 = new RegExp("Service");
            if (patt1.test(that.dataDetail.orderable_type)) {
              that.orderableType = true;
            }
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin(that);
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {
          //that.$toast(err)
          that.BaseSet.linkLogin(that);
        });
    },
    complete() {
      this.orderType = 2;
      that.$ajax.put("/order/complete/" + that.id).then(function(res) {
        if (res.data.status == 200) {
          if (this.orderableType) {
            this.$router.replace({
              path: "/Evaluate/" + this.id,
              query: { orderableId: this.orderableId }
            });
          }
        }
      });
    },
    evaluate() {
      this.$router.replace({
        path: "/Evaluate/" + this.id,
        query: { orderableId: this.orderableId }
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
.now-pay {
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .radio-p {
    padding: 0;
  }
  .top-div {
    background: #fff;
    .tip-word {
      padding: 0.8rem /* 30/40 */;
      font-size: 0.6rem /* 24/40 */;
      color: #999;
      text-align: center;
      padding-bottom: 1.2rem /* 48/40 */;
    }
  }
  .center-p {
    padding: 0 0.8rem /* 30/40 */;
    background: #fff;
    line-height: 3rem /* 118/40 */;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .clear {
      line-height: 0.7rem /* 28/40 */;
    }
    .title {
      font-size: 0.7rem /* 28/40 */;
      color: #333;
      .c1 {
        font-size: 0.6rem /* 24/40 */;
        color: #4cc6d8;
      }
    }
    .money {
      font-size: 0.7rem /* 28/40 */;
      color: #fc4f4f;
    }
  }
  .title-p {
    font-size: 0.7rem /* 28/40 */;
    color: #999;
    line-height: 1.5rem /* 60/40 */;
    padding-left: 0.8rem /* 30/40 */;
  }
  .borderBottom {
    border-bottom: 1px solid #e5e5e5;
  }
  .checkbox-p {
    line-height: 1;
    margin-top: 1.4rem /* 57/40 */;
    margin-bottom: 0.9rem /* 35/40 */;
    text-align: center;
    span {
      font-size: 0.7rem /* 28/40 */;
    }
  }
  .way-box {
    background: #fff;
  }
  .pay-btn {
    margin: 0 0.8rem /* 30/40 */;
    background: #4cc6d8;
    text-align: center;
    color: #fff;
    font-size: 0.8rem /* 32/40 */;
    line-height: 2rem /* 82/40 */;
    border-radius: 0.3rem /* 10/40 */;
    a {
      color: #fff;
    }
  }
}
</style>
