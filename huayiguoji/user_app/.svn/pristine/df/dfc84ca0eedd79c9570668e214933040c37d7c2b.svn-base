<template>
  <div class="up_report">
    <headers headName='体检报告上传'></headers>
    <div class="contentScollr">
      <div class="form_box">
        <div class="form">
          <ul>
            <li>
              <span class="name">类型</span>
              <span class="tag">体检报告</span>
            </li>
            <li>
              <span class="name">机构地址</span>
              <input type="text" class="text time" placeholder="请选择" @click="openPopup(1)" v-model="city" readonly>
              <img src="../assets/images/c13_liebiao.png" class="arrow">
            </li>
            <li>
              <span class="name">检查机构</span>
              <input type="text" class="text time" v-model="hospitalVal" placeholder="请选择检查机构" @click="openPopup(2)" readonly>
              <img src="../assets/images/c13_liebiao.png" class="arrow">
            </li>
            <li>
              <span class="name">检查时间</span>
              <input type="text" class="text time" placeholder="请选择检查时间" @click="openPicker" v-model="dateVal" readonly>
              <img src="../assets/images/c13_liebiao.png" class="arrow">
            </li>
          </ul>
        </div>
        <!--城市-->
        <mt-popup v-model="popupStatus" position="bottom">
          <div class="popup-box">
            <p class="head clear">
              <span class="cancel" @click="closePopup(1)">取消</span>
              <span class="title">机构地址</span>
              <span class="sure" @click="sureValue(1)">确认</span>
            </p>
            <mt-picker :slots="cityArr" valueKey="title" @change="onValuesChange1"></mt-picker>
          </div>
        </mt-popup>
        <!--医院-->
        <mt-popup v-model="popupStatus2" position="bottom">
          <div class="popup-box">
            <p class="head clear">
              <span class="cancel" @click="closePopup(2)">取消</span>
              <span class="title">检查机构</span>
              <span class="sure" @click="sureValue(2)">确认</span>
            </p>
            <mt-picker :slots="hospitalArr" valueKey="title" @change="onValuesChange2"></mt-picker>
          </div>
        </mt-popup>
        <div class="pic_box">
          <div class="title">添加图片</div>
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
      </div>
      <div class="up_btn" @click="upReport()">上传</div>
      <!--日期-->
      <mt-datetime-picker ref="picker" type="date" year-format="{value}" month-format="{value}" date-format="{value}" @confirm="handleConfirm">
      </mt-datetime-picker>
    </div>
  </div>
</template>
<script>
//导入模板
import headers from "../components/Header.vue";
import address from "../assets/json/address3.json";
export default {
  data() {
    return {
      articles: "",
      pickerValue: "",
      dateVal: "",
      hospitalChangeVal: "",
      hospitalVal: "",
      city: "",
      cityId: "",
      changeCity: "",
      popupStatus: false,
      popupStatus2: false,
      popupStatus3: false,
      imgs: [],
      imgIds: [],
      hospitalId: "",
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
      ],
      hospitalArr: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  mounted() {
    //设置token
    this.BaseSet.getToken(this);
    this.BaseSet.getAddress(this)
  },
  methods: {
    removePic(index) {
      this.imgs.splice(index, 1);
      this.imgIds.splice(index, 1);
    },
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm(res) {
      this.pickerValue = res;
      let d = new Date(res);
      this.dateVal =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
        "-" +
        (d.getDate() > 9 ? d.getDate() : "0" + d.getDate());
    },
    openPopup(num) {
      if (num == 1) {
        this.popupStatus = true;
      } else {
        if (this.city == "") {
          this.$toast("请先选择机构地址");
          this.popupStatus = true;
        } else if (this.hospitalArr[0].values.length > 0) {
          this.popupStatus2 = true;
        }
      }
    },
    closePopup(num) {
      if (num == 1) {
        this.popupStatus = false;
      } else {
        this.popupStatus2 = false;
      }
    },
    onValuesChange1(picker, values) {
      var that = this;
      if (values[0] != undefined && values[1] != undefined) {
        //这个判断类似于v-if的效果（可以不加，但是vue会报错）
        let index = that.cityArr[0].values.indexOf(values[0]);
        picker.setSlotValues(1, that.cityArr[0].values[index].city); //Object.keys()会返回一个数组，当前省的数组
        let cityIndex = that.cityArr[0].values[index].city.indexOf(values[1]);
        if (cityIndex != -1) {
          picker.setSlotValues(
            2,
            that.cityArr[0].values[index].city[cityIndex].area
          ); //区/县数据就是一个数组
        }
        if (values[2] == undefined) {
          values[2] = that.cityArr[0].values[index].city[cityIndex].area[0];
        }
        this.changeCity = values;
      }
    },
    onValuesChange2(picker, values) {
      this.hospitalChangeVal = values;
    },
    sureValue(num) {
      if (num == 1) {
        this.popupStatus = false;
        var that = this;
        if (
          this.changeCity[1] != undefined &&
          this.changeCity[2] != undefined
        ) {
          this.city =
            this.changeCity[0].title +
            " " +
            this.changeCity[1].title +
            " " +
            this.changeCity[2].title;
          console.log(this.changeCity[2].id);
          this.cityId = this.changeCity[2].id;
          this.getHospital("/hospital?e_s[area_id]=" + that.cityId);
        }
      } else {
        this.popupStatus2 = false;
        if (this.hospitalChangeVal) {
          this.hospitalVal = this.hospitalChangeVal[0].title;
          this.hospitalId = this.hospitalChangeVal[0].id;
        }
      }
    },
    getHospital(url) {
      var that = this;
      that.$ajax
        .get(url)
        .then(function(res) {
          if (res.data.status == 200) {
            if (res.data.data.length == 0) {
              that.$toast("该地区暂未匹配到医院");
              that.hospitalArr[0].values = [];
            } else {
              that.hospitalArr[0].values = res.data.data;
            }
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {
          that.$toast(err);
          that.BaseSet.linkLogin(that);
        });
    },
    upReport() {
      let that = this;
      if (this.hospitalVal == "") {
        this.$toast("请选择检查机构");
        return false;
      }
      if (this.dateVal == "") {
        this.$toast("请选择检查时间");
        return false;
      }
      if (this.city == "") {
        this.$toast("请选择机构地址");
        return false;
      }
      that.BaseSet.getToken(that);
      var params = {
        hospital_id: that.hospitalId,
        _me: "user-api",
        report_id: 2,
        checked_at: that.dateVal,
        title: "体检报告",
        department_id: 0
      };
      params["image_ids"] = that.imgIds;
      //上传体检报告
      this.$ajax
        .post("/archive", params)
        .then(function(res) {
          if (res.data.status == 200) {
            that.$toast("添加成功");
            setTimeout(function() {
              that.$router.replace({ name: "CheckReport" });
            }, 1500);
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin(that);
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {
          that.$toast(err);
          //that.BaseSet.linkLogin(that);
        });
    },
    addImg() {
      var that = this;
      this.native.photo({ num: 100, width: 1, height: 1, size: 80 }, function(
        data
      ) {
        that.imgs = data.imgs.split(",");
        that.imgIds = data.id.split(",");
      });
    }
  },
  components: { headers }
  //请求数据接口
};
</script>

<style lang="scss" scoped>
.up_report {
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
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
          margin-top: 0.65rem;
          text-align: right;
          width: 12.5rem;
        }
        .time {
          margin-right: 0.875rem;
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
  .up_btn {
    width: 17.2rem;
    height: 2.05rem;
    text-align: center;
    margin: 1.5rem auto;
    background-color: #4dc6d8;
    color: #ffffff;
    line-height: 2.05rem;
    font-size: 0.8rem;
    border-radius: 0.25rem;
  }
}
</style>
