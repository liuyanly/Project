<template>
  <div class="not-vip">
    <headers headName="会员信息"></headers>
    <div class="contentScollr">
      <ul class="vip-list">
        <li class="vip-item" :style="{backgroundImage:'url('+data.translates.background+')'}" v-for="(data,index) in dataList">
          <input type="radio" name="inputRadio" :id="'vipRadio'+index" class="input-radio hidden" @click="setValue(data.id,data.money,data.title)" />
          <label :for="'vipRadio'+index">
            <p class="title">
              {{data.title}}(¥{{data.money}})
            </p>
            <ul class="sevice-list clear" v-html="data.content">

            </ul>
          </label>
          <!-- <img class="choose-img" src="../assets/images/g4_xz_p.png" v-if="vipValue==1" />
                    <img class="choose-img" src="../assets/images/g4_xz.png" v-if="vipValue!=1" /> -->

        </li>
      </ul>
    </div>
    <p class="btn-open" @click="openVip()">
        开通会员
     </p>
  </div>
</template>
<script>
import headers from "../components/Header";
export default {
  data() {
    return {
      vipValue: -1,
      money: 0,
      title:"",
      dataList: ""
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      var that = this;
      this.$ajax
        .get("/user/viplist")
        .then(res => {
          console.log(res.data);
          if (res.data.status == 200) {
            that.dataList = res.data.data;
            if (that.dataList.length > 0) that.vipValue = res.data.data[0].id;
          }
        })
        .catch(err => {});
    },
    openVip() {
      var that = this;
      if (this.vipValue === -1) {
        this.$toast("请选择会员类型");
        return false;
      }
      this.$router.push({
        name: "NowPay",
        params: { type: "vip", id: that.vipValue,money:that.money,title:encodeURI(that.title),orderno:0 }
      });
    },
    setValue(val,money,title) {
      console.log(val);
      this.money=money;
      this.title=title;
      this.vipValue = val;
    }
  },
  components: { headers }
};
</script>
<style lang="scss" scoped>
.not-vip {
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .vip-list {
    margin-top: 0.5rem;
    padding-bottom:2.5rem;
    .vip-item {
      background-size: 100% 100%;
      background-position: 0 0;
      background-repeat: no-repeat;
      margin: 0 0.8rem 0.7rem 0.8rem;
      min-height: 7.9rem;
      position: relative;
      box-sizing: border-box;
      padding: 1.9rem 0rem;
      &:nth-of-type(2n) {
        color: #454545;
      }
      .input-radio {
        display: none;
      }
      .input-radio + label {
      }
      .input-radio + label::before {
        content: "";
        position: absolute;
        width: 1.1rem;
        height: 1.1rem;
        top: 0.5rem;
        right: 0.6rem;
        background: transparent url("../assets/images/g4_xz.png") no-repeat
          center center;
        background-size: 1.1rem;
      }
      .input-radio:checked + label::before {
        background-image: url("../assets/images/g4_xz_p.png");
      }
      //   input {
      //     width: 100%;
      //     height: 7.9rem;
      //     position: absolute;
      //     opacity: 0;
      //     top: 0;
      //     left: 0;
      //   }
      //   .choose-img {
      //     position: absolute;
      //     width: 1.1rem;
      //     height: 1.1rem;
      //     top: 0.5rem;
      //     right: 0.6rem;
      //   }
      .title {
        font-size: 0.9rem;
        color: #fff;
        margin-bottom: 1.3rem;
        text-align: center;
        line-height: 0.9rem;
        //font-weight: 600;
      }
    }
  }
  .btn-open {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 2.5rem;
    background: #4cc6d8;
    color: #fff;
    text-align: center;
    line-height: 2.5rem;
    font-size: 0.8rem;
  }
}
</style>
