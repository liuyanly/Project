<template>
    <div class="member_info">
        <headers headName=''></headers>
        <div class="contentScollr">
            <div class="info_head">
                <div class="pic"><img :src="headImg" alt=""></div>
                <div class="name">{{vipInfo.realname}}</div>
                <div class="member_time">
                    <ul>
                        <li>
                            <span class="tag">账号注册时间：</span>
                            <span class="time" v-text="created_at"></span>
                        </li>
                        <li>
                            <span class="tag">成为会员时间：</span>
                            <span class="time" v-text="started_at"></span>
                        </li>
                        <li>
                            <span class="tag">会员有效期&emsp;：</span>
                            <span class="time" v-text="ended_at"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="member_box">
                <router-link :to="{ name: 'NowPay', params: {money:vipInfo.money,title:'会员续费',id:0} }">
                    <div class="btn">会员续费</div>
                </router-link>
                <div class="box">
                    <ul>
                        <router-link :to="{name: 'MyAssistant'}">
                            <li>
                                <div class="icon"><img src="../assets/images/g3_icon1.png" alt=""></div>
                                <div class="name">我的健康助理</div>
                            </li>
                        </router-link>
                        <li>
                            <router-link :to="{ name: 'MySignDoctor'}">
                                <div class="icon"><img src="../assets/images/g3_icon2.png" alt=""></div>
                                <div class="name">我的签约医生</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="member_foot">
                <div class="title">会员服务</div>
                <div class="content">
                    <ul>
                        <li v-for="(data,index) in serviceList">
                            <span class="name">{{index+1}}. {{data.title}}</span>
                            <span class="time">{{data.pivot.times}}次</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//导入模板
import headers from "../components/Header.vue";
export default {
  data() {
    return {
      vipInfo: "",
      created_at: "",
      started_at: "",
      ended_at: "",
      vipInfo: "",
      headImg: "/src/assets/images/avatar.png",
      serviceList: [],
      assistantId: "",
      doctorId: ""
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getVipInfo();
  },
  methods: {
    //获取会员信息
    getVipInfo() {
      var that = this;
      that.$ajax
        .get("/user/myvip")
        .then(function(res) {
          if (res.data.status == 200) {
            that.created_at = res.data.data.created_at.substring(0, 10);
            that.started_at = res.data.data.vip.pivot.started_at.substring(
              0,
              10
            );
            that.ended_at = res.data.data.vip.pivot.ended_at.substring(0, 10);
            that.headImg = res.data.data.translates.avatar_img;
            that.serviceList = res.data.data.vip.permissions;
            that.vipInfo = res.data.data.vip;
            that.assistantId = res.data.data.myassistant;
            that.doctorId = res.data.data.mydoctor[0];
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin(that);
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {
          that.BaseSet.linkLogin(that);
        });
    }
  },
  components: { headers }
  //请求数据接口
};
</script>

<style lang="scss" scoped>
.member_info {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .info_head {
    width: 100%;
    overflow: hidden;
    height: 12.25rem;
    background: url(../assets/images/g3_bg1.png) no-repeat;
    background-size: 100% 100%;
    .pic {
      width: 2.75rem;
      height: 2.75rem;
      margin: 0 auto;
      overflow: hidden;
      border-radius: 100%;
      margin-top: 2.6rem;
      img {
        width: 2.75rem;
        height: 2.75rem;
        object-fit: cover;
      }
    }
    .name {
      width: 100%;
      text-align: center;
      font-size: 0.7rem;
      color: #ffffff;
      margin-top: 0.25rem;
    }
    .member_time {
      width: 100%;
      text-align: center;
      margin-top: 1.675rem;
      li {
        width: 100%;
        color: #ffffff;
        font-size: 0.65rem;
      }
    }
  }
  .member_box {
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    .btn {
      width: 12.8rem;
      height: 2.05rem;
      border-radius: 0.25rem;
      margin: 1.9rem auto;
      background-color: #4dc6d8;
      text-align: center;
      line-height: 2.05rem;
      color: #ffffff;
      font-size: 0.8rem;
    }
    .box {
      width: 100%;
      border-top: #e5e5e5 1px solid;
      overflow: hidden;
      li {
        width: 50%;
        box-sizing: border-box;
        float: left;
        text-align: center;
        .icon {
          width: 1.3rem;
          height: 1.3rem;
          margin: 0 auto;
          margin-top: 1.45rem;
          img {
            width: 1.3rem;
            height: 1.3rem;
          }
        }
        .name {
          color: #666;
          font-size: 0.7rem;
          margin-top: 0.4rem;
          margin-bottom: 1.15rem;
        }
      }
      li:first-child {
        border-right: #e5e5e5 1px solid;
      }
    }
  }
  .member_foot {
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    margin-top: 0.5rem;
    padding-bottom: 1rem;
    .title {
      width: 100%;
      height: 2rem;
      box-sizing: border-box;
      padding: 0 0.75rem;
      line-height: 2rem;
      border-bottom: #e5e5e5 1px solid;
      color: #4dc6d8;
      font-size: 0.7rem;
    }
    .content {
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0 0.8rem;
      margin-top: 1.15rem;
      li {
        width: 100%;
        margin-bottom: 0.45rem;
        color: #333;
        font-size: 0.65rem;
        overflow: hidden;
        .time {
          float: right;
        }
      }
    }
  }
}
</style>
