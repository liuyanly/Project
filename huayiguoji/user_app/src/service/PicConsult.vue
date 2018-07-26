<template>
    <div class="pic-consult">
        <headers headName="在线咨询"></headers>
        <div class="contentScollr">
            <div class="inner-box">
                <div class="top-box clear">
                    <img :src="data.translates.avatar_img" class="left" />
                    <div class="info-box left">
                        <p class="name">
                            {{data.realname}}
                            <span class="c1">({{data.translates.department_title+' '+data.jobtitle}})</span>
                        </p>
                        <p class="hospital-name">
                            {{data.translates.hospital_title}}
                        </p>
                    </div>
                </div>
                <p class="tip">
                    医生回复仅为建议，具体诊疗请前往医院进行.
                </p>
            </div>
            <div class="footer-box clear" v-if="status==1">
                <p class="btn goOn-consult" @click="btnClick(1)">
                    继续咨询
                </p>
                <p class="btn now-evaluate" @click="btnClick(2)">
                    立即评价
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
      status: this.$route.params.status,
      orderableId: this.$route.params.id,
      id:0,
      data: ""
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getDetail();
  },
  methods: {
    btnClick(type) {
      if (type == 1) {
      } else {
        this.$router.replace({
          path: "/Evaluate/" + this.id,
          query: { orderableId: this.orderableId }
        });
      }
    },
    getDetail() {
      var that = this;
      that.$ajax
        .get("/service/" + that.orderableId)
        .then(function(res) {
          console.log(res.data);
          if (res.data.status == 200) {
            that.data = res.data.data.doctor;
            that.id = res.data.data.service_details.id;
          }
        })
        .catch(function(err) {});
    }
  },
  components: { headers }
};
</script>
<style lang="scss" scoped>
.pic-consult {
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .inner-box {
    .top-box {
      background: #fff;
      padding: 0.8rem /* 30/40 */;
      > img {
        width: 2.3rem /* 92/40 */;
        height: 2.3rem /* 92/40 */;
        border-radius: 50%;
        margin-right: 0.5rem /* 20/40 */;
      }
      .left {
        float: left;
      }
      .name {
        position: relative;
        font-size: 0.7rem /* 28/40 */;
        color: #333;
        line-height: 0.7rem /* 28/40 */;
        margin-top: 0.2rem /* 8/40 */;
        margin-bottom: 0.6rem /* 23/40 */;
        .c1 {
          color: #4cc6d8;
          font-size: 0.6rem /* 24/40 */;
        }
      }
      .hospital-name {
        font-size: 0.6rem /* 24/40 */;
        color: #999;
        line-height: 0.6rem;
      }
    }
  }
  .tip {
    font-size: 0.6rem /* 24/40 */;
    color: #999;
    text-align: center;
    margin-top: 0.5rem /* 18/40 */;
    margin-bottom: 0.2rem /* 8/40 */;
  }
  .footer-box {
    position: fixed;
    bottom: 0;
    .btn {
      float: left;
      width: 9.375rem /* 375/40 */;
      height: 2.5rem /* 98/40 */;
      line-height: 2.5rem /* 98/40 */;
      text-align: center;
      font-size: 0.8rem /* 30/40 */;
      color: #4cc6d8;
      background: #fff;
    }
    .now-evaluate {
      background: #4cc6d8;
      color: #fff;
    }
  }
}
</style>
