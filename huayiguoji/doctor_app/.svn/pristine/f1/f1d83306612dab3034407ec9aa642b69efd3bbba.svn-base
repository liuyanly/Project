<template>
    <div class="health_manage">
        <headers headName='健康管理'></headers>
        <div class="contentScollr">
            <div class="head-top">
                <div class="content-box">
                    <img :src="headImg" />
                    <p class="name">
                        {{userName}}
                    </p>
                    <p class="diease">
                        {{illness}}
                    </p>
                    <p class="sex">
                        性别：{{sex}}&emsp;年龄：{{age>0?age+"岁":""}}
                    </p>
                </div>
            </div>
            <div class="nav">
                <ul>
                    <li>
                        <router-link :to="{ name: 'CheckReport', params: {id:id} }">
                            <img src="../assets/images/c19_icon1.png" alt="">
                            <span>体检报告</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/Survey'}">
                            <img src="../assets/images/c19_icon2.png" alt="">
                            <span>问卷调查</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/Monitoring'}">
                            <img src="../assets/images/c19_icon3.png" alt="">
                            <span>体征监测</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/HealthAssessment'}">
                            <img src="../assets/images/c19_icon4.png" alt="">
                            <span>健康评估</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/Intervention'}">
                            <img src="../assets/images/c19_icon5.png" alt="">
                            <span>健康干预</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/Follow'}">
                            <img src="../assets/images/c19_icon6.png" alt="">
                            <span>跟踪随访</span>
                        </router-link>
                    </li>
                    <li class="last-li">
                        <!-- <router-link :to="{path: '/Follow'}" > -->
                        <img src="../assets/images/a30_icon8@2x.png" alt="">
                        <span>疾病管理</span>
                        <!-- </router-link> -->
                    </li>
                </ul>
            </div>
            <div class="content">
                <div class="head">异常数据</div>
                <div class="box">
                    <!-- <div class="title">肾功能</div> -->
                    <div class="list">
                        <ul>
                            <li :class="{normal:data.abnormal==-1}" v-for="data in dataList">
                                <dl>
                                    <dd class="name">
                                        <span>{{data.title}}</span>
                                    </dd>
                                    <dd>{{data.pivot.value}}</dd>
                                    <dd>{{data.unit}}</dd>
                                    <dd>{{data.translates.range_desc}}</dd>
                                    <dd>
                                        <router-link :to="{ name: 'TrendMap', params: {id:data.id,title:data.title} }"><img v-if="data.abnormal==-1" src="../assets/images/c51_icon1.png" alt="">
                                            <img v-else src="../assets/images/c19_icon7.png" alt=""></router-link>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-box clear">
            <p class="left" @click="goIm()">
                发消息
            </p>
            <router-link :to="{ name: 'PublishTip', params: {id:id} }">
                <p class="right">
                    提醒
                </p>
            </router-link>
        </div>
    </div>
</template>

<script>
//导入模板
import headers from "../components/Header.vue";
export default {
  data() {
    return {
      userData: {},
      id: this.$route.params.id,
      userName: "",
      sex: "",
      headImg: "",
      dataList: [],
      illness: "",
      age: 0
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getData();
    this.BaseSet.setInfo("vipId", this.id);
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
      console.log(that.userData)
      var doctorInfo = JSON.parse(localStorage.doctorInfo);
      this.native.im({
        //vueRouter: that.$router,
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
    getData() {
      var that = this;
      that.$ajax
        .get("/user/patient/" + that.id)
        .then(function(res) {
          if (res.data.status == 200) {
            that.userData = res.data.data;
            that.userName = res.data.data.realname;
            that.sex = res.data.data.translates.sex;
            that.headImg = res.data.data.translates.avatar_img;
            that.illness = res.data.data.illness;
            that.age = res.data.data.translates.age;
            if (res.data.data.archivedata instanceof Array) {
              that.dataList = res.data.data.archivedata;
            } else {
              that.$toast(res.data.data.archivedata);
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
    }
  },
  components: { headers }
  //请求数据接口
};
</script>

<style lang="scss" scoped>
.health_manage {
  height: 100%;
  display: flex;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
  }
  .head-top {
    padding: 0.8rem /* 30/40 */ 0.6rem /* 24/40 */;
    height: 7rem /* 280/40 */;
    background: #fff;
    margin-bottom: 0.5rem /* 20/40 */;
    .content-box {
      background: #4cc6d8;
      border-radius: 0.3rem /* 10/40 */;
      width: 100%;
      height: 100%;
      text-align: center;
      img {
        width: 2.8rem /* 110/40 */;
        height: 2.8rem /* 110/40 */;
        border-radius: 50%;
        margin-top: 0.3rem /* 12/40 */;
        margin-bottom: 0.7rem /* 26/40 */;
      }
      .name {
        font-size: 0.7rem /* 28/40 */;
        color: #333;
        line-height: 0.7rem /* 28/40 */;
        margin-bottom: 0.4rem /* 15/40 */;
      }
      .diease {
        font-size: 0.6rem /* 24/40 */;
        color: #fff;
        line-height: 0.6rem /* 24/40 */;
        margin-bottom: 0.3rem /* 12/40 */;
      }
      .sex {
        font-size: 0.55rem /* 22/40 */;
        color: #333;
        line-height: 0.55rem /* 24/40 */;
      }
    }
  }
  .nav {
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    padding-top: 0.75rem;
    padding-bottom: 1rem;
    li {
      width: 8.5rem;
      height: 3.75rem;
      line-height: 3.75rem;
      border-radius: 0.5rem;
      float: left;
      text-align: center;
      margin-left: 0.575rem;
      margin-bottom: 0.5rem;
      img {
        width: 1.15rem;
        height: 1.15rem;
        vertical-align: middle;
      }
      span {
        color: #ffffff;
        font-size: 0.8rem;
      }
    }
    li:nth-child(1) {
      background-color: #82cad5;
    }
    li:nth-child(2) {
      background-color: #fac075;
    }
    li:nth-child(3) {
      background-color: #808ebc;
    }
    li:nth-child(4) {
      background-color: #80bef8;
    }
    li:nth-child(5) {
      background-color: #77d7c2;
    }
    li:nth-child(6) {
      background-color: #82cad5;
    }
    .last-li {
      background-color: #77d799;
      width: 17.575rem;
    }
  }
  .content {
    width: 100%;
    background-color: #fff;
    margin: 0.5rem 0;
    padding-bottom: 0.5rem;
    overflow: hidden;
    .head {
      width: 100%;
      height: 2rem;
      line-height: 2rem;
      box-sizing: border-box;
      padding: 0 0.6rem;
      color: #6fc3d5;
      font-size: 0.75rem;
      border-bottom: 1px solid #e6e6e6;
    }
    .box {
      width: 100%;
      overflow: hidden;
      .title {
        width: 100%;
        height: 2.875rem;
        line-height: 2.875rem;
        box-sizing: border-box;
        padding: 0 0.6rem;
        background-color: #7590aa;
        color: #ffffff;
        font-size: 0.7rem;
      }
      .list {
        width: 100%;
        overflow: hidden;
        li {
          width: 100%;
          height: 2.875rem;
          overflow: hidden;
          dd {
            width: 20%;
            float: left;
            box-sizing: border-box;
            border-right: #e5e5e5 1px solid;
            border-bottom: #e5e5e5 1px solid;
            height: 2.875rem;
            line-height: 2.875rem;
            text-align: center;
            color: #ee774d;
            font-size: 0.6rem;
            &:nth-of-type(2) {
              position: relative;
              img {
                width: 0.3rem /* 14/40 */;
                height: 0.5rem /* 20/40 */;
                position: absolute;
                right: 0.3rem /* 14/40 */;
                top: 1.1rem;
              }
            }
            img {
              width: 0.75rem;
              height: 0.75rem;
              vertical-align: middle;
            }
          }
          dd.name {
            line-height: 1.2;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            align-items: center;
            padding: 0 0.6rem /* 12/20 */;
          }
        }
        li:nth-child(even) {
          background-color: #f8f6f6;
        }
        .normal {
          dd {
            color: #666;
          }
        }
      }
    }
  }
  .footer-box {
    position: relative;
    bottom: 0;
    .left {
      float: left;
      width: 50%;
      height: 2.5rem /* 98/40 */;
      line-height: 2.5rem /* 98/40 */;
      background: #fff;
      text-align: center;
      font-size: 0.8rem /* 30/40 */;
      color: #009eba;
    }
    .right {
      float: right;
      width: 50%;
      height: 2.5rem /* 98/40 */;
      line-height: 2.5rem /* 98/40 */;
      background: #009eba;
      text-align: center;
      font-size: 0.8rem /* 30/40 */;
      color: #fff;
    }
  }
}
</style>
