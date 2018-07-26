<template>
    <div class="my_assistant">
        <headers headName='我的签约医生'></headers>
        <div class="contentScollr">
            <div class="box">
                <div class="pic"><img :src="headImg" alt=""></div>
                <div class="name">{{doctorInfo.realname}}</div>
                <div class="tag">{{department}}</div>
                <div class="icon">
                    <div class="phone"><img src="../assets/images/g5_icon1_p.png" alt=""></div>
                    <div class="message"><img src="../assets/images/g5_icon2_p.png" alt=""></div>
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
      doctorInfo: "",
      headImg: "",
      department: "",
      telNum: ""
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getData();
  },
  methods: {
    getData() {
      var that = this;
      that.$ajax
        .get("/user/mydoctor")
        .then(function(res) {
          console.log(res.data);
          if (res.data.status == 200) {
            that.headImg = res.data.data.user.translates.avatar_img;
            that.department = res.data.data.user.translates.department_title;
            that.doctorInfo = res.data.data.user;
            that.telNum = res.data.data.user.phone_no;
          }
        })
        .catch(function(err) {});
    }
  },
  components: { headers }
  //请求数据接口
};
</script>

<style lang="scss" scoped>
.my_assistant {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .box {
    width: 17.25rem;
    height: 25rem;
    background-color: #fff;
    margin: 0.75rem auto;
    border-radius: 0.25rem;
    overflow: hidden;
    .pic {
      width: 2.85rem;
      height: 2.85rem;
      overflow: hidden;
      margin: 0 auto;
      margin-top: 4.5rem;
      border-radius: 100%;
      img {
        width: 2.85rem;
        height: 2.85rem;
        object-fit: cover;
      }
    }
    .name {
      width: 100%;
      text-align: center;
      margin-top: 0.375rem;
      color: #333;
      font-size: 0.7rem;
    }
    .tag {
      width: 100%;
      text-align: center;
      margin-top: 0.3rem;
      color: #999;
      font-size: 0.6rem;
    }
    .icon {
      width: 100%;
      text-align: center;
      margin-top: 4.5rem;
      font-size: 0;
      .phone,
      .message {
        width: 2.25rem;
        height: 2.25rem;
        display: inline-block;
        margin: 0 1.65rem;
        img {
          width: 2.25rem;
          height: 2.25rem;
        }
      }
    }
  }
}
</style>
