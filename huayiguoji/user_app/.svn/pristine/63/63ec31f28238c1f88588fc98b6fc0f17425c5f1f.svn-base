<template>
  <div class="fill-disease">
    <headers headName="意见反馈"></headers>
    <div class="contentScollr">
      <div class="form-box">
        <p class="txt-p">
          <textarea maxlength="200" @keyup="changeWordNum" placeholder="请输入具体描述" v-model="txtWord"></textarea>
          <!--<span>{{wordNum}}/200</span>-->
          <span>文字输入上限200字</span>

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
          请上传问题截图（方便我们更好的处理您的反馈）
        </p>
        <input maxlength="11" v-model="telnumber" class="telnumber" type="text" placeholder="请输入电话号码便于我们能够联系到您" />
        <p class="sure-btn" @click="sure()">
          提交
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
      txtWord: "",
      telnumber: "",
      wordNum: 0,
      imgs: [],
      imgIds: [],
      consultType: this.$route.params.id
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
  },
  methods: {
    removePic(index) {
      this.imgs.splice(index, 1);
      this.imgIds.splice(index, 1);
    },
    changeWordNum() {
      this.wordNum = this.txtWord.length;
    },
    sure() {
      if (this.txtWord == "") {
        this.$toast("请输入具体描述");
        return false;
      }
      var telnumber1 = this.telnumber;
      if (!/^1\d{10}$/.test(telnumber1)) {
        this.$toast("请输入正确的电话号码");
        return false;
      }
      var that = this;
      this.$ajax
        .post("/issue", {
          mobile: this.telnumber,
          title: this.txtWord,
          _me: "user-api",
          image_ids: that.imgIds
        })
        .then(function(res) {
          if (res.data.status == 200) {
            that.$toast("反馈成功");
            setTimeout(function() {
              that.$router.push({ name: "My" });
            }, 1500);
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
    addImg() {
      var that = this;
      this.native.photo({ num: 3, width: 1, height: 1, size: 80 }, function(
        data
      ) {
        that.imgs = data.imgs.split(",");
        that.imgIds = data.id.split(",");
      });
    }
  },
  components: { headers }
};
</script>
<style lang="scss" scoped>
.fill-disease {
  background: #fff !important;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .form-box {
    padding: 1rem 0.75rem 0.75rem 0.75rem;
    .txt-p {
      position: relative;
      textarea {
        width: 94%;
        height: 7.5rem;
        padding: 0.5rem;
        background: #eee;
        resize: none;
        border-radius: 0.3rem;
        font-size: 0.7rem;
        margin: 0 auto;
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
    .telnumber {
      width: 100%;
      height: 2.25rem;
      background: #eee;
      margin-bottom: 1.5rem;
      border-radius: 0.25rem;
      text-align: center;
      font-size: 0.7rem;
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
      margin-top: 0.75rem;
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
