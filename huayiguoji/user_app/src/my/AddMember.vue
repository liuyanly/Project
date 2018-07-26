<template>
    <div class="add_member">
        <headers headName='添加成员'></headers>
        <div class="contentScollr">
            <div class="form">
                <div class="input">
                    <input type="tel" placeholder="请输入手机号" v-model="tel" class="tel" maxlength="11">
                </div>
                <div class="btn" @click="SubmitData">添加</div>
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
      articles: "",
      tel: "",
      id: this.$route.params.id
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
  },
  methods: {
    SubmitData() {
      var phoneNum = /^1\d{10}$/;
      if (this.tel == "") {
        this.$toast("手机号不能为空");
      } else if (!phoneNum.test(this.tel)) {
        this.$toast("请输入正确的手机号");
      }else{
        var that = this;
        that.$ajax
          .post("/user/addfamilies", { family_id: that.id, username: that.tel })
          .then(function(res) {
            if (res.data.status == 200) {
              if ((res.data.data.family_id == that.id)) {
                that.$ajax.get("/user/me").then(function(res1) {
                  if (res1.data.status == 200) {
                    that.$toast("添加成员成功");
                    var tempUser=JSON.parse(localStorage.userInfo);
                    tempUser.vips=res1.data.data.vips
                    localStorage.userInfo = JSON.stringify(tempUser);
                    that.$router.go(-1)
                  }
                });
              } else {
                // that.$toast(res.data.data.message);
                that.$toast(res.data.data);
              }
            }
          })
          .catch(function(err) {
            //that.linkLogin(that)
          });
      }
    }
  },
  components: { headers }
  //请求数据接口
};
</script>

<style lang="scss" scoped>
.add_member {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .input {
    width: 100%;
    height: 2.25rem;
    margin-top: 0.5rem;
    .tel {
      width: 100%;
      height: 2.25rem;
      line-height: 2.25rem;
      background-color: #fff;
      box-sizing: border-box;
      padding: 0 0.75rem;
      color: #333333;
      font-size: 0.7rem;
    }
    .tel::-webikt-input-placeholder {
      color: #999999;
    }
  }
  .btn {
    width: 17.2rem;
    height: 2.05rem;
    line-height: 2.05rem;
    margin: 0 auto;
    margin-top: 1.5rem;
    background-color: #4cc6d8;
    border-radius: 0.25rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.8rem;
  }
}
</style>
