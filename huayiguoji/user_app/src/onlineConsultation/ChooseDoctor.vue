<template>
  <div class="choose-doctor" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <headers headName="选择医生"></headers>
    <div class="contentScollr">
      <div class="search-box">
        <input class="search-input" type="text" maxlength="20" v-model="searchChangeVal" placeholder="搜索医生" />
        <img class="search-img" src="../assets/images/c12_sousuo.png" @click="searchBtn()" />
      </div>
      <div class="filter-box clear">
        <p class="city" @click="openPopup(1)" :title="cityVal">
          {{cityVal}}<img src="../assets/images/c12_xiala.png" v-if="currentXiaLa!=1" />
          <img src="../assets/images/c12_xiala_p.png" v-if="currentXiaLa==1" />
        </p>
        <p class="hospital" @click="openPopup(2)" :title="hospitalVal">
          <span>{{hospitalVal}}</span><img src="../assets/images/c12_xiala.png" v-if="currentXiaLa!=2" />
          <img src="../assets/images/c12_xiala_p.png" v-if="currentXiaLa==2" />
        </p>
        <p class="department" @click="openPopup(3)" :title="departmentVal">
          {{departmentVal}}<img src="../assets/images/c12_xiala.png" v-if="currentXiaLa!=3" />
          <img src="../assets/images/c12_xiala_p.png" v-if="currentXiaLa==3" />
        </p>
      </div>
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottomPullText='上拉刷新' bottomLoadingText='加载中......'>
        <ul class="doctor-list">
          <li class="clear" @click="viewDetail(data.id)" v-for="data in dataList">
            <img :src=data.translates.avatar_img class="left" />
            <div class="doctor-info">
              <p class="name">
                {{data.realname}}
                <span>{{data.jobtitle!=""?"("+data.jobtitle+")":""}}</span>
              </p>
              <p class="department">
                {{data.translates.department_title}}
              </p>
              <p class="hospital">
                {{data.translates.hospital_title}}
              </p>
            </div>
          </li>
          <!-- <li class="clear" @click="viewDetail(1)">
              <img src="../assets/images/a_image1.png" class="left" />
              <div class="doctor-info">
                  <p class="name">
                      李晓峰<span>(医生)</span>
                  </p>
                  <p class="department">
                      消化内科
                  </p>
                  <p class="hospital">
                      北京协和医院
                  </p>
              </div>
          </li> -->
        </ul>
      </mt-loadmore>
      <mt-popup v-model="popupStatus" position="bottom" :closeOnClickModal='closeType'>
        <div class="popup-box">
          <p class="head clear">
            <span class="cancel" @click="closePopup()">取消</span>
            <span class="title" v-if="currentXiaLa==1">选择城市</span>
            <span class="sure" @click="sureValue(1)">确认</span>
          </p>
          <mt-picker :slots="cityArr" valueKey="title" @change="onValuesChange"></mt-picker>
        </div>
      </mt-popup>
      <mt-popup v-model="popupStatus1" position="bottom" :closeOnClickModal='closeType'>
        <div class="popup-box">
          <p class="head clear">
            <span class="cancel" @click="closePopup()">取消</span>
            <span class="title" v-if="currentXiaLa==2">选择医院</span>
            <span class="sure" @click="sureValue(2)">确认</span>
          </p>
          <mt-picker :slots="hospitalArr" valueKey="title" @change="onValuesChange1"></mt-picker>
        </div>
      </mt-popup>
      <mt-popup v-model="popupStatus2" position="bottom" :closeOnClickModal='closeType'>
        <div class="popup-box">
          <p class="head clear">
            <span class="cancel" @click="closePopup()">取消</span>
            <span class="title">选择科室</span>
            <span class="sure" @click="sureValue(3)">确认</span>
          </p>
          <mt-picker :slots="departmentArr" valueKey="title" @change="onValuesChange2"></mt-picker>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
import headers from "../components/Header";

export default {
  data() {
    return {
      searchVal: "",
      searchChangeVal: "",
      cityVal: "全部城市",
      cityId: "",
      changeCity: "",
      hospitalVal: "全部医院",
      hospitalId: "",
      hospitalChangeVal: "",
      departmentVal: "全部科室",
      departmentId: 0,
      departmentChangeVal: "",
      departmentData: "",
      popupStatus: false,
      popupStatus1: false,
      popupStatus2: false,
      currentXiaLa: 0,
      closeType: false,
      dataList: [],
      currentPage: 1,
      per_page: 20,
      total_page: 0,
      allLoaded: false, //分页
      topStatus: false, //分页
      url: "",
      scrollMode: "auto", //分页滚动
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
        //医院列表
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      departmentArr: [
        {
          //科室列表
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          textAlign: "center"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        }
      ]
    };
  },
  watch: {
    searchChangeVal: function(val) {
      this.searchChangeVal = val;
      this.searchBtn();
    }
  },
  mounted() {
    
    this.getDepartment();
    this.BaseSet.getAddress(this);
    this.getList();
  },
  methods: {
    loadBottom() {
      if (this.currentPage == this.total_page) {
        this.allLoaded = true; // 若数据已全部获取完毕
      }
      if (this.currentPage < this.total_page) {
        let oldPage = this.currentPage;
        this.currentPage = this.currentPage + 1;
        this.url = this.url.replace("&page=" + oldPage, "");
        this.url = this.url + "&page=" + this.currentPage;
        this.$refs.loadmore.onBottomLoaded();
      }
    },
    getDepartment() {
      var that = this;
      //获取科室
      this.$ajax
        .get("/category?e_s[module]=department")
        .then(function(res) {
          if (res.data.status == 200) {
            for (var i = 0; i < res.data.data.length; i++) {
              that.departmentArr[0].values.push({
                id: 0,
                cover_id: 0,
                pid: 0,
                title: "全部科室",
                module: "department",
                translates: {
                  sub_cates: [{ id: 0, cover_id: 0, title: "全部科室" }]
                }
              });
              if (res.data.data[i].pid == 0) {
                that.departmentArr[0].values.push(res.data.data[i]);
              }
            }
            that.departmentArr[2].values =
              that.departmentArr[0].values[0].translates.sub_cates;
          }
        })
        .catch(function(err) {});
    },
    searchBtn() {
      //若搜索框的值不为空
      // var val = this.searchVal
      // if (this.searchChangeVal != '') {
      //
      //   this.searchVal = encodeURI(this.searchChangeVal, "UTF-8");
      //   if (this.url.indexOf('?') != -1) {
      //     if (this.url.indexOf('&e_s[nickname]=' + val) == -1) {
      //       this.url = this.url + '&e_s[nickname]=' + this.searchVal
      //     } else {
      //       this.url = this.url.replace('&e_s[nickname]=' + val, '')
      //       this.url = this.url + '&e_s[nickname]=' + this.searchVal
      //     }
      //   } else {
      //     this.url = this.url + '?e_s[nickname]=' + this.searchVal
      //   }
      //this.url =
        //this.url + "&m_s[nickname]=" + encodeURI(this.searchChangeVal, "UTF-8");
      // this.dataList = [];
      this.getList();
      // }
    },
    viewDetail(id) {
      this.$router.push({ name: "DoctorDetail", params: { id: id } });
    },
    onValuesChange(picker, values) {
      
      this.hospitalVal = "全部医院";
      this.hospitalId = "";
      this.BaseSet.setCity(this, picker, values);
    },
    onValuesChange1(picker, values) {
      this.hospitalChangeVal = values;
    },
    onValuesChange2(picker, values) {
      var that = this;
      var index = that.departmentArr[0].values.indexOf(values[0]);
      //console.log(that.departmentArr[0].values[index].translates.sub_cates)
      picker.setSlotValues(
        1,
        that.departmentArr[0].values[index].translates.sub_cates
      ); //Object.keys()会返回一个数组，当前省的数组
      this.departmentChangeVal = values;
    },
    openPopup(id) {
      if (id == 1) {
        this.popupStatus = true;
        this.currentXiaLa = id;
      } else if (id == 2) {
        if (this.cityVal == "全部城市") {
          this.$toast("请先选择城市");
          this.popupStatus = true;
          this.currentXiaLa = 1;
        } else if (this.hospitalArr[0].values.length > 0) {
          this.popupStatus1 = true;
          this.currentXiaLa = id;
        }
      } else {
        this.popupStatus2 = true;
      }
    },
    closePopup() {
      this.popupStatus = false;
      this.popupStatus1 = false;
      this.popupStatus2 = false;
      this.currentXiaLa = 0;
    },
    getList() {
      var url="";
      var that = this;
      this.dataList = [];
      url =
      "/doctor?per_page=" + this.per_page + "&page=" + this.currentPage;
      if(that.cityId){
        url+="&e_s[area_id]=" + that.cityId
      }
      if(that.hospitalId){
        url+="&e_s[hospital_id]=" + that.hospitalId;
      }
      if(that.departmentId){
        url+="&e_s[department]=" + that.departmentId;
      }
      if(that.searchChangeVal){
        url+="&m_s[realname]=" + that.searchChangeVal
      }
      that.$ajax
        .get(url)
        // let searchKey = encodeURI(this.searchChangeVal, "UTF-8"); //转码传输
        // that.$ajax.get(`/doctor?m_s[nickname]=${searchKey}`)
        .then(function(res) {
          console.log("获取医生：", res);
          if (res.data.status == 200) {
            if (that.currentPage == 1) {
              that.dataList = [];
            }
            for (var i = 0; i < res.data.data.doctor.length; i++) {
              that.dataList.push(res.data.data.doctor[i]);
            }
            console.log(that.dataList);
            that.$nextTick(function() {
              // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
              // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
              // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
              that.scrollMode = "touch";
            });
            that.total_page = res.data.data.paginate.total_page;
            if (that.currentPage == that.total_page) {
              that.allLoaded = true; // 若数据已全部获取完毕
            }
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
      that.topStatus = false;
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
        });
    },
    sureValue(id) {
      this.popupStatus = false;
      this.popupStatus1 = false;
      this.popupStatus2 = false;
      this.currentXiaLa = 0;
      var oldPage = this.currentPage;
      if (id == 1) {
        var that = this;
        if (
          this.changeCity[1] != undefined &&
          this.changeCity[2] != undefined
        ) {
          //获取旧id
          var id = this.cityId;
          this.cityVal = this.changeCity[2].title;
          this.cityId = this.changeCity[2].id;
          // //判断url中是否有该参数
          // if (this.url.indexOf("&e_s[area_id]=" + id) == -1) {
          //   this.dataList = [];
          this.currentPage = 1;
          //   this.url = this.url + "&e_s[area_id]=" + this.cityId;
          // } else {
          //   this.url = this.url.replace("&e_s[area_id]=" + id, "");
          //   this.url = this.url + "&e_s[area_id]=" + this.cityId;
          // }
          // this.url = this.url.replace("&page=" + oldPage, "");
          // this.url = this.url + "&page=" + this.currentPage;
          // this.getList(this.url);
          this.getHospital("/hospital?e_s[area_id]=" + that.cityId);
           this.getList();
        }
      } else if (id == 2) {
        if (this.hospitalChangeVal) {
          //获取旧id
          var id = this.hospitalId;
          this.hospitalVal = this.hospitalChangeVal[0].title;
          this.hospitalId = this.hospitalChangeVal[0].id;

          // //判断url中是否有该参数
          // if (this.url.indexOf("&e_s[hospital_id]=" + id) == -1) {
          //   this.dataList = [];
          this.currentPage = 1;
          //   this.url = this.url + "&e_s[hospital_id]=" + this.hospitalId;
          // } else {
          //   this.url = this.url.replace("&e_s[hospital_id]=" + id, "");
          //   this.url = this.url + "&e_s[hospital_id]=" + this.hospitalId;
          // }
          // this.url = this.url.replace("&page=" + oldPage, "");
          // this.url = this.url + "&page=" + this.currentPage;
          // this.getList(this.url);
          this.getList();
        }
      } else {
        var id = this.departmentId;
        this.departmentVal = this.departmentChangeVal[1].title;
        this.departmentId = this.departmentChangeVal[1].id;
        //判断url中是否有该参数
        // if (this.url.indexOf("&e_s[department]=" + id) == -1) {
        //   this.dataList = [];
        this.currentPage = 1;
        //   this.url = this.url + "&e_s[department]=" + this.departmentId;
        // } else {
        //   this.url = this.url.replace("&e_s[department]=" + id, "");
        //   this.url = this.url + "&e_s[department]=" + this.departmentId;
        // }
        // this.url = this.url.replace("&page=" + oldPage, "");
        // this.url = this.url + "&page=" + this.currentPage;

        // this.getList(this.url);
        this.getList();
        console.log("url:", this.url);
      }
      //this.bankValue = this.bankChangeValue;
    }
  },
  components: {
    headers
  }
};
</script>
<style lang="scss" scoped>
.choose-doctor {
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .search-box {
    padding: 0.5rem /* 19/40 */ 0.8rem /* 30/40 */;
    background: #fff;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    input {
      padding: 0 1.1rem /* 44/40 */;
      width: 15.1rem /* 690/40 */;
      height: 1.9rem /* 76/40 */;
      line-height: 1.9rem /* 76/40 */;
      border-radius: 0.9rem /* 38/40 */;
      background: #eee;
      font-size: 0.7rem /* 28/40 */;
      color: #333;
    }
    > img {
      position: absolute;
      right: 1.8rem /* 72/40 */;
      top: 1rem /* 40/40 */;
      width: 0.9rem /* 36/40 */;
      height: 0.9rem /* 36/40 */;
      z-index: 1000;
    }
  }
  .filter-box {
    background: #fff;
    padding: 0.6rem /* 22/40 */ 0;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 0.5rem /* 20/40 */;
    p {
      float: left;
      width: 5.6rem /* 249/40 */;
      font-size: 0.7rem /* 28/40 */;
      color: #666;
      line-height: 0.9rem /* 36/40 */;
      height: 0.9rem;
      text-align: center;
      padding: 0 0.3rem /* 10/40 */;
      > img {
        width: 0.5rem /* 20/40 */;
        height: 0.3rem /* 11/40 */;
        vertical-align: middle;
        margin-left: 0.2rem /* 8/40 */;
      }
    }
    .city,
    .hospital {
      border-right: 1px solid #dcdcdc;
    }
    .hospital {
      span {
        width: 4.6rem;
        height: 0.9rem;
        display: inline-block;
        overflow: hidden;
      }
      img {
        margin-top: -0.3rem /* -14/40 */;
      }
    }
  }
  .doctor-list {
    background: #fff;
    li {
      padding: 0.8rem /* 30/40 */;
      border-bottom: 1px solid #e5e5e5;
      .left {
        float: left;
      }
      img {
        width: 2.5rem /* 100/40 */;
        height: 2.5rem /* 100/40 */;
        border-radius: 50%;
        margin-right: 0.6rem /* 22/40 */;
      }
      .name {
        font-size: 0.7rem /* 28/40 */;
        color: #333;
        line-height: 0.7rem /* 28/40 */;
        margin-bottom: 0.3rem /* 14/40 */;
        span {
          font-size: 0.6rem /* 24/40 */;
          color: #666;
        }
      }
      p {
        font-size: 0.6rem /* 24/40 */;
        color: #666;
        line-height: 0.6rem /* 24/40 */;
      }
      .department {
        margin-bottom: 0.3rem /* 13/40 */;
      }
    }
  }
  .mint-popup {
    width: 100%;
  }
  .popup-box {
    width: 100%;
    .head {
      line-height: 3rem /* 120/40 */;
      padding: 0 0.8rem /* 33/40 */;
      border-bottom: 1px solid #e5e5e5;
      .cancel {
        font-size: 0.8rem /* 30/40 */;
        color: #999;
        float: left;
      }
      .sure {
        font-size: 0.8rem /* 30/40 */;
        color: #999;
        float: right;
      }
      .title {
        font-size: 0.9rem /* 36/40 */;
        color: #4cc6d8;
        float: left;
        width: 13.8rem;
        text-align: center;
      }
    }
    .popup-list {
      padding-top: 5.2rem /* 208/40 */;
      li {
        line-height: 1.6rem /* 64/40 */;
        text-align: center;
        font-size: 0.9rem /* 36/40 */;
        color: #333;
        border-bottom: 1px solid #e5e5e5;
        &:first-child {
          border-top: 1px solid #e5e5e5;
        }
      }
    }
  }
}
</style>
