<template>
  <div class="d4">
    <headers headName="患者信息"></headers>
    <div class="contentScollr">
      <div class="head-top">
        <p class="bg-p">
        </p>
        <div class="user-box">
          <img class="head-img" :src="headImg" />
          <p class="name">
            {{name}}
          </p>
          <p class="hospital">
            {{illness}}
          </p>
          <p class="department">
            性别:{{sex}}&emsp;年龄:{{age=='暂无'?'暂无':age+"岁"}}
          </p>
        </div>
      </div>
      <div>
        <p class="y-x-title">症状</p>
        <div class="y-x-fengexian"></div>
        <p class="y-x-miaoshu">{{symptom}}
        </p>
        <div class="y-fengexian"></div>
      </div>

      <div>
        <p class="y-x-title aui-border-b">
          <span>图文咨询</span>
          <span class="aui-text-333 aui-pull-right">¥ {{money}}/次</span>
        </p>
      </div>
    </div>
    <div class="y-footer">
      <span>
        <a href="javascript:;" @click="goIm">{{footer1Txt}}</a>
      </span>
    </div>
  </div>
</template>

<script>
import headers from "../components/Header";
import publicFooter1 from "@/components/parts/footer1";
import avatarImg from "../assets/images/avatar.png";
export default {
  name: "graphicConsulting",
  data() {
    return {
      name: "",
      sex: "",
      illness: "",
      age: "",
      footer1Txt: "立即回复",
      footer1TxtUsl: "",
      headImg: avatarImg,
      userId: this.$route.params.userId,
      id: this.$route.params.id,
      symptom: "",
      money: "",
      userData: {},
      status: this.$route.params.status
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    if (this.status == 0) {
      this.footer1Txt = "立即回复";
    } else {
      this.footer1Txt = "查看记录";
    }
    this.getUser();
  },
  methods: {
    goIm() {
      var that = this;
      var imstatus = 0;
      if (this.status == 0) {
        imstatus = 1;
      } else {
        imstatus = 0;
      }
      var doctorInfo = JSON.parse(localStorage.doctorInfo);
      this.native.im({
        vueRouter: that.$router,
        status: imstatus,
        me: {
          id: doctorInfo.id,
          nickname: doctorInfo.realname,
          avatar: doctorInfo.translates.avatar_img,
          jobtitle: doctorInfo.jobtitle,
          department: doctorInfo.translates.department_title,
          hospital: doctorInfo.translates.hospital_title,
          identity: "doctor"
        },
        other: {
          id: that.userData.id,
          nickname: that.userData.realname,
          avatar: that.userData.translates.avatar_img,
          jobtitle: "",
          department: "",
          hospital: "",
          identity: "user"
        }
      });
    },
    getUser() {
      var that = this;
      that.$ajax
        .get("/consult/" + that.id)
        .then(res => {
          console.log(res.data);
          if (res.data.status == 200) {
            var data = res.data.data;
            this.userData = data.user;
            this.headImg = data.user.translates.avatar_img;
            this.name = data.user.realname;
            this.sex = data.user.sex === 1 ? "男" : "女";
            this.age = data.user.translates.age;
            this.illness = data.user.illness;
            this.symptom = data.user.symptom;
            this.money = data.service_details.cost;
          }
        })
        .catch(err => {
          //this.BaseSet.linkLogin(this)
        });
    }
  },
  components: {
    headers,
    publicFooter1
  }
};
</script>

<style lang="scss" scoped>
.y-footer span,
.y-footer span a {
  display: inline-block;
  width: 100%;
  color: #fff;
}
.contentScollr {
  flex: 1;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.head-top {
  position: relative;
  background: #fff;
  //height: 11.6rem /* 463/40 */;
  margin-bottom: 0.5rem;
  .bg-p {
    height: 2.1rem;
    background: #4cc6d8;
  }
  .user-box {
    text-align: center;
    height: 3.6rem;
    .head-img {
      background: #ccc;
      position: absolute;
      top: 0.4rem;
      left: 7.7rem;
      width: 3rem;
      height: 3rem;
      border: 0.1rem solid #fff;
      border-radius: 50%;
    }
    .vip-img {
      position: absolute;
      width: 0.9rem;
      height: 1rem;
      top: 2.5rem;
      left: 10rem;
    }
    .name {
      font-size: 0.8rem;
      color: #333;
      margin-top: 2rem;
      line-height: 0.8rem;
    }
    .hospital,
    .department {
      font-size: 0.6rem;
      color: #666;
      margin-top: 0.5rem;
      line-height: 0.6rem;
    }
  }
  .top-btn {
    margin-top: 3.8rem;
    padding-bottom: 1.2rem;
    .title {
      font-size: 0.7rem;
      color: #666;
      margin-top: 0.5rem;
      line-height: 0.7rem;
    }

    .left {
      float: left;
      text-align: center;
      img {
        width: 1.2rem;
        height: 1rem;
      }
      margin-left: 3.5rem;
    }
    .right {
      float: right;
      text-align: center;
      margin-right: 3.6rem;
      img {
        width: 1.4rem;
        height: 1.1rem;
      }
    }
  }
}
.y-x-miaoshu {
  font-size: 0.7rem;
  color: #333;
  padding: 0.8rem 0.4rem;
  line-height: 1.2rem;
  p {
    font-size: 0.7rem;
    color: #333;
    line-height: 1.2rem;
  }
  img {
    width: 100%;
  }
}
.kong222 {
  height: 5.55rem;
  background: #fff;
}
.d4 {
  margin-bottom: 2.95rem;
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>
