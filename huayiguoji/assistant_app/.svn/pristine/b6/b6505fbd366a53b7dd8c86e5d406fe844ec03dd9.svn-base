<template>
  <div class="my-data">
    <headers headName='完成个人信息'></headers>
    <div class="contentScollr">
      <div class="head-top clear">
        <span class="name">头像</span>
        <img class="head-img" :src="headImg" @click="uploadImg" />
        <img class="btn-img" src="../assets/images/c13_liebiao.png" />
      </div>
      <div class="form_box">
        <div class="form">
          <ul>
            <li>
              <span class="name">姓名</span>
              <input type="text" maxlength="12" v-model="userName" class="text" placeholder="请输入姓名">
            </li>
            <li>
              <span class="name">性别</span>
              <input type="radio" v-model="sex" value="0" name="sex" class="input-radio one_sel" />
              <span class="radio-name">女</span>
              <img class="radio-img" src="../assets/images/b2_icon1_p.png" v-if="sex!=0" />
              <img class="radio-img" src="../assets/images/b2_icon1.png" v-if="sex==0" />
              <input type="radio" v-model="sex" value="1" name="sex" class="input-radio input-radio1 one_sel" />
              <span class="radio-name radio-name1">男</span>
              <img class="radio-img radio-img1" src="../assets/images/b2_icon1_p.png" v-if="sex!=1" />
              <img class="radio-img radio-img1" src="../assets/images/b2_icon1.png" v-if="sex==1" />
            </li>
            <li>
              <span class="name">生日</span>
              <input type="text" class="text time" placeholder="请选择" @click="openDatePicker" v-model="brithday" readonly>
              <img src="../assets/images/c13_liebiao.png" class="arrow">
            </li>
            <li>
              <router-link :to="{ name: 'Address', params: {} }">
                <span class="name">地址</span>
                <input type="text" class="text time" placeholder="请选择" @click="link()" v-model="city" readonly>
                <img src="../assets/images/c13_liebiao.png" class="arrow">
              </router-link>
            </li>
            <li>
              <span class="name">手机号</span>
              <input type="number" v-model="telNum" class="text" placeholder="请输入手机号码">
            </li>
            <li>
              <span class="name">华医ID</span>
              <span class="tag">{{assistantId}}</span>
            </li>
          </ul>
        </div>
      </div>
      <p class="complete-btn" @click="complete()">
        完成
      </p>
      <mt-popup v-model="popupStatus" position="bottom">
        <div class="popup-box">
          <p class="head clear">
            <span class="cancel" @click="closePopup(1)">取消</span>
            <span class="title">城市</span>
            <span class="sure" @click="sureValue(1)">确认</span>
          </p>
          <mt-picker :slots="cityArr" valueKey="title" @change="onValuesChange1"></mt-picker>
        </div>

      </mt-popup>
      <mt-datetime-picker ref="picker1" type="date" :startDate="startDate" :endDate="endDate" year-format="{value}" month-format="{value}" date-format="{value}" @confirm="handleConfirm" v-model="pickerValue">
      </mt-datetime-picker>
    </div>
  </div>
</template>

<script>
//导入模板
import headers from "../components/Header";
export default {
  data() {
    return {
      type: this.$route.params.type,
      disease: "",
      changeDisease: "",
      assistantId: "",
      avatar_id: "",
      headImg: "",
      translates: "",
      city: "",
      address: "",
      cityId: "",
      changeCity: "",
      userName: "",
      pickerValue: "",
      brithday: "",
      popupStatus: false,
      popupStatus2: false,
      startDate: new Date("1900"),
      endDate: new Date(),
      sex: 1,
      pickerStatus: false,
      telNum: "",
      cityArr: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          flex: 1,
          values: [],
          className: "slot2",
          textAlign: "center"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        }
      ]
      // avatarId: 0
    };
  },
  mounted() {
    //设置token
    this.BaseSet.getToken(this);
    if (this.type == 0) {
      this.getData();
    } else {
      var dataInfo = JSON.parse(localStorage.getItem("dataInfo"));
      this.userName = dataInfo.userName;
      this.headImg = dataInfo.avatar_img;
      this.avatar_id = dataInfo.avatar_id;
      this.sex = dataInfo.sex;
      this.brithday = dataInfo.brithday;
      this.city = JSON.parse(localStorage.getItem("addressInfo")).detail;
      this.telNum = dataInfo.telNum;
      this.assistantId = dataInfo.id;
    }
  },
  methods: {
    Back() {
      //this.$toast('111')
      this.$router.go(-1);
    },
    openPopup(num) {
      if (num == 1) {
        this.popupStatus = true;
      } else {
        this.popupStatus2 = true;
      }
    },
    openDatePicker() {
      this.$refs.picker1.open();
    },
    handleConfirm(res) {
      let d = new Date(res);
      this.brithday =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
        "-" +
        (d.getDate() > 9 ? d.getDate() : "0" + d.getDate());
    },
    closePopup(num) {
      if (num == 1) {
        this.popupStatus = false;
      } else {
        this.popupStatus2 = false;
      }
    },
    uploadImg() {
      var that = this;
      this.native.photo({ num: 1, width: 1, height: 1, size: 80 }, function(
        data
      ) {
        console.log(data);
        console.log(data.id);
        console.log(data.id.split(",")[0]);
        that.headImg = data.imgs.split(",")[0];
        that.avatar_id = data.id.split(",")[0];
      });
    },
    onValuesChange1(picker, values) {
      this.BaseSet.setCity(this, picker, values);
    },
    onValuesChange2(picker, values) {
      this.changeDisease = values;
    },
    link() {
      var dataInfo = {
        avatar_id: this.avatar_id,
        avatar_img: this.headImg,
        userName: this.userName,
        sex: this.sex,
        brithday: this.brithday,
        address: this.city,
        telNum: this.telNum,
        id: this.assistantId
      };
      localStorage.setItem("dataInfo", JSON.stringify(dataInfo));
      this.$router.push({ name: "Address" });
    },
    sureValue(num) {
      if (num == 1) {
        this.BaseSet.setCityVal(this);
      } else {
      }
    },
    getData() {
      var that = this;
      this.$ajax
        .get("/assistant/me")
        .then(function(res) {
          if (res.data.status == 200) {
            console.log(res.data.data);
            that.userName = res.data.data.realname;
            that.sex = res.data.data.sex;
            that.brithday = res.data.data.brithday;
            that.telNum = res.data.data.phone_no;
            that.avatar_id = res.data.data.avatar_id;
            that.city =
              res.data.data.translates.province_title +
              " " +
              res.data.data.translates.city_title +
              " " +
              res.data.data.translates.area_title +
              " " +
              res.data.data.area;
            that.headImg = res.data.data.translates.avatar_img;
            that.assistantId = res.data.data.id;
            var addressInfo = {
              proviceId: res.data.data.translates.province_id,
              cityeId: res.data.data.translates.city_id,
              areaId: res.data.data.translates.area_id,
              proviceTitle: res.data.data.translates.province_title,
              cityeTitle: res.data.data.translates.city_title,
              areaTitle: res.data.data.translates.area_title,
              detail: res.data.data.area
            };
            localStorage.setItem("addressInfo", JSON.stringify(addressInfo));
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
    complete() {
      if (this.userName == "") {
        this.$toast("请输入姓名");
        return false;
      }
      if (this.brithday == "") {
        this.$toast("请选择生日");
        return false;
      }
      if (this.city == "") {
        this.$toast("请选择城市");
        return false;
      }
      if (this.telNum == "") {
        this.$toast("请输入手机号码");
        return false;
      }
      if (this.telNum.length != 11) {
        this.$toast("手机号码格式不正确");
        return false;
      }
      var that = this,
        obj = JSON.parse(localStorage.getItem("addressInfo"));
      console.log(this.avatar_id);
      this.$ajax
        .put("/assistant/" + this.assistantId, {
          realname: that.userName,
          sex: that.sex,
          brithday: that.brithday,
          phone_no: that.telNum,
          area_id: that.cityId,
          avatar_id: that.avatar_id,
          area: obj.detail,
          province_id: obj.proviceId,
          city_id: obj.cityeId,
          area_id: obj.areaId
        })
        .then(function(res) {
          if (res.data.status == 200) {
            console.log(res.data.data);
            that.$router.replace({ name: "My" });
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
    }
  },
  components: { headers }
};
</script>

<style lang="scss" scoped>
.my-data {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .head-top {
    padding: 0.5rem 0.8rem;
    background: #fff;
    margin-bottom: 0.6rem;
    .name {
      line-height: 2.5rem;
      font-size: 0.7rem;
      color: #333;
      float: left;
    }
    .head-img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      float: left;
      margin-right: 0.2rem;
      margin-left: 12.7rem;
    }
    .btn-img {
      vertical-align: middle;
      float: right;
      width: 0.3rem;
      height: 0.7rem;
      margin-top: 0.9rem;
    }
  }
  .mint-popup-bottom {
    width: 100%;
  }
  .popup-box {
    width: 100%;
    .head {
      line-height: 3rem;
      padding: 0 0.8rem;
      border-bottom: 1px solid #e5e5e5;
      .cancel {
        font-size: 0.8rem;
        color: #999;
        float: left;
      }
      .sure {
        font-size: 0.8rem;
        color: #999;
        float: right;
      }
      .title {
        font-size: 0.9rem;
        color: #4cc6d8;
        float: left;
        width: 13.8rem;
        text-align: center;
      }
    }
    .popup-list {
      padding-top: 5.2rem;
      li {
        line-height: 1.6rem;
        text-align: center;
        font-size: 0.9rem;
        color: #333;
        border-bottom: 1px solid #e5e5e5;
        &:first-child {
          border-top: 1px solid #e5e5e5;
        }
      }
    }
  }
  .form_box {
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    .form {
      width: 100%;
      overflow: hidden;
      li {
        width: 100%;
        box-sizing: border-box;
        padding: 0 0.75rem;
        height: 2.25rem;
        line-height: 2.25rem;
        overflow: hidden;
        position: relative;
        border-bottom: #e5e5ee 1px solid;
        &:last-child {
          border-bottom: none;
        }
        .input-radio,
        .radio-img {
          width: 1.3rem;
          height: 1.3rem;
          position: absolute;
          right: 1.8rem;
          top: 0.4rem;
        }
        .input-radio {
          z-index: 10;
        }
        .input-radio1,
        .radio-img1 {
          right: 6.8rem;
        }
        .radio-name {
          float: right;
          font-size: 0.7rem;
          color: #666;
        }
        .radio-name1 {
          margin-right: 4.2rem;
        }
        .name {
          font-size: 0.7rem;
          color: #333333;
          float: left;
        }
        .tag {
          float: right;
          font-size: 0.7rem;
          color: #333333;
        }
        .text {
          float: right;
          font-size: 0.7rem;
          color: #333333;
          //margin-top: .65rem;
          line-height: 2.25rem;
          text-align: right;
          width: 12.5rem;
        }
        .time {
          margin-right: 0.5rem;
        }
        .text::-webkit-input-placeholder {
          color: #999999;
        }
        .arrow {
          width: 0.3rem;
          height: 0.6rem;
          position: absolute;
          right: 0.75rem;
          top: 50%;
          margin-top: -0.3rem;
        }
      }
    }
    .pic_box {
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0 0.75rem;
      padding-bottom: 1.25rem;
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
  .complete-btn {
    width: 17.2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background: #4cc6d8;
    border-radius: 0.3rem;
    color: #fff;
    font-size: 0.8rem;
    margin: 0 auto;
    margin-top: 1.5rem;
  }
}
</style>
