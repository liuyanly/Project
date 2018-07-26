<template>
  <div class="family_member">
    <headers headName="家庭成员"></headers>
    <div class="contentScollr">
      <div class="list">
        <ul>
          <li v-for="data in dataList">
            <mt-cell-swipe :right="[{content: '删除', style: { background: 'red', color: '#fff' },handler(){delFamily(data.id)}}]">
              <slot>
                <div class="pic"><img :src="data.translates.avatar_img?data.translates.avatar_img:defaultImg" alt=""></div>
                <div class="txt">
                  <div class="title">
                    <span class="name">{{data.realname}}</span>
                    <span class="tel" v-if="data.phone_no !== null">({{data.phone_no}})</span>
                  </div>
                  <div class="tag">
                    <span class="sex">{{data.translates.sex}}</span>
                    <span class="age">{{data.translates.age=="暂无"?"暂无":data.translates.age+"岁"}}</span>
                  </div>
                </div>
              </slot>
            </mt-cell-swipe>
            <!-- <div class="pic"><img :src="data.translates.avatar_img" alt=""></div>
            <div class="txt">
              <div class="title">
                <span class="name">{{data.realname}}</span>
                <span class="tel" v-if="data.phone_no !== null">({{data.phone_no}})</span>
              </div>
              <div class="tag">
                <span class="sex">{{}}</span>
                <span class="age">{{data.translates.age=="暂无"?"暂无":data.translates.age+"岁"}}</span>
              </div>
            </div> -->
          </li>
          <li class="add-member" @click="link">
            <img class="left" src="../assets/images/d1_tianjia.png" />
            <div class="left">添加成员</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
//导入模板
import headers from "../components/Header.vue";
import avatarImg from "../assets/images/avatar.png";
export default {
  data() {
    return {
      dataList: [],
      id: 0,
      defaultImg: avatarImg
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getList();
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    link() {
      var that = this;
      this.$router.push({ name: "AddMember", params: { id: that.id } });
    },
    delFamily(id) {
      var that = this;
      if (JSON.parse(localStorage.userInfo).id != id) {
        that.$ajax.delete("/user/delfamilies/" + id).then(function(res) {
          if (res.data.status == 200) {
            that.$ajax.get("/user/me").then(function(res1) {
              if (res1.data.status == 200) {
                that.$toast("删除成员成功");
                var tempUser = JSON.parse(localStorage.userInfo);
                tempUser.vips = res1.data.data.vips;
                localStorage.userInfo = JSON.stringify(tempUser);
              }
            });
            that.getList();
          }
        });
      } else {
        that.$toast("请不要删除自己");
      }
    },
    getList() {
      var that = this;
      that.$ajax
        .get("/user/myfamilies")
        .then(function(res) {
          console.log(res);
          if (res.data.status == 200) {
            if (!(res.data.data instanceof Array)) {
              that.dataList = res.data.data.member;
              that.id = res.data.data.id;
            } else {
              var userInfo = JSON.parse(localStorage.userInfo);
              that.id = res.data.data.id;
              that.$ajax
                .post("/user/createfamily", {
                  title: userInfo.id + "的家",
                  province_id: userInfo.province_id,
                  city_id: userInfo.city_id,
                  area_id: userInfo.area_id
                })
                .then(function(res1) {
                  if (res1.data.status == 200) {
                    that.$ajax.get("/user/myfamilies").then(function(res2) {
                      that.dataList = res2.data.data.member;
                    });
                  }
                });
            }
          } else if (res.data.status == 400) {
            that.BaseSet.linkLogin(that);
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
.family_member {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .list {
    width: 100%;
    overflow: hidden;
    .mint-cell {
      background-color: transparent;
      height: 100%;
    }
    li {
      width: 100%;
      height: 3.75rem;
      overflow: hidden;
      box-sizing: border-box;
      border-bottom: #e5e5e5 1px solid;
      font-size: 0;
      .pic {
        width: 2.3rem;
        height: 2.3rem;
        overflow: hidden;
        border-radius: 100%;
        margin-top: 0.675rem;
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.55rem;
        img {
          width: 2.3rem;
          height: 2.3rem;
          object-fit: cover;
        }
      }
      .txt {
        display: inline-block;
        vertical-align: middle;
        width: 14rem;
        margin-top: 0.675rem;
      }
      .title {
        .name {
          color: #333333;
          font-size: 0.7rem;
        }
        .tel {
          color: #6fc3d5;
          font-size: 0.6rem;
          margin-left: 0.35rem;
        }
      }
      .tag {
        .sex {
          color: #333333;
          font-size: 0.7rem;
        }
        .age {
          color: #6fc3d5;
          font-size: 0.6rem;
          margin-left: 0.35rem;
        }
      }
    }
    .add-member {
      padding: 0 0.75rem;
      background-color: white;
      img {
        float: left;
        height: 0.8rem;
        margin-top: 1.45rem;
        margin-right: 0.5rem;
      }
      div {
        float: left;
        text-align: left;
        font-size: 0.75rem;
        line-height: 3.75rem;
        color: #444;
      }
    }
  }
}
</style>
