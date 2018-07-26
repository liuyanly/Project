<template>
  <div class="fill-disease">
    <headers headName="填写病症"></headers>
    <div class="contentScollr">
      <p class="user-info">
        <span>{{userData.realname}}</span>
        <span>{{sex}}</span>
        <span v-if="age !== '暂无'">{{age}}岁</span>
        <span v-else>{{age}}</span>
      </p>
      <div class="form-box">
        <p class="txt-p">
          <textarea maxlength="200" @keyup="changeWordNum" placeholder="请填写您要咨询的病症" v-model="txtWord"></textarea>
          <span>{{wordNum}}/200</span>
        </p>
        <div class="pic_box">
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
        <p class="tip">
          点击确认则默认同意
          <router-link :to="{ name: 'ServerClause', params: {} }">
            <span>《服务协议》</span>
          </router-link>
        </p>
        <p class="sure-btn" @click="sure()">
          确定
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import headers from "../components/Header";

  export default {
    data() {
      return {
        imgs: [],
        imgIds: [],
        txtWord: "",
        wordNum: 0,
        sex: "",
        age: 0,
        consultType: this.$route.params.type,
        id: this.$route.params.id,
        userData: {}
      };
    },
    mounted() {
      this.BaseSet.getToken(this);
      this.getData();
    },
    methods: {
      removePic(index) {
        this.imgs.splice(index, 1);
        this.imgIds.splice(index, 1);
      },
      changeWordNum() {
        this.wordNum = this.txtWord.length;
      },
      getData() {
        var that = this;
        that.$ajax
          .get("/user/me")
          .then(function (res) {
            if (res.data.status == 200) {
              console.log(res.data.data);
              that.userData = res.data.data;
              that.age = res.data.data.translates.age;
              that.sex = res.data.data.translates.sex;
            } else if (res.data.status == 401) {
              that.BaseSet.linkLogin(that);
            } else {
              that.$toast(res.data.message);
            }
          })
          .catch(function (err) {
            that.BaseSet.linkLogin(that);
          });
      },
      sure() {
        if (this.txtWord == "") {
          this.$toast("请填写您要咨询的病症");
          return false;
        }
        if (this.consultType == 1) {
          this.$router.push({name: "ConsultPayPic", params: {id: this.id}});
        } else if (this.consultType == 2) {
          this.$router.push({name: "ConsultPayTel", params: {id: this.id}});
        } else if (this.consultType == 3) {
          this.$router.push({name: "ConsultPayVideo", params: {id: this.id}});
        } else if (this.consultType == 4) {
          this.$router.push({name: "ConsultPay", params: {id: this.id}});
        } else {
          this.$router.push({name: "ConsultPayNearby", params: {id: this.id}});
        }
      },
      addImg() {
        var that = this;
        this.native.photo({num: 9, width: 1, height: 1, size: 80}, function (data) {
          that.imgs = data.imgs.split(",");
          that.imgIds = data.id.split(",");
        });
        // this.native.getSdkSign({
        //   openid: JSON.parse(localStorage.weChartPayInfo).openid,
        //   url: location.href.split('#')[0]
        // }).then(res => {
        //   let data = res.data.data;
        //   wx.config({
        //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //     appId: 'wxd27ae67b907c5f4a', // 必填，公众号的唯一标识
        //     timestamp: data.timestamp.toString(), // 必填，生成签名的时间戳
        //     nonceStr: data.noncestr, // 必填，生成签名的随机串
        //     signature: data.signature,// 必填，签名
        //     jsApiList: ['chooseImage', 'uploadImage', 'downloadImage'] // 必填，需要使用的JS接口列表
        //   });
        //   // wx.ready(function () {
        //   //
        //   // })
        //   console.log('微信SDK签证配置信息；', res);
        //   that.native.photo();
        //   wx.error(function (res) {
        //     console.log('config错误返回：', res)
        //   })
        // }).catch(err => {
        //   console.log('获取签证失败：', err);
        // })
        // this.native.photo({num: 9, width: 1, height: 1, size: 80}, function (
        //   data
        // ) {
        //   that.imgs = data.imgs.split(",");
        //   that.imgIds = data.id.split(",");
        // });
      }
    },
    components: {headers}
  };
</script>
<style lang="scss" scoped>
  .fill-disease {
    background: #fff;
    display: flex;
    height: 100%;
    flex-direction: column;
    .contentScollr {
      flex: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    .user-info {
      padding: 0 0.8rem;
      padding-top: 1.6rem;
      color: #333;
      font-size: 0.7rem;
      span {
        margin-right: 0.8rem;
      }
    }
    .form-box {
      padding: 0.8rem;
      .txt-p {
        position: relative;
        textarea {
          width: 16.3rem;
          height: 6.5rem;
          padding: 0.5rem;
          background: #eee;
          resize: none;
          border-radius: 0.3rem;
        }
        span {
          position: absolute;
          font-size: 0.6rem;
          color: #999;
          right: 0.5rem;
          bottom: 0.5rem;
        }
      }
      .tip {
        font-size: 0.6rem;
        color: #999;
        margin-bottom: 1.5rem;
        span {
          color: #4cc6d8;
        }
      }
      .sure-btn {
        width: 17.2rem;
        height: 2rem;
        color: #fff;
        background: #4cc6d8;
        margin: 0 auto;
        border-radius: 0.3rem;
        text-align: center;
        line-height: 2rem;
        margin-bottom: 1rem;
        font-size: 0.8rem;
      }
    }
    .pic_box {
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      padding-bottom: 0.6rem;
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
</style>
