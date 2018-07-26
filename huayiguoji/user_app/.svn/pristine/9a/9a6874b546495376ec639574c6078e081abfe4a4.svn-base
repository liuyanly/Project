<template>
    <div class="offline-remittance">
        <headers headName='线下汇款'></headers>
        <div class="contentScollr">
            <div class="form_box">
                <div class="account-info">
                    <p class="title-p">
                        汇款账号
                    </p>
                    <template v-for="card in cardlist">
                    <p class="info-p">
                        户名：{{card.realname}}
                    </p>
                    <p class="info-p">
                        账号：{{card.cardno}}
                    </p>
                    <p class="info-p">
                        开户行：{{card.title}}
                    </p>
                    <p class="info-p">
                    </p>
                    </template>
                </div>
                <div class="pic_box">
                    <div class="title">请上传汇款凭证</div>
                    <ul>
                        <li v-for="(img,index) in imgs">
                            <img :src="img" alt="">
                            <img src="../assets/images/c13_1guanbi.png" alt="" class="close" @click="removePic(index)">
                        </li>
                        <li @click="addImg">
                            <img src="../assets/images/c37_tianjia.png" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="top-div">
                <p class="line1 clear">
                    <span class="name left">汇款金额：</span>
                    <span class="unit left">¥</span>
                    <input type="number left" v-model="money" />
                </p>
            </div>
            <div class="up_btn" @click="payComplete()">汇款完成</div>
        </div>
    </div>
</template>
<script>
//导入模板
import headers from "../components/Header.vue";
export default {
  data() {
    return {
      money: this.$route.params.money,
      imgs: [],
      imgIds: [],
      cardlist:[],
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getPayCard();
    console.log("==========",this.$route.params.id)
  },
  methods: {
    getPayCard() {
      var that = this;
      that.$ajax
        .get("/order/localpaycard")
        .then(function(res) {
          if (res.data.status == 200) {
            that.cardlist = res.data.data;
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
    removePic(index) {
      this.imgs.splice(index, 1);
      this.imgIds.splice(index, 1);
    },
    payComplete() {
      if (this.money > 5000) {
        this.$toast("单笔最高充值5000元");
        return false;
      }
      if (this.money == "") {
        this.$toast("请填写充值金额");
        return false;
      }
      var that = this;
      that.$ajax
        .put("/order/" + this.$route.params.id, {
          eventable_data: that.imgIds
        })
        .then(function(res) {
          if (res.data.status == 200) {
            that.zfbData = res.data.data;
            that.$router.push({
              name: "PaySuccess",
              params: { money: that.money }
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
    },
    addImg() {
      var that = this;
      this.native.photo({ num: 9, width: 1, height: 1, size: 80 }, function(
        data
      ) {
        that.imgs = data.imgs.split(",");
        that.imgIds = data.id.split(",");
      });
    }
  },
  components: { headers }
  //请求数据接口
};
</script>

<style lang="scss">
.offline-remittance {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .account-info {
    padding: 0.8rem;
    .title-p {
      font-size: 0.7rem;
      color: #333;
      margin-top: 0.6rem;
      margin-bottom: 1.3rem;
    }
    .info-p {
      line-height: 0.1rem;
      height: 0.9rem;
      font-size: 0.7rem;
      color: #666;
    }
  }
  .top-div {
    margin-top: 0.5rem;
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
  .form_box {
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    .pic_box {
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0 0.75rem;
      padding-bottom: 1.25rem;
      .title {
        width: 100%;
        color: #999999;
        font-size: 0.7rem;
        margin-top: 1.35rem;
      }
      li {
        width: 3.95rem;
        height: 3.95rem;
        overflow: hidden;
        float: left;
        margin-right: 0.2rem;
        position: relative;
        margin-top: 0.55rem;
        img {
          width: 3.95rem;
          height: 3.95rem;
          object-fit: cover;
        }
        .close {
          position: absolute;
          width: 1.25rem;
          height: 1.25rem;
          right: 0.125rem;
          top: 0.125rem;
        }
      }
    }
  }
  .up_btn {
    width: 17.2rem;
    height: 2.05rem;
    text-align: center;
    margin: 1.5rem auto;
    background-color: #4dc6d8;
    color: #ffffff;
    line-height: 2.05rem;
    font-size: 0.8rem;
    border-radius: 0.25rem;
  }
}
</style>
