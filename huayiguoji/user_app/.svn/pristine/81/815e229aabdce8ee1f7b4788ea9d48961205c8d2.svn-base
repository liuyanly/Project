<template>
    <div class="tel-consult">
        <headers headName="电话咨询"></headers>
        <div class="contentScollr">
            <div class="inner-box">
                <div class="top-box">
                    <img :src="headImg" />
                    <p class="name">
                        {{data.realname}}
                        <span class="c1">({{department_title+' '+data.jobtitle}})</span>
                    </p>
                    <p class="hospital-name">
                        {{hospital_title}}
                    </p>
                </div>
                <div class="content-detail">
                    <div class="clear">
                        <p class="left ">
                            咨询原因:
                        </p>
                        <p class="word detail-word">
                            {{title}}
                        </p>
                    </div>
                    <div class="clear">
                        <p class="left ">
                            电话咨询:
                        </p>
                        <p class="word">
                            {{data.realname}} (¥{{data.telphone_advice_price}}/分钟)
                        </p>
                    </div>
                    <div class="clear">
                        <p class="left ">
                            我的电话:
                        </p>
                        <p class="word">
                            {{data.phone_no}}
                        </p>
                    </div>
                    <div class="clear">
                        <p class="left ">
                            预定时长:
                        </p>
                        <p class="word">
                            {{duration}}
                        </p>
                    </div>
                    <div class="clear">
                        <p class="left ">
                            预定时间:
                        </p>
                        <p class="word">
                            {{startTime}}
                        </p>
                    </div>
                </div>
                <div class="status-img" v-if="status==1">
                    <img src="../assets/images/e5_icon1.png" />
                </div>
            </div>
            <!-- 服务状态(-1:已拒绝 0:未完成 1:已完成 2:服务中) -->
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
      id: 0,
      data: "",
      title: "",
      startTime: "",
      headImg: "",
      department_title: "",
      hospital_title: "",
      duration: ""
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
            that.title = res.data.data.title;
            that.startTime = res.data.data.started_at;
            that.headImg = res.data.data.doctor.translates.avatar_img;
            that.department_title =
              res.data.data.doctor.translates.department_title;
            that.hospital_title =
              res.data.data.doctor.translates.hospital_title;
            that.duration = res.data.data.translates.duration;
          }
        })
        .catch(function(err) {});
    }
  },
  components: { headers }
};
</script>
<style lang="scss" scoped>
.tel-consult {
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .inner-box {
    margin: 0.8rem /* 30/40 */;
    background: #fff;
    border-radius: 0.3rem /* 10/40 */;
    height: 25rem /* 1000/40 */;
    position: relative;
    .status-img {
      position: absolute;
      bottom: 3.6rem /* 143/40 */;
      right: 2.7rem /* 108/40 */;
      img {
        width: 2.8rem /* 111/40 */;
        height: 2.8rem /* 111/40 */;
      }
    }
    .top-box {
      text-align: center;
      > img {
        width: 2.9rem /* 114/40 */;
        height: 2.9rem /* 114/40 */;
        margin-top: 1.4rem /* 55/40 */;
        border-radius: 50%;
      }
      .name {
        position: relative;
        font-size: 0.7rem /* 28/40 */;
        color: #333;
        margin-top: 0.4rem /* 16/40 */;
        margin-bottom: 0.6rem /* 23/40 */;
        line-height: 0.7rem /* 28/40 */;
        .c1 {
          color: #4cc6d8;
          right: 4.2rem /* 165/40 */;
          font-size: 0.6rem /* 24/40 */;
          bottom: 0;
        }
      }
      .hospital-name {
        font-size: 0.6rem /* 24/40 */;
        color: #999;
        line-height: 0.6rem;
      }
    }
    .content-detail {
      margin: 2.6rem /* 104/40 */ 1.8rem /* 72/40 */ 0 3.9rem /* 154/40 */;
      font-size: 0.7rem /* 28/40 */;
      color: #999;
      .clear {
        height: auto;
        margin-bottom: 0.8rem /* 30/40 */;
      }
      .left {
        float: left;
        line-height: 0.7rem /* 28/40 */;
        margin-right: 1.5rem /* 60/40 */;
      }
      .word {
        float: right;
        width: 6.9rem /* 260/40 */;
        line-height: 0.7rem /* 28/40 */;
        color: #333;
      }
      .detail-word {
        line-height: 0.8rem /* 32/40 */;
      }
    }
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
