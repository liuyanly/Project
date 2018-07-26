<template>
  <div class="data_input">
    <headers headName="数据录入"></headers>
    <div class="contentScollr">
      <div class="nav">
        <ul id="nav">
          <li v-for="(nav,index) in navItem" :key="nav.id" @click="SubCates(nav.title,nav.id)" :class="{'active': isActive == nav.id}">
            {{nav.title}}
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="title">{{content}}</div>
        <div class="form">
          <ul>
            <li v-for='data in inputList'>
              <span class="name">{{data.title}}{{data.unit!=""?"("+data.unit+")":""}}</span>
              <input :type="data.type==0?'number':'text'" class="text" v-model="formData[data.id]" placeholder="请填写">
            </li>
            <li>
              <span class="name">测量时间</span>
              <input type="text" class="text time" placeholder="请选择测量时间" @click="openPicker" v-model="timeVal" readonly>
              <img src="../assets/images/c13_liebiao.png" class="arrow">
            </li>
          </ul>
        </div>
      </div>
      <p class="sub-btn" @click="subForm()">
        提交
      </p>
      <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" year-format="{value}" month-format="{value}" date-format="{value}" @confirm="handleConfirm">
      </mt-datetime-picker>
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
      isActive: this.$route.params.id,
      pickerValue: this.getTimes(),
      content: [],
      navItem: [],
      inputList: [],
      formData: {},
      timeVal: ""
    };
  },
  methods: {
    getTimes(timespan) {
      if (timespan === undefined) {
        timespan = 0;
      }
      var now = new Date();
      now.setDate(now.getDate() + timespan);
      return (
        now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
      );
    },
    Back() {
      this.$router.go(-1);
    },
    SubCates(val, index) {
      this.content = val;
      this.isActive = index;
      this.getTemData(this.isActive);
      // console.log(this.formData);
    },
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm(res) {
      this.pickerValue = res;
      let d = new Date(res);
      this.timeVal =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
        "-" +
        (d.getDate() > 9 ? d.getDate() : "0" + d.getDate());
    },
    getNavData() {
      var that = this;
      console.log(that.isActive);
      that.$ajax
        .get("/checktemp")
        .then(function(res) {
          if (res.data.status == 200) {
            that.navItem = res.data.data;
            //that.isActive = res.data.data.id;
            var tempItem = that.navItem.filter(function(e) {
              return e.id == that.isActive;
            });
            that.content = tempItem[0].title;
            that.getTemData(that.isActive);
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
    getTemData(id) {
      var that = this;
      that.$ajax
        .get("/checktemp/" + id)
        .then(function(res) {
          if (res.data.status == 200) {
            that.inputArr = res.data.data.data;
            var arr = [];
            for (var i = 0; i < that.inputArr.length; i++) {
              if (that.inputArr[i].id != 14) {
                arr.push(that.inputArr[i]);
                that.inputList = arr;
                var name = that.inputArr[i].id;
                that.formData[name] = "";
              }
            }
            that.formData = {};
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
    subForm() {
      var that = this,
        flag = true;
      for (var i = 0; i < that.inputList.length; i++) {
        if (that.formData[that.inputList[i].id] == "") {
          flag = false;
        }
      }
      if (that.timeVal == "") {
        that.$toast("请选择测量时间");
        flag = false;
      }
      if (flag) {
        for (var i = 0; i < that.inputList.length; i++) {
          if (
            that.inputList[i].type == 0 &&
            (that.formData[that.inputList[i].id] < that.inputList[i].min ||
              that.formData[that.inputList[i].id] > that.inputList[i].max)
          ) {
            flag = false;
            break;
          }
        }
        if (!flag) {
          that
            .$messagebox({
              title: "提示",
              message: "您提交的数值已经超过正常参考范围，确认提交吗？",
              showCancelButton: true,
              cancelButtonText: "重新修改",
              confirmButtonText: "确认提交"
            })
            .then(action => {
              if (action != "cancal") {
                that.$ajax
                  .post("/check", {
                    checktemp_id: that.isActive,
                    fields: JSON.stringify(that.formData),
                    _me: "user-api",
                    check_at: that.timeVal + " 00:00:00"
                  })
                  .then(function(res) {
                    if (res.data.status == 200) {
                      that.$toast("数据录入成功");
                      setTimeout(function() {
                        // that.$router.push({
                        //   name: "MonitoringDetail",
                        //   params: { id: that.isActive }
                        // });
                        that.$router.go(-1);
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
              }
            });
        }
      } else {
        that.$toast("请填写完整信息");
      }
    }
  },
  mounted: function() {
    this.BaseSet.getToken(this);

    this.getNavData();
    //根据导航个数计算长度
    var Lilength = this.navItem.length;
    var Navlength = document.getElementById("nav");
    if (Lilength < 6) {
      Navlength.style.width = "100%";
    } else {
      var Navwidth = Lilength * 3.5;
      Navlength.style.width = Navwidth + "rem";
    }
  },
  components: { headers }
};
</script>

<style lang="scss" scoped>
.data_input {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .nav {
    width: auto;
    height: 2rem;
    overflow: scroll;
    background-color: #fff;
    ul {
      height: 2rem;
      // overflow: scroll;
      // display: flex;
      // display: -webkit-flex;
      white-space: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-backface-visibility: hidden;
      -webkit-perspective: 1000;
      -webkit-overflow-scrolling: touch; /* 2 */
      text-align: justify; /* 3 */
      &::-webkit-scrollbar {
        display: none;
      }
    }
    li {
      // width: auto;
      // flex: 1;
      // padding: 0 1rem;
      // line-height: 1.9rem;
      // font-size: 0.7rem;
      // white-space: nowrap;
      // color: #666666;
      font-size: 0.7rem;
      margin: 0 1rem;
      display: inline-block;
      line-height: 1.9rem;
      white-space: nowrap;
      color: #666666;
    }
    li.active {
      border-bottom: #4cc6d8 2px solid;
    }
  }
  .content {
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    .title {
      width: 100%;
      height: 2.25rem;
      background-color: #eeeeee;
      line-height: 2.25rem;
      box-sizing: border-box;
      padding: 0 0.75rem;
      color: #999;
      font-size: 0.7rem;
    }
    .form {
      width: 100%;
      overflow: hidden;
      li {
        width: 100%;
        height: 2.25rem;
        box-sizing: border-box;
        padding: 0 0.75rem;
        border-bottom: #e5e5e5 1px solid;
        overflow: hidden;
        position: relative;
        .name {
          color: #333;
          font-size: 0.7rem;
          display: inline-block;
          height: 2.25rem;
          line-height: 2.25rem;
        }
        .text {
          width: 6rem;
          float: right;
          text-align: right;
          height: 1rem;
          line-height: 1rem;
          margin-top: 0.625rem;
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
  }
  .sub-btn {
    width: 17.2rem;
    height: 2rem;
    border-radius: 0.3rem;
    background: #4cc6d8;
    text-align: center;
    color: #fff;
    line-height: 2rem;
    font-size: 0.8rem;
    margin: 0 auto;
    margin-top: 2.5rem;
  }
}
</style>
